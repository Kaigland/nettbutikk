// Hjelpefunksjoner mot Vipps MobilePay ePayment API.
// Rå fetch (ingen SDK) – samme stil som Stripe-integrasjonen i prosjektet.
// Dokumentasjon: https://developer.vippsmobilepay.com/docs/APIs/epayment-api/

const API_URL = process.env.VIPPS_API_URL ?? 'https://apitest.vipps.no';
const CLIENT_ID = process.env.VIPPS_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.VIPPS_CLIENT_SECRET ?? '';
const SUBSCRIPTION_KEY = process.env.VIPPS_SUBSCRIPTION_KEY ?? '';
const MSN = process.env.VIPPS_MSN ?? '';

// Sendes med som identifikasjon av integrasjonen (anbefalt av Vipps).
const SYSTEM_HEADERS: Record<string, string> = {
  'Vipps-System-Name': 'Igland Woodcraft',
  'Vipps-System-Version': '1.0.0',
  'Vipps-System-Plugin-Name': 'nettbutikk-custom',
  'Vipps-System-Plugin-Version': '1.0.0',
};

export function vippsErKonfigurert(): boolean {
  return Boolean(CLIENT_ID && CLIENT_SECRET && SUBSCRIPTION_KEY && MSN);
}

/** Henter et access-token som må sendes med hvert kall til ePayment API. */
async function hentAccessToken(): Promise<string> {
  const res = await fetch(`${API_URL}/accesstoken/get`, {
    method: 'POST',
    headers: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
    },
  });
  if (!res.ok) {
    throw new Error(`Vipps access-token feilet (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return data.access_token as string;
}

function baseHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
    'Merchant-Serial-Number': MSN,
    'Content-Type': 'application/json',
    ...SYSTEM_HEADERS,
  };
}

export interface OpprettBetalingInput {
  /** Beløp i hele kroner. */
  belopKr: number;
  /** Unik ordrereferanse (8–64 tegn, a–z 0–9 -). */
  referanse: string;
  /** URL kunden sendes tilbake til etter Vipps. */
  returUrl: string;
  /** Mobilnummer i format 47xxxxxxxx (valgfritt – forhåndsutfyller Vipps). */
  telefon?: string;
}

/** Oppretter en betaling og returnerer URL kunden skal sendes til (åpner Vipps). */
export async function opprettVippsBetaling(input: OpprettBetalingInput): Promise<{ redirectUrl: string; reference: string }> {
  const token = await hentAccessToken();

  const body: Record<string, unknown> = {
    amount: { currency: 'NOK', value: Math.round(input.belopKr * 100) },
    paymentMethod: { type: 'WALLET' },
    reference: input.referanse,
    returnUrl: input.returUrl,
    userFlow: 'WEB_REDIRECT',
    paymentDescription: 'Igland Treskjæring',
  };
  if (input.telefon) {
    body.customer = { phoneNumber: input.telefon };
  }

  const res = await fetch(`${API_URL}/epayment/v1/payments`, {
    method: 'POST',
    headers: { ...baseHeaders(token), 'Idempotency-Key': crypto.randomUUID() },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Vipps opprett betaling feilet (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return { redirectUrl: data.redirectUrl, reference: data.reference };
}

export interface VippsBetaling {
  state: 'CREATED' | 'AUTHORIZED' | 'TERMINATED' | 'ABORTED' | 'EXPIRED';
  /** Autorisert beløp i øre. */
  autorisertOre: number;
  /** Allerede fanget (captured) beløp i øre. */
  fangetOre: number;
}

/** Henter status på en betaling. */
export async function hentVippsBetaling(referanse: string): Promise<VippsBetaling> {
  const token = await hentAccessToken();
  const res = await fetch(`${API_URL}/epayment/v1/payments/${referanse}`, {
    headers: baseHeaders(token),
  });
  if (!res.ok) {
    throw new Error(`Vipps hent betaling feilet (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return {
    state: data.state,
    autorisertOre: data.aggregate?.authorizedAmount?.value ?? 0,
    fangetOre: data.aggregate?.capturedAmount?.value ?? 0,
  };
}

/** Fanger (capturer) beløpet slik at kunden faktisk belastes. */
export async function fangVippsBetaling(referanse: string, belopOre: number): Promise<void> {
  const token = await hentAccessToken();
  const res = await fetch(`${API_URL}/epayment/v1/payments/${referanse}/capture`, {
    method: 'POST',
    headers: { ...baseHeaders(token), 'Idempotency-Key': crypto.randomUUID() },
    body: JSON.stringify({ modificationAmount: { currency: 'NOK', value: belopOre } }),
  });
  if (!res.ok) {
    throw new Error(`Vipps capture feilet (${res.status}): ${await res.text()}`);
  }
}
