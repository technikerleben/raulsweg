# Der Raulsweg

Fan-Quellenband zum Raulsweg, der neuen Kaiserstraße von Gareth nach Perricum (Das Schwarze Auge). Gedacht als offene Welt: Jede und jeder aus der Runde kann hier eigene Geschichten leiten. Meisterinformationen bieten deshalb mehrere Möglichkeiten statt fester Wahrheiten (Figuren: `geheimnisse`, Tempel: `moeglichkeiten`).

Statische Website ohne Build-Schritt: `index.html` öffnen oder das Repo auf Vercel als statisches Projekt deployen (Framework: „Other“, kein Build-Befehl, Ausgabeverzeichnis = Wurzel).

## Aufbau

```
index.html            Gerüst, Navigation, Reihenfolge der Datenskripte
css/style.css         Gestaltung (Pergament, Nachtansicht, Druck)
js/app.js             Hash-Router, Seiten, Register, automatische Querverweise, Suche
data/stationen.js     Gareth, zwölf Stationen, Perricum, Reisezeiten
data/kapitel.js       Titel, Kapitel (Überblick, Stationswesen, Reisen, Für Spielleitungen, Anhang), Glossar, Ausbaustufen
data/maechte.js       Mächte am Weg und ihr Beziehungsnetz
data/spielhilfen.js   Zufallsbegegnungen, Gerüchte, Wetter und Namen (W20)
data/figuren.js       Figuren mit drei möglichen Geheimnissen
data/tempel.js        Die zwölf Tempel
data/wegpunkte.js     Orte und Szenen zwischen den Stationen
data/karten.js        Karten und Pläne (Texte, Legenden)
data/dokumente.js     Edikt, Brief des Hauses Rabenmund, Verlautbarung des Hauses Paligan
data/chronik.js       Chronik der gespielten Geschichten
img/                  Titelbild, Stationsbilder, Porträts, Stempelheft, Karten (SVG)
tools/                EPUB, Karten, Stempelheft, Streckengeometrie, Schriften
export/               EPUB und Stempelheft-PDFs (erzeugt)
```

Querverweise entstehen automatisch: Jeder Name und jede Namensform aus `begriffe` wird beim ersten Vorkommen auf einer Seite verlinkt. Neue Namensformen also dort ergänzen statt Links von Hand zu setzen. Seiten-Anker: `#/kapitel/abschnitt`, auf Stations-, Orts-, Figuren- und Kartenseiten `#/station/<id>/<abschnitt>`.

Die Daten liegen als `.js` statt `.json`, damit die Seite auch lokal per Doppelklick funktioniert.

## Stationsbilder

Verzeichnis: `img/stationen/`

| Nr. | Dateiname |
|---|---|
| 1 | `01-nattersquell` |
| 2 | `02-hartsteen` |
| 3 | `03-sonnenfeld` |
| 4 | `04-rommilyser-kreuz` |
| 5 | `05-feste-hohenstein` |
| 6 | `06-natterbruecke` |
| 7 | `07-mardramund` |
| 8 | `08-wasserburg` |
| 9 | `09-wandlether-hof` |
| 10 | `10-gnitzenkuhl` |
| 11 | `11-gaulsfurt` |
| 12 | `12-rabicum` |

Endung `.webp`, `.jpg`, `.jpeg` oder `.png`; die Seite probiert sie in dieser Reihenfolge. Seitenverhältnis 3:2, empfohlen etwa 1600 × 1067 Pixel. Fehlt ein Bild, erscheint ein Platzhalter.

Titelbild: `img/titel.webp` (oder `.jpg`), Querformat, etwa 2400 × 1000 Pixel.

## Tempelbilder

Verzeichnis: `img/tempel/`, Dateiname = Tempel-ID aus `data/tempel.js` (Liste in `img/tempel/LIESMICH.md`), `.webp` im Querformat 3:2. Fehlt ein Bild, bleibt die Stelle leer.

## Ansichten zu den Plänen

Verzeichnis: `img/gebaeude/`, Dateiname = ID des Plans (z. B. `rabicum.webp`, weitere als `rabicum-2.webp` …). Die Liste der IDs steht in `img/gebaeude/LIESMICH.md`. Die Bilder erscheinen automatisch beim Plan und auf der Stationsseite.

