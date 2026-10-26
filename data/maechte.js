/* ==========================================================
   Mächte am Weg
   Felder: id, name, sitz, beschreibung [Absätze], will, konflikt, meister,
           kanon (true = offizielle Organisation/Familie)
   Stufe 5 ergänzt: figuren [], beziehungen []
   ========================================================== */

window.RW = window.RW || {};

RW.maechte = [
  {
    id: "kanzlei", begriffe: ["Kanzlei"], name: "Die Kanzlei und der Wegemeister", sitz: "Gareth, Mardramund, alle Stationen", kanon: false,
    beschreibung: [
      "Die kaiserliche Kanzlei verwaltet den Raulsweg im Namen Rohajas. Sie vergibt Pachten, stellt Papiere aus, prüft Abrechnungen und ernennt die Pfalzvögte. Für den Bau selbst ist der kaiserliche Wegemeister verantwortlich, ein Mann, der an Zeitplänen gemessen wird, die er nicht selbst gemacht hat."
    ],
    will: "Eine fertige, ordentliche Straße, die das Ansehen der Kaiserin mehrt, und keine Skandale, die auf den Hof zurückfallen.",
    konflikt: "Die Kanzlei vermutet hinter den Problemen am Bau Haus Rabenmund. Der Verdacht ist bequem, weil er von eigenen Fehlern ablenkt.",
    meister: "Die Kanzlei ist kein einheitlicher Block. Zwischen Gareth und Mardramund, zwischen Bauleuten und Schreibern gibt es eigene Interessen, und nicht jeder Beamte ist der Kaiserin treuer als seinem Beutel."
  },
  {
    id: "rabenmund", begriffe: ["Haus Rabenmund","Rabenmunds","Rabenmund"], name: "Haus Rabenmund", sitz: "Rommilys", kanon: true,
    beschreibung: [
      "Das alte Adelshaus beherrscht zusammen mit Haus Bregelsaum die Rommilyser Mark. Dass der Raulsweg an Rommilys vorbeiführt, empfinden die Rabenmunds als bewusste Zurücksetzung, und sie zeigen das offen."
    ],
    will: "Die Streckenführung ändern, zumindest aber Ausgleich für den entgangenen Handel. Und die Kaiserin vor aller Augen etwas Geld und Würde kosten lassen.",
    konflikt: "Klagen bei Hofe, Streit über Zölle und Brückenrechte, Spottverse am Rommilyser Kreuz. Die Kanzlei hält Haus Rabenmund für den Drahtzieher der Sabotage.",
    meister: "Die meisten Rabenmunds kämpfen mit Worten und Paragrafen. Ein Heißsporn der Familie mag weiter gehen, und gerade das macht den Verdacht gegen das ganze Haus so überzeugend."
  },
  {
    id: "beilunker", begriffe: ["Beilunker Reiter","Beilunker"], name: "Die Beilunker Reiter", sitz: "Haupthaus in Gareth, Gründungshaus in Perricum", kanon: true,
    beschreibung: [
      "Der berühmte Botendienst verbindet Gareth und Perricum seit langem. Die neuen Relais der Stationen sind für die Reiter Segen und Bedrohung zugleich: Die Strecke wird schneller, aber die Kanzlei richtet eigene Kuriere ein."
    ],
    will: "Die Wechselpferde und die Botentaschen des Raulswegs in eigener Hand behalten.",
    konflikt: "Streit mit den kaiserlichen Kurieren um Ställe, Vorrang und Pacht. Und die Frage, ob alle Reiter das Briefgeheimnis so ernst nehmen wie ihr Haus.",
    meister: "Wer die Post befördert, weiß viel. Die Beilunker sind eine ideale Quelle, ein idealer Verbündeter, oder eine undichte Stelle."
  },
  {
    id: "traeger", begriffe: ["Flussträgern","Flussträger","Trägergilde"], name: "Die Flussträger an der Natter", sitz: "Natterbrücke", kanon: false,
    beschreibung: [
      "Eine kleine, eingeschworene Gilde, die Reisende über die Natter trägt, seit die alte Brücke abgerissen wurde. Kräftig, stolz und auf ihre Weise ehrlich."
    ],
    will: "Ihren Lebensunterhalt sichern, solange es geht, und eine Zukunft für die Zeit nach der Brücke.",
    konflikt: "Jede Woche ohne fertige Brücke ist ein guter Lohn. Der Verdacht, dass die Gilde den Bau verzögert, liegt nahe.",
    meister: "Die Träger haben wenig Macht, aber viel zu verlieren. Ein Angebot, sie nach der Fertigstellung an der Brücke oder in der Station zu beschäftigen, könnte viel verändern."
  },
  {
    id: "adel", begriffe: [], name: "Der Adel am Weg", sitz: "Baronien und Grafschaften entlang der Strecke", kanon: false,
    beschreibung: [
      "Wo eine Station entsteht, steigen die Bodenpreise. Barone und Grafen entlang der Straße wollen mitverdienen: mit Wegezöllen, mit dem Verkauf von Land, mit dem Recht, Herbergen zu stellen oder Stein zu liefern."
    ],
    will: "Einen Anteil an allem, was über ihr Land rollt.",
    konflikt: "Streit über den Standort der Stationen, Entschädigungen, Zollrechte und darüber, wer bei Hofe am meisten Gehör findet.",
    meister: "Kein großer Plan, viele kleine Begehrlichkeiten. Der Adel macht den Raulsweg vor allem langsamer und teurer."
  },
  {
    id: "kirchen", begriffe: [], name: "Die Kirchen der Zwölfgötter", sitz: "Schreine und Tempel der zwölf Stationen", kanon: false,
    beschreibung: [
      "Jede Station ist einer Gottheit geweiht, und jede Kirche betrachtet ihre Station mit Stolz und Sorge. Manche Geweihte begrüßen den Raulsweg als Werk der Ordnung, andere fürchten, dass Kommerz und Eile den Glauben verdrängen."
    ],
    will: "Würde, Einfluss und Mittel für ihre Schreine. Die Peraine-Geweihten in Gnitzenkuhl wollen vor allem, dass die Kranken versorgt werden.",
    konflikt: "Wer hat in einer Station das letzte Wort, der Pfalzvogt oder die Geweihten? Und wie viel Fest verträgt ein Tempel?",
    meister: "Geweihte sind oft die unbestechlichsten Zeugen am Weg und können Helden Rückhalt geben, wenn weltliche Autoritäten versagen."
  },
  {
    id: "mada-basari", begriffe: ["Mada Basari","Mondsilberkontor"], name: "Die Mada Basari", sitz: "Mondsilberkontor in Gaulsfurt, Kontor in Perricum", kanon: true,
    beschreibung: [
      "Das tulamidische Handelshaus unterhält in Gaulsfurt sein Mondsilberkontor. An der Kreuzung mit der Kronstraße nach Zorgan laufen Waren und Wechsel aus dem Osten und Süden zusammen."
    ],
    will: "Gute Geschäfte, stabile Zölle und einen Raulsweg, der den Osthandel beschleunigt.",
    konflikt: "Neue Kontore drängen an die Kreuzung, mit Wechseln von Häusern, die niemand kennt. Wer dahintersteht, interessiert die Mada Basari sehr.",
    meister: "Die Mada Basari sind weder Freund noch Feind der Helden. Sie wissen viel über Geldflüsse und sind bereit, Wissen gegen Gegenleistung zu teilen."
  },
  {
    id: "perricum", begriffe: ["Paligan"], name: "Perricum und die Paligan", sitz: "Perricum", kanon: true,
    beschreibung: [
      "Perricum ist Ziel und Nutznießer des Raulswegs. Der Markgraf, ein Paligan und Gemahl der Kaiserin, hat ein großes Interesse an einer schnellen Verbindung zur Hauptstadt und an den Zöllen am Ende der Straße."
    ],
    will: "Den Hafen stärken, die Zölle an der Gaulsfurt sichern und in Gareth Gehör finden.",
    konflikt: "Zuständigkeitsstreit mit der Kanzlei an der Kreuzung bei Gaulsfurt. Dazu die Verbindungen der Familie Paligan nach Süden, die nicht jeder in Gareth gern sieht.",
    meister: "Die Nähe zwischen Perricum und dem Hof macht jede Untersuchung am Ende der Strecke politisch heikel. Was hier ans Licht kommt, betrifft die Familie der Kaiserin."
  },
  {
    id: "neue-kontore", begriffe: ["neuen Kontore","neue Kontore"], name: "Die neuen Kontore", sitz: "unbekannt, Niederlassungen an mehreren Stationen", kanon: false,
    beschreibung: [
      "Seit der Raulsweg gebaut wird, tauchen Handelskontore auf, von denen vor einem Jahr noch niemand gehört hat. Sie bieten auf Pachten, kaufen Schuldscheine von Baufirmen und finanzieren Feste. Ihre Vertreter sind höflich, zahlungskräftig und auffallend schweigsam, wenn man nach ihren Geldgebern fragt."
    ],
    will: "Nicht die Straße besitzen, sondern alles, was an ihr Geld verdient: Herbergen, Relais, Lieferungen.",
    konflikt: "Die Leumundsbriefe der Kanzlei sollen genau solche Bieter prüfen. Ob die Prüfung in Mardramund gründlich genug ist, bezweifeln viele.",
    meister: "Wer hinter den neuen Kontoren steht, bleibt bewusst offen, auch über einzelne Geschichten hinweg. Jede Spielleitung darf Vertreter auftreten lassen und Spuren legen, aber keine Geschichte beantwortet die Frage endgültig."
  }
];
