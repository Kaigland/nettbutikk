'use client';

import { useState } from 'react';
import { Produkt } from '@/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function AddToCartButton({ produkt }: { produkt: Produkt }) {
  const { leggTil } = useCart();
  const { t } = useLanguage();
  const [lagtTil, setLagtTil] = useState(false);

  if (produkt.lagerstatus === 'utsolgt') {
    return (
      <button disabled className="w-full rounded-xl bg-stone-200 py-4 text-stone-400 font-semibold cursor-not-allowed text-lg">
        {t.produktkort.utsolgt}
      </button>
    );
  }

  const handleClick = () => {
    leggTil(produkt);
    setLagtTil(true);
    setTimeout(() => setLagtTil(false), 2500);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full rounded-xl py-4 font-semibold text-lg transition-all duration-300 ${
        lagtTil
          ? 'bg-green-600 text-white scale-[0.99]'
          : 'bg-stone-800 text-white hover:bg-stone-700'
      }`}
    >
      {lagtTil ? t.produktDetalj.lagtIKurv : t.produktkort.leggIKurv}
    </button>
  );
}
