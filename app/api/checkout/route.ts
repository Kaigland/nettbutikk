import { NextRequest, NextResponse } from 'next/server';
import { KurvVare } from '@/types';
import { Sprak, lokaliserProdukt } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { varer, sprak }: { varer: KurvVare[]; sprak?: Sprak } = await req.json();
    const valgtSprak: Sprak = sprak === 'en' ? 'en' : 'nb';

    if (!varer || varer.length === 0) {
      return NextResponse.json({ error: 'Handlekurven er tom' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const params = new URLSearchParams();

    varer.forEach((vare, i) => {
      const { navn, beskrivelse } = lokaliserProdukt(vare.produkt, valgtSprak);
      params.append(`line_items[${i}][price_data][currency]`, 'nok');
      params.append(`line_items[${i}][price_data][product_data][name]`, navn);
      params.append(
        `line_items[${i}][price_data][product_data][description]`,
        beskrivelse.substring(0, 200)
      );
      params.append(`line_items[${i}][price_data][unit_amount]`, String(vare.produkt.pris * 100));
      params.append(`line_items[${i}][quantity]`, String(vare.antall));
    });

    params.append('mode', 'payment');
    params.append('locale', valgtSprak === 'en' ? 'en' : 'nb');
    params.append('success_url', `${baseUrl}/suksess?session_id={CHECKOUT_SESSION_ID}`);
    params.append('cancel_url', `${baseUrl}/avbrutt`);
    params.append('shipping_address_collection[allowed_countries][0]', 'NO');
    params.append('shipping_address_collection[allowed_countries][1]', 'SE');
    params.append('shipping_address_collection[allowed_countries][2]', 'DK');
    params.append('shipping_address_collection[allowed_countries][3]', 'DE');
    params.append('shipping_address_collection[allowed_countries][4]', 'GB');
    params.append('shipping_address_collection[allowed_countries][5]', 'US');
    params.append('phone_number_collection[enabled]', 'true');

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Stripe-feil:', data);
      return NextResponse.json({ error: data?.error?.message ?? 'Stripe-feil' }, { status: 500 });
    }

    return NextResponse.json({ url: data.url });
  } catch (error) {
    console.error('Checkout-feil:', error);
    return NextResponse.json({ error: 'Intern serverfeil' }, { status: 500 });
  }
}
