/* ==========================================================
   Der Raulsweg – Darstellung, Navigation, Querverweise
   Hash-Routen:
     #/                     Titelseite
     #/ueberblick[/abschnitt]   #/stationswesen[/…]   #/reisen[/…]
     #/anhang[/begriff]     Glossar-Begriffe sind Anker
     #/stationen            Übersicht        #/station/<id>
     #/ort/<id>             Gareth, Perricum
     #/maechte[/<id>]       Mächte am Weg
     #/chronik[/<id>]       Chronik der gespielten Geschichten
     #/karten               Karten und Pläne  #/karte/<id>
     #/bauplan              Ausbaustufen
   ========================================================== */
(function () {
  "use strict";

  const RW = window.RW;
  const main = document.getElementById("inhalt");
  const nav = document.getElementById("navigation");
  const stationen = RW.stationen.filter(s => s.typ === "station");
  const orte = RW.stationen.filter(s => s.typ === "stadt");
  const gesamtMeilen = RW.stationen[RW.stationen.length - 1].meile;
  const BILD_ENDUNGEN = ["webp", "jpg", "jpeg", "png"];
  const KAPITEL = ["ueberblick", "stationswesen", "reisen", "spielleitung", "anhang"];

  /* ---------- Hilfsfunktionen ---------- */
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const absaetze = arr => (arr || []).map(p => `<p>${esc(p)}</p>`).join("");
  const ohneTags = html => String(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const kuerzen = (t, n = 220) => t.length > n ? t.slice(0, t.lastIndexOf(" ", n)) + " …" : t;
  const slug = t => String(t).toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const ohneMeister = html => String(html).replace(/<div class="meister">[\s\S]*?<\/div>/g, " ");
  const statusText = { fertig: "fertig", erweiterung: "Erweiterung", rohbau: "Rohbau" };

  const vorgaenger = h => RW.stationen.find(s => s.nr === h.nr - 1);
  const meileText = h => (h.schaetzung ? "~" : "") + h.meile;
  const etappeText = h => h.etappe == null ? "–" : (h.schaetzung || (vorgaenger(h) || {}).schaetzung ? "~" : "") + h.etappe;
  const kanonMarke = h => h.kanon
    ? `<span class="marke-kanon" title="Ort aus offiziellen Quellen">Kanon</span>`
    : `<span class="marke-eigen" title="Für diesen Band ergänzter Ort">Ergänzung</span>`;
  const bauMarke = h => h.status ? `<span class="bau bau-${h.status}">${statusText[h.status]}</span>` : "";

  /* ==========================================================
     Register aller verlinkbaren Dinge
     ========================================================== */
  const register = new Map();
  const eintragen = e => register.set(e.schluessel, e);

  stationen.forEach(s => eintragen({
    schluessel: "station:" + s.id, art: `Station ${s.nr}, geweiht ${s.gottheit}`, name: s.name,
    begriffe: [s.name, ...(s.begriffe || [])], href: `#/station/${s.id}`, kurz: s.kurz,
    text: [s.kurz, ...(s.beschreibung || []), ...(s.vorlesetext || []), ...(s.geruechte || []), s.konflikt].join(" ")
  }));
  orte.forEach(o => eintragen({
    schluessel: "ort:" + o.id, art: "Endpunkt des Raulswegs", name: o.name,
    begriffe: [o.name], href: `#/ort/${o.id}`, kurz: o.kurz,
    text: [o.kurz, ...(o.beschreibung || [])].join(" ")
  }));
  RW.maechte.forEach(m => eintragen({
    schluessel: "macht:" + m.id, art: "Macht am Weg", name: m.name,
    begriffe: m.begriffe || [], href: `#/maechte/${m.id}`, kurz: kuerzen((m.beschreibung || [])[0] || ""),
    text: [...(m.beschreibung || []), m.will, m.konflikt].join(" ")
  }));
  const figuren = RW.figuren || [];
  figuren.forEach(f => eintragen({
    schluessel: "figur:" + f.id, art: f.rolle, name: f.name,
    begriffe: [f.name, ...(f.begriffe || [])], href: `#/figur/${f.id}`, kurz: f.kurz,
    text: [f.kurz, f.aussehen, f.auftreten, f.motiv, f.zitat].join(" ")
  }));
  const tempel = RW.tempel || [];
  const GENITIV = { Praios: "des Praios", Rondra: "der Rondra", Efferd: "des Efferd", Travia: "der Travia", Boron: "des Boron", Hesinde: "der Hesinde",
    Firun: "des Firun", Tsa: "der Tsa", Phex: "des Phex", Peraine: "der Peraine", Ingerimm: "des Ingerimm", Rahja: "der Rahja" };
  const tempelArt = t => `${t.art} ${GENITIV[t.gottheit] || t.gottheit}`;
  const wegpunkte = RW.wegpunkte || [];
  const haltName = id => (RW.stationen.find(s => s.id === id) || {}).name || id;
  wegpunkte.forEach(w => eintragen({
    schluessel: "wegpunkt:" + w.id, art: `${w.art} auf dem Weg nach ${haltName(w.nach)}`, name: w.name,
    begriffe: [w.name, ...(w.begriffe || []), ...(w.name.includes("„") ? [w.name.replace(/^.*„|“.*$/g, "")] : [])],
    href: `#/unterwegs/${w.id}`, kurz: w.kurz, text: [w.kurz, w.szene].join(" ")
  }));
  tempel.forEach(t => eintragen({
    schluessel: "tempel:" + t.id, art: tempelArt(t), name: t.name,
    begriffe: [t.name, ...(t.begriffe || [])], href: `#/tempel/${t.id}`, kurz: t.kurz,
    text: [t.kurz, ...(t.beschreibung || []), t.brauch, t.stempel, t.dienste, t.geweihte, t.spannung].join(" ")
  }));
  RW.glossar.forEach(g => eintragen({
    schluessel: "glossar:" + g.id, art: "Begriff", name: g.name,
    begriffe: [g.name, ...(g.begriffe || [])], href: `#/anhang/${g.id}`, kurz: g.text, text: g.text
  }));
  KAPITEL.forEach(k => eintragen({
    schluessel: "kapitel:" + k, art: "Kapitel", name: RW.kapitel[k].titel, begriffe: [],
    href: `#/${k}`, kurz: "", text: ohneTags(ohneMeister(RW.kapitel[k].html))
  }));

  // Begriffe → Schlüssel, längste zuerst, damit „Feste Hohenstein“ vor „Hohenstein“ greift
  const begriffListe = [];
  register.forEach(e => e.begriffe.forEach(b => begriffListe.push({ b, schluessel: e.schluessel })));
  begriffListe.sort((x, y) => y.b.length - x.b.length);
  const begriffZuSchluessel = new Map(begriffListe.map(x => [x.b, x.schluessel]));
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const begriffRegex = new RegExp(`(?<![\\p{L}\\p{N}])(${begriffListe.map(x => reEsc(x.b)).join("|")})(?![\\p{L}\\p{N}])`, "gu");

  function erwaehnteSchluessel(text) {
    const gefunden = new Set();
    for (const m of String(text).matchAll(begriffRegex)) gefunden.add(begriffZuSchluessel.get(m[1]));
    return gefunden;
  }

  // Vorwärts- und Rückverweise
  const erwaehnt = new Map();
  const rueckverweise = new Map();
  register.forEach(e => {
    const s = erwaehnteSchluessel(e.text);
    s.delete(e.schluessel);
    erwaehnt.set(e.schluessel, s);
    s.forEach(z => {
      if (!rueckverweise.has(z)) rueckverweise.set(z, new Set());
      rueckverweise.get(z).add(e.schluessel);
    });
  });

  const reihenfolge = { ort: 0, station: 1, wegpunkt: 2, tempel: 3, figur: 4, macht: 5, kapitel: 6, glossar: 7 };
  const nrVon = e => (RW.stationen.find(s => e.schluessel.endsWith(":" + s.id)) || {}).nr;
  function sortiert(menge) {
    return [...(menge || [])].map(k => register.get(k)).filter(Boolean).sort((a, b) => {
      const ra = reihenfolge[a.schluessel.split(":")[0]], rb = reihenfolge[b.schluessel.split(":")[0]];
      if (ra !== rb) return ra - rb;
      const na = nrVon(a), nb = nrVon(b);
      return na != null && nb != null ? na - nb : a.name.localeCompare(b.name, "de");
    });
  }
  const verweisLink = e => `<a href="${e.href}">${esc(e.name)}</a>`;

  /* ==========================================================
     Chronik: gespielte Geschichten und was sie festgelegt haben
     ========================================================== */
  const chronik = RW.chronik || [];
  const kartenNr = c => c.station ? (RW.stationen.find(s => s.id === c.station) || {}).nr ?? 99 : -1;
  const karten = (RW.karten || []).slice().sort((a, b) => kartenNr(a) - kartenNr(b));
  const kartenAn = id => karten.filter(c => c.station === id);
  const haltSchluessel = id => (orte.some(o => o.id === id) ? "ort:" : "station:") + id;
  const chronikZiele = c => new Set([
    ...(c.orte || []).map(haltSchluessel),
    ...(c.figuren || []).map(id => "figur:" + id),
    ...(c.enthuellt || []).map(x => x.ziel),
    ...(c.veraenderungen || []).map(x => x.ziel)
  ]);
  const chronikZu = schluessel => chronik.filter(c => chronikZiele(c).has(schluessel)).reverse();
  const chronikZeile = c => [c.spielleitung && `geleitet von ${esc(c.spielleitung)}`, c.gespielt && `gespielt am ${esc(c.gespielt)}`, c.aventurisch && esc(c.aventurisch)].filter(Boolean).join(" · ");
  const zielLink = ziel => { const e = register.get(ziel); return e ? verweisLink(e) : esc(ziel); };

  // Welche Variante gilt laut Chronik? → { "A": eintrag, … }
  function geltendeVarianten(schluessel) {
    const gilt = {};
    chronik.forEach(c => (c.enthuellt || []).forEach(x => { if (x.ziel === schluessel && x.variante) gilt[x.variante.toUpperCase()] = c; }));
    return gilt;
  }

  function chronikBezug(schluessel) {
    const eintraege = chronikZu(schluessel);
    if (!eintraege.length) return "";
    return `<section class="chronik-bezug"><h2>In der Chronik</h2><ul>${eintraege.map(c => {
      const enth = (c.enthuellt || []).filter(x => x.ziel === schluessel);
      const ver = (c.veraenderungen || []).filter(x => x.ziel === schluessel);
      return `<li><a class="chronik-titel" href="#/chronik/${esc(c.id)}">${esc(c.titel)}</a><span class="chronik-zeile">${chronikZeile(c)}</span>
        ${enth.map(x => `<p><strong>Enthüllt:</strong> ${esc(x.text)}</p>`).join("")}
        ${ver.map(x => `<p><strong>Seitdem:</strong> ${esc(x.text)}</p>`).join("")}</li>`;
    }).join("")}</ul></section>`;
  }

  /* ==========================================================
     Automatische Querverweise im gerenderten Text
     ========================================================== */
  const NICHT_VERLINKEN = "a, h1, h2, h3, .band-huelle, .station-kopf, .auf-seite, .wegweiser, figcaption, th, .glossar dt, .zeile-marken, .seitenleiste, .macht-sitz, .titel, .figur-rolle, .station-unterzeile, .figur-name, .chronik-zeile, .chronik-titel, pre, code, .weg-meile, .weg-art, .weg-name, .etappe-zeile";
  function verlinken(wurzel, eigene) {
    const benutzt = new Set(eigene);
    const walker = document.createTreeWalker(wurzel, NodeFilter.SHOW_TEXT, {
      acceptNode: n => n.parentElement.closest(NICHT_VERLINKEN) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const knoten = [];
    while (walker.nextNode()) knoten.push(walker.currentNode);
    knoten.forEach(n => {
      const text = n.nodeValue;
      begriffRegex.lastIndex = 0;
      let m, pos = 0, frag = null;
      while ((m = begriffRegex.exec(text))) {
        const k = begriffZuSchluessel.get(m[1]);
        if (benutzt.has(k)) continue;
        benutzt.add(k);
        frag = frag || document.createDocumentFragment();
        frag.append(text.slice(pos, m.index));
        const a = document.createElement("a");
        a.className = "qv"; a.href = register.get(k).href; a.dataset.ziel = k; a.textContent = m[1];
        frag.append(a);
        pos = m.index + m[1].length;
      }
      if (frag) { frag.append(text.slice(pos)); n.replaceWith(frag); }
    });
  }

  /* ---------- Vorschau beim Überfahren ---------- */
  const vorschau = document.createElement("div");
  vorschau.className = "vorschau"; vorschau.setAttribute("role", "tooltip");
  document.body.append(vorschau);
  let vorschauZeit;
  function vorschauZeigen(a) {
    const e = register.get(a.dataset.ziel);
    if (!e || !e.kurz) return;
    vorschau.innerHTML = `<span class="vorschau-art">${esc(e.art)}</span><strong>${esc(e.name)}</strong>${esc(kuerzen(e.kurz))}`;
    const r = a.getBoundingClientRect();
    const breite = Math.min(320, window.innerWidth - 24);
    const links = Math.max(window.scrollX + 12, Math.min(r.left + window.scrollX, window.scrollX + window.innerWidth - breite - 12));
    vorschau.style.left = links + "px";
    vorschau.style.top = (r.bottom + window.scrollY + 8) + "px";
    vorschau.classList.add("sichtbar");
  }
  const vorschauWeg = () => vorschau.classList.remove("sichtbar");
  document.addEventListener("mouseover", ev => {
    const a = ev.target.closest("a.qv");
    clearTimeout(vorschauZeit);
    if (a) vorschauZeit = setTimeout(() => vorschauZeigen(a), 180); else vorschauWeg();
  });
  document.addEventListener("focusin", ev => { const a = ev.target.closest("a.qv"); a ? vorschauZeigen(a) : vorschauWeg(); });
  window.addEventListener("scroll", vorschauWeg, { passive: true });

  /* ---------- Meisterinformationen ---------- */
  const schalter = document.getElementById("meister-schalter");
  function meisterSetzen(an) {
    document.body.classList.toggle("meister-an", an);
    schalter.checked = an;
    try { localStorage.setItem("raulsweg-meister", an ? "1" : "0"); } catch (e) { }
  }
  let meisterStart = false;
  try { meisterStart = localStorage.getItem("raulsweg-meister") === "1"; } catch (e) { }
  meisterSetzen(meisterStart);
  schalter.addEventListener("change", () => meisterSetzen(schalter.checked));

  /* ---------- Ansicht: automatisch / Tag / Nacht ---------- */
  const ansichtKnopf = document.getElementById("ansicht-knopf");
  const ANSICHTEN = [["auto", "Auto"], ["light", "Tag"], ["dark", "Nacht"]];
  let ansicht = document.documentElement.dataset.theme || "auto";
  function ansichtSetzen(a) {
    ansicht = a;
    if (a === "auto") delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = a;
    const [, name] = ANSICHTEN.find(x => x[0] === a);
    ansichtKnopf.innerHTML = `<span class="knopf-text">Ansicht: </span>${name}`;
    ansichtKnopf.setAttribute("aria-label", "Ansicht: " + name + ". Klicken zum Wechseln.");
    try { localStorage.setItem("raulsweg-ansicht", a); } catch (e) { }
  }
  ansichtSetzen(ansicht);
  ansichtKnopf.addEventListener("click", () => {
    const i = ANSICHTEN.findIndex(x => x[0] === ansicht);
    ansichtSetzen(ANSICHTEN[(i + 1) % ANSICHTEN.length][0]);
  });

  /* ==========================================================
     Navigation und Suche
     ========================================================== */
  function baueNavigation() {
    const stationLinks = stationen.map(s =>
      `<li><a href="#/station/${s.id}" data-route="station/${s.id}"><span class="nav-nr">${s.nr}</span><span>${esc(s.name)}</span></a></li>`).join("");
    nav.innerHTML = `
      <div class="suche" role="search">
        <label for="suchfeld">Suchen</label>
        <input id="suchfeld" type="search" placeholder="Ort, Macht, Begriff …" autocomplete="off">
        <ul class="suche-treffer" id="suche-treffer"></ul>
      </div>
      <p class="nav-gruppe">Einführung</p>
      <ul>
        <li><a href="#/" data-route="">Titelseite</a></li>
        <li><a href="#/ueberblick" data-route="ueberblick">Der Raulsweg im Überblick</a></li>
        <li><a href="#/stationswesen" data-route="stationswesen">Das Stationswesen</a></li>
      </ul>
      <p class="nav-gruppe">Die Strecke</p>
      <ul>
        <li><a href="#/ort/gareth" data-route="ort/gareth"><span class="nav-nr">G</span><span>Gareth</span></a></li>
        ${stationLinks}
        <li><a href="#/ort/perricum" data-route="ort/perricum"><span class="nav-nr">P</span><span>Perricum</span></a></li>
        <li><a href="#/stationen" data-route="stationen">Alle Stationen im Überblick</a></li>
        <li><a href="#/unterwegs" data-route="unterwegs">Zwischen den Stationen</a></li>
      </ul>
      <p class="nav-gruppe">Hintergrund</p>
      <ul>
        <li><a href="#/maechte" data-route="maechte">Mächte am Weg</a></li>
        <li><a href="#/figuren" data-route="figuren">Figuren</a></li>
        <li><a href="#/tempel" data-route="tempel">Die zwölf Tempel</a></li>
        <li><a href="#/karten" data-route="karten">Karten und Pläne</a></li>
        <li><a href="#/reisen" data-route="reisen">Reisen auf dem Raulsweg</a></li>
      </ul>
      <p class="nav-gruppe">Für die Runde</p>
      <ul>
        <li><a href="#/spielleitung" data-route="spielleitung">Für Spielleitungen</a></li>
        <li><a href="#/chronik" data-route="chronik">Chronik${chronik.length ? ` <span class="nav-zahl">${chronik.length}</span>` : ""}</a></li>
      </ul>
      <p class="nav-gruppe">Anhang</p>
      <ul>
        <li><a href="#/anhang" data-route="anhang">Glossar und Quellen</a></li>
        <li><a href="#/bauplan" data-route="bauplan">Bauplan des Bandes</a></li>
      </ul>`;
    sucheEinrichten();
  }

  const suchindex = [];
  register.forEach(e => suchindex.push({ titel: e.name, art: e.art, href: e.href, text: (e.name + " " + e.begriffe.join(" ") + " " + e.text).toLowerCase() }));
  KAPITEL.forEach(k => {
    RW.kapitel[k].html.split(/<h2[^>]*>/).slice(1).forEach(t => {
      const titel = ohneTags(t.split("</h2>")[0]).trim();
      suchindex.push({ titel, art: RW.kapitel[k].titel, href: `#/${k}/${slug(titel)}`, text: (titel + " " + ohneTags(t)).toLowerCase() });
    });
  });

  karten.forEach(c => suchindex.push({ titel: c.titel, art: c.art, href: `#/karte/${c.id}`,
    text: [c.titel, c.art, c.kurz, ...(c.legende || []).map(l => l[1] + " " + l[2])].join(" ").toLowerCase() }));
  chronik.forEach(c => suchindex.push({ titel: c.titel, art: "Chronik", href: `#/chronik/${c.id}`,
    text: [c.titel, c.spielleitung, ...(c.zusammenfassung || []), ...(c.enthuellt || []).map(x => x.text), ...(c.veraenderungen || []).map(x => x.text), ...(c.neu || []), ...(c.offen || [])].join(" ").toLowerCase() }));

  function sucheEinrichten() {
    const feld = document.getElementById("suchfeld");
    const liste = document.getElementById("suche-treffer");
    const leeren = () => { feld.value = ""; liste.innerHTML = ""; };
    function suchen() {
      const w = feld.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      if (!w.length) { liste.innerHTML = ""; return; }
      const treffer = suchindex
        .map(e => ({ e, punkte: w.every(x => e.text.includes(x)) ? w.reduce((p, x) => p + (e.titel.toLowerCase().includes(x) ? 10 : 1), 0) : 0 }))
        .filter(x => x.punkte > 0).sort((a, b) => b.punkte - a.punkte).slice(0, 8);
      liste.innerHTML = treffer.length
        ? treffer.map(({ e }) => `<li><a href="${e.href}">${esc(e.titel)}<small>${esc(e.art)}</small></a></li>`).join("")
        : `<li class="suche-leer">Nichts gefunden. Versuch einen Ortsnamen oder Begriff.</li>`;
    }
    feld.addEventListener("input", suchen);
    feld.addEventListener("keydown", ev => {
      if (ev.key === "Enter") { const a = liste.querySelector("a"); if (a) { location.hash = a.getAttribute("href"); leeren(); } }
      if (ev.key === "Escape") leeren();
    });
    liste.addEventListener("click", ev => { if (ev.target.closest("a")) leeren(); });
  }

  function navMarkieren(route) {
    const teile = route.split("/");
    const basis = teile[0] === "figur" ? "figuren" : ["station", "ort"].includes(teile[0]) ? teile.slice(0, 2).join("/") : teile[0];
    nav.querySelectorAll("a[data-route]").forEach(a => {
      if (a.dataset.route === basis) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }
  const menueKnopf = document.getElementById("menue-knopf");
  menueKnopf.addEventListener("click", () => {
    const offen = nav.classList.toggle("offen");
    menueKnopf.setAttribute("aria-expanded", offen);
  });
  nav.addEventListener("click", e => {
    if (e.target.closest("a")) { nav.classList.remove("offen"); menueKnopf.setAttribute("aria-expanded", "false"); }
  });

  /* ==========================================================
     Bausteine
     ========================================================== */
  const linkZu = h => `${h.typ === "stadt" ? "#/ort/" : "#/station/"}${h.id}`;

  // Positionen im Streckenband: nach Meilen, aber mit Mindestabstand, damit nahe Halte nicht übereinanderliegen
  const bandPositionen = abstand => {
    const pos = RW.stationen.map(h => (h.meile / gesamtMeilen) * 100);
    for (let i = 1; i < pos.length; i++) pos[i] = Math.max(pos[i], pos[i - 1] + abstand);
    pos[pos.length - 1] = Math.min(pos[pos.length - 1], 100);
    for (let i = pos.length - 2; i >= 0; i--) pos[i] = Math.min(pos[i], pos[i + 1] - abstand);
    return pos;
  };

  function streckenband(aktiv, klein) {
    const bandPos = bandPositionen(klein ? 6.8 : 4.5);
    const halte = RW.stationen.map((h, i) => {
      const klassen = ["band-halt", i % 2 === 0 ? "oben" : "unten"];
      if (i % 4 >= 2) klassen.push("weit");
      if (h.typ === "stadt") klassen.push("stadt"); else if (!h.kanon) klassen.push("ergaenzt");
      if (h.id === aktiv) klassen.push("aktiv");
      const zeichen = h.typ === "stadt" ? h.name[0] : h.nr;
      return `<a class="${klassen.join(" ")}" style="left:${bandPos[i]}%" href="${linkZu(h)}" aria-label="${esc(h.name)}, Meile ${meileText(h)}"${h.id === aktiv ? ' aria-current="location"' : ""}>
          <span class="band-siegel">${zeichen}</span>
          <span class="band-name">${esc(h.name)}<span class="band-meile">Meile ${meileText(h)}</span></span>
        </a>`;
    }).join("");
    const legende = klein ? "" : `<div class="band-legende">
          <span><i class="punkt"></i> Station an kanonischem Ort</span>
          <span><i class="punkt ergaenzt"></i> ergänzte Station</span>
          <span><i class="punkt stadt"></i> Endpunkt</span>
        </div>`;
    return `<div class="band-huelle" role="region" aria-label="Streckenband Gareth bis Perricum">
        <div class="band${klein ? " klein" : ""}"><div class="band-weg"></div>${halte}</div>${legende}
      </div>`;
  }

  function entfernungstabelle() {
    const zeilen = RW.stationen.map(h => `
      <tr>
        <td class="zahl">${h.typ === "stadt" ? "–" : h.nr}</td>
        <td><a href="${linkZu(h)}">${esc(h.name)}</a></td>
        <td>${h.gottheit ? esc(h.gottheit) : ""}</td>
        <td class="zahl">${meileText(h)}</td>
        <td class="zahl">${etappeText(h)}</td>
      </tr>`).join("");
    return `<div class="tabelle-huelle"><table>
        <thead><tr><th class="zahl">Nr.</th><th>Halt</th><th>Gottheit</th><th class="zahl">Meile ab Gareth</th><th class="zahl">Etappe</th></tr></thead>
        <tbody>${zeilen}</tbody></table></div>`;
  }

  function reisezeitentabelle() {
    const zeilen = RW.reisezeiten.map(r => `<tr><td>${esc(r.art)}</td><td class="zahl">${esc(r.proTag)}</td><td class="zahl">${esc(r.dauer)}</td></tr>`).join("");
    return `<div class="tabelle-huelle"><table>
        <thead><tr><th>Reisende</th><th class="zahl">Meilen pro Tag</th><th class="zahl">Gesamtdauer</th></tr></thead>
        <tbody>${zeilen}</tbody></table></div>`;
  }

  function glossarListe() {
    return `<dl class="glossar">${RW.glossar.map(g => {
      const rv = sortiert(rueckverweise.get("glossar:" + g.id)).filter(e => !e.schluessel.startsWith("glossar:") && e.schluessel !== "kapitel:anhang");
      return `<dt id="${g.id}">${esc(g.name)}</dt><dd>${esc(g.text)}${rv.length ? `<br><span class="leise">Erwähnt bei ${rv.map(verweisLink).join(", ")}</span>` : ""}</dd>`;
    }).join("")}</dl>`;
  }

  function stationsbild(s) {
    return `<figure class="station-bild">
        <img data-basis="img/stationen/${s.bild}" data-versuch="0" src="img/stationen/${s.bild}.${BILD_ENDUNGEN[0]}" alt="${esc(s.name)}: ${esc(s.jahreszeit || "")}" loading="lazy">
        <figcaption>Station ${esc(s.nr)}, ${esc(s.name)}: ${esc(s.jahreszeit || "")}</figcaption>
      </figure>`;
  }
  function bilderAbsichern() {
    main.querySelectorAll("img[data-basis]").forEach(img => {
      img.addEventListener("error", () => {
        const n = Number(img.dataset.versuch) + 1;
        if (n < BILD_ENDUNGEN.length) { img.dataset.versuch = n; img.src = `${img.dataset.basis}.${BILD_ENDUNGEN[n]}`; }
        else {
          const platz = document.createElement("div");
          if (img.dataset.monogramm) {
            platz.className = "monogramm";
            platz.setAttribute("aria-hidden", "true");
            platz.textContent = img.dataset.monogramm;
          } else {
            platz.className = "bild-platzhalter";
            platz.innerHTML = `<div><strong>${esc(img.alt.split(":")[0])}</strong>Bild folgt: ${esc(img.dataset.basis)}.webp</div>`;
          }
          img.replaceWith(platz);
        }
      });
    });
  }

  const initialen = name => name.split(/\s+/).filter(w => /^\p{Lu}/u.test(w)).map(w => w[0]).slice(0, 2).join("");
  function moeglichkeitenListe(liste, schluessel) {
    const gilt = schluessel ? geltendeVarianten(schluessel) : {};
    return `<ol class="moeglichkeiten">${(liste || []).map((m, i) => {
      const c = gilt[String.fromCharCode(65 + i)];
      return c ? `<li class="gilt">${esc(m)}<span class="gilt-marke">Gilt laut Chronik: <a href="#/chronik/${esc(c.id)}">${esc(c.titel)}</a></span></li>` : `<li>${esc(m)}</li>`;
    }).join("")}</ol>`;
  }

  function portraet(f, klein) {
    return `<span class="portraet${klein ? " klein" : ""}"><img data-basis="img/figuren/${f.bild || f.id}" data-versuch="0" data-monogramm="${esc(initialen(f.name))}"
        src="img/figuren/${f.bild || f.id}.${BILD_ENDUNGEN[0]}" alt="Porträt: ${esc(f.name)}" loading="lazy"></span>`;
  }
  function figurKarten(liste) {
    if (!liste.length) return "";
    return `<ul class="figuren-raster">${liste.map(f => `
      <li class="figur-karte">
        ${portraet(f, true)}
        <div><a class="figur-name" href="#/figur/${f.id}">${esc(f.name)}</a><span class="figur-rolle">${esc(f.rolle)}</span><p>${esc(f.kurz)}</p></div>
      </li>`).join("")}</ul>`;
  }
  const tempelAn = id => tempel.find(t => t.station === id);
  function tempelKasten(t) {
    return `<section class="tempel-kasten">
        <h2>${esc(t.name)}</h2>
        <p class="tempel-zeile">${esc(tempelArt(t))} ${bauMarke({ status: t.zustand })}</p>
        <p>${esc(t.kurz)}</p>
        <dl class="tempel-daten">
          <dt>Brauch</dt><dd>${esc(t.brauch)}</dd>
          <dt>Stempel</dt><dd>${esc(t.stempel)}</dd>
          <dt>Gehütet von</dt><dd>${esc(t.geweihte)}</dd>
        </dl>
        <p><a href="#/tempel/${t.id}">Ganzer Eintrag im Tempelverzeichnis</a></p>
      </section>`;
  }
  const figurenAn = id => figuren.filter(f => f.station === id);
  const figurenVon = mid => figuren.filter(f => (f.maechte || []).includes(mid));

  function verbindungsBlock(schluessel) {
    const vor = sortiert(erwaehnt.get(schluessel)).filter(e => /^(station|ort|macht|figur|tempel):/.test(e.schluessel));
    const rueck = sortiert(rueckverweise.get(schluessel)).filter(e => !e.schluessel.startsWith("glossar:"));
    let html = "";
    if (vor.length) html += `<section><h3>Verbunden mit</h3><ul class="verbindungen">${vor.map(e => `<li>${verweisLink(e)}<br><small>${esc(e.art)}</small></li>`).join("")}</ul></section>`;
    if (rueck.length) html += `<section><h3>Erwähnt bei</h3><ul class="verbindungen">${rueck.map(e => `<li>${verweisLink(e)}</li>`).join("")}</ul></section>`;
    return html;
  }

  /* ==========================================================
     Seiten
     ========================================================== */
  function seiteTitel() {
    return {
      html: `
      <section class="titel" style="background-image:url('img/titel.webp'), url('img/titel.jpg')">
        <div class="titel-text"><h1>Der Raulsweg</h1><p>${esc(RW.titel.untertitel)}</p></div>
      </section>
      ${RW.titel.einleitung.replace('class="einleitung"', 'class="einleitung initiale"')}
      ${streckenband()}
      <h2>Wohin?</h2>
      <div class="wegweiser">
        <a href="#/ueberblick"><strong>Der Raulsweg</strong><span>Geschichte, Namen, Verlauf und Entfernungen</span></a>
        <a href="#/stationswesen"><strong>Das Stationswesen</strong><span>Kaiserpfalz, Relais, Herbergen und Papiere</span></a>
        <a href="#/ort/gareth"><strong>Die Reise beginnen</strong><span>Von Gareth Station für Station bis Perricum</span></a>
        <a href="#/maechte"><strong>Mächte am Weg</strong><span>Wer am Raulsweg verdienen will</span></a>
        <a href="#/reisen"><strong>Reisen</strong><span>Reisezeiten, Wetter und Etikette</span></a>
        <a href="#/spielleitung"><strong>Für Spielleitungen</strong><span>Eigene Geschichten am Raulsweg leiten</span></a>
        <a href="#/karten"><strong>Karten und Pläne</strong><span>Streckenkarte, Musterstation, Schauplätze</span></a>
        <a href="#/chronik"><strong>Chronik</strong><span>Was die Runde am Raulsweg erlebt hat</span></a>
        <a href="#/anhang"><strong>Glossar</strong><span>Begriffe, Kennzeichnung, Quellen</span></a>
      </div>`,
      eigene: []
    };
  }

  function seiteKapitel(k) {
    const kap = RW.kapitel[k];
    const html = kap.html
      .replace('<div id="streckenband-platz"></div>', streckenband())
      .replace('<div id="entfernungen-platz"></div>', entfernungstabelle())
      .replace('<div id="reisezeiten-platz"></div>', reisezeitentabelle())
      .replace('<div id="glossar-platz"></div>', glossarListe())
      .replace(/<h2>(.*?)<\/h2>/g, (_, t) => `<h2 id="${slug(ohneTags(t).trim())}">${t}</h2>`)
      .replace('class="einleitung"', 'class="einleitung initiale"');
    const abschnitte = [...kap.html.matchAll(/<h2>(.*?)<\/h2>/g)].map(m => ohneTags(m[1]).trim());
    const toc = abschnitte.length >= 3
      ? `<nav class="auf-seite" aria-label="Auf dieser Seite"><p>Auf dieser Seite</p><ul>${abschnitte.map(a => `<li><a href="#/${k}/${slug(a)}">${esc(a)}</a></li>`).join("")}</ul></nav>`
      : "";
    return { html: `<h1>${esc(kap.titel)}</h1>${toc}${html}`, eigene: ["kapitel:" + k] };
  }

  function seiteStationen() {
    const liste = stationen.map(s => `
      <li>
        <span class="station-siegel${s.kanon ? "" : " ergaenzt"}">${s.nr}</span>
        <div>
          <h3><a href="#/station/${s.id}">${esc(s.name)}</a></h3>
          <div class="zeile-marken"><span>${esc(s.gottheit)}</span>${kanonMarke(s)}${bauMarke(s)}<span class="leise">Meile ${meileText(s)}</span></div>
          <p>${esc(s.kurz)}</p>
        </div>
      </li>`).join("");
    return {
      html: `<h1>Die zwölf Stationen</h1>
      <p class="einleitung initiale">Von der Travia-Station vor den Toren Gareths bis zum Weinfest von Rabicum: zwölf Orte, zwölf Gottheiten, zwölf Bilder einer Reise.</p>
      ${streckenband()}
      <ol class="stationsliste">${liste}</ol>`,
      eigene: []
    };
  }

  // Wegpunkte auf der Etappe, die an einem Halt beginnt
  const naechsterHalt = h => RW.stationen.find(s => s.nr === h.nr + 1);
  const wegpunkteNach = id => wegpunkte.filter(w => w.nach === id).sort((a, b) => a.meile - b.meile);
  function wegNach(h) {
    const nach = naechsterHalt(h);
    if (!nach) return "";
    const liste = wegpunkteNach(nach.id);
    const kopf = `<h2>Auf dem Weg nach ${esc(nach.name)}</h2><p class="leise">${etappeText(nach)} Meilen bis zur nächsten Station.${liste.length ? "" : " Unterwegs nur Feld und Wald."}</p>`;
    return `<section class="weg-nach">${kopf}${liste.length ? `<ul class="weg-liste">${liste.map(w => `
      <li><span class="weg-meile">Meile ${w.meile}</span><div><a class="weg-name" href="#/unterwegs/${w.id}">${esc(w.name)}</a><span class="weg-art">${esc(w.art)}</span><p>${esc(w.kurz)}</p></div></li>`).join("")}</ul>` : ""}</section>`;
  }

  function seiteUnterwegs() {
    const etappen = RW.stationen.slice(0, -1).map(h => ({ von: h, nach: naechsterHalt(h) }));
    const toc = `<nav class="auf-seite" aria-label="Auf dieser Seite"><p>Etappen</p><ul>${etappen.map(e => `<li><a href="#/unterwegs/etappe-${e.nach.id}">${esc(e.von.name)} → ${esc(e.nach.name)}</a></li>`).join("")}</ul></nav>`;
    const inhalt = etappen.map(e => {
      const liste = wegpunkteNach(e.nach.id);
      return `<section class="etappe" id="etappe-${e.nach.id}">
        <h2><a href="${linkZu(e.von)}">${esc(e.von.name)}</a> → <a href="${linkZu(e.nach)}">${esc(e.nach.name)}</a></h2>
        <p class="etappe-zeile">Meile ${meileText(e.von)} bis ${meileText(e.nach)} · ${etappeText(e.nach)} Meilen</p>
        ${liste.map(w => `<section class="wegpunkt" id="${w.id}">
          <h3>${esc(w.name)}</h3>
          <p class="weg-art">${esc(w.art)}, Meile ${w.meile} ${w.kanon ? `<span class="marke-kanon">Kanon</span>` : `<span class="marke-eigen">Ergänzung</span>`}</p>
          <p>${esc(w.kurz)}</p>
          <p class="weg-szene"><strong>Am Weg:</strong> ${esc(w.szene)}</p>
        </section>`).join("") || `<p class="leise">Auf dieser kurzen Etappe gibt es keinen eigenen Halt.</p>`}
      </section>`;
    }).join("");
    return {
      html: `<h1>Zwischen den Stationen</h1>
      <p class="einleitung initiale">Zwischen zwei Stationen liegt ein Tag auf der Straße, und der ist selten leer. Dörfer, Brücken, Schenken und Baustellen säumen den Raulsweg.</p>
      <p>Die Orte stammen überwiegend aus der Karte von avesmaps.de; was dort geschieht, ist Erfindung dieses Bandes. Zu jedem Ort gehört eine kurze Szene, die sich unterwegs einstreuen lässt.</p>
      ${toc}${inhalt}`,
      eigene: []
    };
  }

  function seiteStation(id) {
    const i = stationen.findIndex(s => s.id === id);
    if (i < 0) return seiteFehlt();
    const s = stationen[i];
    const vor = i > 0 ? stationen[i - 1] : orte[0];
    const nach = i < stationen.length - 1 ? stationen[i + 1] : orte[1];
    const haltName = h => `${h.typ === "stadt" ? "" : h.nr + " "}${esc(h.name)}`;
    return {
      html: `
      <div class="station-kopf">
        <span class="station-siegel${s.kanon ? "" : " ergaenzt"}" aria-hidden="true">${s.nr}</span>
        <div><h1>${esc(s.name)}</h1><p class="station-unterzeile">Station ${s.nr} des Raulswegs, geweiht ${esc(s.gottheit)}</p></div>
      </div>
      ${stationsbild(s)}
      <div class="station-raster">
        <div>
          <p class="einleitung initiale">${esc(s.kurz)}</p>
          ${absaetze(s.beschreibung)}
          <div class="vorlese"><p class="vorlese-titel">Zum Vorlesen</p>${absaetze(s.vorlesetext)}</div>
          <h2>Gerüchte am Herdfeuer</h2>
          <ul class="geruechte">${(s.geruechte || []).map(g => `<li>${esc(g)}</li>`).join("")}</ul>
          <h2>Was hier brodelt</h2>
          <p>${esc(s.konflikt)}</p>
          ${s.meister ? `<div class="meister"><p class="meister-titel">Meisterinformationen</p><p>${esc(s.meister.hintergrund)}</p></div>` : ""}
          ${chronikBezug("station:" + s.id)}
          ${kartenAn(s.id).map(c => `<section class="karte-verweis"><h2>Plan: ${esc(c.titel)}</h2>
            <a href="#/karte/${c.id}"><img src="${c.datei}" alt="${esc(c.art)}: ${esc(c.titel)}" loading="lazy"></a>
            <p><a href="#/karte/${c.id}">${esc(c.art)} mit Legende</a></p></section>`).join("")}
          ${tempelAn(s.id) ? tempelKasten(tempelAn(s.id)) : ""}
          ${figurenAn(s.id).length ? `<h2>Wer hier anzutreffen ist</h2>${figurKarten(figurenAn(s.id))}` : ""}
          ${wegNach(s)}
        </div>
        <aside class="seitenleiste">
          <section>
            <h3>Steckbrief</h3>
            <dl>
              <dt>Gottheit</dt><dd>${esc(s.gottheit)}</dd>
              <dt>Emblem</dt><dd>${esc(s.emblem)}</dd>
              ${tempelAn(s.id) ? `<dt>Tempel</dt><dd><a href="#/tempel/${tempelAn(s.id).id}">${esc(tempelAn(s.id).name)}</a></dd>` : ""}
              <dt>Ab Gareth</dt><dd>Meile ${meileText(s)}</dd>
              <dt>Etappe</dt><dd>${etappeText(s)} Meilen von <a href="${linkZu(vor)}">${esc(vor.name)}</a></dd>
              <dt>Bauzustand</dt><dd>${bauMarke(s)}</dd>
              <dt>Herkunft</dt><dd>${kanonMarke(s)}</dd>
              <dt>Stimmung</dt><dd>${esc(s.jahreszeit)}</dd>
            </dl>
          </section>
          ${verbindungsBlock("station:" + s.id)}
        </aside>
      </div>
      ${streckenband(s.id, true)}
      <nav class="blaettern" aria-label="Weiterreisen">
        <a href="${linkZu(vor)}">← ${haltName(vor)}</a>
        <a href="${linkZu(nach)}">${haltName(nach)} →</a>
      </nav>`,
      eigene: ["station:" + s.id]
    };
  }

  function seiteOrt(id) {
    const o = orte.find(x => x.id === id);
    if (!o) return seiteFehlt();
    const erste = o.nr === 0;
    const nachbar = erste ? stationen[0] : stationen[stationen.length - 1];
    return {
      html: `
      <div class="station-kopf">
        <span class="station-siegel stadt" aria-hidden="true">${o.name[0]}</span>
        <div><h1>${esc(o.name)}</h1><p class="station-unterzeile">${erste ? "Ausgangspunkt" : "Ziel"} des Raulswegs, Meile ${meileText(o)}</p></div>
      </div>
      <div class="station-raster">
        <div>
          <p class="einleitung initiale">${esc(o.kurz)}</p>
          ${absaetze(o.beschreibung)}
          <p class="leise">Die Stadt selbst ist in offiziellen Regionalbänden ausführlich beschrieben. Dieser Band betrachtet sie nur als Anfang und Ende der Straße.</p>
          ${wegNach(o)}
          ${chronikBezug("ort:" + o.id)}
        </div>
        <aside class="seitenleiste">
          <section><h3>${erste ? "Erster" : "Letzter"} Halt</h3><p><a href="#/station/${nachbar.id}">${nachbar.nr} ${esc(nachbar.name)}</a>, ${erste ? nachbar.etappe : o.etappe} Meilen</p></section>
          ${verbindungsBlock("ort:" + o.id)}
        </aside>
      </div>
      ${streckenband(o.id, true)}
      <nav class="blaettern" aria-label="Weiterreisen">
        ${erste ? `<a href="#/stationen">Alle Stationen</a><a href="#/station/${nachbar.id}">${nachbar.nr} ${esc(nachbar.name)} →</a>`
                : `<a href="#/station/${nachbar.id}">← ${nachbar.nr} ${esc(nachbar.name)}</a><a href="#/maechte">Mächte am Weg →</a>`}
      </nav>`,
      eigene: ["ort:" + o.id]
    };
  }

  function seiteMaechte() {
    const liste = RW.maechte.map(m => {
      const rv = sortiert(rueckverweise.get("macht:" + m.id)).filter(e => !e.schluessel.startsWith("glossar:"));
      return `
      <section class="macht" id="${m.id}">
        <h2>${esc(m.name)}</h2>
        <p class="macht-sitz">${esc(m.sitz)} ${m.kanon ? `<span class="marke-kanon">Kanon</span>` : `<span class="marke-eigen">Ergänzung</span>`}</p>
        ${absaetze(m.beschreibung)}
        <p><strong>Was sie wollen:</strong> ${esc(m.will)}</p>
        <p><strong>Wo es reibt:</strong> ${esc(m.konflikt)}</p>
        <div class="meister"><p class="meister-titel">Meisterinformationen</p><p>${esc(m.meister)}</p></div>
        ${figurenVon(m.id).length ? `<p class="leise">Figuren:</p><ul class="verbindungen">${figurenVon(m.id).map(f => `<li><a href="#/figur/${f.id}">${esc(f.name)}</a></li>`).join("")}</ul>` : ""}
        ${rv.length ? `<p class="leise">Taucht auf bei:</p><ul class="verbindungen">${rv.map(e => `<li>${verweisLink(e)}</li>`).join("")}</ul>` : ""}
        ${chronikBezug("macht:" + m.id)}
      </section>`;
    }).join("");
    const toc = `<nav class="auf-seite" aria-label="Auf dieser Seite"><p>Auf dieser Seite</p><ul>${RW.maechte.map(m => `<li><a href="#/maechte/${m.id}">${esc(m.name)}</a></li>`).join("")}</ul></nav>`;
    return {
      html: `<h1>Mächte am Weg</h1>
      <p class="einleitung initiale">Der Raulsweg gehört der Kaiserin. Verdienen wollen an ihm viele.</p>
      <p>Keine dieser Parteien ist einfach gut oder böse, und keine handelt allein. Unter jeder Macht steht, an welchen Stationen sie auftaucht. Ausführliche Profile, Figuren und ein Beziehungsnetz folgen in einer späteren Ausbaustufe.</p>
      ${toc}${liste}`,
      eigene: []
    };
  }

  function seiteFiguren() {
    const gruppen = [{ titel: "Unterwegs auf der ganzen Strecke", id: "unterwegs", liste: figurenAn("unterwegs") }]
      .concat(stationen.map(s => ({ titel: `${s.nr} ${s.name}`, id: s.id, href: `#/station/${s.id}`, liste: figurenAn(s.id) })))
      .filter(g => g.liste.length);
    const toc = `<nav class="auf-seite" aria-label="Auf dieser Seite"><p>Auf dieser Seite</p><ul>${gruppen.map(g => `<li><a href="#/figuren/${g.id}">${esc(g.titel)}</a></li>`).join("")}</ul></nav>`;
    return {
      html: `<h1>Figuren</h1>
      <p class="einleitung initiale">Wirte und Wachen, Bauleute und Botinnen, Geweihte und Geschäftemacher: die Menschen, denen Reisende auf dem Raulsweg begegnen.</p>
      <p>Jede Figur hat ein Motiv und drei mögliche Geheimnisse. Die Geheimnisse stehen in den Meisterinformationen; was in einer Geschichte enthüllt wurde, hält die <a href="#/chronik">Chronik</a> fest. Spielwerte folgen in einer späteren Stufe.</p>
      ${toc}
      ${gruppen.map(g => `<section id="${g.id}"><h2>${g.href ? `<a href="${g.href}">${esc(g.titel)}</a>` : esc(g.titel)}</h2>${figurKarten(g.liste)}</section>`).join("")}`,
      eigene: []
    };
  }

  function seiteFigur(id) {
    const i = figuren.findIndex(f => f.id === id);
    if (i < 0) return seiteFehlt();
    const f = figuren[i];
    const vor = figuren[(i - 1 + figuren.length) % figuren.length], nach = figuren[(i + 1) % figuren.length];
    const st = RW.stationen.find(s => s.id === f.station);
    const ortHtml = st ? `<a href="${linkZu(st)}">${st.typ === "stadt" ? "" : st.nr + " "}${esc(st.name)}</a>` : "unterwegs auf der ganzen Strecke";
    const maechte = (f.maechte || []).map(mid => RW.maechte.find(m => m.id === mid)).filter(Boolean);
    const andere = figurenAn(f.station).filter(x => x.id !== f.id);
    return {
      html: `
      <div class="figur-kopf">
        ${portraet(f)}
        <div><h1>${esc(f.name)}</h1><p class="station-unterzeile">${esc(f.rolle)}</p></div>
      </div>
      <div class="station-raster">
        <div>
          <p class="einleitung">${esc(f.kurz)}</p>
          <h3>Erscheinung</h3><p>${esc(f.aussehen)}</p>
          <h3>Auftreten</h3><p>${esc(f.auftreten)}</p>
          <h3>Antrieb</h3><p>${esc(f.motiv)}</p>
          <blockquote class="zitat"><p>»${esc(f.zitat)}«</p></blockquote>
          <div class="meister"><p class="meister-titel">Meisterinformationen: Mögliche Geheimnisse</p>${moeglichkeitenListe(f.geheimnisse, "figur:" + f.id)}<p class="moeglich-hinweis">Wähle eines, verbinde sie oder erfinde ein eigenes.</p></div>
          ${chronikBezug("figur:" + f.id)}
        </div>
        <aside class="seitenleiste">
          <section>
            <h3>Steckbrief</h3>
            <dl>
              <dt>Rolle</dt><dd>${esc(f.rolle)}</dd>
              <dt>Anzutreffen</dt><dd>${ortHtml}</dd>
              ${maechte.length ? `<dt>Gehört zu</dt><dd>${maechte.map(m => `<a href="#/maechte/${m.id}">${esc(m.name)}</a>`).join("<br>")}</dd>` : ""}
            </dl>
          </section>
          ${andere.length ? `<section><h3>Ebenfalls hier</h3><ul class="verbindungen">${andere.map(x => `<li><a href="#/figur/${x.id}">${esc(x.name)}</a><br><small>${esc(x.rolle)}</small></li>`).join("")}</ul></section>` : ""}
          ${verbindungsBlock("figur:" + f.id)}
        </aside>
      </div>
      <nav class="blaettern" aria-label="Weitere Figuren">
        <a href="#/figur/${vor.id}">← ${esc(vor.name)}</a>
        <a href="#/figur/${nach.id}">${esc(nach.name)} →</a>
      </nav>`,
      eigene: ["figur:" + f.id]
    };
  }

  function seiteTempel() {
    const zeilen = tempel.map(t => {
      const st = RW.stationen.find(s => s.id === t.station);
      return `<tr><td class="zahl">${st.nr}</td><td><a href="#/station/${st.id}">${esc(st.name)}</a></td><td>${esc(t.gottheit)}</td><td><a href="#/tempel/${t.id}">${esc(t.name)}</a></td><td>${esc(t.art)}</td><td>${bauMarke({ status: t.zustand })}</td></tr>`;
    }).join("");
    const eintraege = tempel.map(t => {
      const st = RW.stationen.find(s => s.id === t.station);
      return `
      <section class="tempel-eintrag" id="${t.id}">
        <h2>${esc(t.name)}</h2>
        <p class="tempel-zeile">${esc(tempelArt(t))} in <a href="#/station/${st.id}">${st.nr} ${esc(st.name)}</a> ${bauMarke({ status: t.zustand })}</p>
        ${absaetze(t.beschreibung)}
        <dl class="tempel-daten">
          <dt>Brauch</dt><dd>${esc(t.brauch)}</dd>
          <dt>Stempel</dt><dd>${esc(t.stempel)}</dd>
          <dt>Dienste</dt><dd>${esc(t.dienste)}</dd>
          <dt>Gehütet von</dt><dd>${esc(t.geweihte)}</dd>
          <dt>Was schwelt</dt><dd>${esc(t.spannung)}</dd>
        </dl>
        <div class="meister"><p class="meister-titel">Meisterinformationen</p><p>${esc(t.meister)}</p>${t.moeglichkeiten ? `<p class="moeglich-titel">Mögliche Wahrheiten</p>${moeglichkeitenListe(t.moeglichkeiten, "tempel:" + t.id)}` : ""}</div>
        ${chronikBezug("tempel:" + t.id)}
      </section>`;
    }).join("");
    return {
      html: `<h1>Die zwölf Tempel</h1>
      <p class="einleitung initiale">Jede Station des Raulswegs ist einer der Zwölfgötter geweiht. Manche Weihestätte ist älter als die Straße, andere sind erst halb gebaut, und eine ist nur ein Herdfeuer.</p>
      <p>Zu jedem Tempel gehört ein Brauch, den Reisende pflegen, und ein Stationsstempel, der nicht einfach ausgegeben wird, sondern verdient sein will. Wer alle zwölf sammelt, hat den Raulsweg wirklich bereist.</p>
      <div class="tabelle-huelle breit"><table>
        <thead><tr><th class="zahl">Nr.</th><th>Station</th><th>Gottheit</th><th>Weihestätte</th><th>Art</th><th>Zustand</th></tr></thead>
        <tbody>${zeilen}</tbody></table></div>
      ${eintraege}`,
      eigene: []
    };
  }

  const CHRONIK_VORLAGE = `{
  id: "kurzer-name-der-geschichte",
  titel: "Name der Geschichte",
  spielleitung: "Wer geleitet hat",
  gespielt: "TT.MM.JJJJ",
  aventurisch: "",
  orte: ["natterbruecke"],
  figuren: ["bruna-lehmkuhl", "gesa-natterer"],
  zusammenfassung: [
    "Was die Helden erlebt haben, in ein paar Sätzen."
  ],
  enthuellt: [
    { ziel: "figur:bruna-lehmkuhl", variante: "B", text: "Was am Tisch aufgedeckt wurde." }
  ],
  veraenderungen: [
    { ziel: "station:natterbruecke", text: "Was jetzt anders ist." }
  ],
  neu: ["Neue Figur oder neuer Ort, kurz beschrieben"],
  offen: ["Loser Faden für spätere Geschichten"],
  meister: ""
},`;

  function seiteChronik() {
    const liste = chronik.slice().reverse().map(c => {
      const orteL = (c.orte || []).map(id => zielLink(haltSchluessel(id)));
      const figurenL = (c.figuren || []).map(id => zielLink("figur:" + id));
      return `
      <section class="chronik-eintrag" id="${esc(c.id)}">
        <h2>${esc(c.titel)}</h2>
        <p class="chronik-zeile">${chronikZeile(c)}</p>
        ${orteL.length || figurenL.length ? `<dl class="tempel-daten">
          ${orteL.length ? `<dt>Wo</dt><dd>${orteL.join(", ")}</dd>` : ""}
          ${figurenL.length ? `<dt>Wer</dt><dd>${figurenL.join(", ")}</dd>` : ""}
        </dl>` : ""}
        ${absaetze(c.zusammenfassung)}
        ${(c.enthuellt || []).length ? `<h3>Enthüllt</h3><ul>${c.enthuellt.map(x => `<li><strong>${zielLink(x.ziel)}${x.variante ? ` (Möglichkeit ${esc(x.variante.toUpperCase())})` : ""}:</strong> ${esc(x.text)}</li>`).join("")}</ul>` : ""}
        ${(c.veraenderungen || []).length ? `<h3>Was sich verändert hat</h3><ul>${c.veraenderungen.map(x => `<li><strong>${zielLink(x.ziel)}:</strong> ${esc(x.text)}</li>`).join("")}</ul>` : ""}
        ${(c.neu || []).length ? `<h3>Neu am Weg</h3><ul>${c.neu.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
        ${(c.offen || []).length ? `<h3>Lose Fäden</h3><ul>${c.offen.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
        ${c.meister ? `<div class="meister"><p class="meister-titel">Meisterinformationen</p><p>${esc(c.meister)}</p></div>` : ""}
      </section>`;
    }).join("");
    const toc = chronik.length > 2 ? `<nav class="auf-seite" aria-label="Auf dieser Seite"><p>Geschichten</p><ul>${chronik.slice().reverse().map(c => `<li><a href="#/chronik/${esc(c.id)}">${esc(c.titel)}</a></li>`).join("")}</ul></nav>` : "";
    return {
      html: `<h1>Chronik des Raulswegs</h1>
      <p class="einleitung initiale">Was die Runde am Raulsweg erlebt hat. Jede gespielte Geschichte hinterlässt Spuren, und was hier steht, gilt für alle, die danach leiten.</p>
      <p>Die neueste Geschichte steht oben. Stationen, Figuren, Tempel und Mächte verweisen auf die Geschichten, in denen sie vorkamen. Wurde ein Geheimnis enthüllt, ist die geltende Möglichkeit in den Meisterinformationen markiert.</p>
      ${toc}
      ${liste || `<p class="chronik-leer">Noch ist keine Geschichte eingetragen. Die erste schreibt ihr.</p>`}
      <section class="chronik-vorlage" id="vorlage">
        <h2>Eine Geschichte eintragen</h2>
        <p>Nach dem Spielabend die Vorlage ausfüllen und an die Person schicken, die den Band pflegt. Sie landet in <code>data/chronik.js</code>. Die Kennungen für Orte und Figuren stehen in der Adresszeile ihrer Seiten, etwa <code>#/figur/<strong>bruna-lehmkuhl</strong></code>.</p>
        <p>Was nicht zutrifft, einfach leer lassen. <em>Enthüllt</em> ist nur, was am Tisch wirklich aufgedeckt wurde; was die Spielleitung bloß für sich entschieden hat, gehört unter <em>meister</em>.</p>
        <div class="vorlage-kopf"><span>Vorlage</span><button class="knopf" type="button" id="vorlage-kopieren">Kopieren</button></div>
        <pre class="vorlage"><code>${esc(CHRONIK_VORLAGE)}</code></pre>
      </section>`,
      eigene: []
    };
  }

  function kartenLink(c) {
    const st = RW.stationen.find(s => s.id === c.station);
    return st ? `${c.art}, <a href="#/station/${st.id}">${st.nr} ${esc(st.name)}</a>` : esc(c.art);
  }

  function seiteKarten() {
    return {
      html: `<h1>Karten und Pläne</h1>
      <p class="einleitung initiale">Die Strecke im Überblick, eine Station nach dem Edikt und die Orte, an denen es am ehesten zu Ärger kommt.</p>
      <p>Alle Pläne sind schwarz-weiß gezeichnet und lassen sich drucken. Die Zahlen in den Plänen erklärt die Legende auf der jeweiligen Seite. Ein Klick auf das Bild öffnet es in voller Größe.</p>
      <ul class="karten-raster">${karten.map(c => `
        <li><a class="karte-karte" href="#/karte/${c.id}"><img src="${c.datei}" alt="" loading="lazy"><strong>${esc(c.titel)}</strong></a>
        <span>${kartenLink(c)}</span></li>`).join("")}</ul>`,
      eigene: []
    };
  }

  function seiteKarte(id) {
    const i = karten.findIndex(c => c.id === id);
    if (i < 0) return seiteFehlt();
    const c = karten[i];
    const vor = karten[(i - 1 + karten.length) % karten.length], nach = karten[(i + 1) % karten.length];
    const legende = (c.legende || []).length ? `<h2>Legende</h2><ol class="legende">${c.legende.map(([n, name, text]) =>
      `<li><span class="legende-nr">${n}</span><div><strong>${esc(name)}</strong>${text ? `. ${esc(text)}` : ""}</div></li>`).join("")}</ol>` : "";
    return {
      html: `<h1>${esc(c.titel)}</h1>
      <p class="station-unterzeile">${kartenLink(c)}</p>
      <figure class="karte-gross"><a href="${c.datei}" target="_blank" rel="noopener" title="In voller Größe öffnen"><img src="${c.datei}" alt="${esc(c.art)}: ${esc(c.titel)}"></a>
        <figcaption>${esc(c.massstab || "")} · <a href="${c.datei}" target="_blank" rel="noopener">in voller Größe öffnen</a></figcaption></figure>
      <p class="einleitung">${esc(c.kurz)}</p>
      ${legende}
      <nav class="blaettern" aria-label="Weitere Karten">
        <a href="#/karte/${vor.id}">← ${esc(vor.titel)}</a>
        <a href="#/karte/${nach.id}">${esc(nach.titel)} →</a>
      </nav>`,
      eigene: []
    };
  }

  function seiteBauplan() {
    const liste = RW.ausbaustufen.map(a => `
      <li class="${a.erledigt ? "erledigt" : ""}">
        <span class="stufe-nr">${a.nr}</span>
        <div><h3>${esc(a.titel)}${a.erledigt ? " (vorhanden)" : ""}</h3><p>${esc(a.text)}</p></div>
      </li>`).join("");
    return {
      html: `<h1>Bauplan des Bandes</h1>
      <p class="einleitung initiale">Wie der Raulsweg selbst ist auch dieser Band eine Baustelle. Diese Stufen sind geplant.</p>
      <ol class="stufen">${liste}</ol>`,
      eigene: []
    };
  }

  function seiteFehlt() {
    return { html: `<h1>Diese Seite gibt es nicht</h1><p>Der Weg endet hier. Zurück zur <a href="#/">Titelseite</a> oder zur <a href="#/stationen">Übersicht der Stationen</a>.</p>`, eigene: [] };
  }

  /* ==========================================================
     Router
     ========================================================== */
  let letzteSeite = null;
  function zeigen() {
    const route = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    const [teil, id] = route.split("/");
    const mitAnker = id && !["station", "ort", "figur", "karte"].includes(teil);
    const seitenSchluessel = mitAnker ? teil : route;

    if (seitenSchluessel !== letzteSeite) {
      let seite;
      if (teil === "") seite = seiteTitel();
      else if (KAPITEL.includes(teil)) seite = seiteKapitel(teil);
      else if (teil === "stationen") seite = seiteStationen();
      else if (teil === "station") seite = seiteStation(id);
      else if (teil === "ort") seite = seiteOrt(id);
      else if (teil === "maechte") seite = seiteMaechte();
      else if (teil === "figuren") seite = seiteFiguren();
      else if (teil === "figur") seite = seiteFigur(id);
      else if (teil === "tempel") seite = seiteTempel();
      else if (teil === "unterwegs") seite = seiteUnterwegs();
      else if (teil === "chronik") seite = seiteChronik();
      else if (teil === "karten") seite = seiteKarten();
      else if (teil === "karte") seite = seiteKarte(id);
      else if (teil === "bauplan") seite = seiteBauplan();
      else seite = seiteFehlt();
      main.innerHTML = seite.html;
      if (teil === "maechte" || teil === "tempel" || teil === "chronik" || teil === "unterwegs") {
        // Jeder Eintrag verweist nicht auf sich selbst; Querverweise je Abschnitt neu zählen
        if (teil === "maechte") main.querySelectorAll(".macht").forEach(sek => verlinken(sek, ["macht:" + sek.id]));
        else if (teil === "tempel") main.querySelectorAll(".tempel-eintrag").forEach(sek => verlinken(sek, ["tempel:" + sek.id]));
        else if (teil === "unterwegs") main.querySelectorAll(".wegpunkt").forEach(sek => verlinken(sek, ["wegpunkt:" + sek.id]));
        else main.querySelectorAll(".chronik-eintrag").forEach(sek => verlinken(sek, []));
      } else verlinken(main, seite.eigene);
      bilderAbsichern();
      const kopieren = document.getElementById("vorlage-kopieren");
      if (kopieren) kopieren.addEventListener("click", () => {
        const fertig = t => { kopieren.textContent = t; setTimeout(() => { kopieren.textContent = "Kopieren"; }, 1800); };
        try { navigator.clipboard.writeText(CHRONIK_VORLAGE).then(() => fertig("Kopiert"), () => fertig("Bitte markieren")); }
        catch (e) { fertig("Bitte markieren"); }
      });
      letzteSeite = seitenSchluessel;
      document.title = teil ? `${main.querySelector("h1")?.textContent} – Der Raulsweg` : "Der Raulsweg – Quellenband";
    }
    navMarkieren(route);
    vorschauWeg();

    const ziel = mitAnker ? document.getElementById(id) : null;
    if (ziel) {
      ziel.scrollIntoView({ block: "start" });
      ziel.classList.remove("ziel-markiert"); void ziel.offsetWidth; ziel.classList.add("ziel-markiert");
    } else {
      window.scrollTo(0, 0);
      if (teil) main.focus({ preventScroll: true });
    }
  }

  baueNavigation();
  window.addEventListener("hashchange", zeigen);
  zeigen();
})();
