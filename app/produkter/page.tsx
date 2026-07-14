'use client';

import { useState } from 'react';
import produkter from '@/data/produkter.json';
import ProductCard from '@/components/ProductCard';
import { Produkt } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { kategoriEtikett } from '@/lib/i18n';

type Filter = 'alle' | 'skåler' | 'krukker' | 'lysestaker' | 'serveringsfjøl' | 'figurer' | 'møbler' | 'annet';

const kategorier: Filter[] = [
  'alle',
  'skåler',
  'krukker',
  'lysestaker',
  'serveringsfjøl',
  'figurer',
  'møbler',
  'annet',
];

export default function ProdukterSide() {
  const { sprak, t } = useLanguage();
  const [valgtKategori, setValgtKategori] = useState<Filter>('alle');

  const filtrert = (produkter as Produkt[]).filter(
    p => valgtKategori === 'alle' || p.kategori === valgtKategori
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-tre-600 text-sm uppercase tracking-widest font-medium">{t.produkter.eyebrow}</p>
      <h1 className="mt-1 font-serif text-4xl md:text-5xl font-bold text-stone-800">{t.produkter.tittel}</h1>
      <p className="mt-3 text-stone-500">{t.produkter.undertittel}</p>

      {/* Kategorifilter */}
      <div className="mt-8 flex gap-3 flex-wrap">
        {kategorier.map(verdi => (
          <button
            key={verdi}
            onClick={() => setValgtKategori(verdi)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              valgtKategori === verdi
                ? 'bg-stone-800 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {kategoriEtikett(verdi, sprak)}
          </button>
        ))}
      </div>

      {/* Produktgrid */}
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtrert.map(produkt => (
          <ProductCard key={produkt.id} produkt={produkt} />
        ))}
      </div>

      {filtrert.length === 0 && (
        <p className="mt-20 text-center text-stone-400 text-lg">
          {t.produkter.ingen}
        </p>
      )}
    </div>
  );
}
