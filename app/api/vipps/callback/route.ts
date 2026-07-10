import { NextRequest, NextResponse } from 'next/server';
import { KurvVare } from '@/types';
import { hentVippsBetaling, fangVippsBetaling } from '@/lib/vipps';
import { sendOrdrebekreftelse, OrdreLinje } from '@/lib/ordre-epost';

export const dynamic = 'force-dynamic';

interface Kunde {
  navn: string;
  epost: string;
  telefon?: string;
  adresse?: string;
  postnr?: string;
  poststed?: string;
}

function formaterAdresse(k: Kunde): string | undefined {
  const linjer = [k.navn, k.adresse, [k.postnr, k.poststed].filter(Boolean).join(' '), k.telefon]
    .map((l) => (l ?? '').trim())
    .filter(Boolean);
  return linjer.length ? linjer.join('\n') : undefined;
}

// Kunden kommer tilbake fra Vipps. Vi verifiserer betalingen mot Vipps,
// fanger (capturer) beløpet og sender ordrebekreftelse.
//
// Handlekurven sendes fra klienten (samme tillitsmodell som Stripe-flyten),
// men beløpet valideres mot det Vipps faktisk har autorisert, så et
// manipulert handlekurv-innhold blir avvist før capture.
export async function POST(req: NextRequest) {
  try {
    const { reference, varer, kunde }: { reference: string; varer: KurvVare[]; kunde: Kunde } =
      await req.json();

    if (!reference) {
      return NextResponse.json({ error: 'Mangler referanse' }, { status: 400 });
    }

    const betaling = await hentVippsBetaling(reference);

    if (betaling.state === 'ABORTED' || betaling.state === 'EXPIRED') {
      return NextResponse.json({ status: 'avbrutt' });
    }
    if (betaling.state !== 'AUTHORIZED' && betaling.fangetOre === 0) {
      // Ikke ferdig godkjent ennå (f.eks. CREATED).
      return NextResponse.json({ status: 'venter' });
    }

    const forventetOre = Math.round(
      (varer ?? []).reduce((sum, v) => sum + v.produkt.pris * v.antall, 0) * 100
    );

    // Fang beløpet én gang. Bruk det Vipps har autorisert som fasit.
    if (betaling.fangetOre === 0) {
      if (forventetOre !== betaling.autorisertOre) {
        console.error(
          `Vipps beløp-mismatch for ${reference}: kurv=${forventetOre}, autorisert=${betaling.autorisertOre}`
        );
        return NextResponse.json({ error: 'Beløpet stemmer ikke' }, { status: 400 });
      }
      await fangVippsBetaling(reference, betaling.autorisertOre);
    }

    // Send ordrebekreftelse (feiler stille internt).
    const linjer: OrdreLinje[] = (varer ?? []).map((v) => ({
      navn: v.produkt.navn,
      antall: v.antall,
      sumKr: v.produkt.pris * v.antall,
    }));
    await sendOrdrebekreftelse({
      epost: kunde?.epost ?? '',
      navn: kunde?.navn ?? 'Kunde',
      linjer,
      totalKr: betaling.autorisertOre / 100,
      betalingsmetode: 'Vipps',
      leveringsadresse: kunde ? formaterAdresse(kunde) : undefined,
    });

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Vipps callback-feil:', error);
    return NextResponse.json({ error: 'Kunne ikke fullføre Vipps-betaling' }, { status: 500 });
  }
}
