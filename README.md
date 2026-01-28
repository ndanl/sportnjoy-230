# sportnjoy-230 — Formular 230 (2025) · Web app (mobile-first)

Aplicație web (Vite + React) optimizată pentru mobil, care permite completarea datelor contribuabilului, semnarea pe ecran și generarea locală (în browser) a PDF-ului Formular 230 (2025), peste un template PDF precompletat (datele organizației sunt deja în PDF).

- Rulează 100% client-side (nu trimite date pe server)
- Generează și descarcă PDF-ul local
- Formular cu 2 pagini:
  - Pagina 1: completează câmpurile contribuabilului + semnătură
  - Pagina 2: completează mereu CNP + semnătură
  - Opțiunea „2 ani” se bifează doar când selectezi `2 ani`

## Demo

https://ndanl.github.io/sportnjoy-230/

## Funcționalități

- Câmpuri contribuabil:
  - Nume, prenume, inițiala tatălui, CNP
  - Stradă, număr, bloc, scară, etaj, apartament
  - Județ/sector, oraș, cod poștal
  - Email, telefon
- Semnătură online (canvas)
- Selectare perioadă distribuire: `1 an` / `2 ani`
- Generare PDF cu `pdf-lib` peste template
- Download PDF pe device

## Tehnologii

- Vite + React
- pdf-lib

## Structură proiect

sportnjoy-230/
├─ public/
│  └─ templates/
│     └─ formular230_2025.pdf
├─ src/
│  ├─ components/
│  │  └─ SignaturePad.jsx
│  ├─ pdf/
│  │  ├─ coords.js
│  │  └─ generate230.js
│  ├─ App.jsx
│  └─ main.jsx
├─ vite.config.js
└─ .github/workflows/deploy-pages.yml

## Setup local

Cerințe:
- Node.js 18+ (recomandat 20)

Instalare:
```bash
npm install
