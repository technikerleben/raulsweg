/* ==========================================================
   Figuren am Raulsweg (Ausbaustufe 2)
   ----------------------------------------------------------
   Felder:
   id, name, begriffe (weitere Schreibweisen, die verlinkt werden),
   rolle, station (Stations-ID oder "unterwegs"), maechte [IDs aus maechte.js],
   kurz, aussehen, auftreten, motiv, zitat,
   geheimnis (Meisterinformation),
   bild (Dateiname ohne Endung in img/figuren/; fehlt das Bild, erscheint ein Monogramm)
   Spielwerte folgen in einer späteren Stufe.
   ========================================================== */

window.RW = window.RW || {};

RW.figuren = [

  /* ---------- Unterwegs auf der ganzen Strecke ---------- */
  {
    id: "answald-kreutzer", name: "Answald Kreutzer", begriffe: ["Kreutzer"],
    rolle: "Kaiserlicher Wegemeister", station: "unterwegs", maechte: ["kanzlei"],
    kurz: "Der Mann, der für den Bau des Raulswegs geradesteht und dafür jede Nacht zu wenig schläft.",
    aussehen: "Mitte fünfzig, hager, mit tintenfleckigen Fingern und einem Mantel, der zu oft nass geworden ist. Trägt eine Mappe mit Plänen, die er niemandem aus der Hand gibt.",
    auftreten: "Taucht überall dort auf, wo etwas schiefgeht, meist zu Pferd und meist zu spät. Spricht schnell, unterbricht gern und rechnet laut vor, warum etwas nicht seine Schuld ist.",
    motiv: "Den Raulsweg fertigstellen, bevor man ihn ersetzt. Er glaubt an das Werk, aber noch mehr an seine eigene Unentbehrlichkeit.",
    zitat: "Wenn Ihr mir einen Stein zeigt, der falsch liegt, zeige ich Euch drei Leute, die ihn dorthin gelegt haben.",
    geheimnis: "Kreutzer hat die Fundamente der Pfalz in Sonnenfeld auf feuchtem Grund planen lassen, gegen den Rat seiner Baumeisterin. Jede Sabotage, die er Haus Rabenmund zuschreiben kann, lenkt von diesem Fehler ab.",
    bild: "answald-kreutzer"
  },
  {
    id: "jorinde-haselbach", name: "Jorinde Haselbach", begriffe: ["Jorinde"],
    rolle: "Beilunker Reiterin", station: "unterwegs", maechte: ["beilunker"],
    kurz: "Eine der schnellsten Reiterinnen der Strecke. Überholt jeden Tross und hört dabei mehr, als sie sagt.",
    aussehen: "Ende zwanzig, drahtig, sonnengebräunt, das Haar kurz geschoren. Die Botentasche trägt sie quer über der Brust, als wäre sie ein Teil von ihr.",
    auftreten: "Begegnet den Helden immer wieder: im Relais beim Pferdewechsel, im Vorbeigaloppieren, nachts in der Herberge. Wortkarg, aber verlässlich. Wer ihr Vertrauen gewinnt, hat eine Botin, die Nachrichten schneller trägt als jeder andere.",
    motiv: "Das Briefgeheimnis ist ihr heilig, und die Ehre der Beilunker Reiter auch.",
    zitat: "Ich trage Briefe. Was drinsteht, geht mich nichts an. Was jemand anderes damit macht, schon.",
    geheimnis: "Jorinde vermutet, dass ein Kollege an den Relais Briefe öffnet und Abschriften verkauft. Sie hat noch keinen Beweis, aber sie zählt die Siegel nach. Die Helden könnten ihr helfen oder selbst zu den Verdächtigen gehören, wenn ihre Berichte gelesen werden.",
    bild: "jorinde-haselbach"
  },
  {
    id: "ludeger-vanstein", name: "Ludeger Vanstein", begriffe: ["Vanstein"],
    rolle: "Faktor eines neuen Kontors", station: "unterwegs", maechte: ["neue-kontore"],
    kurz: "Ein freundlicher, zahlungskräftiger Kaufmann, der auf Pachten am Raulsweg bietet und nie über seine Geldgeber spricht.",
    aussehen: "Um die vierzig, rundes Gesicht, gepflegter Bart, gute, aber unauffällige Kleidung. Hat immer ein kleines Kästchen mit Wechselbriefen dabei.",
    auftreten: "Ist an mehreren Stationen gleichzeitig in Verhandlungen, lädt gern zum Essen ein, merkt sich jeden Namen und bezahlt bar. Höflich bis zur Grenze der Unterwürfigkeit, aber nie unvorsichtig.",
    motiv: "Gute Geschäfte, und dass seine Auftraggeber zufrieden sind.",
    zitat: "Ein Raulsweg ohne Herbergen ist nur eine sehr lange Pflasterung. Ich verkaufe den Leuten das, was zwischen den Meilensteinen liegt.",
    geheimnis: "Vanstein weiß selbst nicht genau, wem er dient. Seine Anweisungen kommen schriftlich über ein Postfach in Perricum. Er ahnt, dass es Fragen gibt, die er besser nicht stellt, und er hat angefangen, Abschriften zu behalten, für den Fall, dass man ihn fallen lässt.",
    bild: "ludeger-vanstein"
  },
  {
    id: "pankraz-und-fredo", name: "Pankraz und Fredo", begriffe: ["Pankraz", "Fredo"],
    rolle: "Zwei Garether Handwerker auf Stempeljagd", station: "unterwegs", maechte: [],
    kurz: "Ein Böttcher und ein Flickschneider aus Gareth, die alle zwölf Stationsstempel sammeln wollen und dabei jede Gelegenheit zum Unfug nutzen.",
    aussehen: "Pankraz ist breit, rotgesichtig und laut, Fredo schmal, mit spitzer Nase und einem Stempelbüchlein, das er wie eine Reliquie hütet.",
    auftreten: "Die komische Begleitung der Reise. Sie verwechseln Zimmer, verlieren Wetten, halten Adlige für Wirte und umgekehrt, und sind doch immer im richtigen Moment am falschen Ort. Gute Quelle für Gerüchte, denn sie reden mit jedem.",
    motiv: "Alle zwölf Stempel, eine Geschichte für den Stammtisch und möglichst wenig bezahlen.",
    zitat: "Fredo, das ist kein Stempel, das ist ein Siegel der Kanzlei. – Ist doch auch rund.",
    geheimnis: "Fredo hat in Hartsteen versehentlich einen fremden Brief in sein Stempelbüchlein gesteckt. Er hat ihn nie gelesen. Irgendwer sucht ihn aber.",
    bild: "pankraz-und-fredo"
  },

  /* ---------- 1 Nattersquell ---------- */
  {
    id: "travine-holler", name: "Travine Holler", begriffe: ["Travine"],
    rolle: "Stationswirtin von Nattersquell", station: "nattersquell", maechte: ["kirchen"],
    kurz: "Die Wirtin, die einen Grafen vor die Tür setzte, weil er ihren Knecht schlug.",
    aussehen: "Um die sechzig, kräftig, mit hochgesteckten grauen Zöpfen und Mehl an den Unterarmen. Trägt ein Gansamulett der Travia.",
    auftreten: "Begrüßt jeden Gast mit einem Becher warmer Milch und einem prüfenden Blick. Herzlich, streng, unbestechlich. Was in ihrem Haus geschieht, entgeht ihr nicht.",
    motiv: "Das Gastrecht. Wer unter ihrem Dach ist, steht unter ihrem Schutz, egal wer er ist.",
    zitat: "Hier sitzt der Baron neben dem Bettler, und beide kriegen dieselbe Suppe. Wem das nicht passt, dem zeig ich die Tür.",
    geheimnis: "Travine hat die Pacht der Station ohne Bestechung erhalten und ist stolz darauf. Sie weiß aber, dass andere Pächter weiter östlich anders an ihre Häuser gekommen sind, und sie hat Namen gehört.",
    bild: "travine-holler"
  },
  {
    id: "ugo-brennecke", name: "Ugo Brennecke", begriffe: ["Brennecke"],
    rolle: "Wirt des alten Gasthauses Zur Quelle", station: "nattersquell", maechte: [],
    kurz: "Der alte Dorfwirt, dem die neue Station die Gäste genommen hat.",
    aussehen: "Hängende Schultern, Schürze über einem Bauch, der bessere Zeiten kannte, und ein Gesicht voller Groll.",
    auftreten: "Schimpft über die Kaiserin, die Kanzlei und Travine, aber nur, wenn er sicher ist, dass niemand Wichtiges zuhört. Lädt Fremde gern auf einen billigen Krug ein, um sich zu beklagen.",
    motiv: "Sein Gasthaus retten, notfalls mit Hilfe von Leuten, die ihm Geld anbieten.",
    zitat: "Früher hielt jede Kutsche bei mir. Heute halten sie bei der Kaiserin. Und die kocht nicht mal selbst.",
    geheimnis: "Ugo hat einem Fremden erzählt, wann und wie oft Baumaterial durch Nattersquell kommt, gegen eine Handvoll Silber. Er hält es für harmlos.",
    bild: "ugo-brennecke"
  },

  /* ---------- 2 Hartsteen ---------- */
  {
    id: "gerlind-brucker", name: "Gerlind Brucker", begriffe: ["Gerlind"],
    rolle: "Meisterin der Steinmetzgilde", station: "hartsteen", maechte: ["adel"],
    kurz: "Die Frau, die den Stein für halb den Raulsweg liefert und jeden Quader zweimal abrechnet.",
    aussehen: "Breitschultrig, Staub in den Falten, ein Lederschurz über feinem Tuch. Ihre Hände sind die einer Steinmetzin, ihr Ring der einer Ratsfrau.",
    auftreten: "Selbstbewusst, geschäftstüchtig, stolz auf ihre Stadt. Führt Gäste gern durch die Brüche und erklärt ausführlich, warum Hartsteiner Stein der beste ist.",
    motiv: "Das Liefermonopol der Gilde sichern, und mit ihm den Wohlstand Hartsteens.",
    zitat: "Andere bauen Straßen. Wir bauen das, worauf sie liegen.",
    geheimnis: "Die Gilde hat für die Pfalz mehr Stein abgerechnet als verbaut. Den Überschuss hat Gerlind an Ludeger Vanstein verkauft, der damit eigene Herbergen weiter östlich baut.",
    bild: "gerlind-brucker"
  },
  {
    id: "eberwin-lohmar", name: "Eberwin Lohmar", begriffe: ["Lohmar"],
    rolle: "Pfalzvogt von Hartsteen", station: "hartsteen", maechte: ["kanzlei"],
    kurz: "Der Verwalter der zu prächtig geratenen Pfalz, der sich vor allem um Etikette sorgt.",
    aussehen: "Mittleres Alter, steif wie ein frisch gestärkter Kragen, mit kleiner Brille und einem Gästebuch unter dem Arm.",
    auftreten: "Verteilt Zimmer streng nach Rang und hat eine Liste, welcher Adlige mit welchem nicht im selben Flügel schlafen darf. Ein wandelndes Protokoll, aber gutmütig.",
    motiv: "Dass bei ihm kein Skandal geschieht. Niemals.",
    zitat: "Ein Ritter weicht einem Baron, ein Baron einem Grafen, und alle weichen meiner Liste.",
    geheimnis: "Lohmar hat bemerkt, dass in den Abrechnungen mehr Stein steht, als in seinen Mauern steckt. Er hat es aufgeschrieben und den Zettel versteckt, weil er nicht weiß, wem er trauen kann.",
    bild: "eberwin-lohmar"
  },

  /* ---------- 3 Sonnenfeld ---------- */
  {
    id: "alrike-sonnwald", name: "Alrike Sonnwald", begriffe: ["Alrike"],
    rolle: "Baumeisterin der Pfalz Sonnenfeld", station: "sonnenfeld", maechte: ["kanzlei"],
    kurz: "Die idealistische Baumeisterin, die eine Pfalz für Jahrhunderte bauen will und dafür zu wenig Zeit bekommt.",
    aussehen: "Anfang dreißig, Kalkstaub im Haar, eine Wachstafel am Gürtel und Augen, die nicht stillhalten.",
    auftreten: "Begeistert, erschöpft und gereizt zugleich. Erklärt Gewölbe, Lastverteilung und Sonnenstand, auch wenn niemand danach fragt. Wer sich wirklich für ihr Werk interessiert, gewinnt eine Verbündete.",
    motiv: "Ein Bauwerk, das bleibt. Sie würde lieber den Termin verpassen als schlecht bauen.",
    zitat: "Ein Palast, der zum Hoftag fertig ist, steht vielleicht bis zum nächsten. Ich baue einen, der steht, wenn alle Hoftage vergessen sind.",
    geheimnis: "Alrike hat den Wegemeister vor dem feuchten Baugrund gewarnt, schriftlich. Eine Abschrift ihres Briefes besitzt sie noch. Würde er bekannt, stünde Kreutzer schlecht da, und sie selbst auch, weil sie trotzdem weitergebaut hat.",
    bild: "alrike-sonnwald"
  },
  {
    id: "wido-krumhaber", name: "Wido Krumhaber", begriffe: ["Wido"],
    rolle: "Enteigneter Bauer", station: "sonnenfeld", maechte: [],
    kurz: "Der Bauer, auf dessen Feldern die Pfalz steht, und der noch immer auf seine Entschädigung wartet.",
    aussehen: "Wettergegerbt, krummer Rücken, die Mütze in den Händen. Steht jeden Tag am Bauzaun.",
    auftreten: "Höflich, beharrlich, unendlich geduldig. Spricht jeden an, der wichtig aussieht, und zeigt sein Schreiben der Kanzlei vor, das inzwischen fast zerfallen ist.",
    motiv: "Gerechtigkeit für seine Familie, und das Geld, um neues Land zu kaufen.",
    zitat: "Die Kaiserin baut ihr Haus auf meinem Acker. Ich gönn's ihr. Ich möcht nur wissen, wo ich jetzt säen soll.",
    geheimnis: "Wido ist es, der nachts Werkzeug von der Baustelle nimmt, nicht um es zu stehlen, sondern um es im Wert seiner Entschädigung zu verpfänden. Er führt genau Buch darüber.",
    bild: "wido-krumhaber"
  },

  /* ---------- 4 Rommilyser Kreuz ---------- */
  {
    id: "ugdalf-von-rabenmund", name: "Ugdalf von Rabenmund", begriffe: ["Ugdalf"],
    rolle: "Junker aus einer Nebenlinie des Hauses Rabenmund", station: "rommilyser-kreuz", maechte: ["rabenmund"],
    kurz: "Der junge Heißsporn, der offen gegen Rohajas Rennbahn hetzt und dabei weiter geht als seine Familie.",
    aussehen: "Anfang zwanzig, schwarzes Wams mit Rabenstickerei, ein zu großer Degen und ein noch größeres Mundwerk.",
    auftreten: "Sitzt mit ein paar Kumpanen in der Bauhütte an der Kreuzung, trinkt, spottet und provoziert jeden, der nach Kaiserin riecht. Mutig, eitel und leicht zu reizen.",
    motiv: "Seiner Familie beweisen, dass er mehr ist als ein Junker ohne Land.",
    zitat: "Rohaja baut eine Rennbahn. Ich sorge dafür, dass die Pferde stolpern.",
    geheimnis: "Ugdalf hat tatsächlich zweimal an der Baustelle sabotiert, ein Gerüst gelockert und einen Wagen umgestoßen. Mit den übrigen Problemen am Raulsweg hat er nichts zu tun. Seine Familie weiß nichts davon und wäre entsetzt.",
    bild: "ugdalf-von-rabenmund"
  },
  {
    id: "ysilda-graumann", name: "Ysilda Graumann", begriffe: ["Ysilda"],
    rolle: "Hüterin des Phex-Schreins an der Kreuzung", station: "rommilyser-kreuz", maechte: ["kirchen"],
    kurz: "Eine unscheinbare Schreinhüterin, die mehr Händlern zuhört, als diese ahnen.",
    aussehen: "Klein, grau gekleidet, mit wachen Augen und einem Lächeln, das man leicht übersieht.",
    auftreten: "Nimmt Opfergaben an, segnet Geschäfte und gibt Händlern Rat. Wirkt harmlos und ein wenig zerstreut.",
    motiv: "Dass an ihrer Kreuzung niemand zu mächtig wird. Phex liebt die Bewegung, nicht den Stillstand.",
    zitat: "Ein Wegweiser zeigt, wohin man gehen soll. Ein kluger Händler fragt, wer ihn aufgestellt hat.",
    geheimnis: "Ysilda schreibt die Spottverse auf den Wegweiser, nicht Ugdalf. Sie hält die Kanzlei für zu selbstgerecht und will, dass die Leute lachen statt gehorchen. Der Verdacht gegen Ugdalf kommt ihr nicht ungelegen.",
    bild: "ysilda-graumann"
  },

  /* ---------- 5 Feste Hohenstein ---------- */
  {
    id: "walburga-steinhauer", name: "Walburga Steinhauer", begriffe: ["Walburga"],
    rolle: "Torhauptfrau der Feste Hohenstein", station: "feste-hohenstein", maechte: ["kanzlei"],
    kurz: "Die strenge Kommandantin des Kontrollpostens, die Befehle befolgt, auch wenn sie sie nicht versteht.",
    aussehen: "Groß, graues Haar unter dem Helm, eine Narbe am Kinn, Rüstung in Rot und Gold, immer tadellos.",
    auftreten: "Knapp, korrekt, unnahbar. Macht keine Ausnahmen, auch nicht für Ehrengäste. Wer ihr mit Ehrlichkeit begegnet, bekommt ihren Respekt, wer sie bestechen will, ihren Zorn.",
    motiv: "Pflicht. Ihre Feste soll die Straße sicher machen, nicht bequem.",
    zitat: "Euer Geleitbrief öffnet Euch die Pfalzen. Mein Tor öffnet er erst, wenn ich Euer Gepäck gesehen habe.",
    geheimnis: "Walburga hat Anweisung aus der Kanzlei, nach einem bestimmten gebundenen Buch zu suchen, ohne zu erfahren, was darin steht. Das stört sie mehr, als sie zugibt. Wer ihr erklären kann, was sie eigentlich sucht, gewinnt eine wertvolle Verbündete.",
    bild: "walburga-steinhauer"
  },
  {
    id: "melchior-pfeilsticker", name: "Melchior Pfeilsticker", begriffe: ["Pfeilsticker"],
    rolle: "Schreiber am Tor", station: "feste-hohenstein", maechte: ["kanzlei"],
    kurz: "Der Schreiber, der stempelt, schreibt, stempelt und nie den Blick hebt, und der sich trotzdem an alles erinnert.",
    aussehen: "Schmal, gebeugt, mit Ärmelschonern und einem Tintenfass, das nie leer wird.",
    auftreten: "Murmelt beim Schreiben Namen und Waren vor sich hin. Antwortet auf Fragen, ohne aufzusehen, aber präzise. Wer ihm ein neues Federmesser schenkt, wird erstaunlich gesprächig.",
    motiv: "Ordnung in seinen Listen. Ein Fehler in den Büchern bereitet ihm körperliches Unbehagen.",
    zitat: "Siebenundvierzig Fass Wein, ein Pilger mit Ziege, Euer Name. Weiter.",
    geheimnis: "Melchior hat bemerkt, dass bestimmte Kisten mit dem Siegel eines unbekannten Handelshauses regelmäßig durchkommen und dass ihr Gewicht nie zu ihrem Inhalt passt. Er hat es notiert. Gefragt hat ihn bisher niemand.",
    bild: "melchior-pfeilsticker"
  },

  /* ---------- 6 Natterbrücke ---------- */
  {
    id: "bruna-lehmkuhl", name: "Bruna Lehmkuhl", begriffe: ["Bruna", "Mutter Bruna"],
    rolle: "Älteste der Flussträger", station: "natterbruecke", maechte: ["traeger"],
    kurz: "Die Anführerin der Trägergilde, so stark wie stur, die für ihre Leute verhandelt.",
    aussehen: "Um die fünfzig, Schultern wie ein Ochse, nackte Füße, Hände wie Schaufeln, ein Lachen, das man über den Fluss hört.",
    auftreten: "Rau, direkt, großzügig gegenüber Armen und gnadenlos gegenüber Hochnäsigen. Bestimmt den Preis nach Wasserstand und Laune.",
    motiv: "Dass ihre Leute nicht hungern, wenn die Brücke fertig ist.",
    zitat: "Die Brücke trägt Euch irgendwann. Wir tragen Euch heute. Zahlt also lieber uns.",
    geheimnis: "Bruna hat den Bau nie sabotiert, aber sie hat zugesehen, wie einer ihrer Träger es tat, und geschwiegen. Ein festes Angebot für ihre Leute nach dem Brückenbau würde sie zum Reden bringen.",
    bild: "bruna-lehmkuhl"
  },
  {
    id: "gesa-natterer", name: "Gesa Natterer", begriffe: ["Gesa"],
    rolle: "Herbergswirtin am Ufer", station: "natterbruecke", maechte: [],
    kurz: "Die Wirtin, die bei Hochwasser das beste Geschäft ihres Lebens macht und es auch so behandelt.",
    aussehen: "Schlank, scharfes Gesicht, gestärkte Haube und ein Schlüsselbund, der bei jedem Schritt klirrt.",
    auftreten: "Verteilt die wenigen Betten nach Geld, nicht nach Rang, und lässt sich von keinem Titel beeindrucken. Weiß genau, wer bei ihr wie lange festsitzt und warum.",
    motiv: "Möglichst viel verdienen, solange das Wasser steht.",
    zitat: "Ahnen sind schön, Euer Wohlgeboren. Silber ist schöner.",
    geheimnis: "Gesa bekommt von Ludeger Vanstein Geld dafür, dass sie ihm Bescheid gibt, wer bei Hochwasser in ihrer Herberge festsitzt. Sie hält ihn für einen besonders neugierigen Kaufmann.",
    bild: "gesa-natterer"
  },

  /* ---------- 7 Mardramund ---------- */
  {
    id: "odilo-federlein", name: "Odilo Federlein", begriffe: ["Federlein"],
    rolle: "Vorsteher der Stationskanzlei", station: "mardramund", maechte: ["kanzlei"],
    kurz: "Der Herr über Register, Passierscheine und Leumundsbriefe, früher Buchhalter eines großen Handelshauses.",
    aussehen: "Um die fünfzig, glatt rasiert, sorgfältig gekleidet, mit einer Brille, die er beim Nachdenken putzt.",
    auftreten: "Zuvorkommend, gewandt, ein Meister der Verwaltungssprache. Gibt nie ein klares Nein, aber auch selten ein Ja.",
    motiv: "Einfluss. Wer die Leumundsbriefe ausstellt, entscheidet, wer am Raulsweg Geschäfte machen darf.",
    zitat: "Euer Antrag ist vollständig, bis auf die Teile, die noch fehlen.",
    geheimnis: "Federlein stellt Leumundsbriefe gegen Gefälligkeiten aus. Ludeger Vanstein hat seinen ohne Prüfung erhalten. Federlein weiß mehr über Vansteins Geldgeber als Vanstein selbst.",
    bild: "odilo-federlein"
  },
  {
    id: "linnart-holm", name: "Linnart Holm", begriffe: ["Linnart"],
    rolle: "Junger Kanzleischreiber", station: "mardramund", maechte: ["kanzlei"],
    kurz: "Ein übereifriger junger Schreiber, der lieber die Bücher rettet als sich selbst.",
    aussehen: "Achtzehn, schlaksig, Tinte an der Nase, ein Stapel Bücher unter dem Arm, zu dünner Mantel.",
    auftreten: "Freundlich, ehrlich, neugierig und ungeschickt. Stellt Fragen, die er nicht stellen sollte, und beantwortet Fragen, die er nicht beantworten dürfte.",
    motiv: "Etwas Wichtiges leisten. Er glaubt an das Edikt der Kaiserin.",
    zitat: "Ich darf Euch das Register natürlich nicht zeigen. Aber ich könnte es hier liegen lassen, während ich Tee hole.",
    geheimnis: "Linnart hat beim Abschreiben bemerkt, dass Lieferungen doppelt verbucht werden, und es Federlein gemeldet. Seitdem bekommt er nur noch die langweiligsten Aufgaben. Er ist der Mann, der nachts im Archiv das Licht brennen lässt.",
    bild: "linnart-holm"
  },

  /* ---------- 8 Wandlether Hof ---------- */
  {
    id: "firnwald-eiber", name: "Firnwald Eiber", begriffe: ["Eiber"],
    rolle: "Wachhauptmann am Wandlether Hof", station: "wandlether-hof", maechte: ["kanzlei"],
    kurz: "Ein Hauptmann, der lieber jagt als wacht, und der seinen Abschnitt für ruhiger hält, als er ist.",
    aussehen: "Bärtig, Pelzmantel über dem Wappenrock, Bogen auf dem Rücken, Stiefel voller Schnee.",
    auftreten: "Polternd, gastfreundlich, voller Jagdgeschichten. Unterschätzt jede Gefahr, die nicht vier Beine hat.",
    motiv: "Ruhe, Wildbret und kein Ärger mit der Kanzlei.",
    zitat: "Wölfe? Die tun keinem was, der nicht nach Schaf riecht.",
    geheimnis: "Eiber lässt die Nebenstraße nach Wandleth nachts unbewacht, weil ihm jemand dafür Pulver, Pfeile und Wein liefert. Was auf dieser Straße fährt, will er nicht wissen.",
    bild: "firnwald-eiber"
  },
  {
    id: "rauke", name: "Rauke", begriffe: [],
    rolle: "Köhlerin und Wilderin", station: "wandlether-hof", maechte: [],
    kurz: "Eine Köhlerin, die den Wald kennt wie keiner, und die mehr gesehen hat, als gut für sie ist.",
    aussehen: "Rußgeschwärzt, zerzaust, mit einem Hund an der Seite und Fallen am Gürtel.",
    auftreten: "Misstrauisch, scheu, spricht nur, wenn sie muss. Taucht auf, verschwindet wieder. Wer ihren Hund freundlich behandelt, hat schon halb gewonnen.",
    motiv: "In Ruhe gelassen werden, und dass ihr Wald nicht noch mehr Straßen bekommt.",
    zitat: "Wagen ohne Licht fahren nachts nach Wandleth. Wagen ohne Licht fahren nicht für die Kaiserin.",
    geheimnis: "Rauke hat die nächtlichen Wagen gezählt und weiß, wo sie im Wald halten. Sie würde es nur jemandem verraten, der ihr verspricht, dass ihre Wilderei unerwähnt bleibt.",
    bild: "rauke"
  },

  /* ---------- 9 Wasserburg ---------- */
  {
    id: "mutter-iselind", name: "Mutter Iselind", begriffe: ["Iselind"],
    rolle: "Tsa-Geweihte von Wasserburg", station: "wasserburg", maechte: ["kirchen"],
    kurz: "Die Geweihte, deren Fest der Erneuerung zum Marktplatz für Pachtgeschäfte wird.",
    aussehen: "Alterslos, in bunte Gewänder gehüllt, Blumen im weißen Haar, mit einer Stimme, die zugleich sanft und unerbittlich ist.",
    auftreten: "Freundlich zu allen, aber mit klarem Blick dafür, wer ihr Fest nur benutzt. Spricht Wahrheiten freundlich aus, was sie umso unangenehmer macht.",
    motiv: "Dass das Tsa-Fest ein Fest des Neubeginns bleibt und kein Basar.",
    zitat: "Jeder ist willkommen, Neues zu beginnen. Nur wer Altes unter neuem Namen bringt, soll nicht glauben, dass ich es nicht sehe.",
    geheimnis: "Iselind hat ein großzügiges Geldgeschenk für das Fest angenommen, ehe sie wusste, von wem es kam. Nun fühlt sie sich gebunden und sucht einen Weg, es zurückzugeben, ohne das Fest zu gefährden.",
    bild: "mutter-iselind"
  },
  {
    id: "fabrizzio-dellamonte", name: "Fabrizzio Dellamonte", begriffe: ["Fabrizzio"],
    rolle: "Prinzipal einer horasischen Gauklertruppe", station: "wasserburg", maechte: [],
    kurz: "Ein schillernder Gauklerprinzipal, der jedes Fest am Raulsweg bespielt und dabei alles sieht.",
    aussehen: "Bunter Mantel, gezwirbelter Schnurrbart, ein Hut mit drei Federn, die schon bessere Tage gesehen haben.",
    auftreten: "Charmant, theatralisch, immer im Gespräch. Seine Truppe spielt Stücke über Kaiser und Kaufleute, und manchmal sind sie erstaunlich gut informiert.",
    motiv: "Ruhm, Geld und gute Geschichten, ungefähr in dieser Reihenfolge.",
    zitat: "Ich spiele nur, was das Publikum ohnehin denkt. Ich spiele es nur lauter.",
    geheimnis: "Fabrizzio wurde von Ludeger Vanstein bezahlt, ein Stück aufzuführen, in dem Haus Rabenmund als Saboteur verspottet wird. Er weiß nicht, warum, aber das Geld war gut.",
    bild: "fabrizzio-dellamonte"
  },

  /* ---------- 10 Gnitzenkuhl ---------- */
  {
    id: "bruder-hilbert", name: "Bruder Hilbert", begriffe: ["Hilbert"],
    rolle: "Peraine-Geweihter und Leiter der Heilerstation", station: "gnitzenkuhl", maechte: ["kirchen"],
    kurz: "Ein müder, unbestechlicher Heiler, der mehr Kranke hat als Betten.",
    aussehen: "Hager, mit Augenringen und Kräuterflecken an der Kutte, einem Storchenamulett und ruhigen Händen.",
    auftreten: "Sanft im Umgang mit Kranken, schroff gegenüber jedem, der Zeit kostet. Nimmt Hilfe dankbar an, Ausreden nicht.",
    motiv: "Die Kranken versorgen, und dafür sorgen, dass nicht noch mehr krank werden.",
    zitat: "Ich frage nicht, wem ihr dient. Ich frage, wo es wehtut.",
    geheimnis: "Hilbert hat eine verdorbene Arzneilieferung aufbewahrt, deren Kisten falsch beschriftet waren. Er weiß, über welches Kontor sie bestellt wurde, und er hat einen Brief an die Kanzlei geschrieben, der nie beantwortet wurde.",
    bild: "bruder-hilbert"
  },
  {
    id: "grimald-schaufler", name: "Grimald Schaufler", begriffe: ["Schaufler"],
    rolle: "Bauaufseher am Damm", station: "gnitzenkuhl", maechte: ["adel"],
    kurz: "Ein Aufseher, der kranke Arbeiter durch neue ersetzt, weil der Zeitplan drängt.",
    aussehen: "Kräftig, mit Schlapphut gegen die Mücken, Peitsche am Gürtel, die er selten benutzt, aber gern zeigt.",
    auftreten: "Laut, hektisch, ständig am Rechnen. Spricht von Arbeitern wie von Schubkarren und wird wütend, wenn man ihn darauf hinweist.",
    motiv: "Den Damm fertig bekommen und die Prämie kassieren, die ihm sein Baron versprochen hat.",
    zitat: "Fieber? Das ist der Sumpf. Der Sumpf ist nicht mein Problem. Der Damm ist mein Problem.",
    geheimnis: "Grimald bezieht billige Arzneien über einen Zwischenhändler und steckt die Differenz ein. Die verdorbene Lieferung an die Heilerstation ging über ihn.",
    bild: "grimald-schaufler"
  },

  /* ---------- 11 Gaulsfurt ---------- */
  {
    id: "khorim-ibn-dschelef", name: "Khorim ibn Dschelef", begriffe: ["Khorim"],
    rolle: "Wechselmeister im Mondsilberkontor", station: "gaulsfurt", maechte: ["mada-basari"],
    kurz: "Ein höflicher tulamidischer Geldwechsler, der jeden Wechselbrief des Raulswegs schon einmal in der Hand hatte.",
    aussehen: "Gepflegter grauer Bart, dunkelblaues Gewand mit Silberstickerei, eine Waage aus Messing und ein Lächeln, das nichts verrät.",
    auftreten: "Gastfreundlich, geduldig, bietet Tee an, bevor er über Geschäfte spricht. Beantwortet Fragen mit Gegenfragen und Geschichten.",
    motiv: "Gute Geschäfte für sein Haus und ein Raulsweg, der den Osthandel belebt.",
    zitat: "Geld hat kein Gedächtnis, sagen die Garether. In meinem Haus hat es eines. Es erinnert sich an jede Hand, durch die es ging.",
    geheimnis: "Khorim weiß, dass viele Wechsel der neuen Kontore auf dasselbe Haus in Perricum zurückgehen. Er teilt dieses Wissen nur gegen eine Gegenleistung, zum Beispiel ein Wort zugunsten seines Hauses bei der Kanzlei.",
    bild: "khorim-ibn-dschelef"
  },
  {
    id: "odelinde-perval", name: "Odelinde Perval", begriffe: ["Odelinde"],
    rolle: "Markgräfliche Zöllnerin", station: "gaulsfurt", maechte: ["perricum"],
    kurz: "Eine Zöllnerin im Dienst Perricums, die an der Kreuzung Zoll erhebt, den auch die Kanzlei beansprucht.",
    aussehen: "Mitte dreißig, streng frisiert, Wappenrock mit dem Delfin von Perricum, ein Siegelring und ein Zollbuch, dick wie eine Bibel.",
    auftreten: "Höflich, kompetent und völlig unnachgiebig, wenn es um die Rechte ihres Markgrafen geht. Liefert sich mit den Kanzleibeamten einen Kleinkrieg aus Formularen.",
    motiv: "Die Zölle an der Gaulsfurt für Perricum sichern.",
    zitat: "Die Straße gehört der Kaiserin. Die Furt gehörte schon Perricum, als die Kaiserin noch nicht geboren war.",
    geheimnis: "Odelinde hat Anweisung, bestimmte Lieferungen ohne Kontrolle passieren zu lassen. Die Anweisung trägt ein echtes Siegel der markgräflichen Kanzlei, aber keine Unterschrift, die sie kennt, und das beunruhigt sie.",
    bild: "odelinde-perval"
  },

  /* ---------- 12 Rabicum ---------- */
  {
    id: "rahjalind-weinhold", name: "Rahjalind Weinhold", begriffe: ["Rahjalind"],
    rolle: "Stationswirtin von Rabicum", station: "rabicum", maechte: ["kirchen"],
    kurz: "Die Wirtin, die jeden kennt, der in den letzten zehn Jahren nach Perricum gereist ist.",
    aussehen: "Üppig, rote Locken, ein Kleid in Weinrot, Rosen im Haar, ein Lachen, das ansteckt.",
    auftreten: "Warmherzig, geistreich und charmant, eine Meisterin des Gesprächs. Verrät Klatsch freigiebig und Geheimnisse nur, wenn sie es will.",
    motiv: "Dass ihr Haus der fröhlichste Ort am Raulsweg bleibt.",
    zitat: "Bei mir wird niemand verhaftet, niemand verhört und niemand gelangweilt. In dieser Reihenfolge.",
    geheimnis: "Rahjalind hat dem Mann, der ihren Weinkeller gepachtet hat, versprochen, keine Fragen zu stellen. Sie hält sich daran, aber sie hat sich gemerkt, wer ihn besucht.",
    bild: "rahjalind-weinhold"
  },
  {
    id: "albrin-korst", name: "Albrin Korst", begriffe: ["Korst"],
    rolle: "Der Herr im Weinkeller", station: "rabicum", maechte: ["neue-kontore"],
    kurz: "Ein stiller Gast, der einen ganzen Weinkeller gepachtet hat, nur um darin ungestört zu sein.",
    aussehen: "Unauffällig bis zur Unsichtbarkeit: graues Haar, graue Kleidung, ein Gesicht, das man sofort vergisst.",
    auftreten: "Zeigt sich selten. Empfängt Besucher einzeln im Keller, bei Kerzenlicht und gutem Wein. Spricht leise, langsam und nie einen Satz zu viel.",
    motiv: "Die Fäden in der Hand behalten. Was er genau will, bleibt bewusst offen.",
    zitat: "Am Ende einer langen Straße wartet immer jemand, der weiß, was man unterwegs erlebt hat.",
    geheimnis: "Korst ist die Spitze dessen, was die neuen Kontore verbindet, oder zumindest die höchste Stelle, die die Helden auf dem Raulsweg erreichen können. Wer hinter ihm steht, ist der Spielleitung überlassen und kann mit der eigenen Kampagne verknüpft werden.",
    bild: "albrin-korst"
  }
];
