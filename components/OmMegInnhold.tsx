'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function OmMegInnhold() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-tre-600 text-sm uppercase tracking-widest font-medium">{t.omMeg.eyebrow}</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl font-bold text-stone-800">{t.omMeg.tittel}</h1>

      <div className="mt-8 relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
        <Image src="/bilder/om-meg.jpg" alt="Igland Woodcraft" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
      </div>

      <div className="mt-10 space-y-12 text-stone-600 leading-relaxed text-base">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-3">{t.omMeg.s1Tittel}</h2>
          <p>{t.omMeg.s1Tekst}</p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-3">{t.omMeg.s2Tittel}</h2>
          <p>{t.omMeg.s2Tekst}</p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-3">{t.omMeg.s3Tittel}</h2>
          <p>{t.omMeg.s3Tekst}</p>
        </div>

        <div className="rounded-2xl bg-stone-100 p-8">
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-3">{t.omMeg.s4Tittel}</h2>
          <p className="mb-4">{t.omMeg.s4Tekst}</p>
          <a
            href="mailto:post@iglandwoodcraft.com"
            className="inline-block rounded-xl bg-stone-800 px-6 py-3 text-white font-semibold hover:bg-stone-700 transition-colors text-sm"
          >
            {t.omMeg.sendEpost}
          </a>
        </div>
      </div>
    </div>
  );
}
