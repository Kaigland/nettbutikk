'use client';

import { useState } from 'react';
import produkter from '@/data/produkter.json';
import ProductCard from '@/components/ProductCard';
import { Produkt } from '@/types';

type Kategori = 'alle' | 'skåler' | 'lysestaker' | 'fat' | 'annet';

const kategorier: { verdi: Kategori; etikett: string }[] = [
  { verdi: 'alle',       etikett: 'Alle' },
  { verdi: 'skåler',     etikett: 'Skåler' },
  { verdi: 'lysestaker', etikett: 'Lysestaker' },
  { verdi: 'fat',        etikett: 'Fat' },
  { verdi: 'annet',      etikett: 'Annet' },
];

export default function ProdukterSide() {
  const [valgtKategori, setValgtKategori] = useState<Kategori>('alle');

  const filtrert = (produkter as Produkt[]).filter(
    p => valgtKategori === 'alle' || p.kategori === valgtKategori
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-tre-600 text-sm uppercase tracking-widest font-medium">Sortiment</p>
      <h1 className="mt-1 font-serif text-4xl md:text-5xl font-bold text-stone-800">Produkter</h1>
      <p className="mt-3 text-stone-500">Alle produkter er håndlaget og unike.</p>

      {/* Kategorifilter */}
      <div className="mt-8 flex gap-3 flex-wrap">
        {kategorier.map(({ verdi, etikett }) => (
          <button
            key={verdi}
            onClick={() => setValgtKategori(verdi)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              valgtKategori === verdi
                ? 'bg-stone-800 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {etikett}
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
          Ingen produkter i denne kategorien for øyeblikket.
        </p>
      )}
    </div>
  );
}
