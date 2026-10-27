/* ==========================================================
   Stationen des Raulswegs
   ----------------------------------------------------------
   Felder:
   id, nr, name, typ ("stadt" | "station"), gottheit, emblem,
   meile (ab Gareth), etappe (ab vorigem Halt), schaetzung (true = Entfernung geschätzt),
   status ("fertig" | "erweiterung" | "rohbau"), kanon (Ort existiert in offiziellen Quellen),
   bild (Dateiname ohne Endung in img/stationen/), jahreszeit,
   kurz, beschreibung [Absätze], vorlesetext [Absätze], geruechte [], konflikt,
   meister { hintergrund },
   figuren [] (Stufe 2), gebaeude [] (Stufe 3)
   ========================================================== */

window.RW = window.RW || {};

RW.stationen = [
  {
    id: "gareth", nr: 0, name: "Gareth", typ: "stadt",
    meile: 0, etappe: null, schaetzung: false, kanon: true,
    kurz: "Kaiserstadt, Ausgangspunkt des Raulswegs. Hier beginnt die Straße am Osttor, wo seit dem Edikt ein neuer Meilenstein mit der Null steht.",
    beschreibung: [
      "Die größte Stadt Aventuriens ist Sitz der Kaiserin, des Haupthauses der Beilunker Reiter und zahlloser Handelshäuser. Wer den Raulsweg bereist, bricht hier auf, meist mit einem Geleitbrief der Kanzlei in der Tasche.",
      "In Gareth spricht man stolz vom Raulsweg, benannt nach dem Reichsgründer Raul. Dass die Straße die Hauptstadt enger mit dem Perlenmeer verbindet, gilt hier als Zeichen einer neuen, tatkräftigen Zeit."
    ]
  },
  {
    id: "nattersquell", nr: 1, name: "Nattersquell", typ: "station",
    gottheit: "Travia", emblem: "Gans",
    meile: 34, etappe: 34, schaetzung: true,
    status: "fertig", kanon: true, bild: "01-nattersquell", jahreszeit: "Frühmorgen",
    kurz: "Die erste Rast vor den Toren Gareths. Fertig, gastfreundlich und stolz darauf, die erste geweihte Station des Edikts zu sein.",
    beschreibung: [
      "Nattersquell liegt einen guten Tagesmarsch östlich von Gareth an einer Quelle, die der Natter zufließt. Für Eilige ist es kaum mehr als ein Brunnen am Wegrand, für den reisenden Hof aber die traditionelle erste Nacht: Wer hier übernachtet, ist offiziell aufgebrochen.",
      "Die Station wurde als Erste fertiggestellt und der Travia geweiht. Ihr großer Herd brennt Tag und Nacht, und die Stationswirtin achtet streng darauf, dass jeder Gast, ob Bettler oder Baron, zuerst einen Becher warmer Milch erhält. Das Gastrecht von Nattersquell ist sprichwörtlich geworden: Wer hier Streit sucht, bekommt es mit dem ganzen Dorf zu tun."
    ],
    vorlesetext: [
      "Der Morgennebel liegt noch über den Wiesen, als ihr die ersten Dächer von Nattersquell erreicht. Aus der offenen Tür der Stationsherberge fällt der Schein eines Herdfeuers auf die neu gepflasterte Straße, und es riecht nach Rauch, nach Brot und nach nassem Gras. Am steinernen Brunnen, in den eine Gans gemeißelt ist, schöpfen zwei Mägde Wasser, während ein Knecht die Pferde einer Kutsche anschirrt, deren Wappen ihr nicht kennt. Hinter euch, schon fern, glänzen die Dächer Gareths in der ersten Sonne. Vor euch liegt die Straße, gerade und hell, als wüsste sie genau, wohin sie will."
    ],
    geruechte: [
      "Die Wirtin soll einmal einen Grafen vor die Tür gesetzt haben, weil er ihren Knecht geschlagen hat. Die Kanzlei hat ihr dafür einen Dankesbrief geschrieben.",
      "Seit die Station fertig ist, kommen mehr Reisende als je zuvor. Die alten Gasthäuser im Dorf haben Mühe, Gäste zu finden, und mancher Wirt redet nicht gut über die Kaiserin.",
      "Die Quelle der Natter soll im Frühjahr nach Rosen duften. Wer davon trinkt, kommt sicher an."
    ],
    konflikt: "Die neue Stationsherberge zieht die Gäste aus den alten Wirtshäusern des Dorfes ab. Die Wirte fühlen sich übergangen und fragen sich, wer eigentlich entschieden hat, wer die Pacht bekommt.",
    meister: {
      hintergrund: "Nattersquell ist die Vorzeigestation, an der die Kanzlei zeigt, wie der Raulsweg sein soll. Gerade deshalb fällt hier jede Unregelmäßigkeit doppelt auf. Die Frage, wer die Pachten der Stationsherbergen vergibt und zu welchem Preis, zieht sich über die ganze Strecke."
    },
    figuren: [], gebaeude: []
  },
  {
    id: "hartsteen", nr: 2, name: "Hartsteen", typ: "station",
    gottheit: "Ingerimm", emblem: "Hammer und Amboss",
    meile: 62, etappe: 28, schaetzung: false,
    status: "fertig", kanon: true, bild: "02-hartsteen", jahreszeit: "Mittag",
    kurz: "Selbstbewusste Reichsstadt mit Grafenburg und Steinbrüchen. Liefert den Stein für halb den Raulsweg.",
    beschreibung: [
      "Hartsteen ist die erste große Stadt am Weg und stolz darauf, eine Reichsstadt zu sein, die keinem Grafen und keinem Fürsten untersteht, sondern unmittelbar dem Reich. Die Burg über der Stadt und die Steinbrüche in den Hängen prägen das Bild.",
      "Die Kaiserpfalz am Stadttor ist bereits fertig, und sie ist größer, als sie sein müsste. Die Steinmetzgilde von Hartsteen hat für den Bau einen guten Preis bekommen und liefert seither Quader, Meilensteine und Brückenpfeiler die ganze Straße hinunter. Ochsenkarren mit behauenen Blöcken gehören hier zum Straßenbild."
    ],
    vorlesetext: [
      "Schon von Weitem hört ihr Hartsteen, bevor ihr es seht: das helle Klingen von Meißeln, das Knarren schwer beladener Karren, das Rufen der Ochsentreiber. Dann öffnet sich das Tal, und die Stadt liegt vor euch, eng um ihren Hügel gedrängt, darüber die graue Burg. Die Hänge ringsum sind aufgerissen wie Wunden, und überall leuchtet frisch gebrochener Stein in der Mittagssonne. Am Stadttor erhebt sich die neue Kaiserpfalz, ein wenig zu prächtig für ihren Zweck, und die Banner über ihrem Portal sind so neu, dass ihre Farben noch glänzen."
    ],
    geruechte: [
      "Die Steinmetzgilde hat für die Pfalz mehr Stein abgerechnet, als in ihr verbaut ist. Wo der Rest geblieben ist, weiß keiner.",
      "Ein Händler aus Rommilys hat versucht, Stein aus einem anderen Bruch anzubieten, billiger und genauso gut. Sein Wagen ist in der Nacht darauf umgestürzt.",
      "In einem der alten Brüche soll man beim Sprengen auf Mauerwerk gestoßen sein, das älter ist als die Stadt."
    ],
    konflikt: "Hartsteen verdient am Raulsweg wie kein anderer Ort. Die Gilde will das Liefermonopol für Stein behalten, und Konkurrenz ist nicht willkommen, egal aus welcher Richtung.",
    meister: {
      hintergrund: "Hier ist zu sehen, wie man am Bau der Straße reich wird, ohne etwas Verbotenes zu tun. Ob die Abrechnungen der Gilde sauber sind, ist eine offene Frage, die die Kanzlei gern beantwortet hätte."
    },
    figuren: [], gebaeude: []
  },
  {
    id: "sonnenfeld", nr: 3, name: "Sonnenfeld", typ: "station",
    gottheit: "Praios", emblem: "Sonnenscheibe",
    meile: 86, etappe: 24, schaetzung: true,
    status: "rohbau", kanon: false, bild: "03-sonnenfeld", jahreszeit: "Spätsommer",
    kurz: "Die künftige Hoftagspfalz der Kaiserin, mitten in den Weizenfeldern. Halb fertig, hoch ambitioniert und hinter dem Zeitplan.",
    beschreibung: [
      "Sonnenfeld gab es vor dem Edikt nicht. Die Kanzlei hat den Ort an einer Stelle gewählt, an der sich der Raulsweg durch offene, fruchtbare Felder zieht, und plant hier eine große Kaiserpfalz, in der Rohaja auf ihren Reisen Gericht halten und Hoftage abhalten kann.",
      "Noch ist Sonnenfeld eine riesige Baustelle mit Gerüsten, Tretradkränen und Bauhütten. Über dem fertigen Hauptportal prangt bereits die goldene Sonnenscheibe, dahinter stehen kaum die Mauern. Ein erster Hoftag ist angekündigt, und jeder weiß, dass der Termin wackelt."
    ],
    vorlesetext: [
      "Die Weizenfelder stehen hoch und golden zu beiden Seiten der Straße, und mittendrin wächst etwas, das wie ein Palast aussehen will. Weiße Mauern ragen halb fertig aus dem Feld, umgeben von einem Wald aus Gerüsten, auf denen Arbeiter wie Ameisen klettern. Ein Kran mit einem riesigen Tretrad hebt quietschend einen Quader in die Höhe. Über dem einzigen fertigen Tor glänzt eine goldene Sonnenscheibe so hell, dass ihr blinzeln müsst. Davor stehen bunte Zelte, an denen Diener schon Banner für ein Fest aufhängen, das noch niemand zu feiern wagt."
    ],
    geruechte: [
      "Der Wegemeister schläft kaum noch. Er soll gesagt haben, er sei für jede Verzögerung verantwortlich, aber für keinen einzigen Fehler.",
      "Nachts verschwinden Werkzeuge und Holz von der Baustelle. Die Wachen schwören, niemand sei vorbeigekommen.",
      "Ein Bauer, dessen Felder für die Pfalz genommen wurden, wartet noch immer auf seine Entschädigung."
    ],
    konflikt: "Sonnenfeld soll ein Prunkstück werden, aber Geld, Material und Zeit reichen nicht. Jeder Fehler wird hier sichtbar, und der kaiserliche Wegemeister braucht dringend einen Schuldigen.",
    meister: {
      hintergrund: "Die Baustelle ist ein guter Ort, um zu zeigen, dass auf dem Raulsweg viel gleichzeitig schiefläuft. Was davon Sabotage ist, was Diebstahl und was Fehlplanung, entscheidet jede Spielleitung für ihre Geschichte. Die Figuren vor Ort bieten dafür mehrere Möglichkeiten, und nicht alles muss dieselbe Ursache haben."
    },
    figuren: [], gebaeude: []
  },
  {
    id: "rommilyser-kreuz", nr: 4, name: "Rommilyser Kreuz", typ: "station",
    gottheit: "Phex", emblem: "Fuchs und Mond",
    meile: 115, etappe: 29, schaetzung: true,
    status: "rohbau", kanon: false, bild: "04-rommilyser-kreuz", jahreszeit: "Herbstabend",
    kurz: "Die Wegkreuzung, an der die alte Straße nach Rommilys abzweigt. Ein Rohbau, eine verunstaltete Wegweisertafel und viel böses Blut.",
    beschreibung: [
      "Hier zweigt die Straße nach Rommilys ab. Früher war das die Hauptrichtung für alle, die nach Osten wollten, heute ist es nur noch eine Nebenstraße. Die Kanzlei hat bewusst entschieden, den Raulsweg nicht über Rommilys zu führen, sondern geradewegs nach Perricum.",
      "Die Station an der Kreuzung ist erst ein Rohbau. Der große Wegweiser zeigt die Richtungen an, doch der Arm nach Rommilys wird immer wieder übermalt, abgesägt oder mit Spottversen beschrieben. In Rommilys nennt man die neue Straße nur noch „Rohajas Rennbahn“."
    ],
    vorlesetext: [
      "Die Sonne steht schon tief, als ihr die Kreuzung erreicht. Ein Wegweiser, so groß wie ein Mann, wirft einen langen Schatten über die Straße. Sein Arm nach Osten trägt in frischen Lettern den Namen Perricum, der Arm nach Nordosten ist mit Farbe überpinselt, und jemand hat mit Kohle etwas daraufgeschrieben, das ihr lieber nicht laut vorlest. Dahinter steht ein halb gedecktes Haus mit nackten Dachsparren, aus denen der Wind pfeift. An einem kleinen Schrein mit einem Fuchs und einem Mond feilschen zwei Händler um einen Sack Nüsse, als hinge ihr Leben davon ab. Auf dem Hügel über der Kreuzung flattert ein schwarzer Wimpel."
    ],
    geruechte: [
      "Die Rabenmunds sollen eine Belohnung für jeden ausgesetzt haben, der beweist, dass der Raulsweg Geld verschwendet.",
      "Der Wegweiser wurde dreimal neu gestrichen. Beim vierten Mal stand am nächsten Morgen ein Vers über die Kaiserin darauf, und er reimte sich sogar.",
      "Händler aus Rommilys kommen kaum noch hierher. Wer es doch tut, zahlt angeblich unter der Hand weniger Wegezoll."
    ],
    konflikt: "Haus Rabenmund fühlt sich durch die Streckenführung gedemütigt. Die Kreuzung ist der Ort, an dem dieser Ärger am deutlichsten zu sehen ist, und an dem die Kanzlei ihren Verdacht gegen die Rabenmunds am liebsten bestätigt sähe.",
    meister: {
      hintergrund: "Der Spott und der offene Widerstand sind echt, aber Haus Rabenmund ist nicht einheitlich. Die meisten kämpfen mit Klagen, Spott und Zollstreit, nicht mit Sabotage. Gerade weil der Verdacht so naheliegt, ist er bequem für alle, die selbst etwas zu verbergen haben."
    },
    figuren: [], gebaeude: []
  },
  {
    id: "feste-hohenstein", nr: 5, name: "Feste Hohenstein", typ: "station", begriffe: ["Hohenstein"],
    gottheit: "Rondra", emblem: "Löwe",
    meile: 120, etappe: 5, schaetzung: false,
    status: "erweiterung", kanon: true, bild: "05-feste-hohenstein", jahreszeit: "Klarer Morgen",
    kurz: "Die alte Festung am Beginn des Darpatwegs, jetzt Kontrollposten des Raulswegs. Wer hier durchwill, braucht Papiere und Geduld.",
    beschreibung: [
      "An der Feste Hohenstein beginnt der Abschnitt, den man im Volksmund den Darpatweg nennt. Die alte Festung bewacht eine Enge, durch die sich die Straße zwängt, und die alte Rabenbrücke über die Natter gleich unterhalb. Sie war schon immer ein Ort, an dem man Reisende im Blick behielt. Der Raulsweg quert die Natter hier nicht mehr, sondern bleibt am Nordufer und erreicht den Fluss erst an der Natterbrücke wieder.",
      "Mit dem Edikt wurde Hohenstein zum wichtigsten Kontrollposten der Strecke ausgebaut. Die Wachen suchen besonders nach Schmuggelware, gefälschten Papieren und Baumaterial, das von den Baustellen verschwunden ist. Vor dem Tor bilden sich lange Schlangen, und wer keinen gültigen Geleitbrief oder Leumundsbrief vorweisen kann, wartet länger."
    ],
    vorlesetext: [
      "Die Straße wird enger, die Hänge rücken heran, und dann steht sie vor euch: die Feste Hohenstein, grau und breit, mit einem Löwen über dem Tor, der aussieht, als hätte er seit Jahrhunderten nicht geblinzelt. Vor dem Tor wartet eine lange Schlange aus Karren, Pilgern, Händlern und einem Viehtreiber, dessen Schafe sich an niemandes Ordnung halten. Gardisten in Rot und Gold öffnen Truhen, rollen Stoffballen auf und halten Briefe gegen das Licht. An einem Tisch im Torbogen sitzt ein Schreiber, taucht seine Feder ein, stempelt, schreibt, stempelt, und hebt nicht ein einziges Mal den Blick."
    ],
    geruechte: [
      "Die Gardisten suchen nach einem bestimmten Buch. Keiner sagt, welches, aber sie blättern in allem, was gebunden ist.",
      "Für einen Silbertaler im Hut des richtigen Wachmanns geht es schneller. Für zwei geht es gar nicht.",
      "Ein Händler wurde letzte Woche festgehalten, weil auf seinen Kisten das Siegel eines Handelshauses klebte, das niemand kannte. Die Kisten waren leer."
    ],
    konflikt: "Die strengen Kontrollen sollen den Raulsweg sauber halten, bremsen aber jeden Handel. Händler murren, Wachen werden bestechlich, und wer etwas verbergen will, sucht nach Wegen um die Feste herum.",
    meister: {
      hintergrund: "Hohenstein ist der Ort, an dem die Nervosität der Kanzlei für alle Reisenden spürbar wird. Was genau gesucht wird und warum, wissen die meisten Wachen selbst nicht. Ihre Anweisungen kommen direkt aus der Kanzlei."
    },
    figuren: [], gebaeude: []
  },
  {
    id: "natterbruecke", nr: 6, name: "Natterbrücke", typ: "station",
    gottheit: "Efferd", emblem: "Welle und Delfin",
    meile: 140, etappe: 20, schaetzung: true,
    status: "rohbau", kanon: false, bild: "06-natterbruecke", jahreszeit: "Regen",
    kurz: "Die alte Brücke über die Natter ist abgerissen, die neue noch nicht fertig. Bis dahin tragen Träger die Reisenden durchs Wasser.",
    beschreibung: [
      "Kurz bevor die Natter bei Hausen in den Darpat mündet, quert sie der Raulsweg. Der alte Weg führte über die schmale Rabenbrücke bei der Feste Hohenstein; die Kanzlei hat die neue Straße am Nordufer weitergeführt, weil das Tal hier breit genug für eine große Brücke ist. Die alte Holzbrücke der Fischer war zu schmal für Kutschen und wurde abgerissen. Die neue Steinbrücke steht noch auf Gerüsten.",
      "Bis zur Fertigstellung setzt eine Gilde von Flussträgern die Reisenden über. Fußgänger reiten auf ihren Schultern, Sänften und Gepäck werden auf Plattformen hinübergetragen, Wagen werden an Seilen durch die Furt gezogen. Nach starkem Regen schwillt die Natter an, und dann geht gar nichts mehr. Die Herberge am Ufer ist an solchen Tagen hoffnungslos überfüllt."
    ],
    vorlesetext: [
      "Der Regen fällt so dicht, dass die andere Uferseite nur noch ein grauer Schatten ist. Von der alten Brücke sind nur Stümpfe geblieben, die wie abgebrochene Zähne aus dem Wasser ragen. Daneben steigt das Gerüst der neuen Brücke empor, still und verlassen, als hätten die Bauleute es einfach vergessen. Am Ufer stehen kräftige Männer und Frauen in nassen Lendentüchern und rufen ihre Preise, während ein Edelmann sich gerade auf die Schultern eines Trägers heben lässt und dabei versucht, seine Würde zu behalten. Das Wasser ist braun und schnell und steigt mit jeder Stunde."
    ],
    geruechte: [
      "Die Flussträger verdienen an einem Hochwassertag mehr als ein Steinmetz im Monat. Ob sie sich die fertige Brücke wirklich wünschen?",
      "Ein Gerüstbalken ist in der Nacht gebrochen. Der Zimmermann schwört, er sei angesägt gewesen.",
      "Wer der Herbergswirtin genug zahlt, bekommt auch bei Hochwasser ein Bett. Wer nicht genug zahlt, schläft im Stall, egal wie viele Ahnen er hat."
    ],
    konflikt: "Die Flussträger leben vom Provisorium. Jede Woche, die die Brücke später fertig wird, bringt ihnen Lohn. Gleichzeitig werden hier, beim Warten auf sinkendes Wasser, Menschen jeden Standes auf engstem Raum zusammengezwungen.",
    meister: {
      hintergrund: "Die Natterbrücke ist das Nadelöhr des Raulswegs: Bei Hochwasser sitzen Reisende hier oft tagelang fest. Das Hochwasser eignet sich hervorragend, um Figuren zusammenzubringen, die sich sonst nie begegnen würden."
    },
    figuren: [], gebaeude: []
  },
  {
    id: "mardramund", nr: 7, name: "Mardramund", typ: "station",
    gottheit: "Hesinde", emblem: "Schlange",
    meile: 170, etappe: 30, schaetzung: false,
    status: "erweiterung", kanon: true, bild: "07-mardramund", jahreszeit: "Wintermorgen im Nebel",
    kurz: "Stilles Städtchen am Fluss mit der neuen Stationskanzlei. Hier liegen Register, Passierscheine und Abrechnungen der ganzen Strecke.",
    beschreibung: [
      "Mardramund ist ein ruhiger Ort am Darpat, dort, wo ein Bach von Westen in den Fluss mündet. Die Kanzlei hat ihn gewählt, um auf halber Strecke ein Archiv für den Raulsweg einzurichten: Hier werden die Abrechnungen der Stationen geprüft, Geleitbriefe registriert und Leumundsbriefe ausgestellt.",
      "Das neue Kanzleigebäude mit seinen hohen Fenstern ist fertig, der Anbau für das Archiv noch nicht. Schreiber eilen mit Stapeln von Büchern über die Straße, und vor der Tür wartet fast immer ein gesatteltes Botenpferd."
    ],
    vorlesetext: [
      "Der Nebel hängt so tief über dem Fluss, dass Mardramund aus dem Nichts aufzutauchen scheint. Auf den Dächern liegt Reif. Es ist still hier, beinahe zu still für eine Stadt an einer Kaiserstraße. Dann seht ihr das neue Kanzleigebäude mit seinen hohen, hell erleuchteten Fenstern, in denen sich Schatten über Tische beugen. Ein junger Schreiber eilt mit einem Stapel Bücher über die Straße, rutscht auf dem gefrorenen Pflaster aus und rettet die Bücher, nicht sich selbst. Vor der Tür schnaubt ein gesatteltes Pferd und stößt weiße Wolken aus."
    ],
    geruechte: [
      "In den Registern der Kanzlei sollen Lieferungen stehen, die nie angekommen sind, und Gelder, die nie bezahlt wurden.",
      "Der Kanzleivorsteher hat früher für ein großes Handelshaus gearbeitet. Welches, sagt er nicht gern.",
      "Nachts brennt im Archiv manchmal noch Licht, obwohl alle Schreiber schwören, sie seien längst zu Hause."
    ],
    konflikt: "Wer die Bücher führt, hat Macht. In Mardramund laufen alle Zahlen des Raulswegs zusammen, und nicht alle, die mit diesen Zahlen arbeiten, haben dieselben Interessen wie die Kaiserin.",
    meister: {
      hintergrund: "Mardramund ist der Ort, an dem eine Untersuchung Belege finden kann, statt nur Gerüchte zu hören. Hier lassen sich Abrechnungen verschiedener Stationen vergleichen. Wer genau hinsieht, bemerkt Muster, die vor Ort nicht sichtbar sind."
    },
    figuren: [], gebaeude: []
  },
  {
    id: "wasserburg", nr: 8, name: "Wasserburg", typ: "station",
    gottheit: "Tsa", emblem: "Eidechse",
    meile: 200, etappe: 30, schaetzung: true,
    status: "erweiterung", kanon: true, bild: "08-wasserburg", jahreszeit: "Frühlingsfest",
    kurz: "Kleine Stadt um eine Wasserburg, deren Station gerade erweitert und mit einem großen Tsa-Fest eingeweiht werden soll.",
    beschreibung: [
      "Wasserburg verdankt seinen Namen der Burg, die von einem Graben umgeben auf einer Flussinsel liegt. Die Station hier ist alt, wird aber für den Raulsweg großzügig erweitert, mit neuen Flügeln für Gäste und einem neuen Relais für die Pferde.",
      "Die Erweiterung soll mit einem großen Tsa-Fest geweiht werden. Gaukler, Händler und Adlige aus der ganzen Umgebung sind eingeladen. Hinter den Kulissen geht es um die Pachtrechte der neuen Herbergsflügel, und dafür interessieren sich mehr Leute, als es bei einem Fest der Erneuerung schicklich wäre."
    ],
    vorlesetext: [
      "Bunte Bänder flattern über der Straße, so viele, dass sie fast den Himmel verdecken. Wasserburg feiert, oder bereitet sich jedenfalls mit großem Eifer darauf vor. Auf dem Platz vor der Burg bauen Gaukler eine Puppenbühne auf, Händler preisen Bänder, Honigkuchen und kleine Eidechsen aus bemaltem Holz an, und Kinder rennen zwischen den Ständen umher. An der Station selbst riecht es noch nach frischem Kalk; zwei Maurer verputzen eilig die letzte Wand, während über ihnen schon die Girlanden hängen. In der Menge entdeckt ihr Adlige in guten Kleidern, die sich sehr freundlich begrüßen und sich dabei sehr genau beobachten."
    ],
    geruechte: [
      "Für die Pacht der neuen Herbergsflügel bieten Leute mit, die niemand im Ort kennt. Sie zahlen in bar und stellen keine Fragen.",
      "Ein Kontor mit einem Namen, den vor einem Jahr noch keiner kannte, hat das halbe Fest bezahlt.",
      "Die Tsa-Geweihte ist nicht glücklich darüber, wer alles bei ihrem Fest mitfeiern will."
    ],
    konflikt: "Das Fest ist eine Bühne, auf der um Einfluss gefeilscht wird. Wer die Herbergen an den Stationen pachtet, verdient an jedem Reisenden. Neues Geld drängt in den Raulsweg, und nicht jeder fragt, woher es kommt.",
    meister: {
      hintergrund: "Wasserburg ist der Ort, an dem neues Geld unklarer Herkunft zum ersten Mal sichtbar auftritt: Kontore, die es vor einem Jahr noch nicht gab, und Bieter, die niemand kennt. Die Feststimmung bildet einen guten Kontrast zu den ernsten Geschäften, die nebenher geschlossen werden."
    },
    figuren: [], gebaeude: []
  },
  {
    id: "wandlether-hof", nr: 9, name: "Wandlether Hof", typ: "station",
    gottheit: "Firun", emblem: "Bär und Eiskristall",
    meile: 230, etappe: 30, schaetzung: true,
    status: "rohbau", kanon: false, bild: "09-wandlether-hof", jahreszeit: "Winterdämmerung",
    kurz: "Einsame Wehrstation im Wald, an der die Straße nach Wandleth abzweigt. Neu befestigt, weil der Abschnitt gefährlich ist.",
    beschreibung: [
      "Hinter Wasserburg, wo der Darpat nach Osten abbiegt, führt der Raulsweg durch dichten Wald. An der Abzweigung nach Wandleth steht der Wandlether Hof, ursprünglich ein Gehöft, jetzt eine kleine Wehrstation mit neuer Palisade und Wachturm.",
      "Der Abschnitt gilt als der unsicherste der Strecke. Im Winter liegt hier Schnee, und es gibt Wölfe, aber die Reisenden fürchten vor allem die Menschen: Wegelagerer, Wilderer und Gestalten, die lieber nicht gefragt werden, wohin sie wollen."
    ],
    vorlesetext: [
      "Die Bäume stehen so dicht, dass es schon dämmert, obwohl der Tag noch nicht vorbei sein sollte. Frischer Schnee liegt auf der Straße, und darin, quer über den Weg, zieht sich eine Spur großer Pfoten. Dann seht ihr Licht zwischen den Stämmen: eine Palisade aus neuen, hellen Pfählen, ein Wachturm mit einer Fackel, Rauch aus einem Schornstein. Ein paar Reisende mit Laternen beeilen sich, das Tor zu erreichen, bevor es geschlossen wird. Irgendwo im Wald heult etwas, und niemand dreht sich danach um."
    ],
    geruechte: [
      "Die Wegelagerer im Wald kennen die Termine der Geldtransporte. Woher?",
      "Der Wachhauptmann am Hof jagt lieber, als zu wachen. Was er erlegt, landet nicht immer in der Küche der Station.",
      "Die Straße nach Wandleth wird seit dem Edikt kaum noch gepflegt. Trotzdem sieht man dort nachts Wagenspuren."
    ],
    konflikt: "Die Wehrstation soll den Wald sicher machen, ist aber unterbesetzt und schlecht ausgerüstet. Wer hier Überfälle verhindern oder geschehen lassen will, hat leichtes Spiel.",
    meister: {
      hintergrund: "Der Wandlether Hof ist der einsamste Ort der Reise und eignet sich für Stimmung, Gefahr und Wildnis. Die Seitenstraße nach Wandleth ist ein guter Weg, auf dem Dinge den Raulsweg verlassen oder betreten können, ohne an einem Kontrollposten vorbeizukommen."
    },
    figuren: [], gebaeude: []
  },
  {
    id: "gnitzenkuhl", nr: 10, name: "Gnitzenkuhl", typ: "station",
    gottheit: "Peraine", emblem: "Storch",
    meile: 260, etappe: 30, schaetzung: true,
    status: "erweiterung", kanon: true, bild: "10-gnitzenkuhl", jahreszeit: "Schwüler Mittag",
    kurz: "Pfahldorf am Sumpfrand, berüchtigt für seine Mücken. Die neue Heilerstation ist die einzige, die wirklich jeder Reisende zu schätzen weiß.",
    beschreibung: [
      "Gnitzenkuhl liegt am Rand eines Schilfsumpfes, und die Gnitzen, die hiesigen Mücken, sind der eigentliche Herrscher des Ortes. Die Häuser stehen auf Pfählen, der Raulsweg führt auf einem aufgeschütteten Damm durch das feuchte Land.",
      "Die Kanzlei hat hier eine Heilerstation unter dem Schutz der Peraine-Kirche eingerichtet, mit Kräutergarten und Krankenstube. Sumpffieber ist ein ernstes Problem für Reisende und Bauarbeiter, und die Heiler haben mehr zu tun, als ihnen lieb ist."
    ],
    vorlesetext: [
      "Die Luft steht still und schwer über dem Schilf. Jeder Atemzug schmeckt nach Wasser und Moder, und um eure Köpfe tanzen Wolken winziger Mücken, die sich durch kein Wedeln vertreiben lassen. Der Damm, auf dem die Straße verläuft, ist das Einzige, was hier fest und gerade ist. Links und rechts glitzert stilles Wasser, und auf hohen Pfählen stehen Häuser, als hätten sie Angst, nasse Füße zu bekommen. Auf dem Dach der Heilerstation klappert ein Storch in seinem Nest, und darunter, im Kräutergarten, sitzt ein Kranker in eine Decke gehüllt in der Sonne und zittert trotzdem."
    ],
    geruechte: [
      "Unter den Bauarbeitern am Damm geht das Fieber um. Die Bauleitung will davon nichts wissen und stellt einfach neue Leute ein.",
      "Die Heiler bekommen ihre Arzneien über die Station geliefert. Die letzte Lieferung war verdorben, oder sie war gar nicht das, was auf den Kisten stand.",
      "Im Sumpf liegt die Ruine eines alten Wachturms. Die Dörfler meiden sie, aber manchmal brennt dort nachts ein Licht."
    ],
    konflikt: "Gnitzenkuhl zeigt die menschlichen Kosten des Straßenbaus. Arbeiter erkranken, weil der Zeitplan drängt, und wer an den Lieferungen spart, spart an der Gesundheit anderer.",
    meister: {
      hintergrund: "Die Heilerstation ist ein moralischer Anker der Reise. Hier lässt sich zeigen, dass das Projekt der Kaiserin auch Gutes bewirkt. Die Peraine-Geweihten sind unbestechlich und können wertvolle Verbündete sein, weil sie mit jedem sprechen, der krank ist, egal auf welcher Seite er steht."
    },
    figuren: [], gebaeude: []
  },
  {
    id: "gaulsfurt", nr: 11, name: "Gaulsfurt", typ: "station",
    gottheit: "Boron", emblem: "Zerbrochenes Rad",
    meile: 285, etappe: 25, schaetzung: true,
    status: "erweiterung", kanon: true, bild: "11-gaulsfurt", jahreszeit: "Abendrot",
    kurz: "Furt am Südufer des Darpat, Kreuzung mit der Kronstraße nach Zorgan. Ein Ort des Handels und der Erinnerung an die Schlacht von 1039 BF.",
    beschreibung: [
      "Gaulsfurt liegt am Südufer des Darpat. Hier kreuzt der Raulsweg die Kronstraße nach Zorgan, und Händler aus Garetien treffen auf Händler aus Aranien und den Tulamidenlanden. Die Mada Basari unterhält hier ihr Mondsilberkontor, und in der Nähe liegt das Heiligtum Raschia'Hal, das Rahja, Tsa und Peraine geweiht ist.",
      "1039 BF wurde hier die Schlacht an der Gaulsfurt geschlagen. Ein Gedenkstein auf dem Feld vor dem Ort erinnert an die Gefallenen, und die neue Station wurde Boron geweiht. Wer die Furt durchquert, tut es oft schweigend."
    ],
    vorlesetext: [
      "Die Sonne versinkt rot hinter euch, als ihr die Furt erreicht, und das Wasser des Darpat glüht wie Kupfer. Karren rumpeln durch die Untiefen, Pferde scheuen, Treiber fluchen in drei Sprachen. Am Ufer drängen sich Händler in bunten, weiten Gewändern neben Garether Kaufleuten in Wollmänteln, und über einem schönen Kontorhaus glänzt ein silberner Halbmond. Etwas abseits, auf einer Wiese, auf der das Gras ein wenig grüner wächst als anderswo, steht ein schlichter Stein mit einem zerbrochenen Rad. Niemand lärmt in seiner Nähe."
    ],
    geruechte: [
      "Die Zölle an der Kreuzung sind höher als irgendwo sonst auf dem Raulsweg. Wer sie kassiert und wohin das Geld geht, darüber streiten sich Perricum und die Kanzlei.",
      "Im Mondsilberkontor wird mit Wechseln aus ganz Aventurien gehandelt. Manche davon sind auf Häuser ausgestellt, die es nicht mehr gibt.",
      "Wer auf dem Schlachtfeld übernachtet, hört Hufschlag, wo keine Pferde sind."
    ],
    konflikt: "Gaulsfurt ist der Ort, an dem sich Reichsinteressen und die Interessen Perricums überschneiden. Wer an der Kreuzung Zoll erhebt und wer die Station verwaltet, ist nicht abschließend geklärt.",
    meister: {
      hintergrund: "In Gaulsfurt laufen Handelswege und Geldflüsse aus vielen Richtungen zusammen. Wer Spuren von Geld verfolgt, landet früher oder später hier. Die Mada Basari sind Kanon und können als neutrale, aber gut informierte Partei dienen."
    },
    figuren: [], gebaeude: []
  },
  {
    id: "rabicum", nr: 12, name: "Rabicum", typ: "station",
    gottheit: "Rahja", emblem: "Rose",
    meile: 306, etappe: 21, schaetzung: true,
    status: "fertig", kanon: true, bild: "12-rabicum", jahreszeit: "Sommernacht",
    kurz: "Weinort in den Hügeln vor Perricum. Die letzte Station, und für viele die schönste: Wein, Lieder und der erste Blick auf das Meer.",
    beschreibung: [
      "Rabicum liegt in Weinbergen an den Hügeln vor Perricum. Die Station war schon vor dem Edikt eine beliebte Herberge und wurde vor allem verschönert, nicht vergrößert. Der Rahja-Tempel ist klein, aber der Wein, die Musik und das Weinfest im Sommer sind weit bekannt.",
      "Für Reisende aus Gareth ist Rabicum die letzte Nacht vor dem Ziel. Von den Hügeln aus sieht man an klaren Abenden die Lichter Perricums und die Schiffe im Golf. Wer hier noch Geschäfte machen will, bevor er in der großen Stadt den Behörden begegnet, tut es beim Wein."
    ],
    vorlesetext: [
      "Hunderte Laternen hängen zwischen den Weinstöcken und tauchen die Hänge in buntes Licht. Von irgendwoher kommt Musik, eine Fiedel und eine Trommel, und auf dem Platz vor der Station tanzen Paare, die sich vor einer Stunde noch nicht kannten. Fässer stehen offen am Straßenrand, und jeder, der vorbeikommt, bekommt einen Becher in die Hand gedrückt, ob er will oder nicht. Über allem hängt ein großer, gelber Mond. Und dort, weit im Osten, wo die Hügel enden, seht ihr zum ersten Mal die Lichter einer großen Stadt am Meer, die Festung über dem Hafen und die Laternen der Schiffe auf dem Wasser. Perricum."
    ],
    geruechte: [
      "Die besten Geschäfte am Raulsweg werden nicht in Kanzleien geschlossen, sondern beim dritten Becher in Rabicum.",
      "Ein Gast der Station hat einen ganzen Weinkeller gekauft, nur um darin ungestört zu sein.",
      "Die Stationswirtin kennt jeden, der in den letzten zehn Jahren nach Perricum gereist ist. Sie verrät nur, was ihr gefällt."
    ],
    konflikt: "Rabicum ist der letzte Ort vor Perricum, an dem man Dinge regeln kann, ohne dass die Behörden der Stadt zusehen. Das macht das Weinfest zum heimlichen Marktplatz der Strecke.",
    meister: {
      hintergrund: "Die Stimmung in Rabicum ist heiter und sinnlich, ein bewusster Gegenpol zu Hohenstein und Gnitzenkuhl. Gerade deshalb eignet sich der Ort für vertrauliche Gespräche, Verhandlungen und Wendungen kurz vor dem Ziel."
    },
    figuren: [], gebaeude: []
  },
  {
    id: "perricum", nr: 13, name: "Perricum", typ: "stadt",
    meile: 326, etappe: 20, schaetzung: true, kanon: true,
    kurz: "Reichsstadt an der Mündung des Darpat, Tor zum Perlenmeer und Ziel des Raulswegs.",
    beschreibung: [
      "Perricum liegt an der Mündung des Darpat in den Golf von Perricum. Die Stadt ist Sitz des Markgrafen, wichtigster Kriegshafen des Mittelreichs und Heimat der Perlenmeerflotte. Hier steht auch das Gründungshaus der Beilunker Reiter.",
      "Für den Raulsweg ist Perricum das Ziel und der Grund: Die Straße soll die Hauptstadt schneller mit dem Meer verbinden. Ob Perricum davon mehr profitiert als Gareth, oder umgekehrt, ist eine Frage, die in beiden Städten unterschiedlich beantwortet wird."
    ]
  }
];

/* Reisezeiten: Schätzwerte für die gesamte Strecke (ca. 326 Meilen) auf ausgebauter Straße */
RW.reisezeiten = [
  { art: "Wanderer zu Fuß", proTag: "30–35", dauer: "10–11 Tage" },
  { art: "Händler mit Pferdekarren", proTag: "25–30", dauer: "11–13 Tage" },
  { art: "Reisekutsche mit eigenen Pferden", proTag: "35–45", dauer: "8–9 Tage" },
  { art: "Reisekutsche mit Pferdewechsel an den Stationen", proTag: "60–80", dauer: "4–5½ Tage" },
  { art: "Adliger Tross", proTag: "15–20", dauer: "17–22 Tage" },
  { art: "Beilunker Reiter mit Pferdewechsel", proTag: "120–180", dauer: "2–3 Tage" }
];
