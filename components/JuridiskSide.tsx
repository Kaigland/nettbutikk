'use client';

import { useLanguage } from '@/context/LanguageContext';
import { juridisk, type Avsnitt } from '@/lib/juridisk';

/** Felles oppsett for juridiske sider (salgsbetingelser, angrerett, personvern). */
export default function JuridiskSide({ dokument }: { dokument: keyof typeof juridisk }) {
  const { sprak } = useLanguage();
  const dok = juridisk[dokument][sprak];

  let nr = 0;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-tre-600 text-sm uppercase tracking-widest font-medium">{dok.eyebrow}</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl font-bold text-stone-800">{dok.tittel}</h1>
      <p className="mt-3 text-sm text-stone-400">{dok.oppdatert}</p>

      {dok.ingress && (
        <p className="mt-8 text-stone-600 leading-relaxed">{dok.ingress}</p>
      )}

      <div className="mt-10 space-y-9">
        {dok.seksjoner.map((seksjon, i) => {
          if (seksjon.tittel && dok.nummerert) nr += 1;
          return (
            <section key={i}>
              {seksjon.tittel && (
                <h2 className="font-serif text-2xl font-bold text-stone-800 mb-3">
                  {dok.nummerert ? `${nr}. ${seksjon.tittel}` : seksjon.tittel}
                </h2>
              )}
              <div className="space-y-3 text-stone-600 leading-relaxed">
                {seksjon.avsnitt.map((avsnitt, j) => (
                  <AvsnittTekst key={j} avsnitt={avsnitt} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function AvsnittTekst({ avsnitt }: { avsnitt: Avsnitt }) {
  if (typeof avsnitt === 'string') {
    return <p>{avsnitt}</p>;
  }
  return (
    <p>
      <span className="font-semibold text-stone-800">{avsnitt.ledd}</span> {avsnitt.tekst}
    </p>
  );
}
