import Image from 'next/image';

export const metadata = {
  title: 'Om meg – Igland Treskjæring',
  description: 'Les om håndverket og menneskene bak Igland Treskjæring.',
};

export default function OmMeg() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-tre-600 text-sm uppercase tracking-widest font-medium">Bakgrunn</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl font-bold text-stone-800">Om meg og håndverket</h1>

      <div className="mt-8 relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
        <Image src="/bilder/om-meg.jpg" alt="Igland Treskjæring" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
      </div>

      <div className="mt-10 space-y-12 text-stone-600 leading-relaxed text-base">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-3">Lidenskap for tre</h2>
          <p>
            Mitt navn er Reidar Igland. Jeg har drevet med treskjæring og dreining i over 10 år. Det startet som en hobby på
            kveldstid i garasjen, og har blitt en lidenskap og et håndverk jeg er stolt av å bringe
            videre. Hvert produkt er laget av meg, for hånd, fra start til slutt.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-3">Materialer fra norsk natur</h2>
          <p>
            Jeg bruker norske tresorter som eik, bjørk, ask og lind. Treverket hentes fra lokale
            sager og skogbruk. All overflatebehandling er food-safe – linolje, bivoks og matolje –
            og skånsom mot materialet. Produktene er trygge å bruke til mat.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-3">Hvert stykke er unikt</h2>
          <p>
            Naturen er den beste designeren. Maseringsmønster, kvister og naturkanter gjør hvert
            produkt unikt. Det du kjøper er ikke et masseprodusert objekt – det er et håndverk med
            sjel, som vil bli vakrere med bruk og tid.
          </p>
        </div>

        <div className="rounded-2xl bg-stone-100 p-8">
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-3">Spesialbestillinger</h2>
          <p className="mb-4">
            Ønsker du noe spesielt – en gave, et minneprodukt laget av bestemt trevirke, eller et
            produkt i en bestemt størrelse? Ta gjerne kontakt, så finner vi en løsning.
          </p>
          <a
            href="mailto:post@igland-treskjæring.no"
            className="inline-block rounded-xl bg-stone-800 px-6 py-3 text-white font-semibold hover:bg-stone-700 transition-colors text-sm"
          >
            Send en e-post
          </a>
        </div>
      </div>
    </div>
  );
}
