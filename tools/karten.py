"""Erzeugt die schwarz-weißen Karten und Pläne unter img/karten/*.svg.

    python3 tools/karten.py            alle
    python3 tools/karten.py strecke    nur eine
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from karten_lib import Bild, Grundriss, TINTE  # noqa: E402

WURZEL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ZIEL = os.path.join(WURZEL, "img", "karten")


# ====================================================================== Streckenkarte
def strecke():
    """Karte nach avesmaps.de (Lage der Orte und Flüsse gemessen, Gelände vereinfacht)."""
    import math
    import json
    import subprocess
    import strecke_geo as geo
    k = Bild(1600, 1000, "Der Raulsweg", "Von Gareth nach Perricum · nach avesmaps.de, Gelände vereinfacht")
    M = 17.0
    T = lambda p: (70 + (p[0] - 549.0) * M, 95 + (540.0 - p[1]) * M)
    TT = lambda pts: [T(p) for p in pts]

    # Stationen aus den Daten, erfundene Orte zwischen ihren Nachbarn eingepasst
    daten = json.loads(subprocess.check_output(["node", "-e",
        'global.window=global;require("./data/stationen.js");console.log(JSON.stringify(window.RW.stationen))'], cwd=WURZEL))
    pos = {}
    anker = [s for s in daten if s["id"] in geo.ORTE]
    pts = geo.punkte()
    bogen = [0.0]
    for a, b in zip(pts, pts[1:]):
        bogen.append(bogen[-1] + math.dist(a, b))
    idx = {p: i for i, p in enumerate(geo.VERLAUF) if isinstance(p, str)}
    def punkt_bei(b):
        for i in range(len(pts) - 1):
            if bogen[i + 1] >= b:
                t = (b - bogen[i]) / max(1e-9, bogen[i + 1] - bogen[i])
                return (pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t)
        return pts[-1]
    for s in daten:
        if s["id"] in geo.ORTE:
            pos[s["id"]] = geo.ORTE[s["id"]]
            continue
        vor = max((a for a in anker if a["meile"] < s["meile"]), key=lambda a: a["meile"])
        nach = min((a for a in anker if a["meile"] > s["meile"]), key=lambda a: a["meile"])
        f_ = (s["meile"] - vor["meile"]) / (nach["meile"] - vor["meile"])
        pos[s["id"]] = punkt_bei(bogen[idx[vor["id"]]] + f_ * (bogen[idx[nach["id"]]] - bogen[idx[vor["id"]]]))
    P = {s["id"]: T(pos[s["id"]]) for s in daten}

    # --- Meer
    kueste = TT([(632.5, 540), (633.2, 528), (632.4, 519), (633.5, 512), (632.0, 508.6), (631.8, 506.5), (633.0, 503),
                 (632.2, 498), (633.6, 492)])
    k.flaeche(kueste + [(1600, 1000), (1600, 0)], fill="url(#meer)", w=1.6, glatt_=True)
    k.text(*T((636.5, 516)), "Golf von Perricum", klasse="tk", groesse=19, drehung=-90, abstand=3)

    # --- Gelände
    k.bergland(TT([(616, 538), (628, 538), (631, 528), (624, 519), (614, 522), (611, 530)]), b=32, saat=4, dichte=.9)
    k.text(*T((622, 531)), "T R O L L Z A C K E N", klasse="t", groesse=17, abstand=4, drehung=28)
    k.bergland(TT([(583, 503), (596, 506), (600, 499), (592, 494.5), (582, 495)]), b=30, saat=5, dichte=.9)
    k.bergland(TT([(586.6, 533.6), (588.6, 533.2), (588.9, 532.5), (586.8, 532.6)]), b=24, saat=6, dichte=1.5)
    k.wald(TT([(575, 534.4), (580.5, 534.0), (582.5, 533.0), (578, 531.6), (574.5, 532.3)]), r=8, saat=11)
    k.text(*T((578.5, 531.0)), "Natternwald", klasse="tk", groesse=13)
    k.wald(TT([(599.5, 520.8), (603.5, 519.0), (604.6, 516.0), (604.3, 512.0), (601.5, 512.5), (599.0, 516.5)]), r=9, saat=12)
    k.wald(TT([(607.6, 520.0), (612, 520.5), (613, 514), (610.5, 509), (607.5, 510.5)]), r=9, saat=13)
    k.wald(TT([(600.5, 510.5), (605.0, 510.8), (605.4, 504.5), (602.5, 502.6), (599.8, 506.0)]), r=9, saat=14)
    k.wald(TT([(607.0, 511.0), (611.0, 510.5), (611.6, 505.6), (608.6, 504.3), (607.0, 507.0)]), r=9, saat=15)
    k.text(*T((602.0, 501.6)), "Wandlether Forst", klasse="tk", groesse=14)
    k.flaeche(TT([(578, 538.0), (583.5, 538.2), (584.5, 536.6), (579, 536.4)]), fill="url(#feld)", stroke=None)
    k.flaeche(TT([(608.5, 501.6), (614.5, 501.4), (615, 499.8), (609, 499.6)]), fill="url(#sumpf)", stroke=None)
    k.text(*T((612, 499.2)), "Sumpf", klasse="tk", groesse=13)
    k.flaeche(TT([(614.4, 504.4), (616.6, 504.6), (616.8, 503.6), (614.6, 503.5)]), fill="url(#wasser)", w=1)
    k.flaeche(TT([(623, 503.0), (626.5, 504.4), (627.2, 503.4), (624, 502.2)]), fill="url(#wein)", stroke=None)
    k.flaeche(TT([(561.3, 537.6), (563.0, 537.8), (563.1, 536.6), (561.5, 536.5)]), fill="url(#wasser)", w=1)
    k.text(*T((562.2, 535.9)), "Krähensee", klasse="tk", groesse=12)
    k.text(*T((560, 528.4)), "G A R E T I E N", klasse="t", groesse=28, abstand=9, halo=False)
    k.text(*T((612, 539.0)), "R O M M I L Y S E R   M A R K", klasse="t", groesse=18, abstand=5, halo=False)
    k.text(*T((611.0, 497.0)), "P E R R I C U M E R", klasse="t", groesse=18, abstand=5, halo=False)
    k.text(*T((611.0, 495.6)), "L A N D", klasse="t", groesse=18, abstand=5, halo=False)

    # --- Flüsse
    k.fluss(TT(geo.DARPAT), b0=6, b1=15)
    k.text_pfad(TT([(598.9, 538.8), (599.2, 532.8)]), "Darpat", groesse=16, abstand=3)
    k.text_pfad(TT([(611, 504.3), (616, 503.9)]), "Darpat", groesse=16, abstand=4)
    k.fluss(TT(geo.NATTER), b0=3, b1=8, schraffur=False)
    k.text_pfad(TT([(564.5, 530.0), (568, 530.6)]), "Natter", groesse=15, abstand=3)

    # --- Straßen
    netz = [(TT([geo.ORTE["rommilyser-kreuz"], (592.5, 536.2), geo.ORTE["rommilys"]]), 5),
            (TT([geo.ORTE["feste-hohenstein"], geo.ORTE["rabenbruecke"], (589.2, 532.6), (592.15, 532.65), (595.512, 530.146)]), 3),
            (TT([pos["wandlether-hof"], (605.4, 505.3), (604.8, 505.0), geo.ORTE["blitztann"]]), 3.5),
            (TT([pos["gaulsfurt"], (620.6, 497.5), (621.5, 493.0)]), 3.5),
            (TT([(549.0, 533.4), geo.ORTE["gareth"]]), 5)]
    k.strassennetz(netz + [(TT(geo.punkte()), 8)])
    k.text(*T((593.5, 537.0)), "Feidewaldstraße", klasse="tk", groesse=12)
    k.text(*T((620.4, 495.0)), "Kronstraße nach Zorgan", klasse="tk", groesse=13, anker="end")

    # --- Städte und Stationen
    def stadt(x, y, r):
        k.kreis(x, y, r, fill="#fff", w=2)
        k.kreis(x, y, r - 5, fill="url(#schraffur-fein)", w=.8)
        for i in range(12):
            a = i * math.pi / 6
            k.rechteck(x + (r + 2) * math.cos(a) - 2.5, y + (r + 2) * math.sin(a) - 2.5, 5, 5, fill=TINTE, stroke=None)
    stadt(*P["gareth"], 20)
    stadt(*P["perricum"], 18)
    stadt(*T(geo.ORTE["rommilys"]), 13)
    k.text(P["gareth"][0], P["gareth"][1] - 42, "Gareth", klasse="t", groesse=26, abstand=1.5)
    k.text(P["perricum"][0] - 34, P["perricum"][1] - 38, "Perricum", klasse="t", groesse=24, abstand=1.5)
    X, Y = T(geo.ORTE["rommilys"])
    k.text(X + 20, Y - 22, "Rommilys", klasse="t", groesse=19, anker="start")
    X, Y = T(geo.ORTE["blitztann"])
    k.kreis(X, Y, 4.5, fill="#fff", w=1.4)
    k.text(X - 8, Y - 14, "Blitztann", klasse="tk", groesse=13, anker="end")
    lage = {"nattersquell": (0, -30), "hartsteen": (0, -30), "sonnenfeld": (0, 32), "rommilyser-kreuz": (-6, -48),
            "feste-hohenstein": (-62, 30), "natterbruecke": (62, 26), "mardramund": (70, 6), "wandlether-hof": (84, -4),
            "wasserburg": (-66, 0), "gnitzenkuhl": (0, 32), "gaulsfurt": (-4, 32), "rabicum": (-6, 34)}
    zeilen = {"rommilyser-kreuz": ["Rommilyser", "Kreuz"], "feste-hohenstein": ["Feste", "Hohenstein"]}
    for s in daten:
        if s["typ"] != "station":
            continue
        x, y = P[s["id"]]
        k.nummer(x, y, s["nr"], r=13)
        dx, dy = lage[s["id"]]
        for i, z in enumerate(zeilen.get(s["id"], [s["name"]])):
            k.text(x + dx, y + dy + i * 18, z, klasse="t", groesse=16)

    # --- Legende, Maßstab, Norden
    lx, ly = 40, 800
    k.rechteck(lx, ly, 330, 160, fill="#fff", w=1.2)
    k.text(lx + 165, ly + 20, "Zeichenerklärung", klasse="t", groesse=16)
    k.strasse([(lx + 18, ly + 50), (lx + 70, ly + 50)], breite=8, glatt_=False)
    k.text(lx + 84, ly + 50, "Raulsweg (Reichsstraße 3)", klasse="tk", groesse=14, anker="start", halo=False)
    k.strasse([(lx + 18, ly + 78), (lx + 70, ly + 78)], breite=3.5, glatt_=False)
    k.text(lx + 84, ly + 78, "Andere Straße", klasse="tk", groesse=14, anker="start", halo=False)
    k.nummer(lx + 44, ly + 106, 5, r=11)
    k.text(lx + 84, ly + 106, "Station mit Nummer", klasse="tk", groesse=14, anker="start", halo=False)
    k.kreis(lx + 44, ly + 134, 11, fill="url(#schraffur-fein)", w=1.6)
    k.text(lx + 84, ly + 134, "Stadt", klasse="tk", groesse=14, anker="start", halo=False)
    k.massstab(1080, 940, M / geo.MEILEN_PRO_EINHEIT, 50, "Meilen", segment=10)
    k.nordpfeil(1430, 870)
    k.rahmen(titel_breite=600, titel_x=40, titel_y=40, titel_groesse=46)
    return k


# ====================================================================== Musterstation
def musterstation():
    k = Bild(1200, 960, "Musterstation", "Station nach dem Stationsedikt · Erdgeschoss")
    g = Grundriss(k, 9.5, 145, 150)
    # Hofpflaster
    g.flaeche(0, 0, 96, 72, "url(#pflaster)")
    # Straße davor
    y0 = g.P(0, 79)[1]
    k.strasse([(30, y0), (1170, y0)], breite=40, glatt_=False)
    k.flaeche([(32, y0 - 19), (1168, y0 - 19), (1168, y0 + 19), (32, y0 + 19)], fill="url(#sand)", stroke=None, glatt_=False)
    k.text(980, y0 + 1, "R A U L S W E G", klasse="t", groesse=17, abstand=4)
    k.text(270, y0 + 1, "← nach Gareth", klasse="tk", groesse=15)
    k.text(1080, y0 - 40, "nach Perricum →", klasse="tk", groesse=15)
    # Umfassungsmauer
    g.mauer_rechteck(0, 0, 96, 72, d=1.3, innen=None)
    g.tuer(48, 71.35, breite=5, richtung="h", d=1.3, tor=True)
    g.mauer_rechteck(41, 63, 5, 8.4, d=.6)                     # Torwache
    g.tuer(43.5, 63.3, breite=1.2, richtung="h", d=.6, aufschlag=-1)

    # Kaiserpfalz
    g.mauer_rechteck(20, 4, 46, 22, d=1)
    g.mauer_rechteck(65, 4, 13, 32, d=1)                       # Gästeflügel
    g.wand(46, 4, 46, 26, d=.6)
    g.wand(46, 15, 65.5, 15, d=.5)
    g.wand(56, 15, 56, 26, d=.5)
    g.wand(65.5, 14, 78, 14, d=.5)
    g.wand(65.5, 25, 78, 25, d=.5)
    g.tuer(33, 25.5, breite=2.4, richtung="h", d=1, aufschlag=-1)
    g.tuer(46, 9, breite=1.4, richtung="v", d=.6)
    g.tuer(51, 15, breite=1.2, richtung="h", d=.5, aufschlag=-1)
    g.tuer(46, 21, breite=1.2, richtung="v", d=.6)
    g.tuer(65.5, 20, breite=1.2, richtung="v", d=1)
    g.tuer(71.5, 35.5, breite=1.6, richtung="h", d=1, aufschlag=-1)
    g.tuer(71.5, 14, breite=1.1, richtung="h", d=.5)
    g.tuer(71.5, 25, breite=1.1, richtung="h", d=.5)
    for x in (24, 29, 34, 39, 44):
        g.fenster(x, 4.5, d=1)
    for x in (50, 55, 60):
        g.fenster(x, 4.5, d=1)
    g.fenster(20.5, 15, richtung="v", d=1)
    g.tisch(25, 12, 15, 2.2)
    g.flaeche(41.5, 11.8, 2.6, 2.6, "#fff", w=1.2)             # Hochsitz
    g.herd(21, 6, 1.3, 2.4)
    g.bett(52, 6, 2.6, 3.4)
    g.tisch(58, 9, 4, 2, baenke=False)
    g.treppe(57.5, 16.5, 7, 3)
    g.tisch(49, 19, 4, 2.5, baenke=False)
    g.regal(47, 24, 8, .8)
    for y in (6, 16, 27):
        g.bett(66.8, y + .5, 1.8, 3)
        g.bett(74.5, y + .5, 1.8, 3)

    # Relais
    g.mauer_rechteck(4, 6, 14, 54, d=1)
    g.wand(4, 30, 18, 30, d=.5)
    g.wand(4, 46, 18, 46, d=.6)
    g.stall(5, 7, 5.5, 22.5, 7, richtung="v")
    g.stall(5, 30.5, 5.5, 15, 5, richtung="v")
    g.tuer(17.5, 18, breite=3, richtung="v", d=1, tor=True)
    g.tuer(17.5, 38, breite=3, richtung="v", d=1, tor=True)
    g.tuer(17.5, 53, breite=1.4, richtung="v", d=1, aufschlag=-1)
    g.tuer(11, 30, breite=1.4, richtung="h", d=.5)
    g.tisch(6, 49, 7, 1.6, baenke=False)
    g.regal(5, 57.5, 8, .9)
    for x in (12, 14.3):
        g.kiste(x, 49.5, 1.4, 1.4)
    g.fenster(4.5, 53, richtung="v", d=1)

    # Wagenremise (offene Front)
    X, Y = g.P(22, 54)
    g.wand(22, 54, 38, 54, d=.8)
    g.wand(22, 54, 22, 68, d=.8)
    g.wand(38, 54, 38, 68, d=.8)
    for x in (26, 30, 34):
        g.flaeche(x - .4, 67.4, .8, .8, "#1a1a1a")
    for x in (23.5, 31):
        g.flaeche(x, 56, 5.5, 9, "#fff", w=.8)
        g.text(x + 2.75, 60.5, "Wagen", klasse="tk", groesse=11, halo=False)

    # Herberge
    g.mauer_rechteck(60, 42, 32, 26, d=1)
    g.wand(80, 42, 80, 68, d=.6)
    g.wand(60, 56, 80, 56, d=.6)
    g.wand(80, 53, 92, 53, d=.5)
    g.wand(80, 60, 92, 60, d=.5)
    g.tuer(66, 42.5, breite=2, richtung="h", d=1, aufschlag=1)
    g.tuer(80, 47, breite=1.3, richtung="v", d=.6)
    g.tuer(80, 63, breite=1.2, richtung="v", d=.6)
    g.tuer(70, 56, breite=1.4, richtung="h", d=.6)
    g.tuer(86, 53, breite=1.1, richtung="h", d=.5, aufschlag=-1)
    for (tx, ty) in ((62.5, 46), (69, 46), (62.5, 51.5), (69, 51.5)):
        g.tisch(tx, ty, 4.5, 1.6)
    g.flaeche(75, 44, 1.2, 10, "#fff", w=.9)                   # Schanktresen
    g.herd(86, 43.5, 4.5, 2)
    g.tisch(82, 48, 6, 1.6, baenke=False)
    for i in range(7):
        g.bett(61.2 + i * 2.6, 57.5, 1.8, 3.2)
        g.bett(61.2 + i * 2.6, 63.6, 1.8, 3.2)
    for x in (82, 84.5, 87, 89.5):
        g.kiste(x, 54.5, 1.6, 1.6)
    g.treppe(81, 61.5, 7, 2.6)
    for y in (46, 51):
        g.fenster(91.5, y, richtung="v", d=1)
    g.fenster(60.5, 49, richtung="v", d=1)

    # Schrein
    g.mauer_rechteck(51, 50, 6.5, 8, d=.6)
    g.tuer(54.25, 57.7, breite=1.4, richtung="h", d=.6, tor=True)
    g.altar(53.2, 51.3, 2.1, 1)
    # Brunnen, Meilenstein
    g.brunnen(44, 40, 1.5)
    X, Y = g.P(41, 75.2)
    k.rechteck(X - 9, Y - 6, 18, 12, fill="#fff", w=1.2)
    k.text(X, Y + .5, "0", klasse="tn", groesse=10, halo=False)
    # Hof-Bäume
    g.b.einzelbaum(*g.P(26, 40), r=13, saat=21)
    g.b.einzelbaum(*g.P(84, 36), r=12, saat=22)

    for n, x, y in ((1, 48, 74), (2, 43.5, 67.5), (3, 33, 18.5), (4, 54, 11), (5, 51, 22.5), (6, 71.5, 19.5),
                    (7, 13.5, 18), (8, 13.5, 38), (9, 11, 53), (10, 30, 62), (11, 66, 54), (12, 86, 49.5),
                    (13, 70, 61.2), (14, 54.25, 54.5), (15, 44, 44), (16, 37.6, 75.2)):
        g.nummer(x, y, n)
    k.massstab(600, 98, 9.5, 20, "Schritt", segment=5)
    k.nordpfeil(1105, 92)
    k.rahmen(titel_breite=470, titel_x=40, titel_y=34)
    return k



# ====================================================================== Natterbrücke
def natterbruecke():
    k = Bild(1200, 900, "Natterbrücke", "Station 6 · Lageplan von Furt und Baustelle")
    g = Grundriss(k, 3.7, 40, 30)
    P = g.P
    # Wiesen
    g.flaeche(0, 0, 310, 230, "url(#gras)")
    # Hochwasserlinie und Fluss
    hw_w = [P(118, 0), P(112, 60), P(120, 120), P(110, 180), P(116, 230)]
    hw_o = [P(212, 0), P(220, 60), P(214, 120), P(224, 180), P(218, 230)]
    ufer_w = [P(142, 0), P(138, 50), P(146, 110), P(139, 170), P(144, 230)]
    ufer_o = [P(188, 0), P(192, 50), P(186, 110), P(194, 170), P(190, 230)]
    k.flaeche(hw_w + hw_o[::-1], fill="#fff", stroke=None)
    k.kurve(hw_w, w=1, dash="2 5")
    k.kurve(hw_o, w=1, dash="2 5")
    k.flaeche(ufer_w + ufer_o[::-1], fill="url(#wasser)", stroke=None)
    k.hang(ufer_w, laenge=11, abstand=6, seite=1)
    k.hang(ufer_o, laenge=11, abstand=6, seite=-1)
    k.text_pfad([P(160, 12), P(162, 70)], "Natter", groesse=20, abstand=5)
    k.text(P(165, 12)[0], P(165, 12)[1] + 6, "↑ zur Mündung in den Darpat", klasse="tk", groesse=13)
    # Straße
    yS = P(0, 112)[1]
    k.strasse([P(0, 112), P(130, 112)], breite=26, glatt_=False)
    k.strasse([P(198, 112), P(310, 112)], breite=26, glatt_=False)
    k.text(P(30, 112)[0], yS, "← Feste Hohenstein", klasse="tk", groesse=14)
    k.text(P(275, 112)[0], yS, "Mardramund →", klasse="tk", groesse=14)
    # alte Brücke: Stümpfe
    for x in (146, 155, 164, 173, 182):
        g.flaeche(x - 1.5, 103, 3, 3, "#fff", w=1)
        g.flaeche(x - .9, 103.6, 1.8, 1.8, "url(#schraffur)")
    # neue Brücke auf Gerüsten
    X1, Y1 = P(132, 114.5)
    X2, Y2 = P(196, 121.5)
    k.rechteck(X1, Y1, X2 - X1, Y2 - Y1, fill="url(#geruest)", w=1.1, dash="6 3")
    for x in (139, 152, 165, 178, 191):
        g.flaeche(x - 2, 113, 4, 10, "#fff", w=1.4)
        g.flaeche(x - 1.3, 113.7, 2.6, 8.6, "url(#schraffur)")
    g.flaeche(162.4, 116.6, 5.2, 2.8, "#fff", w=.8)            # Efferdnische
    # Furt mit Markpfählen und Seil
    furt = [P(128, 150), P(150, 145), P(168, 147), P(186, 152), P(202, 150)]
    k.kurve(furt, w=6, farbe="#fff")
    k.kurve(furt, w=1, dash="1.5 4")
    for x, y in ((141, 143.5), (141, 151.5), (156, 141.5), (156, 149.5), (171, 143), (171, 151), (184, 147.5), (184, 155.5)):
        X, Y = P(x, y)
        k.kreis(X, Y, 2.6, fill="#1a1a1a", stroke=None)
    k.linie([P(132, 156), P(198, 158)], w=.9, dash="6 2 1 2")
    for x, y in ((129, 160), (201, 162)):
        X, Y = P(x, y)
        k.kreis(X, Y, 9, fill="#fff", w=1.3)
        for a in range(0, 180, 45):
            import math
            k.linie([(X + 9 * math.cos(math.radians(a)), Y + 9 * math.sin(math.radians(a))),
                     (X - 9 * math.cos(math.radians(a)), Y - 9 * math.sin(math.radians(a)))], w=.6)
    # Wege von der Straße zur Furt
    k.kurve([P(112, 116), P(118, 136), P(128, 150)], w=1, dash="5 3")
    k.kurve([P(202, 150), P(208, 132), P(208, 116)], w=1, dash="5 3")
    # Westufer: Herberge, Stall, Zoll, Träger
    g.mauer_rechteck(70, 66, 30, 16, d=.9)
    g.wand(88, 66, 88, 82, d=.5)
    g.tuer(80, 81.5, breite=2, richtung="h", d=.9, aufschlag=-1)
    g.tuer(88, 74, breite=1.2, richtung="v", d=.5)
    for tx, ty in ((73, 69), (79.5, 69), (73, 75.5)):
        g.tisch(tx, ty, 4.5, 1.8)
    g.herd(95, 67.5, 3, 1.6)
    g.mauer_rechteck(70, 86, 20, 9, d=.7)
    g.stall(71, 87, 18, 4, 6)
    g.tuer(80, 94.6, breite=3, richtung="h", d=.7, tor=True)
    g.flaeche(60, 88, 8, 6, "url(#sand)", w=.6, dash="3 2")
    g.mauer_rechteck(116, 100, 7, 6, d=.5)                     # Zollhäuschen
    g.tuer(119.5, 105.75, breite=1.2, richtung="h", d=.5, aufschlag=-1)
    k.linie([P(123, 107), P(130, 107)], w=2.2)
    g.mauer_rechteck(104, 128, 13, 9, d=.6)                    # Trägerhütte
    g.tuer(117, 132.5, breite=1.6, richtung="v", d=.6)
    for i in range(3):
        g.flaeche(103 + i * 5, 140, 4, 6, "#fff", w=.8)
        g.linie_ = None
    X, Y = P(134, 128)
    k.kreis(X, Y, 7, fill="#fff", w=1.4)                       # Efferdstein
    k.add(f'<path d="M{X - 4} {Y - 1} q2 -2 4 0 t4 0 M{X - 4} {Y + 2.5} q2 -2 4 0 t4 0" fill="none" stroke="#1a1a1a" stroke-width=".7"/>')
    g.flaeche(40, 120, 30, 22, "#fff", w=.8, dash="4 3")      # Wartewiese
    for i, (x, y) in enumerate(((43, 123), (52, 124), (61, 123), (44, 132), (55, 133))):
        g.flaeche(x, y, 6, 3.2, "#fff", w=.8)
        g.linie_ = None
    # Ostufer: Bauhütte, Steinlager, Kalk
    g.mauer_rechteck(218, 82, 18, 11, d=.7)
    g.tuer(227, 92.65, breite=1.6, richtung="h", d=.7, aufschlag=-1)
    g.tisch(220, 84.5, 8, 2.5, baenke=False)
    for i in range(5):
        for j in range(2):
            g.flaeche(244 + i * 4.2, 80 + j * 4.2, 3.6, 3.6, "#fff", w=.8)
    g.flaeche(244, 92, 12, 6, "url(#sand)", w=.8)
    g.flaeche(220, 128, 22, 14, "url(#pflaster)", w=.8, dash="4 3")
    # Bäume
    for i, (x, y) in enumerate(((128, 20), (124, 40), (198, 30), (201, 62), (126, 190), (200, 200), (60, 30), (250, 180), (30, 170), (280, 40))):
        g.b.einzelbaum(*P(x, y), r=11, saat=40 + i)
    g.b.wald([P(0, 180), P(40, 175), P(70, 190), P(95, 230), P(0, 230)], r=10, saat=51)
    g.b.wald([P(240, 0), P(310, 0), P(310, 50), P(270, 45), P(245, 25)], r=10, saat=52)

    for n, x, y in ((1, 80, 62), (2, 66, 91), (3, 119.5, 96.5), (4, 110.5, 124), (5, 134, 136), (6, 165, 138.5),
                    (7, 129, 167), (8, 164, 98), (9, 146, 126), (10, 165, 126), (11, 227, 78), (12, 252, 75),
                    (13, 117, 60), (14, 55, 117), (15, 231, 135)):
        g.nummer(x, y, n)
    k.massstab(860, 850, 3.7, 50, "Schritt", segment=10)
    k.nordpfeil(1120, 110, drehung=-70)
    k.rahmen(titel_breite=470, titel_x=40, titel_y=34)
    return k


# ====================================================================== Sonnenfeld
def sonnenfeld():
    k = Bild(1200, 900, "Sonnenfeld", "Station 3 · Baustelle der Kaiserpfalz")
    g = Grundriss(k, 4.2, 40, 30)
    P = g.P
    g.flaeche(0, 0, 268, 200, "url(#feld)")
    g.flaeche(20, 30, 210, 140, "#fff")
    g.flaeche(20, 30, 210, 140, "url(#sand)")
    # Straße
    k.strasse([P(0, 186), P(268, 186)], breite=24, glatt_=False)
    k.text(P(25, 186)[0], P(25, 186)[1], "← Hartsteen", klasse="tk", groesse=14)
    k.text(P(245, 186)[0], P(245, 186)[1], "Rommilyser Kreuz →", klasse="tk", groesse=14)
    k.strasse([P(117, 186), P(117, 158)], breite=20, glatt_=False)
    # Senke
    k.flaeche([P(160, 62), P(196, 56), P(212, 82), P(206, 118), P(176, 124), P(158, 96)], fill="url(#sumpf)", stroke="#1a1a1a", w=.8, dash="2 4")
    # Pfalz: Umriss geplant
    g.mauer_rechteck(55, 50, 125, 105, d=2.2, zustand="geplant")
    # Südmauer: Westteil Rohbau, Portal fertig, Ostteil geplant
    g.mauer_rechteck(55, 152.8, 54, 2.4, d=1.2, zustand="rohbau")
    g.mauer_rechteck(55, 50, 2.4, 105, d=1.2, zustand="rohbau")   # Westmauer
    g.mauer_rechteck(55, 50, 60, 2.4, d=1.2, zustand="rohbau")    # Nordmauer West
    # Westflügel Rohbau
    g.mauer_rechteck(57.4, 52.4, 22, 100.4, d=1.4, zustand="rohbau", innen=None)
    for y in (78, 104, 128):
        g.wand(57.4, y, 79.4, y, d=1, zustand="rohbau")
    g.flaeche(80.5, 54, 3.5, 97, "url(#geruest)", w=.6, dash="3 2")
    # Hauptportal fertig
    g.mauer_rechteck(108, 148, 18, 10, d=2.2)
    g.tuer(117, 156.9, breite=6, richtung="h", d=2.2, tor=True)
    g.tuer(117, 149.1, breite=6, richtung="h", d=2.2, tor=True)
    X, Y = P(117, 153)
    k.kreis(X, Y - 0, 8, fill="#fff", w=1.2)
    for a in range(0, 360, 30):
        import math
        k.linie([(X + 9 * math.cos(math.radians(a)), Y + 9 * math.sin(math.radians(a))),
                 (X + 14 * math.cos(math.radians(a)), Y + 14 * math.sin(math.radians(a)))], w=.9)
    # Sonnenhalle abgesteckt + Lichtachse
    g.mauer_rechteck(98, 62, 38, 50, d=1.4, zustand="geplant")
    for x in (98, 136):
        for y in (68, 80, 92, 104):
            X, Y = P(x, y)
            k.kreis(X, Y, 2.4, fill="#1a1a1a", stroke=None)
    k.linie([P(117, 66), P(117, 146)], w=1, dash="10 4 2 4")
    g.flaeche(114.5, 64.5, 5, 3.5, "#fff", w=1.3)              # Richterstuhl
    k.text(P(124, 128)[0], P(124, 128)[1], "Mittagssonne", klasse="tk", groesse=12, drehung=-90)
    # Ostflügel geplant über der Senke
    for y in (78, 104, 128):
        g.wand(155, y, 177.6, y, d=1, zustand="geplant")
    g.wand(155, 52.4, 155, 152.6, d=1, zustand="geplant")
    # Tretradkräne
    import math
    for x, y in ((86, 66), (86, 132), (107, 140)):
        X, Y = P(x, y)
        k.kreis(X, Y, 11, fill="#fff", w=1.3)
        for a in range(0, 180, 30):
            k.linie([(X + 11 * math.cos(math.radians(a)), Y + 11 * math.sin(math.radians(a))),
                     (X - 11 * math.cos(math.radians(a)), Y - 11 * math.sin(math.radians(a)))], w=.5)
        k.linie([(X, Y), (X + 26, Y - 14)], w=2)
    # Bauhütten, Steinlager, Mörtel
    g.mauer_rechteck(24, 120, 20, 11, d=.7)
    g.wand(36, 120, 36, 131, d=.5)
    g.tuer(30, 130.65, breite=1.6, richtung="h", d=.7, aufschlag=-1)
    g.tisch(26, 122.5, 8, 3, baenke=False)
    g.mauer_rechteck(24, 136, 20, 9, d=.7)
    g.tuer(34, 144.65, breite=2.4, richtung="h", d=.7, tor=True)
    for i in range(6):
        for j in range(3):
            g.flaeche(24 + i * 4.4, 40 + j * 4.4, 3.8, 3.8, "#fff", w=.8)
    g.flaeche(24, 56, 26, 12, "url(#schraffur-fein)", w=.8, dash="4 3")
    for x in (30, 40):
        X, Y = P(x, 85)
        k.rechteck(X - 16, Y - 10, 32, 20, fill="url(#sand)", w=1.1)
    # Altarzelt und Festzelte
    X, Y = P(150, 168)
    k.kreis(X, Y, 20, fill="#fff", w=1.3)
    k.kreis(X, Y, 3, fill="#1a1a1a", stroke=None)
    g.altar(148.6, 164, 2.8, 1.2)
    for i, x in enumerate((84, 96, 137)):
        X, Y = P(x, 168)
        k.rechteck(X - 15, Y - 12, 30, 24, fill="#fff", w=1.1)
        k.linie([(X - 15, Y - 12), (X - 5, Y), (X - 15, Y + 12)], w=.6)
        k.linie([(X + 15, Y - 12), (X + 5, Y), (X + 15, Y + 12)], w=.6)
        k.linie([(X - 5, Y), (X + 5, Y)], w=.9)
        k.linie([(X, Y - 12), (X, Y - 20)], w=.8)
        k.add(f'<path d="M{X} {Y - 20} l9 3 l-9 3 Z" fill="#1a1a1a"/>')
    # Zeltlager der Arbeiter
    for i in range(4):
        for j in range(3):
            X, Y = P(196 + i * 9, 135 + j * 9)
            k.add(f'<path d="M{X - 9} {Y + 7} L{X} {Y - 8} L{X + 9} {Y + 7} Z" fill="#fff" stroke="#1a1a1a" stroke-width=".9"/>')
    # Hof Krumhaber
    g.mauer_rechteck(205, 8, 18, 10, d=.8)
    g.tuer(214, 17.6, breite=1.5, richtung="h", d=.8, aufschlag=-1)
    g.mauer_rechteck(228, 6, 14, 16, d=.7)
    g.tuer(228.35, 15, breite=3, richtung="v", d=.7, tor=True)
    g.b.einzelbaum(*P(200, 10), r=12, saat=61)
    g.b.einzelbaum(*P(246, 30), r=11, saat=62)

    for n, x, y in ((1, 117, 164.5), (2, 68.5, 90), (3, 166, 90), (4, 104, 75), (5, 121, 100), (6, 92, 61),
                    (7, 30, 115), (8, 38, 48), (9, 35, 93), (10, 158, 160), (11, 91, 177), (12, 210, 128),
                    (13, 214, 2.5), (14, 186, 69)):
        g.nummer(x, y, n)
    k.massstab(860, 852, 4.2, 50, "Schritt", segment=10)
    k.nordpfeil(1130, 120)
    k.rahmen(titel_breite=470, titel_x=40, titel_y=34)
    return k



# ====================================================================== Feste Hohenstein
def hohenstein():
    import math
    k = Bild(1200, 900, "Feste Hohenstein", "Station 5 · Kontrollposten in der Enge")
    g = Grundriss(k, 4.1, 45, 40)
    P = g.P
    # Talboden und Hänge
    g.flaeche(0, 0, 262, 196, "url(#gras)")
    nord = [P(0, 48), P(50, 56), P(100, 52), P(150, 50), P(200, 54), P(262, 46)]
    sued = [P(0, 140), P(50, 134), P(100, 140), P(150, 142), P(200, 136), P(262, 142)]
    k.flaeche([P(0, 0)] + nord + [P(262, 0)], fill="#fff", stroke=None, glatt_=False)
    k.flaeche([P(0, 196)] + sued + [P(262, 196)], fill="#fff", stroke=None, glatt_=False)
    k.hang(nord, laenge=16, abstand=7, seite=-1)
    k.hang(sued, laenge=16, abstand=7, seite=1)
    k.bergland([P(5, 2), P(255, 2), P(255, 34), P(5, 36)], b=36, saat=71, dichte=.8)
    k.bergland([P(5, 158), P(255, 156), P(255, 190), P(5, 190)], b=36, saat=72, dichte=.8)
    # Hirtenpfad
    k.kurve([P(38, 118), P(52, 146), P(70, 160), P(120, 168), P(180, 164), P(222, 150), P(232, 112)], w=1.3, dash="1.5 5")
    # Straße
    k.strasse([P(0, 95), P(72, 95)], breite=22, glatt_=False)
    k.strasse([P(192, 95), P(262, 95)], breite=22, glatt_=False)
    k.text(P(14, 95)[0], P(14, 95)[1], "← Rommilyser Kreuz", klasse="tk", groesse=13, anker="start")
    k.text(P(255, 95)[0], P(255, 95)[1], "Natterbrücke →", klasse="tk", groesse=13, anker="end")
    # Warteplatz: Karren in der Schlange
    for i, (x, y) in enumerate(((22, 86), (31, 86), (40, 86), (49, 86), (58, 86), (27, 100), (38, 100), (50, 100), (61, 100))):
        g.flaeche(x, y, 6.5, 3.4, "#fff", w=.9)
        X, Y = P(x, y)
        k.kreis(X + 4, Y + 15, 2.2, fill="#1a1a1a", stroke=None)
        k.kreis(X + 22, Y + 15, 2.2, fill="#1a1a1a", stroke=None)
    g.flaeche(20, 110, 18, 12, "url(#sand)", w=1.1, dash="2 3")
    # Zwinger (neu, Rohbau) mit Vortor
    g.mauer_rechteck(72, 72, 30, 46, d=1.6, zustand="rohbau", innen="#fff")
    g.flaeche(73.6, 73.6, 26.8, 42.8, "url(#pflaster)")
    g.tuer(72.8, 95, breite=6, richtung="v", d=1.6, tor=True)
    for y in (80, 104):
        g.tisch(84, y, 8, 2.4, baenke=False)
    g.kiste(93, 84, 1.8, 1.8)
    g.kiste(93, 108, 1.8, 1.8)
    # Kernburg
    g.mauer_rechteck(102, 62, 90, 66, d=2.6, innen="#fff")
    g.flaeche(104.6, 64.6, 84.8, 60.8, "url(#pflaster)")
    for x, y in ((102, 62), (192, 62), (102, 128), (192, 128)):
        X, Y = P(x, y)
        k.kreis(X, Y, 18, fill="#1a1a1a", w=1)
        k.kreis(X, Y, 10, fill="#fff", stroke=None)
    # Torbau West
    g.mauer_rechteck(102, 82, 14, 26, d=2.2, innen="#fff")
    g.tuer(102.9, 95, breite=6, richtung="v", d=2.6, tor=True)
    g.tuer(115.1, 95, breite=6, richtung="v", d=2.2, tor=True)
    g.wand(104.2, 91.5, 113.8, 91.5, d=.8)
    g.wand(104.2, 98.5, 113.8, 98.5, d=.8)
    g.flaeche(104.6, 92.2, 9.2, 5.6, "#fff")
    g.tisch(106, 92.6, 4, 1.4, baenke=False)
    g.tuer(109, 98.5, breite=1.2, richtung="h", d=.8)
    g.tuer(109, 91.5, breite=1.2, richtung="h", d=.8, aufschlag=-1)
    g.tisch(105.5, 101, 4, 2, baenke=False)
    # Torgasse
    g.wand(116, 90, 188, 90, d=1)
    g.wand(116, 100, 188, 100, d=1)
    g.tuer(150, 90, breite=4, richtung="h", d=1, tor=True)
    g.flaeche(116, 90.5, 72, 9, "url(#sand)")
    # Osttor
    g.mauer_rechteck(186, 86, 10, 18, d=2, innen="#fff")
    g.tuer(186.9, 95, breite=6, richtung="v", d=2, tor=True)
    g.tuer(195.1, 95, breite=6, richtung="v", d=2, tor=True)
    g.flaeche(188, 91.6, 6, 6.8, "url(#sand)")
    # Bergfried
    g.mauer_rechteck(166, 64.6, 18, 18, d=2.4)
    g.treppe(170, 70, 8, 3)
    g.tuer(175, 82.3, breite=1.4, richtung="h", d=2.4, aufschlag=-1)
    # Kaserne
    g.mauer_rechteck(118, 64.6, 44, 13, d=1)
    g.wand(140, 64.6, 140, 77.6, d=.6)
    for i in range(5):
        g.bett(120 + i * 3.6, 66.3, 2.2, 3.4)
        g.bett(142 + i * 3.6, 66.3, 2.2, 3.4)
    g.tuer(130, 77.1, breite=1.4, richtung="h", d=1, aufschlag=-1)
    g.tuer(152, 77.1, breite=1.4, richtung="h", d=1, aufschlag=-1)
    # Stall
    g.mauer_rechteck(118, 104, 16, 21.4, d=.9)
    g.stall(119, 105, 5, 19.4, 5, richtung="v")
    g.tuer(126, 104.45, breite=2.5, richtung="h", d=.9, tor=True)
    # Löwenkapelle mit Vorhalle (Rohbau)
    g.mauer_rechteck(138, 108, 20, 17.4, d=1.2)
    g.altar(146.3, 121.2, 3.4, 1.4)
    for x in (141, 145, 149, 153):
        g.flaeche(x, 110.2, .5, 2.6, "#1a1a1a")
    g.mauer_rechteck(141, 100.4, 14, 8, d=.9, zustand="rohbau", innen="#fff")
    g.tuer(148, 100.9, breite=4, richtung="h", d=1, tor=True)
    g.tuer(148, 108.6, breite=2.4, richtung="h", d=1.2, tor=True)
    # Zeughaus
    g.mauer_rechteck(162, 104, 22, 21.4, d=1)
    for i in range(3):
        g.regal(165, 107 + i * 5.5, 16, 1.2)
    g.tuer(170, 104.5, breite=1.6, richtung="h", d=1)
    g.brunnen(160, 84, 1.6)
    # Stationshaus im Bau
    g.mauer_rechteck(206, 66, 34, 16, d=1.1, zustand="rohbau")
    g.wand(222, 66, 222, 82, d=.7, zustand="rohbau")
    g.flaeche(206, 83, 34, 3.5, "url(#geruest)", w=.6, dash="3 2")
    g.mauer_rechteck(206, 108, 22, 14, d=1, zustand="geplant")

    for n, x, y in ((1, 42, 79.5), (2, 29, 116), (3, 76, 112), (4, 88, 98), (5, 109, 87), (6, 108, 104), (7, 136, 95),
                    (8, 156, 84), (9, 175, 76), (10, 140, 82), (11, 148, 116.5), (12, 126, 116), (13, 173, 120),
                    (14, 191, 109), (15, 223, 74), (16, 120, 172)):
        g.nummer(x, y, n)
    k.massstab(870, 862, 4.1, 50, "Schritt", segment=10)
    k.nordpfeil(1130, 120, drehung=-35)
    k.rahmen(titel_breite=470, titel_x=40, titel_y=34)
    return k


# ====================================================================== Mardramund
def mardramund():
    k = Bild(1200, 960, "Kanzlei zu Mardramund", "Station 7 · Erdgeschoss mit Archiv-Anbau")
    g = Grundriss(k, 14, 400, 380)
    P = g.P
    g.flaeche(-18, -17, 66, 45, "url(#gras)")
    # Straße
    k.strasse([P(-19, 33), P(52, 33)], breite=60, glatt_=False)
    k.flaeche([P(-19, 30.9), P(52, 30.9), P(52, 35.1), P(-19, 35.1)], fill="url(#pflaster)", stroke=None, glatt_=False)
    k.text(P(-12, 33)[0], P(-12, 33)[1], "← Natterbrücke", klasse="tk", groesse=14)
    k.text(P(45, 33)[0], P(45, 33)[1], "Wasserburg →", klasse="tk", groesse=14)
    k.text(P(-6, -12)[0], P(-6, -12)[1], "zum Fluss ↑", klasse="tk", groesse=14)
    # Kanzlei
    g.mauer_rechteck(0, 0, 44, 26, d=.9)
    g.wand(18, 0, 18, 26, d=.6)
    g.wand(28, 0, 28, 26, d=.6)
    g.wand(18, 10, 28, 10, d=.6)
    g.wand(28, 14, 44, 14, d=.6)
    g.wand(37, 0, 37, 7, d=.5)
    g.wand(37, 7, 44, 7, d=.5)
    g.tuer(23, 25.55, breite=2.4, richtung="h", d=.9, aufschlag=-1)
    g.tuer(18, 18, breite=1.6, richtung="v", d=.6, aufschlag=-1)
    g.tuer(23, 10, breite=1.4, richtung="h", d=.6, aufschlag=-1)
    g.tuer(28, 21, breite=1.2, richtung="v", d=.6)
    g.tuer(28, 12, breite=1.2, richtung="v", d=.6)
    g.tuer(40.5, 7, breite=1, richtung="h", d=.5)
    g.tuer(23, .45, breite=1.4, richtung="h", d=.9)
    for x in (3, 7.5, 12):
        g.fenster(x, 25.55, d=.9)
        g.fenster(x, .45, d=.9)
    g.fenster(.45, 8, richtung="v", d=.9)
    g.fenster(.45, 18, richtung="v", d=.9)
    g.fenster(33, 25.55, d=.9)
    g.fenster(39, 25.55, d=.9)
    g.fenster(43.55, 20, richtung="v", d=.9)
    g.fenster(20.2, .45, breite=1.6, d=.9)
    # Schreibsaal: Pulte
    for i in range(3):
        for j in range(4):
            g.tisch(2.6 + i * 5, 3 + j * 5.6, 3, 1.6, baenke=False)
            X, Y = g.P(4.1 + i * 5, 5.6 + j * 5.6)
            k.kreis(X, Y, 5, fill="#fff", w=.7)
    g.regal(1, 1, 16, .8)
    # Halle
    g.flaeche(19.2, 12, .8, 9, "#fff", w=.8)
    g.flaeche(26.2, 12, .8, 9, "#fff", w=.8)
    g.treppe(22, 11.2, 4, 2.6, richtung="h")
    # Hesindestube
    g.flaeche(21.8, 3.2, 2.4, 1.6, "#fff", w=1.1)
    g.altar(21.6, 1.3, 2.8, .8)
    for x in (19.5, 25):
        g.tisch(x, 6, 1.6, 2.8, baenke=False)
    # Vorsteherstube
    g.tisch(33, 18, 5, 2.4, baenke=False)
    X, Y = g.P(35.5, 21.6)
    k.kreis(X, Y, 6, fill="#fff", w=.8)
    g.kiste(41, 23, 2, 1.8)
    g.regal(29, 24.4, 8, .8)
    # Registerkammer und Siegelkammer
    for i in range(3):
        g.regal(29.5 + i * 2.6, 1.2, 1, 10.5)
    g.regal(38, 8.5, 5, .9)
    g.kiste(38.5, 1.6, 2.2, 1.6)
    g.kiste(41.3, 1.6, 1.8, 1.6)
    # Archiv-Anbau im Rohbau
    g.mauer_rechteck(12, -15, 22, 15.4, d=.9, zustand="rohbau", innen="#fff")
    for i in range(4):
        X, Y = g.P(14.5 + i * 4.8, -13)
        k.rechteck(X, Y, 1 * 14, 10 * 14, fill="none", w=.9, dash="4 3")
    g.flaeche(12, -17.4, 22, 2, "url(#geruest)", w=.6, dash="3 2")
    # Botenstall
    g.mauer_rechteck(-15, 3, 11, 16, d=.7)
    g.stall(-14, 4, 4, 14, 3, richtung="v")
    g.tuer(-4.35, 14, breite=2.4, richtung="v", d=.7, tor=True)
    k.linie([P(-14, 29), P(-6, 29)], w=3)
    for x in (-14, -6):
        X, Y = P(x, 29)
        k.kreis(X, Y, 3.4, fill="#1a1a1a", stroke=None)
    g.b.einzelbaum(*P(42, -9), r=16, saat=81)
    g.b.einzelbaum(*P(-12, -10), r=14, saat=82)
    g.brunnen(5, -8, 1.3)

    for n, x, y in ((1, 23, 17), (2, 9, 13), (3, 23, 5), (4, 36, 21.2), (5, 32.5, 9), (6, 40.5, 3.5), (7, 24, 14.7),
                    (8, 23, -7.5), (9, -9.5, 10), (10, -10, 26.6), (11, 5, -10.8)):
        g.nummer(x, y, n)
    k.massstab(860, 920, 14, 10, "Schritt", segment=2)
    k.nordpfeil(1130, 110, drehung=-60)
    k.rahmen(titel_breite=500, titel_x=40, titel_y=34)
    return k


# ====================================================================== Rommilyser Kreuz
def kreuz():
    import math
    k = Bild(1200, 900, "Rommilyser Kreuz", "Station 4 · Lageplan der Kreuzung")
    g = Grundriss(k, 6.4, -110, -90)
    P = g.P
    g.flaeche(17, 14, 190, 150, "url(#gras)")
    # Hügel mit Wimpel
    k.bergland([P(30, 48), P(95, 44), P(104, 66), P(70, 78), P(34, 72)], b=44, saat=91, dichte=1.2)
    X, Y = P(68, 52)
    k.linie([(X, Y + 34), (X, Y - 30)], w=2.2)
    k.add(f'<path d="M{X} {Y - 30} l34 7 l-34 10 Z" fill="#1a1a1a"/>')
    # Straßen
    k.strassennetz([([P(17, 112), P(207, 112)], 40), ([P(119, 112), P(140, 88), P(166, 50), P(180, 14)], 28)])
    k.text(P(24, 112)[0], P(24, 112)[1], "← Sonnenfeld", klasse="tk", groesse=15, anker="start")
    k.text(P(200, 112)[0], P(200, 112)[1], "Feste Hohenstein →", klasse="tk", groesse=15, anker="end")
    k.text(P(172, 28)[0] - 26, P(172, 28)[1], "nach Rommilys ↗", klasse="tk", groesse=15, anker="end")
    # Händlerplatz
    k.flaeche([P(86, 120), P(150, 120), P(154, 148), P(88, 150)], fill="url(#sand)", w=1, glatt_=False, dash="4 3")
    for (x, y) in ((90, 123), (99, 123), (108, 123), (132, 124), (141, 124), (92, 140), (138, 140)):
        g.flaeche(x, y, 6.5, 4, "#fff", w=.9)
        X, Y = P(x, y)
        k.linie([(X, Y), (X + 6.5 * 6.4, Y + 4 * 6.4)], w=.4)
        k.linie([(X + 6.5 * 6.4, Y), (X, Y + 4 * 6.4)], w=.4)
    g.brunnen(119, 137, 2)
    # Wegweiser
    X, Y = P(116, 103.5)
    for (dx, dy) in ((-52, 0), (50, 0), (30, -38)):
        k.linie([(X, Y), (X + dx, Y + dy)], w=6.5, cap="butt")
        k.linie([(X, Y), (X + dx * .97, Y + dy * .97)], w=3.6, farbe="#fff", cap="butt")
    k.kreis(X, Y, 6.5, fill="#1a1a1a", stroke=None)
    k.add(f'<path d="M{X + 10} {Y + 1.8} l14 0" stroke="#1a1a1a" stroke-width=".8"/>')
    # Fuchsschrein
    X, Y = P(129.5, 104.5)
    k.flaeche([(X - 11, Y + 9), (X - 9, Y - 11), (X + 5, Y - 14), (X + 11, Y + 8)], fill="#fff", w=1.8)
    k.kreis(X, Y - 2, 3.2, fill="#1a1a1a", stroke=None)
    # Stationshaus, schief gebaut
    cx, cy = P(162, 95)
    k.add(f'<g transform="rotate(-14 {cx} {cy})">')
    g.mauer_rechteck(146, 87, 32, 16, d=1, zustand="rohbau")
    g.wand(160, 87, 160, 103, d=.7, zustand="rohbau")
    g.wand(160, 95, 178, 95, d=.6, zustand="geplant")
    g.tuer(153, 102.5, breite=2.2, richtung="h", d=1, tor=True)
    g.tuer(160, 91, breite=1.4, richtung="v", d=.7, tor=True)
    for x in range(148, 178, 3):
        k.linie([P(x, 87.6), P(x, 102.4)], w=.5, dash="2 4")
    g.flaeche(146, 83, 32, 3, "url(#geruest)", w=.6, dash="3 2")
    k.add("</g>")
    # Bauhütte
    g.mauer_rechteck(84, 92, 16, 10, d=.6)
    g.tuer(92, 101.7, breite=1.6, richtung="h", d=.6, aufschlag=-1)
    g.tisch(86, 94.5, 7, 2.2)
    g.kiste(96, 94, 1.8, 1.8)
    g.kiste(96, 97, 1.8, 1.8)
    # Behelfsstall und Pferch
    g.mauer_rechteck(48, 86, 15, 8, d=.6)
    g.stall(49, 87, 13, 3, 4)
    g.flaeche(48, 95, 24, 12, "none", w=1.1, dash="2 3")
    # Bäume
    for i, (x, y) in enumerate(((40, 140), (55, 152), (175, 140), (196, 150), (196, 70), (120, 70), (30, 100))):
        g.b.einzelbaum(*P(x, y), r=13, saat=95 + i)

    for n, x, y in ((1, 108, 96), (2, 129.5, 95.5), (3, 166, 93), (4, 92, 88), (5, 112, 146), (6, 119, 131),
                    (7, 66, 84), (8, 76, 70), (9, 158, 50)):
        g.nummer(x, y, n)
    k.massstab(580, 70, 6.4, 30, "Schritt", segment=10)
    k.nordpfeil(1130, 120, drehung=-45)
    k.rahmen(titel_breite=470, titel_x=40, titel_y=34)
    return k



def _haus(g, x, y, b, h):
    g.mauer_rechteck(x, y, b, h, d=.5, innen="url(#schraffur-fein)")


def _gaense(k, g, pts):
    for x, y in pts:
        X, Y = g.P(x, y)
        k.add(f'<ellipse cx="{X}" cy="{Y}" rx="4" ry="2.4" fill="#fff" stroke="#1a1a1a" stroke-width=".7"/>')
        k.linie([(X + 3, Y - 1), (X + 6, Y - 4)], w=.8)


# ====================================================================== Nattersquell
def nattersquell():
    k = Bild(1200, 900, "Nattersquell", "Station 1 · Station und Dorf an der Quelle")
    g = Grundriss(k, 6, 20, 30)
    P = g.P
    g.flaeche(0, 0, 196, 140, "url(#gras)")
    # Quelle und Natter
    X, Y = P(165, 44)
    k.flaeche([P(158, 38), P(166, 35), P(173, 40), P(172, 50), P(163, 52), P(157, 46)], fill="url(#wasser)", w=1.3)
    k.fluss([P(166, 51), P(168, 64), P(167, 80), P(170, 100), P(166, 120), P(172, 140)], b0=6, b1=16, schraffur=False)
    k.text_pfad([P(176, 104), P(176, 126)], "Natter", groesse=15, abstand=3)
    # Straße
    k.strasse([P(0, 80), P(196, 80)], breite=40, glatt_=False)
    for y in (76.2, 83.8):
        k.linie([P(162, y), P(173, y)], w=2.4, cap="butt")      # Brüstungen der kleinen Brücke
    k.text(*P(14, 80), "← Gareth", klasse="tk", groesse=15)
    k.text(*P(185, 80), "Hartsteen →", klasse="tk", groesse=15, anker="end")
    # Stationsmauer
    g.flaeche(70, 22, 80, 50, "url(#pflaster)")
    g.mauer_rechteck(70, 22, 80, 50, d=1, innen=None)
    g.tuer(110, 71.5, breite=5, richtung="h", d=1, tor=True)
    # Stationsherberge mit Herd und Herdkapelle
    g.mauer_rechteck(74, 26, 40, 20, d=.9)
    g.wand(102, 26, 102, 46, d=.6)
    g.herd(98.4, 31, 3.2, 5)
    g.flaeche(94, 26.9, 3.6, 2.4, "#fff", w=.8)
    g.altar(94.5, 27.2, 2.6, .9)
    for tx, ty in ((77, 30), (85, 30), (77, 37), (85, 37)):
        g.tisch(tx, ty, 5, 1.8)
    g.flaeche(77, 43, 14, 1.2, "#fff", w=.8)
    g.tuer(88, 45.55, breite=2, richtung="h", d=.9, aufschlag=-1)
    g.tuer(102, 41, breite=1.2, richtung="v", d=.6)
    g.tisch(104, 29, 7, 1.8, baenke=False)
    for x in (105, 108.5):
        g.kiste(x, 41, 1.6, 1.6)
    # Kaiserpfalz (klein)
    g.mauer_rechteck(118, 26, 28, 18, d=.9)
    g.wand(134, 26, 134, 44, d=.6)
    g.tisch(121, 32, 9, 2.4)
    g.bett(137, 29, 2.4, 3.4)
    g.tuer(126, 43.55, breite=1.8, richtung="h", d=.9, aufschlag=-1)
    g.tuer(134, 38, breite=1.2, richtung="v", d=.6)
    # Stall mit Strohboden
    g.mauer_rechteck(74, 52, 30, 16, d=.8)
    g.stall(75, 53, 28, 5, 7)
    g.tuer(89, 52.4, breite=3, richtung="h", d=.8, tor=True)
    g.treppe(76, 62, 6, 2.4)
    # Gänsehof
    g.flaeche(110, 50, 18, 14, "none", w=1, dash="2 3")
    _gaense(k, g, [(113, 53), (117, 55), (121, 52), (124, 57), (115, 60), (120, 61), (125, 61.5), (113, 57.5)])
    g.brunnen(140, 58, 1.4)
    # Dorf südlich der Straße
    g.mauer_rechteck(58, 92, 22, 14, d=.8)
    g.wand(72, 92, 72, 106, d=.5)
    for tx, ty in ((60.5, 95), (60.5, 100.5), (66, 95)):
        g.tisch(tx, ty, 4, 1.6)
    g.herd(74, 93, 3, 1.6)
    g.tuer(65, 92.4, breite=1.8, richtung="h", d=.8)
    for x, y, b, h in ((22, 94, 14, 9), (24, 114, 12, 8), (120, 98, 14, 9), (138, 110, 12, 9), (96, 120, 12, 8)):
        _haus(g, x, y, b, h)
    for x, y, b, h in ((40, 110, 14, 14), (120, 112, 14, 12)):
        g.flaeche(x, y, b, h, "url(#feld)", w=.6, dash="2 2")
    g.b.einzelbaum(*P(100, 104), r=24, saat=111)
    g.brunnen(104, 89.5, 1.6)
    X, Y = P(64, 76)
    k.rechteck(X - 9, Y - 6, 18, 12, fill="#fff", w=1.2)
    k.text(X, Y + .5, "34", klasse="tn", groesse=10, halo=False)
    for i, (x, y) in enumerate(((20, 30), (45, 20), (180, 20), (186, 66), (40, 60), (8, 128), (150, 130))):
        g.b.einzelbaum(*P(x, y), r=12, saat=120 + i)

    for n, x, y in ((1, 116, 75), (2, 82, 40.5), (3, 96, 34), (4, 126, 37), (5, 96, 62), (6, 119, 66.5),
                    (7, 98, 89.5), (8, 165, 30), (9, 66, 103), (10, 108, 104), (11, 58, 76), (12, 29, 106)):
        g.nummer(x, y, n)
    k.massstab(860, 862, 6, 30, "Schritt", segment=10)
    k.nordpfeil(1130, 120)
    k.rahmen(titel_breite=470, titel_x=40, titel_y=34)
    return k


# ====================================================================== Hartsteen
def hartsteen():
    k = Bild(1200, 900, "Hartsteen", "Station 2 · Pfalz am Westtor und Steinbruch")
    g = Grundriss(k, 4.2, 30, 40)
    P = g.P
    g.flaeche(0, 0, 272, 200, "url(#gras)")
    # Steinbruch im Süden
    bruch = [P(10, 150), P(40, 140), P(80, 138), P(115, 146), P(130, 166), P(120, 200), P(10, 200)]
    k.flaeche(bruch, fill="url(#sand)", stroke=None)
    k.hang([P(10, 150), P(40, 140), P(80, 138), P(115, 146), P(130, 166), P(124, 200)], laenge=14, abstand=6, seite=-1)
    for i in range(6):
        g.flaeche(30 + i * 9, 170 + (i % 2) * 6, 6, 4, "#fff", w=.9)
    # Gildenesse im Fels: Portal am Bruchrand, Gewölbe dahinter
    fels = [P(30, 142), P(44, 126), P(60, 112), P(90, 112), P(118, 124), P(126, 146), P(115, 146), P(80, 138), P(40, 140)]
    k.flaeche(fels, fill="url(#schraffur-fein)", stroke=None)
    gew = [P(64, 139), P(60, 128), P(62, 118), P(72, 114), P(84, 118), P(86, 128), P(80, 139)]
    k.flaeche(gew, fill="#fff", w=2.6)
    g.herd(70, 117, 4, 2.6)
    g.flaeche(70.8, 124, 2.4, 1.6, "#1a1a1a")
    g.mauer_rechteck(66, 137, 12, 4, d=1.2)
    g.tuer(72, 137.6, breite=4, richtung="h", d=1.2, tor=True)
    k.text(*P(102, 128), "Fels", klasse="tk", groesse=14)
    # Ochsenweg
    k.kurve([P(60, 180), P(95, 165), P(125, 140), P(140, 118)], w=1.1, dash="6 4")
    # Straße und Stadtmauer
    k.strasse([P(0, 110), P(272, 110)], breite=34, glatt_=False)
    k.text(*P(10, 110), "← Nattersquell", klasse="tk", groesse=14, anker="start")
    mauer_x = 150
    g.mauer_rechteck(mauer_x, 0, 3.4, 200, d=1.7, innen=None)
    g.mauer_rechteck(mauer_x - 3, 100, 10, 20, d=1.8)
    g.tuer(mauer_x + 2, 110, breite=6, richtung="v", d=10, tor=True)
    for y in (40, 160):
        X, Y = P(mauer_x + 1.7, y)
        k.kreis(X, Y, 14, fill="#1a1a1a", stroke=None)
        k.kreis(X, Y, 7, fill="#fff", stroke=None)
    # Altstadt
    g.flaeche(154, 0, 118, 200, "url(#pflaster)")
    for x, y, b, h in ((158, 4, 20, 14), (182, 4, 16, 18), (158, 22, 14, 18), (176, 26, 20, 12), (158, 46, 24, 16), (186, 44, 14, 20),
                       (158, 66, 18, 14), (180, 68, 22, 12), (158, 86, 16, 13), (178, 84, 26, 15), (208, 84, 22, 15), (236, 86, 30, 13),
                       (158, 122, 20, 16), (182, 124, 22, 14), (208, 122, 18, 18), (230, 124, 22, 14), (158, 144, 26, 14),
                       (188, 146, 16, 18), (208, 146, 24, 14), (236, 144, 20, 20), (160, 166, 18, 20), (182, 170, 30, 14), (216, 168, 20, 22)):
        _haus(g, x, y, b, h)
    g.mauer_rechteck(166, 125, 16, 12, d=.8)                     # Gildehaus
    g.tuer(174, 124.4, breite=2, richtung="h", d=.8)
    # Burghügel
    burg = [P(206, 8), P(262, 6), P(268, 50), P(232, 70), P(204, 56)]
    k.flaeche(burg, fill="#fff", w=1)
    k.hang([P(204, 56), P(232, 70), P(268, 50)], laenge=12, abstand=6, seite=-1)
    g.mauer_rechteck(216, 16, 40, 34, d=2)
    g.mauer_rechteck(220, 20, 12, 12, d=1.8)
    # Kaiserpfalz vor dem Tor
    g.flaeche(66, 52, 70, 46, "url(#pflaster)")
    g.mauer_rechteck(66, 52, 70, 16, d=1.1)
    g.mauer_rechteck(66, 66, 16, 32, d=1.1)
    g.mauer_rechteck(120, 66, 16, 32, d=1.1)
    for x in (88, 101, 114):
        g.wand(x, 52, x, 68, d=.6)
    for x in (77, 94, 107, 125):
        g.tuer(x, 67.45, breite=1.6, richtung="h", d=1.1, aufschlag=-1)
    g.tuer(82, 82, breite=1.4, richtung="v", d=1.1)
    g.tuer(120, 82, breite=1.4, richtung="v", d=1.1)
    for x in range(70, 134, 6):
        g.fenster(x, 52.55, d=1.1)
    g.tisch(89.5, 57, 10, 2.4)
    for i in range(3):
        g.bett(68.5, 70 + i * 8, 2.4, 3.6)
        g.bett(130.5, 70 + i * 8, 2.4, 3.6)
    g.brunnen(101, 84, 2.2)
    for x in (88, 114):
        g.saeule(x, 97)
        g.saeule(x, 72)
    g.wand(82, 98, 92, 98, d=.8)
    g.wand(110, 98, 120, 98, d=.8)
    # Relais und Stationsherberge
    g.mauer_rechteck(20, 70, 32, 16, d=.8)
    g.stall(21, 71, 30, 5, 8)
    g.tuer(36, 85.6, breite=3, richtung="h", d=.8, tor=True)
    g.mauer_rechteck(20, 40, 34, 22, d=.9)
    g.wand(40, 40, 40, 62, d=.6)
    for tx, ty in ((23, 44), (23, 51), (31, 44)):
        g.tisch(tx, ty, 5, 1.8)
    g.herd(48, 42, 4, 2)
    g.tuer(30, 61.55, breite=1.8, richtung="h", d=.9, aufschlag=-1)
    g.tuer(40, 54, breite=1.2, richtung="v", d=.6)
    # Werkplatz der Steinmetze
    g.flaeche(116, 118, 30, 18, "url(#sand)", w=.8, dash="4 3")
    for i in range(5):
        for j in range(2):
            g.flaeche(118 + i * 5.4, 121 + j * 6.5, 4.4, 4.4, "#fff", w=.9)

    for n, x, y in ((1, 152, 98), (2, 101, 60), (3, 101, 76), (4, 36, 66), (5, 28, 57), (6, 131, 141), (7, 174, 131),
                    (8, 40, 160), (9, 72, 145), (10, 78, 122), (11, 108, 158), (12, 236, 38), (13, 196, 108)):
        g.nummer(x, y, n)
    k.massstab(860, 862, 4.2, 50, "Schritt", segment=10)
    k.nordpfeil(1130, 210)
    k.rahmen(titel_breite=470, titel_x=40, titel_y=34)
    return k


# ====================================================================== Wandlether Hof
def wandlether_hof():
    k = Bild(1200, 900, "Wandlether Hof", "Station 9 · Wehrstation im Forst")
    g = Grundriss(k, 5, 30, 30)
    P = g.P
    g.b.wald([P(0, 0), P(232, 0), P(232, 172), P(0, 172)], r=14, saat=131, dichte=.8)
    # Lichtung
    k.flaeche([P(50, 32), P(150, 28), P(158, 60), P(152, 112), P(110, 118), P(48, 112), P(40, 70)], fill="#fff", stroke=None)
    k.flaeche([P(50, 32), P(150, 28), P(158, 60), P(152, 112), P(110, 118), P(48, 112), P(40, 70)], fill="url(#gras)", stroke=None)
    k.flaeche([P(88, 2), P(112, 2), P(116, 18), P(100, 24), P(86, 18)], fill="#fff", stroke=None)
    k.flaeche([P(184, 132), P(204, 128), P(210, 146), P(192, 152), P(180, 145)], fill="#fff", stroke=None)
    # Straßen
    k.strassennetz([([P(0, 102), P(232, 102)], 36), ([P(128, 102), P(126, 130), P(120, 172)], 22)])
    for dx in (-2.4, 2.4):
        k.kurve([P(128 + dx, 106), P(126 + dx, 130), P(120 + dx, 172)], w=.7, dash="6 4")
    k.text(*P(8, 102), "← Wasserburg", klasse="tk", groesse=14, anker="start")
    k.text(*P(224, 102), "Gnitzenkuhl →", klasse="tk", groesse=14, anker="end")
    k.text(*P(132, 164), "nach Blitztann", klasse="tk", groesse=14, anker="start")
    # Palisade
    g.palisade([(104, 92), (140, 92), (140, 40), (60, 40), (60, 92), (96, 92)], r=.6, geschlossen=False)
    g.mauer_rechteck(134, 34, 9, 9, d=1)                        # Wachturm
    g.treppe(136, 36, 4, 2, richtung="h")
    # Altes Gehöft
    g.mauer_rechteck(66, 46, 30, 14, d=.9)
    g.wand(84, 46, 84, 60, d=.5)
    for tx, ty in ((68.5, 49), (68.5, 54.5), (75.5, 49)):
        g.tisch(tx, ty, 4.5, 1.6)
    g.herd(90, 47.5, 4, 1.8)
    g.tuer(79, 59.55, breite=1.6, richtung="h", d=.9, aufschlag=-1)
    g.tuer(84, 54, breite=1.2, richtung="v", d=.5)
    g.mauer_rechteck(66, 70, 22, 16, d=.9)
    g.stall(67, 71, 4.5, 14, 4, richtung="v")
    g.tuer(87.55, 78, breite=3.2, richtung="v", d=.9, tor=True)
    # Neues Wachhaus (Rohbau), Schreinsockel, Brunnen, Holz
    g.mauer_rechteck(108, 46, 22, 12, d=.9, zustand="rohbau")
    g.wand(118, 46, 118, 58, d=.6, zustand="rohbau")
    g.flaeche(114, 70, 6, 6, "url(#schraffur)", w=1.2)
    g.brunnen(100, 68, 1.5)
    for i in range(4):
        g.flaeche(124, 72 + i * 1.6, 10, 1.2, "#fff", w=.6)
    g.tuer(100, 92, breite=6, richtung="h", d=1.2, tor=True)
    # Pfad zum Jägerschrein
    k.kurve([P(100, 40), P(98, 30), P(100, 18)], w=1, dash="1.5 4")
    X, Y = P(100, 12)
    for dx in (-6, 0, 6):
        k.kreis(X + dx * 1.6, Y + (3 if dx else -3), 3.6, fill="#1a1a1a", stroke=None)
    k.add(f'<path d="M{X - 8} {Y - 16} q8 -8 16 0 l-3 6 h-10 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1"/>')
    # Köhlerplatz
    X, Y = P(195, 140)
    k.kreis(X, Y, 22, fill="url(#sand)", w=1.2)
    k.kreis(X, Y, 10, fill="#fff", w=.8)
    g.mauer_rechteck(182, 130, 6, 5, d=.5)
    k.kurve([P(160, 102), P(172, 118), P(186, 132)], w=1, dash="1.5 4")

    for n, x, y in ((1, 100, 96.5), (2, 146, 34), (3, 75, 41.5), (4, 77, 81), (5, 119, 64), (6, 117, 82), (7, 106, 68),
                    (8, 94, 35), (9, 112, 11), (10, 112, 140), (11, 205, 124)):
        g.nummer(x, y, n)
    k.massstab(860, 862, 5, 40, "Schritt", segment=10)
    k.nordpfeil(1130, 120, drehung=-60)
    k.rahmen(titel_breite=470, titel_x=40, titel_y=34)
    return k


# ====================================================================== Wasserburg
def wasserburg():
    k = Bild(1200, 900, "Wasserburg", "Station 8 · Burginsel, Festplatz und Station")
    g = Grundriss(k, 4.2, 30, 40)
    P = g.P
    g.flaeche(0, 0, 272, 200, "url(#gras)")
    # Fluss mit Insel
    nord = [P(0, 8), P(60, 12), P(130, 6), P(200, 12), P(272, 8)]
    sued = [P(272, 76), P(200, 80), P(130, 78), P(60, 74), P(0, 78)]
    k.flaeche(nord + sued, fill="url(#wasser)", stroke=None, glatt_=False)
    k.kurve(nord, w=1.3)
    k.kurve(sued[::-1], w=1.3)
    insel = [P(104, 26), P(176, 22), P(186, 44), P(176, 66), P(104, 66), P(96, 46)]
    k.flaeche(insel, fill="#fff", w=1.4)
    k.text_pfad([P(10, 30), P(80, 34)], "Darpat", groesse=17, abstand=4)
    # Burg auf der Insel
    g.mauer_rechteck(116, 30, 46, 30, d=2)
    for x, y in ((116, 30), (162, 30), (116, 60), (162, 60)):
        X, Y = P(x, y)
        k.kreis(X, Y, 12, fill="#1a1a1a", stroke=None)
        k.kreis(X, Y, 6, fill="#fff", stroke=None)
    g.mauer_rechteck(120, 34, 16, 12, d=1.2)
    g.tuer(139, 59, breite=4, richtung="h", d=2, tor=True)
    g.flaeche(118, 48, 42, 10, "url(#pflaster)")
    # Burgbrücke
    g.flaeche(136, 66, 6, 14, "#fff", w=1.2)
    for y in (68, 72, 76):
        g.wand(136, y, 142, y, d=.2)
    # Festplatz
    g.flaeche(100, 84, 82, 26, "url(#pflaster)", w=.8, dash="4 3")
    g.flaeche(132, 86, 14, 6, "#fff", w=1.1)
    g.flaeche(134, 86, 10, 2, "#1a1a1a")
    for (x, y) in ((104, 88), (110, 88), (104, 100), (110, 100), (160, 88), (166, 88), (160, 100), (172, 100), (122, 102), (150, 102)):
        g.flaeche(x, y, 4.4, 3, "#fff", w=.8)
        X, Y = P(x, y)
        k.linie([(X, Y), (X + 18.5, Y + 12.6)], w=.4)
    # Straße mit Girlanden
    k.strasse([P(0, 120), P(272, 120)], breite=34, glatt_=False)
    k.text(*P(8, 120), "← Mardramund", klasse="tk", groesse=14, anker="start")
    k.text(*P(264, 120), "Wandlether Hof →", klasse="tk", groesse=14, anker="end")
    for x in range(88, 196, 9):
        k.kurve([P(x, 112), P(x + 2.5, 120), P(x, 128)], w=.8, dash="1 2.5")
    # Station: alt, neuer Flügel, neues Relais
    g.mauer_rechteck(40, 132, 30, 20, d=.9)
    g.wand(56, 132, 56, 152, d=.6)
    for tx, ty in ((42.5, 136), (42.5, 143), (49, 136)):
        g.tisch(tx, ty, 4.5, 1.8)
    g.herd(64, 134, 4, 2)
    g.tuer(48, 132.45, breite=1.8, richtung="h", d=.9)
    g.tuer(56, 146, breite=1.2, richtung="v", d=.6)
    g.mauer_rechteck(70, 132, 30, 20, d=.9)
    for x in (80, 90):
        g.wand(x, 132, x, 152, d=.5)
    for x in (72, 82, 92):
        g.bett(x + 1, 135, 2.2, 3.4)
        g.bett(x + 4.6, 135, 2.2, 3.4)
        g.tuer(x + 3, 132.45, breite=1.2, richtung="h", d=.9)
    g.flaeche(70, 152.5, 30, 3, "url(#geruest)", w=.6, dash="3 2")
    g.mauer_rechteck(40, 160, 40, 16, d=.9, zustand="rohbau")
    g.stall(41, 161, 38, 5, 8)
    # Burggarten mit Tsahaus und Festhof
    g.flaeche(186, 132, 70, 50, "url(#gras)", w=1, dash="2 3")
    for x in range(192, 252, 5):
        g.saeule(x, 136)
        g.saeule(x, 178)
    for y in range(141, 178, 5):
        g.saeule(190, y)
        g.saeule(252, y)
    g.rundbau(221, 157, 8, d=.9)
    g.tuer(221, 164.6, breite=2, richtung="h", d=.9, tor=True)
    X, Y = P(221, 157)
    for a in range(0, 360, 30):
        import math
        k.linie([(X, Y), (X + 22 * math.cos(math.radians(a)), Y + 22 * math.sin(math.radians(a)))], w=.4, dash="2 2")
    # Stadthäuser
    for x, y, b, h in ((4, 84, 18, 14), (26, 86, 22, 12), (52, 84, 16, 16), (74, 86, 20, 14), (196, 84, 20, 14), (220, 86, 24, 12),
                       (248, 84, 20, 16), (4, 134, 26, 14), (4, 154, 20, 18), (108, 134, 22, 16), (134, 132, 18, 20), (108, 160, 24, 14),
                       (140, 158, 20, 18), (164, 134, 16, 16), (164, 160, 16, 14), (4, 180, 30, 14), (40, 182, 26, 12), (100, 182, 30, 12)):
        _haus(g, x, y, b, h)

    for n, x, y in ((1, 145, 41), (2, 147, 73), (3, 139, 96), (4, 48, 148), (5, 85, 128.5), (6, 60, 172),
                    (7, 221, 151), (8, 238, 172), (9, 92, 108), (10, 36, 104)):
        g.nummer(x, y, n)
    k.massstab(860, 862, 4.2, 50, "Schritt", segment=10)
    k.nordpfeil(1130, 210, drehung=-90)
    k.rahmen(titel_breite=470, titel_x=40, titel_y=34)
    return k


# ====================================================================== Gnitzenkuhl
def gnitzenkuhl():
    k = Bild(1200, 900, "Gnitzenkuhl", "Station 10 · Damm, Pfahldorf und Storchenhaus")
    g = Grundriss(k, 4.5, 30, 40)
    P = g.P
    g.flaeche(0, 0, 252, 186, "url(#sumpf)")
    for poly in ([P(10, 20), P(50, 14), P(70, 30), P(40, 46), P(12, 40)], [P(150, 130), P(200, 136), P(196, 170), P(150, 176), P(136, 150)],
                 [P(180, 12), P(240, 10), P(246, 50), P(205, 56), P(176, 36)], [P(20, 140), P(56, 150), P(50, 178), P(10, 172)]):
        k.flaeche(poly, fill="url(#wasser)", w=1)
    # Damm
    k.strasse([P(0, 95), P(190, 95)], breite=34, glatt_=False)
    k.hang([P(0, 89), P(190, 89)], laenge=10, abstand=5, seite=-1)
    k.hang([P(190, 101), P(0, 101)], laenge=10, abstand=5, seite=-1)
    # Dammbaustelle
    g.flaeche(190, 91.2, 62, 7.6, "url(#schraffur)", w=1, dash="6 3")
    k.hang([P(190, 89), P(252, 89)], laenge=10, abstand=7, seite=-1, w=.5)
    k.text(*P(8, 95), "← Wandlether Hof", klasse="tk", groesse=14, anker="start")
    k.text(*P(186, 95), "Gaulsfurt →", klasse="tk", groesse=14, anker="end")
    # Stationshaus auf der Dammverbreiterung
    g.flaeche(116, 66, 54, 23, "url(#sand)")
    k.hang([P(116, 66), P(170, 66)], laenge=8, abstand=5, seite=-1, w=.5)
    g.mauer_rechteck(120, 70, 30, 16, d=.9)
    g.wand(136, 70, 136, 86, d=.6)
    for tx, ty in ((122.5, 73), (122.5, 79.5), (129, 73)):
        g.tisch(tx, ty, 4.5, 1.8)
    g.herd(144, 71.5, 4, 2)
    g.tuer(128, 85.55, breite=1.8, richtung="h", d=.9, aufschlag=-1)
    g.tuer(136, 81, breite=1.2, richtung="v", d=.6)
    g.mauer_rechteck(150, 70, 16, 16, d=.9, zustand="rohbau")
    # Pfahlhäuser mit Stegen
    for x, y in ((20, 60), (42, 66), (64, 58), (86, 66), (176, 62)):
        k.linie([P(x + 5, y + 9.5), P(x + 5, 88)], w=5.5)
        k.linie([P(x + 5, y + 9.5), P(x + 5, 88)], w=3.6, farbe="#fff")
        g.pfahlhaus(x, y, 10, 8)
    # Storchenhaus mit Kräutergarten und Trockenböden
    k.linie([P(85, 101), P(85, 112)], w=7)
    k.linie([P(85, 101), P(85, 112)], w=5, farbe="#fff")
    g.pfahlhaus(70, 112, 30, 18, d=.9)
    g.wand(88, 112, 88, 130, d=.5)
    for i in range(4):
        g.bett(71.6 + i * 3.8, 114, 2.4, 3.6)
        g.bett(71.6 + i * 3.8, 125, 2.4, 3.6)
    g.altar(92, 113.4, 3, 1.2)
    X, Y = P(96, 125)
    k.kreis(X, Y, 9, fill="#fff", w=1.2)
    for a in range(0, 360, 40):
        import math
        k.linie([(X + 5 * math.cos(math.radians(a)), Y + 5 * math.sin(math.radians(a))), (X + 12 * math.cos(math.radians(a + 20)), Y + 12 * math.sin(math.radians(a + 20)))], w=.6)
    g.flaeche(60, 136, 50, 16, "#fff", w=1)
    for i in range(6):
        g.flaeche(62 + i * 8, 138, 6, 12, "url(#feld)", w=.6)
    for i in range(3):
        g.flaeche(104 + i * 4, 114 + 20, .6, 0.6, "#1a1a1a")
    for y in (116, 121, 126):
        g.wand(104, y, 114, y, d=.25)
    for x in (104, 114):
        g.wand(x, 115, x, 127, d=.4)
    # Arbeiterbaracken und Aufseherhütte
    for x in (200, 220):
        g.pfahlhaus(x, 110, 16, 9, d=.6)
        for i in range(4):
            g.bett(x + 1 + i * 3.8, 111.3, 2, 3)
    g.mauer_rechteck(206, 76, 12, 8, d=.6)
    g.tisch(208, 78, 6, 2, baenke=False)
    # Ruine des Wachturms
    X, Y = P(215, 30)
    k.add(f'<path d="M{X + 30} {Y} A30 30 0 1 1 {X - 21} {Y - 21}" fill="none" stroke="#1a1a1a" stroke-width="7"/>')
    k.add(f'<path d="M{X + 30} {Y} A30 30 0 0 0 {X + 10} {Y - 28}" fill="none" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="3 3"/>')
    for i, (dx, dy) in enumerate(((36, 14), (40, -6), (-38, 20))):
        k.rechteck(X + dx, Y + dy, 6, 4, fill="#fff", w=.8)

    for n, x, y in ((1, 40, 104.5), (2, 128, 64), (3, 158, 78), (4, 79, 121), (5, 85, 154), (6, 118, 121),
                    (7, 53, 58), (8, 222, 102), (9, 228, 124), (10, 212, 70), (11, 215, 30)):
        g.nummer(x, y, n)
    k.massstab(860, 862, 4.5, 40, "Schritt", segment=10)
    k.nordpfeil(1130, 210)
    k.rahmen(titel_breite=470, titel_x=40, titel_y=34)
    return k


# ====================================================================== Gaulsfurt
def gaulsfurt():
    import math
    k = Bild(1200, 900, "Gaulsfurt", "Station 11 · Furt, Kreuzung und Gedenkfeld")
    g = Grundriss(k, 3.8, 30, 40)
    P = g.P
    g.flaeche(0, 0, 300, 222, "url(#gras)")
    # Darpat
    nord = [P(0, 0), P(300, 0)]
    sued = [P(300, 64), P(220, 70), P(150, 66), P(80, 72), P(0, 66)]
    k.flaeche(nord + sued, fill="url(#wasser)", stroke=None, glatt_=False)
    k.kurve(sued, w=1.4)
    k.text_pfad([P(30, 30), P(110, 26)], "Darpat", groesse=18, abstand=5)
    furt = [P(146, 66), P(150, 45), P(146, 22), P(150, 0)]
    k.kurve(furt, w=8, farbe="#fff")
    k.kurve(furt, w=1, dash="1.5 4")
    for y in (58, 46, 34, 22, 10):
        for dx in (-5, 5):
            X, Y = P(148 + dx, y)
            k.kreis(X, Y, 2.4, fill="#1a1a1a", stroke=None)
    k.text(*P(292, 20), "zum Heiligtum Raschia'Hal →", klasse="tk", groesse=14, anker="end")
    # Straßen
    k.strassennetz([([P(0, 108), P(300, 108)], 34), ([P(148, 108), P(150, 160), P(156, 222)], 30), ([P(148, 108), P(147, 70)], 26)])
    k.text(*P(8, 108), "← Gnitzenkuhl", klasse="tk", groesse=14, anker="start")
    k.text(*P(292, 108), "Rabicum →", klasse="tk", groesse=14, anker="end")
    k.text(*P(146, 200), "Kronstraße nach Zorgan", klasse="tk", groesse=14, anker="end")
    # Zollbuden
    g.mauer_rechteck(130, 92, 9, 7, d=.6)
    g.tuer(139, 95.5, breite=1.4, richtung="v", d=.6)
    k.linie([P(140, 100.5), P(144, 100.5)], w=2.2)
    g.mauer_rechteck(158, 117, 9, 7, d=.6)
    g.tuer(158, 120.5, breite=1.4, richtung="v", d=.6)
    k.linie([P(152, 116), P(157, 116)], w=2.2)
    # Mondsilberkontor
    g.mauer_rechteck(176, 76, 36, 26, d=1)
    g.flaeche(184, 82, 20, 14, "url(#pflaster)")
    g.mauer_rechteck(184, 82, 20, 14, d=.5, innen=None)
    for x in range(186, 204, 4):
        g.saeule(x, 83.5)
        g.saeule(x, 94.5)
    g.brunnen(194, 89, 1.4)
    g.tuer(194, 101.5, breite=2.4, richtung="h", d=1)
    X, Y = P(194, 72)
    k.add(f'<path d="M{X - 6} {Y - 8} a10 10 0 1 0 0 16 a7.5 7.5 0 1 1 0 -16 Z" fill="#1a1a1a"/>')
    # Phex-Tempel
    g.mauer_rechteck(108, 80, 16, 16, d=.9)
    g.altar(114, 82, 4, 1.4)
    g.tuer(116, 95.55, breite=1.8, richtung="h", d=.9, aufschlag=-1)
    # Station und neuer Flügel
    g.flaeche(92, 118, 44, 44, "url(#pflaster)")
    g.mauer_rechteck(92, 118, 44, 16, d=.9)
    g.wand(112, 118, 112, 134, d=.6)
    for tx, ty in ((95, 121), (95, 127.5), (102, 121)):
        g.tisch(tx, ty, 5, 1.8)
    g.herd(128, 120, 5, 2)
    g.tuer(104, 118.45, breite=1.8, richtung="h", d=.9)
    g.tuer(112, 130, breite=1.2, richtung="v", d=.6)
    g.mauer_rechteck(92, 134, 14, 28, d=.8)
    g.stall(93, 135, 5, 26, 6, richtung="v")
    g.mauer_rechteck(116, 140, 20, 22, d=.9, zustand="rohbau")
    # Händlerhof
    g.mauer_rechteck(176, 118, 40, 30, d=.8)
    g.flaeche(181, 123, 30, 20, "url(#sand)")
    g.mauer_rechteck(181, 123, 30, 20, d=.3, innen=None)
    for x in range(183, 211, 5):
        g.saeule(x, 123)
        g.saeule(x, 143)
    g.tuer(196, 118.4, breite=4, richtung="h", d=.8, tor=True)
    # Gedenkfeld
    k.flaeche([P(196, 160), P(296, 158), P(298, 220), P(190, 220)], fill="#fff", stroke="#1a1a1a", w=.8, glatt_=False, dash="3 4")
    import random
    rnd = random.Random(141)
    for _ in range(90):
        x, y = rnd.uniform(200, 292), rnd.uniform(164, 216)
        X, Y = P(x, y)
        k.kreis(X, Y, rnd.uniform(1.2, 2.4), fill="#1a1a1a", stroke=None)
    X, Y = P(256, 190)
    k.rechteck(X - 12, Y - 16, 24, 32, fill="#fff", w=1.6)
    k.kreis(X, Y, 8, fill="none", w=1.2)
    for a in (30, 90, 150, 210):
        k.linie([(X, Y), (X + 8 * math.cos(math.radians(a)), Y + 8 * math.sin(math.radians(a)))], w=.9)
    k.linie([(X + 3, Y - 9), (X + 7, Y - 2), (X + 4, Y + 3)], w=1.6, farbe="#fff")
    g.mauer_rechteck(212, 162, 12, 12, d=1.2)
    g.flaeche(216.5, 163.4, 3, 1, "#1a1a1a")
    g.tuer(218, 173.4, breite=1.4, richtung="h", d=1.2, tor=True)
    g.mauer_rechteck(210, 174, 16, 8, d=.7, zustand="rohbau")
    for x, y, b, h in ((10, 80, 18, 14), (34, 78, 20, 16), (60, 82, 16, 12), (10, 120, 20, 14), (36, 122, 18, 16), (62, 120, 20, 14),
                       (230, 78, 20, 16), (256, 80, 24, 12), (232, 120, 22, 16), (262, 122, 18, 14), (14, 150, 22, 14)):
        _haus(g, x, y, b, h)

    for n, x, y in ((1, 140, 40), (2, 134.5, 87.5), (3, 171, 120.5), (4, 194, 106), (5, 116, 89), (6, 120, 128),
                    (7, 126, 151), (8, 196, 153), (9, 141, 190), (10, 280, 170), (11, 270, 202), (12, 230, 166)):
        g.nummer(x, y, n)
    k.massstab(60, 862, 3.8, 50, "Schritt", segment=10)
    k.nordpfeil(1130, 210)
    k.rahmen(titel_breite=470, titel_x=40, titel_y=34)
    return k


# ====================================================================== Rabicum
def rabicum():
    import math
    k = Bild(1200, 900, "Rabicum", "Station 12 · Station, Rosenhaus und Weinberge")
    g = Grundriss(k, 5, 30, 30)
    P = g.P
    g.flaeche(0, 0, 232, 172, "url(#wein)")
    for y0 in (22, 50, 140, 160):
        k.hang([P(0, y0), P(60, y0 + 4), P(120, y0 - 2), P(232, y0 + 3)], laenge=7, abstand=8, seite=-1, w=.5)
    # Freiflächen
    k.flaeche([P(36, 60), P(176, 30), P(196, 74), P(186, 122), P(40, 128)], fill="#fff", stroke=None)
    k.flaeche([P(36, 60), P(176, 30), P(196, 74), P(186, 122), P(40, 128)], fill="url(#gras)", stroke=None)
    k.flaeche([P(186, 126), P(226, 122), P(228, 162), P(190, 164)], fill="#fff", stroke=None)
    # Straße
    k.strasse([P(0, 122), P(80, 116), P(150, 112), P(232, 100)], breite=34)
    k.text(*P(8, 128), "← Gaulsfurt", klasse="tk", groesse=14, anker="start")
    k.text(*P(224, 106), "Perricum →", klasse="tk", groesse=14, anker="end")
    # Station mit Innenhof
    g.flaeche(70, 66, 50, 34, "url(#pflaster)")
    g.mauer_rechteck(70, 66, 50, 12, d=.9)
    g.mauer_rechteck(70, 78, 12, 22, d=.9)
    g.mauer_rechteck(108, 78, 12, 22, d=.9)
    for x in (86, 98):
        g.wand(x, 66, x, 78, d=.5)
    for tx, ty in ((72.5, 69), (72.5, 73.5), (88, 69)):
        g.tisch(tx, ty, 5, 1.6)
    g.herd(114, 67.5, 4, 2)
    for i in range(3):
        g.bett(71.6, 80 + i * 6, 2.4, 3.6)
        g.bett(116, 80 + i * 6, 2.4, 3.6)
    for x in (78, 92, 104, 114):
        g.tuer(x, 77.55, breite=1.4, richtung="h", d=.9, aufschlag=-1)
    g.tuer(82, 90, breite=1.2, richtung="v", d=.9)
    g.tuer(108, 90, breite=1.2, richtung="v", d=.9)
    g.brunnen(95, 88, 1.6)
    g.b.einzelbaum(*P(95, 82), r=11, saat=151)
    # Tanzplatz mit Laternen und Fässern
    g.flaeche(66, 101, 58, 10, "url(#pflaster)", w=.8, dash="4 3")
    for x in range(68, 124, 6):
        g.laterne(x, 100.5)
    for x in (128, 132, 136):
        X, Y = P(x, 106)
        k.kreis(X, Y, 6, fill="#fff", w=1)
        k.kreis(X, Y, 2.5, fill="none", w=.6)
    # Rosenhaus über dem Keller
    g.mauer_rechteck(126, 34, 42, 30, d=.8, zustand="geplant")
    k.text(*P(147, 61), "Keller", klasse="tk", groesse=12)
    for x in range(134, 162, 4):
        g.saeule(x, 40)
        g.saeule(x, 56)
    for y in (44, 48, 52):
        g.saeule(132, y)
        g.saeule(162, y)
    for x in range(134, 162, 4):
        for y in (38.5, 57.5):
            X, Y = P(x + 2, y)
            k.add(f'<path d="M{X - 6} {Y} q3 -4 6 0 q3 4 6 0" fill="none" stroke="#1a1a1a" stroke-width=".6"/>')
    g.flaeche(144, 46.5, 6, 3, "#1a1a1a")
    g.mauer_rechteck(168, 52, 8, 10, d=.7)
    g.treppe(169.4, 53.4, 5.2, 7.2, stufen=6, richtung="v")
    k.kurve([P(172, 62), P(176, 84), P(170, 108)], w=1, dash="1.5 4")
    k.kurve([P(147, 64), P(140, 84), P(120, 100)], w=1, dash="1.5 4")
    for x, y in ((158, 74), (164, 88), (142, 80)):
        g.laterne(x, y)
    # Kelterhaus
    g.mauer_rechteck(40, 70, 22, 16, d=.8)
    X, Y = P(51, 78)
    k.kreis(X, Y, 18, fill="#fff", w=1.4)
    k.kreis(X, Y, 4, fill="#1a1a1a", stroke=None)
    g.tuer(51, 85.6, breite=3, richtung="h", d=.8, tor=True)
    # Aussicht
    X, Y = P(204, 140)
    k.rechteck(X - 18, Y - 3, 36, 6, fill="#fff", w=1)
    k.linie([(X + 22, Y), (X + 70, Y)], w=1.4)
    k.add(f'<path d="M{X + 72} {Y} l-9 -4 v8 Z" fill="#1a1a1a"/>')
    k.text(X + 10, Y + 22, "Blick auf Perricum", klasse="tk", groesse=13, anker="start")
    k.kurve([P(180, 108), P(190, 124), P(200, 138)], w=1, dash="1.5 4")

    for n, x, y in ((1, 78, 61), (2, 95, 93.5), (3, 76, 106), (4, 147, 30), (5, 147, 44), (6, 130, 60), (7, 180, 57),
                    (8, 51, 66), (9, 20, 40), (10, 196, 131)):
        g.nummer(x, y, n)
    k.massstab(860, 862, 5, 40, "Schritt", segment=10)
    k.nordpfeil(1130, 210, drehung=45)
    k.rahmen(titel_breite=470, titel_x=40, titel_y=34)
    return k


# ====================================================================== Ausgabe
KARTEN = {
    "strecke": strecke,
    "musterstation": musterstation,
    "natterbruecke": natterbruecke,
    "sonnenfeld": sonnenfeld,
    "hohenstein": hohenstein,
    "mardramund": mardramund,
    "kreuz": kreuz,
    "nattersquell": nattersquell,
    "hartsteen": hartsteen,
    "wandlether-hof": wandlether_hof,
    "wasserburg": wasserburg,
    "gnitzenkuhl": gnitzenkuhl,
    "gaulsfurt": gaulsfurt,
    "rabicum": rabicum,
}


def main():
    os.makedirs(ZIEL, exist_ok=True)
    namen = sys.argv[1:] or list(KARTEN)
    for n in namen:
        svg = KARTEN[n]().svg()
        with open(os.path.join(ZIEL, f"{n}.svg"), "w", encoding="utf-8") as fh:
            fh.write(svg)
        print(f"img/karten/{n}.svg  {len(svg) // 1024} KB")


if __name__ == "__main__":
    main()
