'use client';

import Link from 'next/link';
import { Produkt } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { formatPris, kategoriEtikett, lokaliserProdukt } from '@/lib/i18n';
import AddToCartButton from '@/components/AddToCartButton';
import ProductGallery from '@/components/ProductGallery';

export default function ProductDetails({ produkt }: { produkt: Produkt }) {
  const { sprak, t } = useLanguage();
  const { navn, beskrivelse, detaljer } = lokaliserProdukt(produkt, sprak);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/produkter" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800 transition-colors mb-10">
        {t.produktDetalj.tilbake}
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Bilder */}
        <ProductGallery
          bilder={[produkt.bilde, ...(produkt.bilder ?? [])]}
          alt={navn}
        />

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-sm uppercase tracking-wider text-stone-400">{kategoriEtikett(produkt.kategori, sprak)}</p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
            {navn}
          </h1>
          <p className="mt-4 text-3xl font-semibold text-tre-700">
            {formatPris(produkt.pris, sprak)}
          </p>

          <p className="mt-6 text-stone-600 leading-relaxed text-base">
            {beskrivelse}
          </p>

          <ul className="mt-6 space-y-2 border-t border-stone-100 pt-6">
            {detaljer.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                <span className="text-tre-600 font-bold mt-px">✓</span>
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <AddToCartButton produkt={produkt} />
          </div>

          <p className="mt-4 text-sm text-stone-400 text-center">
            {t.produktDetalj.frakt}
          </p>
        </div>
      </div>
    </div>
  );
}
