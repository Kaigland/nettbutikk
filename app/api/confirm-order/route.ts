import { NextRequest, NextResponse } from 'next/server';

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
  const totalKr = ((session.amount_total ?? 0) / 100).toLocaleString('nb-NO');

  const linjer = (session.line_items?.data ?? [])
    .map(
      (item: { description: string; quantity: number; amount_total: number }) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #e7e5e4">${item.description}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e7e5e4;text-align:right">× ${item.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e7e5e4;text-align:right">${((item.amount_total ?? 0) / 100).toLocaleString('nb-NO')} kr</td>
        </tr>`
    )
    .join('');

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1c1917">
      <h1 style="font-size:24px;margin-bottom:4px">Takk for bestillingen, ${navn}!</h1>
      <p style="color:#78716c;margin-top:0">Vi har mottatt betalingen din og behandler ordren nå.</p>

      <table style="width:100%;border-collapse:collapse;margin:24px 0">
        <thead>
          <tr>
            <th style="text-align:left;padding-bottom:8px;border-bottom:2px solid #e7e5e4;color:#78716c;font-weight:500">Produkt</th>
            <th style="text-align:right;padding-bottom:8px;border-bottom:2px solid #e7e5e4;color:#78716c;font-weight:500">Ant.</th>
            <th style="text-align:right;padding-bottom:8px;border-bottom:2px solid #e7e5e4;color:#78716c;font-weight:500">Pris</th>
          </tr>
        </thead>
        <tbody>${linjer}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding-top:12px;font-weight:700">Totalt betalt</td>
            <td style="padding-top:12px;font-weight:700;text-align:right">${totalKr} kr</td>
          </tr>
        </tfoot>
      </table>

      <p style="color:#78716c;font-size:14px">Estimert levering: 3–5 virkedager via Posten.</p>
      <p style="color:#78716c;font-size:14px">Har du spørsmål? Svar på denne e-posten.</p>

      <hr style="border:none;border-top:1px solid #e7e5e4;margin:24px 0"/>
      <p style="color:#a8a29e;font-size:12px;text-align:center">Igland Treskjæring</p>
    </div>
  `;

  if (!email) return NextResponse.json({ ok: true, skipped: 'no email' });

  // Send epost via Resend REST API
  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject: `Ordrebekreftelse – ${totalKr} kr`,
      html,
    }),
  });

  if (!resendRes.ok) {
    console.error('Resend-feil:', await resendRes.text());
  }

  return NextResponse.json({ ok: true });
}
