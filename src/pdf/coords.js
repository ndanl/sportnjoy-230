// Coordonate Formular 230 (2025)
// P1: calibrate (înlocuiește dacă ai alte valori finale)
// P2: placeholder (calibrăm după primul PDF generat)

export const COORD = {
  // ===== Pagina 1 =====
  nume:        { x: 70,  y: 682, size: 10 },
  prenume:     { x: 70,  y: 660, size: 10 },
  initialaTata:{ x: 300, y: 682, size: 10 },

  // CNP P1
  cnpBoxes: {
    x: 330.4993,
    y: 674.65,
    step: 18.4807,
    size: 10,
    dx: 5.8,
    dy: 0,
  },

  email:   { x: 365, y: 649.4, size: 10 },
  telefon: { x: 365, y: 622.4, size: 10 },

  strada: { x: 64,  y: 638.4, size: 10, maxWidth: 180 },
  numar:  { x: 288, y: 638.4, size: 10 },

  bloc:        { x: 47.6,  y: 615.4, size: 10 },
  scara:       { x: 107.8, y: 615.4, size: 10 },
  etaj:        { x: 147.6, y: 615.4, size: 10 },
  ap:          { x: 185, y: 615.4, size: 10 },
  judetSector: { x: 255.4, y: 615.4, size: 10, maxWidth: 70 },

  oras:      { x: 68.3,  y: 593.4, size: 10, maxWidth: 150 },
  codPostal: { x: 264.1, y: 593.4, size: 10 },

  // Checkbox “2 ani” pagina 1 (placeholder; ajustăm)
  opt2ani_p1: { x: 325, y: 429, size: 12 },

  // Semnătură pagina 1
  semnatura: { x: 120, y: 125, w: 190, h: 45 },

  // ===== Pagina 2 (placeholder) =====
  // Checkbox “2 ani” pagina 2
  opt2ani_p2: { x: 330, y: 445, size: 12 },

  // CNP pagina 2 (câte 13 căsuțe)
  cnpBoxes_p2: {
    x: 350,
    y: 674,
    step: 17,
    size: 10,
    dx: 5.8,
    dy: 0,
  },

  // Semnătură pagina 2
  semnatura_p2: { x: 120, y: 120, w: 190, h: 45 },
};
