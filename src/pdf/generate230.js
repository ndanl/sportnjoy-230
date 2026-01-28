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
    maxWidth: cfg.maxWidth,
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

function drawX(page, cfg, font) {
  page.drawText("X", {
    x: cfg.x,
    y: cfg.y,
    size: cfg.size ?? 12,
    font,
    color: rgb(0, 0, 0),
  });
}

async function drawSignature(pdfDoc, page, signaturePngDataUrl, cfg) {
  if (!signaturePngDataUrl) return;
  const pngBytes = await fetch(signaturePngDataUrl).then((r) => r.arrayBuffer());
  const sigImg = await pdfDoc.embedPng(pngBytes);
  page.drawImage(sigImg, {
    x: cfg.x,
    y: cfg.y,
    width: cfg.w,
    height: cfg.h,
  });
}

export async function generate230Pdf(data, signaturePngDataUrl) {
  const templateUrl = `${import.meta.env.BASE_URL}templates/formular230_2025.pdf`;
  const templateBytes = await fetch(templateUrl).then((r) => r.arrayBuffer());

  const pdfDoc = await PDFDocument.load(templateBytes);
  const pages = pdfDoc.getPages();
  const page1 = pages[0];
  const page2 = pages[1]; // formularul are 2 pagini

  const fontText = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);

  // ===== Pagina 1 =====
  drawTextClamped(page1, data.nume, COORD.nume, fontText);
  drawTextClamped(page1, data.prenume, COORD.prenume, fontText);
  drawTextClamped(page1, data.initialaTata, COORD.initialaTata, fontText);

  drawTextClamped(page1, data.email, COORD.email, fontText);
  drawTextClamped(page1, data.telefon, COORD.telefon, fontText);

  drawDigitsInBoxes(page1, data.cnp, COORD.cnpBoxes, fontMono);

  drawTextClamped(page1, data.strada, COORD.strada, fontText);
  drawTextClamped(page1, data.numar, COORD.numar, fontText);
  drawTextClamped(page1, data.bloc, COORD.bloc, fontText);
  drawTextClamped(page1, data.scara, COORD.scara, fontText);
  drawTextClamped(page1, data.etaj, COORD.etaj, fontText);
  drawTextClamped(page1, data.ap, COORD.ap, fontText);

  drawTextClamped(page1, data.judetSector, COORD.judetSector, fontText);
  drawTextClamped(page1, data.oras, COORD.oras, fontText);
  drawTextClamped(page1, data.codPostal, COORD.codPostal, fontText);

  if (Number(data.aniDistribuire) === 2) {
    drawX(page1, COORD.opt2ani_p1, fontText);
  }

  await drawSignature(pdfDoc, page1, signaturePngDataUrl, COORD.semnatura);

  // ===== Pagina 2 (mereu completăm CNP + semnătură) =====
  if (Number(data.aniDistribuire) === 2) {
    drawX(page2, COORD.opt2ani_p2, fontText);
  }

  drawDigitsInBoxes(page2, data.cnp, COORD.cnpBoxes_p2, fontMono);
  await drawSignature(pdfDoc, page2, signaturePngDataUrl, COORD.semnatura_p2);

  const out = await pdfDoc.save();
  return new Blob([out], { type: "application/pdf" });
}
