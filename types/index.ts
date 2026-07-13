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
  pris: number;
  kategori: Kategori;
  beskrivelse: string;
  detaljer: string[];
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
