"""Kleine Zeichenbibliothek für schwarz-weiße Karten und Grundrisse (SVG).

Alle Koordinaten in Pixeln der Zeichenfläche. Pläne rechnen mit einem
Maßstab (Pixel pro Schritt) und rufen die Helfer mit umgerechneten Werten auf.
"""
import base64
import math
import os
import random

HIER = os.path.dirname(os.path.abspath(__file__))
SCHRIFTEN = {
    "Grenze Gotisch": ("grenze-gotisch-latin-700-normal.woff2", "normal", 700),
    "Alegreya SC": ("alegreya-sc-latin-500-normal.woff2", "normal", 500),
    "Alegreya": ("alegreya-latin-400-normal.woff2", "normal", 400),
    "Alegreya Kursiv": ("alegreya-latin-400-italic.woff2", "italic", 400),
}

TINTE = "#1a1a1a"
SKALA = 1.0   # Vergrößerung für Nummern und Beschriftungen (EPUB: größer, damit auf kleinen Bildschirmen lesbar)


def schriften_css():
    regeln = []
    for name, (datei, stil, gewicht) in SCHRIFTEN.items():
        with open(os.path.join(HIER, "fonts", datei), "rb") as f:
            daten = base64.b64encode(f.read()).decode()
        familie = "Alegreya" if name == "Alegreya Kursiv" else name
        regeln.append(f"@font-face{{font-family:'{familie}';font-style:{stil};font-weight:{gewicht};"
                      f"src:url(data:font/woff2;base64,{daten}) format('woff2');}}")
    return "".join(regeln)


def esc(t):
    return str(t).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def f(v):
    """Zahl knapp formatieren."""
    return f"{v:.1f}".rstrip("0").rstrip(".")


DEFS = f"""
<pattern id="schraffur" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
  <line x1="0" y1="0" x2="0" y2="5" stroke="{TINTE}" stroke-width="1"/></pattern>
<pattern id="schraffur-fein" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
  <line x1="0" y1="0" x2="0" y2="4" stroke="{TINTE}" stroke-width=".5"/></pattern>
<pattern id="wasser" width="26" height="11" patternUnits="userSpaceOnUse">
  <path d="M0 5.5 q6.5 -4 13 0 t13 0" fill="none" stroke="{TINTE}" stroke-width=".7"/></pattern>
<pattern id="meer" width="34" height="14" patternUnits="userSpaceOnUse">
  <path d="M2 7 q4 -3 8 0 t8 0" fill="none" stroke="{TINTE}" stroke-width=".7"/>
  <path d="M19 14 q4 -3 8 0" fill="none" stroke="{TINTE}" stroke-width=".7"/></pattern>
<pattern id="pflaster" width="9" height="9" patternUnits="userSpaceOnUse">
  <circle cx="2" cy="2" r=".8" fill="{TINTE}"/><circle cx="6.5" cy="6.5" r=".8" fill="{TINTE}"/></pattern>
<pattern id="feld" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
  <line x1="0" y1="3.5" x2="7" y2="3.5" stroke="{TINTE}" stroke-width=".45"/></pattern>
<pattern id="sumpf" width="28" height="16" patternUnits="userSpaceOnUse">
  <line x1="2" y1="12" x2="12" y2="12" stroke="{TINTE}" stroke-width=".8"/>
  <path d="M7 12 l-2 -5 M7 12 v-6 M7 12 l2 -5" stroke="{TINTE}" stroke-width=".6" fill="none"/>
  <line x1="16" y1="5" x2="25" y2="5" stroke="{TINTE}" stroke-width=".8"/></pattern>
<pattern id="gras" width="22" height="18" patternUnits="userSpaceOnUse">
  <path d="M4 9 l-1.5 -3 M4 9 v-3.5 M4 9 l1.5 -3 M15 17 l-1.5 -3 M15 17 v-3.5 M15 17 l1.5 -3" stroke="{TINTE}" stroke-width=".5" fill="none"/></pattern>
<pattern id="wein" width="10" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-25)">
  <circle cx="5" cy="4.5" r="1.3" fill="none" stroke="{TINTE}" stroke-width=".6"/></pattern>
<pattern id="geruest" width="8" height="8" patternUnits="userSpaceOnUse">
  <path d="M0 0 L8 8 M8 0 L0 8" stroke="{TINTE}" stroke-width=".45"/></pattern>
<pattern id="sand" width="12" height="12" patternUnits="userSpaceOnUse">
  <circle cx="3" cy="4" r=".55" fill="{TINTE}"/><circle cx="9" cy="2" r=".45" fill="{TINTE}"/>
  <circle cx="7" cy="9" r=".55" fill="{TINTE}"/><circle cx="1" cy="10" r=".4" fill="{TINTE}"/></pattern>
"""

