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
DATEN = ["stationen", "kapitel", "maechte", "figuren", "tempel", "chronik"]

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
    geschaetzt = any(s["nr"] > 0 and s["nr"] <= h["nr"] and s.get("schaetzung") for s in RW["stationen"])
    return ("~" if geschaetzt else "") + str(h["meile"])

def etappe_text(h):
    if h.get("etappe") is None:
        return "–"
    return ("~" if h.get("schaetzung") else "") + str(h["etappe"])

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
    t = re.sub(r"<a [^>]*>(.*?)</a>", r"\1", t, flags=re.S)                   # interne Links entfernen
    t = re.sub(r'<span class="(marke-kanon|marke-eigen|bau[^"]*)">(.*?)</span>', r"[\2]", t)
    t = re.sub(r"<span[^>]*>(.*?)</span>", r"\1", t, flags=re.S)
    t = re.sub(r'<p class="meister-titel">(.*?)</p>', r'<p class="meister-titel"><b>\1</b></p>', t)
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
    return "".join(f"<p><b>{e(g['name'])}:</b> {e(g['text'])}</p>" for g in RW["glossar"])

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

def figur_kurz(f):
    return f"<li><b>{e(f['name'])}</b>, {e(f['rolle'])}. {e(f['kurz'])}</li>"

def tempel_html(t):
    return (f"<h2>{e(t['name'])}</h2>"
            f"<p class=\"leise\">{e(t['art'])} {e(GENITIV.get(t['gottheit'], t['gottheit']))} [{STATUS.get(t['zustand'], t['zustand'])}]</p>"
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
          + f"<p class=\"leise\">Stand: {date.today().strftime('%d.%m.%Y')}. Inoffizielles Fanprojekt zu Das Schwarze Auge.</p>")
    for schluessel in ("ueberblick", "stationswesen", "reisen"):
        seite(f"{schluessel}.xhtml", k[schluessel]["titel"], f"<h1>{e(k[schluessel]['titel'])}</h1>" + kapitel_aufbereiten(k[schluessel]["html"]))

    gareth = ORTE["gareth"]
    seite("gareth.xhtml", "Gareth", f"<h1>Gareth</h1><p class=\"leise\">Ausgangspunkt des Raulswegs, Meile 0</p><p class=\"einleitung\">{e(gareth['kurz'])}</p>{absaetze(gareth.get('beschreibung'))}")

    for s in STATIONEN:
        teile = [f"<h1>{s['nr']} · {e(s['name'])}</h1>",
                 f"<p class=\"leise\">Station {s['nr']}, geweiht {e(s['gottheit'])} · Emblem: {e(s['emblem'])} · Meile {meile_text(s)} (Etappe {etappe_text(s)}) · "
                 f"{STATUS.get(s.get('status'), '')} · {'Kanon' if s.get('kanon') else 'Ergänzung'}</p>"]
        bild = bild_hinzufuegen(f"img/stationen/{s['bild']}", s["bild"], 760)
        if bild:
            teile.append(f'<div class="bild"><img src="{bild}" alt="{e(s["name"])}" style="width:100%"/></div>')
        teile.append(f"<p class=\"einleitung\">{e(s['kurz'])}</p>{absaetze(s.get('beschreibung'))}")
        teile.append(f"<div class=\"vorlese\"><p><b>Zum Vorlesen</b></p>{''.join(f'<p><i>{e(p)}</i></p>' for p in s.get('vorlesetext', []))}</div>")
        teile.append("<h2>Gerüchte am Herdfeuer</h2><ul>" + "".join(f"<li>{e(g)}</li>" for g in s.get("geruechte", [])) + "</ul>")
        teile.append(f"<h2>Was hier brodelt</h2><p>{e(s['konflikt'])}</p>")
        if s.get("meister"):
            teile.append(meister("Meisterinformation", f"<p>{e(s['meister']['hintergrund'])}</p>"))
        if s["id"] in TEMPEL:
            teile.append(tempel_html(TEMPEL[s["id"]]))
        hier = [f for f in FIGUREN if f["station"] == s["id"]]
        if hier:
            teile.append("<h2>Wer hier anzutreffen ist</h2><ul>" + "".join(figur_kurz(f) for f in hier) + "</ul><p class=\"leise\">Ausführlich im Kapitel Figuren.</p>")
        seite(f"station-{s['nr']:02d}.xhtml", f"{s['nr']} {s['name']}", "".join(teile))

    perricum = ORTE["perricum"]
    seite("perricum.xhtml", "Perricum", f"<h1>Perricum</h1><p class=\"leise\">Ziel des Raulswegs, Meile {meile_text(perricum)}</p><p class=\"einleitung\">{e(perricum['kurz'])}</p>{absaetze(perricum.get('beschreibung'))}")

    maechte = ["<h1>Mächte am Weg</h1><p class=\"einleitung\">Der Raulsweg gehört der Kaiserin. Verdienen wollen an ihm viele.</p>"]
    for m in RW["maechte"]:
        figuren = [f["name"] for f in FIGUREN if m["id"] in (f.get("maechte") or [])]
        maechte.append(f"<h2>{e(m['name'])}</h2><p class=\"leise\">{e(m['sitz'])} [{'Kanon' if m.get('kanon') else 'Ergänzung'}]</p>"
                       f"{absaetze(m.get('beschreibung'))}<p><b>Was sie wollen:</b> {e(m['will'])}</p><p><b>Wo es reibt:</b> {e(m['konflikt'])}</p>"
                       + (f"<p><b>Figuren:</b> {e(', '.join(figuren))}</p>" if figuren else "")
                       + meister("Meisterinformation", f"<p>{e(m['meister'])}</p>"))
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

    seite("spielleitung.xhtml", k["spielleitung"]["titel"], f"<h1>{e(k['spielleitung']['titel'])}</h1>" + kapitel_aufbereiten(k["spielleitung"]["html"]))
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
        manifest.append(f'<item id="img{i}" href="{pfad}" media-type="image/jpeg"{eigenschaft}/>')
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
