import { Sprak } from '@/lib/i18n';

/**
 * Juridisk innhold for nettbutikken (salgsbetingelser, angrerett og personvern).
 *
 * Salgsbetingelsene bygger på Forbrukertilsynets offisielle standardmal for
 * forbrukerkjøp av varer over Internett, tilpasset Igland Woodcraft. Den norske
 * teksten er den juridisk styrende; engelsk versjon er en oversettelse for
 * kundens bekvemmelighet.
 *
 * MERK: Fyll inn organisasjonsnummer i SELGER under før publisering. Er du ikke
 * mva-registrert, juster teksten i «Priser» i tråd med det.
 */

export const SELGER = {
  navn: 'Igland Woodcraft',
  innehaver: 'Kent Andre Igland',
  adresse: 'Grotlevegen 277, 6727 Bremanger, Norge',
  epost: 'post@iglandwoodcraft.com',
  telefon: '+47 415 07 491',
  orgnr: '922 628 572',
};

/** Et avsnitt er enten ren tekst, eller en tekst med en uthevet ledetekst. */
export type Avsnitt = string | { ledd: string; tekst: string };

export interface Seksjon {
  tittel?: string;
  avsnitt: Avsnitt[];
}

export interface JuridiskDok {
  eyebrow: string;
  tittel: string;
  oppdatert: string;
  ingress?: string;
  /** Nummererer seksjoner med tittel (1., 2., 3. ...). */
  nummerert?: boolean;
  seksjoner: Seksjon[];
}

const kontaktNb =
  `${SELGER.navn}, ${SELGER.adresse}. E-post: ${SELGER.epost}. ` +
  `Telefon: ${SELGER.telefon}. Organisasjonsnummer: ${SELGER.orgnr}.`;
const kontaktEn =
  `${SELGER.navn}, ${SELGER.adresse}. Email: ${SELGER.epost}. ` +
  `Phone: ${SELGER.telefon}. Company registration number: ${SELGER.orgnr}.`;

/* ------------------------------------------------------------------ */
/*  SALGSBETINGELSER                                                   */
/* ------------------------------------------------------------------ */

