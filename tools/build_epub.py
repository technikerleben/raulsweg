#!/usr/bin/env python3
"""
Erzeugt eine EPUB-Fassung des Quellenbands „Der Raulsweg“ aus den Daten in data/*.js.

Optimiert für den Xteink X4 Pro (E-Ink, Graustufen, kleiner Bildschirm):
- mimetype unkomprimiert als erste Datei im ZIP
- nur <div>, <p>, <h1>-<h3>, <ul>, <b>, <i>, <img> – keine HTML5-Struktur-Elemente, keine <span>
- Bilder in Graustufen als JPEG, Breite per style="width:…" (Breiten-Attribute werden ignoriert)
- Überschriften fast schwarz, keine Hintergrundfarben
- Tabellen werden zu Listen, weil sie auf dem kleinen Bildschirm schlecht lesbar sind

Aufruf (im Hauptverzeichnis des Repos):  python3 tools/build_epub.py
Ergebnis: export/der-raulsweg.epub
Benötigt: node (zum Lesen der Daten), Pillow
"""
import html
import io
import json
import os
import re
import subprocess
import sys
import uuid
import zipfile
from datetime import date
from xml.dom import minidom

from PIL import Image, ImageDraw, ImageFont, ImageOps

WURZEL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ZIEL = os.path.join(WURZEL, "export", "der-raulsweg.epub")
DATEN = ["stationen", "kapitel", "maechte", "figuren", "tempel", "chronik", "karten", "wegpunkte", "dokumente", "spielhilfen"]

# ---------------------------------------------------------------- Daten laden
def daten_laden():
    js = "const vm=require('vm'),fs=require('fs'),p=require('path');const c={};c.window=c;vm.createContext(c);" \
         + "".join(f"vm.runInContext(fs.readFileSync(p.join({json.dumps(WURZEL)},'data','{n}.js'),'utf8'),c);" for n in DATEN) \
         + "process.stdout.write(JSON.stringify(c.RW));"
    return json.loads(subprocess.check_output(["node", "-e", js]))

RW = daten_laden()
STATIONEN = [s for s in RW["stationen"] if s["typ"] == "station"]
ORTE = {s["id"]: s for s in RW["stationen"] if s["typ"] == "stadt"}
FIGUREN = RW.get("figuren", [])
TEMPEL = {t["station"]: t for t in RW.get("tempel", [])}
GENITIV = {"Praios": "des Praios", "Rondra": "der Rondra", "Efferd": "des Efferd", "Travia": "der Travia",
           "Boron": "des Boron", "Hesinde": "der Hesinde", "Firun": "des Firun", "Tsa": "der Tsa",
           "Phex": "des Phex", "Peraine": "der Peraine", "Ingerimm": "des Ingerimm", "Rahja": "der Rahja"}
STATUS = {"fertig": "fertig", "erweiterung": "Erweiterung", "rohbau": "Rohbau"}

e = lambda t: html.escape(str(t or ""), quote=False)
absaetze = lambda liste: "".join(f"<p>{e(p)}</p>" for p in (liste or []))

def meile_text(h):
    return ("~" if h.get("schaetzung") else "") + str(h["meile"])

def etappe_text(h):
    vor = next((s for s in RW["stationen"] if s["nr"] == h["nr"] - 1), {})
    return ("~" if h.get("schaetzung") or vor.get("schaetzung") else "") + str(h["etappe"])

def meister(titel, inhalt):
    return f'<div class="meister"><p class="meister-titel"><b>{e(titel)}</b></p>{inhalt}</div>'

# ---------------------------------------------------------------- Bilder
BILDER = {}   # Pfad im EPUB -> Bytes

def bild_laden(basis):
    for endung in ("webp", "jpg", "jpeg", "png"):
        pfad = os.path.join(WURZEL, basis + "." + endung)
        if os.path.exists(pfad):
            return Image.open(pfad)
    return None

def bild_hinzufuegen(quelle, name, breite, hoehe=None):
    """Graustufen-JPEG erzeugen, gibt den Pfad im EPUB zurück oder None."""
    img = bild_laden(quelle)
    if img is None:
        return None
    img = ImageOps.exif_transpose(img).convert("L")
    if hoehe:
        img = ImageOps.fit(img, (breite, hoehe), Image.LANCZOS, centering=(0.5, 0.35))
    else:
        img = img.resize((breite, round(img.height * breite / img.width)), Image.LANCZOS)
    img = ImageOps.autocontrast(img, cutoff=1)
    puffer = io.BytesIO()
    img.save(puffer, "JPEG", quality=72, optimize=True, progressive=False)
    pfad = f"images/{name}.jpg"
    BILDER[pfad] = puffer.getvalue()
    return pfad

