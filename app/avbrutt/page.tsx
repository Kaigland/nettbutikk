'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Avbrutt() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <div className="mx-auto w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-stone-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 className="font-serif text-4xl font-bold text-stone-800">{t.avbrutt.tittel}</h1>
      <p className="mt-4 text-stone-500 text-lg">
        {t.avbrutt.tekst}
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/handlekurv"
          className="rounded-full bg-stone-800 px-8 py-3 text-white font-semibold hover:bg-stone-700 transition-colors"
        >
          {t.avbrutt.tilbakeHandlekurv}
        </Link>
        <Link
          href="/produkter"
          className="rounded-full border-2 border-stone-200 px-8 py-3 text-stone-700 font-semibold hover:bg-stone-50 transition-colors"
        >
          {t.avbrutt.fortsettHandle}
        </Link>
      </div>
    </div>
  );
}
