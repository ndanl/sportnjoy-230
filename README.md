sportnjoy-230 — Formular 230 (2025) · Web app (mobile-first)

Aplicație web (Vite + React) optimizată pentru mobil, care permite completarea datelor contribuabilului, semnarea pe ecran și generarea locală (în browser) a PDF-ului Formular 230 (2025). PDF-ul este completat peste un template precompletat (datele organizației fiind deja în PDF).

Rulează 100% client-side (nu trimite date pe server).

Salvează PDF-ul local prin download.

Suportă formular cu 2 pagini:

Pagina 1: completează câmpurile contribuabilului + semnătură

Pagina 2: completează mereu CNP + semnătură

Opțiunea „2 ani” se bifează doar când selectezi 2 ani

Demo

GitHub Pages: https://ndanl.github.io/sportnjoy-230/

Funcționalități

Completare câmpuri:

nume, prenume, inițiala tatălui, CNP

stradă, număr, bloc, scară, etaj, apartament

județ/sector, oraș, cod poștal

email, telefon

Semnătură online (canvas)

Selectare perioadă distribuire: 1 an / 2 ani

Generare PDF (pdf-lib) peste template

Download PDF pe device

Tehnologii

Vite + React

pdf-lib (scriere text / imagine pe PDF)

Structură proiect
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
Setup local

Cerințe:

Node.js 18+ (recomandat 20)

Instalare:

npm install

Rulare locală:

npm run dev

Build:

npm run build
npm run preview
Template PDF

Template-ul folosit de aplicație se află aici:

public/templates/formular230_2025.pdf

Aplicația îl încarcă folosind:

const templateUrl = `${import.meta.env.BASE_URL}templates/formular230_2025.pdf`;
Coordonate câmpuri (aliniere “la milimetru”)

Câmpurile sunt desenate pe PDF prin coordonate (x/y) în:

src/pdf/coords.js

Dacă template-ul PDF se schimbă (altă versiune / alt layout), va trebui recalibrat coords.js.

Debug overlay (opțional)

În src/pdf/generate230.js poți activa un overlay de debug (chenare) pentru a vedea rapid unde se desenează elementele și pentru a ajusta coordonatele.

Deploy pe GitHub Pages

Deploy-ul este făcut prin GitHub Actions.

Verifică vite.config.js:

export default defineConfig({
  plugins: [react()],
  base: "/sportnjoy-230/",
});

În GitHub:

Repo → Settings → Pages

Source: GitHub Actions

La fiecare push în main, aplicația se build-uiește și se publică automat în Pages.

Notă privind confidențialitatea

Aplicația rulează în browser. Datele introduse sunt folosite doar pentru generarea PDF-ului local.
Nu există backend, nu se trimit date către server.

Licență

Alege o licență (ex. MIT) dacă vrei să fie reutilizabil public.