def karte_hinzufuegen(karte, breite=1300):
    """Plan mit größeren Nummern neu zeichnen, mit Chromium rastern, hochkant drehen, als Graustufen-PNG ablegen."""
    import sys as _sys
    from playwright.sync_api import sync_playwright
    _sys.path.insert(0, os.path.join(WURZEL, "tools"))
    import karten as _karten
    import karten_lib as _lib
    _lib.SKALA = 1.7
    svg = _karten.KARTEN[karte["id"]]().svg()
    _lib.SKALA = 1.0
    import re as _re
    w, h = map(int, _re.search(r'viewBox="0 0 (\d+) (\d+)"', svg).groups())
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        seite_ = browser.new_page(viewport={"width": w, "height": h}, device_scale_factor=breite / w)
        seite_.set_content(f'<html><body style="margin:0">{svg}</body></html>')
        seite_.wait_for_timeout(200)
        png = seite_.screenshot(clip={"x": 0, "y": 0, "width": w, "height": h})
        browser.close()
    img = Image.open(io.BytesIO(png)).convert("L")
    if img.width > img.height:
        img = img.rotate(90, expand=True)
    img = img.quantize(16).convert("L")
    puffer = io.BytesIO()
    img.save(puffer, "PNG", optimize=True)
    pfad = f"images/karte-{karte['id']}.png"
    BILDER[pfad] = puffer.getvalue()
    return pfad

def karte_html(karte, ueberschrift="h2"):
    pfad = karte_hinzufuegen(karte)
    teile = [f"<{ueberschrift}>{e(karte['titel'])}</{ueberschrift}>",
             f'<div class="bild"><img src="{pfad}" alt="{e(karte["titel"])}" style="width:100%"/></div>',
             f"<p class=\"leise\">{e(karte['art'])} · {e(karte.get('massstab', ''))}</p>",
             f"<p>{e(karte['kurz'])}</p>"]
    if karte.get("legende"):
        teile.append("".join(f"<p><b>{n}</b> {e(name)}{('. ' + e(text)) if text else ''}</p>" for n, name, text in karte["legende"]))
    teile.append("<p class=\"leise\">Der Plan ist zum Lesen gedreht.</p>")
    ansichten = []
    for n in range(1, 13):
        basis = f"img/gebaeude/{karte['id']}" + ("" if n == 1 else f"-{n}")
        pfad_b = bild_hinzufuegen(basis, f"gebaeude-{karte['id']}-{n}", 760)
        if not pfad_b:
            break
        ansichten.append(f'<div class="bild"><img src="{pfad_b}" alt="Ansicht {n}" style="width:100%"/></div>')
    if ansichten:
        teile.append("<h3>Ansichten</h3><p class=\"leise\">Die Bilder ergänzen den Plan und müssen ihm nicht in allen Einzelheiten entsprechen.</p>" + "".join(ansichten))
    return "".join(teile)

def titelbild_erzeugen():
    """Hochkant-Cover 600 × 800: Ausschnitt des Titelbilds oben, Titel unten."""
    breite, hoehe = 600, 800
    cover = Image.new("L", (breite, hoehe), 245)
    quelle = bild_laden("img/titel")
    if quelle is not None:
        ausschnitt = ImageOps.fit(ImageOps.exif_transpose(quelle).convert("L"), (breite, 520), Image.LANCZOS, centering=(0.5, 0.5))
        cover.paste(ImageOps.autocontrast(ausschnitt, cutoff=1), (0, 0))
    zeichnen = ImageDraw.Draw(cover)
    def schrift(groesse, fett=False):
        for name in (("DejaVuSerif-Bold.ttf" if fett else "DejaVuSerif.ttf"),):
            for ordner in ("/usr/share/fonts/truetype/dejavu", "/Library/Fonts", "C:/Windows/Fonts"):
                pfad = os.path.join(ordner, name)
                if os.path.exists(pfad):
                    return ImageFont.truetype(pfad, groesse)
        return ImageFont.load_default()
    def mittig(text, y, f, farbe=15):
        w = zeichnen.textbbox((0, 0), text, font=f)[2]
        zeichnen.text(((breite - w) / 2, y), text, font=f, fill=farbe)
    zeichnen.line([(60, 548), (540, 548)], fill=40, width=2)
    mittig("Der Raulsweg", 568, schrift(58, True))
    mittig("Ein Quellenband zur neuen Kaiserstraße", 655, schrift(22))
    mittig("von Gareth nach Perricum", 685, schrift(22))
    zeichnen.line([(60, 735), (540, 735)], fill=40, width=2)
    mittig("Das Schwarze Auge · Fanprojekt", 750, schrift(18), 70)
    puffer = io.BytesIO()
    cover.save(puffer, "JPEG", quality=80)
    BILDER["images/cover.jpg"] = puffer.getvalue()

