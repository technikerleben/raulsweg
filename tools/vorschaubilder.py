#!/usr/bin/env python3
"""Kleine Porträts für Übersichten: img/figuren/<id>.webp → img/figuren/klein/<id>.webp (240 × 300).

Aufruf im Wurzelverzeichnis: python3 tools/vorschaubilder.py
Fehlt ein kleines Bild, zeigt die Seite einfach das große.
"""
import glob
import os
from PIL import Image

WURZEL = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
QUELLE = os.path.join(WURZEL, "img", "figuren")
ZIEL = os.path.join(QUELLE, "klein")
GROESSE = (240, 300)


def main():
    os.makedirs(ZIEL, exist_ok=True)
    neu = 0
    for pfad in sorted(glob.glob(os.path.join(QUELLE, "*"))):
        name, endung = os.path.splitext(os.path.basename(pfad))
        if endung.lower() not in (".webp", ".jpg", ".jpeg", ".png"):
            continue
        ziel = os.path.join(ZIEL, name + ".webp")
        if os.path.exists(ziel) and os.path.getmtime(ziel) >= os.path.getmtime(pfad):
            continue
        with Image.open(pfad) as bild:
            bild = bild.convert("RGB")
            # mittig auf 4:5 zuschneiden, dann verkleinern
            b, h = bild.size
            soll = b / h > GROESSE[0] / GROESSE[1]
            if soll:
                nb = round(h * GROESSE[0] / GROESSE[1]); bild = bild.crop(((b - nb) // 2, 0, (b - nb) // 2 + nb, h))
            else:
                nh = round(b * GROESSE[1] / GROESSE[0]); bild = bild.crop((0, 0, b, nh))
            bild.resize(GROESSE, Image.LANCZOS).save(ziel, "WEBP", quality=80, method=6)
        neu += 1
    print(f"{neu} Vorschaubilder geschrieben nach img/figuren/klein/")


if __name__ == "__main__":
    main()
