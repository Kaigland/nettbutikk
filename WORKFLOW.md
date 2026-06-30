# Huskeark – arbeidsflyt

Kort referanse for hvordan du jobber med nettbutikken og publiserer endringer.

## Mental modell

- **GitHub = fasiten** (hovedkopien av prosjektet)
- **Din lokale mappe = arbeidskopien** (der du redigerer)

Du redigerer alltid lokalt og bruker `git push` for å oppdatere fasiten.
Vercel bygger og publiserer automatisk når `main` oppdateres.

```
Din PC (lokalt)  ── git push ──▶  GitHub (fasit)  ──▶  Vercel bygger live
                 ◀── git pull ──
```

## Vanlig arbeidsflyt (én PC, redigerer ikke på github.com)

```bash
# 1. Rediger filer lokalt, f.eks. data/produkter.json
# 2. Lagre, så:
git add .
git commit -m "Beskriv hva du endret"
git push
# → Vercel publiserer automatisk på ~1 min
```

## Hvis noe kan være endret et annet sted – hent ned først

Kjør `git pull` FØR du jobber hvis du:
- redigerte en fil direkte på github.com (nettleseren)
- jobber fra en annen datamaskin
- samarbeider med andre

```bash
git pull        # hent siste fasit
# ... jobb ...
git push        # send opp igjen
```

> Den gylne regelen: er du i tvil, start med `git pull`. Det skader aldri.

## Nyttige sjekk-kommandoer

```bash
git status      # hva er endret / ikke committet?
git log --oneline -5   # siste commits
git pull        # hent siste fra GitHub
```

## Legge til et nytt produkt

1. Legg bildet i `public/bilder/`
2. Legg til en ny blokk i `data/produkter.json`
3. `git add . && git commit -m "Nytt produkt" && git push`

## Viktig

- `.env.local` (hemmeligheter) ligger KUN lokalt og pushes aldri. Samme nøkler må være satt i Vercel (Settings → Environment Variables).
- Endrer du miljøvariabler i Vercel, må du redeploye for at de skal tas i bruk.