# ---------------------------------------------------------------- Kapitel-HTML aufbereiten
def kapitel_aufbereiten(roh):
    t = roh
    t = t.replace('<div id="streckenband-platz"></div>', "")
    t = t.replace('<div id="entfernungen-platz"></div>', entfernungsliste())
    t = t.replace('<div id="reisezeiten-platz"></div>', reisezeitenliste())
    t = t.replace('<div id="glossar-platz"></div>', glossarliste())
    def abbildung(m):
        pfad = bild_hinzufuegen(m.group(1), "kapitel-" + os.path.basename(m.group(1)), 760)
        return (f'<div class="bild"><img src="{pfad}" alt="{m.group(2)}" style="width:100%"/></div><p class="leise">{m.group(3)}</p>' if pfad else "")
    t = re.sub(r'<figure[^>]*>\s*<img src="(img/[^"]+?)\.\w+" alt="([^"]*)"[^>]*>\s*<figcaption>(.*?)</figcaption>\s*</figure>', abbildung, t, flags=re.S)
    t = re.sub(r"<a [^>]*>(.*?)</a>", r"\1", t, flags=re.S)                   # interne Links entfernen
    t = re.sub(r'<span class="(marke-kanon|marke-eigen|bau[^"]*)">(.*?)</span>', r"[\2]", t)
    t = re.sub(r"<span[^>]*>(.*?)</span>", r"\1", t, flags=re.S)
    t = re.sub(r'<p class="meister-titel">(.*?)</p>', r'<p class="meister-titel"><b>\1</b></p>', t)
    t = re.sub(r"<br\s*>", "<br/>", t)
    t = t.replace("<strong>", "<b>").replace("</strong>", "</b>").replace("<em>", "<i>").replace("</em>", "</i>")
    return t

def entfernungsliste():
    zeilen = []
    for h in RW["stationen"]:
        name = e(h["name"])
        if h["typ"] == "stadt":
            zeilen.append(f"<li><b>{name}</b>, Meile {meile_text(h)}" + (f", Etappe {etappe_text(h)}" if h.get("etappe") else "") + "</li>")
        else:
            zeilen.append(f"<li><b>{h['nr']} {name}</b> ({e(h['gottheit'])}), Meile {meile_text(h)}, Etappe {etappe_text(h)}</li>")
    return "<ul>" + "".join(zeilen) + "</ul><p class=\"leise\">~ = geschätzte Entfernung</p>"

def reisezeitenliste():
    return "<ul>" + "".join(f"<li><b>{e(r['art'])}:</b> {e(r['proTag'])} Meilen pro Tag, {e(r['dauer'])}</li>" for r in RW["reisezeiten"]) + "</ul>"

def glossarliste():
    return "".join(f"<p><b>{e(g['name'])}:</b> {e(g['text'])}</p>" for g in sorted(RW["glossar"], key=lambda g: g["name"]))

# ---------------------------------------------------------------- Seiten
SEITEN = []   # (dateiname, titel, xhtml-body)

def seite(datei, titel, body):
    SEITEN.append((datei, titel, body))

CHRONIK = RW.get("chronik", [])

def geltend(schluessel):
    gilt = {}
    for c in CHRONIK:
        for x in c.get("enthuellt") or []:
            if x.get("ziel") == schluessel and x.get("variante"):
                gilt[x["variante"].upper()] = c
    return gilt

def varianten(liste, schluessel=None):
    gilt = geltend(schluessel) if schluessel else {}
    teile = []
    for i, v in enumerate(liste):
        b = chr(65 + i)
        zusatz = f" <i>(gilt laut Chronik: {e(gilt[b]['titel'])})</i>" if b in gilt else ""
        teile.append(f"<p><b>{b}</b> {e(v)}{zusatz}</p>")
    return "".join(teile)

def ziel_name(ziel):
    art, _, i = ziel.partition(":")
    quellen = {"figur": FIGUREN, "tempel": RW.get("tempel", []), "macht": RW["maechte"], "station": RW["stationen"], "ort": RW["stationen"]}
    treffer = next((x for x in quellen.get(art, []) if x["id"] == i), None)
    return treffer["name"] if treffer else ziel

