/* ==========================================================
   Unterwegs: Wegpunkte zwischen den Stationen (Stufe 4)
   ----------------------------------------------------------
   Orte am Raulsweg zwischen zwei Stationen, überwiegend nach
   avesmaps.de. Namen und Lage sind übernommen, Beschreibungen
   und Szenen sind Interpretation dieses Bandes.
   Felder:
   id, name, nach (ID der Station oder Stadt, auf die die Etappe zuläuft),
   meile (ab Gareth, gerundet), kanon (Ort aus avesmaps/Kanon),
   art, kurz (was man dort vorfindet), szene (was dort passieren kann)
   Optional (Ergänzung Landmarken und Orte abseits):
   typ      siedlung | bauwerk | landmarke | natur | abseits
            (fehlt er, gilt siedlung, bei Brücke, Gasthaus usw. bauwerk)
   abseits  wo der Ort liegt, wenn er nicht an der Straße liegt
   beschreibung [] längerer Text für größere Orte
   meister  eine Möglichkeit für die Spielleitung, keine Wahrheit
   ========================================================== */

window.RW = window.RW || {};

RW.wegpunkte = [
  /* ---------- Gareth → Nattersquell ---------- */
  {
    id: "ginsterhold", name: "Schloss Ginsterhold", nach: "nattersquell", meile: 6, kanon: true, art: "Adelssitz",
    kurz: "Ein Adelssitz kurz hinter dem Osttor, zwischen Ginsterhecken. Die erste Stelle, an der ein Tross anhält, und sei es nur, um die Garether Händler vorzulassen, die es eiliger haben.",
    szene: "Ein Diener des Schlosses bringt dem Tross einen Krug Wein entgegen, mit Grüßen seiner Herrschaft. Wer ablehnt, beleidigt das Haus; wer annimmt, findet am Abend in Nattersquell eine höfliche Einladung zum Rückweg und eine noch höflichere Bitte um eine Gefälligkeit bei Hof."
  },
  {
    id: "possel", name: "Possel", nach: "nattersquell", meile: 7, kanon: true, art: "Dorf",
    kurz: "Das letzte Dorf, das sich noch zu Gareth zählt. Hier wenden die Sonntagsausflügler um, und hier beginnt für alle anderen die Reise.",
    szene: "Dorfkinder verkaufen Stationsstempel, aus Rüben geschnitzt und mit Rotebetesaft eingefärbt, als „Probestempel für den ganzen Raulsweg“. Pankraz und Fredo haben schon drei gekauft."
  },
  {
    id: "alfenmohn", name: "Alfenmohn", nach: "nattersquell", meile: 18, kanon: true, art: "Dorf",
    kurz: "Ein Dorf zwischen Feldern, durch das der Raulsweg schnurgerade führt. Die neuen Meilensteine sind hier besonders sorgfältig gesetzt.",
    szene: "Ein Bauer steht mit der Mistgabel neben dem Meilenstein 18, der mitten auf seinem Acker gesetzt wurde. Er will ihn nicht versetzen, sondern bezahlt bekommen. Der Kanzleibote, der eben vorbeireitet, hat dafür kein Formular."
  },

  /* ---------- Nattersquell → Hartsteen ---------- */
  {
    id: "ruthberg", name: "Ruthberg", nach: "hartsteen", meile: 42, kanon: true, art: "Dorf mit Rastplatz",
    kurz: "Der übliche Mittagshalt zwischen Nattersquell und Hartsteen, mit Brunnen, Tränke und einer Schenke, die von den Fuhrleuten lebt.",
    szene: "Die ersten Ochsenkarren mit Hartsteiner Quadern kommen entgegen. Einer hat sich festgefahren und blockiert die halbe Straße. Die Steinmetze verlangen Hilfe, ein ungeduldiger Adliger verlangt Vorfahrt, und beide verlangen es von den Helden."
  },
  {
    id: "muemmelmannshag", name: "Mümmelmannshag", nach: "hartsteen", meile: 58, kanon: true, art: "Weiler",
    kurz: "Ein Weiler mit Hecken und Wiesen, in denen es von Hasen wimmelt. Die Leute hier halten den Hasen für ein Glückstier.",
    szene: "Ein Kutscher hat einen Hasen überfahren, und der Weiler verlangt eine Buße: eine Münze, ein Gebet und ein Lied. Der Kutscher kann nicht singen."
  },

  /* ---------- Hartsteen → Sonnenfeld ---------- */
  {
    id: "reynhartsbruck", name: "Reynhartsbruck", nach: "sonnenfeld", meile: 74, kanon: true, art: "Dorf an einer Brücke",
    kurz: "Ein Dorf an einer alten Steinbrücke, ein beliebter Rastplatz hinter Hartsteen.",
    szene: "Das Edikt hat den Brückenzoll hier abgeschafft. Der Ortsvogt kassiert trotzdem weiter, nur nennt er es jetzt „Pflastergeld“. Wer nachfragt, bekommt eine Quittung mit einem Siegel, das es nicht gibt."
  },
  {
    id: "hennenfeld", name: "Hennenfeld", nach: "sonnenfeld", meile: 84, kanon: true, art: "Dorf",
    kurz: "Das Nachbardorf der Pfalzbaustelle. Hier wohnen viele Arbeiter zur Miete, und jedes zweite Haus verkauft Eier, Brot oder Bier an die Baustelle.",
    szene: "Eine Bäuerin hat ihr Hühnerhaus an drei Steinmetze vermietet und die Hühner in die Stube geholt. Jetzt ist sie mit den Steinmetzen zufrieden und mit den Hühnern nicht. Sie bietet den Helden ein Bett an, das noch nach Federn riecht."
  },

  /* ---------- Sonnenfeld → Rommilyser Kreuz ---------- */
  {
    id: "nadriansfurt", name: "Nadriansfurt", nach: "rommilyser-kreuz", meile: 100, kanon: true, art: "Dorf an einer Furt",
    kurz: "Ein Dorf etwas abseits, an einer alten Furt über die Natter. Wer den Kontrollen ausweichen will, kennt den Weg hierher.",
    szene: "Zwei Rommilyser Händler mit schwer beladenem Wagen biegen hier vom Raulsweg ab. Sie sagen, die Furt sei kürzer. Sie ist es nicht."
  },
  {
    id: "rabensbrueck", name: "Rabensbrück", nach: "rommilyser-kreuz", meile: 110, kanon: true, art: "Dorf mit Rastplatz",
    kurz: "Das letzte Dorf vor der Kreuzung, in dem man sich noch zur Rommilyser Mark zählt und das auch gern sagt.",
    szene: "In der Schenke singt man ein Spottlied auf „Rohajas Rennbahn“, und alle kennen den Text. Wer mitsingt, hat Freunde für den Abend. Wer es nicht tut, wird gefragt, für wen er eigentlich unterwegs ist."
  },

  /* ---------- Rommilyser Kreuz → Feste Hohenstein ---------- */
  {
    id: "niedernberg", name: "Niedernberg", nach: "feste-hohenstein", meile: 117, kanon: true, art: "Dorf",
    kurz: "Ein Dorf in Sichtweite der Feste. Wer die Schlange vor dem Tor scheut, wartet lieber hier.",
    szene: "Der Wirt verkauft Plätze in der Schlange: Seine Söhne stehen seit dem Morgengrauen vor dem Tor und tauschen gegen eine Münze mit jedem, der es eilig hat. Die Wachen dulden das, solange sie mitverdienen."
  },

  /* ---------- Feste Hohenstein → Natterbrücke ---------- */
  {
    id: "rabenbruecke", name: "Rabenbrücke", nach: "natterbruecke", meile: 121, kanon: true, art: "Brücke",
    kurz: "Die alte, schmale Brücke über die Natter unterhalb der Feste. Der Raulsweg quert hier nicht mehr, aber der alte Weg südlich des Flusses beginnt noch immer an ihr.",
    szene: "Ein Fuhrmann will über die Rabenbrücke und den alten Weg nach Süden ausweichen. Ein Wachposten der Feste steht am Brückenkopf und schreibt jeden auf, der das tut. Der Fuhrmann bietet an, die Helden ein Stück mitzunehmen."
  },
  {
    id: "natterdamm", name: "Der neue Natterdamm", nach: "natterbruecke", meile: 130, kanon: false, art: "Straßenbaustelle",
    kurz: "Auf diesem Abschnitt führt der Raulsweg auf einem frisch aufgeschütteten Damm am Nordufer der Natter entlang. Der Schotter ist neu und noch lose.",
    szene: "Ein Kanzleiwagen ist im frischen Schotter eingesunken, und der Schreiber darin weigert sich auszusteigen, weil er die Akten nicht allein lassen darf. Die Akten sind ziemlich schwer."
  },

  /* ---------- Natterbrücke → Mardramund ---------- */
  {
    id: "hausen", name: "Hausen", nach: "mardramund", meile: 143, kanon: true, art: "Dorf mit Rastplatz",
    kurz: "Ein Dorf an der Mündung der Natter in den Darpat. Gegenüber, am anderen Ufer, liegt Hausnerhaven mit seinen Fährleuten.",
    szene: "Die Fährleute von Hausnerhaven fürchten die neue Brücke so sehr wie die Flussträger, obwohl sie gar nicht über die Natter setzen. „Erst die Brücke, dann die nächste“, sagen sie, und meinen den Darpat."
  },
  {
    id: "kreuth", name: "Kreuth", nach: "mardramund", meile: 149, kanon: true, art: "Weiler",
    kurz: "Ein Weiler am Westufer des Darpat, kaum mehr als ein paar Höfe und eine Wegkapelle.",
    szene: "In der Wegkapelle liegt ein Bündel Briefe mit dem Siegel der Beilunker Reiter. Niemand weiß, wer es dort vergessen hat. Jorinde Haselbach würde es sehr gern wissen."
  },
  {
    id: "hasenfeld", name: "Hasenfeld", nach: "mardramund", meile: 161, kanon: true, art: "Dorf",
    kurz: "Das letzte Dorf vor Mardramund. Weil der Botenstall in Mardramund ständig überfüllt ist, wechseln viele Boten schon hier die Pferde.",
    szene: "Ein Beilunker Reiter wartet seit dem Morgen auf ein frisches Pferd. Er bietet den Helden an, eine Nachricht mitzunehmen, die nicht über die Kanzlei laufen soll."
  },

  /* ---------- Mardramund → Wasserburg ---------- */
  {
    id: "drosselau", name: "Drosselau", nach: "wasserburg", meile: 182, kanon: true, art: "Marktflecken mit Rastplatz",
    kurz: "Ein Marktflecken am Darpat, groß genug für einen Markt und klein genug, dass jeder jeden kennt.",
    szene: "Die Vorhut einer Gauklertruppe ist auf dem Weg zum Tsa-Fest in Wasserburg und probt auf dem Marktplatz ein Stück über einen Wegemeister, der seine Pfalz im Sumpf versenkt. Die Leute lachen. Ob das Stück erfunden ist, fragt keiner."
  },
  {
    id: "efferdsquell", name: "Efferdsquell", nach: "wasserburg", meile: 189, kanon: true, art: "Dorf an einer Quelle",
    kurz: "Ein Dorf an einer Quelle, die dem Efferd heilig ist. Fischer und Flößer vom Darpat kommen hierher, um für gutes Wasser zu bitten.",
    szene: "Ein Flößer behauptet, die Quelle sei seit dem Bau des Raulswegs trüber geworden, und macht die Steinbrüche von Hartsteen dafür verantwortlich. Die halbe Schenke stimmt ihm zu."
  },

  /* ---------- Wasserburg → Wandlether Hof ---------- */
  {
    id: "auenried", name: "Auenried", nach: "wandlether-hof", meile: 228, kanon: true, art: "Weiler",
    kurz: "Der letzte Weiler vor dem Wald, zwischen Auwiesen und dem Darpat. Ab hier stehen die Bäume dicht.",
    szene: "Eine Köhlerfamilie mit beladenem Karren warnt vor Wölfen. Dann sagt sie, die Wölfe seien nicht das Problem. Dann sagt sie gar nichts mehr."
  },

  /* ---------- Wandlether Hof → Gnitzenkuhl ---------- */
  {
    id: "goldenes-horn", name: "Gasthaus „Zum Goldenen Horn“", nach: "gnitzenkuhl", meile: 238, kanon: true, art: "Gasthaus",
    kurz: "Ein Gasthaus an der Stelle, wo der Darpat nach Osten abbiegt. Nebenan steht eine alte Zollburg am Fluss.",
    szene: "Der Wirt wirbt Gäste von der Station ab: besseres Essen, keine Palisade, keine Fragen. Seine Zimmer sind tatsächlich besser. Seine Gäste sind tatsächlich weniger gesprächig."
  },
  {
    id: "alriksweiler", name: "Alriksweiler", nach: "gnitzenkuhl", meile: 255, kanon: true, art: "Weiler",
    kurz: "Ein Weiler am Rand des Sumpfes. Hier beginnen die Mücken.",
    szene: "Ein Händler verkauft „echte Gnitzensalbe aus dem Storchenhaus“ zum dreifachen Preis. Sie riecht nach Zwiebeln und hilft gegen nichts. Im Storchenhaus gibt es sie umsonst."
  },

  /* ---------- Gnitzenkuhl → Gaulsfurt ---------- */
  {
    id: "luetzelalbur", name: "Lützelalbur", nach: "gaulsfurt", meile: 266, kanon: true, art: "Dorf",
    kurz: "Ein Dorf am Damm hinter dem Sumpf, aus dem viele Bauarbeiter für die Dammbaustelle stammen.",
    szene: "Eine Mutter wartet am Straßenrand auf Nachricht von ihrem Sohn, der in Gnitzenkuhl am Damm arbeitet und seit einer Woche nicht geschrieben hat."
  },
  {
    id: "grossalbur", name: "Großalbur", nach: "gaulsfurt", meile: 274, kanon: true, art: "Dorf",
    kurz: "Ein Fischerdorf zwischen Straße und Darpat, unweit eines Altwassersees.",
    szene: "Die Fischer haben einen Kahn voller Aale und keinen Käufer, weil alle Händler nach Gaulsfurt drängen. Sie verkaufen billig, wenn man ihnen beim Tragen hilft."
  },
  {
    id: "darpatglueck", name: "Darpatglück", nach: "gaulsfurt", meile: 281, kanon: true, art: "Weiler",
    kurz: "Ein Weiler kurz vor Gaulsfurt, dessen Name seine Bewohner zu Wetten verpflichtet, sagen sie.",
    szene: "Im Schuppen hinter der Schenke nimmt jemand Wetten an: Wann wird die Natterbrücke fertig, wann findet der Hoftag in Sonnenfeld statt, und wer wird Pächter in Wasserburg? Die Quoten sind erstaunlich gut informiert."
  },

  /* ---------- Gaulsfurt → Rabicum ---------- */
  {
    id: "darpatsteg", name: "Darpatsteg", nach: "rabicum", meile: 289, kanon: true, art: "Dorf an einem Steg",
    kurz: "Ein Dorf an einem Fußsteg über einen Arm des Darpat. Für Wagen zu schmal, für Fußgänger der kürzeste Weg zu den Dörfern am Nordufer.",
    szene: "Auf dem Steg begegnen sich zwei Reisende, die beide nicht ausweichen wollen: ein markgräflicher Bote und ein Kanzleibote. Unten im Wasser wartet ein Fischer darauf, wer zuerst hineinfällt."
  },
  {
    id: "sabadonn", name: "Sabadonn", nach: "rabicum", meile: 298, kanon: true, art: "Dorf",
    kurz: "Hier beginnen die Weinberge. Die Winzer stellen Fässer an die Straße und bieten jedem einen Schluck an.",
    szene: "Ein Winzer schenkt nur dem aus, der ihm sagt, wohin die Reise geht. Er schreibt die Antworten auf eine Tafel. Wer die Tafel liest, weiß, wer in den letzten Tagen nach Perricum gezogen ist."
  },

  /* ---------- Rabicum → Perricum ---------- */
  {
    id: "gliesensand", name: "Gliesensand", nach: "perricum", meile: 315, kanon: true, art: "Dorf",
    kurz: "Ein Dorf auf sandigem Grund nahe der Darpatmündung. Der Sand glitzert, wenn die Sonne tief steht.",
    szene: "Kinder verkaufen kleine Säckchen mit glitzerndem Sand als „Perricumer Perlenstaub“. Ein Garether Händler kauft gleich zwanzig, weil er glaubt, ein Geschäft entdeckt zu haben."
  },
  {
    id: "perricumer-schranke", name: "Vor den Toren Perricums", nach: "perricum", meile: 324, kanon: false, art: "Kontrollstelle",
    kurz: "Die letzte Kontrolle der Reise: eine Schranke der Stadt, an der markgräfliche Zöllner Papiere und Gepäck prüfen. Der Geleitbrief der Kanzlei gilt hier, aber nicht viel.",
    szene: "Der Zöllner liest den Geleitbrief der Helden zweimal, nickt freundlich und verlangt trotzdem den Stadtzoll. „Die Kaiserin regiert das Reich. Perricum regiert der Markgraf.“"
  }
];

