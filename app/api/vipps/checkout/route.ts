import { NextRequest, NextResponse } from 'next/server';
import { KurvVare } from '@/types';
import { opprettVippsBetaling, vippsErKonfigurert } from '@/lib/vipps';

export const dynamic = 'force-dynamic';

interface Kunde {
  navn: string;
  epost: string;
  telefon?: string;
}

/** Gjør "+47 123 45 678" / "12345678" om til "4712345678" (Vipps-format). */
function normaliserTelefon(raw?: string): string | undefined {
  if (!raw) return undefined;
  let d = raw.replace(/\D/g, '');
  if (d.length === 8) d = `47${d}`;
  return d.length >= 10 ? d : undefined;
}

export async function POST(req: NextRequest) {
  try {
    if (!vippsErKonfigurert()) {
      return NextResponse.json({ error: 'Vipps er ikke konfigurert' }, { status: 503 });
    }

    const { varer, kunde }: { varer: KurvVare[]; kunde: Kunde } = await req.json();

    if (!varer || varer.length === 0) {
      return NextResponse.json({ error: 'Handlekurven er tom' }, { status: 400 });
    }

    const belopKr = varer.reduce((sum, v) => sum + v.produkt.pris * v.antall, 0);
    if (belopKr <= 0) {
      return NextResponse.json({ error: 'Ugyldig beløp' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const referanse = `igland-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

    const { redirectUrl, reference } = await opprettVippsBetaling({
      belopKr,
      referanse,
      returUrl: `${baseUrl}/vipps-retur?ref=${referanse}`,
      telefon: normaliserTelefon(kunde?.telefon),
    });

    return NextResponse.json({ redirectUrl, reference });
  } catch (error) {
    console.error('Vipps checkout-feil:', error);
    return NextResponse.json({ error: 'Kunne ikke starte Vipps-betaling' }, { status: 500 });
  }
}