def chronik_html():
    teile = ["<h1>Chronik des Raulswegs</h1><p class=\"einleitung\">Was die Runde am Raulsweg erlebt hat. Was hier steht, gilt für alle, die danach leiten.</p>"]
    if not CHRONIK:
        teile.append("<p><i>Noch ist keine Geschichte eingetragen.</i></p>")
    for c in reversed(CHRONIK):
        zeile = " · ".join(x for x in [c.get("spielleitung") and f"geleitet von {e(c['spielleitung'])}", c.get("gespielt") and f"gespielt am {e(c['gespielt'])}", c.get("aventurisch") and e(c["aventurisch"])] if x)
        teile.append(f"<h2>{e(c['titel'])}</h2><p class=\"leise\">{zeile}</p>")
        if c.get("orte"):
            teile.append(f"<p><b>Wo:</b> {e(', '.join(ziel_name('station:' + i) for i in c['orte']))}</p>")
        if c.get("figuren"):
            teile.append(f"<p><b>Wer:</b> {e(', '.join(ziel_name('figur:' + i) for i in c['figuren']))}</p>")
        teile.append(absaetze(c.get("zusammenfassung")))
        for titel, feld in (("Enthüllt", "enthuellt"), ("Was sich verändert hat", "veraenderungen")):
            if c.get(feld):
                teile.append(f"<h3>{titel}</h3><ul>" + "".join(
                    f"<li><b>{e(ziel_name(x['ziel']))}{(' (Möglichkeit ' + x['variante'].upper() + ')') if x.get('variante') else ''}:</b> {e(x['text'])}</li>" for x in c[feld]) + "</ul>")
        for titel, feld in (("Neu am Weg", "neu"), ("Lose Fäden", "offen")):
            if c.get(feld):
                teile.append(f"<h3>{titel}</h3><ul>" + "".join(f"<li>{e(x)}</li>" for x in c[feld]) + "</ul>")
        if c.get("meister"):
            teile.append(meister("Meisterinformation", f"<p>{e(c['meister'])}</p>"))
    return "".join(teile)

def spielhilfen_html():
    sh = RW.get("spielhilfen")
    if not sh:
        return "<h1>Spielhilfen</h1>"
    w = lambda t: f"<i>{e(t)}</i>"
    teile = ["<h1>Spielhilfen</h1><p class=\"einleitung\">Wer einem begegnet, was man sich erzählt, wie das Wetter wird und wie die Leute heißen. Alle Tabellen mit einem W20.</p>",
             "<h2>Zufallsbegegnungen</h2><p>Für Morgen, Mittag, Abend und Nacht je einen W6. Bei einer 1 (im dichten Verkehr bei Gareth und vor Perricum bei 1 oder 2) kommt es zu einer Begegnung, dann W20 auf der Tabelle des Abschnitts. Wer in einer Station übernachtet, würfelt für die Nacht nicht. Die Wendungen sind Möglichkeiten für die Spielleitung.</p>"]
    for a in sh["abschnitte"]:
        st = ", ".join(f"{x['nr']} {x['name']}" for x in RW["stationen"] if x["id"] in a["stationen"])
        teile.append(f"<h3>{e(a['name'])}</h3><p class=\"leise\">Meile {a['meilen'][0]} bis {a['meilen'][1]} · {e(st)}</p><p>{e(a['kurz'])}</p><ol>"
                     + "".join(f"<li><b>{e(b['titel'])}.</b> {e(b['text'])}" + (f"<br/>{w('Wendung: ' + b['wendung'])}" if b.get("wendung") else "") + "</li>" for b in a["begegnungen"]) + "</ol>")
    teile.append("<h2>Gerüchte am Weg</h2><ol>" + "".join(f"<li>»{e(g['text'])}«" + (f"<br/>{w(g['meister'])}" if g.get("meister") else "") + "</li>" for g in sh["geruechte"]) + "</ol>")
    teile.append("<h2>Wetter</h2><p>Ein W20 am Morgen.</p>")
    for z in sh["wetter"]:
        teile.append(f"<h3>{e(z['name'])}</h3><p class=\"leise\">{e(z['monde'])}</p><ul>"
                     + "".join(f"<li><b>{r['von'] if r['von'] == r['bis'] else str(r['von']) + '–' + str(r['bis'])}: {e(r['wetter'])}.</b> {e(r['folge'])}</li>" for r in z["tabelle"]) + "</ul>")
    n = sh["namen"]
    teile.append("<h2>Namen und Eigenheiten</h2>")
    for titel, k in (("Vornamen, Männer", "maenner"), ("Vornamen, Frauen", "frauen"), ("Familiennamen", "familien"), ("Tulamidisch, Männer", "tulamidischM"),
                     ("Tulamidisch, Frauen", "tulamidischW"), ("Herbergen", "herbergen"), ("Waren der Händler", "waren"), ("Wer noch unterwegs ist", "reisende"), ("Eigenheiten", "eigenheiten")):
        teile.append(f"<h3>{titel}</h3><p>" + " · ".join(f"<b>{i}</b> {e(x)}" for i, x in enumerate(n.get(k, []), 1)) + "</p>")
    return "".join(teile)

def figur_kurz(f):
    return f"<li><b>{e(f['name'])}</b>, {e(f['rolle'])}. {e(f['kurz'])}</li>"

