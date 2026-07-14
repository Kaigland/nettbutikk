import { Kategori, Produkt } from '@/types';

export type Sprak = 'nb' | 'en';

export const SPRAK: Sprak[] = ['nb', 'en'];

/** Standardspråk hvis vi ikke klarer å lese nettleseren. */
export const STANDARD_SPRAK: Sprak = 'nb';

/**
 * Avgjør språk ut fra nettleserens språkinnstillinger.
 * Norsk (nb/nn/no) → 'nb', alt annet → 'en'.
 */
export function detekterSprak(sprakListe: readonly string[] | undefined): Sprak {
  if (!sprakListe) return STANDARD_SPRAK;
  for (const s of sprakListe) {
    const kode = s.toLowerCase();
    if (kode.startsWith('nb') || kode.startsWith('nn') || kode.startsWith('no')) {
      return 'nb';
    }
  }
  return 'en';
}

/** Formaterer pris. Norsk: «850 kr». Engelsk: «NOK 850». */
export function formatPris(pris: number, sprak: Sprak): string {
  if (sprak === 'en') {
    return `NOK ${pris.toLocaleString('en-US')}`;
  }
  return `${pris.toLocaleString('nb-NO')} kr`;
}

/** Etiketter for produktkategorier på begge språk. */
const KATEGORI_ETIKETTER: Record<string, Record<Sprak, string>> = {
  alle:           { nb: 'Alle',           en: 'All' },
  skåler:         { nb: 'Skåler',         en: 'Bowls' },
  krukker:        { nb: 'Krukker',        en: 'Jars' },
  lysestaker:     { nb: 'Lysestaker',     en: 'Candle holders' },
  serveringsfjøl: { nb: 'Serveringsfjøl', en: 'Serving boards' },
  figurer:        { nb: 'Figurer',        en: 'Figures' },
  møbler:         { nb: 'Møbler',         en: 'Furniture' },
  Bord:           { nb: 'Bord',           en: 'Tables' },
  annet:          { nb: 'Annet',          en: 'Other' },
};

export function kategoriEtikett(kategori: string, sprak: Sprak): string {
  return KATEGORI_ETIKETTER[kategori]?.[sprak] ?? kategori;
}

/** Plukker ut produkttekst på valgt språk (faller tilbake til norsk). */
export function lokaliserProdukt(produkt: Produkt, sprak: Sprak) {
  if (sprak === 'en') {
    return {
      navn: produkt.navn_en ?? produkt.navn,
      beskrivelse: produkt.beskrivelse_en ?? produkt.beskrivelse,
      detaljer: produkt.detaljer_en ?? produkt.detaljer,
    };
  }
  return {
    navn: produkt.navn,
    beskrivelse: produkt.beskrivelse,
    detaljer: produkt.detaljer,
  };
}

