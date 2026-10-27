/* ==========================================================
   Karten und Pläne (Stufe 3 und 4)
   ----------------------------------------------------------
   Die Zeichnungen erzeugt tools/karten.py als SVG unter img/karten/.
   Felder:
   id, titel, art (Karte | Lageplan | Grundriss), station (Stations-ID oder null),
   datei, massstab, kurz, legende [[Nummer, Name, Erläuterung]]
   ========================================================== */

window.RW = window.RW || {};

RW.karten = [
  {
    id: "strecke", titel: "Der Raulsweg", art: "Karte", station: null,
    datei: "img/karten/strecke.svg", massstab: "etwa 326 Meilen",
    kurz: "Die ganze Strecke von Gareth bis Perricum mit allen zwölf Stationen, nach der Karte von avesmaps.de. Die Lage von Orten, Straßen und Flüssen ist dort gemessen, Wälder, Berge und Felder sind vereinfacht.",
    legende: []
  },
  {
    id: "musterstation", titel: "Musterstation", art: "Grundriss", station: null,
    datei: "img/karten/musterstation.svg", massstab: "1 Kästchen der Leiste = 5 Schritt",
    kurz: "So sieht eine Station aus, wenn sie nach dem Stationsedikt vollständig gebaut ist. Keine Station gleicht ihr genau, aber jede ist nach ihr geplant: Pfalz, Relais und Herberge um einen gemeinsamen Hof, ein Tor zur Straße, ein Schrein der Gottheit.",
    legende: [
      [1, "Tor", "Über dem Torbogen das Emblem der Gottheit, der die Station geweiht ist."],
      [2, "Torwache", "Hier werden Geleitbriefe vorgezeigt und Ankünfte vermerkt."],
      [3, "Saal der Kaiserpfalz", "Speisesaal und Gerichtsraum, mit Hochsitz an der Stirnseite."],
      [4, "Gemächer des Hofes", "Nur für die Kaiserin oder den ranghöchsten Gast."],
      [5, "Stube des Pfalzvogts", "Schreibpult, Schlüssel, Gästebuch der Pfalz."],
      [6, "Gästeflügel", "Für die zweite hohe Gesellschaft, die sich mit weniger begnügen muss."],
      [7, "Ställe der Beilunker Reiter", "Gepachtet, abgeschlossen, mit eigenem Stallknecht."],
      [8, "Ställe der Kanzleikuriere", "Wechselpferde für Kuriere und Reisende mit Wechselrecht."],
      [9, "Poststube des Relais", "Briefe werden hier angenommen, versiegelt und weitergegeben."],
      [10, "Wagenremise", "Offener Schuppen für Kutschen und Fuhrwerke."],
      [11, "Schankstube der Herberge", "Für alle, die nicht in die Pfalz dürfen."],
      [12, "Küche", ""],
      [13, "Schlafsaal", "Darüber die guten Stuben im Obergeschoss."],
      [14, "Schrein", "Altar der Gottheit, hier gibt es den Stationsstempel."],
      [15, "Brunnen", ""],
      [16, "Meilenstein", "Mit der Meilenzahl ab Gareth."]
    ]
  },
  {
    id: "nattersquell", titel: "Station und Dorf", art: "Lageplan", station: "nattersquell",
    datei: "img/karten/nattersquell.svg", massstab: "1 Kästchen der Leiste = 10 Schritt",
    kurz: "Die erste fertige Station des Edikts, gleich neben der Quelle der Natter. Gegenüber, auf der anderen Straßenseite, das alte Dorf mit dem Gasthaus, dem die Gäste ausbleiben.",
    legende: [
      [1, "Stationstor", ""],
      [2, "Stationsherberge", "Schankstube, daneben die Küche."],
      [3, "Großer Herd mit Herdkapelle", "Das Feuer brennt seit der Weihe ununterbrochen. In der Nische daneben die Statue der Travia."],
      [4, "Kaiserpfalz", "Klein, aber für die traditionelle erste Nacht des Hofes."],
      [5, "Stall mit Strohboden", "Oben schlafen Bedürftige umsonst."],
      [6, "Gänsehof", "Ein Dutzend Gänse, die niemand schlachten darf."],
      [7, "Brunnen mit der Gans", "Auf dem Dorfplatz an der Straße."],
      [8, "Quelle der Natter", "Ein klarer Quelltopf; der Bach läuft unter der Straße hindurch nach Süden."],
      [9, "Gasthaus Zur Quelle", "Das alte Dorfwirtshaus."],
      [10, "Dorflinde", ""],
      [11, "Meilenstein", "Meile 34."],
      [12, "Bauernhäuser und Gärten", ""]
    ]
  },
  {
    id: "hartsteen", titel: "Pfalz am Westtor", art: "Lageplan", station: "hartsteen",
    datei: "img/karten/hartsteen.svg", massstab: "1 Kästchen der Leiste = 10 Schritt",
    kurz: "Die zu prächtig geratene Kaiserpfalz vor dem Westtor, daneben Relais und Herberge. Südlich der Straße beginnt der Steinbruch, in dessen Felswand die Gildenesse liegt.",
    legende: [
      [1, "Westtor", ""],
      [2, "Kaiserpfalz", "Saal und Gemächer im Nordflügel, Gästezimmer in den Seitenflügeln."],
      [3, "Ehrenhof", "Mit Brunnen und Säulen, zur Straße hin offen."],
      [4, "Relais", ""],
      [5, "Stationsherberge", ""],
      [6, "Werkplatz der Steinmetze", "Fertige Quader warten auf die Ochsenkarren."],
      [7, "Gildehaus der Steinmetze", ""],
      [8, "Steinbruch", ""],
      [9, "Portal der Gildenesse", "Neu, mit Hammer und Amboss, von der Gilde bezahlt."],
      [10, "Felsgewölbe mit Esse und Amboss", "Die ewige Glut am Ende des Gewölbes."],
      [11, "Ochsenweg", "Vom Bruch hinauf zum Werkplatz."],
      [12, "Grafenburg", "Auf dem Hügel über der Stadt."],
      [13, "Altstadt", ""]
    ]
  },
  {
    id: "wandlether-hof", titel: "Wehrstation im Forst", art: "Lageplan", station: "wandlether-hof",
    datei: "img/karten/wandlether-hof.svg", massstab: "1 Kästchen der Leiste = 10 Schritt",
    kurz: "Ein altes Gehöft auf einer Lichtung, jetzt mit Palisade und Wachturm. Hier zweigt die Straße nach Wandleth ab. Ringsum nur Wald.",
    legende: [
      [1, "Tor", "Wird bei Einbruch der Dunkelheit geschlossen."],
      [2, "Wachturm", ""],
      [3, "Herberge im alten Wohnhaus", ""],
      [4, "Stall in der alten Scheune", ""],
      [5, "Neues Wachhaus", "Im Rohbau."],
      [6, "Sockel des neuen Schreins", "Mehr steht noch nicht."],
      [7, "Brunnen", "Daneben der Holzstapel."],
      [8, "Hinterpforte", "Ein Pfad führt in den Wald."],
      [9, "Jägerschrein", "Drei Stämme und ein Bärenschädel auf einer kleinen Lichtung."],
      [10, "Nebenstraße nach Blitztann und Wandleth", "Kaum gepflegt, aber mit frischen Wagenspuren. Über diesen Weg führt auch der Firunsgang nach Blitztann."],
      [11, "Köhlerplatz", "Meiler und Hütte, abseits im Wald."]
    ]
  },
  {
    id: "wasserburg", titel: "Burginsel und Festplatz", art: "Lageplan", station: "wasserburg",
    datei: "img/karten/wasserburg.svg", massstab: "1 Kästchen der Leiste = 10 Schritt",
    kurz: "Die Burg auf ihrer Flussinsel, davor der Festplatz, an der Straße die alte Station mit ihrem neuen Flügel. Im Burggarten das Tsahaus mit dem neuen Festhof.",
    legende: [
      [1, "Wasserburg", "Auf der Flussinsel, rundum vom Darpat umgeben."],
      [2, "Burgbrücke", ""],
      [3, "Festplatz mit Puppenbühne", "Stände für Bänder, Honigkuchen und bemalte Holzeidechsen."],
      [4, "Alte Station", ""],
      [5, "Neuer Herbergsflügel", "Gerade fertig, der Putz ist noch feucht."],
      [6, "Neues Relais", "Im Rohbau."],
      [7, "Tsahaus", "Rundbau mit bunten Schindeln."],
      [8, "Festhof mit Laubengängen", "Für die Stationsweihe neu angelegt."],
      [9, "Girlanden", "Bänder über der Straße, so dicht, dass sie den Himmel verdecken."],
      [10, "Stadthäuser", ""]
    ]
  },
  {
    id: "gnitzenkuhl", titel: "Damm und Pfahldorf", art: "Lageplan", station: "gnitzenkuhl",
    datei: "img/karten/gnitzenkuhl.svg", massstab: "1 Kästchen der Leiste = 10 Schritt",
    kurz: "Der Raulsweg auf seinem Damm durch den Sumpf. Die Häuser stehen auf Pfählen, das Storchenhaus auch. Weiter östlich wird der Damm noch aufgeschüttet.",
    legende: [
      [1, "Damm", "Das Einzige hier, was fest und gerade ist."],
      [2, "Stationshaus", "Auf einer Verbreiterung des Damms."],
      [3, "Erweiterung", "Im Rohbau."],
      [4, "Storchenhaus", "Krankenstube auf Pfählen, mit Altar. Auf dem Dach das Storchennest."],
      [5, "Kräutergarten", ""],
      [6, "Trockenböden", ""],
      [7, "Pfahlhäuser", "Mit Stegen zum Damm."],
      [8, "Dammbaustelle", "Hier wird der Damm noch aufgeschüttet."],
      [9, "Arbeiterbaracken", ""],
      [10, "Hütte des Bauaufsehers", ""],
      [11, "Ruine des alten Wachturms", "Die Dörfler meiden sie."]
    ]
  },
  {
    id: "gaulsfurt", titel: "Furt und Kreuzung", art: "Lageplan", station: "gaulsfurt",
    datei: "img/karten/gaulsfurt.svg", massstab: "1 Kästchen der Leiste = 10 Schritt",
    kurz: "Die Furt durch den Darpat, die Kreuzung mit der Kronstraße nach Zorgan und zwei Zollbuden, die einander nicht anerkennen. Abseits das Feld der Schlacht von 1039 BF.",
    legende: [
      [1, "Furt durch den Darpat", "Mit Markpfählen."],
      [2, "Zollbude der Kanzlei", ""],
      [3, "Zollbude des Markgrafen", "Schräg gegenüber, mit eigenem Schlagbaum."],
      [4, "Mondsilberkontor", "Mit Säulenhof und silbernem Halbmond über dem Eingang."],
      [5, "Phex-Tempel", "Älter als die Station."],
      [6, "Station", ""],
      [7, "Neuer Herbergsflügel", "Im Rohbau."],
      [8, "Händlerhof", "Mit Laubengang, für Karawanen und Fuhrleute."],
      [9, "Kronstraße nach Zorgan", ""],
      [10, "Feld der Schlacht", "Übersät mit Steinen, die Reisende hier ablegen."],
      [11, "Gedenkstein mit zerbrochenem Rad", ""],
      [12, "Gedenkkapelle", "Ohne Fenster; der neue Vorhof ist im Bau."]
    ]
  },
  {
    id: "rabicum", titel: "Station und Rosenhaus", art: "Lageplan", station: "rabicum",
    datei: "img/karten/rabicum.svg", massstab: "1 Kästchen der Leiste = 10 Schritt",
    kurz: "Die letzte Station zwischen Weinbergen. Vor dem Haus der Tanzplatz, oben am Hang das Rosenhaus über seinem verpachteten Keller.",
    legende: [
      [1, "Station", "Schankstube und Küche im Nordflügel, Zimmer in den Seitenflügeln."],
      [2, "Innenhof", "Mit Brunnen und Baum."],
      [3, "Tanzplatz", "Mit Laternen; an der Straße stehen die Fässer."],
      [4, "Rosenhaus", "Offener Säulengang, von Kletterrosen überwachsen."],
      [5, "Altar aus rotem Stein", ""],
      [6, "Weinkeller unter dem Tempel", "Verpachtet."],
      [7, "Kellertür", "Ein eigener Abgang, an dem Besucher einzeln eingelassen werden."],
      [8, "Kelterhaus", ""],
      [9, "Weinberge", ""],
      [10, "Aussicht", "An klaren Abenden sieht man die Lichter Perricums und die Schiffe im Golf."]
    ]
  },
  {
    id: "sonnenfeld", titel: "Baustelle der Pfalz", art: "Lageplan", station: "sonnenfeld",
    datei: "img/karten/sonnenfeld.svg", massstab: "1 Kästchen der Leiste = 10 Schritt",
    kurz: "Die künftige Hoftagspfalz zwischen den Weizenfeldern. Fertig ist nur das Hauptportal, der Westflügel steht im Rohbau, der Rest ist abgesteckt.",
    legende: [
      [1, "Hauptportal", "Fertig, mit der goldenen Sonnenscheibe."],
      [2, "Westflügel", "Im Rohbau, mit Gerüst zur Hofseite."],
      [3, "Ostflügel", "Nur abgesteckt."],
      [4, "Sonnenhalle", "Grundriss und Säulenstellung abgesteckt."],
      [5, "Lichtachse", "Vom Portal bis zum Richterstuhl, nach der Mittagssonne ausgerichtet."],
      [6, "Tretradkräne", ""],
      [7, "Bauhütte und Planstube", "Hier arbeitet die Baumeisterin."],
      [8, "Steinlager und Werkplatz der Steinmetze", "Quader aus Hartsteen."],
      [9, "Mörtelgruben", ""],
      [10, "Altarzelt", "Der Altar der Sonnenhalle bis zu ihrer Fertigstellung."],
      [11, "Festzelte", "Für den angekündigten Hoftag."],
      [12, "Zeltlager der Arbeiter", ""],
      [13, "Hof Krumhaber", "Der Bauernhof, dessen Felder die Pfalz geschluckt hat."],
      [14, "Senke", "Nach Regen steht hier das Wasser."]
    ]
  },
  {
    id: "kreuz", titel: "Die Kreuzung", art: "Lageplan", station: "rommilyser-kreuz",
    datei: "img/karten/kreuz.svg", massstab: "1 Kästchen der Leiste = 10 Schritt",
    kurz: "Die Kreuzung, an der die alte Straße nach Rommilys abzweigt. Das Stationshaus steht schief, weil der Fuchsschrein nicht weichen durfte.",
    legende: [
      [1, "Großer Wegweiser", "Der Arm nach Rommilys ist meist übermalt oder beschmiert."],
      [2, "Fuchsschrein", "Älter als die Station. Hier opfern Händler, bevor sie eine Richtung wählen."],
      [3, "Stationshaus", "Im Rohbau, das Dach erst halb gedeckt, schief zur Straße."],
      [4, "Bauhütte", "Treffpunkt der Bauleute und ihrer Gäste."],
      [5, "Händlerplatz", "Stände unter Planen, gefeilscht wird um alles."],
      [6, "Brunnen", ""],
      [7, "Behelfsstall und Pferch", ""],
      [8, "Hügel mit schwarzem Wimpel", "Von hier überblickt man beide Straßen."],
      [9, "Feidewaldstraße nach Rommilys", "Die alte Reichsstraße läuft hier geradeaus weiter; der Raulsweg biegt nach Südosten ab."]
    ]
  },
  {
    id: "hohenstein", titel: "Kontrollposten in der Enge", art: "Lageplan", station: "feste-hohenstein",
    datei: "img/karten/hohenstein.svg", massstab: "1 Kästchen der Leiste = 10 Schritt",
    kurz: "Die alte Feste sperrt das Tal zwischen zwei Hängen. Wer nach Osten will, muss durch Vortor, Kontrollhof, Torbau und Torgasse.",
    legende: [
      [1, "Warteplatz", "Die Schlange vor dem Tor, an Markttagen bis weit ins Tal."],
      [2, "Viehpferch", ""],
      [3, "Neues Vortor", "Mauern im Rohbau, für den Raulsweg vorgelegt."],
      [4, "Kontrollhof", "Durchsuchungstische, Truhen, eine Waage."],
      [5, "Torbau mit Schreibertisch", "Unter dem Torbogen werden Papiere geprüft und Namen eingetragen."],
      [6, "Wachstube", ""],
      [7, "Torgasse", "Ummauert, damit Reisende den Wehrhof nicht betreten."],
      [8, "Wehrhof", "Mit Brunnen. Nur für die Besatzung."],
      [9, "Bergfried", ""],
      [10, "Kaserne", ""],
      [11, "Löwenkapelle mit neuer Vorhalle", "Die Vorhalle öffnet sich zur Torgasse, damit Reisende hineinkönnen."],
      [12, "Stall", ""],
      [13, "Zeughaus", ""],
      [14, "Osttor", ""],
      [15, "Stationshaus im Bau", "Daneben ein abgesteckter Bauplatz."],
      [16, "Alter Hirtenpfad", "Führt durch die Hänge um die Feste herum. Kaum jemand kennt ihn noch."]
    ]
  },
  {
    id: "natterbruecke", titel: "Furt und Brückenbaustelle", art: "Lageplan", station: "natterbruecke",
    datei: "img/karten/natterbruecke.svg", massstab: "1 Kästchen der Leiste = 10 Schritt",
    kurz: "Die Natter kurz vor ihrer Mündung in den Darpat, zwischen den Stümpfen der alten Fischerbrücke und den Gerüsten der neuen. Bis die Brücke steht, geht es nur durch die Furt.",
    legende: [
      [1, "Herberge am Ufer", "Schankstube und Küche; bei Hochwasser hoffnungslos überfüllt."],
      [2, "Stall der Herberge", "Daneben der Misthaufen."],
      [3, "Zollhäuschen mit Schlagbaum", ""],
      [4, "Hütte der Trägergilde", "Davor die Tragplattformen für Sänften und Gepäck."],
      [5, "Efferdstein", "Die Träger berühren ihn vor jeder Überquerung."],
      [6, "Furt", "Mit Markpfählen. Bei Hochwasser nicht passierbar."],
      [7, "Seilwinden", "Hier werden Wagen an Seilen durch das Wasser gezogen."],
      [8, "Stümpfe der alten Brücke", ""],
      [9, "Neue Brücke auf Gerüsten", ""],
      [10, "Mittlerer Pfeiler mit Efferdnische", "Die Nische ist noch leer."],
      [11, "Bauhütte", ""],
      [12, "Steinlager und Kalkgrube", ""],
      [13, "Hochwasserlinie", "So weit tritt die Natter nach starkem Regen über die Ufer."],
      [14, "Wartewiese für Wagen", ""],
      [15, "Werkplatz", ""]
    ]
  },
  {
    id: "mardramund", titel: "Die Kanzlei", art: "Grundriss", station: "mardramund",
    datei: "img/karten/mardramund.svg", massstab: "1 Kästchen der Leiste = 2 Schritt",
    kurz: "Das neue Kanzleigebäude mit hohen Fenstern zur Straße. Der Anbau für das Archiv steht im Rohbau und soll künftig nur durch die Hesindestube zu erreichen sein.",
    legende: [
      [1, "Eingangshalle", "Mit Wartebänken an beiden Wänden."],
      [2, "Schreibsaal", "Zwölf Pulte, an den Fenstern die begehrtesten."],
      [3, "Hesindestube", "Lesepult mit dem Buch der leeren Seiten, grünes Fenster."],
      [4, "Stube des Vorstehers", ""],
      [5, "Registerkammer", "Vorläufige Ablage, bis das Archiv fertig ist."],
      [6, "Siegelkammer", "Verschlossen. Siegel, Stempel, Blankoformulare."],
      [7, "Treppe", "Zu den Kammern der Schreiber im Obergeschoss."],
      [8, "Archiv-Anbau", "Im Rohbau, die Regale sind erst angezeichnet."],
      [9, "Botenstall", ""],
      [10, "Anbindebalken", "Hier wartet fast immer ein gesatteltes Botenpferd."],
      [11, "Brunnen", ""]
    ]
  }
];