def weg_html(h):
    """Wegpunkte der Etappe, die an diesem Halt beginnt."""
    nach = next((x for x in RW["stationen"] if x["nr"] == h["nr"] + 1), None)
    if not nach:
        return ""
    liste = sorted((w for w in RW.get("wegpunkte", []) if w["nach"] == nach["id"]), key=lambda w: w["meile"])
    teile = [f"<h2>Auf dem Weg nach {e(nach['name'])}</h2><p class=\"leise\">{etappe_text(nach)} Meilen bis zur nächsten Station.</p>"]
    for w in liste:
        zusatz = f", abseits der Straße: {e(w['abseits'])}" if w.get("abseits") else ""
        teile.append(f"<h3>{e(w['name'])}</h3><p class=\"leise\">{e(w['art'])}, Meile {w['meile']}{zusatz}</p><p>{e(w['kurz'])}</p>{absaetze(w.get('beschreibung'))}<p><b>Am Weg:</b> {e(w['szene'])}</p>"
                     + (meister("Meisterinformation", f"<p>{e(w['meister'])}</p>") if w.get("meister") else ""))
    if not liste:
        teile.append("<p>Auf dieser kurzen Etappe gibt es keinen eigenen Halt.</p>")
    return "".join(teile)

def tempel_bild(t):
    pfad = bild_hinzufuegen(f"img/tempel/{t['id']}", f"tempel-{t['id']}", 760)
    return f'<div class="bild"><img src="{pfad}" alt="{e(t["name"])}" style="width:100%"/></div><p class="leise">Stimmungsbild: {e(t["name"])}</p>' if pfad else ""

def tempel_html(t):
    return (f"<h2>{e(t['name'])}</h2>"
            f"<p class=\"leise\">{e(t['art'])} {e(GENITIV.get(t['gottheit'], t['gottheit']))} [{STATUS.get(t['zustand'], t['zustand'])}]</p>"
            + tempel_bild(t) +
            f"{absaetze(t.get('beschreibung'))}"
            f"<p><b>Brauch:</b> {e(t['brauch'])}</p>"
            f"<p><b>Stempel:</b> {e(t['stempel'])}</p>"
            f"<p><b>Dienste:</b> {e(t['dienste'])}</p>"
            f"<p><b>Gehütet von:</b> {e(t['geweihte'])}</p>"
            f"<p><b>Was schwelt:</b> {e(t['spannung'])}</p>"
            + meister("Meisterinformation", f"<p>{e(t['meister'])}</p>"
                       + (f"<p><b>Mögliche Wahrheiten</b></p>{varianten(t['moeglichkeiten'], 'tempel:' + t['id'])}" if t.get("moeglichkeiten") else "")))