/** Alle oversettelser for statisk grensesnittstekst. */
export const oversettelser = {
  nb: {
    nav: {
      produkter: 'Produkter',
      omMeg: 'Om meg',
      handlekurv: 'Handlekurv',
      meny: 'Meny',
      byttSprak: 'Bytt språk',
      norsk: 'Norsk',
      engelsk: 'Engelsk',
    },
    home: {
      heroEyebrow: 'Håndtverk fra Norge',
      heroTitle: 'Skåret ut av norsk tre',
      heroIntro:
        'Skåler, krukker og lysestaker, serveringsfat, bord og små trefigurer – alt formet for hånd i norsk tre, med respekt for materialet og tradisjonshåndverket. Spalting og naturlig åring gjør hvert stykke unikt.',
      seAlleProdukter: 'Se alle produkter',
      omHandverket: 'Om håndverket',
      feature1Tittel: 'Håndlaget',
      feature1Tekst: 'Hvert stykke skåret for hånd',
      feature2Tittel: 'Unikt',
      feature2Tekst: 'Ingen produkter er like',
      feature3Tittel: 'Norsk tre',
      feature3Tekst: 'Eik, bjørk, ask og lind',
      utvalg: 'Utvalg',
      fremhevede: 'Fremhevede produkter',
      seAllePil: 'Se alle →',
      omTittel: 'Om håndverket',
      omTekst:
        'Hvert produkt er laget med respekt for materialet og tradisjonshåndverket. Treet velges med omhu, og hvert stykke bærer med seg naturens egne mønstre og særtrekk.',
      lesMer: 'Les mer om meg og håndverket →',
    },
    produkter: {
      eyebrow: 'Sortiment',
      tittel: 'Produkter',
      undertittel: 'Alle produkter er håndlaget og unike.',
      ingen: 'Ingen produkter i denne kategorien for øyeblikket.',
    },
    produktkort: {
      utsolgt: 'Utsolgt',
      leggIKurv: 'Legg i handlekurv',
    },
    produktDetalj: {
      tilbake: '← Tilbake til produkter',
      lagtIKurv: '✓ Lagt i handlekurv',
      frakt: 'Frakt via Posten. Estimert levering: 3–5 virkedager.',
    },
    omMeg: {
      eyebrow: 'Bakgrunn',
      tittel: 'Om meg og håndverket',
      s1Tittel: 'Lidenskap for tre',
      s1Tekst:
        'Mitt navn er Reidar Igland. Jeg har drevet med treskjæring og dreining i over 10 år. Det startet som en hobby på kveldstid i garasjen, og har blitt en lidenskap og et håndverk jeg er stolt av å bringe videre. Hvert produkt er laget av meg, for hånd, fra start til slutt.',
      s2Tittel: 'Materialer fra norsk natur',
      s2Tekst:
        'Jeg bruker norske tresorter som eik, bjørk, ask og lind. Treverket hentes fra lokale sager og skogbruk. All overflatebehandling er food-safe – linolje, bivoks og matolje – og skånsom mot materialet. Produktene er trygge å bruke til mat.',
      s3Tittel: 'Hvert stykke er unikt',
      s3Tekst:
        'Naturen er den beste designeren. Maseringsmønster, kvister og naturkanter gjør hvert produkt unikt. Det du kjøper er ikke et masseprodusert objekt – det er et håndverk med sjel, som vil bli vakrere med bruk og tid.',
      s4Tittel: 'Spesialbestillinger',
      s4Tekst:
        'Ønsker du noe spesielt – en gave, et minneprodukt laget av bestemt trevirke, eller et produkt i en bestemt størrelse? Ta gjerne kontakt, så finner vi en løsning.',
      sendEpost: 'Send en e-post',
    },
    footer: {
      tagline:
        'Håndskårne og dreide produkter i norsk tre. Laget med kjærlighet og respekt for materialet og håndverkstradisjonen.',
      navigasjon: 'Navigasjon',
      kontakt: 'Kontakt',
      produkter: 'Produkter',
      omMeg: 'Om meg',
      handlekurv: 'Handlekurv',
      juridisk: 'Vilkår',
      salgsbetingelser: 'Salgsbetingelser',
      angrerett: 'Angrerett',
      personvern: 'Personvern',
      rettigheter: 'Alle rettigheter forbeholdt.',
    },
    handlekurv: {
      tomTittel: 'Handlekurven er tom',
      tomTekst: 'Gå til produktsiden og finn noe du liker.',
      seProdukter: 'Se produkter',
      tittel: 'Handlekurv',
      fjern: 'Fjern',
      subtotal: 'Subtotal',
      frakt: 'Frakt',
      beregnes: 'Beregnes i kassen',
      totalt: 'Totalt',
      kort: 'Kort',
      vipps: 'Vipps',
      leveringsinfo: 'Leveringsinformasjon',
      phNavn: 'Navn',
      phEpost: 'E-post',
      phTelefon: 'Mobilnummer',
      phAdresse: 'Gateadresse',
      phPostnr: 'Postnr.',
      phPoststed: 'Poststed',
      feilBetaling: 'Noe gikk galt med betalingen. Prøv igjen.',
      feilVippsFelt: 'Fyll inn navn, e-post og leveringsadresse for å betale med Vipps.',
      feilVippsStart: 'Kunne ikke starte Vipps-betaling. Prøv igjen.',
      betalKort: 'Betal med kort via Stripe',
      koblerBetaling: 'Kobler til betaling...',
      betalVipps: 'Betal med Vipps',
      koblerVipps: 'Kobler til Vipps...',
      fortsettHandle: 'Fortsett å handle',
      sikkerBetaling:
        'Sikker betaling via Stripe eller Vipps. Kort- og kontoinformasjon lagres ikke hos oss.',
    },
    suksess: {
      tittel: 'Takk for kjøpet!',
      tekst: 'Bestillingen din er registrert og du vil motta en bekreftelse på e-post.',
      levering: 'Estimert levering: 3–5 virkedager via Posten.',
      seFlere: 'Se flere produkter',
      tilbakeForsiden: 'Tilbake til forsiden',
    },
    avbrutt: {
      tittel: 'Betaling avbrutt',
      tekst: 'Betalingen ble avbrutt. Varene dine er fortsatt i handlekurven.',
      tilbakeHandlekurv: 'Tilbake til handlekurven',
      fortsettHandle: 'Fortsett å handle',
    },
    vippsRetur: {
      bekrefterTittel: 'Bekrefter betalingen …',
      bekrefterTekst: 'Vent litt mens vi verifiserer Vipps-betalingen.',
      okTittel: 'Takk for kjøpet!',
      okTekst: 'Vipps-betalingen er registrert og du vil motta en bekreftelse på e-post.',
      levering: 'Estimert levering: 3–5 virkedager via Posten.',
      seFlere: 'Se flere produkter',
      tilbakeForsiden: 'Tilbake til forsiden',
      avbruttTittel: 'Betalingen ble avbrutt',
      feilTittel: 'Noe gikk galt',
      avbruttTekst: 'Vipps-betalingen ble ikke fullført. Handlekurven din er beholdt.',
      feilTekst:
        'Vi klarte ikke å bekrefte betalingen. Er du belastet, ta kontakt, så hjelper vi deg.',
      tilbakeHandlekurv: 'Tilbake til handlekurven',
    },
    epost: {
      emne: 'Ordrebekreftelse',
      hilsen: 'Takk for bestillingen',
      intro: 'Vi har mottatt betalingen din og behandler ordren nå.',
      thProdukt: 'Produkt',
      thAntall: 'Ant.',
      thPris: 'Pris',
      totaltBetalt: 'Totalt betalt',
      leveringsadresse: 'Leveringsadresse',
      levering: 'Estimert levering: 3–5 virkedager via Posten.',
      sporsmal: 'Har du spørsmål? Svar på denne e-posten.',
    },
  },
  en: {
    nav: {
      produkter: 'Products',
      omMeg: 'About',
      handlekurv: 'Cart',
      meny: 'Menu',
      byttSprak: 'Change language',
      norsk: 'Norwegian',
      engelsk: 'English',
    },
    home: {
      heroEyebrow: 'Craft from Norway',
      heroTitle: 'Carved from Norwegian wood',
      heroIntro:
        'Bowls, jars and candle holders, serving trays, tables and small wooden figures – all shaped by hand from Norwegian wood, with respect for the material and traditional craftsmanship. Cracking and natural grain make each piece unique.',
      seAlleProdukter: 'See all products',
      omHandverket: 'About the craft',
      feature1Tittel: 'Handmade',
      feature1Tekst: 'Every piece carved by hand',
      feature2Tittel: 'Unique',
      feature2Tekst: 'No two products are alike',
      feature3Tittel: 'Norwegian wood',
      feature3Tekst: 'Oak, birch, ash and lime',
      utvalg: 'Selection',
      fremhevede: 'Featured products',
      seAllePil: 'See all →',
      omTittel: 'About the craft',
      omTekst:
        'Every product is made with respect for the material and traditional craftsmanship. The wood is chosen with care, and each piece carries nature’s own patterns and character.',
      lesMer: 'Read more about me and the craft →',
    },
    produkter: {
      eyebrow: 'Range',
      tittel: 'Products',
      undertittel: 'Every product is handmade and unique.',
      ingen: 'No products in this category at the moment.',
    },
    produktkort: {
      utsolgt: 'Sold out',
      leggIKurv: 'Add to cart',
    },
    produktDetalj: {
      tilbake: '← Back to products',
      lagtIKurv: '✓ Added to cart',
      frakt: 'Shipping via Posten. Estimated delivery: 3–5 business days.',
    },
    omMeg: {
      eyebrow: 'Background',
      tittel: 'About me and the craft',
      s1Tittel: 'A passion for wood',
      s1Tekst:
        'My name is Reidar Igland. I have been carving and turning wood for over 10 years. It started as an evening hobby in the garage and has become a passion and a craft I am proud to carry on. Every product is made by me, by hand, from start to finish.',
      s2Tittel: 'Materials from Norwegian nature',
      s2Tekst:
        'I use Norwegian woods such as oak, birch, ash and lime. The timber is sourced from local sawmills and forestry. All surface treatment is food-safe – linseed oil, beeswax and food oil – and gentle on the material. The products are safe to use with food.',
      s3Tittel: 'Every piece is unique',
      s3Tekst:
        'Nature is the best designer. Grain patterns, knots and natural edges make every product unique. What you buy is not a mass-produced object – it is a craft with soul that will grow more beautiful with use and time.',
      s4Tittel: 'Custom orders',
      s4Tekst:
        'Would you like something special – a gift, a keepsake made from a particular wood, or a product in a specific size? Feel free to get in touch and we will find a solution.',
      sendEpost: 'Send an email',
    },
    footer: {
      tagline:
        'Hand-carved and turned products in Norwegian wood. Made with love and respect for the material and the craft tradition.',
      navigasjon: 'Navigation',
      kontakt: 'Contact',
      produkter: 'Products',
      omMeg: 'About',
      handlekurv: 'Cart',
      juridisk: 'Terms',
      salgsbetingelser: 'Terms of sale',
      angrerett: 'Right of withdrawal',
      personvern: 'Privacy',
      rettigheter: 'All rights reserved.',
    },
    handlekurv: {
      tomTittel: 'Your cart is empty',
      tomTekst: 'Head to the products page and find something you like.',
      seProdukter: 'See products',
      tittel: 'Cart',
      fjern: 'Remove',
      subtotal: 'Subtotal',
      frakt: 'Shipping',
      beregnes: 'Calculated at checkout',
      totalt: 'Total',
      kort: 'Card',
      vipps: 'Vipps',
      leveringsinfo: 'Delivery information',
      phNavn: 'Name',
      phEpost: 'Email',
      phTelefon: 'Mobile number',
      phAdresse: 'Street address',
      phPostnr: 'Postal code',
      phPoststed: 'City',
      feilBetaling: 'Something went wrong with the payment. Please try again.',
      feilVippsFelt: 'Enter name, email and delivery address to pay with Vipps.',
      feilVippsStart: 'Could not start Vipps payment. Please try again.',
      betalKort: 'Pay by card via Stripe',
      koblerBetaling: 'Connecting to payment...',
      betalVipps: 'Pay with Vipps',
      koblerVipps: 'Connecting to Vipps...',
      fortsettHandle: 'Continue shopping',
      sikkerBetaling:
        'Secure payment via Stripe or Vipps. Card and account details are never stored by us.',
    },
    suksess: {
      tittel: 'Thank you for your purchase!',
      tekst: 'Your order has been registered and you will receive a confirmation by email.',
      levering: 'Estimated delivery: 3–5 business days via Posten.',
      seFlere: 'See more products',
      tilbakeForsiden: 'Back to home',
    },
    avbrutt: {
      tittel: 'Payment cancelled',
      tekst: 'The payment was cancelled. Your items are still in the cart.',
      tilbakeHandlekurv: 'Back to the cart',
      fortsettHandle: 'Continue shopping',
    },
    vippsRetur: {
      bekrefterTittel: 'Confirming the payment …',
      bekrefterTekst: 'Please wait while we verify the Vipps payment.',
      okTittel: 'Thank you for your purchase!',
      okTekst: 'The Vipps payment has been registered and you will receive a confirmation by email.',
      levering: 'Estimated delivery: 3–5 business days via Posten.',
      seFlere: 'See more products',
      tilbakeForsiden: 'Back to home',
      avbruttTittel: 'The payment was cancelled',
      feilTittel: 'Something went wrong',
      avbruttTekst: 'The Vipps payment was not completed. Your cart has been kept.',
      feilTekst:
        'We could not confirm the payment. If you have been charged, please get in touch and we will help you.',
      tilbakeHandlekurv: 'Back to the cart',
    },
    epost: {
      emne: 'Order confirmation',
      hilsen: 'Thank you for your order',
      intro: 'We have received your payment and are now processing your order.',
      thProdukt: 'Product',
      thAntall: 'Qty',
      thPris: 'Price',
      totaltBetalt: 'Total paid',
      leveringsadresse: 'Delivery address',
      levering: 'Estimated delivery: 3–5 business days via Posten.',
      sporsmal: 'Questions? Just reply to this email.',
    },
  },
} as const;

/** Widener literal-typene fra `as const` til vanlige strenger, slik at
 *  begge språk deler samme type og kan brukes om hverandre. */
type DypStreng<T> = {
  [K in keyof T]: T[K] extends string ? string : DypStreng<T[K]>;
};

export type Oversettelser = DypStreng<(typeof oversettelser)['nb']>;
