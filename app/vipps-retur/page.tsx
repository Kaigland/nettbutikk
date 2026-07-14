'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

type Status = 'behandler' | 'ok' | 'avbrutt' | 'feil';

function VippsReturInnhold() {
  const { tømKurv } = useCart();
  const { sprak, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const kjørt = useRef(false);
  const [status, setStatus] = useState<Status>('behandler');

  useEffect(() => {
    if (kjørt.current) return;
    kjørt.current = true;

    const ref = searchParams.get('ref');
    const lagret = typeof window !== 'undefined' ? localStorage.getItem('vipps_ordre') : null;
    const ordre = lagret ? JSON.parse(lagret) : null;

    if (!ref || !ordre || ordre.reference !== ref) {
      setStatus('feil');
      return;
    }

    fetch('/api/vipps/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference: ref, varer: ordre.varer, kunde: ordre.kunde, sprak: ordre.sprak ?? sprak }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 'ok') {
          localStorage.removeItem('vipps_ordre');
          tømKurv();
          setStatus('ok');
        } else if (data.status === 'avbrutt') {
          setStatus('avbrutt');
        } else {
          setStatus('feil');
        }
      })
      .catch(() => setStatus('feil'));
  }, [searchParams, tømKurv, sprak]);

  if (status === 'behandler') {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <div className="mx-auto w-12 h-12 rounded-full border-4 border-stone-200 border-t-tre-600 animate-spin mb-8" />
        <h1 className="font-serif text-3xl font-bold text-stone-800">{t.vippsRetur.bekrefterTittel}</h1>
        <p className="mt-3 text-stone-500">{t.vippsRetur.bekrefterTekst}</p>
      </div>
    );
  }

  if (status === 'ok') {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="font-serif text-4xl font-bold text-stone-800">{t.vippsRetur.okTittel}</h1>
        <p className="mt-4 text-stone-500 text-lg leading-relaxed">
          {t.vippsRetur.okTekst}
        </p>
        <p className="mt-2 text-stone-400 text-sm">{t.vippsRetur.levering}</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => router.push('/produkter')} className="rounded-full bg-stone-800 px-8 py-3 text-white font-semibold hover:bg-stone-700 transition-colors">
            {t.vippsRetur.seFlere}
          </button>
          <button onClick={() => router.push('/')} className="rounded-full border-2 border-stone-200 px-8 py-3 text-stone-700 font-semibold hover:bg-stone-50 transition-colors">
            {t.vippsRetur.tilbakeForsiden}
          </button>
        </div>
      </div>
    );
  }

  // avbrutt eller feil
  const avbrutt = status === 'avbrutt';
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <div className="mx-auto w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-stone-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="font-serif text-4xl font-bold text-stone-800">
        {avbrutt ? t.vippsRetur.avbruttTittel : t.vippsRetur.feilTittel}
      </h1>
      <p className="mt-4 text-stone-500 text-lg leading-relaxed">
        {avbrutt ? t.vippsRetur.avbruttTekst : t.vippsRetur.feilTekst}
      </p>
      <div className="mt-10">
        <button onClick={() => router.push('/handlekurv')} className="rounded-full bg-stone-800 px-8 py-3 text-white font-semibold hover:bg-stone-700 transition-colors">
          {t.vippsRetur.tilbakeHandlekurv}
        </button>
      </div>
    </div>
  );
}

export default function VippsRetur() {
  return (
    <Suspense>
      <VippsReturInnhold />
    </Suspense>
  );
}