STIL = f"""
.t{{font-family:'Alegreya SC','Alegreya',Georgia,serif;font-size:15px;fill:{TINTE}}}
.tk{{font-family:'Alegreya',Georgia,serif;font-style:italic;font-size:15px;fill:{TINTE}}}
.tn{{font-family:'Alegreya',Georgia,serif;font-size:13px;fill:{TINTE};font-weight:400}}
.titel{{font-family:'Grenze Gotisch','Alegreya',Georgia,serif;font-weight:700;fill:{TINTE}}}
.halo{{paint-order:stroke;stroke:#fff;stroke-width:4px;stroke-linejoin:round}}
"""


class Bild:
    def __init__(self, breite, hoehe, titel, untertitel=""):
        self.b, self.h = breite, hoehe
        self.titel, self.untertitel = titel, untertitel
        self.teile = []

    def add(self, s):
        self.teile.append(s)

    # ------------------------------------------------ Grundformen
    def linie(self, pts, w=1, dash=None, farbe=TINTE, cap="round", extra=""):
        d = "M" + " L".join(f"{f(x)} {f(y)}" for x, y in pts)
        da = f' stroke-dasharray="{dash}"' if dash else ""
        self.add(f'<path d="{d}" fill="none" stroke="{farbe}" stroke-width="{f(w)}" stroke-linecap="{cap}" stroke-linejoin="round"{da}{extra}/>')

    def kurve(self, pts, w=1, dash=None, farbe=TINTE, fill="none", geschlossen=False, extra=""):
        d = glatt(pts, geschlossen)
        da = f' stroke-dasharray="{dash}"' if dash else ""
        self.add(f'<path d="{d}" fill="{fill}" stroke="{farbe}" stroke-width="{f(w)}" stroke-linecap="round" stroke-linejoin="round"{da}{extra}/>')

    def flaeche(self, pts, fill, stroke=TINTE, w=1, glatt_=True, dash=None):
        d = glatt(pts, True) if glatt_ else "M" + " L".join(f"{f(x)} {f(y)}" for x, y in pts) + " Z"
        da = f' stroke-dasharray="{dash}"' if dash else ""
        st = f'stroke="{stroke}" stroke-width="{f(w)}"' if stroke else 'stroke="none"'
        self.add(f'<path d="{d}" fill="{fill}" {st}{da}/>')

    def rechteck(self, x, y, b, h, fill="none", stroke=TINTE, w=1, dash=None, rx=0):
        da = f' stroke-dasharray="{dash}"' if dash else ""
        st = f'stroke="{stroke}" stroke-width="{f(w)}"' if stroke else 'stroke="none"'
        self.add(f'<rect x="{f(x)}" y="{f(y)}" width="{f(b)}" height="{f(h)}" rx="{f(rx)}" fill="{fill}" {st}{da}/>')

    def kreis(self, x, y, r, fill="none", stroke=TINTE, w=1, dash=None):
        da = f' stroke-dasharray="{dash}"' if dash else ""
        st = f'stroke="{stroke}" stroke-width="{f(w)}"' if stroke else 'stroke="none"'
        self.add(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{fill}" {st}{da}/>')

    def text(self, x, y, t, klasse="t", groesse=None, anker="middle", drehung=0, halo=True, abstand=None, gewicht=None):
        st = []
        if groesse and klasse != "titel":
            groesse = groesse * SKALA
        if groesse:
            st.append(f"font-size:{f(groesse)}px")
        if abstand:
            st.append(f"letter-spacing:{abstand}px")
        if gewicht:
            st.append(f"font-weight:{gewicht}")
        style = f' style="{";".join(st)}"' if st else ""
        tr = f' transform="rotate({f(drehung)} {f(x)} {f(y)})"' if drehung else ""
        k = klasse + (" halo" if halo else "")
        self.add(f'<text x="{f(x)}" y="{f(y)}" class="{k}" text-anchor="{anker}" dominant-baseline="middle"{style}{tr}>{esc(t)}</text>')

    def text_pfad(self, pts, t, klasse="tk", groesse=16, versatz="50%", abstand=1.5, id_=None):
        id_ = id_ or f"p{len(self.teile)}"
        self.add(f'<path id="{id_}" d="{glatt(pts)}" fill="none" stroke="none"/>')
        self.add(f'<text class="{klasse} halo" style="font-size:{groesse}px;letter-spacing:{abstand}px">'
                 f'<textPath href="#{id_}" startOffset="{versatz}" text-anchor="middle">{esc(t)}</textPath></text>')

    def nummer(self, x, y, n, r=11):
        r = r * SKALA
        self.add(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="#fff" stroke="{TINTE}" stroke-width="1.3"/>')
        self.add(f'<text x="{f(x)}" y="{f(y + .5)}" class="tn" text-anchor="middle" dominant-baseline="middle" style="font-size:{f(r * 1.15)}px">{n}</text>')

    # ------------------------------------------------ Gelände
    def baum(self, x, y, r, rnd):
        n = 7 + int(r) // 4
        pts = []
        for i in range(n):
            a = 2 * math.pi * i / n + rnd.uniform(-.15, .15)
            rr = r * rnd.uniform(.85, 1.05)
            pts.append((x + rr * math.cos(a), y + rr * math.sin(a)))
        d = f"M{f(pts[0][0])} {f(pts[0][1])}"
        for i in range(n):
            p, q = pts[i], pts[(i + 1) % n]
            d += f" A{f(r * .42)} {f(r * .42)} 0 0 1 {f(q[0])} {f(q[1])}"
        self.add(f'<path d="{d}" fill="#fff" stroke="{TINTE}" stroke-width=".9"/>')
        self.add(f'<path d="M{f(x - r * .25)} {f(y + r * .35)} q{f(r * .25)} {f(-r * .3)} {f(r * .5)} 0" fill="none" stroke="{TINTE}" stroke-width=".6"/>')

    def wald(self, poly, r=9, dichte=1.0, saat=1):
        rnd = random.Random(saat)
        xs, ys = [p[0] for p in poly], [p[1] for p in poly]
        punkte = []
        versuche = int((max(xs) - min(xs)) * (max(ys) - min(ys)) / (r * r) * 3 * dichte)
        for _ in range(versuche):
            x, y = rnd.uniform(min(xs), max(xs)), rnd.uniform(min(ys), max(ys))
            if not innen(x, y, poly):
                continue
            if all((x - a) ** 2 + (y - b) ** 2 > (r * 1.45 / dichte ** .5) ** 2 for a, b in punkte):
                punkte.append((x, y))
        for x, y in sorted(punkte, key=lambda p: p[1]):
            self.baum(x, y, r * rnd.uniform(.8, 1.15), rnd)

    def einzelbaum(self, x, y, r=8, saat=3):
        self.baum(x, y, r, random.Random(saat))

    def huegel(self, x, y, b, h=None, w=1):
        """Kleiner Hügel als Bogen mit Schraffen."""
        h = h or b * .45
        self.add(f'<path d="M{f(x - b / 2)} {f(y)} Q{f(x)} {f(y - h * 2)} {f(x + b / 2)} {f(y)}" fill="#fff" stroke="{TINTE}" stroke-width="{f(w)}"/>')
        for i in range(1, 4):
            t = i / 4
            px = x + b / 2 * (t * .9)
            py = y - h * (1 - t * t) * .95
            self.linie([(px, py), (px + b * .05, y - 1)], w=.6)

    def bergland(self, poly, b=34, saat=2, dichte=1.0):
        rnd = random.Random(saat)
        xs, ys = [p[0] for p in poly], [p[1] for p in poly]
        punkte = []
        for _ in range(int(400 * dichte)):
            x, y = rnd.uniform(min(xs), max(xs)), rnd.uniform(min(ys), max(ys))
            if innen(x, y, poly) and all(abs(x - a) > b * .8 or abs(y - c) > b * .45 for a, c in punkte):
                punkte.append((x, y))
        for x, y in sorted(punkte, key=lambda p: p[1]):
            self.huegel(x, y, b * rnd.uniform(.8, 1.2))

    def hang(self, pts, laenge=12, abstand=6, seite=1, w=.7):
        """Böschungsschraffen entlang einer Linie (seite: 1 = rechts der Laufrichtung)."""
        pfad = abtasten(pts, abstand)
        for i, (x, y, nx, ny) in enumerate(pfad):
            l = laenge * (1 if i % 2 == 0 else .55)
            self.linie([(x, y), (x + nx * l * seite, y + ny * l * seite)], w=w)
        self.linie(pts, w=w * 1.4)

    def strasse(self, pts, breite=8, glatt_=True, dash=None):
        d = glatt(pts) if glatt_ else "M" + " L".join(f"{f(x)} {f(y)}" for x, y in pts)
        self.add(f'<path d="{d}" fill="none" stroke="{TINTE}" stroke-width="{f(breite + 2.6)}" stroke-linecap="butt" stroke-linejoin="round"/>')
        da = f' stroke-dasharray="{dash}"' if dash else ""
        self.add(f'<path d="{d}" fill="none" stroke="#fff" stroke-width="{f(breite)}" stroke-linecap="butt" stroke-linejoin="round"{da}/>')

    def strassennetz(self, strassen):
        """Mehrere Straßen mit gemeinsamen Einmündungen: erst alle Ränder, dann alle Fahrbahnen."""
        for pts, breite in strassen:
            self.add(f'<path d="{glatt(pts)}" fill="none" stroke="{TINTE}" stroke-width="{f(breite + 2.6)}" stroke-linecap="butt" stroke-linejoin="round"/>')
        for pts, breite in strassen:
            self.add(f'<path d="{glatt(pts)}" fill="none" stroke="#fff" stroke-width="{f(breite)}" stroke-linecap="butt" stroke-linejoin="round"/>')

    def fluss(self, pts, b0=3, b1=10, schraffur=True):
        """Fluss mit zunehmender Breite als Fläche."""
        links, rechts = [], []
        pfad = abtasten(pts, 8)
        n = len(pfad)
        for i, (x, y, nx, ny) in enumerate(pfad):
            b = (b0 + (b1 - b0) * i / max(1, n - 1)) / 2
            links.append((x + nx * b, y + ny * b))
            rechts.append((x - nx * b, y - ny * b))
        poly = links + rechts[::-1]
        d = "M" + " L".join(f"{f(x)} {f(y)}" for x, y in poly) + " Z"
        self.add(f'<path d="{d}" fill="{"url(#wasser)" if schraffur and b1 > 14 else "#fff"}" stroke="{TINTE}" stroke-width="1.1" stroke-linejoin="round"/>')

    def rahmen(self, titel_breite=None, titel_x=None, titel_y=None, titel_groesse=40, unter_groesse=16):
        """Doppelrahmen und Titelkartusche. Alles davor Gezeichnete wird auf den Rahmen beschnitten."""
        self.rahmen_ab = len(self.teile)
        self.rechteck(10, 10, self.b - 20, self.h - 20, w=2.4)
        self.rechteck(17, 17, self.b - 34, self.h - 34, w=.8)
        if self.titel:
            tb = titel_breite or 520
            tx = titel_x if titel_x is not None else 34
            ty = titel_y if titel_y is not None else 34
            th = 50 + (unter_groesse + 12 if self.untertitel else 0)
            self.rechteck(tx, ty, tb, th, fill="#fff", w=1.6)
            self.rechteck(tx + 5, ty + 5, tb - 10, th - 10, w=.6)
            self.text(tx + tb / 2, ty + 32, self.titel, klasse="titel", groesse=titel_groesse, halo=False)
            if self.untertitel:
                self.text(tx + tb / 2, ty + 62, self.untertitel, klasse="t", groesse=unter_groesse, halo=False, abstand=.6)

    def nordpfeil(self, x, y, r=26, drehung=0):
        g = f'<g transform="rotate({f(drehung)} {f(x)} {f(y)})">'
        g += f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="#fff" stroke="{TINTE}" stroke-width="1"/>'
        g += f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r - 4)}" fill="none" stroke="{TINTE}" stroke-width=".5"/>'
        g += f'<path d="M{f(x)} {f(y - r + 3)} L{f(x + 6)} {f(y)} L{f(x)} {f(y + r - 3)} L{f(x - 6)} {f(y)} Z" fill="#fff" stroke="{TINTE}" stroke-width=".9"/>'
        g += f'<path d="M{f(x)} {f(y - r + 3)} L{f(x + 6)} {f(y)} L{f(x)} {f(y)} Z M{f(x)} {f(y + r - 3)} L{f(x - 6)} {f(y)} L{f(x)} {f(y)} Z" fill="{TINTE}"/>'
        g += "</g>"
        self.add(g)
        wx, wy = x + (r + 13) * math.sin(math.radians(drehung)), y - (r + 13) * math.cos(math.radians(drehung))
        self.text(wx, wy, "N", klasse="t", groesse=16)

    def massstab(self, x, y, px_pro_einheit, schritte, einheit, segment=1):
        """Maßstabsleiste mit abwechselnden Feldern."""
        for i, v in enumerate(range(0, schritte, segment)):
            self.rechteck(x + v * px_pro_einheit, y, segment * px_pro_einheit, 6,
                          fill=TINTE if i % 2 == 0 else "#fff", w=.8)
        for v in range(0, schritte + 1, segment * (2 if schritte / segment > 6 else 1)):
            self.text(x + v * px_pro_einheit, y - 9, str(v), klasse="tn", groesse=12)
        self.text(x + schritte * px_pro_einheit + 8, y + 3, einheit, klasse="tk", groesse=13, anker="start")

    def svg(self):
        ab = getattr(self, "rahmen_ab", len(self.teile))
        inhalt = (f'<clipPath id="innen"><rect x="18" y="18" width="{self.b - 36}" height="{self.h - 36}"/></clipPath>'
                  f'<g clip-path="url(#innen)">' + "\n".join(self.teile[:ab]) + "</g>\n" + "\n".join(self.teile[ab:]))
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.b} {self.h}" width="{self.b}" height="{self.h}">\n'
                f'<title>{esc(self.titel)}</title>\n'
                f'<defs><style>{schriften_css()}{STIL}</style>{DEFS}</defs>\n'
                f'<rect width="{self.b}" height="{self.h}" fill="#fff"/>\n{inhalt}\n</svg>\n')


