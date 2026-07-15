import { NextRequest, NextResponse } from 'next/server';

/**
 * Passordvegg for førlansering.
 *
 * Aktiveres KUN når miljøvariabelen SITE_PASSWORD er satt (typisk på Vercel).
 * Er variabelen tom/ikke satt, er nettstedet åpent – slik at lokal utvikling
 * ikke krever passord.
 *
 * Ved lansering: fjern SITE_PASSWORD i Vercel og redeploy, så er butikken
 * live for alle. Ingen annen kodeendring nødvendig.
 *
 * API-ruter og statiske Next-filer holdes utenfor vegget (se matcher nederst)
 * slik at bl.a. Vipps-callback fungerer under testing.
 */
export function middleware(req: NextRequest) {
  const passord = process.env.SITE_PASSWORD;

  // Ingen passord konfigurert → nettstedet er åpent.
  if (!passord) return NextResponse.next();

  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Basic ')) {
    try {
      const dekodet = atob(auth.slice(6)); // "brukernavn:passord"
      const oppgitt = dekodet.slice(dekodet.indexOf(':') + 1);
      if (oppgitt === passord) {
        const res = NextResponse.next();
        res.headers.set('X-Robots-Tag', 'noindex, nofollow');
        return res;
      }
    } catch {
      // Ugyldig Basic-header – fall gjennom til 401 under.
    }
  }

  return new NextResponse('Autentisering kreves', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Igland Woodcraft", charset="UTF-8"',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

export const config = {
  // Beskytt alle sider, men ikke API-ruter, Next-interne filer og favicon.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
