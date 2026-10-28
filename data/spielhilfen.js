/* ==========================================================
   Spielhilfen (Stufe 6): Begegnungen, Gerüchte, Wetter, Namen
   ----------------------------------------------------------
   abschnitte[]: id, name, von, bis, stationen[], meilen [von, bis],
                 verkehr (W6-Wert, bis zu dem eine Begegnung eintritt),
                 kurz, begegnungen[20] { titel, text, wendung }
   geruechte[20]: { text, meister }   text = Spielerwissen
   wetter[]:      { id, name, monde, tabelle[] { von, bis, wetter, folge } }
   namen:         Listen für schnelle Figuren, Herbergen und Händler
   Die Wendungen sind Möglichkeiten, keine Wahrheiten.
   ========================================================== */

window.RW = window.RW || {};

RW.spielhilfen = {
  abschnitte: [
    {
      id: "garetien",
      name: "Garetisches Land",
      von: "gareth", bis: "sonnenfeld",
      stationen: ["nattersquell", "hartsteen", "sonnenfeld"],
      meilen: [0, 86],
      verkehr: 2,
      kurz: "Dicht besiedelt, viel Verkehr, überall Baustellen. Nahe der Hauptstadt ist die Straße fast nie leer.",
      begegnungen: [
        { titel: "Kurier mit Wimpel", text: "Ein Kurier der Kanzlei verlangt im Galopp freie Bahn und spritzt alle mit Schlamm voll.", wendung: "Eine Meile weiter lahmt sein Pferd, und er bittet ausgerechnet die Helden um eines der ihren." },
        { titel: "Steinwagen im Graben", text: "Ein Ochsenkarren mit Pflastersteinen aus Hartsteen ist umgekippt. Der Fuhrmann flucht, hinter ihm staut sich der Verkehr.", wendung: "Zwischen den Steinen liegen zwei Kisten, die auf keinem Frachtbrief stehen." },
        { titel: "Stempeljäger", text: "Pankraz und Fredo vergleichen lautstark ihre Stempelhefte und streiten, ob der Hartsteener Stempel schief sitzt.", wendung: "Einer der beiden hat einen Stempel im Heft, den es noch gar nicht geben dürfte." },
        { titel: "Die Gans auf der Sänfte", text: "Eine Prozession aus einem Nachbardorf trägt eine geschmückte Gans zur Herdkapelle von Nattersquell.", wendung: "Die Gans ist entwischt. Die ganze Prozession sucht sie, und wer sie findet, hat im Dorf für immer Kredit." },
        { titel: "Vermesser auf dem Acker", text: "Zwei Vermesser der Kanzlei stecken mit Messkette und Stangen quer über einen Acker ab. Der Bauer droht mit der Mistgabel.", wendung: "Die Pflöcke markieren eine Linie, die auf keinem Plan der Kanzlei verzeichnet ist." },
        { titel: "Der Veteran am Meilenstein", text: "Ein alter Soldat sitzt an einem Meilenstein und erzählt jedem, der eine Münze gibt, wie es hier früher aussah.", wendung: "Er hat gesehen, wer letzte Nacht am Fuß des Steins gegraben hat." },
        { titel: "Jagdgesellschaft", text: "Reiter und Hunde von Schloss Ginsterhold kreuzen die Straße. Hörner, Gebell, und niemand macht Platz.", wendung: "Der junge Herr der Jagd sucht Begleiter für eine Wette, die er auf keinen Fall verlieren darf." },
        { titel: "Kesselflickerin", text: "Eine Wanderhändlerin bietet Töpfe, Nadeln und »Stationsstempel zum Selbstdrucken« an.", wendung: "Die falschen Stempel sind gut. Sehr gut. Jemand in einer Kanzleistube muss ihr dabei geholfen haben." },
        { titel: "Lohntag an der Baustelle", text: "Tagelöhner an der Pflasterung warten auf ihren Lohn, die Stimmung kippt.", wendung: "Der Zahlmeister ist seit gestern Abend verschwunden, mit ihm die Lohnkasse, oder doch nicht?" },
        { titel: "Achsbruch", text: "Die Reisekutsche des Relais liegt mit gebrochenem Rad am Straßenrand. Die Fahrgäste stehen ratlos im Regen.", wendung: "Ein Fahrgast will um keinen Preis bis zur nächsten Station warten und bietet viel für ein Pferd." },
        { titel: "Wegzoll der Kinder", text: "Dorfkinder sperren mit einem Seil die Straße und verlangen Wegzoll: ein Lied, einen Witz oder einen Kreuzer.", wendung: "Die Kinder wissen genau, wer heute schon vorbeigekommen ist, und wer in welche Richtung." },
        { titel: "Schatten bei den Pferden", text: "Nachts schleicht jemand um die Pferde.", wendung: "Es ist ein Junge, der das Pony seiner Familie zurückholen will. Es wurde an den Händler verkauft, mit dem die Helden reisen." },
        { titel: "Siegelprüfung", text: "Ein Praios-Geweihter hält an einer Kreuzung Reisende an und prüft ihre Geleitbriefe, ohne dazu befugt zu sein.", wendung: "Er hält einen der Helden für einen gesuchten Siegelfälscher." },
        { titel: "Schafe und Hofzug", text: "Eine Schafherde füllt die Straße. Von hinten nähern sich Vorreiter eines Hofzugs.", wendung: "Der Hirte weigert sich aus Prinzip, dem Hof auszuweichen. Er beruft sich auf den neunten Artikel des Edikts." },
        { titel: "Unter dem Rastdach", text: "Ein Schauer treibt Reisende aller Art unter ein Rastdach. Man rückt zusammen und erzählt.", wendung: "Einer erzählt eine Geschichte über die Helden selbst, und sie stimmt nur zur Hälfte." },
        { titel: "Plakate der Gaukler", text: "Die Vorhut einer Gauklertruppe klebt bunte Zettel an Bäume und Meilensteine.", wendung: "Die Zettel überkleben einen Aushang der Kanzlei, und ein Büttel sucht den Schuldigen." },
        { titel: "Hier lag mein Acker", text: "Ein Bauer steht mit einem Schild am Rand der neuen Pflasterung: »Hier lag mein Acker.«", wendung: "Er sammelt Unterschriften für eine Bittschrift an die Kaiserin und braucht jemanden, der schreiben kann." },
        { titel: "Die Reiterin", text: "Jorinde Haselbach zügelt ihr Pferd neben den Helden und fragt, ob ihnen ein Kurier der Kanzlei begegnet ist.", wendung: "Sie hat gewettet, wer zuerst in Sonnenfeld ist, und der Kurier liegt vorn." },
        { titel: "Geleitbrief im Graben", text: "Im Straßengraben liegt ein gesiegelter Geleitbrief, nass, aber lesbar.", wendung: "Der Name darauf gehört jemandem, der an der nächsten Station schon erwartet wird." },
        { titel: "Der Tross", text: "Vorreiter rufen: Ein Fürst des Reiches naht, alle Reisenden runter von der Straße.", wendung: "Eine Kutsche hält an. Hinter dem Vorhang winkt jemand die Helden heran." }
      ]
    },
    {
      id: "rommilyser-mark",
      name: "Rommilyser Mark",
      von: "sonnenfeld", bis: "natterbruecke",
      stationen: ["rommilyser-kreuz", "feste-hohenstein", "natterbruecke"],
      meilen: [86, 140],
      verkehr: 1,
      kurz: "Hügelland zwischen Kreuzung und Natter. Hier ist man den Rabenmunds näher als der Kanzlei, und das merkt man.",
      begegnungen: [
        { titel: "Spottvers an der Scheune", text: "An einer Scheunenwand steht mit Kreide ein Spottvers auf »Rohajas Rennbahn«. Ein Büttel will wissen, wer das war.", wendung: "Die Handschrift ist sauber und geübt, die eines Schreibers." },
        { titel: "Wagenzähler", text: "Reiter in den Farben des Hauses Rabenmund stehen am Wegrand und zählen die Wagen auf der neuen Straße.", wendung: "Sie sammeln Belege für die Klage bei Hofe und zahlen gut für jede Klage über Preise und Wartezeiten." },
        { titel: "Der versetzte Meilenstein", text: "Ein frisch gesetzter Meilenstein liegt umgeworfen im Gras.", wendung: "Er wurde nicht umgeworfen, sondern versetzt. Die neue Zählung macht die Straße zwei Meilen länger." },
        { titel: "Kontrollposten", text: "Wachen aus Hohenstein prüfen Gepäck und Papiere nach dem achten Artikel des Edikts, gründlich.", wendung: "Sie suchen etwas Bestimmtes und sagen nicht, was." },
        { titel: "Der freundliche Führer", text: "Ein Händler warnt, die alte Straße nach Rommilys sei sicherer, und bietet an, die Helden zu führen.", wendung: "Er wird für jeden Wagen bezahlt, den er von der neuen Straße weglockt." },
        { titel: "Gepäckträger an der Furt", text: "Junge Flussträger bieten an, Gepäck über die Furt zu tragen, billiger als jeder Brückenzoll.", wendung: "Die Furt ist heute tiefer als sonst. Weiter oben hat jemand Steine aufgeschichtet." },
        { titel: "Die Pilgerin der Leuin", text: "Eine Rondra-Pilgerin fordert einen der Helden auf offener Straße zu einem Übungskampf.", wendung: "Sie sucht jemanden, der bei der Löwenkapelle für ihren Mut bürgt." },
        { titel: "Der Fährmann ohne Fähre", text: "Der Fährmann von Nadriansfurt hat seit dem Brückenbau kaum Kunden und verlangt Rastgeld von allen, die an seinem Ufer halten.", wendung: "Er besitzt ein altes Pergament, das ihm genau dieses Recht gibt." },
        { titel: "Hammerschläge", text: "Nachts klingen Hammerschläge von einer Baustelle herüber, wo um diese Zeit niemand arbeiten sollte.", wendung: "Es sind Bauleute, die heimlich Pfusch ausbessern, bevor die Prüfer der Kanzlei kommen." },
        { titel: "Schlägerei in Rabensbrück", text: "In einer Schenke in Rabensbrück geraten Anhänger der Rabenmunds und Kanzleileute aneinander.", wendung: "Ein Fremder hat beide Seiten mit Freibier und Gerüchten aufgehetzt und ist längst gegangen." },
        { titel: "Würfel an der Kreuzung", text: "Am Kreuz bietet ein Fremder ein Würfelspiel an, Einsatz: ein Stempel aus dem Heft.", wendung: "Er dient dem Phex-Schrein und prüft, wer ehrlich verliert." },
        { titel: "Rinder auf Abwegen", text: "Treiber mit einer Herde Rinder für Gareth suchen den alten Weg und versperren die Kreuzung.", wendung: "Ein Tier trägt das Brandzeichen eines Rabenmund-Guts, das angeblich keine Rinder mehr hält." },
        { titel: "Brief für Natterbrücke", text: "Ein Bote mit verstauchtem Fuß bittet, einen Brief nach Natterbrücke mitzunehmen.", wendung: "Der Brief ist an Bruna Lehmkuhl gerichtet und nicht versiegelt." },
        { titel: "Im Gebüsch", text: "Ein junger Waffenknecht aus Hohenstein versteckt sich am Wegrand und hofft, nicht gesehen zu werden.", wendung: "Er hat im Dienst etwas gesehen, das er nicht melden darf, und traut seiner Torhauptfrau nicht mehr." },
        { titel: "Neuigkeiten für einen Heller", text: "Eine alte Frau verkauft »Neuigkeiten aus Rommilys«, einen Heller das Stück.", wendung: "Neun davon sind erfunden. Die zehnte stimmt und ist brisant." },
        { titel: "Zoll an der Rabenbrücke", text: "An der Rabenbrücke kassiert ein Zöllner Brückengeld. Ob das rechtens ist, kann niemand sagen.", wendung: "Das Zollrecht gehört seit alters dem Haus Rabenmund, die Kanzlei bestreitet es, und beide schicken Leute." },
        { titel: "Geheul in der Nacht", text: "Nachts heult es in den Hügeln, die Pferde werden unruhig.", wendung: "Es sind keine Wölfe, sondern Hirtenhunde, die jemand losgelassen hat, um die Rastplätze zu leeren." },
        { titel: "Der Junker", text: "Ugdalf von Rabenmund reitet mit Freunden vorbei und stichelt gegen jeden, der einen Geleitbrief trägt.", wendung: "Er lädt die Helden zu einer Jagd ein, bei der es nicht um Wild geht." },
        { titel: "Singende Steinmetze", text: "Gesellen der Hartsteener Gilde ziehen singend zum Natterdamm.", wendung: "Einer kennt einen Schleichweg um die Baustelle, den die Kanzlei gern gesperrt sähe." },
        { titel: "Hochzeitszug", text: "Eine Bauernhochzeit füllt die Straße. Die Helden werden eingeladen, Travia zu ehren.", wendung: "Braut und Bräutigam stammen aus Dörfern, die sich über die Streckenführung verfeindet haben." }
      ]
    },
    {
      id: "darpatauen",
      name: "Darpatauen und Wandlether Tann",
      von: "natterbruecke", bis: "wandlether-hof",
      stationen: ["mardramund", "wasserburg", "wandlether-hof"],
      meilen: [140, 235],
      verkehr: 1,
      kurz: "Erst Auen und Flussdörfer am Darpat, dann der dichte Tann um den Wandlether Hof. Akten, Gaukler, Jäger.",
      begegnungen: [
        { titel: "Tinte auf der Straße", text: "Ein Ochsenkarren voller Akten für die Stationskanzlei hat ein Fass Tinte verloren. Die Straße ist auf zwanzig Schritt schwarz.", wendung: "Eine Aktenkiste ist leichter, als das Verzeichnis sagt." },
        { titel: "Der Schreiber zu Fuß", text: "Linnart Holm hat sein Geld für die Kutsche verloren und will zu Fuß nach Mardramund.", wendung: "In seiner Tasche stecken Abschriften, die er nicht haben dürfte." },
        { titel: "Flurnamensammler", text: "Ein Gelehrter fragt jeden nach den alten Namen der Hügel und Bäche, für eine neue Karte der Kanzlei.", wendung: "Ein alter Flurname verrät ein vergessenes Grab dicht an der neuen Trasse." },
        { titel: "Hochwasser", text: "Der Darpat hat die Wiesen überflutet, die Straße steht knietief im Wasser.", wendung: "Im Wasser treibt ein Lastkahn ohne Mannschaft, die Ladung noch an Bord." },
        { titel: "Probe am Rastplatz", text: "Fabrizzio Dellamontes Truppe probt auf einem Rastplatz und sucht Zuschauer, gern auch Statisten.", wendung: "Das Stück verspottet die Kanzlei, und in der ersten Reihe sitzt ein Kanzleibeamter in Zivil." },
        { titel: "Der Fuchswelpe", text: "Kinder aus Wasserburg haben einen Fuchswelpen gefangen und wollen ihn verkaufen.", wendung: "Im Tsahaus sähe man das gar nicht gern, und die Fähe streicht schon um das Lager." },
        { titel: "Die Falle", text: "Nachts schnappt im Unterholz eine Falle zu, ein Tier schreit.", wendung: "Die Falle ist für etwas gebaut, das viel größer ist als ein Hase." },
        { titel: "Der Schweigende", text: "Ein einzelner Pilger in Fellen, auf dem Weg nach Blitztann, grüßt nur mit einem Nicken.", wendung: "Er hat sich verlaufen und würde das nie zugeben. Der Firunsgang verbietet ihm, um Hilfe zu bitten." },
        { titel: "Köhlerrauch", text: "Über dem Tann steht eine Rauchsäule. Köhler arbeiten an ihrem Meiler.", wendung: "Das Holz stammt aus dem Bannwald des Wandlether Hofs." },
        { titel: "Markttag in Drosselau", text: "Markt, Gedränge, Taschendiebe. Ein Händler bietet »echtes Kanzleisiegelwachs« an.", wendung: "Das Wachs ist echt, und der Händler weiß nicht, woher es stammt, angeblich." },
        { titel: "Pferd ohne Reiter", text: "Ein gesatteltes Pferd mit Kanzleizeichen grast am Wegrand.", wendung: "Der Bote ist in Efferdsquell bei seiner Liebsten und will auf keinen Fall gefunden werden." },
        { titel: "Quellopfer", text: "In Efferdsquell bittet man Durchreisende, einen Krug Wasser in die Quelle zurückzugießen.", wendung: "Wer sich weigert, dem wird Unglück nachgesagt, und manche im Dorf helfen dem Unglück nach." },
        { titel: "Ein Angebot", text: "Ludeger Vanstein rastet am selben Platz und lädt zu gutem Wein ein.", wendung: "Er bietet Geld dafür, ein Kaufangebot an einen Bauern zu überbringen, der ihn nicht mehr empfängt." },
        { titel: "Bärenspuren", text: "Große Spuren kreuzen die Straße am Waldrand.", wendung: "Sie führen tiefer in den Tann, Richtung Blitztann, und sie sind frisch." },
        { titel: "Der Fragensteller", text: "Ein unauffälliger Reisender fragt jeden nach den Preisen in den Herbergen und schreibt mit.", wendung: "Er behauptet, ein Prüfer der Kanzlei zu sein. Ob das stimmt, weiß nur Mardramund." },
        { titel: "Flussschiffer", text: "Schiffer vom Darpat schimpfen, die Straße nehme ihnen die Fracht weg.", wendung: "Sie bieten eine Passage stromab an, schneller als die Straße, sagen sie, und billiger." },
        { titel: "Stimmen im Nebel", text: "Dichter Nebel liegt im Tann. Irgendwo rufen Stimmen.", wendung: "Holzfäller haben sich verirrt, oder Reisende auf der Nebenstraße nach Blitztann suchen jemanden." },
        { titel: "Die Streife", text: "Wachen vom Wandlether Hof suchen einen Wilderer und befragen jeden.", wendung: "Die Beschreibung passt auffällig gut auf einen der Helden." },
        { titel: "Der Bader", text: "Ein wandernder Bader bietet Zahnziehen, Aderlass und Tinkturen an.", wendung: "Seine Tinkturen tragen das Zeichen der Heilerstation in Gnitzenkuhl, und dort vermisst man sie." },
        { titel: "Die Abnahme", text: "Answald Kreutzer inspiziert mit Gefolge einen fertigen Abschnitt.", wendung: "Er braucht unabhängige Zeugen für die Abnahme und hat keine Zeit, lange zu suchen." }
      ]
    },
    {
      id: "perricumer-land",
      name: "Perricumer Land",
      von: "wandlether-hof", bis: "perricum",
      stationen: ["gnitzenkuhl", "gaulsfurt", "rabicum"],
      meilen: [235, 326],
      verkehr: 2,
      kurz: "Felder, Weinhänge und das alte Schlachtfeld, dann riecht man das Meer. Je näher Perricum, desto voller die Straße.",
      begegnungen: [
        { titel: "Kräutersammlerinnen", text: "Peraine-Novizinnen sammeln am Wegrand und bitten um Geleit bis Gnitzenkuhl.", wendung: "Sie suchen ein Kraut, das nur auf dem alten Schlachtfeld wächst." },
        { titel: "Streik am Damm", text: "Die Arbeiter am Damm haben die Schaufeln hingeworfen. Grimald Schaufler brüllt.", wendung: "Die Arbeiter sagen, der Damm sei schlechter gebaut als bezahlt, und sie wollen nicht schuld sein, wenn er bricht." },
        { titel: "Trauerzug", text: "Angehörige bringen Gebeine von Gefallenen zur Gedenkkapelle nach Gaulsfurt. Man erwartet Schweigen am Weg.", wendung: "Ein Wagen des Zugs ist schwerer, als Gebeine je sein könnten." },
        { titel: "Grabende auf dem Feld", text: "Leute graben auf dem alten Schlachtfeld nach Waffen und Münzen.", wendung: "Borons Geweihte wollen das verhindern und suchen Helfer, die keine Angst vor Ärger haben." },
        { titel: "Der bessere Kurs", text: "Ein tulamidischer Händler bietet einen Wechselkurs, besser als der des Mondsilberkontors.", wendung: "Die Münzen sind echt, die Waage ist es nicht." },
        { titel: "Geleitgeld", text: "Odelinde Perval verlangt das Geleitgeld der Markgrafschaft, zusätzlich zum Preis der Station.", wendung: "Beides ist rechtens, und genau das ärgert alle." },
        { titel: "Helfer für die Lese", text: "Winzer bei Rabicum suchen Hände für die Lese oder den Rebschnitt.", wendung: "Wer hilft, bekommt Wein und einen Blick in einen Keller, den Fremde sonst nicht sehen." },
        { titel: "Tanz am Weg", text: "Musik, Tanz und Wein an einem Wegkreuz. Reisende werden ohne Umstände eingeladen.", wendung: "Ein Tänzer steckt einem der Helden heimlich einen Zettel zu." },
        { titel: "Der Seemann", text: "Ein Seemann auf dem Weg nach Perricum fragt nach der Abkürzung zum Hafen.", wendung: "Er hat sein Schiff verpasst, die Heuer schon kassiert, und der Kapitän lässt ihn suchen." },
        { titel: "Flottenbote", text: "Ein Bote der Perricumer Flotte jagt Richtung Gareth und wechselt hastig das Pferd.", wendung: "Er lässt in der Eile eine Tasche liegen." },
        { titel: "Kamele", text: "Eine kleine tulamidische Karawane erschreckt mit ihren Kamelen die Pferde.", wendung: "Der Karawanenführer sucht einen Dolmetscher für die Kontrollstelle vor Perricum." },
        { titel: "Der Herold", text: "Ein Herold des Hauses Paligan verliest auf einem Dorfplatz die Verlautbarung zum Edikt.", wendung: "Jemand in der Menge ruft Sätze aus dem Rabenmund-Brief dazwischen." },
        { titel: "Schlange vor dem Tor", text: "Vor Perricum warten Reisende und Wagen auf Einlass. Es geht nur langsam voran.", wendung: "Ein Händler verkauft Plätze weiter vorn in der Schlange, und die Wachen sehen weg." },
        { titel: "Der verletzte Storch", text: "Am Wegrand liegt ein Storch mit verletztem Flügel.", wendung: "Wer ihn zum Storchenhaus bringt, hat in Gnitzenkuhl Freunde." },
        { titel: "Lichter auf dem Feld", text: "Nachts wandern Laternen über das Schlachtfeld bei Gaulsfurt.", wendung: "Es sind Angehörige, die heimlich nach einem bestimmten Namen auf einem Grabstein suchen." },
        { titel: "Verkaufter Weinberg", text: "Ein Weinbauer sitzt am Wegrand und trauert seinem Weinberg nach, den er an ein fremdes Kontor verkauft hat.", wendung: "Der Kaufvertrag hat eine Lücke, wenn jemand sie findet." },
        { titel: "Mücken", text: "An den Auen sind die Mücken unerträglich. Eine Kräuterfrau verkauft Salbe.", wendung: "Die Salbe hilft wirklich, stinkt aber so, dass keine Herberge die Helden einlassen will." },
        { titel: "Fast am Ziel", text: "Eine Pilgerin hat alle Stempel bis auf den letzten, aber kein Geld mehr.", wendung: "Sie bietet ihr Stempelheft zum Kauf an. Es ist mehr wert, als sie ahnt." },
        { titel: "Langsamer Fisch", text: "Ein Fischhändler aus Perricum fährt erstaunlich langsam für Ware, die verdirbt.", wendung: "Unter dem Fisch liegt Mondsilber, am Kontor vorbei." },
        { titel: "Die Kaiserin kommt", text: "Bauleute hasten, Dörfer schmücken sich: Es heißt, die Kaiserin komme.", wendung: "Es kommt tatsächlich jemand, aber nicht die Kaiserin." }
      ]
    }
  ],

  geruechte: [
    { text: "Die Kaiserin will den ganzen Weg selbst reiten, ohne Hofzug und unerkannt.", meister: "Vielleicht probt eine Doppelgängerin, vielleicht nur ein Prahlhans." },
    { text: "Wer alle zwölf Stempel hat, darf einmal im Leben in einer Kaiserpfalz schlafen.", meister: "Steht nicht im Edikt. Die Kanzlei hat es nie bestritten, weil es Pilger bringt." },
    { text: "Bei Hartsteen sind alte Grabsteine im Pflaster verbaut.", meister: "Kann für ein kurzes Stück stimmen, und es kann jemandem sehr peinlich sein." },
    { text: "Das Haus Rabenmund zahlt jedem, der beweist, dass die neue Straße teurer ist als die alte.", meister: "Gezahlt wird eher mit Gastfreundschaft und Fürsprache als mit Gold." },
    { text: "Die Brücke an der Natter wird nie fertig, weil die Flussträger jede Nacht einen Stein herausholen.", meister: "Übertrieben. Ob überhaupt etwas daran ist, entscheidet die Spielleitung." },
    { text: "Der Wegemeister führt in Mardramund eine zweite Kasse.", meister: "Es gibt Rücklagen, von denen der Hof nichts weiß. Ob zum eigenen Nutzen, bleibt offen." },
    { text: "Im Tann hinter dem Wandlether Hof lebt ein weißer Bär. Wer ihn sieht, bekommt den Bärenstempel.", meister: "Den Bärenstempel gibt es nur für den Firunsgang. Den Bären vielleicht trotzdem." },
    { text: "Die neuen Kontore gehören in Wahrheit einem einzigen Mann, der sein Gesicht nie zeigt.", meister: "Mehrere Geldgeber, ein Name auf den Verträgen. Wer dahinter steht, ist offen." },
    { text: "In Gaulsfurt hört man in manchen Nächten noch die Schlacht.", meister: "Wind über dem Feld, Glocken der Kapelle, oder mehr." },
    { text: "Die Mada Basari prägen bald eigenes Geld.", meister: "Es gibt Wechselmarken für Stammkunden. Münzrecht ist das nicht, noch nicht." },
    { text: "Bald sollen die Kutschen auch nachts fahren, mit Laternen an jedem Meilenstein.", meister: "Ein Plan der Kanzlei existiert. Das Geld dafür nicht." },
    { text: "Für jede Station gibt es einen geheimen dreizehnten Stempel.", meister: "Ein Scherz von Schreibern, den inzwischen manche Pilger ernst nehmen." },
    { text: "In Wasserburg kann man bei Tsa einen neuen Namen annehmen und reist danach mit neuem Geleitbrief weiter.", meister: "Den Namen gibt die Kirche. Den Geleitbrief nicht, auch wenn manche es versuchen." },
    { text: "Die Beilunker Reiter wetten auf die Kuriere der Kanzlei und verlieren selten.", meister: "Stimmt. Die Frage ist, wer die Wetten bezahlt." },
    { text: "Perricum will einen eigenen Hafenkai nur für Stationswaren bauen.", meister: "Die Paligan haben Pläne zeichnen lassen. Wer bezahlt, ist ungeklärt." },
    { text: "Der Wein in Rabicum wird mit Wasser aus der Quelle von Nattersquell gesegnet, damit Anfang und Ende der Straße verbunden sind.", meister: "Ein schöner neuer Brauch, erfunden vor einem Jahr. Er könnte bleiben." },
    { text: "Wer in Sonnenfeld lügt, dem bleicht die Sonne den Stempel aus.", meister: "Billige Tinte. Aber wer will das am Praiostag laut sagen?" },
    { text: "Am Rommilyser Kreuz gibt es einen Stempel, den man nur nachts sieht.", meister: "Ysilda Graumann weiß davon. Ob es ihn gibt, liegt bei der Spielleitung." },
    { text: "Der Damm bei Gnitzenkuhl wird mit Geld bezahlt, das es gar nicht gibt.", meister: "Schuldscheine statt Münzen. Solange alle daran glauben, hält auch der Damm." },
    { text: "Ein kaiserlicher Prüfer reist unerkannt die Strecke ab und schreibt jede Herberge auf.", meister: "Mindestens einer reist. Vielleicht mehrere, vielleicht keiner im Auftrag der Kaiserin." }
  ],

  wetter: [
    {
      id: "fruehling", name: "Frühling", monde: "Tsa, Phex, Peraine",
      tabelle: [
        { von: 1, bis: 5, wetter: "Klar und frisch", folge: "Gutes Reisewetter." },
        { von: 6, bis: 10, wetter: "Wechselhaft mit Schauern", folge: "Keine Einbußen, aber nasse Kleider am Abend." },
        { von: 11, bis: 14, wetter: "Landregen", folge: "Unbefestigte Abschnitte werden schlammig. Wagen schaffen etwa ein Viertel weniger." },
        { von: 15, bis: 17, wetter: "Morgennebel", folge: "Bis Mittag kaum zwanzig Schritt Sicht." },
        { von: 18, bis: 19, wetter: "Frühjahrssturm", folge: "Baustellen ruhen, Bäume liegen quer. Etwa die halbe Tagesstrecke." },
        { von: 20, bis: 20, wetter: "Schmelzwasser", folge: "Natter und Darpat treten über die Ufer, Furten sind unpassierbar." }
      ]
    },
    {
      id: "sommer", name: "Sommer", monde: "Ingerimm, Rahja, Praios",
      tabelle: [
        { von: 1, bis: 6, wetter: "Sonnig und mild", folge: "Beste Reisezeit." },
        { von: 7, bis: 11, wetter: "Heiß und trocken", folge: "Staub auf der Straße. Pferde brauchen an jedem Rastplatz Wasser." },
        { von: 12, bis: 15, wetter: "Schwül, Gewitter am Abend", folge: "Wer lagert, sucht sich besser ein Dach." },
        { von: 16, bis: 17, wetter: "Unwetter mit Hagel", folge: "Ein halber Tag geht verloren, Zeltplanen reißen." },
        { von: 18, bis: 19, wetter: "Glühende Hitze", folge: "Lange Mittagsrast. Etwa ein Viertel weniger Strecke." },
        { von: 20, bis: 20, wetter: "Wolkenbruch", folge: "Gräben laufen über, ein Hang rutscht auf die Straße." }
      ]
    },
    {
      id: "herbst", name: "Herbst", monde: "Rondra, Efferd, Travia",
      tabelle: [
        { von: 1, bis: 4, wetter: "Golden und windstill", folge: "Gutes Reisewetter, viele Erntewagen auf der Straße." },
        { von: 5, bis: 9, wetter: "Windig und kühl", folge: "Keine Einbußen." },
        { von: 10, bis: 14, wetter: "Dauerregen", folge: "Schlamm auf allem, was noch nicht gepflastert ist. Etwa ein Viertel weniger Strecke." },
        { von: 15, bis: 17, wetter: "Nebel über den Auen", folge: "Bis Mittag schlechte Sicht, am Darpat den ganzen Tag." },
        { von: 18, bis: 19, wetter: "Herbststurm", folge: "Etwa die halbe Tagesstrecke. Gerüste auf den Baustellen sind in Gefahr." },
        { von: 20, bis: 20, wetter: "Erster Frost", folge: "Glatte Brücken am Morgen, die Herbergen sind plötzlich voll." }
      ]
    },
    {
      id: "winter", name: "Winter", monde: "Boron, Hesinde, Firun",
      tabelle: [
        { von: 1, bis: 4, wetter: "Klar und kalt", folge: "Gutes Vorankommen, kalte Nächte." },
        { von: 5, bis: 9, wetter: "Grau mit Nieselregen", folge: "Keine Einbußen, aber niemand ist gut gelaunt." },
        { von: 10, bis: 13, wetter: "Schneefall", folge: "Etwa ein Viertel weniger Strecke, im Tann um den Wandlether Hof die Hälfte." },
        { von: 14, bis: 16, wetter: "Frost und Glätte", folge: "Das neue Pflaster ist spiegelglatt. Wagen schaffen nur die halbe Strecke." },
        { von: 17, bis: 18, wetter: "Schneesturm", folge: "Reisen kaum möglich. Wer in einer Station ist, bleibt dort." },
        { von: 19, bis: 20, wetter: "Tauwetter", folge: "Schlamm und Hochwasser. Furten unpassierbar." }
      ]
    }
  ],

  tagesabschnitte: ["Morgen", "Mittag", "Abend", "Nacht"],

  namen: {
    maenner: ["Alrik", "Answin", "Bosper", "Brin", "Eberhelm", "Gerion", "Hagen", "Halmar", "Jost", "Kunibald", "Leomar", "Ludalf", "Lutz", "Praiodan", "Reto", "Roban", "Rondrigan", "Ulfried", "Wulfhart", "Yendor"],
    frauen: ["Adelinde", "Alwene", "Belinde", "Brunhild", "Ehrwalda", "Elida", "Gerlinde", "Griselda", "Hesindiane", "Ilma", "Irmhild", "Jalinda", "Kunigunde", "Leudara", "Mechthild", "Praiodane", "Rondrike", "Swanhild", "Ulinde", "Wunnhild"],
    familien: ["Ackermann", "Biberhof", "Blaufuß", "Brückner", "Dachser", "Eichinger", "Fuhrmann", "Grünwalder", "Hasenbein", "Holderbusch", "Kesselring", "Krummholz", "Lindtner", "Mühlbach", "Pflasterer", "Schwarzdorn", "Steinbeiß", "Tannhauser", "Wegener", "Zaunkönig"],
    tulamidischM: ["Achmad", "Dschafar", "Habled", "Hasrabal", "Jassafer", "Khalid", "Mherwed", "Raschid", "Sulman", "Yussuf"],
    tulamidischW: ["Azila", "Dschanna", "Fayala", "Haschabnah", "Laila", "Marhibo", "Nedime", "Rahjada", "Shanja", "Yasmina"],
    herbergen: ["Zum Goldenen Meilenstein", "Zur Gestempelten Gans", "Zum Lahmen Wechselpferd", "Zum Schiefen Siegel", "Zur Kaiserlichen Pfütze", "Zum Grünen Kessel", "Zur Fröhlichen Fuhre", "Zum Schlafenden Kurier", "Zum Roten Raben", "Zur Zwölften Rast", "Zum Krummen Pflaster", "Zur Warmen Ofenbank", "Zum Wilden Eber", "Zum Durstigen Ochsen", "Zur Alten Straße", "Zum Weißen Storch", "Zum Wachsamen Löwen", "Zur Rahjarose", "Zum Nassen Stiefel", "Zur Letzten Meile"],
    waren: ["Garether Tuch", "Salzfisch aus Perricum", "Wein aus Rabicum", "Kerzen und Weihrauch für die Schreine", "Stempelhefte und Lederhüllen", "Tinte und Pergament", "Hufeisen und Nägel", "Gewürze aus Aranien", "Rohwolle", "Töpferware", "getrocknete Heilkräuter", "Talismane mit Stationszeichen", "Werkzeug für Bauleute", "Stiefel und Wanderschuhe", "Seile und Planen", "Lampenöl", "Honig und Met", "Käse aus den Auen", "Würfel und Spielkarten", "Bauholz"],
    reisende: ["Stempelpilgerin mit halbvollem Heft", "Steinmetzgeselle auf Wanderschaft", "Schreiber der Kanzlei", "Viehtreiber mit Herde", "Kesselflicker", "Kräuterfrau", "Bote mit Ledertasche", "Beilunker Reiter", "Händler mit Ochsenkarren", "Adlige mit kleinem Gefolge", "Geweihter auf Visitation", "Gauklerpaar", "Bauer auf dem Weg zum Markt", "heimkehrende Söldnerin", "frisch vermähltes Paar", "Gelehrter mit Notizbuch", "Pilger aus dem Horasreich", "tulamidischer Kaufmann", "wandernder Bader", "Flussträger auf Arbeitssuche"],
    eigenheiten: ["spricht nur in Sprichwörtern", "zeigt jedem sein Stempelheft", "kaut ständig Süßholz", "kennt jede Herberge und ihren Wirt", "misstraut allem, was gepflastert ist", "zitiert das Edikt auswendig", "summt dieselbe Melodie", "hat für alles einen Rat", "fragt nach jedermanns Herkunft", "trägt zu feine Kleider für die Straße", "erzählt von einem Verwandten bei Hofe", "zählt laut die Meilensteine", "hat Angst vor Pferden", "flucht bei jedem Schritt", "verschenkt Äpfel", "reist mit einer Katze im Korb", "schreibt alles auf", "lacht zu laut", "betet an jedem Schrein", "behauptet, die Straße schon vor dem Edikt gekannt zu haben"]
  }
};
