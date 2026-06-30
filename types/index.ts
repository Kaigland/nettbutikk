export interface Produkt {
  id: string;
  navn: string;
  pris: number;
  kategori: 'skåler' | 'lysestaker' | 'fat' | 'annet';
  beskrivelse: string;
  detaljer: string[];
  bilde: string;
  lagerstatus: 'på_lager' | 'utsolgt';
}

export interface KurvVare {
  produkt: Produkt;
  antall: number;
}