def baue_seiten():
    k = RW["kapitel"]
    seite("einleitung.xhtml", "Einleitung",
          "<h1>Der Raulsweg</h1>"
          f"<p class=\"leise\">{e(RW['titel']['untertitel'])}</p>"
          + kapitel_aufbereiten(RW["titel"]["einleitung"]).replace(
              "Mit dem Schalter oben rechts lassen sich Meisterinformationen einblenden.",
              "Meisterinformationen stehen in umrandeten Kästen.")
          + f"<p class=\"leise\">Stand: {date.today().strftime('%d.%m.%Y')}. Inoffizielles Fanprojekt zu Das Schwarze Auge. Texte, Karten und Bilder sind mit KI erzeugt und gelten als gemeinfrei; die Marken und Inhalte von Das Schwarze Auge gehören der Ulisses Spiele GmbH.</p>")
    for schluessel in ("ueberblick", "stationswesen", "reisen"):
        seite(f"{schluessel}.xhtml", k[schluessel]["titel"], f"<h1>{e(k[schluessel]['titel'])}</h1>" + kapitel_aufbereiten(k[schluessel]["html"]))

    gareth = ORTE["gareth"]
    seite("gareth.xhtml", "Gareth", f"<h1>Gareth</h1><p class=\"leise\">Ausgangspunkt des Raulswegs, Meile 0</p><p class=\"einleitung\">{e(gareth['kurz'])}</p>{absaetze(gareth.get('beschreibung'))}" + weg_html(gareth))

    for s in STATIONEN:
        teile = [f"<h1>{s['nr']} · {e(s['name'])}</h1>",
                 f"<p class=\"leise\">Station {s['nr']}, geweiht {e(s['gottheit'])} · Emblem: {e(s['emblem'])} · Meile {meile_text(s)} (Etappe {etappe_text(s)}) · "
                 f"{STATUS.get(s.get('status'), '')} · {'Kanon' if s.get('kanon') else 'Ergänzung'}</p>"]
        bild = bild_hinzufuegen(f"img/stationen/{s['bild']}", s["bild"], 760)
        if bild:
            teile.append(f'<div class="bild"><img src="{bild}" alt="{e(s["name"])}" style="width:100%"/></div><p class="leise">Stimmungsbild: {e(s.get("jahreszeit", ""))}</p>')
        teile.append(f"<p class=\"einleitung\">{e(s['kurz'])}</p>{absaetze(s.get('beschreibung'))}")
        teile.append(f"<div class=\"vorlese\"><p><b>Zum Vorlesen</b></p>{''.join(f'<p><i>{e(p)}</i></p>' for p in s.get('vorlesetext', []))}</div>")
        teile.append("<h2>Gerüchte am Herdfeuer</h2><ul>" + "".join(f"<li>{e(g)}</li>" for g in s.get("geruechte", [])) + "</ul>")
        teile.append(f"<h2>Was hier brodelt</h2><p>{e(s['konflikt'])}</p>")
        if s.get("meister"):
            teile.append(meister("Meisterinformation", f"<p>{e(s['meister']['hintergrund'])}</p>"))
        for karte in [c for c in RW.get("karten", []) if c.get("station") == s["id"]]:
            teile.append(karte_html(dict(karte, titel="Plan: " + karte["titel"])))
        if s["id"] in TEMPEL:
            teile.append(tempel_html(TEMPEL[s["id"]]))
        hier = [f for f in FIGUREN if f["station"] == s["id"]]
        if hier:
            teile.append("<h2>Wer hier anzutreffen ist</h2><ul>" + "".join(figur_kurz(f) for f in hier) + "</ul><p class=\"leise\">Ausführlich im Kapitel Figuren.</p>")
        teile.append(weg_html(s))
        seite(f"station-{s['nr']:02d}.xhtml", f"{s['nr']} {s['name']}", "".join(teile))

    perricum = ORTE["perricum"]
    seite("perricum.xhtml", "Perricum", f"<h1>Perricum</h1><p class=\"leise\">Ziel des Raulswegs, Meile {meile_text(perricum)}</p><p class=\"einleitung\">{e(perricum['kurz'])}</p>{absaetze(perricum.get('beschreibung'))}")

    allgemein = [c for c in RW.get("karten", []) if not c.get("station")]
    if allgemein:
        seite("karten.xhtml", "Karten und Pläne", "<h1>Karten und Pläne</h1><p class=\"einleitung\">Die Strecke im Überblick und eine Station nach dem Edikt. Die Pläne der Schauplätze stehen bei den Stationen.</p>"
              + "".join(karte_html(c) for c in allgemein))
    BEZ = {"buendnis": "Bündnis", "geschaeft": "Geschäft", "rivalitaet": "Rivalität", "misstrauen": "Misstrauen"}
    MNAME = {m["id"]: m["name"] for m in RW["maechte"]}
    beziehungen = RW.get("beziehungen", [])
    maechte = ["<h1>Mächte am Weg</h1><p class=\"einleitung\">Der Raulsweg gehört der Kaiserin. Verdienen wollen an ihm viele.</p>"
               "<p>Keine dieser Parteien ist einfach gut oder böse, und keine handelt allein. Die Beziehungen stehen bei jeder Macht; was sich dahinter abspielen könnte, steht in den Meisterinformationen, als Möglichkeiten, nicht als Wahrheit.</p>"]
    for m in RW["maechte"]:
        figuren = [f["name"] for f in FIGUREN if m["id"] in (f.get("maechte") or [])]
        stationen = [f"{x['nr']} {x['name']}" for x in RW["stationen"] if x["id"] in (m.get("stationen") or [])]
        doks = [d["titel"] for d in RW.get("dokumente", []) if d["id"] in (m.get("dokumente") or [])]
        bez = [(b, b["b"] if b["a"] == m["id"] else b["a"]) for b in beziehungen if m["id"] in (b["a"], b["b"])]
        maechte.append(f"<h2>{e(m['name'])}</h2><p class=\"leise\">{e(m['sitz'])} [{'Kanon' if m.get('kanon') else 'Ergänzung'}]</p>"
                       + (f"<p><i>{e(m['haltung'])}</i></p>" if m.get("haltung") else "")
                       + f"{absaetze(m.get('beschreibung'))}<p><b>Was sie wollen:</b> {e(m['will'])}</p><p><b>Wo es reibt:</b> {e(m['konflikt'])}</p>"
                       + (f"<p><b>Womit sie wirken:</b></p><ul>{''.join(f'<li>{e(x)}</li>' for x in m['mittel'])}</ul>" if m.get("mittel") else "")
                       + (f"<p><b>Wer für sie spricht:</b> {e(m['vertreter'])}</p>" if m.get("vertreter") else "")
                       + (f"<p class=\"einleitung\"><i>»{e(m['stimme'])}«</i></p>" if m.get("stimme") else "")
                       + (f"<p><b>Wie man mit ihnen umgeht:</b> {e(m['hebel'])}</p>" if m.get("hebel") else "")
                       + (f"<p><b>Am Weg:</b> {e(', '.join(stationen))}</p>" if stationen else "")
                       + (f"<p><b>Figuren:</b> {e(', '.join(figuren))}</p>" if figuren else "")
                       + (f"<p><b>Dokument:</b> {e(', '.join(doks))}</p>" if doks else "")
                       + (f"<p><b>Beziehungen</b></p><ul>{''.join(f'<li><b>{BEZ[b[0]['art']]}</b> mit {e(MNAME[b[1]])}: {e(b[0]['text'])}</li>' for b in bez)}</ul>" if bez else "")
                       + meister("Meisterinformation", f"<p>{e(m['meister'])}</p>"
                                 + (f"<p><b>Was hinter den Kulissen laufen könnte</b></p>{varianten(m['moeglichkeiten'], 'macht:' + m['id'])}" if m.get("moeglichkeiten") else "")))
    seite("maechte.xhtml", "Mächte am Weg", "".join(maechte))

    figuren = ["<h1>Figuren</h1><p class=\"einleitung\">Die Menschen, denen Reisende auf dem Raulsweg begegnen. Jede Figur hat ein Motiv und drei mögliche Geheimnisse.</p>"]
    for f in FIGUREN:
        st = next((x for x in RW["stationen"] if x["id"] == f["station"]), None)
        ort = f"{st['nr']} {st['name']}" if st and st["typ"] == "station" else (st["name"] if st else "unterwegs auf der ganzen Strecke")
        portraet = bild_hinzufuegen(f"img/figuren/{f.get('bild') or f['id']}", "figur-" + f["id"], 320, 400)
        figuren.append(f"<h2>{e(f['name'])}</h2>")
        if portraet:
            figuren.append(f'<div class="portraet"><img src="{portraet}" alt="{e(f["name"])}" style="width:40%"/></div>')
        figuren.append(f"<p class=\"leise\">{e(f['rolle'])} · {e(ort)}</p><p class=\"einleitung\">{e(f['kurz'])}</p>"
                       f"<p><b>Erscheinung:</b> {e(f['aussehen'])}</p><p><b>Auftreten:</b> {e(f['auftreten'])}</p>"
                       f"<p><b>Antrieb:</b> {e(f['motiv'])}</p><p class=\"zitat\"><i>»{e(f['zitat'])}«</i></p>"
                       + meister("Mögliche Geheimnisse", varianten(f["geheimnisse"], "figur:" + f["id"]) + "<p><i>Wähle eines, verbinde sie oder erfinde ein eigenes.</i></p>"))
    seite("figuren.xhtml", "Figuren", "".join(figuren))

    if RW.get("dokumente"):
        teile = ["<h1>Dokumente</h1><p class=\"einleitung\">Was am Raulsweg ausgehängt, verlesen und abgeschrieben wird.</p>"]
        for d in RW["dokumente"]:
            teile.append(f"<h2>{e(d['titel'])}</h2><p class=\"leise\">{e(d['art'])} · {e(d['herkunft'])}</p>" + kapitel_aufbereiten(d["text"]))
        seite("dokumente.xhtml", "Dokumente", "".join(teile))
    seite("spielleitung.xhtml", k["spielleitung"]["titel"], f"<h1>{e(k['spielleitung']['titel'])}</h1>" + kapitel_aufbereiten(k["spielleitung"]["html"]))
    seite("spielhilfen.xhtml", "Spielhilfen", spielhilfen_html())
    seite("chronik.xhtml", "Chronik des Raulswegs", chronik_html())
    seite("anhang.xhtml", "Anhang", f"<h1>{e(k['anhang']['titel'])}</h1>" + kapitel_aufbereiten(k["anhang"]["html"]))
    stufen = "".join(f"<li><b>{a['nr']} {e(a['titel'])}</b>{' (vorhanden)' if a.get('erledigt') else ''}: {e(a['text'])}</li>" for a in RW["ausbaustufen"])
    seite("bauplan.xhtml", "Bauplan des Bandes", f"<h1>Bauplan des Bandes</h1><ul>{stufen}</ul>")

