// Bygger og sender ordrebekreftelse via Resend. Brukes av både Stripe- og
// Vipps-flyten slik at kunden får samme e-post uansett betalingsmetode.

import { Sprak, formatPris, oversettelser } from '@/lib/i18n';

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
  /** Språk for e-posten. Standard: norsk. */
  sprak?: Sprak;
}

export function byggOrdreHtml({ navn, linjer, totalKr, leveringsadresse, sprak = 'nb' }: Ordrebekreftelse): string {
  const t = oversettelser[sprak].epost;

  const rader = linjer
    .map(
      (l) => `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #e7e5e4">${l.navn}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e7e5e4;text-align:right">× ${l.antall}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e7e5e4;text-align:right">${formatPris(l.sumKr, sprak)}</td>
        </tr>`
    )
    .join('');

  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1c1917">
      <h1 style="font-size:24px;margin-bottom:4px">${t.hilsen}, ${navn}!</h1>
      <p style="color:#78716c;margin-top:0">${t.intro}</p>

      <table style="width:100%;border-collapse:collapse;margin:24px 0">
        <thead>
          <tr>
            <th style="text-align:left;padding-bottom:8px;border-bottom:2px solid #e7e5e4;color:#78716c;font-weight:500">${t.thProdukt}</th>
            <th style="text-align:right;padding-bottom:8px;border-bottom:2px solid #e7e5e4;color:#78716c;font-weight:500">${t.thAntall}</th>
            <th style="text-align:right;padding-bottom:8px;border-bottom:2px solid #e7e5e4;color:#78716c;font-weight:500">${t.thPris}</th>
          </tr>
        </thead>
        <tbody>${rader}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding-top:12px;font-weight:700">${t.totaltBetalt}</td>
            <td style="padding-top:12px;font-weight:700;text-align:right">${formatPris(totalKr, sprak)}</td>
          </tr>
        </tfoot>
      </table>

      ${
        leveringsadresse
          ? `<div style="margin:0 0 16px">
        <p style="color:#78716c;font-size:14px;margin:0 0 4px;font-weight:600">${t.leveringsadresse}</p>
        <p style="color:#1c1917;font-size:14px;margin:0;white-space:pre-line">${leveringsadresse}</p>
      </div>`
          : ''
      }
      <p style="color:#78716c;font-size:14px">${t.levering}</p>
      <p style="color:#78716c;font-size:14px">${t.sporsmal}</p>

      <hr style="border:none;border-top:1px solid #e7e5e4;margin:24px 0"/>
      <p style="color:#a8a29e;font-size:12px;text-align:center">Igland Woodcraft</p>
    </div>
  `;
}

/** Sender ordrebekreftelse. Feiler stille (logger) slik at en e-postfeil ikke velter ordren. */
export async function sendOrdrebekreftelse(ordre: Ordrebekreftelse): Promise<void> {
  if (!ordre.epost) return;

  const sprak = ordre.sprak ?? 'nb';
  const payload: Record<string, unknown> = {
    from: process.env.RESEND_FROM_EMAIL,
    to: ordre.epost,
    subject: `${oversettelser[sprak].epost.emne} – ${formatPris(ordre.totalKr, sprak)}`,
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
