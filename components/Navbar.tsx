'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { antallVarer } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-100">
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-2 flex items-end justify-between">
        <Link href="/">
          <img src="/logo.svg" alt="Igland Woodcraft" className="h-[70px] w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/produkter" className="text-stone-600 hover:text-stone-900 font-medium transition-colors">
            Produkter
          </Link>
          <Link href="/om-meg" className="text-stone-600 hover:text-stone-900 font-medium transition-colors">
            Om meg
          </Link>
          <Link href="/handlekurv" className="relative p-2 rounded-xl hover:bg-stone-50 transition-colors">
            <CartIcon />
            {antallVarer > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-tre-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold leading-none">
                {antallVarer}
              </span>
            )}
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Link href="/handlekurv" className="relative p-2">
            <CartIcon />
            {antallVarer > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-tre-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {antallVarer}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2" aria-label="Meny">
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-6 py-4 flex flex-col gap-1">
          <Link href="/produkter" onClick={() => setMenuOpen(false)} className="py-3 text-stone-700 font-medium border-b border-stone-50">
            Produkter
          </Link>
          <Link href="/om-meg" onClick={() => setMenuOpen(false)} className="py-3 text-stone-700 font-medium">
            Om meg
          </Link>
        </div>
      )}
    </nav>
  );
}

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-stone-700">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
