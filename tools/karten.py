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
    k = Bild(1600, 1000, "Der Raulsweg", "Von Gareth nach Perricum · schematisch, nicht maßstabsgetreu")
    X = lambda meile: 140 + meile * (1330 / 240)
    halte = [  # (nr, name, meile, y, beschriftung dx, dy, anker)
        (0, "Gareth", 0, 575), (1, "Nattersquell", 10, 560), (2, "Hartsteen", 30, 538), (3, "Sonnenfeld", 50, 552),
        (4, "Rommilyser Kreuz", 65, 532), (5, "Feste Hohenstein", 75, 512), (6, "Natterbrücke", 85, 520),
        (7, "Mardramund", 100, 500), (8, "Wandlether Hof", 120, 540), (9, "Wasserburg", 145, 522),
        (10, "Gnitzenkuhl", 175, 556), (11, "Gaulsfurt", 205, 538), (12, "Rabicum", 215, 520), (13, "Perricum", 240, 482)]
    P = {n: (X(m), y) for n, _, m, y in halte}

    # --- Meer und Küste
    kueste = [(1600, 120), (1540, 180), (1515, 260), (1530, 330), (1508, 400), (1500, 455), (1520, 520), (1505, 600),
              (1525, 690), (1515, 780), (1545, 870), (1600, 940)]
    k.flaeche(kueste + [(1600, 1000), (1600, 100)], fill="url(#meer)", w=1.6)
    k.kurve([(x + 9, y) for x, y in kueste], w=.6)
    k.text(1560, 640, "Golf von Perricum", klasse="tk", groesse=19, drehung=-90, abstand=3)

    # --- Gelände
    k.bergland([(250, 575), (330, 572), (345, 615), (300, 635), (240, 620)], b=28, saat=4)          # Steinbrüche Hartsteen
    k.text(292, 650, "Steinbrüche", klasse="tk", groesse=13)
    k.bergland([(500, 440), (560, 425), (600, 460), (570, 480), (520, 480)], b=28, saat=5)         # Enge Hohenstein Nord
    k.bergland([(510, 545), (575, 540), (600, 575), (540, 600), (500, 580)], b=28, saat=6)         # Enge Hohenstein Süd
    k.bergland([(1300, 560), (1400, 545), (1440, 600), (1380, 640), (1300, 620)], b=30, saat=7)    # Hügel vor Perricum
    k.flaeche([(360, 565), (450, 560), (470, 610), (420, 640), (360, 620)], fill="url(#feld)", stroke=None)
    k.flaeche([(370, 500), (450, 505), (455, 535), (380, 538)], fill="url(#feld)", stroke=None)
    k.text(412, 625, "Weizenfelder", klasse="tk", groesse=14)
    k.flaeche([(1318, 545), (1360, 540), (1372, 568), (1330, 575)], fill="url(#wein)", stroke=None)
    k.flaeche([(1060, 505), (1165, 500), (1180, 530), (1150, 600), (1070, 610), (1040, 570)], fill="url(#sumpf)", stroke=None)
    k.text(1110, 625, "Gnitzensumpf", klasse="tk", groesse=14)
    k.wald([(735, 560), (785, 568), (830, 562), (900, 548), (930, 600), (880, 680), (800, 710), (740, 690), (715, 620)], r=10, saat=11)
    k.wald([(745, 505), (770, 478), (830, 466), (900, 482), (905, 520), (840, 528), (800, 524)], r=9, saat=12)
    k.wald([(170, 380), (260, 360), (300, 420), (220, 450), (160, 430)], r=9, saat=13)
    k.text(840, 728, "Wandlether Forst", klasse="tk", groesse=15)
    k.text(300, 300, "G A R E T I E N", klasse="t", groesse=30, abstand=10, halo=False)
    k.text(900, 300, "D A R P A T I E N", klasse="t", groesse=30, abstand=10, halo=False)
    k.text(1090, 790, "M A R K G R A F S C H A F T", klasse="t", groesse=20, abstand=6, halo=False)
    k.text(1090, 822, "P E R R I C U M", klasse="t", groesse=26, abstand=8, halo=False)

    # --- Flüsse
    darpat = [(590, 28), (596, 150), (582, 280), (598, 380), (640, 440), (700, 452), (770, 455), (860, 445), (950, 470),
              (1030, 478), (1110, 485), (1200, 492), (1290, 507), (1370, 488), (1440, 470), (1508, 470)]
    k.fluss(darpat, b0=7, b1=22)
    k.text_pfad([(800, 437), (870, 428), (940, 450)], "Darpat", groesse=18, abstand=4)
    k.text_pfad([(570, 180), (575, 300)], "Darpat", groesse=16, abstand=3)
    natter = [P[1], (210, 600), (300, 640) if False else (300, 680), (400, 700), (500, 660), (590, 560), (622, 522),
              (650, 480), (700, 456)]
    k.fluss([(P[1][0], P[1][1] + 6)] + natter[1:], b0=2, b1=7, schraffur=False)
    k.text_pfad([(320, 676), (440, 692)], "Natter", groesse=15, abstand=3)
    # Wasserburg auf der Flussinsel
    k.flaeche([(935, 462), (955, 458), (962, 470), (945, 476)], fill="#fff", w=1)

    # --- Nebenstraßen
    netz = [([P[4], (510, 430), (545, 300), (555, 160), (550, 40)], 3.5)]
    k.text(530, 240, "nach Rommilys", klasse="tk", groesse=15, drehung=-86)
    netz.append(([P[8], (800, 620), (770, 800), (760, 975)], 3.5))
    k.text(742, 900, "nach Wandleth", klasse="tk", groesse=15, drehung=-88)
    netz.append(([P[11], (1295, 650), (1320, 800), (1335, 975)], 3.5))
    k.text(1352, 900, "Kronstraße nach Zorgan", klasse="tk", groesse=15, drehung=-84)
    netz.append(([(30, 585), P[0]], 5))
    k.text(70, 610, "nach Angbar", klasse="tk", groesse=13)

    # --- Raulsweg
    zug = [P[i] for i in range(14)]
    k.strassennetz(netz + [(zug, 8)])

    # --- Halte
    def stadt(x, y, r):
        k.kreis(x, y, r, fill="#fff", w=2)
        k.kreis(x, y, r - 5, fill="url(#schraffur-fein)", w=.8)
        for i in range(12):
            import math
            a = i * math.pi / 6
            k.rechteck(x + (r + 2) * math.cos(a) - 2.5, y + (r + 2) * math.sin(a) - 2.5, 5, 5, fill=TINTE, stroke=None)

    stadt(*P[0], 20)
    stadt(*P[13], 18)
    k.text(P[0][0] - 2, P[0][1] - 44, "Gareth", klasse="t", groesse=26, abstand=1.5)
    k.text(P[13][0] - 40, P[13][1] - 40, "Perricum", klasse="t", groesse=24, abstand=1.5)
    beschriftung = {1: (8, 34), 2: (0, -32), 3: (0, 34), 4: (-52, -52), 5: (22, -34), 6: (40, 32), 7: (6, -32), 8: (62, 30),
                    9: (0, -32), 10: (0, 34), 11: (-4, 34), 12: (8, -34)}
    for n, name, _, _ in halte[1:13]:
        x, y = P[n]
        k.nummer(x, y, n, r=13)
        dx, dy = beschriftung[n]
        zeilen = {"Rommilyser Kreuz": ["Rommilyser", "Kreuz"]}.get(name, [name])
        for i, z in enumerate(zeilen):
            k.text(x + dx, y + dy + i * 18, z, klasse="t", groesse=16)
    # Wegmarken
    k.text(P[11][0] + 24, P[11][1] - 26, "Furt", klasse="tk", groesse=13)
    k.text(705, 432, "Mündung der Natter", klasse="tk", groesse=12, anker="start")

    # --- Legende, Maßstab, Norden
    lx, ly = 40, 790
    k.rechteck(lx, ly, 330, 170, fill="#fff", w=1.2)
    k.text(lx + 165, ly + 20, "Zeichenerklärung", klasse="t", groesse=16)
    k.strasse([(lx + 18, ly + 50), (lx + 70, ly + 50)], breite=8, glatt_=False)
    k.text(lx + 84, ly + 50, "Raulsweg (Reichsstraße 3)", klasse="tk", groesse=14, anker="start", halo=False)
    k.strasse([(lx + 18, ly + 78), (lx + 70, ly + 78)], breite=3.5, glatt_=False)
    k.text(lx + 84, ly + 78, "Abzweigende Straße", klasse="tk", groesse=14, anker="start", halo=False)
    k.nummer(lx + 44, ly + 108, 5, r=11)
    k.text(lx + 84, ly + 108, "Station mit Nummer", klasse="tk", groesse=14, anker="start", halo=False)
    k.kreis(lx + 44, ly + 138, 11, fill="url(#schraffur-fein)", w=1.6)
    k.text(lx + 84, ly + 138, "Stadt", klasse="tk", groesse=14, anker="start", halo=False)
    k.massstab(1110, 935, 1330 / 240, 40, "Meilen", segment=10)
    k.nordpfeil(1460, 860)
    k.rahmen(titel_breite=560, titel_x=40, titel_y=40, titel_groesse=46)
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
    k.text(P(165, 216)[0], P(165, 216)[1], "Fließrichtung ↓", klasse="tk", groesse=13)
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
    k.nordpfeil(1120, 110)
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
    k.nordpfeil(1130, 120)
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
    k.text(P(45, 33)[0], P(45, 33)[1], "Wandlether Hof →", klasse="tk", groesse=14)
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
    k.nordpfeil(1130, 110)
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
    k.nordpfeil(1130, 120)
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