# ------------------------------------------------ Grundriss-Helfer
class Grundriss:
    """Wände, Türen, Fenster in Schritt-Koordinaten (1 Schritt = s Pixel), versetzt um (ox, oy)."""

    def __init__(self, bild, s, ox, oy):
        self.b, self.s, self.ox, self.oy = bild, s, ox, oy

    def P(self, x, y):
        return self.ox + x * self.s, self.oy + y * self.s

    def mauer_rechteck(self, x, y, b, h, d=.8, zustand="fertig", innen="#fff"):
        """Ein Gebäude als Mauerring. zustand: fertig | rohbau | geplant."""
        X, Y = self.P(x, y)
        B, H, D = b * self.s, h * self.s, d * self.s
        if zustand == "geplant":
            self.b.rechteck(X, Y, B, H, fill="none", w=1.1, dash="7 5")
            return
        aussen = f"M{f(X)} {f(Y)} h{f(B)} v{f(H)} h{f(-B)} Z"
        inn = f"M{f(X + D)} {f(Y + D)} v{f(H - 2 * D)} h{f(B - 2 * D)} v{f(-(H - 2 * D))} Z"
        if innen:
            self.b.rechteck(X + D, Y + D, B - 2 * D, H - 2 * D, fill=innen, stroke=None)
        fill = TINTE if zustand == "fertig" else "url(#schraffur)"
        self.b.add(f'<path d="{aussen} {inn}" fill="{fill}" fill-rule="evenodd" stroke="{TINTE}" stroke-width="{".6" if zustand == "fertig" else "1"}"/>')

    def wand(self, x1, y1, x2, y2, d=.4, zustand="fertig"):
        A, B = self.P(x1, y1), self.P(x2, y2)
        if zustand == "geplant":
            self.b.linie([A, B], w=1.1, dash="7 5", cap="butt")
        elif zustand == "rohbau":
            self.b.linie([A, B], w=d * self.s + 1.6, cap="square")
            self.b.add(f'<path d="M{f(A[0])} {f(A[1])} L{f(B[0])} {f(B[1])}" stroke="#fff" stroke-width="{f(d * self.s - .6)}" stroke-linecap="square"/>')
            self.b.add(f'<path d="M{f(A[0])} {f(A[1])} L{f(B[0])} {f(B[1])}" stroke="url(#schraffur)" stroke-width="{f(d * self.s - .6)}" stroke-linecap="square"/>')
        else:
            self.b.linie([A, B], w=d * self.s, cap="square")

    def tuer(self, x, y, breite=1.2, richtung="h", d=.8, aufschlag=1, tor=False):
        """Öffnung in einer Wand. richtung h: Wand läuft waagerecht; Mittelpunkt (x, y)."""
        X, Y = self.P(x, y)
        Bt, D = breite * self.s, d * self.s + 2
        if richtung == "h":
            self.b.rechteck(X - Bt / 2, Y - D / 2, Bt, D, fill="#fff", stroke=None)
            self.b.linie([(X - Bt / 2, Y - D / 2), (X - Bt / 2, Y + D / 2)], w=.8, cap="butt")
            self.b.linie([(X + Bt / 2, Y - D / 2), (X + Bt / 2, Y + D / 2)], w=.8, cap="butt")
            if not tor:
                sy = aufschlag * Bt
                self.b.add(f'<path d="M{f(X - Bt / 2)} {f(Y)} l0 {f(sy)} A{f(Bt)} {f(Bt)} 0 0 {0 if aufschlag > 0 else 1} {f(X + Bt / 2)} {f(Y)}" fill="none" stroke="{TINTE}" stroke-width=".55"/>')
        else:
            self.b.rechteck(X - D / 2, Y - Bt / 2, D, Bt, fill="#fff", stroke=None)
            self.b.linie([(X - D / 2, Y - Bt / 2), (X + D / 2, Y - Bt / 2)], w=.8, cap="butt")
            self.b.linie([(X - D / 2, Y + Bt / 2), (X + D / 2, Y + Bt / 2)], w=.8, cap="butt")
            if not tor:
                sx = aufschlag * Bt
                self.b.add(f'<path d="M{f(X)} {f(Y - Bt / 2)} l{f(sx)} 0 A{f(Bt)} {f(Bt)} 0 0 {1 if aufschlag > 0 else 0} {f(X)} {f(Y + Bt / 2)}" fill="none" stroke="{TINTE}" stroke-width=".55"/>')

    def fenster(self, x, y, breite=1.4, richtung="h", d=.8):
        X, Y = self.P(x, y)
        Bt, D = breite * self.s, d * self.s
        if richtung == "h":
            self.b.rechteck(X - Bt / 2, Y - D / 2, Bt, D, fill="#fff", w=.6)
            self.b.linie([(X - Bt / 2, Y), (X + Bt / 2, Y)], w=.6, cap="butt")
        else:
            self.b.rechteck(X - D / 2, Y - Bt / 2, D, Bt, fill="#fff", w=.6)
            self.b.linie([(X, Y - Bt / 2), (X, Y + Bt / 2)], w=.6, cap="butt")

    def treppe(self, x, y, b, h, stufen=7, richtung="h"):
        X, Y = self.P(x, y)
        B, H = b * self.s, h * self.s
        self.b.rechteck(X, Y, B, H, fill="#fff", w=.7)
        for i in range(1, stufen):
            if richtung == "h":
                xx = X + B * i / stufen
                self.b.linie([(xx, Y), (xx, Y + H)], w=.5, cap="butt")
            else:
                yy = Y + H * i / stufen
                self.b.linie([(X, yy), (X + B, yy)], w=.5, cap="butt")
        if richtung == "h":
            self.b.linie([(X + 3, Y + H / 2), (X + B - 5, Y + H / 2)], w=.7)
            self.b.add(f'<path d="M{f(X + B - 9)} {f(Y + H / 2 - 3)} L{f(X + B - 4)} {f(Y + H / 2)} L{f(X + B - 9)} {f(Y + H / 2 + 3)}" fill="none" stroke="{TINTE}" stroke-width=".7"/>')
        else:
            self.b.linie([(X + B / 2, Y + H - 3), (X + B / 2, Y + 5)], w=.7)
            self.b.add(f'<path d="M{f(X + B / 2 - 3)} {f(Y + 9)} L{f(X + B / 2)} {f(Y + 4)} L{f(X + B / 2 + 3)} {f(Y + 9)}" fill="none" stroke="{TINTE}" stroke-width=".7"/>')

    def tisch(self, x, y, b, h, baenke=True, rund=False):
        X, Y = self.P(x, y)
        B, H = b * self.s, h * self.s
        if rund:
            self.b.kreis(X + B / 2, Y + H / 2, min(B, H) / 2, fill="#fff", w=.7)
            return
        self.b.rechteck(X, Y, B, H, fill="#fff", w=.7)
        if baenke:
            if B >= H:
                self.b.rechteck(X + 2, Y - .45 * self.s, B - 4, .3 * self.s, fill="#fff", w=.5)
                self.b.rechteck(X + 2, Y + H + .15 * self.s, B - 4, .3 * self.s, fill="#fff", w=.5)
            else:
                self.b.rechteck(X - .45 * self.s, Y + 2, .3 * self.s, H - 4, fill="#fff", w=.5)
                self.b.rechteck(X + B + .15 * self.s, Y + 2, .3 * self.s, H - 4, fill="#fff", w=.5)

    def bett(self, x, y, b=1, h=2):
        X, Y = self.P(x, y)
        B, H = b * self.s, h * self.s
        self.b.rechteck(X, Y, B, H, fill="#fff", w=.6)
        self.b.rechteck(X + 1.5, Y + 1.5, B - 3, H * .22, fill="#fff", w=.45)

    def kiste(self, x, y, b=.8, h=.8):
        X, Y = self.P(x, y)
        B, H = b * self.s, h * self.s
        self.b.rechteck(X, Y, B, H, fill="#fff", w=.6)
        self.b.linie([(X, Y), (X + B, Y + H)], w=.4)
        self.b.linie([(X + B, Y), (X, Y + H)], w=.4)

    def regal(self, x, y, b, h):
        X, Y = self.P(x, y)
        self.b.rechteck(X, Y, b * self.s, h * self.s, fill="url(#schraffur-fein)", w=.7)

    def flaeche(self, x, y, b, h, fill, w=0, dash=None):
        X, Y = self.P(x, y)
        self.b.rechteck(X, Y, b * self.s, h * self.s, fill=fill, stroke=TINTE if w else None, w=w, dash=dash)

    def stall(self, x, y, b, h, boxen, richtung="h"):
        """Pferdeboxen entlang einer Wand."""
        X, Y = self.P(x, y)
        B, H = b * self.s, h * self.s
        for i in range(1, boxen):
            if richtung == "h":
                xx = X + B * i / boxen
                self.b.linie([(xx, Y), (xx, Y + H)], w=.8, cap="butt")
            else:
                yy = Y + H * i / boxen
                self.b.linie([(X, yy), (X + B, yy)], w=.8, cap="butt")
        if richtung == "h":
            self.b.linie([(X, Y + H), (X + B, Y + H)], w=.6, dash="3 2", cap="butt")
        else:
            self.b.linie([(X + B, Y), (X + B, Y + H)], w=.6, dash="3 2", cap="butt")

    def brunnen(self, x, y, r=1.1):
        X, Y = self.P(x, y)
        self.b.kreis(X, Y, r * self.s, fill="#fff", w=1.6)
        self.b.kreis(X, Y, r * self.s * .6, fill="url(#wasser)", w=.7)

    def herd(self, x, y, b=1.6, h=1.2):
        X, Y = self.P(x, y)
        self.b.rechteck(X, Y, b * self.s, h * self.s, fill=TINTE, w=.6)
        self.b.kreis(X + b * self.s / 2, Y + h * self.s / 2, min(b, h) * self.s * .28, fill="#fff", stroke=None)

    def altar(self, x, y, b=1.4, h=.7):
        X, Y = self.P(x, y)
        self.b.rechteck(X, Y, b * self.s, h * self.s, fill="#fff", w=1.1)
        self.b.rechteck(X + 2, Y + 2, b * self.s - 4, h * self.s - 4, fill=TINTE, stroke=None)

    def nummer(self, x, y, n):
        X, Y = self.P(x, y)
        self.b.nummer(X, Y, n)

    def text(self, x, y, t, **kw):
        X, Y = self.P(x, y)
        self.b.text(X, Y, t, **kw)


