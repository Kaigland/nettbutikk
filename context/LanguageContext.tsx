'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  Sprak,
  STANDARD_SPRAK,
  detekterSprak,
  oversettelser,
  Oversettelser,
} from '@/lib/i18n';

interface LanguageContextType {
  sprak: Sprak;
  settSprak: (sprak: Sprak) => void;
  t: Oversettelser;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const LAGRINGSNØKKEL = 'sprak';

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Start på standardspråket slik at server og klient rendrer likt.
  // Riktig språk settes i useEffect etter mount for å unngå hydration-feil.
  const [sprak, setSprakState] = useState<Sprak>(STANDARD_SPRAK);

  useEffect(() => {
    const lagret = localStorage.getItem(LAGRINGSNØKKEL) as Sprak | null;
    const valgt =
      lagret === 'nb' || lagret === 'en'
        ? lagret
        : detekterSprak(navigator.languages ?? [navigator.language]);
    setSprakState(valgt);
  }, []);

  useEffect(() => {
    document.documentElement.lang = sprak;
  }, [sprak]);

  const settSprak = (nytt: Sprak) => {
    setSprakState(nytt);
    localStorage.setItem(LAGRINGSNØKKEL, nytt);
  };

  return (
    <LanguageContext.Provider value={{ sprak, settSprak, t: oversettelser[sprak] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage må brukes innenfor LanguageProvider');
  return context;
}
