/* ==========================================================
   Die zwölf Tempel des Raulswegs
   ----------------------------------------------------------
   Jede Station ist einer der Zwölfgötter geweiht. Hier stehen ihre
   Schreine, Kapellen und Tempel.
   Felder:
   id, station (Stations-ID), gottheit, name, begriffe (weitere Schreibweisen),
   art (Schrein | Kapelle | Tempel | Halle), zustand (fertig | erweiterung | rohbau),
   kurz, beschreibung [Absätze], brauch (was Reisende hier tun),
   stempel (wie der Stationsstempel aussieht und wie man ihn erhält),
   dienste (was der Tempel Reisenden bietet), geweihte (wer ihn hütet),
   spannung (angedeuteter Konflikt), meister (Meisterinformation),
   moeglichkeiten (optional: mögliche Wahrheiten, aus denen jede Spielleitung wählt)
   ========================================================== */

window.RW = window.RW || {};

RW.tempel = [
  {
    id: "herdkapelle-nattersquell", station: "nattersquell", gottheit: "Travia",
    name: "Herdkapelle zur Quelle", begriffe: ["Herdkapelle"],
    art: "Kapelle", zustand: "fertig",
    kurz: "Kein eigenes Gebäude, sondern der große Herd der Stationsherberge selbst. Sein Feuer ist der Altar.",
    beschreibung: [
      "Die Travia-Kapelle von Nattersquell ist eine Nische neben dem großen Herd der Stationsherberge, mit einer kleinen Statue der Gütigen Mutter und einer geschnitzten Gans. Das Herdfeuer brennt seit der Weihe ununterbrochen und gilt selbst als heilig.",
      "Im Hof leben ein Dutzend Gänse, die niemand schlachten darf. Sie sind laut, frech und wachsamer als jeder Hund."
    ],
    brauch: "Jeder Reisende erhält bei der Ankunft einen Becher warmer Milch. Wer ihn annimmt, steht unter dem Gastrecht des Hauses. Wer aufbricht, wirft ein Stück Brot ins Feuer, damit der Herd ihn auf der Reise nicht vergisst.",
    stempel: "Eine Gans im Kreis, in roter Farbe. Die Wirtin drückt ihn selbst ins Büchlein, nach dem ersten Becher Milch und nicht vorher.",
    dienste: "Gastsegen, Schlichtung von Streit unter Gästen, Unterkunft für Bedürftige im Stroh über dem Stall.",
    geweihte: "Keine ständige Geweihte. Die Wirtin Travine Holler hütet Feuer und Brauch als Laiendienerin. Einmal im Mond kommt ein Travia-Geweihter aus Gareth.",
    spannung: "Die Travia-Kirche möchte eine eigene Geweihte nach Nattersquell schicken, damit die erste Station des Raulswegs nicht von einer Wirtin geführt wird. Die Wirtin will davon nichts hören.",
    meister: "Der Streit ist ehrlich gemeint auf beiden Seiten und hat nichts mit den anderen Problemen am Weg zu tun. Er eignet sich als ruhiger Einstieg: Wer vermittelt, gewinnt die Gunst der Wirtin und einen Ruf als gerechter Gast."
  },
  {
    id: "esse-hartsteen", station: "hartsteen", gottheit: "Ingerimm",
    name: "Gildenesse zu Hartsteen", begriffe: ["Gildenesse"],
    art: "Tempel", zustand: "fertig",
    kurz: "Der alte Ingerimm-Tempel der Steinmetzgilde, in die Felswand des ersten Steinbruchs gehauen und mit der Pfalz zum Stationstempel erklärt.",
    beschreibung: [
      "Die Gildenesse ist älter als die Stadtmauer. Ein Gewölbe im Fels, an dessen Ende eine ewige Glut in einer steinernen Esse brennt. Davor steht ein Amboss, auf dem jeder neue Meister der Gilde seinen ersten Schlag tut.",
      "Für den Raulsweg wurde der Eingang mit einem neuen Portal aus Hartsteiner Stein geschmückt, auf dem Hammer und Amboss prangen. Die Gilde hat es bezahlt und lässt das jeden wissen."
    ],
    brauch: "Reisende schlagen beim Aufbruch einmal mit dem Tempelhammer auf den Amboss. Ein reiner Klang verheißt eine gute Reise, ein dumpfer Klang eine beschwerliche. Die Steinmetze hören genau hin und lachen gern.",
    stempel: "Hammer über Amboss, eingeprägt mit einem kleinen eisernen Stempel, der in der Glut angewärmt wird. Das Papier riecht danach nach Rauch.",
    dienste: "Segen für Werkzeug und Wagenachsen, Weihe von Grundsteinen, Prüfung von Gewichten und Maßen.",
    geweihte: "Der Ingerimm-Geweihte Arbogast Esser, ein wortkarger alter Mann mit Brandnarben an den Unterarmen.",
    spannung: "Die Gilde betrachtet den Tempel als ihr Eigentum, der Geweihte betrachtet die Gilde als seine Gemeinde. Seit dem Bau der Pfalz ist nicht mehr klar, wer wem Rechenschaft schuldet.",
    meister: "Arbogast prüft die Gewichte der Gilde und hat bemerkt, dass etwas nicht stimmt. Er schweigt aus Loyalität zur Gilde, aber sein Gewissen nagt.",
    moeglichkeiten: [
      "Die Quader für die Pfalz sind leichter, als die Abrechnungen behaupten, weil weniger Stein verbaut wurde.",
      "Nicht die Steine sind falsch, sondern die Gewichte: Jemand hat die geweihten Eichgewichte der Esse ausgetauscht, und Arbogast fürchtet, man werde ihn verdächtigen.",
      "Arbogast irrt: Der Stein aus einem neuen Bruch ist einfach leichter. Bremst ihn niemand, wird er zum Ankläger in einer Sache, die es nicht gibt."
    ]
  },
  {
    id: "sonnenhalle-sonnenfeld", station: "sonnenfeld", gottheit: "Praios",
    name: "Sonnenhalle", begriffe: [],
    art: "Halle", zustand: "rohbau",
    kurz: "Die geplante Gerichtshalle der Pfalz, in der die Kaiserin Recht sprechen soll. Bisher stehen nur das Portal mit der goldenen Sonnenscheibe und ein Altar im Zelt.",
    beschreibung: [
      "Die Sonnenhalle soll das Herz der Pfalz werden: eine hohe, lichte Halle, deren Fenster so ausgerichtet sind, dass das Licht der Mittagssonne genau auf den Richterstuhl fällt. Die Praios-Kirche hat auf diese Ausrichtung bestanden.",
      "Bis zur Fertigstellung steht der Altar in einem weißen Zelt neben der Baustelle. Jeden Mittag versammelt der Geweihte die Arbeiter zu einem kurzen Gebet, und jeden Mittag fehlen ein paar mehr."
    ],
    brauch: "Wer Recht sucht oder einen Eid leisten will, tut es hier zur Mittagsstunde, das Gesicht zur Sonne. Reisende neigen beim Durchschreiten des Portals den Kopf.",
    stempel: "Eine goldene Sonnenscheibe, mit echter Goldfarbe aufgetragen. Er wird nur zur Mittagszeit vergeben, und nur an Reisende, die zuvor das Gebet mitgesprochen haben.",
    dienste: "Eidesleistung, Beglaubigung von Urkunden, künftig Gerichtstage der Kaiserin.",
    geweihte: "Der Praios-Geweihte Lumian von Feldbach, jung, ehrgeizig und von seiner Aufgabe überzeugt.",
    spannung: "Die vorgeschriebene Ausrichtung zur Sonne hat die Pfalz an die feuchteste Stelle des Baugrunds gerückt. Die Kirche will davon nichts wissen, die Bauleute fluchen leise.",
    meister: "Die Ausrichtung der Sonnenhalle hat beim Bau der Pfalz eine Rolle gespielt.",
    moeglichkeiten: [
      "Hier liegt der eigentliche Grund für den Planungsfehler des Wegemeisters: Er hat der Kirche nachgegeben statt der Baumeisterin. Lumian weiß das nicht. Erfährt er es, muss er zwischen der Ehre seiner Kirche und der Wahrheit wählen.",
      "Lumian selbst hat auf der Ausrichtung bestanden und kennt die Folgen. Er betet um Vergebung und hofft, dass niemand fragt.",
      "Die Ausrichtung hat mit den Problemen der Baustelle nichts zu tun. Lumian wird trotzdem bald verdächtigt, weil ein Spottvers am Kreuz es behauptet."
    ]
  },
  {
    id: "fuchsschrein-kreuz", station: "rommilyser-kreuz", gottheit: "Phex",
    name: "Fuchsschrein am Kreuz", begriffe: ["Fuchsschrein"],
    art: "Schrein", zustand: "fertig",
    kurz: "Ein kleiner, uralter Steinschrein an der Wegkreuzung, viel älter als die Station, die um ihn herum gebaut wird.",
    beschreibung: [
      "Der Fuchsschrein ist kaum mehr als ein mannshoher Stein mit einer Nische, in der ein geschnitzter Fuchs unter einer silbernen Mondsichel sitzt. Händler opfern hier seit Generationen, bevor sie sich für eine Richtung entscheiden.",
      "Die Kanzlei hätte den Schrein gern versetzt, um Platz für das Stationshaus zu schaffen. Das Haus steht nun schief, damit der Stein bleiben kann."
    ],
    brauch: "Wer vorbeikommt, legt eine Münze in die Schale und nimmt eine andere heraus. Wer mehr nimmt, als er gibt, hat Glück im Handel, sagt man, bis Phex die Rechnung stellt.",
    stempel: "Fuchs und Mond, in silbergrauer Tinte. Er wird nur nach Sonnenuntergang vergeben, denn Phex ist ein Gott der Nacht. Wer am Tag danach fragt, bekommt ein Lächeln.",
    dienste: "Segen für Geschäfte, Rat in Handelsfragen, Verwahrung von Briefen bis zur Abholung, ohne Fragen.",
    geweihte: "Die Schreinhüterin Ysilda Graumann.",
    spannung: "Der Schrein steht der Station im Weg, im wörtlichen und im übertragenen Sinn. Die Kanzlei hält ihn für ein Hindernis, die Händler für einen Grund, an der Kreuzung zu halten.",
    meister: "Im Schrein werden Briefe verwahrt, und Ysilda weiß, wer sie bringt und wer sie holt.",
    moeglichkeiten: [
      "Die Briefe sind ein stiller Umschlagplatz für Nachrichten, die nicht über die Relais laufen sollen. Ysilda liest sie nicht.",
      "Im Schrein liegen vor allem Wettscheine: Am Kreuz wird heimlich auf die Fertigstellung der Stationen gewettet, und manche Wettende helfen dem Ergebnis nach.",
      "Ysilda liest die Briefe doch, aber nur, um die besten Geschichten in Verse zu verwandeln. Wer sich in einem Spottvers wiedererkennt, wird bald fragen, woher sie das weiß."
    ]
  },
  {
    id: "loewenkapelle-hohenstein", station: "feste-hohenstein", gottheit: "Rondra",
    name: "Löwenkapelle der Feste", begriffe: ["Löwenkapelle"],
    art: "Kapelle", zustand: "erweiterung",
    kurz: "Die alte Garnisonskapelle der Feste, mit den Schwertern gefallener Verteidiger an den Wänden. Wird für den Raulsweg vergrößert.",
    beschreibung: [
      "Die Löwenkapelle liegt im Innenhof der Feste. An ihren Wänden hängen die Schwerter von Verteidigern, die in vergangenen Kämpfen am Pass gefallen sind, jedes mit einem Namen und einer Jahreszahl.",
      "Mit dem Ausbau zur Stationsfeste wird die Kapelle um eine Vorhalle erweitert, damit auch Reisende sie betreten können, ohne den Wehrhof zu durchqueren."
    ],
    brauch: "Wer Waffen trägt, meldet sie in der Kapelle an und lässt sie segnen. Wer eine Waffe verschweigt und erwischt wird, verliert sie an die Wand.",
    stempel: "Ein Löwenkopf, in roter Farbe. Er wird erst vergeben, wenn der Reisende die Kontrolle am Tor durchlaufen hat, und gilt deshalb unter Händlern als Passierschein zweiter Klasse.",
    dienste: "Waffensegen, Zweikampfaufsicht, Schwüre vor Zeugen, Totengedenken für Gefallene am Weg.",
    geweihte: "Die Rondra-Geweihte Ardane Kaltenbach, eine Schwertschwester mit grauem Zopf und einer Stimme wie ein Befehl.",
    spannung: "Ardane hält die Kontrollen am Tor für eines Rondra-Hauses unwürdig: Eine Feste soll das Land schützen, nicht Reisende schikanieren. Sie streitet darüber offen mit der Torhauptfrau.",
    meister: "Ardane und Walburga Steinhauer achten sich trotz ihres Streits. Wer beide an einen Tisch bringt und ihnen erklärt, wonach die Kanzlei wirklich sucht, kann aus zwei Gegnerinnen zwei Verbündete machen."
  },
  {
    id: "efferdstein-natter", station: "natterbruecke", gottheit: "Efferd",
    name: "Efferdstein an der Furt", begriffe: ["Efferdstein"],
    art: "Schrein", zustand: "rohbau",
    kurz: "Ein uralter Stein mit eingeritzten Wellen am Ufer. In den Pfeiler der neuen Brücke soll eine Efferdnische gebaut werden, doch die ist so unfertig wie die Brücke.",
    beschreibung: [
      "Am Ufer der Natter steht ein grauer Stein, über und über mit Wellenlinien bedeckt, von denen niemand weiß, wer sie geritzt hat. Die Flussträger berühren ihn vor jeder Überquerung.",
      "Die Kanzlei hat eine Efferdnische im mittleren Brückenpfeiler geplant, mit einem Delfin aus Bronze. Der Pfeiler steht. Die Nische ist ein leeres Loch im Stein."
    ],
    brauch: "Vor der Überquerung wirft man einen Kiesel oder eine kleine Münze in den Fluss und spricht die Bitte der Träger: »Trag mich, wie sie mich tragen.« Wer das vergisst, wird von den Trägern daran erinnert, und zwar mitten im Fluss.",
    stempel: "Welle und Delfin, in blauer Farbe, mit Flusswasser angerührt. Ihn vergibt die Älteste der Träger, nachdem man sicher drüben angekommen ist.",
    dienste: "Segen für die Überquerung, Wetterkunde und Wasserstand, Totenwache für Ertrunkene.",
    geweihte: "Keine Geweihten. Die Bräuche hüten die Flussträger unter ihrer Ältesten Bruna Lehmkuhl.",
    spannung: "Unter den Trägern geht die Rede, dass eine Brücke den Fluss fesselt und Efferd erzürnt. Was als Aberglaube beginnt, wird zur handfesten Begründung, den Bau zu bremsen.",
    meister: "Ob Efferd wirklich zürnt, bleibt offen. Ein Efferd-Geweihter aus Perricum, der die Brücke segnet und den Trägern eine Rolle im Brückenbrauch gibt, könnte den Streit entschärfen. Das kostet allerdings Geld, Zeit und einen Fürsprecher bei der Kirche."
  },
  {
    id: "schreibstube-mardramund", station: "mardramund", gottheit: "Hesinde",
    name: "Hesindestube der Kanzlei", begriffe: ["Hesindestube"],
    art: "Kapelle", zustand: "erweiterung",
    kurz: "Eine stille Kapelle im Herzen der neuen Kanzlei, in der Leumundsbriefe beeidet und Register gesegnet werden.",
    beschreibung: [
      "Die Hesindestube liegt zwischen Schreibsaal und Archiv. Ein grünes Fenster lässt gedämpftes Licht auf ein Lesepult fallen, auf dem ein aufgeschlagenes Buch mit leeren Seiten liegt, das Sinnbild der Göttin für das noch nicht Gewusste.",
      "Der Anbau des Archivs soll die Kapelle umschließen, sodass man künftig nur durch sie hindurch zu den Registern gelangt. Die Kirche hält das für angemessen, der Kanzleivorsteher für unpraktisch."
    ],
    brauch: "Wer einen Leumundsbrief beantragt, schwört an diesem Pult bei Hesinde, wahrheitsgemäß geantwortet zu haben. Schreiber berühren das leere Buch, bevor sie ihre Arbeit beginnen.",
    stempel: "Eine Schlange, die sich um einen Federkiel windet, in grüner Tinte. Er wird mit einem Satz vergeben, den der Reisende selbst ins Büchlein schreiben muss: etwas, das er auf der Reise gelernt hat.",
    dienste: "Eidesabnahme, Beglaubigung von Abschriften, Lesen und Schreiben für Reisende, die es nicht können.",
    geweihte: "Die Hesinde-Geweihte Ilmenia Sterz, Archivarin der Kanzlei, kurzsichtig, genau und unbeirrbar.",
    spannung: "Wem gehört das Archiv: der Kanzlei, die es bezahlt, oder der Kirche, die es hütet? Ilmenia und der Kanzleivorsteher führen darüber einen höflichen, aber erbitterten Kleinkrieg.",
    meister: "Wer Ilmenia hilft, ihre Sorge aufzuklären, gewinnt Zugang zum Archiv, den sonst niemand bekommt.",
    moeglichkeiten: [
      "Ilmenia hat bemerkt, dass manche Leumundsbriefe ohne Eid an ihrem Pult ausgestellt wurden. Für sie ist das ein Frevel.",
      "Ilmenia hat selbst einmal einen Eid erlassen, für einen Freund in Not, und fürchtet nun jede Prüfung des Archivs.",
      "Die Eidbücher sind vollständig, aber eine Seite wurde herausgeschnitten. Ilmenia sucht den Täter unter den Schreibern."
    ]
  },
  {
    id: "jaegerschrein-wandleth", station: "wandlether-hof", gottheit: "Firun",
    name: "Jägerschrein im Tann", begriffe: ["Jägerschrein"],
    art: "Schrein", zustand: "rohbau",
    kurz: "Ein Schrein aus Baumstämmen und einem Bärenschädel, ein Stück abseits der Palisade im Wald. Der neue Steinsockel für die Station ist erst halb gesetzt.",
    beschreibung: [
      "Der Jägerschrein steht auf einer kleinen Lichtung hinter dem Hof: drei aufrechte Stämme, darüber ein Bärenschädel, im Winter mit Eiszapfen behängt. Jäger lassen hier einen Teil ihrer Beute zurück.",
      "Die Kanzlei hat einen steinernen Schrein innerhalb der Palisade bestellt, damit Reisende nicht in den Wald müssen. Der Sockel ist gesetzt, der Rest fehlt. Die meisten gehen trotzdem in den Wald."
    ],
    brauch: "Wer den Wald durchquert, hängt ein Stück Fell, Federn oder ein Büschel Haar an die Stämme. Wer jagt, lässt das Herz der ersten Beute zurück. Wer wildert, sagt man, findet den Weg zurück nicht.",
    stempel: "Ein Bär unter einem Eiskristall, in schwarzer Farbe aus Holzkohle. Er liegt in einer Holzkiste am Schrein, und jeder stempelt selbst.",
    dienste: "Jagdsegen, Spurenlesen gegen Gabe, Schutzzeichen für die Nachtreise.",
    geweihte: "Kein ständiger Geweihter. Ab und zu taucht ein schweigsamer Firun-Geweihter auf, den die Leute nur den Grauen Jäger nennen.",
    spannung: "Firuns Gebot verlangt ehrliche Jagd. Ausgerechnet der Wachhauptmann jagt im Schutzwald der Station, und eine Wilderin opfert hier regelmäßiger als er.",
    meister: "Der Graue Jäger ist der einzige, dem die Köhlerin Rauke vertraut. Taucht er auf, während die Helden am Hof sind, kann er ihnen den Zugang zu ihr verschaffen, wenn sie ihm beweisen, dass sie Firuns Gebote achten."
  },
  {
    id: "tsahaus-wasserburg", station: "wasserburg", gottheit: "Tsa",
    name: "Tsahaus im Burggarten", begriffe: ["Tsahaus"],
    art: "Tempel", zustand: "erweiterung",
    kurz: "Ein bunter kleiner Tempel im Garten der Wasserburg, der für das große Weihefest der Station neu bemalt und um einen Festhof erweitert wird.",
    beschreibung: [
      "Das Tsahaus ist ein runder Bau mit einem Dach aus bunten Schindeln, jede in einer anderen Farbe. Im Inneren gibt es keinen festen Altar, sondern eine Wand, die jedes Jahr neu bemalt wird, von Kindern, Gästen und Geweihten zugleich.",
      "Für die Stationsweihe wird ein Festhof mit Laubengängen angelegt, in dem Gaukler auftreten und Händler ihre Stände aufschlagen dürfen. Das Geld dafür kam als Spende, sehr großzügig und sehr kurzfristig."
    ],
    brauch: "Reisende knüpfen ein Band ihrer Wahl an die Lauben und nehmen ein anderes mit, als Zeichen, dass jede Reise etwas Neues beginnt. Wer das Band bis Perricum trägt, darf sich dort etwas wünschen.",
    stempel: "Eine Eidechse in sieben Farben. Jeder Stempel ist anders, denn die Kinder des Ortes malen ihn mit dem Pinsel ins Büchlein.",
    dienste: "Segen für Neubeginn, Namensgebung, Feste, Zuflucht für alle, die neu anfangen müssen.",
    geweihte: "Die Tsa-Geweihte Mutter Iselind.",
    spannung: "Das Weihefest soll ein Fest der Erneuerung sein. Wer es bezahlt hat und warum, weiß kaum jemand.",
    meister: "Für das Fest ist eine große Spende eingegangen, und ihre Herkunft ist heikel.",
    moeglichkeiten: [
      "Die Spende stammt von einem der neuen Kontore. Iselind sucht einen Weg, sie zurückzugeben, ohne das Fest abzusagen. Helden, die eine andere Geldquelle finden oder die Herkunft offenlegen, gewinnen eine dankbare Verbündete.",
      "Die Spende stammt aus Rommilys. Haus Rabenmund will zeigen, dass es großzügiger ist als die Kanzlei, und plant, das beim Fest öffentlich zu machen.",
      "Die Spende ist ehrlich gemeint und anonym. Gerade weil niemand weiß, woher sie kommt, wuchern Gerüchte, die das Fest zu sprengen drohen."
    ]
  },
  {
    id: "storchenhaus-gnitzenkuhl", station: "gnitzenkuhl", gottheit: "Peraine",
    name: "Storchenhaus", begriffe: [],
    art: "Tempel", zustand: "erweiterung",
    kurz: "Heilerstation, Kräutergarten und Tempel in einem. Das einzige Haus am Raulsweg, das jeder Reisende ohne Ausnahme zu schätzen weiß.",
    beschreibung: [
      "Das Storchenhaus steht auf hohen Pfählen am Rand des Sumpfes. Unten liegen Kräutergarten und Trockenböden, oben die Krankenstube mit acht Betten und ein kleiner Altar mit Storch und Ähre. Auf dem Dach nistet ein echter Storch.",
      "Mit dem Raulsweg wurde die Krankenstube erweitert, weil immer mehr Bauarbeiter mit Sumpffieber kommen. Die Betten reichen trotzdem nicht."
    ],
    brauch: "Reisende erhalten ein Säckchen mit Gnitzensalbe gegen die Mücken und lassen dafür eine Gabe zurück, Geld, Brot oder eine Stunde Arbeit im Kräutergarten.",
    stempel: "Ein Storch auf einem Bein, in grüner Farbe aus Kräutersaft. Wer eine Stunde im Garten hilft, bekommt einen goldgerandeten.",
    dienste: "Heilung, Fieberkräuter, Wundversorgung, Rat bei Krankheit von Mensch und Tier.",
    geweihte: "Der Peraine-Geweihte Bruder Hilbert, unterstützt von zwei Novizinnen und jedem, der mit anpackt.",
    spannung: "Die Heiler sind auf Lieferungen über die Station angewiesen. Wenn diese ausbleiben oder verdorben sind, sterben Menschen.",
    meister: "Das Storchenhaus ist ein moralischer Anker der Reise. Hilfe hier kostet nichts außer Zeit und bringt doch viel: Vertrauen, Zeugen und Hinweise auf die verdorbene Lieferung."
  },
  {
    id: "gedenkkapelle-gaulsfurt", station: "gaulsfurt", gottheit: "Boron",
    name: "Gedenkkapelle am Feld", begriffe: ["Gedenkkapelle"],
    art: "Kapelle", zustand: "erweiterung",
    kurz: "Eine schlichte Kapelle aus dunklem Stein am Rand des Schlachtfelds von 1039 BF, neben dem Gedenkstein mit dem zerbrochenen Rad.",
    beschreibung: [
      "Die Gedenkkapelle ist der stillste Ort des Raulswegs. Ein einziger Raum, ohne Fenster, nur von einer Öllampe erhellt. An den Wänden stehen die Namen derer, die an der Gaulsfurt gefallen sind, soweit man sie kennt.",
      "Für die Station wird ein Vorhof angelegt, in dem Reisende rasten können, ohne die Stille im Inneren zu stören. In Gaulsfurt selbst gibt es seit langem einen Phex-Tempel, und in der Nähe liegt das Heiligtum Raschia'Hal. Die Kapelle ist der erste Boron-Ort der Siedlung."
    ],
    brauch: "Wer vorbeikommt, legt einen Stein auf das Feld. Gesprochen wird in der Kapelle nicht. Auch Händler, die sonst lärmen, gehen an ihr leise vorbei.",
    stempel: "Ein zerbrochenes Rad, in schwarzer Farbe. Er wird schweigend vergeben, und wer dabei spricht, bekommt ihn nicht.",
    dienste: "Totengedenken, Bestattung von Reisenden, die unterwegs sterben, Schweigeeide.",
    geweihte: "Der Boron-Geweihte Bruder Anselm Kolk, der seit Jahren kein Wort mehr gesprochen hat und mit einer Schiefertafel antwortet.",
    spannung: "Händler und die Zöllner von Perricum möchten am Rand des Feldes Lagerhäuser bauen. Für die Boron-Kirche ist das Feld ein Grab.",
    meister: "Bruder Anselm schreibt auf, wer wann an der Furt vorbeizieht, als Teil seines Totenbuchs für alle, die unterwegs sterben könnten. Seine Tafeln und Bücher sind ungewollt das genaueste Reiseregister der Strecke."
  },
  {
    id: "rosenhaus-rabicum", station: "rabicum", gottheit: "Rahja",
    name: "Rosenhaus", begriffe: [],
    art: "Tempel", zustand: "fertig",
    kurz: "Ein kleiner Rahja-Tempel inmitten der Weinberge, mit einem Altar unter freiem Himmel und einem Keller voller Wein.",
    beschreibung: [
      "Das Rosenhaus ist ein offener Säulengang, von Kletterrosen überwachsen, in dessen Mitte ein Altar aus rotem Stein steht. Hier beginnt jedes Weinfest mit dem ersten Becher für die Göttin.",
      "Unter dem Tempel liegt ein alter Weinkeller, der dem Tempel gehört. Seit einiger Zeit ist er verpachtet."
    ],
    brauch: "Der erste Schluck jedes Bechers gehört der Göttin und wird auf den Boden gegossen. Paare, die sich auf dem Raulsweg kennengelernt haben, binden eine Rose an den Säulengang.",
    stempel: "Eine Rose in tiefem Rot, mit Wein angerührt. Er wird nur beim Fest vergeben oder nach einem Lied, das der Reisende dem Tempel singt.",
    dienste: "Segen für Paare, Weinweihe, Feste, Trost für Kummer aller Art.",
    geweihte: "Die Rahja-Geweihte Liebwin Rosenhag, die das Rosenhaus gemeinsam mit der Stationswirtin Rahjalind Weinhold betreibt.",
    spannung: "Der Keller unter dem Tempel ist an einen Fremden verpachtet, der dort niemanden hineinlässt. Die Geweihte findet, ein Rahja-Keller sei für Freude da, nicht für Geheimnisse.",
    meister: "Um den gepachteten Weinkeller gibt es Streit, und Liebwin wartet auf einen Anlass, sich einzumischen. Wer ihr diesen Anlass liefert, erhält Zugang zum Keller.",
    moeglichkeiten: [
      "Die Wirtin hat den Keller ohne Rücksprache mit der Geweihten verpachtet. Liebwin will den Vertrag anfechten.",
      "Liebwin hat dem Pächter den Keller selbst vermittelt, weil er großzügig für den Tempel gespendet hat. Jetzt bereut sie es.",
      "Der Pachtvertrag ist sauber, aber im Keller steht ein alter Rahja-Schrein, der nie entweiht wurde. Liebwin will ihn zurück, egal wer der Pächter ist."
    ]
  }
];
