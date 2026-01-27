import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { COORD } from "./coords";

function drawDigitsInBoxes(page, text, cfg, font) {
  const digits = (text || "").replace(/\D/g, "");
  for (let i = 0; i < digits.length; i++) {
    page.drawText(digits[i], {
      x: cfg.x + i * cfg.step,
      y: cfg.y,
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
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const draw = (txt, cfg) => {
    if (!txt) return;
    page.drawText(String(txt), {
      x: cfg.x,
      y: cfg.y,
      size: cfg.size,
      font,
      color: rgb(0, 0, 0),
    });
  };

  draw(data.nume, COORD.nume);
  draw(data.prenume, COORD.prenume);
  draw(data.initialaTata, COORD.initialaTata);
  draw(data.email, COORD.email);
  draw(data.telefon, COORD.telefon);

  drawDigitsInBoxes(page, data.cnp, COORD.cnpBoxes, font);

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