## Herkunft und Rechte

Seite, Texte, Karten und Bilder sind mit KI erzeugt und gelten als gemeinfrei. Ausgenommen sind die Marken und Inhalte von Das Schwarze Auge (Ulisses Spiele GmbH) und die Schriften in `tools/fonts/` (SIL Open Font License).

## Figurenporträts

Verzeichnis: `img/figuren/`, Dateiname = Figuren-ID aus `data/figuren.js`, z. B. `answald-kreutzer.webp`, `travine-holler.webp`. Hochformat 4:5, etwa 800 × 1000 Pixel. Fehlt ein Porträt, erscheint ein Monogramm.

## Karten und Pläne

`python3 tools/karten.py` zeichnet die schwarz-weißen Karten und Grundrisse neu nach `img/karten/*.svg` (Schriften liegen in `tools/fonts/`, SIL Open Font License). Texte und Legenden stehen in `data/karten.js`; die Nummern in den Plänen müssen zur Legende passen. Die EPUB-Fassung zeichnet die Pläne mit größeren Nummern und dreht sie hochkant. Die Streckenkarte folgt `tools/strecke_geo.py`: Orte, Straßen und Flüsse nach avesmaps.de (1 Karteneinheit ≈ 2,99 Meilen); erfundene Stationen werden nach ihrer Meilenzahl zwischen die Nachbarn gesetzt.

## Stempelheft

`python3 tools/stempelheft.py` erzeugt `export/stempelheft.pdf` (vier Seiten A5: Umschlag, Doppelseite mit zwölf Stempelfeldern, Rückseite) und `export/stempelheft-a4-bogen.pdf` (ein A4-Blatt quer, beidseitig über die kurze Kante drucken und falten). Bild: `img/stempelheft.webp`. Benötigt node, Playwright für Python und pypdf.

## Chronik

Nach jeder gespielten Geschichte einen Eintrag in `data/chronik.js` ergänzen (Vorlage auf der Seite `#/chronik` und im Kopf der Datei). Stationen, Figuren, Tempel und Mächte zeigen dann „In der Chronik“; eine mit `variante` enthüllte Möglichkeit wird in den Meisterinformationen als geltend markiert.

## EPUB-Fassung

`python3 tools/build_epub.py` erzeugt `export/der-raulsweg.epub` aus den aktuellen Daten (benötigt node und Pillow). Optimiert für den Xteink X4 Pro: Graustufenbilder, keine Tabellen, Meisterinformationen in Kästen. Nach Änderungen an den Daten neu erzeugen und mitcommitten.

## Kennzeichnung

- **Kanon**: Ort aus offiziellen Quellen (Beschreibungen sind trotzdem Interpretation).
- **Ergänzung**: für diesen Band erfundener Ort (Sonnenfeld, Rommilyser Kreuz, Natterbrücke, Wandlether Hof).
- Entfernungen nach der Routenplanung von avesmaps.de; mit `~` gemessen oder geschätzt.

## Ausbaustufen

1. Grundgerüst (vorhanden)
2. Figuren (vorhanden; Porträts und Spielwerte offen)
3. Gebäude und Orte – Feld `gebaeude: []`
4. Karte und Strecke, Wegpunkte mit Landmarken, Bauwerken, Bäumen, Felsen und Abstechern (vorhanden; Feld `typ`, `abseits`, `meister` in data/wegpunkte.js); Reisezeitrechner offen
5. Mächte und Beziehungsnetz (vorhanden; `RW.beziehungen` in data/maechte.js, Profil unter `#/macht/<id>`)
6. Spielhilfen (vorhanden; `data/spielhilfen.js`, Seite `#/spielhilfen`): Begegnungen je Abschnitt, Gerüchte, Wetter, Namen, Reisetag-Würfel
7. Handouts (Geleitbrief, Leumundsbrief, Stempelheft)
8. Geschichten am Raulsweg (Chronik, Szenario-Vorlage)
9. Export (Druck, PDF, EPUB)

---

Inoffizielles Fanprojekt. DAS SCHWARZE AUGE, AVENTURIEN und DERE sind eingetragene Marken der Ulisses Spiele GmbH.
