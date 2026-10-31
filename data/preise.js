/* ==========================================================
   Preise am Weg
   ----------------------------------------------------------
   Münzen: 1 Dukat (D) = 10 Silbertaler (S) = 100 Heller (H) = 1000 Kreuzer (K)
   Maßstab sind die Lebensstile aus dem DSA5-Regelwerk (Karg 50 S,
   Annehmbar 150 S, Reichlich 500 S, Üppig 1.500 S im Monat).
   staende[]   von oben nach unten; heller = typische Ausgabe pro Person und Tag ohne Pferd, pferd = Stall und Futter je Tier (beides in Heller, für den Rechner)
   tag[]       Zeilen der Übersicht „Ein Tag auf der Straße“, Werte je Stand
   anschlag[]  Preise, die die Kanzlei nach dem siebten Artikel an jedem Tor anschlägt
   dienste[]   frei verhandelte Dienste unterwegs   zoelle[]  Zölle und Gebühren
   ========================================================== */

window.RW = window.RW || {};

RW.preise = {
  muenzen: [
    ["Dukat", "D", "Gold", "10 Silbertaler"],
    ["Silbertaler", "S", "Silber", "10 Heller"],
    ["Heller", "H", "Kupfer", "10 Kreuzer"],
    ["Kreuzer", "K", "Kupfer", "kleinste Münze"]
  ],

  staende: [
    { id: "adel", name: "Adel und Hof", wer: "Barone, Gesandte, Beamte des Hofes mit Geleitbrief", lebensstil: "Üppig", heller: 140, pferd: 10 },
    { id: "kaufleute", name: "Wohlhabende", wer: "Kaufleute, Gildenmeister, Geweihte von Rang", lebensstil: "Reichlich", heller: 50, pferd: 5 },
    { id: "buerger", name: "Bürger", wer: "Handwerksmeister, Händler mit Karren, Schreiber", lebensstil: "Annehmbar", heller: 18, pferd: 3 },
    { id: "einfach", name: "Einfache Reisende", wer: "Pilger, Gesellen, Fuhrleute, Tagelöhner", lebensstil: "Karg", heller: 7, pferd: 1 },
    { id: "streuner", name: "Arme und Streuner", wer: "Bettler, Landstreicher, Entlaufene, Abgebrannte", lebensstil: "Elend", heller: 1, pferd: 0 }
  ],

  tag: [
    { posten: "Wo man schläft", werte: {
      adel: "Gemach in der Kaiserpfalz", kaufleute: "Einzelzimmer der Herberge", buerger: "Kammer zu viert",
      einfach: "Schlafsaal", streuner: "Stall, Scheune, Kapelle oder am Herd" } },
    { posten: "Nachtlager", werte: {
      adel: "mit Geleitbrief frei, sonst 1 D", kaufleute: "2 bis 3 S", buerger: "8 H",
      einfach: "3 H", streuner: "frei, oft gegen Arbeit" } },
    { posten: "Morgens", werte: {
      adel: "Frühstück mit Fleisch und Wein, 1 S", kaufleute: "Brot, Käse, Eier, 4 H", buerger: "Brot und Grütze, 2 H",
      einfach: "Brot vom Vortag, 1 H", streuner: "was übrig bleibt" } },
    { posten: "Abends", werte: {
      adel: "Tafel mit mehreren Gängen, 3 S", kaufleute: "Braten und Gemüse, 1 S", buerger: "Eintopf mit Fleisch, 5 H",
      einfach: "Mahlzeit des Hauses, 2 H", streuner: "Armensuppe am Herd, frei" } },
    { posten: "Zu trinken", werte: {
      adel: "Wein aus Rabicum, 2 S", kaufleute: "Wein, 5 H", buerger: "zwei Krug Bier, 2 H",
      einfach: "Dünnbier, 1 H", streuner: "Wasser, frei" } },
    { posten: "Pferd", werte: {
      adel: "Box, Hafer, Pferdeknecht, 1 S", kaufleute: "Stall und Hafer, 5 H", buerger: "Stallplatz mit Heu, 3 H",
      einfach: "Maultier im Pferch, 1 H", streuner: "kein Pferd" } },
    { posten: "Waschen", werte: {
      adel: "Bad mit Duftöl, 1 S", kaufleute: "warmes Bad, 3 H", buerger: "Waschwasser, 1 H",
      einfach: "Brunnen, frei", streuner: "Bach, frei" } },
    { posten: "Typisch pro Tag", summe: true, werte: {
      adel: "1 bis 2 D, mit Gefolge ein Vielfaches", kaufleute: "um 5 S", buerger: "um 2 S",
      einfach: "knapp 1 S", streuner: "0 bis 2 H" } },
    { posten: "Gareth bis Perricum", summe: true, werte: {
      adel: "10 bis 20 D, Tross nicht gerechnet", kaufleute: "5 bis 7 D", buerger: "2 bis 3 D",
      einfach: "rund 1 D", streuner: "einige Heller und viel Geduld" } }
  ],

  anschlag: [
    { gruppe: "Relais", posten: "Wechselpferd bis zur nächsten Station", preis: "1 S", anmerkung: "mit Geleitbrief nach Vermerk" },
    { gruppe: "Relais", posten: "Reitpferd mieten bis zur nächsten Station", preis: "2 S", anmerkung: "Pfand 5 D" },
    { gruppe: "Relais", posten: "Platz in der Relaiskutsche, je Etappe", preis: "3 S innen, 1 S auf dem Bock", anmerkung: "" },
    { gruppe: "Post", posten: "Brief mit der Relaispost, je Station", preis: "2 H", anmerkung: "Gareth bis Perricum 2 S" },
    { gruppe: "Post", posten: "Eilbrief durch die Beilunker Reiter", preis: "nach Strecke", anmerkung: "Gareth bis Perricum 3 D" },
    { gruppe: "Herberge", posten: "Lager im Schlafsaal", preis: "3 H", anmerkung: "" },
    { gruppe: "Herberge", posten: "Bett in der Kammer zu viert", preis: "8 H", anmerkung: "" },
    { gruppe: "Herberge", posten: "Einzelzimmer", preis: "2 S", anmerkung: "mit Licht und Waschwasser" },
    { gruppe: "Herberge", posten: "Mahlzeit des Hauses", preis: "2 H", anmerkung: "Eintopf und Brot" },
    { gruppe: "Herberge", posten: "Krug Bier", preis: "1 H", anmerkung: "" },
    { gruppe: "Herberge", posten: "Stallplatz mit Heu", preis: "2 H", anmerkung: "Hafer 1 H je Ration" },
    { gruppe: "Kanzlei", posten: "Leumundsbrief", preis: "5 S", anmerkung: "ausgestellt in Mardramund" },
    { gruppe: "Kanzlei", posten: "Abschrift eines Geleitbriefs", preis: "1 S", anmerkung: "nur gegen Vorlage" },
    { gruppe: "Frei", posten: "Wasser, Feuer und Obdach am Herd", preis: "frei", anmerkung: "nach dem neunten Artikel" },
    { gruppe: "Frei", posten: "Stationsstempel", preis: "frei", anmerkung: "nach dem Brauch der Gottheit" }
  ],

  dienste: [
    { dienst: "Badestube", preis: "3 H, mit Seife und heißem Wasser 1 S", wo: "in jeder Station, am besten in Rabicum" },
    { dienst: "Wäsche waschen lassen", preis: "2 H", wo: "Herbergen und Dörfer" },
    { dienst: "Hufeisen", preis: "4 H je Eisen", wo: "Relais; in Hartsteen 3 H" },
    { dienst: "Wagenrad richten", preis: "1 bis 3 S", wo: "Stellmacher in Hartsteen, Mardramund, Gaulsfurt" },
    { dienst: "Bader: Zahn ziehen, Wunde nähen", preis: "3 H, 1 S", wo: "wandernde Bader, Herbergen" },
    { dienst: "Heilerstation im Storchenhaus", preis: "eine Gabe nach Vermögen", wo: "Gnitzenkuhl" },
    { dienst: "Führer durch den Wandlether Tann", preis: "1 S am Tag", wo: "Wandlether Hof; für den Firunsgang gibt es keinen" },
    { dienst: "Gepäck über die Furt tragen", preis: "1 H je Stück, eine Person 3 H", wo: "Flussträger an der Natter" },
    { dienst: "Abschrift beim Schreiber", preis: "5 H je Seite", wo: "Mardramund" },
    { dienst: "Gaukler, Eintritt", preis: "1 H oder ein Applaus", wo: "Wasserburg" },
    { dienst: "Becher Rabicumer, Flasche vom guten", preis: "3 H, 3 S", wo: "Rabicum" },
    { dienst: "Blick durchs Fernrohr", preis: "1 H", wo: "am Meerblick vor Perricum" },
    { dienst: "Neuigkeiten aus Rommilys", preis: "1 H das Stück", wo: "zwischen Kreuz und Natter, Wahrheit nicht garantiert" }
  ],

  zoelle: [
    { ort: "Rabenbrücke", preis: "2 H je Person, 5 H je Wagen", anmerkung: "altes Recht des Hauses Rabenmund, von der Kanzlei bestritten" },
    { ort: "Fähre Nadriansfurt", preis: "2 H", anmerkung: "Rastgeld am Ufer 1 H, ob man fährt oder nicht" },
    { ort: "Markgräfliches Geleitgeld", preis: "3 H je Person, 1 S je Wagen", anmerkung: "ab Gaulsfurt bis Perricum, zusätzlich zum Stationspreis" },
    { ort: "Mondsilberkontor", preis: "1 von 20 beim Wechseln", anmerkung: "Gaulsfurt" },
    { ort: "Stadtzoll Perricum", preis: "1 H je Person, 1 S je Wagen", anmerkung: "der Geleitbrief gilt hier, aber nicht viel" }
  ],

  meister: "Der Anschlag am Tor gilt in den Stationen, nicht in den Schenken daneben. Wer außerhalb schläft, zahlt weniger oder mehr, je nachdem, wie voll die Station ist. An der Feste Hohenstein heißt es: Für einen Silbertaler im Hut des richtigen Wachmanns geht es schneller.",
  moeglichkeiten: [
    "Die Pachtwirte halten sich an den Anschlag und holen das Geld über Zuschläge herein: für Licht, für Holz, für das Bett am Fenster.",
    "Mindestens eine Station schlägt höhere Preise an, als die Kanzlei festgesetzt hat, und der Anschlag trägt ein Siegel, das echt aussieht.",
    "Die Preise sind ehrlich, aber zu niedrig. Die Stationen schreiben Verluste, und irgendjemand gleicht sie aus. Die Frage ist, wer und warum."
  ]
};
