// Coordonate calibrate pe template-ul Formular 230 (2025)

export const COORD = {
  // --- I. Date contribuabil ---
  // Mutate un rând mai jos (≈ 18pt)
  nume:        { x: 70,  y: 682, size: 10 }, // 695 -> 677
  prenume:     { x: 70,  y: 660, size: 10 }, // 667 -> 649
  initialaTata:{ x: 300, y: 682, size: 10 }, // 695 -> 677

  // CNP în căsuțe — mutat o căsuță mai la stânga (x - step)
  cnpBoxes: {
    x: 330.4993,   // 348.98 - 18.4807
    y: 674.65,
    step: 18.4807,
    size: 10,
    dx: 5.8,
    dy: 0,
  },

  // E-mail / Telefon
  email:   { x: 365, y: 649.4, size: 10 },
  telefon: { x: 365, y: 622.4, size: 10 },

  // Stradă + Număr
  strada: { x: 64.6,  y: 638.4, size: 10, maxWidth: 180 },
  numar:  { x: 288.8, y: 638.4, size: 10 },

  // Bloc / Scară / Etaj / Ap. + Județ/Sector
  bloc:        { x: 47.6,  y: 615.4, size: 10 },
  scara:       { x: 107.8, y: 615.4, size: 10 },
  etaj:        { x: 147.6, y: 615.4, size: 10 },
  ap:          { x: 185, y: 615.4, size: 10 }, // 172.2 -> 192.2 (≈ +20pt)
  judetSector: { x: 255.4, y: 615.4, size: 10, maxWidth: 70 },

  // Localitate + Cod poștal
  oras:      { x: 68.3,  y: 593.4, size: 10, maxWidth: 150 },
  codPostal: { x: 264.1, y: 593.4, size: 10 },

  // Semnătură
  semnatura: { x: 90, y: 125, w: 190, h: 45 },
};
