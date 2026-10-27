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
