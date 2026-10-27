# Ansichten zu den Plänen

Bilder von Gebäuden und Orten, die die schwarz-weißen Pläne ergänzen. Sie müssen den Plänen nicht in allen Einzelheiten entsprechen; die Website weist darauf hin.

**Verzeichnis:** `img/gebaeude/` (klein geschrieben, sonst findet Vercel die Dateien nicht)

**Dateiname:** die ID des Plans, bei mehreren Bildern mit `-2`, `-3` … angehängt:

- `rabicum.webp` (erstes Bild)
- `rabicum-2.webp`, `rabicum-3.webp` (weitere Bilder, lückenlos durchnummeriert)

Endung `.webp`, `.jpg`, `.jpeg` oder `.png`. Querformat 3:2, etwa 1600 × 1067 Pixel. Die Website zeigt die Bilder automatisch beim Plan und auf der Stationsseite an, sobald sie im Repo liegen. Für die EPUB danach `python3 tools/build_epub.py` ausführen.

| Station | Plan | ID |
|---|---|---|
| – | Der Raulsweg | `strecke` |
| – | Musterstation | `musterstation` |
| 1 Nattersquell | Station und Dorf | `nattersquell` |
| 2 Hartsteen | Pfalz am Westtor | `hartsteen` |
| 3 Sonnenfeld | Baustelle der Pfalz | `sonnenfeld` |
| 4 Rommilyser Kreuz | Die Kreuzung | `kreuz` |
| 5 Feste Hohenstein | Kontrollposten in der Enge | `hohenstein` |
| 6 Natterbrücke | Furt und Brückenbaustelle | `natterbruecke` |
| 7 Mardramund | Die Kanzlei | `mardramund` |
| 8 Wasserburg | Burginsel und Festplatz | `wasserburg` |
| 9 Wandlether Hof | Wehrstation im Forst | `wandlether-hof` |
| 10 Gnitzenkuhl | Damm und Pfahldorf | `gnitzenkuhl` |
| 11 Gaulsfurt | Furt und Kreuzung | `gaulsfurt` |
| 12 Rabicum | Station und Rosenhaus | `rabicum` |
