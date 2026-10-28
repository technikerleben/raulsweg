/* ==========================================================
   Mächte am Weg
   Felder: id, name, begriffe, sitz, kanon (true = offizielle Organisation/Familie),
           beschreibung [Absätze], will, konflikt, haltung (ein Satz zum Raulsweg),
           mittel [Machtmittel], vertreter, stimme (Zitat), hebel (wie man mit ihnen umgeht),
           stationen [IDs], dokumente [IDs], meister, moeglichkeiten [3 offene Varianten]
   RW.beziehungen: öffentlich bekannte Verhältnisse zwischen zwei Mächten
           art: buendnis | geschaeft | rivalitaet | misstrauen
   ========================================================== */

window.RW = window.RW || {};

RW.maechte = [
  {
    id: "kanzlei", kurzname: "Kanzlei", begriffe: ["Kanzlei"], name: "Die Kanzlei und der Wegemeister", sitz: "Gareth, Mardramund, alle Stationen", kanon: false,
    beschreibung: [
      "Die kaiserliche Kanzlei verwaltet den Raulsweg im Namen Rohajas. Sie vergibt Pachten, stellt Papiere aus, prüft Abrechnungen und ernennt die Pfalzvögte. Für den Bau selbst ist der kaiserliche Wegemeister verantwortlich, ein Mann, der an Zeitplänen gemessen wird, die er nicht selbst gemacht hat."
    ],
    will: "Eine fertige, ordentliche Straße, die das Ansehen der Kaiserin mehrt, und keine Skandale, die auf den Hof zurückfallen.",
    konflikt: "Die Kanzlei vermutet hinter den Problemen am Bau Haus Rabenmund. Der Verdacht ist bequem, weil er von eigenen Fehlern ablenkt.",
    meister: "Die Kanzlei ist kein einheitlicher Block. Zwischen Gareth und Mardramund, zwischen Bauleuten und Schreibern gibt es eigene Interessen, und nicht jeder Beamte ist der Kaiserin treuer als seinem Beutel.",
    haltung: "Baut, verwaltet und muss Erfolge vorweisen.",
    mittel: ["Pachten, Papiere und Siegel", "Kontrollposten und Stationswachen", "das Ohr der Kaiserin"],
    vertreter: "Wegemeister Answald Kreutzer, Vorsteher Odilo Federlein in Mardramund und die Pfalzvögte der Stationen.",
    stimme: "Ordnung ist kein Zustand. Ordnung ist eine Abrechnung, die stimmt.",
    hebel: "Wer Ergebnisse liefert und Ärger vom Hof fernhält, bekommt Geleitbriefe, Zugang zu Archiven und Wohlwollen. Wer die Kanzlei bloßstellt, auch wenn er recht hat, macht sich Feinde in Gareth.",
    stationen: ["sonnenfeld", "feste-hohenstein", "mardramund"],
    dokumente: ["stationsedikt"],
    moeglichkeiten: ["In Mardramund deckt jemand die Unregelmäßigkeiten, weil er selbst daran verdient.", "Der Wegemeister und die Stationskanzlei arbeiten gegeneinander: Gareth will Tempo, Mardramund will Kontrolle, und jeder schiebt dem anderen die Schuld zu.", "Die Kanzlei ist sauberer als ihr Ruf. Ihr größter Fehler ist, dass sie langsam ist und die Falschen verdächtigt."]
  },
  {
    id: "rabenmund", kurzname: "Haus Rabenmund", begriffe: ["Haus Rabenmund","Rabenmunds","Rabenmund"], name: "Haus Rabenmund", sitz: "Rommilys", kanon: true,
    beschreibung: [
      "Das alte Adelshaus beherrscht zusammen mit Haus Bregelsaum die Rommilyser Mark. Dass der Raulsweg an Rommilys vorbeiführt, empfinden die Rabenmunds als bewusste Zurücksetzung, und sie zeigen das offen."
    ],
    will: "Die Streckenführung ändern, zumindest aber Ausgleich für den entgangenen Handel. Und die Kaiserin vor aller Augen etwas Geld und Würde kosten lassen.",
    konflikt: "Klagen bei Hofe, Streit über Zölle und Brückenrechte, Spottverse am Rommilyser Kreuz. Die Kanzlei hält Haus Rabenmund für den Drahtzieher der Sabotage.",
    meister: "Die meisten Rabenmunds kämpfen mit Worten und Paragrafen. Ein Heißsporn der Familie mag weiter gehen, und gerade das macht den Verdacht gegen das ganze Haus so überzeugend.",
    haltung: "Gekränkt und laut, aber der Krone treu, zumindest auf dem Papier.",
    mittel: ["Einfluss bei Hof und in Darpatien", "Brücken- und Zollrechte an der alten Straße nach Rommilys", "Gefolgsleute und Junker"],
    vertreter: "Das Haus spricht durch Briefe und Gesandte. Am Weg vertritt es vor allem Junker Ugdalf, lauter, als es der Familie lieb ist.",
    stimme: "Wir tadeln nicht die Kaiserin. Wir tadeln die Landkarte.",
    hebel: "Anerkennung wiegt bei den Rabenmunds mehr als Geld. Wer in Rommilys höflich vorspricht und ihre Klagen ernst nimmt, findet Gastfreundschaft; wer sie öffentlich als Saboteure hinstellt, findet Feinde.",
    stationen: ["rommilyser-kreuz"],
    dokumente: ["brief-rabenmund"],
    moeglichkeiten: ["Das Haus weiß von Ugdalfs Treiben und lässt ihn gewähren, solange es nützt.", "Das Haus ist ehrlich empört und sucht selbst nach den wahren Saboteuren, um seinen Namen reinzuwaschen.", "Ein Zweig der Familie verhandelt heimlich mit der Kanzlei über eine Station in Rommilys und würde dafür vieles vergessen."]
  },
  {
    id: "beilunker", kurzname: "Beilunker Reiter", begriffe: ["Beilunker Reiter","Beilunker"], name: "Die Beilunker Reiter", sitz: "Haupthaus in Gareth, Gründungshaus in Perricum", kanon: true,
    beschreibung: [
      "Der berühmte Botendienst verbindet Gareth und Perricum seit langem. Die neuen Relais der Stationen sind für die Reiter Segen und Bedrohung zugleich: Die Strecke wird schneller, aber die Kanzlei richtet eigene Kuriere ein."
    ],
    will: "Die Wechselpferde und die Botentaschen des Raulswegs in eigener Hand behalten.",
    konflikt: "Streit mit den kaiserlichen Kurieren um Ställe, Vorrang und Pacht. Und die Frage, ob alle Reiter das Briefgeheimnis so ernst nehmen wie ihr Haus.",
    meister: "Wer die Post befördert, weiß viel. Die Beilunker sind eine ideale Quelle, ein idealer Verbündeter, oder eine undichte Stelle.",
    haltung: "Begrüßen die schnellere Straße und fürchten die Kuriere der Kanzlei.",
    mittel: ["das dichteste Botennetz des Reiches", "eigene Ställe an vielen Relais", "Wissen darüber, wer wem was schreibt"],
    vertreter: "Reiterin Jorinde Haselbach und die Stallmeister an den Relais.",
    stimme: "Ein Brief ist ein Versprechen. Wir halten es, im Galopp.",
    hebel: "Die Reiter schätzen Verlässlichkeit und schnelle Pferde. Wer einem Boten aus der Not hilft, hat einen Freund an jedem Relais. Wer ein Siegel bricht, hat das ganze Haus gegen sich.",
    stationen: ["nattersquell", "mardramund"],
    dokumente: [],
    moeglichkeiten: ["Einzelne Reiter verkaufen Abschriften, und das Haus ahnt es.", "Das Haus sammelt still Beweise gegen die Kanzleikuriere, um die Relais ganz zu übernehmen.", "Die Beilunker sind die verlässlichste Macht am Weg. Wer ihnen misstraut, misstraut den Falschen."]
  },
  {
    id: "traeger", kurzname: "Flussträger", begriffe: ["Flussträgern","Flussträger","Trägergilde"], name: "Die Flussträger an der Natter", sitz: "Natterbrücke", kanon: false,
    beschreibung: [
      "Eine kleine, eingeschworene Gilde, die Reisende über die Natter trägt, seit die alte Brücke abgerissen wurde. Kräftig, stolz und auf ihre Weise ehrlich."
    ],
    will: "Ihren Lebensunterhalt sichern, solange es geht, und eine Zukunft für die Zeit nach der Brücke.",
    konflikt: "Jede Woche ohne fertige Brücke ist ein guter Lohn. Der Verdacht, dass die Gilde den Bau verzögert, liegt nahe.",
    meister: "Die Träger haben wenig Macht, aber viel zu verlieren. Ein Angebot, sie nach der Fertigstellung an der Brücke oder in der Station zu beschäftigen, könnte viel verändern.",
    haltung: "Leben vom Provisorium und fürchten die fertige Brücke.",
    mittel: ["die einzige sichere Überquerung der Natter", "Zusammenhalt und Muskeln", "den Efferdbrauch an der Furt"],
    vertreter: "Bruna Lehmkuhl, die Älteste der Träger.",
    stimme: "Die Brücke trägt Euch irgendwann. Wir tragen Euch heute.",
    hebel: "Ein ehrliches Angebot für die Zeit nach der Brücke wiegt mehr als jede Münze. Hochnäsigkeit kostet doppelt, und zwar mitten im Fluss.",
    stationen: ["natterbruecke"],
    dokumente: [],
    moeglichkeiten: ["Einzelne Träger verzögern den Bau, ohne dass die Gilde es beschlossen hat.", "Die Gilde hat sich mit den Fährleuten von Hausnerhaven gegen jede neue Brücke verbündet.", "Die Träger sind unschuldig. Jemand nutzt den Verdacht gegen sie, um eigene Verzögerungen zu verdecken."]
  },
  {
    id: "adel", kurzname: "Adel am Weg", begriffe: [], name: "Der Adel am Weg", sitz: "Baronien und Grafschaften entlang der Strecke", kanon: false,
    beschreibung: [
      "Wo eine Station entsteht, steigen die Bodenpreise. Barone und Grafen entlang der Straße wollen mitverdienen: mit Wegezöllen, mit dem Verkauf von Land, mit dem Recht, Herbergen zu stellen oder Stein zu liefern."
    ],
    will: "Einen Anteil an allem, was über ihr Land rollt.",
    konflikt: "Streit über den Standort der Stationen, Entschädigungen, Zollrechte und darüber, wer bei Hofe am meisten Gehör findet.",
    meister: "Kein großer Plan, viele kleine Begehrlichkeiten. Der Adel macht den Raulsweg vor allem langsamer und teurer.",
    haltung: "Will mitverdienen und lässt sich jede Meile bezahlen.",
    mittel: ["Grund und Boden an der Strecke", "Wegezölle und Gerichtsrechte", "Verwandtschaft bei Hofe"],
    vertreter: "Barone, Junker und Vögte entlang der Strecke, dazu Schlossherren wie die von Ginsterhold, die jeden Tross mit Wein und einer Bitte empfangen.",
    stimme: "Die Straße gehört der Kaiserin. Der Boden darunter nicht.",
    hebel: "Adlige wollen gesehen und gefragt werden. Ein Wort bei Hof, eine Einladung zur Weihe, ein Platz am oberen Ende der Tafel öffnen mehr Tore als Gold.",
    stationen: ["hartsteen", "sonnenfeld", "wasserburg"],
    dokumente: [],
    moeglichkeiten: ["Einige Barone haben sich zusammengetan, um die Entschädigungen in die Höhe zu treiben.", "Ein Adliger am Weg verkauft heimlich Land an die neuen Kontore.", "Der Adel ist zerstritten. Wer ihn gegeneinander ausspielt, kommt schnell voran."]
  },
  {
    id: "kirchen", kurzname: "Kirchen", begriffe: [], name: "Die Kirchen der Zwölfgötter", sitz: "Schreine und Tempel der zwölf Stationen", kanon: false,
    beschreibung: [
      "Jede Station ist einer Gottheit geweiht, und jede Kirche betrachtet ihre Station mit Stolz und Sorge. Manche Geweihte begrüßen den Raulsweg als Werk der Ordnung, andere fürchten, dass Kommerz und Eile den Glauben verdrängen."
    ],
    will: "Würde, Einfluss und Mittel für ihre Schreine. Die Peraine-Geweihten in Gnitzenkuhl wollen vor allem, dass die Kranken versorgt werden.",
    konflikt: "Wer hat in einer Station das letzte Wort, der Pfalzvogt oder die Geweihten? Und wie viel Fest verträgt ein Tempel?",
    meister: "Geweihte sind oft die unbestechlichsten Zeugen am Weg und können Helden Rückhalt geben, wenn weltliche Autoritäten versagen.",
    haltung: "Stolz auf die Weihen, besorgt über Eile und Geschäft.",
    mittel: ["Segen, Eide und Stempel", "das Vertrauen der Reisenden", "Verbindungen zu den großen Tempeln in Gareth und Perricum"],
    vertreter: "Die Hüterinnen und Geweihten der zwölf Tempel, von Mutter Iselind in Wasserburg bis Bruder Hilbert im Storchenhaus.",
    stimme: "Zwölf Stationen, zwölf Götter. Keiner davon heißt Gewinn.",
    hebel: "Wer den Brauch einer Station achtet, gewinnt die Geweihten. Wer ihn verspottet, bekommt keinen Stempel, kein Bett und keinen Segen.",
    stationen: [],
    dokumente: [],
    moeglichkeiten: ["Die Praios-Kirche will mehr Einfluss auf die Kanzlei und nutzt die Sonnenhalle dafür.", "Mehrere Tempel haben Spenden unklarer Herkunft angenommen und wissen nicht, wie sie sie zurückgeben sollen.", "Die Geweihten am Weg tauschen sich aus und wissen gemeinsam mehr als jede Kanzlei."]
  },
  {
    id: "mada-basari", kurzname: "Mada Basari", begriffe: ["Mada Basari","Mondsilberkontor"], name: "Die Mada Basari", sitz: "Mondsilberkontor in Gaulsfurt, Kontor in Perricum", kanon: true,
    beschreibung: [
      "Das tulamidische Handelshaus unterhält in Gaulsfurt sein Mondsilberkontor. An der Kreuzung mit der Kronstraße nach Zorgan laufen Waren und Wechsel aus dem Osten und Süden zusammen."
    ],
    will: "Gute Geschäfte, stabile Zölle und einen Raulsweg, der den Osthandel beschleunigt.",
    konflikt: "Neue Kontore drängen an die Kreuzung, mit Wechseln von Häusern, die niemand kennt. Wer dahintersteht, interessiert die Mada Basari sehr.",
    meister: "Die Mada Basari sind weder Freund noch Feind der Helden. Sie wissen viel über Geldflüsse und sind bereit, Wissen gegen Gegenleistung zu teilen.",
    haltung: "Sieht im Raulsweg ein gutes Geschäft, solange die Rechnung stimmt.",
    mittel: ["Wechsel und Kredite", "Handelswege nach Aranien und in die Tulamidenlande", "Wissen über Geldflüsse"],
    vertreter: "Wechselmeister Khorim ibn Dschelef im Mondsilberkontor.",
    stimme: "Jede Münze erzählt, woher sie kommt. Man muss nur zuhören.",
    hebel: "Wissen gegen Wissen, Gefallen gegen Gefallen. Die Mada Basari schulden niemandem etwas und lassen sich nichts schulden.",
    stationen: ["gaulsfurt"],
    dokumente: [],
    moeglichkeiten: ["Das Haus kennt die Geldgeber der neuen Kontore und wartet auf den besten Preis für dieses Wissen.", "Das Haus ist über einen Mittelsmann selbst an einem der neuen Kontore beteiligt.", "Das Haus fürchtet die neuen Kontore als Konkurrenz und würde helfen, sie zu Fall zu bringen."]
  },
  {
    id: "perricum", kurzname: "Perricum", begriffe: ["Paligan"], name: "Perricum und die Paligan", sitz: "Perricum", kanon: true,
    beschreibung: [
      "Perricum ist Ziel und Nutznießer des Raulswegs. Der Markgraf, ein Paligan und Gemahl der Kaiserin, hat ein großes Interesse an einer schnellen Verbindung zur Hauptstadt und an den Zöllen am Ende der Straße."
    ],
    will: "Den Hafen stärken, die Zölle an der Gaulsfurt sichern und in Gareth Gehör finden.",
    konflikt: "Zuständigkeitsstreit mit der Kanzlei an der Kreuzung bei Gaulsfurt. Dazu die Verbindungen der Familie Paligan nach Süden, die nicht jeder in Gareth gern sieht.",
    meister: "Die Nähe zwischen Perricum und dem Hof macht jede Untersuchung am Ende der Strecke politisch heikel. Was hier ans Licht kommt, betrifft die Familie der Kaiserin.",
    haltung: "Feiert die Straße und verteidigt die eigenen Rechte.",
    mittel: ["Hafen, Flotte und Zölle", "markgräfliche Zöllner an der Gaulsfurt", "die Nähe zum Kaiserhaus"],
    vertreter: "Zöllnerin Odelinde Perval an der Gaulsfurt und die Zöllner vor den Toren der Stadt.",
    stimme: "Die Kaiserin regiert das Reich. Perricum regiert der Markgraf.",
    hebel: "Perricum belohnt, wer seinen Handel stärkt, und erinnert sich lange an jeden, der seine Rechte beschneiden will.",
    stationen: ["gaulsfurt", "rabicum"],
    dokumente: ["verlautbarung-paligan"],
    moeglichkeiten: ["Die markgräflichen Behörden dulden am Ende der Strecke Geschäfte, die in Gareth niemand sehen soll.", "Perricum nutzt den Zollstreit, um sich in Gareth unentbehrlich zu machen, und hat kein Interesse an einer Lösung.", "Auch in Perricum fürchtet man die neuen Kontore, will das aber nicht zugeben."]
  },
  {
    id: "neue-kontore", kurzname: "Neue Kontore", begriffe: ["neuen Kontore","neue Kontore"], name: "Die neuen Kontore", sitz: "unbekannt, Niederlassungen an mehreren Stationen", kanon: false,
    beschreibung: [
      "Seit der Raulsweg gebaut wird, tauchen Handelskontore auf, von denen vor einem Jahr noch niemand gehört hat. Sie bieten auf Pachten, kaufen Schuldscheine von Baufirmen und finanzieren Feste. Ihre Vertreter sind höflich, zahlungskräftig und auffallend schweigsam, wenn man nach ihren Geldgebern fragt."
    ],
    will: "Nicht die Straße besitzen, sondern alles, was an ihr Geld verdient: Herbergen, Relais, Lieferungen.",
    konflikt: "Die Leumundsbriefe der Kanzlei sollen genau solche Bieter prüfen. Ob die Prüfung in Mardramund gründlich genug ist, bezweifeln viele.",
    meister: "Wer hinter den neuen Kontoren steht, bleibt bewusst offen, auch über einzelne Geschichten hinweg. Jede Spielleitung darf Vertreter auftreten lassen und Spuren legen, aber keine Geschichte beantwortet die Frage endgültig.",
    haltung: "Kaufen sich leise in alles ein, was am Weg Geld bringt.",
    mittel: ["Bargeld, viel davon", "Pachten, Schuldscheine und Lieferverträge", "höfliche, verschwiegene Vertreter"],
    vertreter: "Der Händler Ludeger Vanstein, und in Rabicum ein stiller Gast namens Albrin Korst.",
    stimme: "Wir bauen nicht. Wir sorgen nur dafür, dass gebaut werden kann.",
    hebel: "Die Kontore zahlen gut für Auskünfte und Gefälligkeiten. Wer ihr Geld nimmt, merkt erst später, was er dafür verkauft hat.",
    stationen: ["wasserburg", "gaulsfurt", "rabicum"],
    dokumente: [],
    moeglichkeiten: ["Die Kontore sind ein einziges Netz, und eine Hand hält alle Fäden.", "Hinter den Kontoren stehen mehrere Geldgeber, die nichts voneinander wissen und sich bald in die Quere kommen.", "Die Kontore sind weniger gefährlich als ihr Ruf: Glücksritter mit geliehenem Geld, die schneller fallen, als sie gekommen sind."]
  }
];

