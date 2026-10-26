/* ==========================================================
   Der Raulsweg – Darstellung und Navigation
   Hash-Routen: #/  #/ueberblick  #/stationswesen  #/stationen
                #/station/<id>  #/maechte  #/reisen  #/anhang  #/bauplan
   ========================================================== */
(function () {
  "use strict";

  const RW = window.RW;
  const main = document.getElementById("inhalt");
  const nav = document.getElementById("navigation");
  const stationen = RW.stationen.filter(s => s.typ === "station");
  const gesamtMeilen = RW.stationen[RW.stationen.length - 1].meile;
  const BILD_ENDUNGEN = ["webp", "jpg", "jpeg", "png"];

  /* ---------- Hilfsfunktionen ---------- */
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const absaetze = arr => (arr || []).map(p => `<p>${esc(p)}</p>`).join("");
  const statusText = { fertig: "fertig", erweiterung: "Erweiterung", rohbau: "Rohbau" };

  // Eine Meilenangabe gilt als geschätzt, sobald irgendeine Etappe davor geschätzt ist.
  function meileGeschaetzt(halt) {
    return RW.stationen.some(s => s.nr > 0 && s.nr <= halt.nr && s.schaetzung);
  }
  const meileText = h => (meileGeschaetzt(h) ? "~" : "") + h.meile;
  const etappeText = h => h.etappe == null ? "–" : (h.schaetzung ? "~" : "") + h.etappe;

  function kanonMarke(h) {
    return h.kanon
      ? `<span class="marke-kanon" title="Ort aus offiziellen Quellen">Kanon</span>`
      : `<span class="marke-eigen" title="Für diesen Band ergänzter Ort">Ergänzung</span>`;
  }
  const bauMarke = h => h.status ? `<span class="bau bau-${h.status}">${statusText[h.status]}</span>` : "";

  /* ---------- Meisterinformationen ---------- */
  const schalter = document.getElementById("meister-schalter");
  function meisterSetzen(an) {
    document.body.classList.toggle("meister-an", an);
    schalter.checked = an;
    try { localStorage.setItem("raulsweg-meister", an ? "1" : "0"); } catch (e) { /* ohne Speicher weiter */ }
  }
  let meisterStart = false;
  try { meisterStart = localStorage.getItem("raulsweg-meister") === "1"; } catch (e) { }
  meisterSetzen(meisterStart);
  schalter.addEventListener("change", () => meisterSetzen(schalter.checked));

  /* ---------- Navigation ---------- */
  function baueNavigation() {
    const stationLinks = stationen.map(s =>
      `<li><a href="#/station/${s.id}" data-route="station/${s.id}"><span class="nav-nr">${s.nr}</span><span>${esc(s.name)}</span></a></li>`
    ).join("");
    nav.innerHTML = `
      <p class="nav-gruppe">Einführung</p>
      <ul>
        <li><a href="#/" data-route="">Titelseite</a></li>
        <li><a href="#/ueberblick" data-route="ueberblick">Der Raulsweg im Überblick</a></li>
        <li><a href="#/stationswesen" data-route="stationswesen">Das Stationswesen</a></li>
      </ul>
      <p class="nav-gruppe">Die zwölf Stationen</p>
      <ul>
        <li><a href="#/stationen" data-route="stationen">Übersicht</a></li>
        ${stationLinks}
      </ul>
      <p class="nav-gruppe">Hintergrund</p>
      <ul>
        <li><a href="#/maechte" data-route="maechte">Mächte am Weg</a></li>
        <li><a href="#/reisen" data-route="reisen">Reisen auf dem Raulsweg</a></li>
      </ul>
      <p class="nav-gruppe">Anhang</p>
      <ul>
        <li><a href="#/anhang" data-route="anhang">Glossar und Quellen</a></li>
        <li><a href="#/bauplan" data-route="bauplan">Bauplan des Bandes</a></li>
      </ul>`;
  }

  function navMarkieren(route) {
    nav.querySelectorAll("a").forEach(a => {
      if (a.dataset.route === route) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
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

  /* ---------- Bausteine ---------- */
  function streckenband() {
    const halte = RW.stationen.map((h, i) => {
      const links = (h.meile / gesamtMeilen) * 100;
      const klassen = ["band-halt", i % 2 === 0 ? "oben" : "unten"];
      if (i % 4 >= 2) klassen.push("weit");
      if (h.typ === "stadt") klassen.push("stadt");
      else if (!h.kanon) klassen.push("ergaenzt");
      const ziel = h.typ === "stadt" ? "#/ueberblick" : `#/station/${h.id}`;
      const zeichen = h.typ === "stadt" ? h.name[0] : h.nr;
      return `<a class="${klassen.join(" ")}" style="left:${links}%" href="${ziel}" aria-label="${esc(h.name)}, Meile ${meileText(h)}">
          <span class="band-siegel">${zeichen}</span>
          <span class="band-name">${esc(h.name)}<span class="band-meile">Meile ${meileText(h)}</span></span>
        </a>`;
    }).join("");
    return `<div class="band-huelle" role="region" aria-label="Streckenband Gareth bis Perricum">
        <div class="band"><div class="band-weg"></div>${halte}</div>
        <div class="band-legende">
          <span><i class="punkt"></i> Station an kanonischem Ort</span>
          <span><i class="punkt ergaenzt"></i> ergänzte Station</span>
          <span><i class="punkt stadt"></i> Endpunkt</span>
        </div>
      </div>`;
  }

  function entfernungstabelle() {
    const zeilen = RW.stationen.map(h => `
      <tr>
        <td class="zahl">${h.typ === "stadt" ? "–" : h.nr}</td>
        <td>${h.typ === "stadt" ? `<strong>${esc(h.name)}</strong>` : `<a href="#/station/${h.id}">${esc(h.name)}</a>`}</td>
        <td>${h.gottheit ? esc(h.gottheit) : ""}</td>
        <td class="zahl">${meileText(h)}</td>
        <td class="zahl">${etappeText(h)}</td>
      </tr>`).join("");
    return `<div class="tabelle-huelle"><table>
        <thead><tr><th class="zahl">Nr.</th><th>Halt</th><th>Gottheit</th><th class="zahl">Meile ab Gareth</th><th class="zahl">Etappe</th></tr></thead>
        <tbody>${zeilen}</tbody>
      </table></div>`;
  }

  function reisezeitentabelle() {
    const zeilen = RW.reisezeiten.map(r =>
      `<tr><td>${esc(r.art)}</td><td class="zahl">${esc(r.proTag)}</td><td class="zahl">${esc(r.dauer)}</td></tr>`).join("");
    return `<div class="tabelle-huelle"><table>
        <thead><tr><th>Reisende</th><th class="zahl">Meilen pro Tag</th><th class="zahl">Gesamtdauer</th></tr></thead>
        <tbody>${zeilen}</tbody></table></div>`;
  }

  // Bild mit Endungs-Fallback: webp → jpg → jpeg → png → Platzhalter
  function stationsbild(s) {
    return `<figure class="station-bild">
        <img data-basis="img/stationen/${s.bild}" data-versuch="0" src="img/stationen/${s.bild}.${BILD_ENDUNGEN[0]}"
             alt="${esc(s.name)}: ${esc(s.jahreszeit || "")}" loading="lazy">
        <figcaption>Station ${esc(s.nr)}, ${esc(s.name)}: ${esc(s.jahreszeit || "")}</figcaption>
      </figure>`;
  }
  function bilderAbsichern() {
    main.querySelectorAll("img[data-basis]").forEach(img => {
      img.addEventListener("error", function () {
        const n = Number(img.dataset.versuch) + 1;
        if (n < BILD_ENDUNGEN.length) {
          img.dataset.versuch = n;
          img.src = `${img.dataset.basis}.${BILD_ENDUNGEN[n]}`;
        } else {
          const platz = document.createElement("div");
          platz.className = "bild-platzhalter";
          const name = img.alt.split(":")[0];
          platz.innerHTML = `<div><strong>${esc(name)}</strong>Bild folgt: ${esc(img.dataset.basis)}.webp</div>`;
          img.replaceWith(platz);
        }
      });
    });
  }

  /* ---------- Seiten ---------- */
  function seiteTitel() {
    return `
      <section class="titel" style="background-image:url('img/titel.webp')">
        <div class="titel-text">
          <h1>Der Raulsweg</h1>
          <p>${esc(RW.titel.untertitel)}</p>
        </div>
      </section>
      ${RW.titel.einleitung}
      ${streckenband()}
      <h2>Inhalt</h2>
      <ul>
        <li><a href="#/ueberblick">Der Raulsweg im Überblick</a>: Geschichte, Namen, Verlauf, Entfernungen</li>
        <li><a href="#/stationswesen">Das Stationswesen</a>: Kaiserpfalz, Relais, Herbergen, Papiere</li>
        <li><a href="#/stationen">Die zwölf Stationen</a>: von Nattersquell bis Rabicum</li>
        <li><a href="#/maechte">Mächte am Weg</a>: wer am Raulsweg verdienen will</li>
        <li><a href="#/reisen">Reisen auf dem Raulsweg</a>: Reisezeiten, Wetter, Etikette</li>
      </ul>`;
  }

  function seiteKapitel(schluessel) {
    const k = RW.kapitel[schluessel];
    let html = `<h1>${esc(k.titel)}</h1>${k.html}`;
    html = html.replace('<div id="streckenband-platz"></div>', streckenband())
               .replace('<div id="entfernungen-platz"></div>', entfernungstabelle())
               .replace('<div id="reisezeiten-platz"></div>', reisezeitentabelle());
    return html;
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
    return `<h1>Die zwölf Stationen</h1>
      <p class="einleitung">Von der Travia-Station vor den Toren Gareths bis zum Weinfest von Rabicum: zwölf Orte, zwölf Gottheiten, zwölf Bilder einer Reise.</p>
      ${streckenband()}
      <ol class="stationsliste">${liste}</ol>`;
  }

  function seiteStation(id) {
    const i = stationen.findIndex(s => s.id === id);
    if (i < 0) return seiteFehlt();
    const s = stationen[i];
    const vor = stationen[i - 1], nach = stationen[i + 1];
    const geruechte = (s.geruechte || []).map(g => `<li>${esc(g)}</li>`).join("");
    return `
      <div class="station-kopf">
        <span class="station-siegel${s.kanon ? "" : " ergaenzt"}" aria-hidden="true">${s.nr}</span>
        <div>
          <h1>${esc(s.name)}</h1>
          <p class="station-unterzeile">Station ${s.nr} des Raulswegs, geweiht ${esc(s.gottheit)}</p>
        </div>
      </div>
      ${stationsbild(s)}
      <div class="station-raster">
        <div>
          <p class="einleitung">${esc(s.kurz)}</p>
          ${absaetze(s.beschreibung)}
          <div class="vorlese"><p class="vorlese-titel">Zum Vorlesen</p>${absaetze(s.vorlesetext)}</div>
          <h2>Gerüchte am Herdfeuer</h2>
          <ul class="geruechte">${geruechte}</ul>
          <h2>Was hier brodelt</h2>
          <p>${esc(s.konflikt)}</p>
          ${s.meister ? `<div class="meister"><p class="meister-titel">Meisterinformationen</p><p>${esc(s.meister.hintergrund)}</p></div>` : ""}
        </div>
        <aside class="steckbrief" aria-label="Steckbrief">
          <h3>Steckbrief</h3>
          <dl>
            <dt>Gottheit</dt><dd>${esc(s.gottheit)}</dd>
            <dt>Emblem</dt><dd>${esc(s.emblem)}</dd>
            <dt>Ab Gareth</dt><dd>Meile ${meileText(s)}</dd>
            <dt>Etappe</dt><dd>${etappeText(s)} Meilen</dd>
            <dt>Bauzustand</dt><dd>${bauMarke(s)}</dd>
            <dt>Herkunft</dt><dd>${kanonMarke(s)}</dd>
            <dt>Stimmung</dt><dd>${esc(s.jahreszeit)}</dd>
          </dl>
        </aside>
      </div>
      <nav class="blaettern" aria-label="Weitere Stationen">
        ${vor ? `<a href="#/station/${vor.id}">← ${vor.nr} ${esc(vor.name)}</a>` : `<a href="#/stationen">← Übersicht</a>`}
        ${nach ? `<a href="#/station/${nach.id}">${nach.nr} ${esc(nach.name)} →</a>` : `<a href="#/maechte">Mächte am Weg →</a>`}
      </nav>`;
  }

  function seiteMaechte() {
    const liste = RW.maechte.map(m => `
      <section class="macht" id="macht-${m.id}">
        <h2>${esc(m.name)}</h2>
        <p class="macht-sitz">${esc(m.sitz)} ${m.kanon ? `<span class="marke-kanon">Kanon</span>` : `<span class="marke-eigen">Ergänzung</span>`}</p>
        ${absaetze(m.beschreibung)}
        <p><strong>Was sie wollen:</strong> ${esc(m.will)}</p>
        <p><strong>Wo es reibt:</strong> ${esc(m.konflikt)}</p>
        <div class="meister"><p class="meister-titel">Meisterinformationen</p><p>${esc(m.meister)}</p></div>
      </section>`).join("");
    return `<h1>Mächte am Weg</h1>
      <p class="einleitung">Der Raulsweg gehört der Kaiserin. Verdienen wollen an ihm viele.</p>
      <p>Die folgenden Parteien haben Interessen entlang der Strecke. Keine von ihnen ist einfach gut oder böse, und keine handelt allein. Ausführliche Profile, Figuren und ein Beziehungsnetz folgen in einer späteren Ausbaustufe.</p>
      ${liste}`;
  }

  function seiteBauplan() {
    const liste = RW.ausbaustufen.map(a => `
      <li class="${a.erledigt ? "erledigt" : ""}">
        <span class="stufe-nr">${a.nr}</span>
        <div><h3>${esc(a.titel)}${a.erledigt ? " (vorhanden)" : ""}</h3><p>${esc(a.text)}</p></div>
      </li>`).join("");
    return `<h1>Bauplan des Bandes</h1>
      <p class="einleitung">Wie der Raulsweg selbst ist auch dieser Band eine Baustelle. Diese Stufen sind geplant.</p>
      <ol class="stufen">${liste}</ol>`;
  }

  function seiteFehlt() {
    return `<h1>Diese Seite gibt es nicht</h1><p>Der Weg endet hier. Zurück zur <a href="#/">Titelseite</a> oder zur <a href="#/stationen">Übersicht der Stationen</a>.</p>`;
  }

  /* ---------- Router ---------- */
  function zeigen() {
    const route = location.hash.replace(/^#\/?/, "");
    const [teil, id] = route.split("/");
    let html;
    switch (teil) {
      case "": html = seiteTitel(); break;
      case "ueberblick": case "stationswesen": case "reisen": case "anhang": html = seiteKapitel(teil); break;
      case "stationen": html = seiteStationen(); break;
      case "station": html = seiteStation(id); break;
      case "maechte": html = seiteMaechte(); break;
      case "bauplan": html = seiteBauplan(); break;
      default: html = seiteFehlt();
    }
    main.innerHTML = html;
    bilderAbsichern();
    navMarkieren(route);
    const titelText = main.querySelector("h1")?.textContent || "Der Raulsweg";
    document.title = route ? `${titelText} – Der Raulsweg` : "Der Raulsweg – Quellenband";
    window.scrollTo(0, 0);
    if (route) main.focus({ preventScroll: true });
  }

  baueNavigation();
  window.addEventListener("hashchange", zeigen);
  zeigen();
})();
