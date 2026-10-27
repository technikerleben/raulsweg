"""Stempelheft des Raulswegs als druckbares PDF.

    python3 tools/stempelheft.py

Erzeugt
  export/stempelheft.pdf          16 Seiten A5, zum Lesen oder für den Druckdialog „Broschüre“
  export/stempelheft-a4-bogen.pdf 8 Seiten A4 quer, ausgeschossen: beidseitig (kurze Kante) drucken,
                                   Bögen in der Mitte falten, ineinanderlegen und heften.
"""
import base64
import io
import json
import os
import subprocess

from playwright.sync_api import sync_playwright
from pypdf import PdfReader, PdfWriter, Transformation, PageObject

WURZEL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(WURZEL, "tools", "fonts")
ZIEL = os.path.join(WURZEL, "export")

RW = json.loads(subprocess.check_output(["node", "-e", """
global.window = global;
["stationen", "tempel"].forEach(f => require("./data/" + f + ".js"));
console.log(JSON.stringify({ stationen: RW.stationen, tempel: RW.tempel }));
"""], cwd=WURZEL))

GENITIV = {"Praios": "dem Praios", "Rondra": "der Rondra", "Efferd": "dem Efferd", "Travia": "der Travia", "Boron": "dem Boron",
           "Hesinde": "der Hesinde", "Firun": "dem Firun", "Tsa": "der Tsa", "Phex": "dem Phex", "Peraine": "der Peraine",
           "Ingerimm": "dem Ingerimm", "Rahja": "der Rahja"}

BRAUCH = {
    "nattersquell": "Nach dem ersten Becher Milch, aus der Hand der Wirtin.",
    "hartsteen": "Warm aus der Glut der Gildenesse geprägt.",
    "sonnenfeld": "Nur zur Mittagszeit und nur nach dem Gebet.",
    "rommilyser-kreuz": "Nur nach Sonnenuntergang.",
    "feste-hohenstein": "Erst nach der Kontrolle am Tor.",
    "natterbruecke": "Von der Ältesten der Träger, sicher am anderen Ufer.",
    "mardramund": "Mit einem Satz, den du selbst hineinschreibst: Was hast du auf der Reise gelernt?",
    "wasserburg": "Von Kinderhand gemalt. Jede Eidechse ist anders.",
    "wandlether-hof": "Am Schrein, von eigener Hand.",
    "gnitzenkuhl": "Wer eine Stunde im Garten hilft, bekommt ihn goldgerandet.",
    "gaulsfurt": "Schweigend empfangen.",
    "rabicum": "Beim Fest oder für ein Lied.",
}