RW.beziehungen = [
  { a: "kanzlei", b: "rabenmund", art: "misstrauen", text: "Die Kanzlei verdächtigt das Haus der Sabotage; das Haus klagt bei Hof über die Streckenführung." },
  { a: "kanzlei", b: "beilunker", art: "rivalitaet", text: "Partner beim Botendienst und Konkurrenten um Ställe, Vorrang und Pacht der Relais." },
  { a: "kanzlei", b: "traeger", art: "rivalitaet", text: "Die Kanzlei braucht die Träger, bis die Brücke steht. Danach braucht sie sie nicht mehr." },
  { a: "kanzlei", b: "adel", art: "geschaeft", text: "Verhandlungen über Land, Entschädigungen und Zollrechte, zäh und teuer." },
  { a: "kanzlei", b: "kirchen", art: "buendnis", text: "Gemeinsam haben sie die Weihen der Stationen bestimmt. Wer in einer Station das letzte Wort hat, ist offen." },
  { a: "kanzlei", b: "neue-kontore", art: "geschaeft", text: "Die Kanzlei vergibt Pachten an die Kontore, gegen Leumundsbriefe aus Mardramund." },
  { a: "kanzlei", b: "perricum", art: "rivalitaet", text: "Einig im Ziel, im Streit über Zölle und Zuständigkeit an der Gaulsfurt." },
  { a: "rabenmund", b: "perricum", art: "rivalitaet", text: "Was der Raulsweg Perricum bringt, nimmt er nach Ansicht der Rabenmunds Rommilys." },
  { a: "rabenmund", b: "adel", art: "buendnis", text: "Mancher Baron am Weg teilt den Ärger der Rabenmunds und lässt sie für sich sprechen." },
  { a: "beilunker", b: "perricum", art: "buendnis", text: "Das Gründungshaus der Reiter steht in Perricum; die Stadt ist stolz auf sie." },
  { a: "traeger", b: "kirchen", art: "buendnis", text: "Der Efferdstein an der Furt gehört den Trägern so sehr wie der Kirche." },
  { a: "mada-basari", b: "perricum", art: "geschaeft", text: "Wechsel, Waren und Zölle verbinden das Mondsilberkontor mit dem Hafen." },
  { a: "mada-basari", b: "neue-kontore", art: "misstrauen", text: "Die Mada Basari wüssten gern, wessen Wechsel die Kontore tragen." },
  { a: "adel", b: "neue-kontore", art: "geschaeft", text: "Die Kontore kaufen Land, Schuldscheine und Lieferrechte, und mancher Adlige verkauft gern." },
  { a: "kirchen", b: "neue-kontore", art: "misstrauen", text: "Großzügige Spenden für Feste und Tempel, deren Herkunft niemand erklären will." }
];
