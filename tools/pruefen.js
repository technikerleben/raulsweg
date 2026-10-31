#!/usr/bin/env node
/* ==========================================================
   Prüft die Daten des Bandes auf Widersprüche.
   Aufruf im Wurzelverzeichnis:  node tools/pruefen.js
   Fehler beenden mit Code 1, Hinweise nur mit Ausgabe.
   ========================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const WURZEL = path.join(__dirname, "..");
const DATEIEN = ["stationen", "kapitel", "maechte", "figuren", "tempel", "chronik", "spielhilfen", "karten", "wegpunkte", "preise", "dokumente"];

const kontext = {};
kontext.window = kontext;
vm.createContext(kontext);
for (const d of DATEIEN) vm.runInContext(fs.readFileSync(path.join(WURZEL, "data", d + ".js"), "utf8"), kontext, { filename: d + ".js" });
const RW = kontext.RW;

const fehler = [], hinweise = [];
const pruefe = (bedingung, text) => { if (!bedingung) fehler.push(text); };
const hinweis = (bedingung, text) => { if (!bedingung) hinweise.push(text); };
const vorhanden = rel => fs.existsSync(path.join(WURZEL, rel));
const bildDa = basis => ["webp", "jpg", "jpeg", "png"].some(e => vorhanden(`${basis}.${e}`));

function eindeutig(liste, name) {
  const gesehen = new Set();
  for (const x of liste) {
    pruefe(x.id, `${name}: Eintrag ohne id (${x.name || x.titel || "?"})`);
    pruefe(!gesehen.has(x.id), `${name}: id doppelt: ${x.id}`);
    gesehen.add(x.id);
  }
  return gesehen;
}

const halte = eindeutig(RW.stationen, "stationen");
const maechte = eindeutig(RW.maechte, "maechte");
const figuren = eindeutig(RW.figuren, "figuren");
eindeutig(RW.tempel, "tempel");
const dokumente = eindeutig(RW.dokumente, "dokumente");
eindeutig(RW.karten, "karten");
eindeutig(RW.wegpunkte, "wegpunkte");
eindeutig(RW.glossar, "glossar");
eindeutig(RW.chronik, "chronik");

// Stationen: Meilen steigen, Etappen passen
RW.stationen.forEach((s, i) => {
  if (s.typ === "station") hinweis(bildDa(`img/stationen/${s.bild}`), `Stationsbild fehlt: img/stationen/${s.bild}`);
  if (i > 0) {
    const vor = RW.stationen[i - 1];
    pruefe(s.meile > vor.meile, `stationen: Meile von ${s.id} nicht größer als bei ${vor.id}`);
    pruefe(s.etappe === s.meile - vor.meile, `stationen: Etappe ${s.id} (${s.etappe}) passt nicht zu den Meilen (${s.meile - vor.meile})`);
  }
});

// Figuren
RW.figuren.forEach(f => {
  pruefe(f.station === "unterwegs" || halte.has(f.station), `figuren: ${f.id} hat unbekannte Station ${f.station}`);
  (f.maechte || []).forEach(m => pruefe(maechte.has(m), `figuren: ${f.id} gehört zu unbekannter Macht ${m}`));
  pruefe((f.geheimnisse || []).length === 3, `figuren: ${f.id} hat nicht drei Geheimnisse`);
  hinweis(bildDa(`img/figuren/${f.bild || f.id}`), `Porträt fehlt: img/figuren/${f.bild || f.id}`);
});

// Tempel
RW.tempel.forEach(t => {
  pruefe(halte.has(t.station), `tempel: ${t.id} hat unbekannte Station ${t.station}`);
  hinweis(bildDa(`img/tempel/${t.id}`), `Tempelbild fehlt: img/tempel/${t.id}`);
});

// Mächte und Beziehungen
const ARTEN = ["buendnis", "geschaeft", "rivalitaet", "misstrauen"];
RW.maechte.forEach(m => {
  (m.stationen || []).forEach(s => pruefe(halte.has(s), `maechte: ${m.id} nennt unbekannte Station ${s}`));
  (m.dokumente || []).forEach(d => pruefe(dokumente.has(d), `maechte: ${m.id} nennt unbekanntes Dokument ${d}`));
});
const paare = new Set();
(RW.beziehungen || []).forEach(b => {
  pruefe(maechte.has(b.a) && maechte.has(b.b), `beziehungen: unbekannte Macht in ${b.a}–${b.b}`);
  pruefe(ARTEN.includes(b.art), `beziehungen: unbekannte Art ${b.art} bei ${b.a}–${b.b}`);
  const paar = [b.a, b.b].sort().join("|");
  pruefe(!paare.has(paar), `beziehungen: Paar doppelt: ${paar}`);
  paare.add(paar);
});

// Wegpunkte: Meile liegt auf der Etappe
const TYPEN = ["siedlung", "bauwerk", "landmarke", "natur", "abseits", undefined];
RW.wegpunkte.forEach(w => {
  const nach = RW.stationen.find(s => s.id === w.nach);
  pruefe(nach, `wegpunkte: ${w.id} läuft auf unbekannten Halt ${w.nach} zu`);
  if (!nach) return;
  const vor = RW.stationen.find(s => s.nr === nach.nr - 1);
  pruefe(vor && w.meile >= vor.meile && w.meile <= nach.meile, `wegpunkte: ${w.id} (Meile ${w.meile}) liegt nicht zwischen ${vor && vor.id} und ${nach.id}`);
  pruefe(TYPEN.includes(w.typ), `wegpunkte: ${w.id} hat unbekannten typ ${w.typ}`);
});

// Karten
RW.karten.forEach(c => {
  pruefe(!c.station || halte.has(c.station), `karten: ${c.id} hat unbekannte Station ${c.station}`);
  pruefe(vorhanden(c.datei), `karten: Datei fehlt: ${c.datei}`);
});

// Chronik: Ziele müssen existieren
const ziele = new Set([
  ...RW.stationen.map(s => (s.typ === "stadt" ? "ort:" : "station:") + s.id),
  ...RW.figuren.map(f => "figur:" + f.id), ...RW.maechte.map(m => "macht:" + m.id),
  ...RW.tempel.map(t => "tempel:" + t.id), ...RW.wegpunkte.map(w => "wegpunkt:" + w.id), ...RW.dokumente.map(d => "dokument:" + d.id)
]);
RW.chronik.forEach(c => {
  (c.orte || []).forEach(o => pruefe(halte.has(o), `chronik: ${c.id} nennt unbekannten Ort ${o}`));
  (c.figuren || []).forEach(f => pruefe(figuren.has(f), `chronik: ${c.id} nennt unbekannte Figur ${f}`));
  [...(c.enthuellt || []), ...(c.veraenderungen || [])].forEach(x => pruefe(ziele.has(x.ziel), `chronik: ${c.id} verweist auf unbekanntes Ziel ${x.ziel}`));
});

// Spielhilfen
const SH = RW.spielhilfen;
SH.abschnitte.forEach(a => {
  a.stationen.forEach(s => pruefe(halte.has(s), `spielhilfen: Abschnitt ${a.id} nennt unbekannte Station ${s}`));
  pruefe(a.begegnungen.length === 20, `spielhilfen: Abschnitt ${a.id} hat ${a.begegnungen.length} statt 20 Begegnungen`);
});
pruefe(SH.geruechte.length === 20, `spielhilfen: ${SH.geruechte.length} statt 20 Gerüchte`);
SH.wetter.forEach(w => {
  let erwartet = 1;
  w.tabelle.forEach(z => { pruefe(z.von === erwartet && z.bis >= z.von, `spielhilfen: Wetter ${w.id} hat eine Lücke oder Überlappung bei ${z.von}`); erwartet = z.bis + 1; });
  pruefe(erwartet === 21, `spielhilfen: Wetter ${w.id} endet nicht bei 20`);
});

// Inhaltliche Vorgaben des Bandes
const quelltext = DATEIEN.map(d => [d, fs.readFileSync(path.join(WURZEL, "data", d + ".js"), "utf8")]);
const app = fs.readFileSync(path.join(WURZEL, "js", "app.js"), "utf8");
for (const [d, t] of [...quelltext, ["app", app]]) {
  pruefe(!/Stoerrebrandt/i.test(t), `${d}: erwähnt Stoerrebrandt`);
  pruefe(!/Menschenhandel|Sklav/i.test(t), `${d}: Menschenhandel oder Sklaverei erwähnt`);
  // Japan und Tōkaidō nur in den Quellen des Anhangs
  const ohneQuellen = d === "kapitel" ? t.replace(/<h2>Quellen<\/h2>[\s\S]*?(?=<h2>|`)/, "") : t;
  pruefe(!/Japan|T[oō]kaid[oō]/i.test(ohneQuellen), `${d}: Bezug zu Japan außerhalb der Quellen`);
}

hinweise.forEach(h => console.log("Hinweis:", h));
fehler.forEach(f => console.log("FEHLER:", f));
console.log(`${RW.stationen.length} Halte, ${RW.figuren.length} Figuren, ${RW.maechte.length} Mächte, ${RW.wegpunkte.length} Wegpunkte, ${RW.karten.length} Karten geprüft: ${fehler.length} Fehler, ${hinweise.length} Hinweise.`);
process.exit(fehler.length ? 1 : 0);