const salgsbetingelser: Record<Sprak, JuridiskDok> = {
  nb: {
    eyebrow: 'Kjøpsvilkår',
    tittel: 'Salgsbetingelser',
    oppdatert: 'Sist oppdatert: 14. juli 2026',
    nummerert: true,
    ingress:
      'Dette kjøpet er regulert av de nedenstående standard salgsbetingelsene for ' +
      'forbrukerkjøp av varer over Internett. Forbrukerkjøp over Internett reguleres ' +
      'hovedsakelig av avtaleloven, forbrukerkjøpsloven, markedsføringsloven, ' +
      'angrerettloven og e-handelsloven, og disse lovene gir forbrukeren ufravikelige ' +
      'rettigheter. Vilkårene skal ikke forstås som noen begrensning i de lovbestemte ' +
      'rettighetene, men oppstiller partenes viktigste rettigheter og plikter for handelen. ' +
      'Salgsbetingelsene er utarbeidet og anbefalt av Forbrukertilsynet.',
    seksjoner: [
      {
        tittel: 'Avtalen',
        avsnitt: [
          'Avtalen består av disse salgsbetingelsene, opplysninger gitt i bestillingsløsningen ' +
            'og eventuelt særskilt avtalte vilkår. Ved eventuell motstrid mellom opplysningene, ' +
            'går det som særskilt er avtalt mellom partene foran, så fremt det ikke strider mot ' +
            'ufravikelig lovgivning.',
          'Avtalen vil i tillegg bli utfylt av relevante lovbestemmelser som regulerer kjøp av ' +
            'varer mellom næringsdrivende og forbrukere.',
        ],
      },
      {
        tittel: 'Partene',
        avsnitt: [
          { ledd: 'Selger:', tekst: kontaktNb + ' Selger benevnes i det følgende som «selger/vi/oss».' },
          { ledd: 'Kjøper:', tekst: 'Den forbrukeren som foretar bestillingen, benevnes i det følgende som «kjøper/deg/din».' },
        ],
      },
      {
        tittel: 'Priser',
        avsnitt: [
          'Igland Woodcraft er ikke registrert i Merverdiavgiftsregisteret, og prisene som er oppgitt ' +
            'i nettbutikken inkluderer derfor ikke merverdiavgift. Opplysninger om de totale ' +
            'kostnadene kjøperen skal betale, inkludert leveringskostnader (frakt, porto, emballasje ' +
            'med videre), samt spesifisering av de enkelte elementene i totalprisen, gis i ' +
            'bestillingsløsningen før bestilling er foretatt.',
        ],
      },
      {
        tittel: 'Avtaleinngåelse',
        avsnitt: [
          'Avtalen er bindende for begge parter når kjøperen har sendt sin bestilling til selgeren.',
          'Avtalen er likevel ikke bindende hvis det har forekommet skrive- eller tastefeil i ' +
            'tilbudet fra selgeren i bestillingsløsningen i nettbutikken eller i kjøperens ' +
            'bestilling, og den annen part innså eller burde ha innsett at det forelå en slik feil.',
        ],
      },
      {
        tittel: 'Ordrebekreftelse',
        avsnitt: [
          'Når selgeren har mottatt kjøperens bestilling, skal selgeren uten ugrunnet opphold ' +
            'bekrefte ordren ved å sende en ordrebekreftelse til kjøperen.',
          'Det anbefales at kjøperen kontrollerer at ordrebekreftelsen stemmer overens med ' +
            'bestillingen med hensyn til antall, varetype, pris osv. Er det ikke samsvar mellom ' +
            'bestillingen og ordrebekreftelsen, bør kjøperen ta kontakt med selger så snart som mulig.',
        ],
      },
      {
        tittel: 'Betaling',
        avsnitt: [
          'Selgeren kan kreve betaling for varen fra det tidspunkt den blir sendt fra selgeren til ' +
            'kjøperen. Betaling skjer i nettbutikken via Vipps eller med betalingskort (Visa/Mastercard) ' +
            'gjennom vår betalingsformidler Stripe. Kort- og kontoopplysninger behandles av ' +
            'betalingsformidleren og lagres ikke hos selger.',
          'Dersom kjøperen bruker kredittkort eller debetkort ved betaling, kan selgeren reservere ' +
            'kjøpesummen på kortet ved bestilling. Kortet blir belastet samme dag som varen sendes.',
          'Kjøperen har krav på faktura ved kjøp av varer dersom kjøperen etterspør dette.',
        ],
      },
      {
        tittel: 'Levering',
        avsnitt: [
          'Levering er skjedd når kjøperen, eller hans representant, har overtatt tingen. Varene ' +
            'sendes med Posten. Hvis ikke leveringstidspunkt fremgår av bestillingsløsningen, skal ' +
            'selgeren levere varen til kjøper uten unødig opphold og senest 30 dager etter ' +
            'bestillingen. Normal forsendelsestid er 3–5 virkedager. Varen skal leveres hos kjøperen ' +
            'med mindre annet er særskilt avtalt mellom partene.',
        ],
      },
      {
        tittel: 'Risikoen for varen',
        avsnitt: [
          'Risikoen for varen går over på kjøperen når han, eller hans representant, har fått varene ' +
            'levert i tråd med punktet om levering. Ettersom hvert produkt er håndlaget og unikt, ' +
            'pakkes varene forsvarlig for transport.',
        ],
      },
      {
        tittel: 'Angrerett',
        avsnitt: [
          'Med mindre avtalen er unntatt fra angrerett, kan kjøperen angre kjøpet av varen i henhold ' +
            'til angrerettloven. Kjøperen må gi selger melding om bruk av angreretten innen 14 dager ' +
            'fra fristen begynner å løpe. I fristen inkluderes alle kalenderdager. Dersom fristen ' +
            'ender på en lørdag, helligdag eller høytidsdag, forlenges fristen til nærmeste virkedag.',
          'Angrefristen anses overholdt dersom melding er sendt før utløpet av fristen. Kjøper har ' +
            'bevisbyrden for at angreretten er blitt gjort gjeldende, og meldingen bør derfor skje ' +
            'skriftlig (angreskjema, e-post eller brev).',
          'Ved kjøp av enkeltstående varer løper angrefristen fra dagen etter varen(e) er mottatt. ' +
            'Består kjøpet av flere leveranser, løper fristen fra dagen etter siste leveranse er mottatt.',
          'Angrefristen utvides til 12 måneder etter utløpet av den opprinnelige fristen dersom selger ' +
            'ikke før avtaleinngåelsen opplyser om at det foreligger angrerett og standardisert ' +
            'angreskjema. Sørger selger for å gi opplysningene i løpet av disse 12 månedene, utløper ' +
            'angrefristen likevel 14 dager etter den dagen kjøperen mottok opplysningene.',
          'Ved bruk av angreretten må varen leveres tilbake til selgeren uten unødig opphold og senest ' +
            '14 dager fra melding om bruk av angreretten er gitt. Kjøper dekker de direkte kostnadene ' +
            'ved å returnere varen, med mindre annet er avtalt eller selger har unnlatt å opplyse om at ' +
            'kjøper skal dekke returkostnadene. Selgeren kan ikke fastsette gebyr for kjøperens bruk av ' +
            'angreretten.',
          'Kjøper kan prøve eller teste varen på en forsvarlig måte for å fastslå varens art, ' +
            'egenskaper og funksjon, uten at angreretten faller bort. Dersom prøving eller test går ' +
            'utover hva som er forsvarlig og nødvendig, kan kjøperen bli ansvarlig for eventuell ' +
            'redusert verdi på varen.',
          'Selgeren er forpliktet til å tilbakebetale kjøpesummen til kjøperen uten unødig opphold, og ' +
            'senest 14 dager fra selgeren fikk melding om kjøperens beslutning om å benytte angreretten. ' +
            'Selger har rett til å holde tilbake betalingen til han har mottatt varene fra kjøperen, ' +
            'eller til kjøper har lagt frem dokumentasjon på at varene er sendt tilbake.',
          {
            ledd: 'Unntak fra angreretten:',
            tekst:
              'Angreretten gjelder ikke for varer som er fremstilt etter kjøperens spesifikasjoner, ' +
              'eller som har fått et tydelig personlig preg (jf. angrerettloven § 22 bokstav a). ' +
              'Spesialbestilte og skreddersydde produkter – for eksempel gravering eller produkter ' +
              'laget i bestemte mål eller trevirke etter kundens ønske – er derfor unntatt fra ' +
              'angreretten. Kjøper gjøres oppmerksom på dette før bestilling av slike varer.',
          },
          'Se egen side for angrerett og standardisert angreskjema.',
        ],
      },
      {
        tittel: 'Undersøkelse av varen',
        avsnitt: [
          'Når kjøperen mottar varen, anbefales det at han eller hun i rimelig utstrekning undersøker ' +
            'om den er i samsvar med bestillingen, om den har blitt skadet under transporten, eller om ' +
            'den ellers har mangler. Hvis varen ikke samsvarer med bestillingen eller har mangler, må ' +
            'kjøperen melde fra til selgeren ved reklamasjon.',
        ],
      },
      {
        tittel: 'Reklamasjon ved mangel og frist for å melde krav ved forsinkelse',
        avsnitt: [
          'Dersom det foreligger en mangel ved varen, må kjøper innen rimelig tid etter at han eller ' +
            'hun oppdaget eller burde ha oppdaget den, gi selger melding om at han eller hun vil ' +
            'påberope seg mangelen. Fristen for å reklamere kan aldri være kortere enn to måneder fra ' +
            'det tidspunkt da forbrukeren oppdaget mangelen. Reklamasjon må likevel skje senest to år ' +
            'etter at kjøper overtok varen. Dersom varen eller deler av den er ment å vare vesentlig ' +
            'lenger enn to år, er reklamasjonsfristen fem år. Ettersom våre håndlagde treprodukter er ' +
            'ment å vare vesentlig lenger enn to år, gjelder normalt en reklamasjonsfrist på fem år.',
          'Ved forsinkelse må krav rettes selger innen rimelig tid etter at leveringstiden er kommet ' +
            'og varen ikke er levert. Dersom varen er betalt med kredittkort, kan kjøperen også velge å ' +
            'reklamere og sende krav direkte til kredittyter. Meldingen til selger eller kredittyter bør ' +
            'være skriftlig (e-post eller brev).',
        ],
      },
      {
        tittel: 'Kjøperens rettigheter ved forsinkelse',
        avsnitt: [
          'Dersom selgeren ikke leverer varen eller leverer den for sent i henhold til avtalen mellom ' +
            'partene, og dette ikke skyldes kjøperen eller forhold på kjøperens side, kan kjøperen etter ' +
            'omstendighetene holde kjøpesummen tilbake, kreve oppfyllelse, heve avtalen og/eller kreve ' +
            'erstatning fra selgeren, jf. forbrukerkjøpslovens kapittel 5.',
          { ledd: 'Oppfyllelse:', tekst: 'Kjøper kan fastholde kjøpet og kreve oppfyllelse fra selger. Kjøper taper sin rett til å kreve oppfyllelse om han eller hun venter urimelig lenge med å fremme kravet.' },
          { ledd: 'Heving:', tekst: 'Dersom selgeren ikke leverer på leveringstidspunktet, kan kjøperen oppfordre selger til å levere innen en rimelig tilleggsfrist. Leverer ikke selger innen fristen, kan kjøperen heve kjøpet. Kjøper kan heve umiddelbart hvis selger nekter å levere, eller dersom levering til avtalt tid var avgjørende for avtalen.' },
          { ledd: 'Erstatning:', tekst: 'Kjøperen kan kreve erstatning for lidt tap som følge av forsinkelsen. Dette gjelder likevel ikke dersom selgeren godtgjør at forsinkelsen skyldes en hindring utenfor selgers kontroll som ikke med rimelighet kunne blitt tatt i betraktning, unngått eller overvunnet.' },
        ],
      },
      {
        tittel: 'Kjøperens rettigheter ved mangel',
        avsnitt: [
          'Dersom varen har en mangel og dette ikke skyldes kjøperen eller forhold på kjøperens side, ' +
            'kan kjøperen etter omstendighetene holde kjøpesummen tilbake, velge mellom retting og ' +
            'omlevering, kreve prisavslag, kreve avtalen hevet og/eller kreve erstatning, jf. ' +
            'forbrukerkjøpsloven kapittel 6.',
          { ledd: 'Retting eller omlevering:', tekst: 'Kjøperen kan velge mellom å kreve mangelen rettet eller levering av tilsvarende ting. Selger kan motsette seg kravet dersom gjennomføringen er umulig eller volder selgeren urimelige kostnader. Retting eller omlevering skal foretas innen rimelig tid.' },
          { ledd: 'Naturlige variasjoner:', tekst: 'Ettersom hvert produkt er håndlaget og unikt, kan en omlevering avvike noe i maserings- og fargemønster. Naturlige variasjoner i treet (åring, kvist, farge og små sprekker) samt patina som oppstår ved bruk og over tid, regnes ikke som mangler.' },
          { ledd: 'Prisavslag:', tekst: 'Kjøper kan kreve et passende prisavslag dersom varen ikke blir rettet eller omlevert, slik at forholdet mellom nedsatt og avtalt pris svarer til forholdet mellom tingens verdi i mangelfull og kontraktsmessig stand.' },
          { ledd: 'Heving:', tekst: 'Dersom varen ikke er rettet eller omlevert, kan kjøperen også heve kjøpet når mangelen ikke er uvesentlig.' },
          { ledd: 'Erstatning:', tekst: 'Kjøperen kan kreve erstatning for økonomisk tap som følge av mangelen, med mindre selger godtgjør at tapet skyldes en hindring utenfor selgers kontroll.' },
        ],
      },
      {
        tittel: 'Selgerens rettigheter ved kjøperens mislighold',
        avsnitt: [
          'Dersom kjøperen ikke betaler eller oppfyller de øvrige pliktene etter avtalen eller loven, ' +
            'og dette ikke skyldes selgeren eller forhold på selgerens side, kan selgeren etter ' +
            'omstendighetene holde varen tilbake, kreve oppfyllelse, kreve avtalen hevet samt kreve ' +
            'erstatning, jf. forbrukerkjøpsloven kapittel 9. Selgeren kan også etter omstendighetene ' +
            'kreve renter ved forsinket betaling, inkassogebyr og et rimelig gebyr ved uavhentede varer.',
          { ledd: 'Renter og inkasso:', tekst: 'Betaler kjøperen ikke i henhold til avtalen, kan selger kreve renter etter forsinkelsesrenteloven. Ved manglende betaling kan kravet, etter forutgående varsel, sendes til inkasso.' },
          { ledd: 'Uavhentede varer:', tekst: 'Dersom kjøperen unnlater å hente ubetalte varer, kan selger belaste kjøper med et gebyr som maksimalt dekker selgerens faktiske utlegg for å levere varen. Slikt gebyr kan ikke belastes kjøpere under 18 år.' },
        ],
      },
      {
        tittel: 'Garanti',
        avsnitt: [
          'Garanti som gis av selgeren eller produsenten gir kjøperen rettigheter i tillegg til de ' +
            'kjøperen allerede har etter ufravikelig lovgivning. En garanti innebærer dermed ingen ' +
            'begrensninger i kjøperens rett til reklamasjon og krav ved forsinkelse eller mangler. ' +
            'Igland Woodcraft gir per i dag ingen egen garanti utover forbrukerens lovbestemte ' +
            'rettigheter.',
        ],
      },
      {
        tittel: 'Personopplysninger',
        avsnitt: [
          'Behandlingsansvarlig for innsamlede personopplysninger er selger. Med mindre kjøperen ' +
            'samtykker til noe annet, kan selgeren, i tråd med personvernlovgivningen (GDPR og ' +
            'personopplysningsloven), kun innhente og lagre de personopplysninger som er nødvendige for ' +
            'å gjennomføre forpliktelsene etter avtalen. Personopplysningene utleveres kun til andre ' +
            'når det er nødvendig for å gjennomføre avtalen (for eksempel til betalingsformidler og ' +
            'fraktleverandør), eller i lovbestemte tilfeller. Se egen personvernerklæring for nærmere ' +
            'informasjon.',
        ],
      },
      {
        tittel: 'Konfliktløsning',
        avsnitt: [
          'Klager rettes til selger innen rimelig tid. Partene skal forsøke å løse eventuelle tvister i ' +
            'minnelighet. Dersom dette ikke lykkes, kan kjøperen ta kontakt med Forbrukertilsynet for ' +
            'mekling. Forbrukertilsynet er tilgjengelig på telefon 23 400 600 eller ' +
            'www.forbrukertilsynet.no.',
          'Europakommisjonens klageportal kan også brukes hvis du ønsker å inngi en klage. Det er ' +
            'særlig relevant hvis du er forbruker bosatt i et annet EU-land. Klagen inngis her: ' +
            'http://ec.europa.eu/odr.',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Terms of sale',
    tittel: 'Terms and Conditions of Sale',
    oppdatert: 'Last updated: 14 July 2026',
    nummerert: true,
    ingress:
      'This purchase is governed by the following standard terms of sale for consumer ' +
      'purchases of goods over the Internet. Such purchases are mainly regulated by the ' +
      'Norwegian Contracts Act, the Consumer Purchases Act, the Marketing Control Act, the ' +
      'Right of Withdrawal Act and the E-commerce Act, which give the consumer mandatory ' +
      'rights. These terms do not limit the statutory rights, but set out the parties’ most ' +
      'important rights and obligations. The terms are prepared and recommended by the ' +
      'Norwegian Consumer Authority (Forbrukertilsynet). The Norwegian version prevails in ' +
      'the event of any discrepancy.',
    seksjoner: [
      {
        tittel: 'The agreement',
        avsnitt: [
          'The agreement consists of these terms of sale, the information given in the ordering ' +
            'solution and any separately agreed terms. In the event of a conflict, what has been ' +
            'specifically agreed between the parties takes precedence, provided it does not conflict ' +
            'with mandatory legislation.',
          'The agreement is further supplemented by the relevant statutory provisions governing the ' +
            'purchase of goods between businesses and consumers.',
        ],
      },
      {
        tittel: 'The parties',
        avsnitt: [
          { ledd: 'Seller:', tekst: kontaktEn + ' The seller is hereinafter referred to as “the seller/we/us”.' },
          { ledd: 'Buyer:', tekst: 'The consumer who places the order, hereinafter referred to as “the buyer/you/your”.' },
        ],
      },
      {
        tittel: 'Prices',
        avsnitt: [
          'Igland Woodcraft is not registered in the Norwegian VAT Register, and the prices stated in ' +
            'the online store therefore do not include value added tax (VAT). Information about the ' +
            'total costs the buyer must pay, including delivery costs (shipping, postage, packaging, ' +
            'etc.), and a breakdown of the individual elements of the total price, is given in the ' +
            'ordering solution before the order is placed.',
        ],
      },
      {
        tittel: 'Conclusion of the agreement',
        avsnitt: [
          'The agreement is binding on both parties once the buyer has submitted the order to the seller.',
          'The agreement is nevertheless not binding if there has been a typographical or clerical error ' +
            'in the seller’s offer in the ordering solution, or in the buyer’s order, and the other party ' +
            'realised or should have realised that such an error existed.',
        ],
      },
      {
        tittel: 'Order confirmation',
        avsnitt: [
          'Once the seller has received the buyer’s order, the seller shall confirm the order without ' +
            'undue delay by sending an order confirmation to the buyer.',
          'The buyer is advised to check that the order confirmation matches the order with regard to ' +
            'quantity, product type, price, etc. If there is any discrepancy, the buyer should contact ' +
            'the seller as soon as possible.',
        ],
      },
      {
        tittel: 'Payment',
        avsnitt: [
          'The seller may demand payment for the goods from the time they are dispatched to the buyer. ' +
            'Payment is made in the online store via Vipps or by payment card (Visa/Mastercard) through ' +
            'our payment provider Stripe. Card and account details are handled by the payment provider ' +
            'and are not stored by the seller.',
          'If the buyer pays by credit or debit card, the seller may reserve the purchase amount on the ' +
            'card at the time of ordering. The card is charged on the same day the goods are dispatched.',
          'The buyer is entitled to an invoice upon request.',
        ],
      },
      {
        tittel: 'Delivery',
        avsnitt: [
          'Delivery has taken place once the buyer, or the buyer’s representative, has taken possession ' +
            'of the item. The goods are shipped with Posten. Unless a delivery time is stated in the ' +
            'ordering solution, the seller shall deliver without undue delay and no later than 30 days ' +
            'after the order. Normal shipping time is 3–5 business days. The goods are delivered to the ' +
            'buyer unless otherwise specifically agreed.',
        ],
      },
      {
        tittel: 'Risk for the goods',
        avsnitt: [
          'The risk for the goods passes to the buyer once the buyer, or the buyer’s representative, ' +
            'has received the goods in accordance with the delivery clause. As each product is handmade ' +
            'and unique, the goods are packaged securely for transport.',
        ],
      },
      {
        tittel: 'Right of withdrawal',
        avsnitt: [
          'Unless the agreement is exempt from the right of withdrawal, the buyer may withdraw from the ' +
            'purchase in accordance with the Right of Withdrawal Act. The buyer must notify the seller ' +
            'of the use of the right of withdrawal within 14 days from when the period begins to run. ' +
            'All calendar days are included. If the deadline falls on a Saturday, public holiday or ' +
            'high holiday, it is extended to the next business day.',
          'The deadline is deemed met if notice is sent before it expires. The buyer bears the burden ' +
            'of proof that the right of withdrawal has been exercised, so notice should be given in ' +
            'writing (withdrawal form, email or letter).',
          'For single items, the withdrawal period runs from the day after the item(s) are received. ' +
            'If the purchase consists of several deliveries, it runs from the day after the last ' +
            'delivery is received.',
          'The withdrawal period is extended to 12 months after the original deadline if the seller ' +
            'does not, before conclusion of the agreement, inform the buyer of the right of withdrawal ' +
            'and provide the standardised withdrawal form. If the seller provides this information ' +
            'within those 12 months, the period nevertheless expires 14 days after the buyer received ' +
            'the information.',
          'When exercising the right of withdrawal, the goods must be returned to the seller without ' +
            'undue delay and no later than 14 days from the notice. The buyer covers the direct cost of ' +
            'returning the goods unless otherwise agreed. The seller may not charge a fee for the ' +
            'buyer’s use of the right of withdrawal.',
          'The buyer may inspect or test the goods in a responsible manner to establish their nature, ' +
            'characteristics and function without losing the right of withdrawal. If testing goes ' +
            'beyond what is reasonable and necessary, the buyer may be liable for any reduced value.',
          'The seller is obliged to refund the purchase amount without undue delay, and no later than ' +
            '14 days from receiving notice of the buyer’s decision to withdraw. The seller may withhold ' +
            'the refund until the goods have been received, or until the buyer has documented that the ' +
            'goods have been returned.',
          {
            ledd: 'Exemption from the right of withdrawal:',
            tekst:
              'The right of withdrawal does not apply to goods made to the buyer’s specifications, or ' +
              'which have been given a clear personal touch (cf. section 22(a) of the Right of ' +
              'Withdrawal Act). Custom-made and personalised products – for example engraving, or ' +
              'products made to specific dimensions or from a specific wood at the customer’s request – ' +
              'are therefore exempt. The buyer is made aware of this before ordering such goods.',
          },
          'See the separate page for the right of withdrawal and the standardised withdrawal form.',
        ],
      },
      {
        tittel: 'Inspection of the goods',
        avsnitt: [
          'When the buyer receives the goods, it is recommended that they, to a reasonable extent, ' +
            'check whether the goods conform to the order, whether they have been damaged in transit, ' +
            'or whether they otherwise have defects. If the goods do not conform to the order or have ' +
            'defects, the buyer must notify the seller by way of a complaint.',
        ],
      },
      {
        tittel: 'Complaints about defects and deadlines for claims of delay',
        avsnitt: [
          'If the goods have a defect, the buyer must, within a reasonable time after discovering or ' +
            'ought to have discovered it, notify the seller that they wish to invoke the defect. The ' +
            'deadline for complaints can never be shorter than two months from when the consumer ' +
            'discovered the defect. A complaint must nevertheless be made no later than two years after ' +
            'the buyer took over the goods. If the goods, or parts of them, are intended to last ' +
            'considerably longer than two years, the deadline is five years. As our handmade wooden ' +
            'products are intended to last considerably longer than two years, a five-year deadline ' +
            'normally applies.',
          'In the event of delay, claims must be made to the seller within a reasonable time after ' +
            'delivery was due and the goods were not delivered. If the goods were paid for by credit ' +
            'card, the buyer may also complain and direct the claim to the credit provider. Notice to ' +
            'the seller or credit provider should be in writing (email or letter).',
        ],
      },
      {
        tittel: 'The buyer’s rights in the event of delay',
        avsnitt: [
          'If the seller does not deliver the goods, or delivers them late, and this is not due to the ' +
            'buyer, the buyer may, as the case may be, withhold payment, demand performance, cancel the ' +
            'agreement and/or claim compensation from the seller, cf. chapter 5 of the Consumer ' +
            'Purchases Act.',
          { ledd: 'Performance:', tekst: 'The buyer may maintain the purchase and demand performance from the seller. The buyer loses this right by waiting an unreasonably long time to make the claim.' },
          { ledd: 'Cancellation:', tekst: 'If the seller does not deliver at the delivery time, the buyer may set a reasonable additional deadline. If the seller does not deliver within it, the buyer may cancel. The buyer may cancel immediately if the seller refuses to deliver, or if timely delivery was decisive for the agreement.' },
          { ledd: 'Compensation:', tekst: 'The buyer may claim compensation for loss suffered as a result of the delay, unless the seller proves that the delay was due to an impediment beyond the seller’s control that could not reasonably have been foreseen, avoided or overcome.' },
        ],
      },
      {
        tittel: 'The buyer’s rights in the event of a defect',
        avsnitt: [
          'If the goods have a defect that is not due to the buyer, the buyer may, as the case may be, ' +
            'withhold payment, choose between repair and replacement, demand a price reduction, cancel ' +
            'the agreement and/or claim compensation, cf. chapter 6 of the Consumer Purchases Act.',
          { ledd: 'Repair or replacement:', tekst: 'The buyer may choose between having the defect repaired or delivery of an equivalent item. The seller may object if this is impossible or entails unreasonable costs. Repair or replacement shall be carried out within a reasonable time.' },
          { ledd: 'Natural variations:', tekst: 'As each product is handmade and unique, a replacement may differ somewhat in grain and colour. Natural variations in the wood (grain, knots, colour and small cracks) and patina that develops with use over time are not considered defects.' },
          { ledd: 'Price reduction:', tekst: 'The buyer may demand an appropriate price reduction if the goods are not repaired or replaced, so that the ratio between the reduced and agreed price corresponds to the ratio between the value of the item in defective and contractual condition.' },
          { ledd: 'Cancellation:', tekst: 'If the goods are not repaired or replaced, the buyer may also cancel the purchase when the defect is not insignificant.' },
          { ledd: 'Compensation:', tekst: 'The buyer may claim compensation for financial loss resulting from the defect, unless the seller proves the loss was due to an impediment beyond the seller’s control.' },
        ],
      },
      {
        tittel: 'The seller’s rights in the event of the buyer’s default',
        avsnitt: [
          'If the buyer fails to pay or fulfil the other obligations under the agreement or the law, ' +
            'and this is not due to the seller, the seller may, as the case may be, withhold the goods, ' +
            'demand performance, cancel the agreement and claim compensation, cf. chapter 9 of the ' +
            'Consumer Purchases Act. The seller may also claim interest on late payment, debt-collection ' +
            'charges and a reasonable fee for uncollected goods.',
          { ledd: 'Interest and debt collection:', tekst: 'If the buyer does not pay as agreed, the seller may claim interest under the Late Payment Interest Act. In the event of non-payment, the claim may, after prior notice, be sent to debt collection.' },
          { ledd: 'Uncollected goods:', tekst: 'If the buyer fails to collect unpaid goods, the seller may charge a fee covering at most the seller’s actual cost of delivering the goods. Such a fee cannot be charged to buyers under 18.' },
        ],
      },
      {
        tittel: 'Warranty',
        avsnitt: [
          'A warranty given by the seller or manufacturer gives the buyer rights in addition to those ' +
            'the buyer already has under mandatory law, and therefore does not limit the buyer’s right ' +
            'to complain and make claims for delay or defects. Igland Woodcraft currently does not offer ' +
            'a separate warranty beyond the consumer’s statutory rights.',
        ],
      },
      {
        tittel: 'Personal data',
        avsnitt: [
          'The seller is the controller of collected personal data. Unless the buyer consents otherwise, ' +
            'the seller may, in accordance with data protection law (the GDPR and the Personal Data Act), ' +
            'only collect and store the personal data necessary to perform its obligations under the ' +
            'agreement. Personal data is only disclosed to others where necessary to complete the ' +
            'agreement (for example to the payment provider and shipping provider), or in statutory ' +
            'cases. See the separate privacy policy for more information.',
        ],
      },
      {
        tittel: 'Dispute resolution',
        avsnitt: [
          'Complaints are addressed to the seller within a reasonable time. The parties shall try to ' +
            'resolve any disputes amicably. If this fails, the buyer may contact the Norwegian Consumer ' +
            'Authority (Forbrukertilsynet) for mediation, on +47 23 400 600 or www.forbrukertilsynet.no.',
          'The European Commission’s complaints portal may also be used, which is particularly relevant ' +
            'for consumers resident in another EU country. Complaints are submitted at ' +
            'http://ec.europa.eu/odr.',
        ],
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  ANGRERETT / ANGRESKJEMA                                            */
/* ------------------------------------------------------------------ */

const angrerett: Record<Sprak, JuridiskDok> = {
  nb: {
    eyebrow: 'Angrerett',
    tittel: 'Angrerett og angreskjema',
    oppdatert: 'Sist oppdatert: 14. juli 2026',
    ingress:
      'Som forbruker har du 14 dagers angrerett ved kjøp over Internett, jf. angrerettloven. ' +
      'Nedenfor finner du en oppsummering av angreretten og et standardisert angreskjema du ' +
      'kan bruke.',
    seksjoner: [
      {
        tittel: 'Slik bruker du angreretten',
        avsnitt: [
          'Du kan angre kjøpet innen 14 dager fra du mottok varen. Gi oss melding om at du vil ' +
            'benytte angreretten – enten ved å fylle ut skjemaet under, eller ved en annen utvetydig ' +
            'erklæring på e-post til ' + SELGER.epost + '.',
          'Etter at du har meldt fra, må du sende varen tilbake uten unødig opphold og senest 14 dager ' +
            'etter meldingen. Du dekker de direkte returkostnadene. Varen bør returneres i samme stand ' +
            'som du mottok den; du er ansvarlig for eventuell verdireduksjon som skyldes håndtering ' +
            'utover det som er nødvendig for å fastslå varens art og egenskaper.',
          'Vi tilbakebetaler kjøpesummen uten unødig opphold og senest 14 dager etter at vi mottok ' +
            'meldingen din. Vi kan holde tilbake betalingen til vi har mottatt varen, eller til du har ' +
            'dokumentert at den er sendt tilbake.',
        ],
      },
      {
        tittel: 'Når gjelder ikke angreretten?',
        avsnitt: [
          'Angreretten gjelder ikke for varer som er laget etter dine spesifikasjoner eller har fått ' +
            'et tydelig personlig preg – for eksempel spesialbestillinger, gravering eller produkter ' +
            'laget i bestemte mål eller trevirke etter ditt ønske (jf. angrerettloven § 22 bokstav a). ' +
            'Du blir gjort oppmerksom på dette før du bestiller slike varer.',
        ],
      },
      {
        tittel: 'Standardisert angreskjema',
        avsnitt: [
          'Fyll ut og returner dette skjemaet bare dersom du ønsker å gå fra avtalen. Send det til ' +
            SELGER.navn + ', ' + SELGER.adresse + ', eller på e-post til ' + SELGER.epost + '.',
          { ledd: 'Til:', tekst: SELGER.navn + ', ' + SELGER.adresse + ', ' + SELGER.epost + '.' },
          'Jeg/vi underretter herved om at jeg/vi ønsker å gå fra min/vår avtale om kjøp av følgende ' +
            'varer (angi varene):',
          'Bestilt den / mottatt den (dato):',
          'Forbrukerens navn:',
          'Forbrukerens adresse:',
          'Forbrukerens underskrift (bare hvis skjemaet meldes på papir):',
          'Dato:',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Right of withdrawal',
    tittel: 'Right of Withdrawal and Withdrawal Form',
    oppdatert: 'Last updated: 14 July 2026',
    ingress:
      'As a consumer you have a 14-day right of withdrawal for purchases made over the ' +
      'Internet, cf. the Norwegian Right of Withdrawal Act. Below is a summary of the right ' +
      'of withdrawal and a standardised withdrawal form you can use.',
    seksjoner: [
      {
        tittel: 'How to use the right of withdrawal',
        avsnitt: [
          'You may withdraw from the purchase within 14 days of receiving the goods. Notify us that ' +
            'you wish to use the right of withdrawal – either by completing the form below, or by any ' +
            'other unequivocal statement by email to ' + SELGER.epost + '.',
          'After notifying us, you must return the goods without undue delay and no later than 14 days ' +
            'after the notice. You cover the direct cost of return. The goods should be returned in the ' +
            'same condition as received; you are liable for any reduction in value resulting from ' +
            'handling beyond what is necessary to establish the nature and characteristics of the goods.',
          'We will refund the purchase amount without undue delay and no later than 14 days after ' +
            'receiving your notice. We may withhold the refund until we have received the goods, or ' +
            'until you have documented that they have been returned.',
        ],
      },
      {
        tittel: 'When does the right of withdrawal not apply?',
        avsnitt: [
          'The right of withdrawal does not apply to goods made to your specifications or given a clear ' +
            'personal touch – for example custom orders, engraving, or products made to specific ' +
            'dimensions or from a specific wood at your request (cf. section 22(a) of the Right of ' +
            'Withdrawal Act). You are made aware of this before ordering such goods.',
        ],
      },
      {
        tittel: 'Standardised withdrawal form',
        avsnitt: [
          'Complete and return this form only if you wish to withdraw from the agreement. Send it to ' +
            SELGER.navn + ', ' + SELGER.adresse + ', or by email to ' + SELGER.epost + '.',
          { ledd: 'To:', tekst: SELGER.navn + ', ' + SELGER.adresse + ', ' + SELGER.epost + '.' },
          'I/we hereby give notice that I/we withdraw from my/our contract for the sale of the ' +
            'following goods (specify the goods):',
          'Ordered on / received on (date):',
          'Consumer’s name:',
          'Consumer’s address:',
          'Consumer’s signature (only if this form is notified on paper):',
          'Date:',
        ],
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  PERSONVERNERKLÆRING                                                */
/* ------------------------------------------------------------------ */

const personvern: Record<Sprak, JuridiskDok> = {
  nb: {
    eyebrow: 'Personvern',
    tittel: 'Personvernerklæring',
    oppdatert: 'Sist oppdatert: 14. juli 2026',
    ingress:
      'Denne personvernerklæringen forklarer hvordan ' + SELGER.navn + ' samler inn og ' +
      'behandler personopplysninger når du besøker nettbutikken og handler hos oss. Vi ' +
      'behandler personopplysninger i samsvar med personvernforordningen (GDPR) og ' +
      'personopplysningsloven.',
    seksjoner: [
      {
        tittel: 'Behandlingsansvarlig',
        avsnitt: [
          'Behandlingsansvarlig for personopplysningene vi samler inn er ' + SELGER.navn + '. ' +
            'Kontakt: ' + kontaktNb,
        ],
      },
      {
        tittel: 'Hvilke opplysninger vi samler inn',
        avsnitt: [
          'Når du legger inn en bestilling, samler vi inn navn, e-postadresse, telefonnummer og ' +
            'leverings-/fakturaadresse. Ved betaling behandles betalingsopplysninger av vår ' +
            'betalingsformidler (Stripe eller Vipps); vi lagrer ikke fullstendige kort- eller ' +
            'kontonummer. Vi lagrer ordrehistorikk og korrespondanse med deg.',
          'Nettbutikken lagrer også tekniske opplysninger som er nødvendige for at siden skal fungere ' +
            '(for eksempel handlekurv og språkvalg i din nettleser).',
        ],
      },
      {
        tittel: 'Formål og behandlingsgrunnlag',
        avsnitt: [
          { ledd: 'Gjennomføre kjøpet:', tekst: 'Vi behandler opplysningene for å behandle bestillingen, levere varen og gi kundeservice. Grunnlaget er oppfyllelse av avtalen med deg (GDPR art. 6 nr. 1 bokstav b).' },
          { ledd: 'Lovpålagte krav:', tekst: 'Vi lagrer nødvendige salgs- og regnskapsopplysninger for å oppfylle bokføringsloven. Grunnlaget er rettslig forpliktelse (art. 6 nr. 1 bokstav c).' },
          { ledd: 'Berettiget interesse:', tekst: 'Vi kan behandle opplysninger for å sikre drift og forebygge misbruk av nettbutikken. Grunnlaget er berettiget interesse (art. 6 nr. 1 bokstav f).' },
        ],
      },
      {
        tittel: 'Utlevering til tredjeparter',
        avsnitt: [
          'Vi utleverer kun personopplysninger når det er nødvendig for å gjennomføre avtalen eller ' +
            'når vi er pålagt det ved lov. Dette omfatter betalingsformidlere (Stripe, Vipps), ' +
            'fraktleverandør (Posten) og leverandør av nettbutikk-/hostingtjenester. Disse behandler ' +
            'opplysninger på våre vegne i henhold til databehandleravtaler.',
        ],
      },
      {
        tittel: 'Lagringstid',
        avsnitt: [
          'Vi lagrer personopplysninger så lenge det er nødvendig for formålet de ble samlet inn for. ' +
            'Opplysninger knyttet til kjøp lagres så lenge det kreves etter bokføringsloven ' +
            '(normalt fem år). Øvrige opplysninger slettes når de ikke lenger er nødvendige.',
        ],
      },
      {
        tittel: 'Dine rettigheter',
        avsnitt: [
          'Du har rett til innsyn i, retting og sletting av egne personopplysninger, samt rett til å ' +
            'kreve begrensning og til å protestere mot behandlingen. Du har også rett til ' +
            'dataportabilitet. Ta kontakt på ' + SELGER.epost + ' for å utøve rettighetene dine.',
          'Dersom du mener vi behandler personopplysninger i strid med regelverket, kan du klage til ' +
            'Datatilsynet (www.datatilsynet.no).',
        ],
      },
      {
        tittel: 'Informasjonskapsler (cookies)',
        avsnitt: [
          'Nettbutikken bruker nødvendig lagring i nettleseren din for grunnleggende funksjonalitet, ' +
            'som å huske handlekurven og språkvalget ditt. Denne lagringen er nødvendig for at ' +
            'tjenesten skal fungere, og deles ikke med tredjeparter for markedsføring.',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Privacy',
    tittel: 'Privacy Policy',
    oppdatert: 'Last updated: 14 July 2026',
    ingress:
      'This privacy policy explains how ' + SELGER.navn + ' collects and processes personal ' +
      'data when you visit the online store and shop with us. We process personal data in ' +
      'accordance with the General Data Protection Regulation (GDPR) and the Norwegian ' +
      'Personal Data Act.',
    seksjoner: [
      {
        tittel: 'Data controller',
        avsnitt: [
          'The controller of the personal data we collect is ' + SELGER.navn + '. Contact: ' + kontaktEn,
        ],
      },
      {
        tittel: 'What data we collect',
        avsnitt: [
          'When you place an order, we collect your name, email address, phone number and ' +
            'delivery/billing address. During payment, payment details are processed by our payment ' +
            'provider (Stripe or Vipps); we do not store full card or account numbers. We store order ' +
            'history and correspondence with you.',
          'The online store also stores technical data necessary for the site to function (for example ' +
            'your cart and language choice in your browser).',
        ],
      },
      {
        tittel: 'Purpose and legal basis',
        avsnitt: [
          { ledd: 'Completing the purchase:', tekst: 'We process the data to handle the order, deliver the goods and provide customer service. The basis is performance of the agreement with you (GDPR art. 6(1)(b)).' },
          { ledd: 'Legal requirements:', tekst: 'We store necessary sales and accounting data to comply with the Bookkeeping Act. The basis is a legal obligation (art. 6(1)(c)).' },
          { ledd: 'Legitimate interest:', tekst: 'We may process data to ensure operation and prevent misuse of the store. The basis is legitimate interest (art. 6(1)(f)).' },
        ],
      },
      {
        tittel: 'Disclosure to third parties',
        avsnitt: [
          'We only disclose personal data where necessary to perform the agreement or where required by ' +
            'law. This includes payment providers (Stripe, Vipps), the shipping provider (Posten) and ' +
            'the provider of online store/hosting services. These process data on our behalf under data ' +
            'processing agreements.',
        ],
      },
      {
        tittel: 'Storage period',
        avsnitt: [
          'We store personal data for as long as necessary for the purpose it was collected. Data ' +
            'related to purchases is stored for as long as required by the Bookkeeping Act (normally ' +
            'five years). Other data is deleted when it is no longer necessary.',
        ],
      },
      {
        tittel: 'Your rights',
        avsnitt: [
          'You have the right to access, rectify and erase your personal data, and the right to ' +
            'restrict and object to the processing. You also have the right to data portability. ' +
            'Contact us at ' + SELGER.epost + ' to exercise your rights.',
          'If you believe we process personal data in breach of the rules, you may complain to the ' +
            'Norwegian Data Protection Authority (www.datatilsynet.no).',
        ],
      },
      {
        tittel: 'Cookies',
        avsnitt: [
          'The online store uses necessary storage in your browser for basic functionality, such as ' +
            'remembering your cart and language choice. This storage is necessary for the service to ' +
            'work and is not shared with third parties for marketing.',
        ],
      },
    ],
  },
};

export const juridisk = {
  salgsbetingelser,
  angrerett,
  personvern,
};
