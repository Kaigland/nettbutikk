import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import produkter from '@/data/produkter.json';
import AddToCartButton from '@/components/AddToCartButton';
import { Produkt } from '@/types';

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return (produkter as Produkt[]).map(p => ({ id: p.id }));
}

export function generateMetadata({ params }: Props) {
  const produkt = (produkter as Produkt[]).find(p => p.id === params.id);
  if (!produkt) return {};
  return {
    title: `${produkt.navn} – Treskurd`,
    description: produkt.beskrivelse,
  };
}

export default function ProduktDetalj({ params }: Props) {
  const produkt = (produkter as Produkt[]).find(p => p.id === params.id);
  if (!produkt) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/produkter" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800 transition-colors mb-10">
        ← Tilbake til produkter
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Bilde */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-sm">
          <Image
            src={produkt.bilde}
            alt={produkt.navn}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-sm uppercase tracking-wider text-stone-400 capitalize">{produkt.kategori}</p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
            {produkt.navn}
          </h1>
          <p className="mt-4 text-3xl font-semibold text-tre-700">
            {produkt.pris.toLocaleString('nb-NO')} kr
          </p>

          <p className="mt-6 text-stone-600 leading-relaxed text-base">
            {produkt.beskrivelse}
          </p>

          <ul className="mt-6 space-y-2 border-t border-stone-100 pt-6">
            {produkt.detaljer.map((d, i) => (
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
            Frakt via Posten. Estimert levering: 3–5 virkedager.
          </p>
        </div>
      </div>
    </div>
  );
}
