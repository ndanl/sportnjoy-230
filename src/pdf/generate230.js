import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { COORD } from "./coords";

function norm(s) {
  return (s ?? "").toString().trim();
}

function drawTextClamped(page, text, cfg, font) {
  const t = norm(text);
  if (!t) return;

  page.drawText(t, {
    x: cfg.x,
    y: cfg.y,
    size: cfg.size,
    font,
    color: rgb(0, 0, 0),
    maxWidth: cfg.maxWidth,     // dacă e setat, pdf-lib va face “wrap”
    lineHeight: cfg.lineHeight ?? (cfg.size + 2),
  });
}

function drawDigitsInBoxes(page, text, cfg, font) {
  const digits = norm(text).replace(/\D/g, "");
  for (let i = 0; i < digits.length; i++) {
    page.drawText(digits[i], {
      x: cfg.x + i * cfg.step + (cfg.dx ?? 0),
      y: cfg.y + (cfg.dy ?? 0),
      size: cfg.size,
      font,
      color: rgb(0, 0, 0),
    });
  }
}

export async function generate230Pdf(data, signaturePngDataUrl) {
  const templateUrl = `${import.meta.env.BASE_URL}templates/formular230_2025.pdf`;
  const templateBytes = await fetch(templateUrl).then((r) => r.arrayBuffer());

  const pdfDoc = await PDFDocument.load(templateBytes);
  const page = pdfDoc.getPages()[0];

  // Fonturi
  const fontText = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);

  // DEBUG overlay (pune false după calibrare)
  const DEBUG = false;
  if (DEBUG) {
    const rect = (x, y, w, h) =>
      page.drawRectangle({
        x, y, width: w, height: h,
        borderWidth: 0.8,
        borderColor: rgb(1, 0, 0),
      });

    // 13 căsuțe CNP (ghidaj)
    for (let i = 0; i < 13; i++) {
      rect(COORD.cnpBoxes.x + i * COORD.cnpBoxes.step, COORD.cnpBoxes.y, COORD.cnpBoxes.step, 14);
    }

    // ghid semnătură
    rect(COORD.semnatura.x, COORD.semnatura.y, COORD.semnatura.w, COORD.semnatura.h);

    // ghid stradă (aprox)
    rect(COORD.strada.x, COORD.strada.y, COORD.strada.maxWidth ?? 300, 14);
  }

  // I. Date contribuabil
  drawTextClamped(page, data.nume, COORD.nume, fontText);
  drawTextClamped(page, data.prenume, COORD.prenume, fontText);
  drawTextClamped(page, data.initialaTata, COORD.initialaTata, fontText);

  // Contact
  drawTextClamped(page, data.email, COORD.email, fontText);
  drawTextClamped(page, data.telefon, COORD.telefon, fontText);

  // CNP în căsuțe
  drawDigitsInBoxes(page, data.cnp, COORD.cnpBoxes, fontMono);

  // Adresă
  drawTextClamped(page, data.strada, COORD.strada, fontText);
  drawTextClamped(page, data.numar, COORD.numar, fontText);
  drawTextClamped(page, data.bloc, COORD.bloc, fontText);
  drawTextClamped(page, data.scara, COORD.scara, fontText);
  drawTextClamped(page, data.etaj, COORD.etaj, fontText);
  drawTextClamped(page, data.ap, COORD.ap, fontText);

  drawTextClamped(page, data.judetSector, COORD.judetSector, fontText);
  drawTextClamped(page, data.oras, COORD.oras, fontText);
  drawTextClamped(page, data.codPostal, COORD.codPostal, fontText);

  // Semnătură
  if (signaturePngDataUrl) {
    const pngBytes = await fetch(signaturePngDataUrl).then((r) => r.arrayBuffer());
    const sigImg = await pdfDoc.embedPng(pngBytes);

    page.drawImage(sigImg, {
      x: COORD.semnatura.x,
      y: COORD.semnatura.y,
      width: COORD.semnatura.w,
      height: COORD.semnatura.h,
    });
  }

  const out = await pdfDoc.save();
  return new Blob([out], { type: "application/pdf" });
}
