export type Kategori =
  | 'skåler'
  | 'krukker'
  | 'lysestaker'
  | 'serveringsfjøl'
  | 'figurer'
  | 'Bord'
  | 'annet';

export interface Produkt {
  id: string;
  navn: string;
  /** Engelsk produktnavn. */
  navn_en?: string;
  pris: number;
  kategori: Kategori;
  beskrivelse: string;
  /** Engelsk produktbeskrivelse. */
  beskrivelse_en?: string;
  detaljer: string[];
  /** Engelske produktdetaljer. */
  detaljer_en?: string[];
  bilde: string;
  /** Ekstra bilder til galleri (valgfritt). Hovedbildet er `bilde`. */
  bilder?: string[];
  lagerstatus: 'på_lager' | 'utsolgt';
  /** Vises i «Fremhevede produkter» på forsiden. */
  fremhevet: boolean;
}

export interface KurvVare {
  produkt: Produkt;
  antall: number;
}
