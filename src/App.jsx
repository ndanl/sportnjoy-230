import React, { useMemo, useState } from "react";
import SignaturePad from "./components/SignaturePad";
import { generate230Pdf } from "./pdf/generate230";

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function App() {
  const [form, setForm] = useState({
    nume: "",
    prenume: "",
    initialaTata: "",
    cnp: "",
    strada: "",
    numar: "",
    bloc: "",
    scara: "",
    etaj: "",
    ap: "",
    judetSector: "",
    oras: "",
    codPostal: "",
    email: "",
    telefon: "",
    aniDistribuire: 1, // 1 sau 2
  });

  const [sig, setSig] = useState("");
  const [status, setStatus] = useState("");

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const filename = useMemo(() => {
    const safe = (s) =>
      (s || "")
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_-]/g, "");
    return `Formular_230_${safe(form.nume) || "Nume"}_${safe(form.prenume) || "Prenume"}.pdf`;
  }, [form.nume, form.prenume]);

  const onGenerate = async () => {
    try {
      setStatus("Generez PDF...");
      const blob = await generate230Pdf(form, sig);
      downloadBlob(blob, filename);
      setStatus("Gata. PDF descărcat.");
    } catch (e) {
      console.error(e);
      setStatus("Eroare la generare. Vezi consola (DevTools).");
    }
  };

  return (
    <div className="wrap">
      <div className="card">
        <div style={{ fontWeight: 800, fontSize: 18 }}>sportnjoy-230 — Formular 230</div>
        <div className="small">
          Completezi datele tale, semnezi pe ecran și descarci PDF-ul completat (local, în browser).
          Pagina 2 se completează mereu cu CNP + semnătură.
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700 }}>Date contribuabil</div>

        <div className="row">
          <div>
            <label>Nume</label>
            <input value={form.nume} onChange={set("nume")} autoComplete="family-name" />
          </div>
          <div>
            <label>Prenume</label>
            <input value={form.prenume} onChange={set("prenume")} autoComplete="given-name" />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Inițiala tatălui</label>
            <input value={form.initialaTata} onChange={set("initialaTata")} maxLength={1} />
          </div>
          <div>
            <label>CNP / NIF</label>
            <input
              value={form.cnp}
              onChange={set("cnp")}
              inputMode="numeric"
              placeholder="13 cifre pentru CNP"
            />
          </div>
        </div>

        <label>Stradă</label>
        <input value={form.strada} onChange={set("strada")} placeholder="ex. Str. Exemplu" />

        <div className="row">
          <div>
            <label>Număr</label>
            <input value={form.numar} onChange={set("numar")} placeholder="ex. 10A" />
          </div>
          <div>
            <label>Bloc</label>
            <input value={form.bloc} onChange={set("bloc")} placeholder="ex. B3" />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Scară</label>
            <input value={form.scara} onChange={set("scara")} placeholder="ex. 2" />
          </div>
          <div>
            <label>Etaj</label>
            <input value={form.etaj} onChange={set("etaj")} placeholder="ex. 4" />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Apartament</label>
            <input value={form.ap} onChange={set("ap")} placeholder="ex. 12" />
          </div>
          <div>
            <label>Cod poștal</label>
            <input value={form.codPostal} onChange={set("codPostal")} inputMode="numeric" placeholder="ex. 300001" />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Județ / Sector</label>
            <input value={form.judetSector} onChange={set("judetSector")} placeholder="ex. Timiș / Sector 1" />
          </div>
          <div>
            <label>Oraș</label>
            <input value={form.oras} onChange={set("oras")} placeholder="ex. Timișoara" />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Telefon</label>
            <input value={form.telefon} onChange={set("telefon")} inputMode="tel" />
          </div>
          <div>
            <label>Email</label>
            <input value={form.email} onChange={set("email")} type="email" autoComplete="email" />
          </div>
        </div>
      </div>

<div className="card">
  <div style={{ fontWeight: 700 }}>Distribuire</div>

  <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 10 }}>
    <div style={{ fontSize: 14 }}>Semnez pentru:</div>

    <select
      value={Number(form.aniDistribuire)}
      onChange={(e) => setForm((p) => ({ ...p, aniDistribuire: Number(e.target.value) }))}
      style={{
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #d7dbe0",
        fontSize: 16,
        background: "#fff",
      }}
    >
      <option value={1}>1 an</option>
      <option value={2}>2 ani</option>
    </select>

    <div className="small" style={{ marginLeft: "auto" }}>
      {Number(form.aniDistribuire) === 2
        ? "Se bifează opțiunea 2 ani."
        : "Nu se bifează opțiunea 2 ani."}
    </div>
  </div>
</div>


      <div className="card">
        <div style={{ fontWeight: 700 }}>Semnătură</div>
        <SignaturePad onChange={setSig} />

        <div style={{ marginTop: 10 }}>
          <button className="btn btn-primary" type="button" onClick={onGenerate}>
            Generează PDF & descarcă
          </button>
          <div className="small" style={{ marginTop: 8 }}>{status}</div>
        </div>
      </div>
    </div>
  );
}