# Embleme als Vorzeichnung, je 100 × 100
EMBLEM = {
    "nattersquell": """<path d="M24 68 Q20 54 34 51 L58 51 Q76 51 79 64 Q77 77 55 77 L35 77 Q24 76 24 68 Z"/>
        <path d="M61 52 Q58 36 63 27 Q67 20 72 22 Q76 24 73 29 Q67 35 69 52"/><path d="M73 24 L83 26 L73 29"/>
        <path d="M39 63 Q51 58 63 64"/><path d="M45 77 L43 88 M55 77 L57 88"/><circle cx="70" cy="25" r=".8"/>""",
    "hartsteen": """<path d="M18 50 H82 Q82 56 72 58 H63 V68 H73 V77 H27 V68 H37 V58 H28 Q18 56 18 50 Z"/>
        <rect x="46" y="16" width="24" height="11" rx="1"/><path d="M53 27 L41 45"/>""",
    "sonnenfeld": """<circle cx="50" cy="50" r="16"/>""" + "".join(
        f'<path d="M{50 + 22 * c:.1f} {50 + 22 * s:.1f} L{50 + 34 * c:.1f} {50 + 34 * s:.1f}"/>'
        for c, s in [(__import__("math").cos(a / 6 * 3.14159), __import__("math").sin(a / 6 * 3.14159)) for a in range(12)]),
    "rommilyser-kreuz": """<path d="M70 14 A17 17 0 1 0 87 38 A13 13 0 1 1 70 14 Z"/>
        <path d="M30 86 Q27 62 41 52 L39 37 L46 44 L52 37 L52 52 Q63 62 58 86 Z"/><path d="M58 83 Q80 85 75 65 Q71 75 60 75"/>
        <circle cx="43" cy="47" r=".8"/><circle cx="49" cy="47" r=".8"/>""",
    "feste-hohenstein": "".join(
        f'{"M" if i == 0 else "L"}{50 + (32 if i % 2 == 0 else 25) * __import__("math").cos(i / 16 * 6.2832):.1f} '
        f'{50 + (32 if i % 2 == 0 else 25) * __import__("math").sin(i / 16 * 6.2832):.1f} ' for i in range(32)).join(['<path d="', 'Z"/>'])
        + """<circle cx="50" cy="52" r="16"/><circle cx="44" cy="48" r="1.2"/><circle cx="56" cy="48" r="1.2"/>
        <path d="M46 56 L50 60 L54 56 Z"/><path d="M50 60 V64 M44 64 Q50 68 56 64"/>""",
    "natterbruecke": """<path d="M24 56 Q44 22 74 40 Q69 43 71 49 Q61 41 50 45 Q40 51 33 60 Z"/><path d="M47 33 L51 23 L57 35"/>
        <path d="M24 56 L16 62 L22 50"/><circle cx="66" cy="40" r=".8"/>
        <path d="M12 72 Q22 64 32 72 T52 72 T72 72 T92 72"/><path d="M12 82 Q22 74 32 82 T52 82 T72 82 T92 82"/>""",
    "mardramund": """<path d="M28 86 L72 14"/><path d="M72 14 Q84 30 60 52 Q57 40 72 14 Z"/>
        <path d="M36 78 Q58 72 46 62 Q34 52 56 48 Q74 44 61 34 Q53 28 63 23"/><circle cx="65" cy="22" r="3"/>""",
    "wasserburg": """<path d="M50 14 Q60 30 50 45 Q40 60 50 74 Q57 84 47 92"/><ellipse cx="50" cy="15" rx="5" ry="7"/>
        <path d="M51 30 L38 23 L35 26 M52 30 L65 24 L68 27 M46 56 L34 62 L32 59 M50 56 L63 61 L65 58"/>""",
    "wandlether-hof": """<path d="M50 8 V32 M40 14 L60 26 M60 14 L40 26 M50 8 L46 11 M50 8 L54 11 M50 32 L46 29 M50 32 L54 29"/>
        <path d="M16 82 Q16 62 31 58 Q43 50 60 54 Q70 48 77 54 L85 58 Q87 62 80 64 L76 64 Q76 74 74 82 H66 V72 Q50 74 38 72 V82 H30 V74 Q22 76 16 82 Z"/>""",
    "gnitzenkuhl": """<path d="M40 46 Q34 30 49 26 Q58 24 56 34"/><path d="M54 28 L80 34 L55 32"/>
        <path d="M28 50 Q38 40 60 46 Q73 52 56 60 Q39 62 28 50 Z"/><path d="M28 50 L18 54 L26 46"/>
        <path d="M48 60 V92 M53 60 L61 70 L51 73"/>""",
    "gaulsfurt": """<path d="M71 33 A28 28 0 1 1 61 24"/><circle cx="50" cy="50" r="6"/>
        <path d="M50 22 V44 M50 56 V78 M26 50 H44 M56 50 H70 M33 33 L46 46 M54 54 L67 67 M33 67 L46 54"/>
        <path d="M58 30 L62 38 L57 41 M64 44 L70 38"/>""",
    "rabicum": """<ellipse cx="50" cy="32" rx="15" ry="13"/><path d="M50 32 q6 -4 8 2 q0 8 -10 8 q-10 0 -10 -10 q0 -12 14 -12"/>
        <path d="M50 45 Q47 66 50 92"/><path d="M49 63 Q35 56 33 65 Q42 69 49 63 Z M50 76 Q63 69 67 76 Q58 82 50 76 Z"/>
        <path d="M48 55 L44 53 M51 84 L55 82"/>""",
}
TATZE = """<ellipse cx="50" cy="62" rx="20" ry="17"/><ellipse cx="27" cy="38" rx="6" ry="8"/><ellipse cx="41" cy="30" rx="6" ry="8"/>
    <ellipse cx="59" cy="30" rx="6" ry="8"/><ellipse cx="73" cy="38" rx="6" ry="8"/>
    <path d="M25 29 L23 21 M40 21 L39 13 M60 21 L61 13 M75 29 L77 21"/>"""
