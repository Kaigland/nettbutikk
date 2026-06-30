import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-14">
      <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-white text-xl font-bold">Igland Treskjæring</h3>
          <p className="mt-3 text-sm leading-relaxed text-stone-400">
            Håndskårne og dreide produkter i norsk tre. Laget med kjærlighet og respekt
            for materialet og håndverkstradisjonen.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Navigasjon</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/produkter" className="hover:text-white transition-colors">Produkter</Link></li>
            <li><Link href="/om-meg"    className="hover:text-white transition-colors">Om meg</Link></li>
            <li><Link href="/handlekurv" className="hover:text-white transition-colors">Handlekurv</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Kontakt</h4>
          <ul className="mt-4 space-y-2 text-sm text-stone-400">
            <li>
              <a href="mailto:post@igland-treskjæring.no" className="hover:text-white transition-colors">
                post@igland-treskjæring.no
              </a>
            </li>
            <li>+47 415 07 491</li>
            <li>Grotlevegen 277, 6727 Bremanger - Norge</li>
            </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 mt-10 border-t border-stone-700 pt-6 text-center text-xs text-stone-500">
        &copy; {new Date().getFullYear()} Igland Treskjæring. Alle rettigheter forbeholdt.
      </div>
    </footer>
  );
}