# ---------------------------------------------------------------- EPUB zusammensetzen
CSS = """body { font-family: serif; line-height: 1.45; margin: 0 2%; }
h1 { color: #111111; font-size: 1.6em; margin: 0.6em 0 0.4em; line-height: 1.2; }
h2 { color: #111111; font-size: 1.25em; margin: 1.2em 0 0.3em; border-bottom: 1px solid #000000; }
p { margin: 0 0 0.6em; text-align: left; }
p.einleitung { font-size: 1.08em; }
p.leise { font-size: 0.85em; }
div.bild, div.portraet { margin: 0.6em 0; text-align: center; }
div.vorlese { border-left: 3px solid #000000; padding-left: 0.6em; margin: 0.8em 0; }
div.meister { border: 2px solid #000000; padding: 0.4em 0.6em; margin: 0.8em 0; }
p.meister-titel { margin-bottom: 0.3em; }
p.zitat { margin-left: 1em; }
ul { margin: 0 0 0.8em 1.2em; padding: 0; }
li { margin-bottom: 0.3em; }
"""

def xhtml(titel, body):
    return ('<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n'
            '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="de" xml:lang="de">\n'
            f'<head><meta charset="utf-8"/><title>{e(titel)}</title><link rel="stylesheet" type="text/css" href="style.css"/></head>\n'
            f'<body>{body}</body></html>')