# ------------------------------------------------ Geometrie
def glatt(pts, geschlossen=False):
    """Catmull-Rom → kubische Bézierkurven."""
    if len(pts) < 3:
        return "M" + " L".join(f"{f(x)} {f(y)}" for x, y in pts) + (" Z" if geschlossen else "")
    p = list(pts)
    if geschlossen:
        p = [pts[-1]] + list(pts) + [pts[0], pts[1]]
    else:
        p = [pts[0]] + list(pts) + [pts[-1]]
    d = f"M{f(p[1][0])} {f(p[1][1])}"
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i - 1], p[i], p[i + 1], p[i + 2]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C{f(c1[0])} {f(c1[1])} {f(c2[0])} {f(c2[1])} {f(p2[0])} {f(p2[1])}"
    return d + (" Z" if geschlossen else "")


def catmull_punkte(pts, n=10):
    if len(pts) < 3:
        return list(pts)
    p = [pts[0]] + list(pts) + [pts[-1]]
    aus = []
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i - 1], p[i], p[i + 1], p[i + 2]
        for k in range(n):
            t = k / n
            t2, t3 = t * t, t * t * t
            aus.append(tuple(.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2
                                   + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3) for j in (0, 1)))
    aus.append(pts[-1])
    return aus


def abtasten(pts, abstand):
    """Punkte in festem Abstand entlang einer geglätteten Linie, mit Normalen."""
    dicht = catmull_punkte(pts, 16)
    aus = []
    rest = 0
    for i in range(len(dicht) - 1):
        (x1, y1), (x2, y2) = dicht[i], dicht[i + 1]
        l = math.hypot(x2 - x1, y2 - y1)
        if l == 0:
            continue
        nx, ny = -(y2 - y1) / l, (x2 - x1) / l
        t = rest
        while t < l:
            aus.append((x1 + (x2 - x1) * t / l, y1 + (y2 - y1) * t / l, nx, ny))
            t += abstand
        rest = t - l
    return aus


def innen(x, y, poly):
    drin = False
    j = len(poly) - 1
    for i in range(len(poly)):
        xi, yi = poly[i]
        xj, yj = poly[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi + 1e-9) + xi:
            drin = not drin
        j = i
    return drin
