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
    datei: "img/karten/strecke.svg", massstab: "schematisch, etwa 240 Meilen",
    kurz: "Die ganze Strecke von Gareth bis Perricum mit allen zwölf Stationen, den Flüssen Natter und Darpat und den abzweigenden Straßen nach Rommilys, Wandleth und Zorgan.",
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
      [9, "Straße nach Rommilys", "Früher die Hauptrichtung, heute eine Nebenstraße."]
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
    kurz: "Die Natter zwischen den Stümpfen der alten und den Gerüsten der neuen Brücke. Bis die Brücke steht, geht es nur durch die Furt.",
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
