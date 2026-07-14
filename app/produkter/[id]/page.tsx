import { notFound } from 'next/navigation';
import produkter from '@/data/produkter.json';
import ProductDetails from '@/components/ProductDetails';
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

  return <ProductDetails produkt={produkt} />;
}
