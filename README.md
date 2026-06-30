# Håndverk Nettbutikk

Nettbutikk for håndlagde treprodukter (skåler, lysestaker, fat), bygget med Next.js. Inkluderer handlekurv, betaling via Stripe og ordrebekreftelse på e-post via Resend.

## Teknologi

- **[Next.js 14](https://nextjs.org/)** (App Router) + **React 18** + **TypeScript**
- **[Tailwind CSS](https://tailwindcss.com/)** for styling
- **[Stripe](https://stripe.com/)** for betaling (Checkout)
- **[Resend](https://resend.com/)** for ordrebekreftelse på e-post

## Kom i gang

### 1. Installer avhengigheter

```bash
npm install
```

### 2. Sett opp miljøvariabler

Kopier malen og fyll inn dine egne nøkler:

```bash
cp .env.local.example .env.local
```

Rediger `.env.local`:

| Variabel | Beskrivelse |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Hemmelig Stripe-nøkkel (`sk_test_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Offentlig Stripe-nøkkel (`pk_test_...`) |
| `NEXT_PUBLIC_BASE_URL` | Basis-URL, f.eks. `http://localhost:3000` lokalt |

> ⚠️ `.env.local` inneholder hemmeligheter og er ignorert i `.gitignore` – den skal **aldri** committes.

### 3. Kjør utviklingsserver

```bash
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

## Tilgjengelige kommandoer

| Kommando | Beskrivelse |
|----------|-------------|
| `npm run dev` | Starter utviklingsserver |
| `npm run build` | Bygger for produksjon |
| `npm run start` | Starter produksjonsserver (krever `build` først) |

## Prosjektstruktur

```
app/                 # Sider og API-ruter (Next.js App Router)
  api/checkout/      # Oppretter Stripe Checkout-sesjon
  api/confirm-order/ # Sender ordrebekreftelse via Resend
  produkter/         # Produktoversikt og detaljsider
  handlekurv/        # Handlekurv
components/          # Gjenbrukbare React-komponenter
context/             # CartContext (handlekurv-state)
data/produkter.json  # Produktkatalog
public/bilder/       # Produktbilder
types/               # TypeScript-typer
```

## Produkter

Produktkatalogen ligger i [`data/produkter.json`](data/produkter.json). Nye produkter legges til ved å redigere denne filen og legge tilhørende bilde i `public/bilder/`.
