'use client';

import { useId } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sprak } from '@/lib/i18n';

export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { sprak, settSprak, t } = useLanguage();
  const clipId = useId();

  const knapp = (kode: Sprak, flagg: React.ReactNode, etikett: string) => {
    const aktiv = sprak === kode;
    return (
      <button
        type="button"
        onClick={() => settSprak(kode)}
        aria-label={etikett}
        aria-pressed={aktiv}
        title={etikett}
        className={`h-6 w-9 overflow-hidden rounded-sm ring-offset-1 transition-all ${
          aktiv
            ? 'ring-2 ring-tre-600 opacity-100'
            : 'opacity-50 hover:opacity-90'
        }`}
      >
        {flagg}
      </button>
    );
  };

  return (
    <div className={`flex items-center gap-2 ${className}`} role="group" aria-label={t.nav.byttSprak}>
      {knapp('nb', <NorskFlagg />, t.nav.norsk)}
      {knapp('en', <EngelskFlagg clipId={`flagg-uk-${clipId}`} />, t.nav.engelsk)}
    </div>
  );
}

function NorskFlagg() {
  return (
    <svg viewBox="0 0 22 16" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <rect width="22" height="16" fill="#ba0c2f" />
      <rect x="6" width="4" height="16" fill="#fff" />
      <rect y="6" width="22" height="4" fill="#fff" />
      <rect x="7" width="2" height="16" fill="#00205b" />
      <rect y="7" width="22" height="2" fill="#00205b" />
    </svg>
  );
}

function EngelskFlagg({ clipId }: { clipId: string }) {
  return (
    <svg viewBox="0 0 60 30" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <clipPath id={clipId}>
        <rect width="60" height="30" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#c8102e" strokeWidth="4" />
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#c8102e" strokeWidth="6" />
      </g>
    </svg>
  );
}
