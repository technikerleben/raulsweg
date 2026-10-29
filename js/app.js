/* ==========================================================
   Der Raulsweg – Darstellung, Navigation, Querverweise
   Hash-Routen:
     #/                     Titelseite
     #/ueberblick[/abschnitt]   #/stationswesen[/…]   #/reisen[/…]
     #/anhang[/begriff]     Glossar-Begriffe sind Anker
     #/spielleitung[/…]     Für Spielleitungen
     #/stationen            Übersicht        #/station/<id>[/abschnitt]
     #/ort/<id>[/abschnitt] Gareth, Perricum
     #/unterwegs[/<id>]     Wegpunkte zwischen den Stationen (Anker: Wegpunkt oder etappe-<station>)
     #/maechte              Mächte am Weg mit Beziehungsnetz   #/macht/<id>   Profil
     #/figuren[/<station>]  Übersicht        #/figur/<id>
     #/tempel[/<id>]        Die zwölf Tempel
     #/dokumente[/<id>]     Edikt, Briefe, Verlautbarungen
     #/karten               Karten und Pläne  #/karte/<id>
     #/chronik[/<id>]       Chronik der gespielten Geschichten
     #/bauplan              Ausbaustufen
   Daten: data/*.js (window.RW), Reihenfolge der Skripte in index.html
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
    begriffe: m.begriffe || [], href: `#/macht/${m.id}`, kurz: m.haltung || kuerzen((m.beschreibung || [])[0] || ""),
    text: [...(m.beschreibung || []), m.will, m.konflikt, m.vertreter, m.hebel].join(" ")
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
  // Typ der Wegpunkte: fehlt er, gilt Siedlung, bei Brücken, Gasthäusern usw. Bauwerk
  const WEG_TYP = { siedlung: "Dörfer und Höfe", bauwerk: "Bauwerke", landmarke: "Felsen und Landmarken", natur: "Bäume und Wiesen", abseits: "Abseits der Straße" };
  const BAU_ARTEN = ["Adelssitz", "Brücke", "Straßenbaustelle", "Gasthaus", "Kontrollstelle"];
  wegpunkte.forEach(w => { if (!w.typ) w.typ = BAU_ARTEN.includes(w.art) ? "bauwerk" : "siedlung"; });
  const haltName = id => (RW.stationen.find(s => s.id === id) || {}).name || id;
  wegpunkte.forEach(w => eintragen({
    schluessel: "wegpunkt:" + w.id, art: `${w.art} auf dem Weg nach ${haltName(w.nach)}`, name: w.name,
    begriffe: [w.name, ...(w.begriffe || []), ...(w.name.includes("„") ? [w.name.replace(/^.*„|“.*$/g, "")] : []), ...(/^(Der|Die|Das) /.test(w.name) ? [w.name.replace(/^(Der|Die|Das) /, "")] : [])],
    href: `#/unterwegs/${w.id}`, kurz: w.kurz, text: [w.kurz, ...(w.beschreibung || []), w.szene].join(" ")
  }));
  const dokumente = RW.dokumente || [];
  dokumente.forEach(d => eintragen({
    schluessel: "dokument:" + d.id, art: d.art, name: d.titel, begriffe: [d.titel, ...(d.begriffe || [])],
    href: `#/dokumente/${d.id}`, kurz: d.kurz, text: [d.kurz, ohneTags(d.text)].join(" ")
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

  const reihenfolge = { ort: 0, station: 1, wegpunkt: 2, tempel: 3, figur: 4, macht: 5, dokument: 6, kapitel: 7, glossar: 8 };
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
    return `<section class="chronik-bezug" id="chronik"><h2>In der Chronik</h2><ul>${eintraege.map(c => {
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
  const NICHT_VERLINKEN = "a, h1, h2, h3, .band-huelle, .station-kopf, .auf-seite, .wegweiser, figcaption, th, .glossar dt, .zeile-marken, .seitenleiste, .macht-sitz, .titel, .figur-rolle, .station-unterzeile, .figur-name, .chronik-zeile, .chronik-titel, pre, code, .reisetag, .namen-werkzeug, .weg-filter, .weg-abseits, .namen-liste, .w-zahl, .netz, .bez-art, .macht-name, .weg-meile, .weg-art, .weg-name, .etappe-zeile, .dok-blatt, .dok-herkunft";
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
        <li><a href="#/reisen" data-route="reisen">Reisen auf dem Raulsweg</a></li>
      </ul>
      <p class="nav-gruppe">Die Strecke</p>
      <ul>
        <li><a href="#/ort/gareth" data-route="ort/gareth"><span class="nav-nr">G</span><span>Gareth</span></a></li>
        ${stationLinks}
        <li><a href="#/ort/perricum" data-route="ort/perricum"><span class="nav-nr">P</span><span>Perricum</span></a></li>
        <li><a href="#/stationen" data-route="stationen">Alle Stationen im Überblick</a></li>
        <li><a href="#/unterwegs" data-route="unterwegs">Zwischen den Stationen</a></li>
        <li><a href="#/karten" data-route="karten">Karten und Pläne</a></li>
      </ul>
      <p class="nav-gruppe">Hintergrund</p>
      <ul>
        <li><a href="#/maechte" data-route="maechte">Mächte am Weg</a></li>
        <li><a href="#/figuren" data-route="figuren">Figuren</a></li>
        <li><a href="#/tempel" data-route="tempel">Die zwölf Tempel</a></li>
        <li><a href="#/dokumente" data-route="dokumente">Dokumente</a></li>
      </ul>
      <p class="nav-gruppe">Für die Runde</p>
      <ul>
        <li><a href="#/spielleitung" data-route="spielleitung">Für Spielleitungen</a></li>
        <li><a href="#/spielhilfen" data-route="spielhilfen">Spielhilfen</a></li>
        <li><a href="#/chronik" data-route="chronik">Chronik${chronik.length ? ` <span class="nav-zahl">${chronik.length}</span>` : ""}</a></li>
        <li><a href="#/anhang/zum-mitnehmen" data-route="anhang/zum-mitnehmen">Zum Mitnehmen</a></li>
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
    const basis = teile[0] === "figur" ? "figuren" : teile[0] === "karte" ? "karten" : teile[0] === "macht" ? "maechte"
      : ["station", "ort"].includes(teile[0]) || route === "anhang/zum-mitnehmen" ? teile.slice(0, 2).join("/") : teile[0];
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
    return `<dl class="glossar">${RW.glossar.slice().sort((a, b) => a.name.localeCompare(b.name, "de")).map(g => {
      const rv = sortiert(rueckverweise.get("glossar:" + g.id)).filter(e => !e.schluessel.startsWith("glossar:") && e.schluessel !== "kapitel:anhang");
      const mehr = g.mehr ? ` <a href="${g.mehr[0]}">${esc(g.mehr[1])}</a>` : "";
      return `<dt id="${g.id}">${esc(g.name)}</dt><dd>${esc(g.text)}${mehr}${rv.length ? `<br><span class="leise">Erwähnt bei ${rv.map(verweisLink).join(", ")}</span>` : ""}</dd>`;
    }).join("")}</dl>`;
  }

  function stationsbild(s) {
    return `<figure class="station-bild">
        <img data-basis="img/stationen/${s.bild}" data-versuch="0" src="img/stationen/${s.bild}.${BILD_ENDUNGEN[0]}" alt="${esc(s.name)}: ${esc(s.jahreszeit || "")}" loading="lazy">
        <figcaption><span class="bild-art">Stimmungsbild</span> Station ${esc(s.nr)}, ${esc(s.name)}: ${esc(s.jahreszeit || "")}</figcaption>
      </figure>`;
  }
  // Gebäudebilder zu den Plänen: img/gebaeude/<karten-id>.webp, <karten-id>-2.webp … (auch .jpg/.png)
  const gebaeudeBlock = c => `<section class="gebaeude-bilder" data-karte="${c.id}" hidden>
      <h3>Ansichten</h3><p class="leise">Die Bilder ergänzen den Plan. Sie zeigen, wie der Ort wirken kann, und müssen dem Plan nicht in allen Einzelheiten entsprechen.</p><div class="gebaeude-raster"></div></section>`;
  const bildDa = src => new Promise(ok => { const i = new Image(); i.onload = () => ok(true); i.onerror = () => ok(false); i.src = src; });
  async function gebaeudeLaden() {
    for (const block of main.querySelectorAll(".gebaeude-bilder[data-karte]")) {
      const id = block.dataset.karte, raster = block.querySelector(".gebaeude-raster");
      for (let n = 1; n <= 12; n++) {
        const basis = `img/gebaeude/${id}${n === 1 ? "" : "-" + n}`;
        let gefunden = null;
        for (const endung of BILD_ENDUNGEN) { if (await bildDa(`${basis}.${endung}`)) { gefunden = `${basis}.${endung}`; break; } }
        if (!gefunden || !block.isConnected) break;
        raster.insertAdjacentHTML("beforeend", `<a href="${gefunden}" target="_blank" rel="noopener"><img src="${gefunden}" alt="Ansicht ${n} zum Plan" loading="lazy"></a>`);
        block.hidden = false;
      }
    }
  }

  function bilderAbsichern() {
    main.querySelectorAll("img[data-basis]").forEach(img => {
      if (img.dataset.ausblenden !== undefined) {
        const zeigen = () => { const f = img.closest(img.dataset.ausblenden || "figure"); if (f) f.hidden = false; };
        if (img.complete && img.naturalWidth) zeigen(); else img.addEventListener("load", zeigen);
      }
      img.addEventListener("error", () => {
        const n = Number(img.dataset.versuch) + 1;
        if (n < BILD_ENDUNGEN.length) { img.dataset.versuch = n; img.src = `${img.dataset.basis}.${BILD_ENDUNGEN[n]}`; }
        else {
          const platz = document.createElement("div");
          if (img.dataset.ausblenden !== undefined) { (img.closest(img.dataset.ausblenden || "figure") || img).remove(); return; }
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

  // Tempelbild: img/tempel/<tempel-id>.webp, verschwindet still, solange es fehlt
  const tempelBild = (t, klein) => `<figure class="tempel-bild${klein ? " klein" : ""}" hidden>
      <img data-basis="img/tempel/${t.id}" data-versuch="0" data-ausblenden="figure" src="img/tempel/${t.id}.${BILD_ENDUNGEN[0]}" alt="${esc(t.name)}">
      <figcaption><span class="bild-art">Stimmungsbild</span> ${esc(t.name)}</figcaption>
    </figure>`;

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
    return `<section class="tempel-kasten" id="${t.id}">
        <h2>${esc(t.name)}</h2>
        <p class="tempel-zeile">${esc(tempelArt(t))} ${bauMarke({ status: t.zustand })}</p>
        ${tempelBild(t, true)}
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
      <h3 class="wegweiser-gruppe">Ankommen</h3>
      <div class="wegweiser">
        <a href="#/ueberblick"><strong>Der Raulsweg</strong><span>Geschichte, Namen, Verlauf und Entfernungen</span></a>
        <a href="#/stationswesen"><strong>Das Stationswesen</strong><span>Kaiserpfalz, Relais, Herbergen, Papiere und Stempel</span></a>
        <a href="#/reisen"><strong>Reisen</strong><span>Reisezeiten, Wetter und Etikette</span></a>
      </div>
      <h3 class="wegweiser-gruppe">Die Strecke</h3>
      <div class="wegweiser">
        <a href="#/ort/gareth"><strong>Die Reise beginnen</strong><span>Von Gareth Station für Station bis Perricum</span></a>
        <a href="#/unterwegs"><strong>Zwischen den Stationen</strong><span>Dörfer, Brücken und kleine Szenen am Weg</span></a>
        <a href="#/karten"><strong>Karten und Pläne</strong><span>Streckenkarte, Musterstation, ein Plan je Station</span></a>
      </div>
      <h3 class="wegweiser-gruppe">Hintergrund</h3>
      <div class="wegweiser vier">
        <a href="#/maechte"><strong>Mächte am Weg</strong><span>Wer am Raulsweg verdienen will</span></a>
        <a href="#/figuren"><strong>Figuren</strong><span>Wirte, Wachen, Bauleute und Geschäftemacher</span></a>
        <a href="#/tempel"><strong>Die zwölf Tempel</strong><span>Weihestätten, Bräuche und Stempel</span></a>
        <a href="#/dokumente"><strong>Dokumente</strong><span>Das Edikt und was Rommilys und Perricum dazu sagen</span></a>
      </div>
      <h3 class="wegweiser-gruppe">Für die Runde</h3>
      <div class="wegweiser vier">
        <a href="#/spielleitung"><strong>Für Spielleitungen</strong><span>Eigene Geschichten am Raulsweg leiten</span></a>
        <a href="#/spielhilfen"><strong>Spielhilfen</strong><span>Begegnungen, Gerüchte, Wetter und Namen zum Würfeln</span></a>
        <a href="#/chronik"><strong>Chronik</strong><span>Was die Runde am Raulsweg erlebt hat</span></a>
        <a href="#/anhang/zum-mitnehmen"><strong>Zum Mitnehmen</strong><span>EPUB und Stempelheft zum Drucken</span></a>
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
      .replace(/<h([23])>(.*?)<\/h\1>/g, (_, n, t) => `<h${n} id="${slug(ohneTags(t).trim())}">${t}</h${n}>`)
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
    return `<section class="weg-nach" id="weiter">${kopf}${liste.length ? `<ul class="weg-liste">${liste.map(w => `
      <li class="typ-${w.typ}"><span class="weg-meile">Meile ${w.meile}</span><div><a class="weg-name" href="#/unterwegs/${w.id}">${esc(w.name)}</a><span class="weg-art">${esc(w.art)}${w.abseits ? `, abseits: ${esc(w.abseits)}` : ""}</span><p>${esc(w.kurz)}</p></div></li>`).join("")}</ul>` : ""}</section>`;
  }

  function seiteDokumente() {
    const toc = `<nav class="auf-seite" aria-label="Auf dieser Seite"><p>Auf dieser Seite</p><ul>${dokumente.map(d => `<li><a href="#/dokumente/${d.id}">${esc(d.titel)}</a></li>`).join("")}</ul></nav>`;
    return {
      html: `<h1>Dokumente</h1>
      <p class="einleitung initiale">Was am Raulsweg ausgehängt, verlesen und abgeschrieben wird. Alle Texte sind öffentlich und können den Spielern als Handout dienen.</p>
      ${toc}
      ${dokumente.map(d => `<section class="dokument" id="${d.id}">
        <h2>${esc(d.titel)}</h2>
        <p class="dok-herkunft">${esc(d.art)} · ${esc(d.herkunft)}</p>
        <p>${esc(d.kurz)}</p>
        <div class="dok-blatt">${d.text}</div>
      </section>`).join("")}`,
      eigene: []
    };
  }

  function seiteUnterwegs() {
    const etappen = RW.stationen.slice(0, -1).map(h => ({ von: h, nach: naechsterHalt(h) }));
    const toc = `<nav class="auf-seite" aria-label="Auf dieser Seite"><p>Etappen</p><ul>${etappen.map(e => `<li><a href="#/unterwegs/etappe-${e.nach.id}">${esc(e.von.name)} → ${esc(e.nach.name)}</a></li>`).join("")}</ul></nav>`;
    const zahl = t => wegpunkte.filter(w => w.typ === t).length;
    const filter = `<div class="weg-filter" role="group" aria-label="Nach Art filtern">
      <button type="button" data-typ="" aria-pressed="true">Alle <span>${wegpunkte.length}</span></button>
      ${Object.entries(WEG_TYP).map(([t, n]) => `<button type="button" data-typ="${t}" aria-pressed="false"><i class="typ-zeichen typ-${t}" aria-hidden="true"></i>${esc(n)} <span>${zahl(t)}</span></button>`).join("")}
    </div>`;
    const inhalt = etappen.map(e => {
      const liste = wegpunkteNach(e.nach.id);
      return `<section class="etappe" id="etappe-${e.nach.id}">
        <h2><a href="${linkZu(e.von)}">${esc(e.von.name)}</a> → <a href="${linkZu(e.nach)}">${esc(e.nach.name)}</a></h2>
        <p class="etappe-zeile">Meile ${meileText(e.von)} bis ${meileText(e.nach)} · ${etappeText(e.nach)} Meilen</p>
        ${liste.map(w => `<section class="wegpunkt typ-${w.typ}" id="${w.id}" data-typ="${w.typ}">
          <h3><i class="typ-zeichen typ-${w.typ}" aria-hidden="true"></i>${esc(w.name)}</h3>
          <p class="weg-art">${esc(w.art)}, Meile ${w.meile} ${w.kanon ? `<span class="marke-kanon">Kanon</span>` : `<span class="marke-eigen">Ergänzung</span>`}</p>
          ${w.abseits ? `<p class="weg-abseits">Abseits der Straße: ${esc(w.abseits)}</p>` : ""}
          <p>${esc(w.kurz)}</p>
          ${absaetze(w.beschreibung || [])}
          <p class="weg-szene"><strong>Am Weg:</strong> ${esc(w.szene)}</p>
          ${w.meister ? `<div class="meister"><p class="meister-titel">Meisterinformationen</p><p>${esc(w.meister)}</p></div>` : ""}
        </section>`).join("") || `<p class="leise">Auf dieser kurzen Etappe gibt es keinen eigenen Halt.</p>`}
      </section>`;
    }).join("");
    return {
      html: `<h1>Zwischen den Stationen</h1>
      <p class="einleitung initiale">Zwischen zwei Stationen liegt ein Tag auf der Straße, und der ist selten leer. Dörfer, Brücken, Schenken und Baustellen säumen den Raulsweg, dazu alte Bäume, Felsen, Steine und Orte, an denen jeder anhält.</p>
      <p>Die Dörfer stammen überwiegend aus der Karte von avesmaps.de, die Landmarken und Bauwerke sind Ergänzungen dieses Bandes. Zu jedem Ort gehört eine kurze Szene zum Einstreuen. Unter <em>Abseits der Straße</em> stehen Orte, zu denen ein Abstecher führt.</p>
      ${filter}
      ${toc}${inhalt}`,
      eigene: []
    };
  }
  function wegFilterBeleben() {
    const leiste = main.querySelector(".weg-filter");
    if (!leiste) return;
    leiste.querySelectorAll("button").forEach(k => k.addEventListener("click", () => {
      const typ = k.dataset.typ;
      leiste.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b === k)));
      main.querySelectorAll(".etappe").forEach(et => {
        let sichtbar = 0;
        et.querySelectorAll(".wegpunkt").forEach(w => { const an = !typ || w.dataset.typ === typ; w.hidden = !an; if (an) sichtbar++; });
        et.hidden = !!typ && !sichtbar;
      });
    }));
  }

  function sprungliste(s) {
    const punkte = [["vorlesen", "Zum Vorlesen"], ["geruechte", "Gerüchte"], ["brodelt", "Was hier brodelt"]];
    const t = tempelAn(s.id);
    if (t) punkte.push([t.id, t.name]);
    if (figurenAn(s.id).length) punkte.push(["figuren", "Figuren"]);
    if (kartenAn(s.id).length) punkte.push(["plan", "Plan"]);
    if (naechsterHalt(s)) punkte.push(["weiter", "Auf dem Weg nach " + naechsterHalt(s).name]);
    if (chronikZu("station:" + s.id).length) punkte.push(["chronik", "In der Chronik"]);
    return `<nav class="sprungliste" aria-label="Auf dieser Seite"><h3>Auf dieser Seite</h3><ul>${punkte.map(([a, n]) => `<li><a href="#/station/${s.id}/${a}">${esc(n)}</a></li>`).join("")}</ul></nav>`;
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
          <div class="vorlese" id="vorlesen"><p class="vorlese-titel">Zum Vorlesen</p>${absaetze(s.vorlesetext)}</div>
          <h2 id="geruechte">Gerüchte am Herdfeuer</h2>
          <ul class="geruechte">${(s.geruechte || []).map(g => `<li>${esc(g)}</li>`).join("")}</ul>
          <h2 id="brodelt">Was hier brodelt</h2>
          <p>${esc(s.konflikt)}</p>
          ${s.meister ? `<div class="meister"><p class="meister-titel">Meisterinformationen</p><p>${esc(s.meister.hintergrund)}</p></div>` : ""}
          ${tempelAn(s.id) ? tempelKasten(tempelAn(s.id)) : ""}
          ${figurenAn(s.id).length ? `<h2 id="figuren">Wer hier anzutreffen ist</h2>${figurKarten(figurenAn(s.id))}` : ""}
          ${kartenAn(s.id).map(c => `<section class="karte-verweis" id="plan"><h2>Plan: ${esc(c.titel)}</h2>
            <a href="#/karte/${c.id}"><img src="${c.datei}" alt="${esc(c.art)}: ${esc(c.titel)}" loading="lazy"></a>
            <p><a href="#/karte/${c.id}">${esc(c.art)} mit Legende</a></p>${gebaeudeBlock(c)}</section>`).join("")}
          ${wegNach(s)}
          ${chronikBezug("station:" + s.id)}
        </div>
        <aside class="seitenleiste">
          ${sprungliste(s)}
          <section>
            <h3>Steckbrief</h3>
            <dl>
              <dt>Gottheit</dt><dd>${esc(s.gottheit)}</dd>
              <dt>Emblem</dt><dd>${esc(s.emblem)}</dd>
              ${tempelAn(s.id) ? `<dt>Tempel</dt><dd><a href="#/tempel/${tempelAn(s.id).id}">${esc(tempelAn(s.id).name)}</a></dd>` : ""}
              <dt>Ab Gareth</dt><dd>Meile ${meileText(s)}</dd>
              <dt>Etappe</dt><dd>${etappeText(s)} Meilen von <a href="${linkZu(vor)}">${esc(vor.name)}</a></dd>
              <dt>Weiter</dt><dd>${etappeText(nach)} Meilen nach <a href="${linkZu(nach)}">${esc(nach.name)}</a></dd>
              ${kartenAn(s.id).length ? `<dt>Plan</dt><dd><a href="#/karte/${kartenAn(s.id)[0].id}">${esc(kartenAn(s.id)[0].titel)}</a></dd>` : ""}
              <dt>Bauzustand</dt><dd>${bauMarke(s)}</dd>
              <dt>Herkunft</dt><dd>${kanonMarke(s)}</dd>
              <dt>Stimmung</dt><dd>${esc(s.jahreszeit)}</dd>
              ${wegpunkte.filter(w => w.nach === s.id && w.typ === "abseits").length ? `<dt>Abstecher</dt><dd>${wegpunkte.filter(w => w.nach === s.id && w.typ === "abseits").map(w => `<a href="#/unterwegs/${w.id}">${esc(w.name)}</a>`).join("<br>")}</dd>` : ""}
              ${abschnittVon(s.id) ? `<dt>Unterwegs</dt><dd><a href="#/spielhilfen/${abschnittVon(s.id).id}">Begegnungen: ${esc(abschnittVon(s.id).name)}</a></dd>` : ""}
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

  /* ---------- Spielhilfen: Begegnungen, Gerüchte, Wetter, Namen ---------- */
  const SH = RW.spielhilfen || { abschnitte: [], geruechte: [], wetter: [], namen: {}, tagesabschnitte: [] };
  const wuerfel = n => 1 + Math.floor(Math.random() * n);
  const ziehe = liste => liste[wuerfel(liste.length) - 1];
  const abschnittVon = sid => SH.abschnitte.find(a => a.stationen.includes(sid) || a.bis === sid);

  function begegnungZeile(b, i) {
    return `<tr data-w="${i + 1}"><td class="w-zahl">${i + 1}</td><td><strong>${esc(b.titel)}.</strong> ${esc(b.text)}${b.wendung ? `<span class="meister-zeile">Wendung: ${esc(b.wendung)}</span>` : ""}</td></tr>`;
  }
  const wuerfelKnopf = (ziel, n = 20) => `<p class="wurf"><button type="button" class="wurf-knopf" data-tabelle="${ziel}" data-seiten="${n}">W${n} würfeln</button><span class="wurf-ergebnis" aria-live="polite"></span></p>`;

  function seiteSpielhilfen() {
    const toc = `<nav class="auf-seite" aria-label="Auf dieser Seite"><p>Auf dieser Seite</p><ul>
      <li><a href="#/spielhilfen/reisetag">Einen Reisetag würfeln</a></li>
      <li><a href="#/spielhilfen/begegnungen">Zufallsbegegnungen</a></li>
      <li><a href="#/spielhilfen/geruechte">Gerüchte am Weg</a></li>
      <li><a href="#/spielhilfen/wetter">Wetter</a></li>
      <li><a href="#/spielhilfen/namen">Namen und Eigenheiten</a></li></ul></nav>`;
    const abschnitte = SH.abschnitte.map(a => {
      const st = a.stationen.map(id => RW.stationen.find(s => s.id === id)).filter(Boolean);
      return `<section class="sh-abschnitt" id="${a.id}">
        <h3>${esc(a.name)}</h3>
        <p class="leise">Meile ${a.meilen[0]} bis ${a.meilen[1]} · ${st.map(s => `<a href="#/station/${s.id}">${s.nr} ${esc(s.name)}</a>`).join(", ")} · Begegnung bei ${a.verkehr === 1 ? "1" : "1–" + a.verkehr} auf W6</p>
        <p>${esc(a.kurz)}</p>
        ${wuerfelKnopf("beg-" + a.id)}
        <table class="w-tabelle" id="beg-${a.id}"><thead><tr><th>W20</th><th>Begegnung</th></tr></thead><tbody>${a.begegnungen.map(begegnungZeile).join("")}</tbody></table>
      </section>`;
    }).join("");
    const geruechte = `<table class="w-tabelle" id="tab-geruechte"><thead><tr><th>W20</th><th>Gerücht</th></tr></thead><tbody>${SH.geruechte.map((g, i) => `<tr data-w="${i + 1}"><td class="w-zahl">${i + 1}</td><td>»${esc(g.text)}«${g.meister ? `<span class="meister-zeile">${esc(g.meister)}</span>` : ""}</td></tr>`).join("")}</tbody></table>`;
    const wetter = SH.wetter.map(w => `<section class="sh-wetter" id="wetter-${w.id}"><h3>${esc(w.name)}</h3><p class="leise">${esc(w.monde)}</p>${wuerfelKnopf("tab-wetter-" + w.id)}
      <table class="w-tabelle" id="tab-wetter-${w.id}"><thead><tr><th>W20</th><th>Wetter</th><th>Folgen</th></tr></thead><tbody>${w.tabelle.map(z => `<tr data-von="${z.von}" data-bis="${z.bis}"><td class="w-zahl">${z.von === z.bis ? z.von : z.von + "–" + z.bis}</td><td>${esc(z.wetter)}</td><td>${esc(z.folge)}</td></tr>`).join("")}</tbody></table></section>`).join("");
    const N = SH.namen;
    const liste = (titel, l, w) => `<div class="namen-liste"><h3>${titel}</h3><ol>${(l || []).map(x => `<li>${esc(x)}</li>`).join("")}</ol><p class="leise">W${w || (l || []).length}</p></div>`;
    const auswahl = (name, opts) => `<select name="${name}">${opts.map(([v, t]) => `<option value="${v}">${esc(t)}</option>`).join("")}</select>`;
    return {
      html: `<h1>Spielhilfen</h1>
      <p class="einleitung initiale">Für die Stunden zwischen den Stationen: wer einem begegnet, was man sich erzählt, wie das Wetter wird und wie der Mensch heißt, den die Runde gerade nach dem Weg fragt.</p>
      <p>Alle Tabellen lassen sich mit einem W20 nutzen, am Tisch oder mit dem Knopf über jeder Tabelle. Die Wendungen und Hinweise in den Meisterinformationen sind Möglichkeiten. Wer leitet, wählt, verwirft oder erfindet neu.</p>
      ${toc}
      <h2 id="reisetag">Einen Reisetag würfeln</h2>
      <p>Ein Wurf für Wetter, je ein W6 für Morgen, Mittag, Abend und Nacht, und ein Gerücht für den Abend in der Herberge. Wer in einer Station übernachtet, würfelt für die Nacht nicht.</p>
      <form class="reisetag" onsubmit="return false">
        <label>Abschnitt ${auswahl("abschnitt", SH.abschnitte.map(a => [a.id, a.name]))}</label>
        <label>Jahreszeit ${auswahl("jahreszeit", SH.wetter.map(w => [w.id, w.name]))}</label>
        <label class="haken"><input type="checkbox" name="station" checked> Nacht in einer Station</label>
        <button type="button" class="reisetag-knopf">Reisetag würfeln</button>
      </form>
      <div class="reisetag-ergebnis" aria-live="polite"></div>

      <h2 id="begegnungen">Zufallsbegegnungen</h2>
      <p>Für jeden Tagesabschnitt einen W6: Bei einer 1 (im dichten Verkehr bei Gareth und vor Perricum bei 1 oder 2) kommt es zu einer Begegnung, dann W20 auf der Tabelle des Abschnitts. Was schon passiert ist, darf man streichen oder umdeuten. Einträge, die von der Nacht sprechen, passen tagsüber selten; dann einfach noch einmal würfeln.</p>
      ${abschnitte}

      <h2 id="geruechte">Gerüchte am Weg</h2>
      <p>Was an den Herdfeuern der ganzen Strecke erzählt wird, zusätzlich zu den Gerüchten der einzelnen Stationen. Was davon stimmt, steht nirgends fest.</p>
      ${wuerfelKnopf("tab-geruechte")}
      ${geruechte}

      <h2 id="wetter">Wetter</h2>
      <p>Ein W20 am Morgen. Die Folgen gelten für Reisende auf der Straße, die Tagesstrecken stehen unter <a href="#/reisen/reisezeiten">Reisezeiten</a>. Wer zwei Tage hintereinander dasselbe würfelt, bekommt eben dasselbe Wetter.</p>
      ${wetter}

      <h2 id="namen">Namen und Eigenheiten</h2>
      <p>Für Wirte, Fuhrleute, Händlerinnen und alle, die der Runde unterwegs über den Weg laufen. Familiennamen sind am Raulsweg oft Berufe, Orte oder Spottnamen.</p>
      <div class="namen-werkzeug">
        <button type="button" data-namen="person">Mittelreicher</button>
        <button type="button" data-namen="tulamide">Tulamide</button>
        <button type="button" data-namen="herberge">Herberge</button>
        <button type="button" data-namen="haendler">Händler</button>
        <button type="button" data-namen="reisend">Wer noch unterwegs ist</button>
        <p class="namen-ergebnis" aria-live="polite"></p>
      </div>
      <div class="namen-raster">
        ${liste("Vornamen, Männer", N.maenner)}${liste("Vornamen, Frauen", N.frauen)}${liste("Familiennamen", N.familien)}
        ${liste("Tulamidisch, Männer", N.tulamidischM)}${liste("Tulamidisch, Frauen", N.tulamidischW)}${liste("Herbergen", N.herbergen)}
        ${liste("Waren der Händler", N.waren)}${liste("Wer noch unterwegs ist", N.reisende)}${liste("Eigenheiten", N.eigenheiten)}
      </div>`,
      eigene: []
    };
  }

  function spielhilfenBeleben() {
    const seite = main.querySelector(".reisetag");
    if (!seite && !main.querySelector(".wurf-knopf")) return;
    main.querySelectorAll(".wurf-knopf").forEach(k => k.addEventListener("click", () => {
      const tab = main.querySelector("#" + k.dataset.tabelle), w = wuerfel(+k.dataset.seiten || 20);
      tab.querySelectorAll("tr.gewuerfelt").forEach(z => z.classList.remove("gewuerfelt"));
      const zeile = [...tab.querySelectorAll("tbody tr")].find(z => z.dataset.w ? +z.dataset.w === w : w >= +z.dataset.von && w <= +z.dataset.bis);
      if (!zeile) return;
      zeile.classList.add("gewuerfelt");
      const titel = zeile.querySelector("strong") ? zeile.querySelector("strong").textContent.replace(/\.$/, "") : zeile.cells[1].textContent.slice(0, 60);
      k.nextElementSibling.textContent = `Gewürfelt: ${w}, ${titel}`;
      zeile.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }));
    const N = SH.namen, aus = main.querySelector(".namen-ergebnis");
    const person = () => Math.random() < .5 ? `${ziehe(N.maenner)} ${ziehe(N.familien)}` : `${ziehe(N.frauen)} ${ziehe(N.familien)}`;
    const tulamide = () => Math.random() < .5 ? `${ziehe(N.tulamidischM)} ibn ${ziehe(N.tulamidischM)}` : `${ziehe(N.tulamidischW)} saba ${ziehe(N.tulamidischW)}`;
    const machen = {
      person: () => `${person()}, ${ziehe(N.eigenheiten)}`,
      tulamide: () => `${tulamide()}, ${ziehe(N.eigenheiten)}`,
      herberge: () => `»${ziehe(N.herbergen)}«, Wirt oder Wirtin: ${person()}`,
      haendler: () => `${Math.random() < .2 ? tulamide() : person()} handelt mit ${ziehe(N.waren)}`,
      reisend: () => `${ziehe(N.reisende)}: ${person()}, ${ziehe(N.eigenheiten)}`
    };
    main.querySelectorAll("[data-namen]").forEach(k => k.addEventListener("click", () => { if (aus) aus.textContent = machen[k.dataset.namen](); }));
    if (!seite) return;
    const ergebnis = main.querySelector(".reisetag-ergebnis");
    main.querySelector(".reisetag-knopf").addEventListener("click", () => {
      const a = SH.abschnitte.find(x => x.id === seite.abschnitt.value), wz = SH.wetter.find(x => x.id === seite.jahreszeit.value);
      const ww = wuerfel(20), wetter = wz.tabelle.find(z => ww >= z.von && ww <= z.bis);
      const zeiten = SH.tagesabschnitte.filter(t => !(t === "Nacht" && seite.station.checked)).map(t => {
        const w6 = wuerfel(6);
        if (w6 > a.verkehr) return `<li><span class="rt-zeit">${t}</span> W6: ${w6}. Nichts Besonderes.</li>`;
        // nachts nur, was in der Nacht spielt, tagsüber nur der Rest
        const nachts = b => /nachts/i.test(b.text);
        const gibt = a.begegnungen.some(b => nachts(b) === (t === "Nacht"));
        let w = wuerfel(20), b = a.begegnungen[w - 1];
        while (gibt && nachts(b) !== (t === "Nacht")) { w = wuerfel(20); b = a.begegnungen[w - 1]; }
        return `<li class="rt-treffer"><span class="rt-zeit">${t}</span> W6: ${w6}, Begegnung, W20: ${w}. <strong>${esc(b.titel)}.</strong> ${esc(b.text)}${b.wendung ? `<span class="meister-zeile">Wendung: ${esc(b.wendung)}</span>` : ""}</li>`;
      }).join("");
      const gw = wuerfel(20), g = SH.geruechte[gw - 1];
      ergebnis.innerHTML = `<p><strong>Wetter (${esc(wz.name)}, W20: ${ww}):</strong> ${esc(wetter.wetter)}. ${esc(wetter.folge)}</p>
        <ul class="rt-liste">${zeiten}</ul>
        <p><strong>Am Abend erzählt man sich (W20: ${gw}):</strong> »${esc(g.text)}«${g.meister ? `<span class="meister-zeile">${esc(g.meister)}</span>` : ""}</p>
        <p class="leise">Unterwegs getroffen: ${esc(machen.reisend())}.</p>`;
    });
  }

  /* ---------- Mächte und ihr Beziehungsnetz ---------- */
  const BEZIEHUNG = { buendnis: "Bündnis", geschaeft: "Geschäft", rivalitaet: "Rivalität", misstrauen: "Misstrauen" };
  const beziehungen = RW.beziehungen || [];
  const machtVon = id => RW.maechte.find(m => m.id === id);
  const beziehungenVon = id => beziehungen.filter(b => b.a === id || b.b === id).map(b => ({ ...b, andere: machtVon(b.a === id ? b.b : b.a) }));

  function beziehungsnetz(fokus) {
    const W = 760, H = 560, cx = W / 2, cy = H / 2 + 4, r = 215;
    const mitte = "kanzlei";
    const ring = ["rabenmund", "adel", "neue-kontore", "mada-basari", "perricum", "beilunker", "traeger", "kirchen"].filter(machtVon);
    const pos = { [mitte]: [cx, cy] };
    ring.forEach((id, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / ring.length; pos[id] = [cx + r * 1.25 * Math.cos(a), cy + r * Math.sin(a)]; });
    const kanten = beziehungen.filter(b => pos[b.a] && pos[b.b]).map(b => {
      const [x1, y1] = pos[b.a], [x2, y2] = pos[b.b];
      const aktiv = fokus && (b.a === fokus || b.b === fokus);
      // Linien zwischen Ringknoten leicht nach außen biegen, damit keine durch die Mitte läuft
      let mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      if (b.a !== mitte && b.b !== mitte) {
        const dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy);
        if (d < 40) { const l = Math.hypot(x2 - x1, y2 - y1); mx += -(y2 - y1) / l * 150; my += (x2 - x1) / l * 150; }
        else { mx += dx / d * 30; my += dy / d * 30; }
      }
      const pfad = `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
      return `<g class="kante ${b.art}${aktiv ? " aktiv" : ""}" data-a="${b.a}" data-b="${b.b}"><title>${esc(machtVon(b.a).kurzname)} – ${esc(machtVon(b.b).kurzname)}: ${esc(BEZIEHUNG[b.art])}. ${esc(b.text)}</title>
        <path d="${pfad}"/><path class="treffer" d="${pfad}"/></g>`;
    }).join("");
    const knoten = Object.entries(pos).map(([id, [x, y]]) => {
      const m = machtVon(id), name = m.kurzname || m.name, w = Math.max(96, name.length * 9.2 + 26);
      return `<a href="#/macht/${id}" class="knoten${id === fokus ? " fokus" : ""}${id === mitte ? " mitte" : ""}" data-id="${id}" aria-label="${esc(m.name)}">
        <rect x="${(x - w / 2).toFixed(1)}" y="${(y - 19).toFixed(1)}" width="${w.toFixed(1)}" height="38" rx="19"/>
        <text x="${x.toFixed(1)}" y="${(y + 5.5).toFixed(1)}" text-anchor="middle">${esc(name)}</text></a>`;
    }).join("");
    const legende = Object.entries(BEZIEHUNG).map(([k, n]) => `<span><svg width="34" height="12" aria-hidden="true"><line class="${k}" x1="2" y1="6" x2="32" y2="6"/></svg>${n}</span>`).join("");
    return `<figure class="netz"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Beziehungsnetz der Mächte am Weg">${kanten}${knoten}</svg>
      <figcaption><div class="netz-legende">${legende}</div>Öffentlich bekannte Verhältnisse. Ein Klick auf eine Macht öffnet ihr Profil, ein Fingertipp oder Mauszeiger auf eine Linie zeigt, worum es geht.</figcaption></figure>`;
  }
  function netzBeleben() {
    const svg = main.querySelector(".netz svg");
    if (!svg) return;
    const fokus = id => {
      svg.classList.toggle("gedimmt", !!id);
      svg.querySelectorAll(".kante").forEach(k => k.classList.toggle("hell", !!id && (k.dataset.a === id || k.dataset.b === id)));
      svg.querySelectorAll(".knoten").forEach(k => k.classList.toggle("hell", !!id && (k.dataset.id === id
        || [...svg.querySelectorAll(`.kante[data-a="${id}"], .kante[data-b="${id}"]`)].some(e => e.dataset.a === k.dataset.id || e.dataset.b === k.dataset.id))));
    };
    svg.querySelectorAll(".knoten").forEach(k => {
      k.addEventListener("mouseenter", () => fokus(k.dataset.id));
      k.addEventListener("focus", () => fokus(k.dataset.id));
      k.addEventListener("mouseleave", () => fokus(null));
      k.addEventListener("blur", () => fokus(null));
    });
  }

  function seiteMaechte() {
    const karten = RW.maechte.map(m => `
      <li class="macht-karte">
        <a class="macht-name" href="#/macht/${m.id}">${esc(m.name)}</a>
        <span class="macht-sitz">${esc(m.sitz)} ${m.kanon ? `<span class="marke-kanon">Kanon</span>` : `<span class="marke-eigen">Ergänzung</span>`}</span>
        <p>${esc(m.haltung || "")}</p>
        <p class="leise">${beziehungenVon(m.id).length} Beziehungen · ${figurenVon(m.id).length} Figuren</p>
      </li>`).join("");
    return {
      html: `<h1>Mächte am Weg</h1>
      <p class="einleitung initiale">Der Raulsweg gehört der Kaiserin. Verdienen wollen an ihm viele.</p>
      <p>Keine dieser Parteien ist einfach gut oder böse, und keine handelt allein. Das Netz zeigt, was am Weg über ihre Verhältnisse bekannt ist. Was sich dahinter abspielen könnte, steht in den Meisterinformationen der einzelnen Profile, als Möglichkeiten, nicht als Wahrheit.</p>
      ${beziehungsnetz()}
      <h2>Die Mächte</h2>
      <ul class="macht-raster">${karten}</ul>`,
      eigene: []
    };
  }

  function seiteMacht(id) {
    const i = RW.maechte.findIndex(m => m.id === id);
    if (i < 0) return seiteFehlt();
    const m = RW.maechte[i];
    const vor = RW.maechte[(i - 1 + RW.maechte.length) % RW.maechte.length], nach = RW.maechte[(i + 1) % RW.maechte.length];
    const bez = beziehungenVon(m.id);
    const st = (m.stationen || []).map(sid => RW.stationen.find(s => s.id === sid)).filter(Boolean);
    const doks = (m.dokumente || []).map(did => dokumente.find(d => d.id === did)).filter(Boolean);
    const fig = figurenVon(m.id);
    return {
      html: `
      <div class="figur-kopf"><div><h1>${esc(m.name)}</h1><p class="station-unterzeile">${esc(m.haltung || "Macht am Weg")}</p></div></div>
      <div class="station-raster">
        <div>
          <p class="einleitung initiale">${esc((m.beschreibung || [])[0] || "")}</p>
          ${absaetze((m.beschreibung || []).slice(1))}
          <h3>Was sie wollen</h3><p>${esc(m.will)}</p>
          <h3>Wo es reibt</h3><p>${esc(m.konflikt)}</p>
          ${(m.mittel || []).length ? `<h3>Womit sie wirken</h3><ul>${m.mittel.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
          ${m.vertreter ? `<h3>Wer für sie spricht</h3><p>${esc(m.vertreter)}</p>` : ""}
          ${m.stimme ? `<blockquote class="zitat"><p>»${esc(m.stimme)}«</p></blockquote>` : ""}
          ${m.hebel ? `<h3>Wie man mit ihnen umgeht</h3><p>${esc(m.hebel)}</p>` : ""}
          <div class="meister"><p class="meister-titel">Meisterinformationen</p><p>${esc(m.meister)}</p>
            ${(m.moeglichkeiten || []).length ? `<p class="moeglich-titel">Was hinter den Kulissen laufen könnte</p>${moeglichkeitenListe(m.moeglichkeiten, "macht:" + m.id)}<p class="moeglich-hinweis">Wähle eine, verbinde sie oder erfinde eine eigene.</p>` : ""}</div>
          ${fig.length ? `<h2 id="figuren">Figuren</h2>${figurKarten(fig)}` : ""}
          ${chronikBezug("macht:" + m.id)}
        </div>
        <aside class="seitenleiste">
          <section>
            <h3>Steckbrief</h3>
            <dl>
              <dt>Sitz</dt><dd>${esc(m.sitz)}</dd>
              <dt>Herkunft</dt><dd>${m.kanon ? `<span class="marke-kanon">Kanon</span>` : `<span class="marke-eigen">Ergänzung</span>`}</dd>
              ${st.length ? `<dt>Am Weg</dt><dd>${st.map(s => `<a href="#/station/${s.id}">${s.nr} ${esc(s.name)}</a>`).join("<br>")}</dd>` : m.id === "kirchen" ? `<dt>Am Weg</dt><dd><a href="#/tempel">alle zwölf Tempel</a></dd>` : ""}
              ${doks.length ? `<dt>Dokument</dt><dd>${doks.map(d => `<a href="#/dokumente/${d.id}">${esc(d.titel)}</a>`).join("<br>")}</dd>` : ""}
            </dl>
          </section>
          ${bez.length ? `<section><h3>Beziehungen</h3><ul class="beziehungen">${bez.map(b => `<li><span class="bez-art ${b.art}">${esc(BEZIEHUNG[b.art])}</span> <a href="#/macht/${b.andere.id}">${esc(b.andere.name)}</a><br><small>${esc(b.text)}</small></li>`).join("")}</ul></section>` : ""}
          ${verbindungsBlock("macht:" + m.id)}
        </aside>
      </div>
      <h2 id="netz">Im Netz der Mächte</h2>
      ${beziehungsnetz(m.id)}
      <nav class="blaettern" aria-label="Weitere Mächte">
        <a href="#/macht/${vor.id}">← ${esc(vor.name)}</a>
        <a href="#/macht/${nach.id}">${esc(nach.name)} →</a>
      </nav>`,
      eigene: ["macht:" + m.id]
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
              ${maechte.length ? `<dt>Gehört zu</dt><dd>${maechte.map(m => `<a href="#/macht/${m.id}">${esc(m.name)}</a>`).join("<br>")}</dd>` : ""}
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
        ${tempelBild(t)}
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
      ${gebaeudeBlock(c)}
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
    const [teil, id, abschnitt] = route.split("/");
    if (teil === "maechte" && id) { location.replace(`#/macht/${id}`); return; }
    const einzelseite = ["station", "ort", "figur", "karte", "macht"].includes(teil);
    const anker = einzelseite ? abschnitt : id;
    const seitenSchluessel = einzelseite ? `${teil}/${id}` : teil;

    if (seitenSchluessel !== letzteSeite) {
      let seite;
      if (teil === "") seite = seiteTitel();
      else if (KAPITEL.includes(teil)) seite = seiteKapitel(teil);
      else if (teil === "stationen") seite = seiteStationen();
      else if (teil === "station") seite = seiteStation(id);
      else if (teil === "ort") seite = seiteOrt(id);
      else if (teil === "maechte") seite = seiteMaechte();
      else if (teil === "macht") seite = seiteMacht(id);
      else if (teil === "figuren") seite = seiteFiguren();
      else if (teil === "figur") seite = seiteFigur(id);
      else if (teil === "tempel") seite = seiteTempel();
      else if (teil === "unterwegs") seite = seiteUnterwegs();
      else if (teil === "dokumente") seite = seiteDokumente();
      else if (teil === "chronik") seite = seiteChronik();
      else if (teil === "spielhilfen") seite = seiteSpielhilfen();
      else if (teil === "karten") seite = seiteKarten();
      else if (teil === "karte") seite = seiteKarte(id);
      else if (teil === "bauplan") seite = seiteBauplan();
      else seite = seiteFehlt();
      main.innerHTML = seite.html;
      if (teil === "tempel" || teil === "chronik" || teil === "unterwegs" || teil === "dokumente") {
        // Jeder Eintrag verweist nicht auf sich selbst; Querverweise je Abschnitt neu zählen
        if (teil === "tempel") main.querySelectorAll(".tempel-eintrag").forEach(sek => verlinken(sek, ["tempel:" + sek.id]));
        else if (teil === "unterwegs") main.querySelectorAll(".wegpunkt").forEach(sek => verlinken(sek, ["wegpunkt:" + sek.id]));
        else if (teil === "dokumente") main.querySelectorAll(".dokument").forEach(sek => verlinken(sek, ["dokument:" + sek.id]));
        else main.querySelectorAll(".chronik-eintrag").forEach(sek => verlinken(sek, []));
      } else verlinken(main, seite.eigene);
      bilderAbsichern();
      gebaeudeLaden();
      netzBeleben();
      spielhilfenBeleben();
      wegFilterBeleben();
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

    const ziel = anker ? document.getElementById(anker) : null;
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
