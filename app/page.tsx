import Link from 'next/link';
import produkter from '@/data/produkter.json';
import ProductCard from '@/components/ProductCard';
import { Produkt } from '@/types';

export default function Hjem() {
  const fremhevede = (produkter as Produkt[]).filter(p => p.lagerstatus === 'på_lager').slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-stone-900 text-white py-32 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-tre-400 uppercase tracking-[0.2em] text-sm font-medium mb-4">
            Håndtverk fra Norge
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight">
            Skåret ut av<br />
            norsk tre
          </h1>
          <p className="mt-6 text-lg text-stone-300 max-w-xl mx-auto leading-relaxed">
            Unike skåler, lysestaker og fat – laget for hånd med respekt for materialet
            og tradisjonshåndverket.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/produkter"
              className="rounded-full bg-tre-600 px-8 py-4 font-semibold text-white hover:bg-tre-700 transition-colors"
            >
              Se alle produkter
            </Link>
            <Link
              href="/om-meg"
              className="rounded-full border border-stone-600 px-8 py-4 font-semibold text-stone-200 hover:border-stone-300 hover:text-white transition-colors"
            >
              Om håndverket
            </Link>
          </div>
        </div>
      </section>

      {/* Egenskaper */}
      <section className="bg-stone-100 py-10">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm text-stone-600">
          {[
            { ikon: '✦', tittel: 'Håndlaget', tekst: 'Hvert stykke skåret for hånd' },
            { ikon: '✦', tittel: 'Unikt', tekst: 'Ingen produkter er like' },
            { ikon: '✦', tittel: 'Norsk tre', tekst: 'Eik, bjørk, ask og lind' },
          ].map(({ ikon, tittel, tekst }) => (
            <div key={tittel} className="flex flex-col items-center gap-1 py-4">
              <span className="text-tre-600 text-lg">{ikon}</span>
              <span className="font-semibold text-stone-800">{tittel}</span>
              <span>{tekst}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Fremhevede produkter */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-tre-600 text-sm uppercase tracking-widest font-medium">Utvalg</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mt-1">
              Fremhevede produkter
            </h2>
          </div>
          <Link href="/produkter" className="hidden sm:block text-stone-500 hover:text-stone-800 text-sm font-medium transition-colors">
            Se alle →
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {fremhevede.map(produkt => (
            <ProductCard key={produkt.id} produkt={produkt} />
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <Link
            href="/produkter"
            className="inline-block rounded-full border-2 border-stone-300 px-8 py-3 font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
          >
            Se alle produkter
          </Link>
        </div>
      </section>

      {/* Om-seksjon */}
      <section className="bg-stone-800 text-stone-100 py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Om håndverket</h2>
          <p className="mt-6 text-stone-300 leading-relaxed text-lg">
            Hvert produkt er laget med respekt for materialet og tradisjonshåndverket.
            Treet velges med omhu, og hvert stykke bærer med seg naturens egne mønstre og særtrekk.
          </p>
          <Link
            href="/om-meg"
            className="mt-8 inline-block text-tre-400 font-semibold hover:text-tre-300 transition-colors"
          >
            Les mer om meg og håndverket →
          </Link>
        </div>
      </section>
    </>
  );
}
