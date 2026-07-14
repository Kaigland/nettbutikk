import { NextRequest, NextResponse } from 'next/server';
import { sendOrdrebekreftelse, OrdreLinje } from '@/lib/ordre-epost';
import { Sprak } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();
  if (!sessionId) return NextResponse.json({ error: 'Mangler session ID' }, { status: 400 });

  // Hent Stripe-session via REST
  const stripeRes = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${sessionId}?expand[]=line_items`,
    {
      headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
    }
  );
  if (!stripeRes.ok) {
    console.error('Stripe session-feil:', await stripeRes.text());
    return NextResponse.json({ error: 'Kunne ikke hente session' }, { status: 500 });
  }
  const session = await stripeRes.json();

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Ikke betalt' }, { status: 400 });
  }

  const email = session.customer_details?.email;
  const navn = session.customer_details?.name ?? 'Kunde';
  const totalKr = (session.amount_total ?? 0) / 100;
  // Språket kunden valgte i kassen, satt som `locale` ved opprettelse.
  const sprak: Sprak = session.locale === 'en' ? 'en' : 'nb';

  const linjer: OrdreLinje[] = (session.line_items?.data ?? []).map(
    (item: { description: string; quantity: number; amount_total: number }) => ({
      navn: item.description,
      antall: item.quantity,
      sumKr: (item.amount_total ?? 0) / 100,
    })
  );

  if (!email) return NextResponse.json({ ok: true, skipped: 'no email' });

  await sendOrdrebekreftelse({ epost: email, navn, linjer, totalKr, betalingsmetode: 'Kort', sprak });

  return NextResponse.json({ ok: true });
}
