/* ==========================================================
   Figuren am Raulsweg (Ausbaustufe 2)
   ----------------------------------------------------------
   Felder:
   id, name, begriffe (weitere Schreibweisen, die verlinkt werden),
   rolle, station (Stations-ID oder "unterwegs"), maechte [IDs aus maechte.js],
   kurz, aussehen, auftreten, motiv, zitat,
   geheimnisse (Meisterinformation: mögliche Geheimnisse, aus denen jede Spielleitung wählt),
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
    geheimnisse: [
      "Kreutzer hat die Fundamente der Pfalz in Sonnenfeld auf feuchtem Grund planen lassen, gegen den Rat seiner Baumeisterin. Jede Sabotage, die er Haus Rabenmund zuschreiben kann, lenkt von diesem Fehler ab.",
      "Kreutzer ist so redlich, wie er wirkt. Er ahnt, dass jemand in seiner eigenen Kanzlei Bauberichte schönt, und reist mit, um es selbst herauszufinden, ohne es jemandem zu sagen.",
      "Kreutzer hat Schulden aus der Zeit vor dem Raulsweg. Sein Gläubiger hat ihn nie bedrängt, und genau das macht ihm Angst: Irgendwann wird er eine Gefälligkeit verlangen."
    ],
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
    geheimnisse: [
      "Jorinde vermutet, dass ein Kollege an den Relais Briefe öffnet und Abschriften verkauft. Sie hat noch keinen Beweis, aber sie zählt die Siegel nach. Die Helden könnten ihr helfen oder selbst zu den Verdächtigen gehören, wenn ihre Berichte gelesen werden.",
      "Jorinde verkauft selbst gelegentlich Nachrichten weiter, nichts Geheimes, nur wer wann wohin reist. Sie hält das für ein Zubrot, nicht für Verrat.",
      "Jorinde soll im Auftrag der Kanzlei über die Helden berichten. Sie mag sie und schreibt ihre Berichte freundlicher, als sie sein müssten."
    ],
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
    geheimnisse: [
      "Vanstein weiß selbst nicht genau, wem er dient. Seine Anweisungen kommen schriftlich über ein Postfach in Perricum. Er ahnt, dass es Fragen gibt, die er besser nicht stellt, und er hat angefangen, Abschriften zu behalten, für den Fall, dass man ihn fallen lässt.",
      "Vanstein ist genau, was er scheint: ein ehrgeiziger Händler mit Erspartem und Krediten. Er ist zum Sündenbock geworden, weil er zu schnell zu erfolgreich war.",
      "Vanstein prüft selbst, aber nicht für die Kaiserin: Ein Geldgeber will wissen, ob sich der Raulsweg lohnt, bevor er wirklich investiert."
    ],
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
    geheimnisse: [
      "Fredo hat in Hartsteen versehentlich einen fremden Brief in sein Stempelbüchlein gesteckt. Er hat ihn nie gelesen. Irgendwer sucht ihn aber.",
      "Die Stempelsammlung ist eine Wette: Wer zuerst alle zwölf Stempel hat, bekommt die Werkstatt des anderen. Beide schummeln, und beide wissen es.",
      "Fredo ist der Neffe eines Kanzleischreibers und hat versprochen, von unterwegs zu berichten. Seine Briefe sind so wirr, dass man sie in Gareth für eine Geheimschrift hält."
    ],
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
    geheimnisse: [
      "Travine hat die Pacht der Station ohne Bestechung erhalten und ist stolz darauf. Sie weiß aber, dass andere Pächter weiter östlich anders an ihre Häuser gekommen sind, und sie hat Namen gehört.",
      "Travine hat die Pacht nur bekommen, weil ein Gönner für sie gebürgt hat. Sie weiß nicht, wer, und fürchtet den Tag, an dem er sich meldet.",
      "Travine hat nur ein Geheimnis: Sie hat Angst vor Pferden. Wer das herausfindet und für sich behält, hat eine Freundin fürs Leben."
    ],
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
    geheimnisse: [
      "Ugo hat einem Fremden erzählt, wann und wie oft Baumaterial durch Nattersquell kommt, gegen eine Handvoll Silber. Er hält es für harmlos.",
      "Ugo verkauft Reisenden einen „Sonderstempel“, den er selbst aus Holz geschnitzt hat. Der Stempel ist falsch, und die Kanzlei ist nicht amüsiert.",
      "Ugo versteckt in der Scheune einen entlaufenen Ochsen der Bauhütte, weil er findet, das Tier sei schlecht behandelt worden. Der Ochse frisst inzwischen mehr als Ugo."
    ],
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
    geheimnisse: [
      "Die Gilde hat für die Pfalz mehr Stein abgerechnet als verbaut. Den Überschuss hat Gerlind an Ludeger Vanstein verkauft, der damit eigene Herbergen weiter östlich baut.",
      "Die Abrechnungen stimmen, nur die Steine nicht: Ein Bruch der Gilde liefert brüchiges Material. Gerlind weiß es und hofft, dass die Mauern halten, bis sie es in Ordnung bringen kann.",
      "Gerlind ist sauber. Ein Rivale aus der Gilde will ihr Amt und streut Gerüchte über falsche Abrechnungen, damit die Kanzlei sie prüft."
    ],
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
    geheimnisse: [
      "Lohmar hat bemerkt, dass in den Abrechnungen mehr Stein steht, als in seinen Mauern steckt. Er hat es aufgeschrieben und den Zettel versteckt, weil er nicht weiß, wem er trauen kann.",
      "Lohmar hat seinen Zettel nicht versteckt, sondern verkauft, an jemanden, der ihn gegen Gerlind verwenden will. Jetzt bereut er es.",
      "Lohmar hat sich verrechnet. Die Steinmengen stimmen, er hat nur die Maße falsch gelesen. Kommt das heraus, ist er blamiert; kommt es nicht heraus, gerät die Gilde zu Unrecht in Verdacht."
    ],
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
    geheimnisse: [
      "Alrike hat den Wegemeister vor dem feuchten Baugrund gewarnt, schriftlich. Eine Abschrift ihres Briefes besitzt sie noch. Würde er bekannt, stünde Kreutzer schlecht da, und sie selbst auch, weil sie trotzdem weitergebaut hat.",
      "Alrike hat den feuchten Baugrund selbst übersehen und schiebt die Schuld auf den Wegemeister. Der angebliche Warnbrief ist nachträglich geschrieben.",
      "Alrike kennt einen Ausweg: ein teures Pfahlfundament. Sie braucht nur Geld und eine Unterschrift, und für beides würde sie fast alles tun."
    ],
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
    geheimnisse: [
      "Wido ist es, der nachts Werkzeug von der Baustelle nimmt, nicht um es zu stehlen, sondern um es im Wert seiner Entschädigung zu verpfänden. Er führt genau Buch darüber.",
      "Wido hat das Werkzeug nie angerührt. Er weiß aber, wer es war, und schweigt, weil der Dieb einer seiner früheren Knechte ist.",
      "Wido hat das Land, um das er streitet, nie rechtmäßig besessen. Seine Ansprüche beruhen auf einer gefälschten Urkunde seines Großvaters, und er ahnt nichts davon."
    ],
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
    geheimnisse: [
      "Ugdalf hat tatsächlich zweimal an der Baustelle sabotiert, ein Gerüst gelockert und einen Wagen umgestoßen. Mit den übrigen Problemen am Raulsweg hat er nichts zu tun. Seine Familie weiß nichts davon und wäre entsetzt.",
      "Ugdalf prahlt mit Sabotage, die er nie begangen hat. Er war es nicht, wäre es aber gern gewesen, und lässt jeden in dem Glauben.",
      "Ugdalf sabotiert, aber angestiftet: Ein freundlicher Fremder bezahlt ihm den Wein und packt ihn bei der Ehre. Ugdalf hält ihn für einen Freund."
    ],
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
    geheimnisse: [
      "Ysilda schreibt die Spottverse auf den Wegweiser, nicht Ugdalf. Sie hält die Kanzlei für zu selbstgerecht und will, dass die Leute lachen statt gehorchen. Der Verdacht gegen Ugdalf kommt ihr nicht ungelegen.",
      "Ysilda schreibt die Verse nicht, aber sie sammelt sie. Sie weiß, wer welchen Vers am Weg geschrieben hat, und hebt das Wissen für den Tag auf, an dem jemand dafür zahlt.",
      "Die Verse stammen von Ysilda, und sie werden bezahlt: Ein Gönner aus Rommilys gibt ihr für jeden Vers, der bis nach Gareth getragen wird, einen Dukaten."
    ],
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
    geheimnisse: [
      "Walburga hat Anweisung aus der Kanzlei, nach einem bestimmten gebundenen Buch zu suchen, ohne zu erfahren, was darin steht. Das stört sie mehr, als sie zugibt. Wer ihr erklären kann, was sie eigentlich sucht, gewinnt eine wertvolle Verbündete.",
      "Die Anweisung der Kanzlei ist echt, aber Walburga nutzt die strengen Kontrollen auch für eine eigene Suche: nach einem Deserteur aus ihrer alten Einheit.",
      "Walburga weiß genau, was sie sucht, und wird es verschwinden lassen, falls sie es findet, weil es ihren alten Hauptmann belastet."
    ],
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
    geheimnisse: [
      "Melchior hat bemerkt, dass bestimmte Kisten mit dem Siegel eines unbekannten Handelshauses regelmäßig durchkommen und dass ihr Gewicht nie zu ihrem Inhalt passt. Er hat es notiert. Gefragt hat ihn bisher niemand.",
      "Melchior hat die Kisten bemerkt und kassiert seither einen kleinen Wegzoll von den Fuhrleuten, damit er sie nicht öffnet. Er hält das für ein gerechtes Geschäft.",
      "Die Kisten sind harmlos: Ein verschrobener Gelehrter aus Perricum lässt sich Gesteinsproben für seine Sammlung schicken. Melchior hat trotzdem schon in drei Berichten Alarm geschlagen."
    ],
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
    geheimnisse: [
      "Bruna hat den Bau nie sabotiert, aber sie hat zugesehen, wie einer ihrer Träger es tat, und geschwiegen. Ein festes Angebot für ihre Leute nach dem Brückenbau würde sie zum Reden bringen.",
      "Bruna hat selbst Hand angelegt, ein einziges Mal, im Zorn. Seitdem hält sie ihre Leute strenger zurück als jeder Aufseher.",
      "Keiner der Träger hat sabotiert. Bruna weiß das, lässt das Gerücht aber laufen, weil die Angst vor den Trägern ihr bessere Verhandlungen verschafft."
    ],
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
    geheimnisse: [
      "Gesa bekommt von Ludeger Vanstein Geld dafür, dass sie ihm Bescheid gibt, wer bei Hochwasser in ihrer Herberge festsitzt. Sie hält ihn für einen besonders neugierigen Kaufmann.",
      "Gesa schreibt alle Gäste auf, die bei Hochwasser festsitzen, aber nur für sich: Sie arbeitet an einem Buch über die seltsamsten Reisenden des Raulswegs.",
      "Gesa hat das Hochwasser einmal mit einem gestauten Mühlgraben verlängert, um ihre Zimmer zu füllen. Ein einziger Zeuge weiß davon."
    ],
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
    geheimnisse: [
      "Federlein stellt Leumundsbriefe gegen Gefälligkeiten aus. Ludeger Vanstein hat seinen ohne Prüfung erhalten. Federlein weiß mehr über Vansteins Geldgeber als Vanstein selbst.",
      "Federlein ist pedantisch, nicht bestechlich. Die Briefe ohne Prüfung liefen über seinen Stellvertreter. Federlein ahnt es und will den Fall selbst aufdecken, um befördert zu werden.",
      "Federlein stellt Leumundsbriefe gegen Gefälligkeiten aus, aber nur an kleine Leute, die sonst nie einen bekämen. Er hält sich für einen Wohltäter."
    ],
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
    geheimnisse: [
      "Linnart hat beim Abschreiben bemerkt, dass Lieferungen doppelt verbucht werden, und es Federlein gemeldet. Seitdem bekommt er nur noch die langweiligsten Aufgaben. Er ist der Mann, der nachts im Archiv das Licht brennen lässt.",
      "Linnart hat die doppelten Buchungen selbst verursacht, aus Schlamperei. Als er es merkte, meldete er sie als Entdeckung, um seinen Fehler zu verdecken.",
      "Linnart liest nachts nicht Abrechnungen, sondern alte Chroniken. Er ist überzeugt, dass unter Mardramund etwas aus alter Zeit verborgen liegt."
    ],
    bild: "linnart-holm"
  },

  /* ---------- 8 Wasserburg ---------- */
  {
    id: "mutter-iselind", name: "Mutter Iselind", begriffe: ["Iselind"],
    rolle: "Tsa-Geweihte von Wasserburg", station: "wasserburg", maechte: ["kirchen"],
    kurz: "Die Geweihte, deren Fest der Erneuerung zum Marktplatz für Pachtgeschäfte wird.",
    aussehen: "Alterslos, in bunte Gewänder gehüllt, Blumen im weißen Haar, mit einer Stimme, die zugleich sanft und unerbittlich ist.",
    auftreten: "Freundlich zu allen, aber mit klarem Blick dafür, wer ihr Fest nur benutzt. Spricht Wahrheiten freundlich aus, was sie umso unangenehmer macht.",
    motiv: "Dass das Tsa-Fest ein Fest des Neubeginns bleibt und kein Basar.",
    zitat: "Jeder ist willkommen, Neues zu beginnen. Nur wer Altes unter neuem Namen bringt, soll nicht glauben, dass ich es nicht sehe.",
    geheimnisse: [
      "Iselind hat ein großzügiges Geldgeschenk für das Fest angenommen, ehe sie wusste, von wem es kam. Nun fühlt sie sich gebunden und sucht einen Weg, es zurückzugeben, ohne das Fest zu gefährden.",
      "Iselind weiß genau, woher das Geld kommt, und hat es mit Absicht angenommen. Sie will dem Spender beim Fest vor allen Leuten zeigen, dass Tsa sich nicht kaufen lässt.",
      "Das Geld stammt von jemandem, der unerkannt bleiben will und gute Gründe dafür hat. Iselind hält ihr Versprechen, und gerade das macht sie verdächtig."
    ],
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
    geheimnisse: [
      "Fabrizzio wurde von Ludeger Vanstein bezahlt, ein Stück aufzuführen, in dem Haus Rabenmund als Saboteur verspottet wird. Er weiß nicht, warum, aber das Geld war gut.",
      "Fabrizzio hat das Stück aus eigenem Antrieb geschrieben, weil Spott über Rabenmund in Wasserburg gut ankommt. Nun droht ihm ein Gefolgsmann der Rabenmunds, und er sucht Beschützer.",
      "Fabrizzio ist pleite und lebt seit Wochen auf Pump. Seine Truppe weiß nichts davon, und das Fest ist seine letzte Gelegenheit, alles zu bezahlen."
    ],
    bild: "fabrizzio-dellamonte"
  },

  /* ---------- 9 Wandlether Hof ---------- */
  {
    id: "firnwald-eiber", name: "Firnwald Eiber", begriffe: ["Eiber"],
    rolle: "Wachhauptmann am Wandlether Hof", station: "wandlether-hof", maechte: ["kanzlei"],
    kurz: "Ein Hauptmann, der lieber jagt als wacht, und der seinen Abschnitt für ruhiger hält, als er ist.",
    aussehen: "Bärtig, Pelzmantel über dem Wappenrock, Bogen auf dem Rücken, Stiefel voller Schnee.",
    auftreten: "Polternd, gastfreundlich, voller Jagdgeschichten. Unterschätzt jede Gefahr, die nicht vier Beine hat.",
    motiv: "Ruhe, Wildbret und kein Ärger mit der Kanzlei.",
    zitat: "Wölfe? Die tun keinem was, der nicht nach Schaf riecht.",
    geheimnisse: [
      "Eiber lässt die Nebenstraße nach Wandleth nachts unbewacht, weil ihm jemand dafür Pulver, Pfeile und Wein liefert. Was auf dieser Straße fährt, will er nicht wissen.",
      "Eiber lässt die Nebenstraße unbewacht, weil er nachts selbst auf die Jagd geht. Mit den nächtlichen Wagen hat er nichts zu tun, aber er hat sie gesehen.",
      "Eiber bewacht die Straße gewissenhaft. Die nächtlichen Wagen gehören einem Adligen aus der Gegend, der sein eigenes Holz an den Zöllen vorbeischafft, und Eiber traut sich nicht, ihn anzuzeigen."
    ],
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
    geheimnisse: [
      "Rauke hat die nächtlichen Wagen gezählt und weiß, wo sie im Wald halten. Sie würde es nur jemandem verraten, der ihr verspricht, dass ihre Wilderei unerwähnt bleibt.",
      "Rauke ist die Tochter des früheren Försters, der wegen des Raulswegs seine Stelle verlor. Sie hält den Wandlether Hof für Diebesgut und tut alles, um ihm zu schaden.",
      "Rauke macht mit den nächtlichen Wagen Geschäfte: Sie verkauft Holzkohle und Wegwissen. Fliegen die Wagen auf, fliegt sie mit."
    ],
    bild: "rauke"
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
    geheimnisse: [
      "Hilbert hat eine verdorbene Arzneilieferung aufbewahrt, deren Kisten falsch beschriftet waren. Er weiß, über welches Kontor sie bestellt wurde, und er hat einen Brief an die Kanzlei geschrieben, der nie beantwortet wurde.",
      "Die verdorbene Lieferung war ein Versehen: Ein Fuhrmann hat Kisten vertauscht. Hilberts unbeantworteter Brief ist aber echt, und das ist die eigentliche Spur: Wer hat ihn abgefangen?",
      "Hilbert war früher Feldscher und erkennt, wenn jemand über eine Verletzung lügt. Mindestens zwei „Arbeitsunfälle“ an der Strecke waren Schlägereien, die vertuscht wurden."
    ],
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
    geheimnisse: [
      "Grimald bezieht billige Arzneien über einen Zwischenhändler und steckt die Differenz ein. Die verdorbene Lieferung an die Heilerstation ging über ihn.",
      "Grimald ist ehrlich, aber geizig. Er hat die billige Lieferung bestellt, ohne zu ahnen, dass sie verdorben war, und versucht nun, den Schaden heimlich zu bezahlen.",
      "Grimald verkauft unter der Hand eine Mückensalbe, die besser wirkt als alles aus dem Storchenhaus. Das Rezept hat er einer Kräuterfrau abgeluchst, die es zurückwill."
    ],
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
    geheimnisse: [
      "Khorim weiß, dass viele Wechsel der neuen Kontore auf dasselbe Haus in Perricum zurückgehen. Er teilt dieses Wissen nur gegen eine Gegenleistung, zum Beispiel ein Wort zugunsten seines Hauses bei der Kanzlei.",
      "Khorim weiß weniger, als er vorgibt. Er verkauft Andeutungen und vertraut darauf, dass seine Käufer den Rest selbst erfinden.",
      "Khorims eigenes Haus hat einem der neuen Kontore Geld geliehen und bangt nun um seine Wechsel. Er sucht jemanden, der herausfindet, ob das Kontor zahlen kann."
    ],
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
    geheimnisse: [
      "Odelinde hat Anweisung, bestimmte Lieferungen ohne Kontrolle passieren zu lassen. Die Anweisung trägt ein echtes Siegel der markgräflichen Kanzlei, aber keine Unterschrift, die sie kennt, und das beunruhigt sie.",
      "Die Anweisung ist gefälscht, und Odelinde weiß es. Sie befolgt sie trotzdem, um zu sehen, wer die Lieferungen abholt, und hat bisher niemandem davon erzählt.",
      "Odelinde hat die Anweisung selbst geschrieben, um die Lieferungen ihres Bruders zollfrei durchzuschleusen. Das Siegel stammt aus einem alten Vorgang."
    ],
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
    geheimnisse: [
      "Rahjalind hat dem Mann, der ihren Weinkeller gepachtet hat, versprochen, keine Fragen zu stellen. Sie hält sich daran, aber sie hat sich gemerkt, wer ihn besucht.",
      "Rahjalind hat den Gast im Keller erkannt: Er war vor Jahren unter anderem Namen schon einmal hier und hat Schulden hinterlassen. Sie wartet auf die passende Gelegenheit.",
      "Rahjalind hat den Keller nicht verpachtet, sondern beim Kartenspiel verloren. Sie will ihn zurück und sucht jemanden, der dem neuen Pächter das Bleiben verleidet."
    ],
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
    geheimnisse: [
      "Korst hält viele Fäden der neuen Kontore zusammen. Er ist die höchste Stelle, die man auf dem Raulsweg erreichen kann; wer hinter ihm steht, bleibt offen.",
      "Korst ist ein Strohmann mit gutem Namen und schönen Kleidern. Die eigentlichen Entscheidungen trifft jemand, dem die Helden schon begegnet sind.",
      "Korst arbeitet mit den neuen Kontoren, will sie aber übernehmen. Er sucht Verbündete, die ihm helfen, seine Geldgeber loszuwerden."
    ],
    bild: "albrin-korst"
  }
];
