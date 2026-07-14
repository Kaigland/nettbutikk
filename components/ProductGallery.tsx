'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  bilder: string[];
  alt: string;
}

export default function ProductGallery({ bilder, alt }: Props) {
  const [aktiv, setAktiv] = useState(0);
  const gjeldende = bilder[aktiv] ?? bilder[0];

  return (
    <div>
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-sm">
        <Image
          src={gjeldende}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-4"
          priority
        />
      </div>

      {bilder.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {bilder.map((bilde, i) => (
            <button
              key={bilde}
              type="button"
              onClick={() => setAktiv(i)}
              aria-label={`Vis bilde ${i + 1} av ${bilder.length}`}
              aria-current={i === aktiv}
              className={`relative aspect-square rounded-xl overflow-hidden bg-stone-100 transition-all ${
                i === aktiv
                  ? 'ring-2 ring-tre-600 ring-offset-2'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={bilde}
                alt=""
                fill
                sizes="120px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