KRONE = '<path d="M3 18.5h18v2H3zM3 8l4.5 3.6L12 4l4.5 7.6L21 8l-1.6 9H4.6z"/><circle cx="3" cy="7.2" r="1.4"/><circle cx="12" cy="3.4" r="1.4"/><circle cx="21" cy="7.2" r="1.4"/>'


def schrift(name, datei, stil="normal", gewicht=400):
    with open(os.path.join(FONTS, datei), "rb") as f:
        b = base64.b64encode(f.read()).decode()
    return f"@font-face{{font-family:'{name}';font-style:{stil};font-weight:{gewicht};src:url(data:font/woff2;base64,{b}) format('woff2')}}"


def emblem_svg(inneres, groesse="62mm"):
    return (f'<svg class="vorzeichnung" viewBox="-6 -6 112 112" style="width:{groesse};height:{groesse}">'
            f'<circle cx="50" cy="50" r="53" class="ring"/><g class="linie">{inneres}</g></svg>')


def seite(inhalt, klasse=""):
    return f'<section class="seite {klasse}">{inhalt}</section>'


def baue_html():
    stationen = [s for s in RW["stationen"] if s["typ"] == "station"]
    seiten = []
    # 1 Umschlag
    seiten.append(seite(f"""
      <div class="rahmen">
        <svg class="krone" viewBox="0 0 24 24">{KRONE}</svg>
        <p class="vor">Kaiserliche Kanzlei des Stationswesens</p>
        <h1>Stempelheft</h1>
        <p class="unter">des Raulswegs</p>
        <p class="strecke">Gareth · zwölf Stationen · Perricum</p>
        <div class="feld"><span>Gehört</span></div>
        <div class="feld"><span>Aufgebrochen am</span></div>
        <div class="siegelplatz">Siegel der Kanzlei</div>
      </div>""", "umschlag"))
    # 2 Innenumschlag
    liste = "".join(f"<li><span>{s['nr']}</span>{s['name']}<em>{s['gottheit']}</em></li>" for s in stationen)
    seiten.append(seite(f"""
      <h2>Vom Stempelheft</h2>
      <p>Jede Station des Raulswegs ist einer der Zwölfgötter geweiht, und an jeder Station gibt es einen Stempel mit ihrem Emblem.
      Er wird nicht einfach ausgegeben, sondern verdient: Jede Station hat ihren eigenen Brauch.</p>
      <p>Wer alle zwölf Stempel besitzt, hat den Raulsweg wirklich bereist. Die Kanzlei rät, das Heft trocken zu halten, nicht zu verleihen
      und Siegel der Kanzlei nicht mit Stempeln zu verwechseln.</p>
      <ol class="inhalt">{liste}</ol>
      <p class="klein">Ausgegeben im Auftrag der Kanzlei zu Mardramund. Verlust bitte melden; Ersatz nur gegen Gebühr.</p>
    """, "innen"))
    # 3–14 Stationen
    for s in stationen:
        zusatz = '<div class="schreiblinien"><i></i><i></i><i></i></div>' if s["id"] == "mardramund" else ""
        seiten.append(seite(f"""
          <p class="kopf">Station {s['nr']} · Meile {('~' if s.get('schaetzung') else '') + str(s['meile'])}</p>
          <h2 class="station">{s['name']}</h2>
          <p class="weihe">geweiht {GENITIV.get(s['gottheit'], s['gottheit'])} · {s['emblem']}</p>
          <div class="stempelfeld">{emblem_svg(EMBLEM[s['id']])}</div>
          <p class="brauch">{BRAUCH[s['id']]}</p>
          {zusatz}
          <div class="zeilen"><div class="feld"><span>Tag</span></div><div class="feld"><span>Vermerk</span></div></div>
          <p class="fuss">{s['nr']}</p>
        """, "station-seite"))
    # 15 Sonderstempel
    seiten.append(seite(f"""
      <p class="kopf">Besondere Stempel</p>
      <h2 class="station">Der Bärenstempel</h2>
      <p class="weihe">aus Blitztann, für den Firunsgang</p>
      <div class="stempelfeld klein">{emblem_svg(TATZE, "42mm")}</div>
      <p class="brauch">Allein, zu Fuß und ohne Feuer von Gräfenweiche nach Blitztann. Nur für Einzelreisende.</p>
      <div class="drei">
        <div class="leerfeld"></div><div class="leerfeld"></div>
      </div>
      <p class="klein mitte">Raum für weitere Stempel, Siegel und Andenken</p>
      <p class="fuss">15</p>
    """, "station-seite"))
    # 16 Rückseite
    seiten.append(seite("""
      <h2>Vermerke der Kanzlei</h2>
      <div class="linien">""" + "<i></i>" * 11 + """</div>
      <div class="rueck-fuss">
        <svg class="krone klein" viewBox="0 0 24 24">""" + KRONE + """</svg>
        <p>Der Raulsweg · Gareth – Perricum</p>
      </div>
    """, "innen"))
    css = (schrift("Grenze Gotisch", "grenze-gotisch-latin-700-normal.woff2", gewicht=700)
           + schrift("Alegreya SC", "alegreya-sc-latin-500-normal.woff2", gewicht=500)
           + schrift("Alegreya", "alegreya-latin-400-normal.woff2")
           + schrift("Alegreya", "alegreya-latin-400-italic.woff2", stil="italic") + """
@page { size: 148mm 210mm; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: 'Alegreya', Georgia, serif; color: #1c1712; font-size: 10.5pt; line-height: 1.4; }
.seite { width: 148mm; height: 210mm; padding: 13mm 14mm 12mm; position: relative; page-break-after: always; overflow: hidden; }
.seite:last-child { page-break-after: auto; }
h1, h2 { font-family: 'Grenze Gotisch', serif; font-weight: 700; margin: 0; }
h2 { font-size: 22pt; color: #7a2418; margin-bottom: 4mm; }
p { margin: 0 0 3mm; }
.klein { font-size: 8.5pt; color: #5a4e40; }
.mitte { text-align: center; }
/* Umschlag */
.umschlag .rahmen { border: 1.6pt solid #1c1712; outline: .5pt solid #1c1712; outline-offset: -2.2mm; height: 100%; padding: 14mm 10mm; text-align: center; }
.krone { width: 22mm; height: 22mm; fill: #7a2418; display: block; margin: 0 auto 5mm; }
.krone.klein { width: 9mm; height: 9mm; margin-bottom: 2mm; }
.vor { font-family: 'Alegreya SC', serif; letter-spacing: .6pt; font-size: 9.5pt; }
h1 { font-size: 46pt; line-height: 1; margin: 4mm 0 1mm; }
.unter { font-family: 'Grenze Gotisch', serif; font-size: 22pt; margin-bottom: 6mm; }
.strecke { font-family: 'Alegreya SC', serif; font-size: 10pt; letter-spacing: .8pt; margin-bottom: 14mm; }
.feld { display: flex; align-items: flex-end; gap: 3mm; border-bottom: .6pt solid #1c1712; height: 9mm; margin-bottom: 4mm; text-align: left; }
.feld span { font-family: 'Alegreya SC', serif; font-size: 9pt; white-space: nowrap; padding-bottom: .8mm; }
.siegelplatz { width: 30mm; height: 30mm; border: .6pt dashed #1c1712; border-radius: 50%; margin: 10mm auto 0; display: grid; place-items: center;
  font-family: 'Alegreya SC', serif; font-size: 8pt; color: #5a4e40; padding: 4mm; }
/* Innen */
.inhalt { list-style: none; padding: 0; margin: 4mm 0; columns: 2; column-gap: 6mm; font-size: 10pt; }
.inhalt li { break-inside: avoid; padding: .6mm 0; border-bottom: .3pt dotted #8a7a66; }
.inhalt span { display: inline-block; width: 6mm; font-family: 'Alegreya SC', serif; color: #7a2418; }
.inhalt em { float: right; color: #5a4e40; font-size: 9pt; }
/* Stationsseiten */
.kopf { font-family: 'Alegreya SC', serif; font-size: 9pt; letter-spacing: .6pt; color: #5a4e40; text-align: center; margin-bottom: 1mm; }
h2.station { text-align: center; font-size: 26pt; margin-bottom: 1mm; color: #1c1712; }
.weihe { text-align: center; font-style: italic; color: #5a4e40; margin-bottom: 5mm; }
.stempelfeld { display: grid; place-items: center; margin: 2mm 0 5mm; }
.vorzeichnung .ring { fill: none; stroke: #1c1712; stroke-width: .9; }
.vorzeichnung .linie { fill: none; stroke: #b9b0a3; stroke-width: 1.3; stroke-dasharray: 2.4 2.2; stroke-linecap: round; stroke-linejoin: round; }
.brauch { text-align: center; font-style: italic; font-size: 10.5pt; margin: 0 6mm 5mm; }
.schreiblinien i, .linien i { display: block; border-bottom: .5pt solid #8a7a66; height: 7.5mm; }
.schreiblinien { margin: -2mm 0 4mm; }
.zeilen { position: absolute; left: 14mm; right: 14mm; bottom: 16mm; }
.fuss { position: absolute; bottom: 7mm; left: 0; right: 0; text-align: center; font-family: 'Alegreya SC', serif; font-size: 9pt; color: #5a4e40; margin: 0; }
.drei { display: flex; gap: 6mm; justify-content: center; margin: 2mm 0 2mm; }
.leerfeld { width: 36mm; height: 36mm; border: .6pt dashed #1c1712; border-radius: 3mm; }
.rueck-fuss { position: absolute; bottom: 12mm; left: 0; right: 0; text-align: center; font-family: 'Alegreya SC', serif; font-size: 9pt; color: #5a4e40; }
""")
    return f'<!doctype html><html lang="de"><head><meta charset="utf-8"><style>{css}</style></head><body>{"".join(seiten)}</body></html>'


