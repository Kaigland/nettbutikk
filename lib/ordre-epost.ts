// Bygger og sender ordrebekreftelse via Resend. Brukes av både Stripe- og
// Vipps-flyten slik at kunden får samme e-post uansett betalingsmetode.

export interface OrdreLinje {
  navn: string;
  antall: number;
  /** Linjesum i hele kroner. */
  sumKr: number;
}

export interface Ordrebekreftelse {
  epost: string;
  navn: string;
  linjer: OrdreLinje[];
  /** Totalsum i hele kroner. */
  totalKr: number;
  /** Vises i emnefeltet, f.eks. "Kort" eller "Vipps". */
  betalingsmetode?: string;
  /** Leveringsadresse (flere linjer). Vises hvis satt. */
  leveringsadresse?: string;
}

const kr = (n: number) => n.toLocaleString('nb-NO');

export function byggOrdreHtml({ navn, linjer, totalKr, leveringsadresse }: Ordrebekreftelse): string {
  const rader = linjer
    .map(
      (l) => `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #e7e5e4">${l.navn}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e7e5e4;text-align:right">× ${l.antall}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e7e5e4;text-align:right">${kr(l.sumKr)} kr</td>
        </tr>`
    )
    .join('');

  return `
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
        <tbody>${rader}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding-top:12px;font-weight:700">Totalt betalt</td>
            <td style="padding-top:12px;font-weight:700;text-align:right">${kr(totalKr)} kr</td>
          </tr>
        </tfoot>
      </table>

      ${
        leveringsadresse
          ? `<div style="margin:0 0 16px">
        <p style="color:#78716c;font-size:14px;margin:0 0 4px;font-weight:600">Leveringsadresse</p>
        <p style="color:#1c1917;font-size:14px;margin:0;white-space:pre-line">${leveringsadresse}</p>
      </div>`
          : ''
      }
      <p style="color:#78716c;font-size:14px">Estimert levering: 3–5 virkedager via Posten.</p>
      <p style="color:#78716c;font-size:14px">Har du spørsmål? Svar på denne e-posten.</p>

      <hr style="border:none;border-top:1px solid #e7e5e4;margin:24px 0"/>
      <p style="color:#a8a29e;font-size:12px;text-align:center">Igland Treskjæring</p>
    </div>
  `;
}

/** Sender ordrebekreftelse. Feiler stille (logger) slik at en e-postfeil ikke velter ordren. */
export async function sendOrdrebekreftelse(ordre: Ordrebekreftelse): Promise<void> {
  if (!ordre.epost) return;

  const payload: Record<string, unknown> = {
    from: process.env.RESEND_FROM_EMAIL,
    to: ordre.epost,
    subject: `Ordrebekreftelse – ${kr(ordre.totalKr)} kr`,
    html: byggOrdreHtml(ordre),
  };

  // Send en kopi til butikken (deg) med ordre + leveringsadresse.
  if (process.env.ORDER_BCC_EMAIL) {
    payload.bcc = process.env.ORDER_BCC_EMAIL;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error('Resend-feil:', await res.text());
  }
}
