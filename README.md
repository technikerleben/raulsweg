# Der Raulsweg

Fan-Quellenband zum Raulsweg, der neuen Kaiserstraße von Gareth nach Perricum (Das Schwarze Auge). Grundlage für die Kampagne *Auf dem Raulsweg*.

Statische Website ohne Build-Schritt: `index.html` öffnen oder das Repo auf Vercel als statisches Projekt deployen (Framework: „Other“, kein Build-Befehl, Ausgabeverzeichnis = Wurzel).

## Aufbau

```
index.html          Gerüst, Navigation
css/style.css       Gestaltung
js/app.js           Navigation (Hash-Routen), Meister-Umschalter, Streckenband
data/stationen.js   12 Stationen, Gareth, Perricum, Reisezeiten
data/kapitel.js     Überblick, Stationswesen, Reisen, Anhang, Ausbaustufen
data/maechte.js     Mächte am Weg
img/titel.webp      Titelbild (optional)
img/stationen/      Stationsbilder
img/ui/             Ornamente, Karte (später)
```

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
| 8 | `08-wandlether-hof` |
| 9 | `09-wasserburg` |
| 10 | `10-gnitzenkuhl` |
| 11 | `11-gaulsfurt` |
| 12 | `12-rabicum` |

Endung `.webp`, `.jpg`, `.jpeg` oder `.png`; die Seite probiert sie in dieser Reihenfolge. Seitenverhältnis 3:2, empfohlen etwa 1600 × 1067 Pixel. Fehlt ein Bild, erscheint ein Platzhalter.

Titelbild: `img/titel.webp` (oder `.jpg`), Querformat, etwa 2400 × 1000 Pixel.

## Kennzeichnung

- **Kanon**: Ort aus offiziellen Quellen (Beschreibungen sind trotzdem Interpretation).
- **Ergänzung**: für diesen Band erfundener Ort (Sonnenfeld, Rommilyser Kreuz, Natterbrücke, Wandlether Hof).
- Entfernungen mit `~` sind geschätzt.

## Ausbaustufen

1. Grundgerüst (vorhanden)
2. Figuren – Feld `figuren: []` in jeder Station
3. Gebäude und Orte – Feld `gebaeude: []`
4. Karte und Strecke, Reisezeitrechner
5. Mächte und Beziehungsnetz
6. Spielhilfen (Begegnungen, Gerüchtetabellen, Wetter, Namen)
7. Handouts (Geleitbrief, Leumundsbrief, Stempelheft)
8. Abenteuer der Kampagne
9. Export (Druck, PDF, EPUB)

---

Inoffizielles Fanprojekt. DAS SCHWARZE AUGE, AVENTURIEN und DERE sind eingetragene Marken der Ulisses Spiele GmbH.
