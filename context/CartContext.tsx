'use client';

import { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { Produkt, KurvVare } from '@/types';

interface CartState {
  varer: KurvVare[];
}

type CartAction =
  | { type: 'LEGG_TIL'; produkt: Produkt }
  | { type: 'FJERN'; produktId: string }
  | { type: 'OPPDATER_ANTALL'; produktId: string; antall: number }
  | { type: 'TØM_KURV' }
  | { type: 'LAST_FRA_STORAGE'; varer: KurvVare[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LEGG_TIL': {
      const eksisterende = state.varer.find(v => v.produkt.id === action.produkt.id);
      if (eksisterende) {
        return {
          varer: state.varer.map(v =>
            v.produkt.id === action.produkt.id ? { ...v, antall: v.antall + 1 } : v
          ),
        };
      }
      return { varer: [...state.varer, { produkt: action.produkt, antall: 1 }] };
    }
    case 'FJERN':
      return { varer: state.varer.filter(v => v.produkt.id !== action.produktId) };
    case 'OPPDATER_ANTALL':
      if (action.antall <= 0) {
        return { varer: state.varer.filter(v => v.produkt.id !== action.produktId) };
      }
      return {
        varer: state.varer.map(v =>
          v.produkt.id === action.produktId ? { ...v, antall: action.antall } : v
        ),
      };
    case 'TØM_KURV':
      return { varer: [] };
    case 'LAST_FRA_STORAGE':
      return { varer: action.varer };
    default:
      return state;
  }
}

interface CartContextType {
  varer: KurvVare[];
  antallVarer: number;
  totalPris: number;
  leggTil: (produkt: Produkt) => void;
  fjern: (produktId: string) => void;
  oppdaterAntall: (produktId: string, antall: number) => void;
  tømKurv: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { varer: [] });

  useEffect(() => {
    const lagret = localStorage.getItem('handlekurv');
    if (lagret) {
      try {
        dispatch({ type: 'LAST_FRA_STORAGE', varer: JSON.parse(lagret) });
      } catch {
        localStorage.removeItem('handlekurv');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('handlekurv', JSON.stringify(state.varer));
  }, [state.varer]);

  const antallVarer = state.varer.reduce((sum, v) => sum + v.antall, 0);
  const totalPris   = state.varer.reduce((sum, v) => sum + v.produkt.pris * v.antall, 0);

  const leggTil        = useCallback((produkt: Produkt)                    => dispatch({ type: 'LEGG_TIL', produkt }), []);
  const fjern          = useCallback((produktId: string)                   => dispatch({ type: 'FJERN', produktId }), []);
  const oppdaterAntall = useCallback((produktId: string, antall: number)   => dispatch({ type: 'OPPDATER_ANTALL', produktId, antall }), []);
  const tømKurv        = useCallback(()                                    => dispatch({ type: 'TØM_KURV' }), []);

  return (
    <CartContext.Provider
      value={{
        varer: state.varer,
        antallVarer,
        totalPris,
        leggTil,
        fjern,
        oppdaterAntall,
        tømKurv,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart må brukes innenfor CartProvider');
  return context;
}
