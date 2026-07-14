'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Produkt } from '@/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPris, kategoriEtikett, lokaliserProdukt } from '@/lib/i18n';

interface Props {
  produkt: Produkt;
}

export default function ProductCard({ produkt }: Props) {
  const { leggTil } = useCart();
  const { sprak, t } = useLanguage();
  const utsolgt = produkt.lagerstatus === 'utsolgt';
  const { navn } = lokaliserProdukt(produkt, sprak);

  return (
    <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/produkter/${produkt.id}`}>
        <div className="relative aspect-square overflow-hidden bg-stone-100">
          <Image
            src={produkt.bilde}
            alt={navn}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {utsolgt && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-stone-800 font-semibold px-4 py-2 rounded-full text-sm">
                {t.produktkort.utsolgt}
              </span>
            </div>
          )}
        </div>
        <div className="p-4 pb-2">
          <p className="text-xs uppercase tracking-wider text-stone-400">{kategoriEtikett(produkt.kategori, sprak)}</p>
          <h3 className="mt-1 font-serif text-lg font-semibold text-stone-800 leading-snug">{navn}</h3>
          <p className="mt-1 text-tre-700 font-semibold">{formatPris(produkt.pris, sprak)}</p>
        </div>
      </Link>
      <div className="px-4 pb-4 pt-2">
        <button
          onClick={() => !utsolgt && leggTil(produkt)}
          disabled={utsolgt}
          className="w-full rounded-xl bg-stone-800 py-2.5 text-sm font-semibold text-white hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {utsolgt ? t.produktkort.utsolgt : t.produktkort.leggIKurv}
        </button>
      </div>
    </div>
  );
}
