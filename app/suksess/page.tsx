'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

function SuksessInnhold() {
  const { tømKurv } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sendt = useRef(false);

  useEffect(() => {
    tømKurv();
    const sessionId = searchParams.get('session_id');
    if (sessionId && !sendt.current) {
      sendt.current = true;
      fetch('/api/confirm-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
    }
  }, [tømKurv, searchParams]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>

      <h1 className="font-serif text-4xl font-bold text-stone-800">Takk for kjøpet!</h1>
      <p className="mt-4 text-stone-500 text-lg leading-relaxed">
        Bestillingen din er registrert og du vil motta en bekreftelse på e-post.
      </p>
      <p className="mt-2 text-stone-400 text-sm">
        Estimert levering: 3–5 virkedager via Posten.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => router.push('/produkter')}
          className="rounded-full bg-stone-800 px-8 py-3 text-white font-semibold hover:bg-stone-700 transition-colors"
        >
          Se flere produkter
        </button>
        <button
          onClick={() => router.push('/')}
          className="rounded-full border-2 border-stone-200 px-8 py-3 text-stone-700 font-semibold hover:bg-stone-50 transition-colors"
        >
          Tilbake til forsiden
        </button>
      </div>
    </div>
  );
}

export default function Suksess() {
  return (
    <Suspense>
      <SuksessInnhold />
    </Suspense>
  );
}