def bauen():
    titelbild_erzeugen()
    baue_seiten()
    kennung = "urn:uuid:" + str(uuid.uuid5(uuid.NAMESPACE_URL, "raulsweg-quellenband"))
    dateien = {}
    dateien["OEBPS/style.css"] = CSS
    dateien["OEBPS/cover.xhtml"] = xhtml("Titel", '<div class="bild"><img src="images/cover.jpg" alt="Der Raulsweg" style="width:100%"/></div>')
    for datei, titel, body in SEITEN:
        dateien[f"OEBPS/{datei}"] = xhtml(titel, body)

    # Wohlgeformtheit prüfen
    for name, inhalt in dateien.items():
        if name.endswith(".xhtml"):
            try:
                minidom.parseString(inhalt.encode("utf-8"))
            except Exception as fehler:
                sys.exit(f"Fehlerhaftes XHTML in {name}: {fehler}")

    nav_eintraege = "".join(f'<li><a href="{d}">{e(t)}</a></li>' for d, t, _ in SEITEN)
    dateien["OEBPS/nav.xhtml"] = ('<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n'
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="de" xml:lang="de">'
        '<head><meta charset="utf-8"/><title>Inhalt</title></head><body>'
        f'<nav epub:type="toc" id="toc"><h1>Inhalt</h1><ol>{nav_eintraege}</ol></nav></body></html>')
    ncx_punkte = "".join(f'<navPoint id="n{i}" playOrder="{i}"><navLabel><text>{e(t)}</text></navLabel><content src="{d}"/></navPoint>'
                         for i, (d, t, _) in enumerate(SEITEN, start=1))
    dateien["OEBPS/toc.ncx"] = ('<?xml version="1.0" encoding="utf-8"?>\n<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">'
        f'<head><meta name="dtb:uid" content="{kennung}"/></head><docTitle><text>Der Raulsweg</text></docTitle>'
        f'<navMap>{ncx_punkte}</navMap></ncx>')

    manifest = ['<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>',
                '<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>',
                '<item id="css" href="style.css" media-type="text/css"/>',
                '<item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>']
    for i, pfad in enumerate(BILDER):
        eigenschaft = ' properties="cover-image"' if pfad == "images/cover.jpg" else ""
        manifest.append(f'<item id="img{i}" href="{pfad}" media-type="{'image/png' if pfad.endswith('.png') else 'image/jpeg'}"{eigenschaft}/>')
    spine = ['<itemref idref="cover"/>']
    for i, (datei, _, _) in enumerate(SEITEN):
        manifest.append(f'<item id="s{i}" href="{datei}" media-type="application/xhtml+xml"/>')
        spine.append(f'<itemref idref="s{i}"/>')
    cover_id = f"img{list(BILDER).index('images/cover.jpg')}"
    dateien["OEBPS/content.opf"] = ('<?xml version="1.0" encoding="utf-8"?>\n'
        '<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid" xml:lang="de">'
        '<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">'
        f'<dc:identifier id="bookid">{kennung}</dc:identifier><dc:title>Der Raulsweg</dc:title><dc:language>de</dc:language>'
        '<dc:creator>Christoph Wegemann</dc:creator><dc:subject>Das Schwarze Auge</dc:subject>'
        f'<meta property="dcterms:modified">{date.today().isoformat()}T00:00:00Z</meta><meta name="cover" content="{cover_id}"/>'
        f'</metadata><manifest>{"".join(manifest)}</manifest><spine toc="ncx">{"".join(spine)}</spine></package>')
    container = ('<?xml version="1.0" encoding="utf-8"?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">'
                 '<rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>')

    os.makedirs(os.path.dirname(ZIEL), exist_ok=True)
    with zipfile.ZipFile(ZIEL, "w") as z:
        z.writestr(zipfile.ZipInfo("mimetype"), "application/epub+zip", compress_type=zipfile.ZIP_STORED)
        z.writestr("META-INF/container.xml", container, compress_type=zipfile.ZIP_DEFLATED)
        for name, inhalt in dateien.items():
            z.writestr(name, inhalt, compress_type=zipfile.ZIP_DEFLATED)
        for pfad, daten in BILDER.items():
            z.writestr(f"OEBPS/{pfad}", daten, compress_type=zipfile.ZIP_STORED)
    print(f"{ZIEL}: {os.path.getsize(ZIEL) // 1024} KB, {len(SEITEN)} Kapitel, {len(BILDER)} Bilder")

if __name__ == "__main__":
    bauen()
