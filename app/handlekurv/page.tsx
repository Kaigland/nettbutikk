'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function HandlekurvSide() {
  const { varer, fjern, oppdaterAntall, totalPris } = useCart();
  const [laster, setLaster] = useState(false);
  const [feil, setFeil] = useState('');
  const [metode, setMetode] = useState<'kort' | 'vipps'>('kort');
  const [kunde, setKunde] = useState({
    navn: '',
    epost: '',
    telefon: '',
    adresse: '',
    postnr: '',
    poststed: '',
  });
  const router = useRouter();

  const settFelt = (felt: keyof typeof kunde) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setKunde((k) => ({ ...k, [felt]: e.target.value }));

  const tilBetaling = async () => {
    setFeil('');
    setLaster(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ varer }),
      });
      if (!res.ok) throw new Error('Server svarte med feil');
      const { url } = await res.json();
      if (url) router.push(url);
    } catch {
      setFeil('Noe gikk galt med betalingen. Prøv igjen.');
    } finally {
      setLaster(false);
    }
  };

  const tilVipps = async () => {
    setFeil('');
    if (!kunde.navn || !kunde.epost || !kunde.adresse || !kunde.postnr || !kunde.poststed) {
      setFeil('Fyll inn navn, e-post og leveringsadresse for å betale med Vipps.');
      return;
    }
    setLaster(true);
    try {
      const res = await fetch('/api/vipps/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ varer, kunde }),
      });
      if (!res.ok) throw new Error('Server svarte med feil');
      const { redirectUrl, reference } = await res.json();
      if (redirectUrl && reference) {
        // Lagre ordren lokalt slik at retur-siden kan bekrefte den mot Vipps.
        localStorage.setItem('vipps_ordre', JSON.stringify({ reference, varer, kunde }));
        window.location.href = redirectUrl; // ekstern URL – åpner Vipps
      } else {
        throw new Error('Mangler redirect-URL');
      }
    } catch {
      setFeil('Kunne ikke starte Vipps-betaling. Prøv igjen.');
      setLaster(false);
    }
  };

  if (varer.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-stone-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-800">Handlekurven er tom</h1>
        <p className="mt-3 text-stone-500">Gå til produktsiden og finn noe du liker.</p>
        <Link
          href="/produkter"
          className="mt-8 inline-block rounded-full bg-stone-800 px-8 py-3 text-white font-semibold hover:bg-stone-700 transition-colors"
        >
          Se produkter
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-stone-800 mb-10">Handlekurv</h1>

      <div className="space-y-4">
        {varer.map(({ produkt, antall }) => (
          <div key={produkt.id} className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
              <Image src={produkt.bilde} alt={produkt.navn} fill className="object-cover" sizes="80px" />
            </div>

            <div className="flex-1 min-w-0">
              <Link href={`/produkter/${produkt.id}`} className="font-semibold text-stone-800 hover:text-tre-700 transition-colors line-clamp-1">
                {produkt.navn}
              </Link>
              <p className="text-sm text-stone-400 capitalize">{produkt.kategori}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => oppdaterAntall(produkt.id, antall - 1)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center font-bold text-stone-600 transition-colors"
                >
                  −
                </button>
                <span className="w-6 text-center font-medium text-stone-800">{antall}</span>
                <button
                  onClick={() => oppdaterAntall(produkt.id, antall + 1)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center font-bold text-stone-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between flex-shrink-0">
              <p className="font-bold text-stone-800">
                {(produkt.pris * antall).toLocaleString('nb-NO')} kr
              </p>
              <button
                onClick={() => fjern(produkt.id)}
                className="text-xs text-stone-400 hover:text-red-500 transition-colors"
              >
                Fjern
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Totalsum */}
      <div className="mt-8 rounded-2xl bg-stone-100 p-6">
        <div className="flex justify-between items-center">
          <span className="text-stone-600 font-medium">Subtotal</span>
          <span className="text-stone-800 font-semibold">{totalPris.toLocaleString('nb-NO')} kr</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-stone-400 text-sm">Frakt</span>
          <span className="text-stone-400 text-sm">Beregnes i kassen</span>
        </div>
        <div className="border-t border-stone-200 mt-4 pt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-stone-800">Totalt</span>
          <span className="text-lg font-bold text-stone-800">{totalPris.toLocaleString('nb-NO')} kr</span>
        </div>
      </div>

      {/* Velg betalingsmetode */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <button
          onClick={() => setMetode('kort')}
          className={`rounded-xl border-2 py-3 px-4 font-semibold transition-colors ${
            metode === 'kort'
              ? 'border-stone-800 bg-stone-800 text-white'
              : 'border-stone-200 text-stone-600 hover:bg-stone-50'
          }`}
        >
          Kort
        </button>
        <button
          onClick={() => setMetode('vipps')}
          className={`rounded-xl border-2 py-3 px-4 font-semibold transition-colors ${
            metode === 'vipps'
              ? 'border-[#ff5b24] bg-[#ff5b24] text-white'
              : 'border-stone-200 text-stone-600 hover:bg-stone-50'
          }`}
        >
          Vipps
        </button>
      </div>

      {/* Leveringsadresse (kun Vipps – Stripe samler dette inn selv i kassen) */}
      {metode === 'vipps' && (
        <div className="mt-4 rounded-2xl border border-stone-200 p-5">
          <p className="text-sm font-semibold text-stone-700 mb-3">Leveringsinformasjon</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <input value={kunde.navn} onChange={settFelt('navn')} placeholder="Navn"
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-tre-500 sm:col-span-2" />
            <input value={kunde.epost} onChange={settFelt('epost')} type="email" placeholder="E-post"
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-tre-500" />
            <input value={kunde.telefon} onChange={settFelt('telefon')} type="tel" placeholder="Mobilnummer"
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-tre-500" />
            <input value={kunde.adresse} onChange={settFelt('adresse')} placeholder="Gateadresse"
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-tre-500 sm:col-span-2" />
            <input value={kunde.postnr} onChange={settFelt('postnr')} placeholder="Postnr."
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-tre-500" />
            <input value={kunde.poststed} onChange={settFelt('poststed')} placeholder="Poststed"
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-tre-500" />
          </div>
        </div>
      )}

      {feil && (
        <p className="mt-4 text-center text-red-600 text-sm bg-red-50 rounded-xl py-3 px-4">{feil}</p>
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        {metode === 'kort' ? (
          <button
            onClick={tilBetaling}
            disabled={laster}
            className="flex-1 rounded-xl bg-tre-600 py-4 text-white font-semibold text-lg hover:bg-tre-700 disabled:opacity-60 transition-colors"
          >
            {laster ? 'Kobler til betaling...' : 'Betal med kort via Stripe'}
          </button>
        ) : (
          <button
            onClick={tilVipps}
            disabled={laster}
            className="flex-1 rounded-xl bg-[#ff5b24] py-4 text-white font-semibold text-lg hover:brightness-95 disabled:opacity-60 transition-all"
          >
            {laster ? 'Kobler til Vipps...' : 'Betal med Vipps'}
          </button>
        )}
        <Link
          href="/produkter"
          className="rounded-xl border-2 border-stone-200 px-6 py-4 text-stone-700 font-semibold text-center hover:bg-stone-50 transition-colors"
        >
          Fortsett å handle
        </Link>
      </div>

      <p className="mt-4 text-center text-xs text-stone-400">
        Sikker betaling via Stripe eller Vipps. Kort- og kontoinformasjon lagres ikke hos oss.
      </p>
    </div>
  );
}