/* ==========================================================
   Ergänzung: Landmarken, Bauwerke, Bäume, Felsen
   und Orte abseits der Straße. Alle Erfindung dieses Bandes,
   außer wo kanon: true steht.
   ========================================================== */
RW.wegpunkte.push(
  /* ---------- Gareth → Nattersquell ---------- */
  {
    id: "nullstein", name: "Der Nullstein", nach: "nattersquell", meile: 0, kanon: false, typ: "bauwerk", art: "Meilenstein",
    kurz: "Der erste Stein des Raulswegs vor dem Osttor von Gareth, mannshoch, mit dem Greifen der Kaiserin und einer Null, die eigentlich ein Kreis ist. Hier beginnt die Zählung des Edikts.",
    szene: "Wer aufbricht, legt die Hand auf den Stein. Ein Stadtbüttel achtet darauf, dass niemand Splitter abschlägt, denn ein Splitter vom Nullstein soll eine Reise vor Unglück bewahren. Ein Händler bietet trotzdem welche an, unter dem Mantel.",
    meister: "Der Stein ist schon zweimal heimlich ausgetauscht worden, weil zu viele Splitter fehlten. Der jetzige ist der dritte, und das weiß außer der Kanzlei niemand."
  },
  {
    id: "gerichtslinde", name: "Die Gerichtslinde von Alfenmohn", nach: "nattersquell", meile: 17, kanon: false, typ: "natur", art: "Alter Baum",
    kurz: "Eine uralte Linde am Dorfrand, unter der seit Generationen Recht gesprochen wird. Ein steinerner Tisch steht im Schatten, die Rinde ist voller eingeschnittener Zeichen.",
    szene: "Unter der Linde tagt das Dorfgericht: Ein Fuhrmann soll einen Zaun umgefahren haben. Der Dorfschulze bittet Reisende als unparteiische Zeugen an den Tisch, denn die Kanzlei hat ein eigenes Gericht angekündigt, und das will man im Dorf nicht."
  },
  {
    id: "brotkapelle", name: "Die Brotkapelle", nach: "nattersquell", meile: 27, kanon: false, typ: "bauwerk", art: "Wegkapelle",
    kurz: "Eine winzige Kapelle der Travia, kaum größer als ein Backofen. Reisende legen ein Stück Brot hinein, wer Hunger hat, darf eines nehmen.",
    szene: "In der Kapelle liegt kein Brot, sondern ein sauber gefalteter Zettel: Jemand bittet um ein Treffen in Nattersquell, ohne Namen, mit einer Zeichnung einer Gans."
  },

  /* ---------- Nattersquell → Hartsteen ---------- */
  {
    id: "steinerner-hirte", name: "Der Steinerne Hirte", nach: "hartsteen", meile: 48, kanon: false, typ: "landmarke", art: "Felsnadel",
    kurz: "Eine schmale Felsnadel auf einer Kuppe neben der Straße. Von Westen sieht sie aus wie ein Hirte, der sich auf seinen Stab stützt. Die Steinmetze aus Hartsteen haben ihr nie etwas abgeschlagen.",
    szene: "Ein Kanzleibeamter vermisst die Kuppe. Der Fels steht der neuen Trasse im Weg, und ein Gildenmeister aus Hartsteen ist schon unterwegs, um das zu verhindern.",
    meister: "Die Gilde schützt den Fels, weil im Fuß eine Ader besonders feinen Steins steckt, die sie für sich behalten will."
  },
  {
    id: "kaiserbruch", name: "Der Kaiserbruch", nach: "hartsteen", meile: 59, kanon: false, typ: "bauwerk", art: "Steinbruch", abseits: "eine halbe Meile südlich, über einen Karrenweg",
    kurz: "Der große Steinbruch, aus dem die Quader für die Pfalzen kommen. Eine graue Wand, Kräne aus Holz, Staub über allem und ein Lärm, den man bis zur Straße hört.",
    szene: "Ein Block ist aus dem Seil gerutscht und liegt auf dem Karrenweg. Die Steinmetze bitten jeden, der vorbeikommt, mit anzupacken, und wer hilft, bekommt einen Splitter mit dem Zeichen der Gilde."
  },

  /* ---------- Hartsteen → Sonnenfeld ---------- */
  {
    id: "dreibrueder", name: "Die Drei Brüder", nach: "sonnenfeld", meile: 68, kanon: false, typ: "natur", art: "Eichengruppe",
    kurz: "Drei mächtige Eichen in einer Reihe auf freiem Feld, so gleich gewachsen, als hätte sie jemand gepflanzt. Schon von weitem zu sehen, und ein beliebter Rastplatz.",
    szene: "Zwischen den Eichen ist ein Seil gespannt, darauf hängen Bänder mit Namen. Eine Bäuerin erklärt: Wer ein Band aufhängt, kommt sicher wieder heim. Ein Band hängt dort, das den Namen eines Helden trägt."
  },
  {
    id: "schattenstein", name: "Der Schattenstein", nach: "sonnenfeld", meile: 80, kanon: false, typ: "landmarke", art: "Stele",
    kurz: "Eine Steinsäule am Feldrain, deren Schatten zur Mittagsstunde genau auf eine Kerbe im Boden fällt. Die Bauern ringsum richten ihren Tag danach, und die Praioskirche hat sie geweiht.",
    szene: "Die Kerbe im Boden ist frisch versetzt worden, die Mittagsstunde stimmt nicht mehr. In Sonnenfeld streitet man, ob das ein Frevel war oder eine Verbesserung.",
    meister: "Die Baumeisterin der Pfalz hat die Kerbe versetzen lassen, damit die Pfalz auf dem Plan genau nach Süden ausgerichtet erscheint."
  },

  /* ---------- Sonnenfeld → Rommilyser Kreuz ---------- */
  {
    id: "zaehlturm", name: "Der Zählturm", nach: "rommilyser-kreuz", meile: 95, kanon: false, typ: "bauwerk", art: "Alter Wachturm",
    kurz: "Ein halb verfallener Wachturm aus Feldsteinen auf einer Anhöhe. Seit dem Edikt steht oben fast immer jemand und zählt die Wagen auf der neuen Straße.",
    szene: "Oben auf dem Turm sitzt ein Mann mit einer Tafel und Kreide. Er ruft den Helden zu, wie viele Wagen sie heute schon sind, und fragt, wohin sie wollen. Bezahlt wird er von jemandem in Rommilys."
  },
  {
    id: "phexens-daumen", name: "Phexens Daumen", nach: "rommilyser-kreuz", meile: 106, kanon: false, typ: "landmarke", art: "Fels",
    kurz: "Ein runder Fels mit einer Mulde, so groß wie ein Daumen. Händler legen auf dem Weg nach Osten eine Münze hinein, für gute Geschäfte. Am Morgen ist die Mulde immer leer.",
    szene: "Ein Kind liegt im Gras und beobachtet den Fels. Es will wissen, wer die Münzen nimmt, und hat schon eine Wette darauf laufen.",
    meister: "Die Münzen holt der Schrein am Kreuz und gibt sie Händlern zurück, die unterwegs Pech hatten. Oder ein Dieb, der fromm genug ist, das für Phexens Willen zu halten."
  },
  {
    id: "rommilys", name: "Rommilys", nach: "rommilyser-kreuz", meile: 115, kanon: true, typ: "abseits", art: "Hauptstadt Darpatiens", abseits: "geradeaus auf der Feidewaldstraße, etwa 25 Meilen vom Kreuz, eine Tagesreise (Luftlinie nach avesmaps)",
    kurz: "Die alte Hauptstadt Darpatiens und Sitz des Hauses Rabenmund. Die Stadt, die der Raulsweg am Kreuz links liegen lässt.",
    beschreibung: [
      "Rommilys ist eine Stadt mit Mauern, Brücken, Tempeln und einem Selbstbewusstsein, das älter ist als jedes Edikt. Seit Generationen ziehen Händler, Boten und Heere zwischen Garetien und dem Osten durch ihre Tore. Dass die neue Straße am Kreuz nach Süden abbiegt, empfindet man hier als Kränkung.",
      "Für den Raulsweg ist Rommilys der große Abstecher: wer zu den Rabenmunds will, wer Klagen hören oder Gegenstimmen sammeln möchte, wer Handel abseits der Kanzlei sucht, reist am Kreuz geradeaus. Die Feidewaldstraße ist älter, schmaler und schlechter gepflegt als der Raulsweg, aber sie hat Herbergen, die nicht erst gebaut werden müssen."
    ],
    szene: "Am Stadttor fragt die Wache nicht nach dem Geleitbrief, sondern ob man über die neue Straße gekommen ist. Wer ja sagt, zahlt den vollen Zoll. Wer nein sagt, wird zum Bleiben eingeladen.",
    meister: "Rommilys ist der Ort, an dem eine Geschichte vom Raulsweg wegführen und mit neuen Verbündeten oder Feinden zurückkehren kann. Was dort gilt, bestimmt die Spielleitung; die offiziellen Quellen zu Darpatien haben Vorrang."
  },

  /* ---------- Rommilyser Kreuz → Feste Hohenstein ---------- */
  {
    id: "wachtfeuerhoehe", name: "Die Wachtfeuerhöhe", nach: "feste-hohenstein", meile: 118, kanon: false, typ: "landmarke", art: "Hügel mit Feuerstelle",
    kurz: "Ein kahler Hügel mit einer gemauerten Feuerstelle. Von hier aus sieht man die Feste Hohenstein und das Kreuz zugleich. Ein Feuer hier heißt: Gefahr an der Kreuzung.",
    szene: "Auf der Höhe liegt frisch aufgeschichtetes Holz, trocken und mit Pech getränkt. Niemand von der Feste weiß, wer es hingelegt hat."
  },

  /* ---------- Feste Hohenstein → Natterbrücke ---------- */
  {
    id: "schwurweide", name: "Die Schwurweide", nach: "natterbruecke", meile: 126, kanon: false, typ: "natur", art: "Alte Weide am Ufer",
    kurz: "Eine knorrige Silberweide am Natterufer, deren Äste bis ins Wasser hängen. Die Flussträger schwören hier ihre Bündnisse, die Hand im Wasser, die andere am Stamm.",
    szene: "Zwei junge Flussträger stehen bis zu den Knien im Wasser und schwören sich etwas. Als sie die Helden sehen, verstummen sie. Später bittet einer von ihnen, den Schwur zu bezeugen, falls es Streit gibt."
  },
  {
    id: "treidelhaus", name: "Das Treidelhaus", nach: "natterbruecke", meile: 136, kanon: false, typ: "bauwerk", art: "Altes Fachwerkhaus",
    kurz: "Ein schiefes Fachwerkhaus am alten Treidelpfad, Versammlungshaus der Flussträger. An der Wand hängen Seile, Tragegurte und eine Tafel mit den Namen aller, die im Fluss geblieben sind.",
    szene: "Im Treidelhaus wird abgestimmt, ob man der Kanzlei beim Brückenbau hilft oder nicht. Fremde dürfen zuhören, wenn sie ein Seil mit anfassen.",
    meister: "Die Abstimmung ist knapp, und das Ergebnis lässt sich mit einem guten Wort, einem Fass Bier oder einem Gerücht noch drehen."
  },

  /* ---------- Natterbrücke → Mardramund ---------- */
  {
    id: "schreiberstein", name: "Der Schreiberstein", nach: "mardramund", meile: 155, kanon: false, typ: "landmarke", art: "Fels mit Inschriften",
    kurz: "Ein glatter Findling am Wegrand, über und über mit eingeritzten Namen, Daten und Sprüchen bedeckt. Jeder neue Schreiber der Stationskanzlei ritzt hier seinen Namen ein, bevor er in Mardramund anfängt.",
    szene: "Ein junger Schreiber kniet vor dem Stein und sucht einen Platz für seinen Namen. Er bittet um ein Messer, seins ist stumpf, und um Rat, welcher Spruch Hesinde gefällt.",
    meister: "Unter den Namen der Schreiber liegt eine viel ältere Inschrift, kaum noch lesbar. Wer sie entziffert, findet einen Grenzverlauf, der heutigen Ansprüchen widerspricht."
  },
  {
    id: "hohle-esche", name: "Die Hohle Esche", nach: "mardramund", meile: 165, kanon: false, typ: "natur", art: "Hohler Baum",
    kurz: "Eine vom Blitz gespaltene Esche, innen hohl, aber noch grün. Boten und Fuhrleute hinterlegen darin Nachrichten füreinander, ein Postamt ohne Kanzlei.",
    szene: "In der Höhlung steckt ein Brief, adressiert an einen Namen, der zu einem der Helden passt, oder fast."
  },

  /* ---------- Mardramund → Wasserburg ---------- */
  {
    id: "darpatmuehle", name: "Die Darpatmühle", nach: "wasserburg", meile: 177, kanon: false, typ: "bauwerk", art: "Wassermühle",
    kurz: "Eine große Mühle an einem Seitenarm des Darpat, mit zwei Rädern und einem Wehr. Seit die Stationen Mehl brauchen, mahlt sie Tag und Nacht.",
    szene: "Das Wehr ist geschlossen, das Wasser staut sich über die Wiesen. Der Müller sagt, die Kanzlei habe es befohlen. Die Bauern sagen, der Müller lügt."
  },
  {
    id: "tsas-wiege", name: "Tsas Wiege", nach: "wasserburg", meile: 194, kanon: false, typ: "landmarke", art: "Runder Stein in einer Mulde",
    kurz: "Ein fast kugelrunder Stein in einer grasbewachsenen Mulde, der leicht schaukelt, wenn man ihn anstößt. Wer neu anfangen will, gibt ihm einen Stoß und geht, ohne sich umzusehen.",
    szene: "Gaukler aus Wasserburg haben den Stein mit Blumen geschmückt und verkaufen Wünsche: Man flüstert einen Neuanfang auf einen Zettel, sie legen ihn unter den Stein."
  },

  /* ---------- Wasserburg → Wandlether Hof ---------- */
  {
    id: "bannbuche", name: "Die Bannbuche", nach: "wandlether-hof", meile: 214, kanon: false, typ: "natur", art: "Grenzbaum",
    kurz: "Eine gewaltige Buche mit einem eisernen Ring um den Stamm. Hier beginnt der Bannwald des Wandlether Hofs. Wer dahinter jagt, braucht Erlaubnis.",
    szene: "Am Ring hängt ein frischer Hasenbalg, sorgfältig ausgenommen. Eine Warnung, ein Opfer oder ein Spott, je nachdem, wen man fragt.",
    meister: "Der Balg stammt von Rauke, der Köhlerin. Er bedeutet: Der Wald gehört nicht der Krone, sondern Firun."
  },
  {
    id: "koehlerlichtung", name: "Die Köhlerlichtung", nach: "wandlether-hof", meile: 223, kanon: false, typ: "landmarke", art: "Lichtung mit Meilern",
    kurz: "Eine weite Lichtung, auf der drei Meiler rauchen. Hütten aus Rinde, schwarze Gesichter, ein Geruch, der tagelang in den Kleidern bleibt.",
    szene: "Die Köhler bieten Holzkohle zu einem Preis, für den man in Gareth nicht einmal Brennholz bekommt. Woher das Holz kommt, fragt man besser nicht."
  },
  {
    id: "graefenweiche", name: "Gräfenweiche", nach: "wandlether-hof", meile: 233, kanon: true, typ: "siedlung", art: "Weiler an der Abzweigung",
    kurz: "Ein paar Höfe kurz vor dem Wandlether Hof, dort, wo die Nebenstraße nach Blitztann abzweigt. Hier beginnt der Firunsgang.",
    szene: "Ein Pilger in Fellen sitzt am Wegweiser und schnürt seine Stiefel. Er bittet, dass niemand ihm folgt, und meint es ernst."
  },
  {
    id: "blitztann", name: "Blitztann", nach: "wandlether-hof", meile: 233, kanon: true, typ: "abseits", art: "Dorf im Wald", abseits: "gut neun Meilen westlich von Gräfenweiche, über die Nebenstraße",
    kurz: "Ein Walddorf an steinigen Hängen, mit niedrigen Häusern und hohen Holzstapeln. Hier verwahrt der Dorfälteste die eiserne Bärentatze für den Bärenstempel.",
    beschreibung: [
      "Blitztann lebt vom Holz, von der Jagd und davon, dass hier nichts schneller geht als im Wald. Die Leute reden wenig und sehen viel. Wer den Firunsgang allein und ohne Feuer gemacht hat, erkennen sie an den Spuren, nicht an den Worten.",
      "Gruppen sind willkommen, bekommen aber keinen Bärenstempel. Sie bekommen Suppe, einen Platz am Ofen und viele Fragen, die nicht gestellt werden."
    ],
    szene: "Der Dorfälteste prüft die Stiefel eines Pilgers, ohne ein Wort zu sagen. Dann holt er die Bärentatze, oder er holt sie nicht.",
    meister: "Blitztann ist ein guter Ort für Geschichten, die vom Raulsweg in den Wald führen: Wilderei, ein verschwundener Pilger, Fremde auf der Nebenstraße, Wagen, die nachts ohne Licht durch den Wald fahren."
  },
  /* ---------- Wandlether Hof → Gnitzenkuhl ---------- */
  {
    id: "baerenfels", name: "Der Bärenfels", nach: "gnitzenkuhl", meile: 243, kanon: false, typ: "landmarke", art: "Felsformation",
    kurz: "Ein Felsbrocken am Waldrand, der aussieht wie ein schlafender Bär. Pilger, die vom Firunsgang zurückkommen, ritzen eine Kerbe in seinen Rücken.",
    szene: "Jemand hat den Bärenfels mit Kreide bemalt, Augen und Zähne. Ein Firungläubiger ist außer sich und sucht den Täter."
  },
  {
    id: "storchenwiese", name: "Die Storchenwiese", nach: "gnitzenkuhl", meile: 257, kanon: false, typ: "natur", art: "Feuchtwiese",
    kurz: "Eine nasse Wiese kurz vor Gnitzenkuhl, auf der im Sommer Dutzende Störche staken. Wer hier einen Storch aufscheucht, bringt Unglück nach Gnitzenkuhl, sagen die Leute.",
    szene: "Bauleute vom Damm wollen die Wiese trockenlegen. Ein Peraine-Novize steht mit ausgebreiteten Armen vor ihnen."
  },

  /* ---------- Gnitzenkuhl → Gaulsfurt ---------- */
  {
    id: "kriegseiche", name: "Die Kriegseiche", nach: "gaulsfurt", meile: 279, kanon: false, typ: "natur", art: "Alte Eiche",
    kurz: "Eine einzelne Eiche am Rand des alten Schlachtfelds. In ihrer Rinde stecken noch Pfeilspitzen, überwachsen und rostig. Niemand nimmt sie heraus.",
    szene: "Ein Mann versucht, mit einem Messer eine Pfeilspitze aus dem Stamm zu lösen, für einen Sammler in Perricum. Eine Borongeweihte kommt gerade den Weg herauf."
  },
  {
    id: "steinfeld", name: "Das Feld der Steine", nach: "gaulsfurt", meile: 283, kanon: false, typ: "landmarke", art: "Gedenksteine",
    kurz: "Hunderte kleiner Steine stehen in Reihen auf dem Feld vor Gaulsfurt, manche mit Namen, die meisten ohne. Jeder, der vorbeikommt, stellt einen dazu oder richtet einen auf, der umgefallen ist.",
    szene: "Eine alte Frau geht die Reihen ab und liest jeden Namen laut. Sie sucht einen bestimmten, seit Jahren, und bittet die Helden, ihr beim Lesen zu helfen."
  },

  /* ---------- Gaulsfurt → Rabicum ---------- */
  {
    id: "lange-mauer", name: "Die Lange Mauer", nach: "rabicum", meile: 300, kanon: false, typ: "bauwerk", art: "Trockenmauer",
    kurz: "Eine kniehohe Mauer aus Feldsteinen, die über eine Meile neben der Straße herläuft und die Weinberge einfasst. Sie ist älter als jede Urkunde über die Grenzen der Winzer.",
    szene: "Ein Stück der Mauer ist über Nacht versetzt worden, drei Schritt näher an die Straße. Zwei Winzer stehen davor und schreien sich an.",
    meister: "Wem gehört der Streifen zwischen Mauer und Straße, der Kanzlei, dem Winzer oder der Markgrafschaft? Davon hängt ab, wer an der neuen Straße eine Schenke bauen darf."
  },
  {
    id: "zwei-liebende", name: "Die zwei Liebenden", nach: "rabicum", meile: 303, kanon: false, typ: "landmarke", art: "Felsformation",
    kurz: "Zwei hohe Felsen, die sich einander zuneigen, als wollten sie sich küssen. Paare aus Rabicum gehen am Rahjatag hindurch.",
    szene: "Zwischen den Felsen sitzt ein Lautenspieler und singt für jeden, der durch die Lücke geht, eine Strophe. Für die Helden singt er eine, die sie besser nicht weitererzählen."
  },

  /* ---------- Rabicum → Perricum ---------- */
  {
    id: "meerblick", name: "Der Meerblick", nach: "perricum", meile: 312, kanon: false, typ: "landmarke", art: "Hügelkuppe",
    kurz: "Die Kuppe, von der aus man zum ersten Mal das Perlenmeer sieht. Hier halten fast alle an, auch die Eiligen, und viele weinen ein bisschen.",
    szene: "Auf der Kuppe steht ein Händler mit einem Fernrohr und verlangt einen Heller für einen Blick auf die Schiffe im Hafen. Durch sein Glas sieht man auch, welche Flagge gerade einläuft."
  },
  {
    id: "salzgaerten", name: "Die Salzgärten", nach: "perricum", meile: 317, kanon: false, typ: "bauwerk", art: "Salinen", abseits: "eine halbe Meile seewärts von Gliesensand",
    kurz: "Flache Becken am Ufer, in denen Meerwasser verdunstet. Salzsieder harken weiße Krusten zusammen, die Luft schmeckt bitter.",
    szene: "Ein Salzsieder fragt, ob die Helden Platz im Gepäck haben. Ein Sack Salz bis Gareth bringt dort das Dreifache, und Zoll darauf zahlt niemand, sagt er."
  }
);
