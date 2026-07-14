'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPris, kategoriEtikett, lokaliserProdukt } from '@/lib/i18n';

export default function HandlekurvSide() {
  const { varer, fjern, oppdaterAntall, totalPris } = useCart();
  const { sprak, t } = useLanguage();
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
        body: JSON.stringify({ varer, sprak }),
      });
      if (!res.ok) throw new Error('Server svarte med feil');
      const { url } = await res.json();
      if (url) router.push(url);
    } catch {
      setFeil(t.handlekurv.feilBetaling);
    } finally {
      setLaster(false);
    }
  };

  const tilVipps = async () => {
    setFeil('');
    if (!kunde.navn || !kunde.epost || !kunde.adresse || !kunde.postnr || !kunde.poststed) {
      setFeil(t.handlekurv.feilVippsFelt);
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
        localStorage.setItem('vipps_ordre', JSON.stringify({ reference, varer, kunde, sprak }));
        window.location.href = redirectUrl; // ekstern URL – åpner Vipps
      } else {
        throw new Error('Mangler redirect-URL');
      }
    } catch {
      setFeil(t.handlekurv.feilVippsStart);
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
        <h1 className="font-serif text-3xl font-bold text-stone-800">{t.handlekurv.tomTittel}</h1>
        <p className="mt-3 text-stone-500">{t.handlekurv.tomTekst}</p>
        <Link
          href="/produkter"
          className="mt-8 inline-block rounded-full bg-stone-800 px-8 py-3 text-white font-semibold hover:bg-stone-700 transition-colors"
        >
          {t.handlekurv.seProdukter}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-stone-800 mb-10">{t.handlekurv.tittel}</h1>

      <div className="space-y-4">
        {varer.map(({ produkt, antall }) => {
          const { navn } = lokaliserProdukt(produkt, sprak);
          return (
          <div key={produkt.id} className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
              <Image src={produkt.bilde} alt={navn} fill className="object-cover" sizes="80px" />
            </div>

            <div className="flex-1 min-w-0">
              <Link href={`/produkter/${produkt.id}`} className="font-semibold text-stone-800 hover:text-tre-700 transition-colors line-clamp-1">
                {navn}
              </Link>
              <p className="text-sm text-stone-400">{kategoriEtikett(produkt.kategori, sprak)}</p>
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
                {formatPris(produkt.pris * antall, sprak)}
              </p>
              <button
                onClick={() => fjern(produkt.id)}
                className="text-xs text-stone-400 hover:text-red-500 transition-colors"
              >
                {t.handlekurv.fjern}
              </button>
            </div>
          </div>
          );
        })}
      </div>

      {/* Totalsum */}
      <div className="mt-8 rounded-2xl bg-stone-100 p-6">
        <div className="flex justify-between items-center">
          <span className="text-stone-600 font-medium">{t.handlekurv.subtotal}</span>
          <span className="text-stone-800 font-semibold">{formatPris(totalPris, sprak)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-stone-400 text-sm">{t.handlekurv.frakt}</span>
          <span className="text-stone-400 text-sm">{t.handlekurv.beregnes}</span>
        </div>
        <div className="border-t border-stone-200 mt-4 pt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-stone-800">{t.handlekurv.totalt}</span>
          <span className="text-lg font-bold text-stone-800">{formatPris(totalPris, sprak)}</span>
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
          {t.handlekurv.kort}
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
          <p className="text-sm font-semibold text-stone-700 mb-3">{t.handlekurv.leveringsinfo}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <input value={kunde.navn} onChange={settFelt('navn')} placeholder={t.handlekurv.phNavn}
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-tre-500 sm:col-span-2" />
            <input value={kunde.epost} onChange={settFelt('epost')} type="email" placeholder={t.handlekurv.phEpost}
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-tre-500" />
            <input value={kunde.telefon} onChange={settFelt('telefon')} type="tel" placeholder={t.handlekurv.phTelefon}
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-tre-500" />
            <input value={kunde.adresse} onChange={settFelt('adresse')} placeholder={t.handlekurv.phAdresse}
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-tre-500 sm:col-span-2" />
            <input value={kunde.postnr} onChange={settFelt('postnr')} placeholder={t.handlekurv.phPostnr}
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-tre-500" />
            <input value={kunde.poststed} onChange={settFelt('poststed')} placeholder={t.handlekurv.phPoststed}
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
            {laster ? t.handlekurv.koblerBetaling : t.handlekurv.betalKort}
          </button>
        ) : (
          <button
            onClick={tilVipps}
            disabled={laster}
            className="flex-1 rounded-xl bg-[#ff5b24] py-4 text-white font-semibold text-lg hover:brightness-95 disabled:opacity-60 transition-all"
          >
            {laster ? t.handlekurv.koblerVipps : t.handlekurv.betalVipps}
          </button>
        )}
        <Link
          href="/produkter"
          className="rounded-xl border-2 border-stone-200 px-6 py-4 text-stone-700 font-semibold text-center hover:bg-stone-50 transition-colors"
        >
          {t.handlekurv.fortsettHandle}
        </Link>
      </div>

      <p className="mt-4 text-center text-xs text-stone-400">
        {t.handlekurv.vilkar.pre}
        <Link href="/salgsbetingelser" className="underline hover:text-stone-600 transition-colors">
          {t.handlekurv.vilkar.salgsbetingelser}
        </Link>
        {t.handlekurv.vilkar.midt}
        <Link href="/angrerett" className="underline hover:text-stone-600 transition-colors">
          {t.handlekurv.vilkar.angrerett}
        </Link>
        {t.handlekurv.vilkar.post}
      </p>

      <p className="mt-2 text-center text-xs text-stone-400">
        {t.handlekurv.sikkerBetaling}
      </p>
    </div>
  );
}