def ausschiessen(a5_pdf):
    """16 A5-Seiten auf 8 A4-Querseiten für Rückstichheftung."""
    leser = PdfReader(io.BytesIO(a5_pdf))
    n = len(leser.pages)
    assert n % 4 == 0
    w = float(leser.pages[0].mediabox.width)
    h = float(leser.pages[0].mediabox.height)
    schreiber = PdfWriter()
    for blatt in range(n // 4):
        for links, rechts in ((n - 1 - 2 * blatt, 2 * blatt), (2 * blatt + 1, n - 2 - 2 * blatt)):
            bogen = PageObject.create_blank_page(width=2 * w, height=h)
            bogen.merge_transformed_page(leser.pages[links], Transformation().translate(0, 0))
            bogen.merge_transformed_page(leser.pages[rechts], Transformation().translate(w, 0))
            schreiber.add_page(bogen)
    aus = io.BytesIO()
    schreiber.write(aus)
    return aus.getvalue()


def main():
    os.makedirs(ZIEL, exist_ok=True)
    html = baue_html()
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page()
        page.set_content(html, wait_until="load")
        page.wait_for_timeout(300)
        pdf = page.pdf(width="148mm", height="210mm", print_background=True, prefer_css_page_size=True)
        browser.close()
    with open(os.path.join(ZIEL, "stempelheft.pdf"), "wb") as f:
        f.write(pdf)
    with open(os.path.join(ZIEL, "stempelheft-a4-bogen.pdf"), "wb") as f:
        f.write(ausschiessen(pdf))
    print(f"export/stempelheft.pdf ({len(PdfReader(io.BytesIO(pdf)).pages)} Seiten A5), export/stempelheft-a4-bogen.pdf")


if __name__ == "__main__":
    main()
