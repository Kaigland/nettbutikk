'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-stone-900 text-stone-300 py-14">
      <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="font-serif text-white text-xl font-bold">Igland Woodcraft</h3>
          <p className="mt-3 text-sm leading-relaxed text-stone-400">
            {t.footer.tagline}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider">{t.footer.navigasjon}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/produkter" className="hover:text-white transition-colors">{t.footer.produkter}</Link></li>
            <li><Link href="/om-meg"    className="hover:text-white transition-colors">{t.footer.omMeg}</Link></li>
            <li><Link href="/handlekurv" className="hover:text-white transition-colors">{t.footer.handlekurv}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider">{t.footer.juridisk}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/salgsbetingelser" className="hover:text-white transition-colors">{t.footer.salgsbetingelser}</Link></li>
            <li><Link href="/angrerett" className="hover:text-white transition-colors">{t.footer.angrerett}</Link></li>
            <li><Link href="/personvern" className="hover:text-white transition-colors">{t.footer.personvern}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white text-sm uppercase tracking-wider">{t.footer.kontakt}</h4>
          <ul className="mt-4 space-y-2 text-sm text-stone-400">
            <li>
              <a href="mailto:post@iglandwoodcraft.com" className="hover:text-white transition-colors">
                post@iglandwoodcraft.com
              </a>
            </li>
            <li>+47 415 07 491</li>
            <li>Grotlevegen 277, 6727 Bremanger - Norge</li>
            </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 mt-10 border-t border-stone-700 pt-6 text-center text-xs text-stone-500">
        &copy; {new Date().getFullYear()} Igland Woodcraft. {t.footer.rettigheter}
      </div>
    </footer>
  );
}
