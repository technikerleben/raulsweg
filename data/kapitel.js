/* ==========================================================
   Kapiteltexte (HTML in Template-Strings)
   Meisterinformationen stehen in <div class="meister">…</div>
   und sind nur sichtbar, wenn der Umschalter aktiv ist.
   ========================================================== */

window.RW = window.RW || {};

RW.titel = {
  untertitel: "Ein Quellenband zur neuen Kaiserstraße von Gareth nach Perricum",
  einleitung: `
    <p class="einleitung">Zwölf Stationen liegen zwischen der Kaiserstadt und dem Perlenmeer. Manche sind fertig und geweiht, andere stehen noch auf Gerüsten, und an mindestens einer wird um jeden Stein gestritten. Kaiserin Rohaja nennt die Straße ein Werk der Ordnung. In Gareth heißt sie der Raulsweg. In Rommilys heißt sie Rohajas Rennbahn.</p>
    <p>Dieser Band beschreibt die Strecke so, wie Reisende sie erleben: die Orte, ihre Herbergen und Tempel, die Gerüchte am Herdfeuer und die Spannungen, die unter der frischen Pflasterung liegen. Er enthält keine Handlung. Er ist eine gemeinsame Bühne: Wer aus der Runde Lust hat, leitet hier eine eigene kleine Geschichte, und jede gespielte Geschichte macht den Raulsweg reicher.</p>
    <p class="leise">Mit dem Schalter oben rechts lassen sich Meisterinformationen einblenden. Sie bieten mehrere Möglichkeiten, was hinter den Gerüchten stecken könnte, und legen sich bewusst nicht fest. Wie das gemeint ist, steht unter <a href="#/spielleitung">Für Spielleitungen</a>.</p>
  `
};

RW.kapitel = {

  ueberblick: {
    titel: "Der Raulsweg im Überblick",
    html: `
      <p class="einleitung">Der Raulsweg ist keine neue Straße. Er ist eine alte Straße mit einem neuen Anspruch.</p>

      <h2>Von der Reichsstraße zum Raulsweg</h2>
      <p>Die Strecke von Gareth nach Perricum ist Teil der <strong>Reichsstraße 3</strong>, die von Elenvina über Angbar und Gareth bis an das Perlenmeer führt. Den östlichen Abschnitt ab der Feste Hohenstein nennt das Volk seit jeher den <strong>Darpatweg</strong>, weil er dem Lauf des Darpat folgt.</p>
      <p>Mit ihrem <strong>Stationsedikt</strong> hat Kaiserin Rohaja beschlossen, diesen Abschnitt zur Musterstraße des Reiches auszubauen. Als Kaiserin, die mehr reist als residiert, braucht sie verlässliche Orte, an denen der Hof übernachten, Recht sprechen und Nachrichten empfangen kann. In festen Abständen sollen Stationen mit Kaiserpfalz, Pferdewechsel und Herbergen entstehen. Brücken werden erneuert, Fahrbahnen gepflastert, Meilensteine gesetzt. Den <a href="#/dokumente/stationsedikt">Wortlaut des Edikts</a> und was Rommilys und Perricum dazu sagen, findet sich unter <a href="#/dokumente">Dokumente</a>.</p>
      <p>Vorbild dafür sind die alten Pfalzen der Kaiserzeit, die etwa eine Tagesreise voneinander entfernt lagen. Neu ist, dass jede Station einem der Zwölfgötter geweiht wird und dass die Kanzlei die ganze Strecke nach einheitlichen Regeln verwaltet.</p>

      <h2>Zwei Namen für eine Straße</h2>
      <p>In Gareth heißt die Straße <strong>Raulsweg</strong>, nach Raul, dem Gründer des Reiches. Der Name soll sagen: Hier wird das Reich wieder so tatkräftig wie zu seinen besten Zeiten.</p>
      <p>In Rommilys nennt man sie <strong>Rohajas Rennbahn</strong>. Die Kanzlei hat entschieden, die Strecke nicht über Rommilys zu führen, sondern gerade nach Perricum. Für Haus Rabenmund und die Kaufleute der Stadt ist das eine Kränkung und ein Verlust. Der Spottname ist seither auch in Gareth bekannt, und wer ihn in einer Kaiserpfalz benutzt, erntet strenge Blicke.</p>

      <h2>Der Verlauf</h2>
      <p>Von Gareth führt der Raulsweg nach Osten über Nattersquell und Hartsteen durch das fruchtbare Herz Garetiens, immer ein Stück nördlich der Natter. Am Rommilyser Kreuz verlässt er die alte Straße, die geradeaus nach Rommilys weiterläuft, und wendet sich nach Südosten. An der Feste Hohenstein zwängt er sich durch eine Enge, folgt dem Nordufer der Natter und quert sie an der Natterbrücke kurz vor ihrer Mündung. Von dort begleitet er als Darpatweg den Darpat nach Süden über Mardramund nach Wasserburg, dann durch den Wandlether Forst und nach Osten durch Sumpf und Felder über Gaulsfurt. Die letzten Meilen führen durch Weinberge nach Perricum.</p>
      <div id="streckenband-platz"></div>
      <p>Wie die Strecke durch das Land läuft, zeigt die <a href="#/karte/strecke">Karte des Raulswegs</a>.</p>
      <div id="entfernungen-platz"></div>
      <p class="leise">Die Entfernungen bis Hartsteen, zur Feste Hohenstein und nach Mardramund stammen aus der Routenplanung von avesmaps.de entlang der Reichsstraße 3. Die übrigen, mit ~ gekennzeichnet, sind auf der Karte gemessen oder liegen an erfundenen Orten zwischen zwei gemessenen Punkten. Wasserburg ist für gleichmäßigere Tagesetappen 10 Meilen näher an Mardramund gerückt.</p>

      <div class="meister">
        <p class="meister-titel">Meisterinformationen: Wann spielt der Band?</p>
        <p>Der Band legt sich bewusst nicht auf ein Jahr fest. Er setzt voraus, dass Rohaja regiert und der Ausbau des Raulswegs seit ein bis zwei Jahren läuft. So lässt er sich an die eigene Kampagnenchronologie anpassen.</p>
      </div>
    `
  },

  stationswesen: {
    titel: "Das Stationswesen",
    html: `
      <p class="einleitung">Eine Station ist mehr als eine Herberge. Sie ist ein kleines Stück Kaiserreich am Straßenrand.</p>

      <h2>Aufbau einer Station</h2>
      <p>Nach dem Edikt besteht jede vollständige Station aus drei Teilen. Wie das aussieht, zeigt der Grundriss der <a href="#/karte/musterstation">Musterstation</a>.</p>
      <h3>Die Kaiserpfalz</h3>
      <p>Das größte Gebäude der Station ist dem Hof, den Reichsbeamten und hohen Gästen vorbehalten. Gewöhnliche Reisende werden hier nicht aufgenommen, ganz gleich, wie viel sie zahlen könnten. Ist der Hof nicht anwesend, verwaltet ein Pfalzvogt das Haus. Reisen zwei hohe Gesellschaften gleichzeitig, erhält die ranghöhere die Pfalz, die andere muss mit dem Gästeflügel vorliebnehmen. Das sorgt für viel Ärger und noch mehr Stoff für Gerüchte.</p>
      <h3>Das Relais</h3>
      <p>Hier stehen frische Pferde für Boten und für Reisende mit Wechselrecht. Die Beilunker Reiter haben an vielen Stationen eigene Ställe gepachtet, an anderen müssen sie sich die Pferde mit den Kurieren der Kanzlei teilen. Das Relais ist auch die Poststelle der Station: Briefe werden hier abgegeben, versiegelt und weitergeleitet.</p>
      <h3>Die Herbergen</h3>
      <p>Für alle anderen gibt es Herbergen, vom Schlafsaal bis zur guten Stube. Die Herbergen der Stationen werden von der Kanzlei verpachtet. Wer eine solche Pacht erhält, verdient an jedem Reisenden des Raulswegs. Entsprechend begehrt sind die Pachtrechte.</p>

      <h2>Die Weihe der Stationen</h2>
      <p>Jede der zwölf Stationen ist einem der Zwölfgötter geweiht. Ein kleiner Schrein oder Tempel gehört zu jeder Station, und das Emblem der Gottheit ziert Tor, Meilenstein und Stempel. Die Reihenfolge folgt nicht dem Kalender, sondern dem Charakter des Ortes: Travia empfängt die Reisenden in Nattersquell, Rahja verabschiedet sie in Rabicum.</p>
      <p>Alle Schreine, Kapellen und Tempel mit ihren Bräuchen und Stempeln stehen im <a href="#/tempel">Tempelverzeichnis</a>.</p>

      <h2>Papiere</h2>
      <h3>Der Geleitbrief</h3>
      <p>Wer im Auftrag oder auf Einladung des Hofes reist, erhält von der Kanzlei einen Geleitbrief. Er öffnet die Türen der Kaiserpfalzen, gewährt Wechselpferde und beschleunigt die Kontrollen.</p>
      <h3>Der Leumundsbrief</h3>
      <p>Weil schon in den ersten Monaten des Baus Gelder versickert sind, verlangt die Kanzlei von allen, die Stationen beliefern oder Pachten übernehmen wollen, einen Leumundsbrief. Er bescheinigt einen untadeligen Ruf, geordnete Geschäfte und keine offenen Schulden gegenüber dem Reich. Ausgestellt wird er in Mardramund. Wie gründlich dort geprüft wird, ist umstritten.</p>
      <h3>Der Stationsstempel</h3>
      <p>Viele Reisende lassen sich an jeder Station einen Stempel mit dem Emblem der Gottheit in ein Büchlein drücken. Was als Nachweis für Boten begann, ist inzwischen eine Mode geworden. Wer alle zwölf Stempel besitzt, gilt als jemand, der den Raulsweg wirklich bereist hat.</p>
      <p>Die Kanzlei gibt dafür kleine Hefte in rotem Leder aus. Innen haben sie eine einzige Doppelseite mit zwölf Feldern, sechs links, sechs rechts, und daneben Platz für das Datum. Was danach noch hineingedrückt wird, etwa die Bärentatze aus Blitztann, findet irgendwo am Rand Platz.</p>
      <figure class="station-bild"><img src="img/stempelheft.webp" alt="Ein aufgeschlagenes Stempelheft mit zwölf Stempeln und einer Bärentatze" loading="lazy"><figcaption>Ein Stempelheft am Ende der Reise: alle zwölf Stempel und die Bärentatze aus Blitztann.</figcaption></figure>
      <p class="leise">Ein Stempelheft zum Ausdrucken gibt es im <a href="#/anhang">Anhang</a>.</p>

      <h2>Kontrollposten</h2>
      <p>Der wichtigste Kontrollposten ist die Feste Hohenstein. Daneben gibt es Zollstellen an Brücken und Kreuzungen. Die Wachen prüfen Papiere und Gepäck und suchen gezielt nach Schmuggelware, gefälschten Geleitbriefen und Baumaterial, das von den Baustellen verschwunden ist.</p>

      <div class="meister">
        <p class="meister-titel">Meisterinformationen: Wer verdient am Stationswesen?</p>
        <p>Die Kanzlei baut und verwaltet, aber sie betreibt nicht selbst. Pachten, Lieferverträge und Zölle verteilen das Geld des Raulswegs auf viele Hände. Genau hier liegt der Kern der Konflikte entlang der Strecke: Fast jede Partei hat ein Interesse daran, wie diese Rechte vergeben werden, und nur wenige daran, dass es durchschaubar geschieht.</p>
      </div>
    `
  },

  reisen: {
    titel: "Reisen auf dem Raulsweg",
    html: `
      <p class="einleitung">Wie lange die Reise dauert, hängt weniger von der Straße ab als davon, wer reist.</p>

      <h2>Reisezeiten</h2>
      <div id="reisezeiten-platz"></div>
      <p class="leise">Schätzwerte für die gesamte Strecke von etwa 326 Meilen auf ausgebauter Straße, keine Regelwerte. Hochwasser an der Natter, Kontrollen an der Feste Hohenstein und Festtage können jede Reise erheblich verlängern.</p>
      <p>Der Unterschied zwischen dem Tempo eines Adelstrosses und dem eines Beilunker Reiters ist gewaltig. Eine Nachricht aus Gareth kann einen langsam reisenden Hof noch auf halber Strecke einholen, und ein Bericht, der in Mardramund abgeschickt wird, ist in Perricum, lange bevor sein Absender dort ankommt.</p>
      <p>Was zwischen zwei Stationen am Weg liegt, Dörfer, Brücken, Schenken und kleine Begegnungen, steht unter <a href="#/unterwegs">Zwischen den Stationen</a>.</p>

      <h2>Wetter und Jahreszeiten</h2>
      <ul>
        <li><strong>Frühling:</strong> Die Natter führt Schmelzwasser. Die Furt ist oft tagelang unpassierbar.</li>
        <li><strong>Sommer:</strong> Beste Reisezeit, aber in Gnitzenkuhl sind die Mücken am schlimmsten. Weinfeste in Rabicum.</li>
        <li><strong>Herbst:</strong> Erntezeit auf den Feldern um Sonnenfeld. Viele Fuhrwerke, viel Staub.</li>
        <li><strong>Winter:</strong> Der Wald um den Wandlether Hof ist verschneit, die Straße wird schwer. Der Hof reist im Winter selten.</li>
      </ul>

      <h2>Etikette auf der Straße</h2>
      <p>Naht ein Hofzug oder der Tross eines hohen Adligen, reiten Vorläufer voraus und fordern alle Reisenden auf, den Weg freizugeben und sich zu verneigen. Wer sitzen bleibt, beleidigt nicht nur den Adligen, sondern die Ordnung des Reiches.</p>
      <p>In den Stationen bestimmt der Rang, wer wo schläft. Ein Ritter weicht einem Baron, ein Baron einem Grafen. Gegen Geld lässt sich daran wenig ändern, gegen einen Geleitbrief der Kanzlei dagegen viel. Viele Streitigkeiten auf dem Raulsweg beginnen mit der Frage, wer das bessere Zimmer verdient.</p>

      <h2>Gebühren und Zölle</h2>
      <p>Die Benutzung des Raulswegs ist frei, doch Brücken, Fähren, Furten und manche Kreuzungen sind zollpflichtig. Die Stationen verlangen für Wechselpferde und Unterkunft festgelegte Preise, die an jedem Tor angeschlagen sind. Die Flussträger an der Natter verlangen, was der Wasserstand hergibt.</p>

      <div class="meister">
        <p class="meister-titel">Meisterinformationen: Reisetempo als Spannungsmittel</p>
        <p>Wenn die Helden mit einem Tross reisen, legt die Gruppe etwa eine Station pro Tag zurück. Das gibt jedem Ort Raum. Wird es eilig, können die Helden den Tross verlassen und mit Wechselpferden vorausreiten. Dann zählen die Relais, die Geleitbriefe und die Gunst der Beilunker Reiter.</p>
      </div>
    `
  },

  spielleitung: {
    titel: "Für Spielleitungen",
    html: `
      <p class="einleitung">Der Raulsweg gehört nicht einer Spielleitung, sondern der ganzen Runde. Jede und jeder kann hier eine eigene Geschichte leiten, an einer Station oder über mehrere hinweg.</p>

      <h2>Eine offene Welt</h2>
      <p>Der Band beschreibt Orte, Figuren, Mächte und Spannungen, aber keine Handlung. Was an einer Station geschieht, entscheidet die Spielleitung, die dort eine Geschichte erzählt. Wer am nächsten Abend leitet, baut auf dem auf, was die Runde erlebt hat.</p>

      <h2>Möglichkeiten statt Geheimnisse</h2>
      <p>Weil alle in der Runde die Meisterinformationen lesen können, legt der Band keine festen Wahrheiten fest. Jede Figur hat drei <strong>mögliche Geheimnisse</strong>, manche Tempel haben mehrere <strong>mögliche Wahrheiten</strong>. Für die eigene Geschichte gilt:</p>
      <ul>
        <li>Wähle eine Möglichkeit, verbinde zwei oder erfinde eine eigene.</li>
        <li>Was du nicht brauchst, bleibt offen. Eine Figur, deren Geheimnis in deiner Geschichte keine Rolle spielt, hat für die nächste Spielleitung noch alle Möglichkeiten.</li>
        <li>Was am Tisch einmal enthüllt wurde, gilt. Die nächste Spielleitung baut darauf auf, statt es umzuschreiben.</li>
      </ul>
      <p>So weiß auch eine Spielerin, die den Band kennt, nie sicher, was hinter einer Figur steckt.</p>

      <h2>Was offen bleibt</h2>
      <p>Einige Fragen hält der Band über alle Geschichten hinweg offen. Spielleitungen dürfen Spuren legen und Andeutungen machen, aber keine Geschichte beantwortet sie endgültig:</p>
      <ul>
        <li>Wer hinter den neuen Kontoren steht.</li>
        <li>Wer über Albrin Korst steht, falls jemand über ihm steht.</li>
        <li>Ob die vielen Schwierigkeiten am Raulsweg zusammenhängen oder nur zufällig gleichzeitig auftreten.</li>
      </ul>

      <h2>Werkzeugkasten</h2>
      <p>Was der Band für eine eigene Geschichte bereithält, und wo es steht:</p>
      <ul>
        <li><strong>Schauplätze:</strong> zwölf Stationen mit Vorlesetext, Gerüchten und Konflikt, dazu ein <a href="#/karten">Plan für jede Station</a>.</li>
        <li><strong>Unterwegs:</strong> <a href="#/unterwegs">Wegpunkte zwischen den Stationen</a>, jeder mit einer kurzen Szene zum Einstreuen.</li>
        <li><strong>Menschen:</strong> <a href="#/figuren">Figuren</a> mit je drei möglichen Geheimnissen und die <a href="#/maechte">Mächte am Weg</a>, die hinter ihnen stehen.</li>
        <li><strong>Glaube:</strong> <a href="#/tempel">zwölf Tempel</a> mit Bräuchen, Stempeln und schwelenden Konflikten.</li>
        <li><strong>Handouts:</strong> das <a href="#/dokumente">Edikt und die Stellungnahmen</a> aus Rommilys und Perricum sowie das Stempelheft unter <a href="#/anhang/zum-mitnehmen">Zum Mitnehmen</a>.</li>
        <li><strong>Reisen:</strong> <a href="#/reisen">Reisezeiten, Wetter und Etikette</a> und die <a href="#/ueberblick/der-verlauf">Entfernungen</a>.</li>
      </ul>
      <p>Die Meisterinformationen blendet der Schalter oben rechts ein. Wer leitet, schaltet sie ein; wer spielt, lässt sie aus.</p>

      <h2>Was festgehalten wird</h2>
      <p>Nach jeder Geschichte lohnt es sich, kurz festzuhalten, was sich verändert hat: welche Geheimnisse enthüllt wurden, wer gestorben, verschwunden oder neu aufgetaucht ist und wie die Stationen jetzt dastehen. Daraus entsteht mit der Zeit die <a href="#/chronik">Chronik des Raulswegs</a>. Dort steht auch eine Vorlage für den Eintrag.</p>
    `
  },

  anhang: {
    titel: "Anhang",
    html: `
      <h2>Kanon und Ergänzungen</h2>
      <p>Der Band verbindet offizielles Material mit eigenen Ergänzungen. Beides ist gekennzeichnet:</p>
      <ul>
        <li><span class="marke-kanon">Kanon</span> Der Ort existiert in offiziellen Quellen. Beschreibungen, Stationen und Konflikte sind trotzdem Interpretationen dieses Bandes.</li>
        <li><span class="marke-eigen">Ergänzung</span> Der Ort wurde für diesen Band erfunden, an einem unbenannten Wegpunkt der Reichsstraße 3.</li>
      </ul>
      <p>Das Stationsedikt, der Name Raulsweg, die Weihe der Stationen und alle Figuren sind Erfindungen dieses Bandes.</p>

      <h2>Bauzustand</h2>
      <ul>
        <li><span class="bau bau-fertig">fertig</span> Station vollständig in Betrieb.</li>
        <li><span class="bau bau-erweiterung">Erweiterung</span> Bestehender Ort, die Station wird ausgebaut.</li>
        <li><span class="bau bau-rohbau">Rohbau</span> Station im Bau, nur eingeschränkt nutzbar.</li>
      </ul>

      <h2>Glossar</h2>
      <div id="glossar-platz"></div>

      <h2>Zum Mitnehmen</h2>
      <p>Den ganzen Band gibt es auch als <a href="export/der-raulsweg.epub" download>EPUB für E-Reader</a>, mit Meisterinformationen in umrandeten Kästen und Bildern in Graustufen.</p>
      <figure class="station-bild"><img src="img/stempelheft.webp" alt="Ein ausgefülltes Stempelheft des Raulswegs" loading="lazy"><figcaption>So sieht ein Stempelheft am Ende der Reise aus.</figcaption></figure>
      <p>Für den Spieltisch gibt es das <a href="export/stempelheft.pdf" download>Stempelheft des Raulswegs</a> als PDF (vier Seiten A5) und als <a href="export/stempelheft-a4-bogen.pdf" download>Druckbogen für A4</a>: ein Blatt beidseitig über die kurze Kante drucken und in der Mitte falten.</p>

      <h2>Quellen</h2>
      <ul>
        <li><a href="https://de.wiki-aventurica.de/wiki/Reichsstra%C3%9Fe_3" target="_blank" rel="noopener">Wiki Aventurica: Reichsstraße 3</a></li>
        <li><a href="https://de.wiki-aventurica.de/wiki/Gareth" target="_blank" rel="noopener">Wiki Aventurica: Gareth</a></li>
        <li><a href="https://de.wiki-aventurica.de/wiki/Gaulsfurt" target="_blank" rel="noopener">Wiki Aventurica: Gaulsfurt</a></li>
        <li><a href="https://de.wiki-aventurica.de/wiki/Perricum" target="_blank" rel="noopener">Wiki Aventurica: Perricum</a></li>
        <li><a href="https://avesmaps.de/?strasse=Reichsstra%C3%9Fe_3" target="_blank" rel="noopener">avesmaps.de: Reichsstraße 3</a></li>
      </ul>
      <p>Vorbild für Aufbau und Stimmung ist die japanische Tōkaidō, die Straße von Edo nach Kyōto mit ihren 53 Stationen, und Hiroshiges Holzschnittserie über sie.</p>
    `
  }
};

/* Glossar – Begriffe werden im ganzen Band automatisch verlinkt.
   begriffe: weitere Schreibweisen, die ebenfalls verlinkt werden */
RW.glossar = [
  { id: "darpatweg", name: "Darpatweg", begriffe: [], text: "Volkstümlicher Name des Abschnitts der Reichsstraße 3 von der Feste Hohenstein nach Perricum." , mehr: ["#/karte/strecke", "Zur Streckenkarte"] },
  { id: "geleitbrief", name: "Geleitbrief", begriffe: ["Geleitbriefe", "Geleitbriefs"], text: "Schreiben der Kanzlei, das Zugang zu den Kaiserpfalzen und Wechselpferden gewährt." , mehr: ["#/stationswesen/der-geleitbrief", "Mehr zum Geleitbrief"] },
  { id: "kaiserpfalz", name: "Kaiserpfalz", begriffe: ["Kaiserpfalzen"], text: "Hauptgebäude einer Station, dem Hof und hohen Gästen vorbehalten." , mehr: ["#/karte/musterstation", "Zum Grundriss der Musterstation"] },
  { id: "leumundsbrief", name: "Leumundsbrief", begriffe: ["Leumundsbriefe"], text: "Bescheinigung über untadeligen Ruf und geordnete Geschäfte. Pflicht für Lieferanten und Pächter, ausgestellt in Mardramund." , mehr: ["#/stationswesen/der-leumundsbrief", "Mehr zum Leumundsbrief"] },
  { id: "pfalzvogt", name: "Pfalzvogt", begriffe: ["Pfalzvögte", "Pfalzvogts"], text: "Verwalter einer Kaiserpfalz in Abwesenheit des Hofes." },
  { id: "relais", name: "Relais", begriffe: [], text: "Pferdewechsel und Poststelle einer Station." , mehr: ["#/karte/musterstation", "Zum Grundriss der Musterstation"] },
  { id: "rohajas-rennbahn", name: "Rohajas Rennbahn", begriffe: [], text: "Spottname für den Raulsweg, aus Rommilys." },
  { id: "stationsedikt", name: "Stationsedikt", begriffe: ["Edikt", "Edikts"], text: "Erlass der Kaiserin, mit dem der Ausbau des Raulswegs beschlossen wurde." , mehr: ["#/dokumente/stationsedikt", "Zum Wortlaut"] },
  { id: "stationsstempel", name: "Stationsstempel", begriffe: [], text: "Stempel mit dem Emblem der Stationsgottheit, den sich Reisende in ein Büchlein drücken lassen." , mehr: ["#/stationswesen/der-stationsstempel", "Mehr zum Stationsstempel"] },
  { id: "baerenstempel", name: "Bärenstempel", begriffe: ["Bärentatze"], text: "Besonderer Stempel aus Blitztann, den nur bekommt, wer den Firunsgang allein geht.", mehr: ["#/tempel/jaegerschrein-wandleth", "Zum Jägerschrein"] },
  { id: "feidewaldstrasse", name: "Feidewaldstraße", begriffe: [], text: "Die alte Reichsstraße, die am Rommilyser Kreuz geradeaus nach Rommilys weiterläuft.", mehr: ["#/karte/kreuz", "Zum Plan der Kreuzung"] },
  { id: "firunsgang", name: "Firunsgang", begriffe: ["Firunsgangs"], text: "Pilgerweg allein, zu Fuß und ohne Feuer von Gräfenweiche nach Blitztann.", mehr: ["#/tempel/jaegerschrein-wandleth", "Zum Jägerschrein"] },
  { id: "stempelheft", name: "Stempelheft", begriffe: ["Stempelhefte", "Stempelheften"], text: "Kleines Heft der Kanzlei mit einer Doppelseite für die zwölf Stationsstempel.", mehr: ["#/stationswesen/der-stationsstempel", "Mehr zum Stempelheft"] },
  { id: "wegemeister", name: "Wegemeister", begriffe: [], text: "Kaiserlicher Beamter, der für den Bau der Strecke verantwortlich ist." }
];

/* Ausbaustufen des Bandes – erscheinen auf der Seite „Bauplan“ */
RW.ausbaustufen = [
  { nr: 1, titel: "Grundgerüst", text: "Kapitel, zwölf Stationen mit Bildern, Streckenband, Entfernungen, Reisezeiten, Meisterinformationen ein- und ausblendbar, automatische Querverweise mit Vorschau, Rückverweise, Suche, Tag- und Nachtansicht.", erledigt: true },
  { nr: 2, titel: "Figuren", text: "Zwei Figuren pro Station und vier Reisende auf der ganzen Strecke, mit Rolle, Erscheinung, Auftreten, Motiv, Zitat und drei möglichen Geheimnissen; Porträts; Übersicht aller Figuren. Offen: Spielwerte.", erledigt: true },
  { nr: 3, titel: "Gebäude und Orte", text: "Grundriss der Musterstation und ein Plan für jede der zwölf Stationen, mit Legende (vorhanden). Offen: Obergeschosse und Innenstädte von Gareth und Perricum.", erledigt: true },
  { nr: 4, titel: "Karte und Strecke", text: "Karte der ganzen Strecke nach avesmaps.de, Entfernungen nach der Routenplanung, Wegpunkte mit Szenen zwischen den Stationen (vorhanden). Offen: Reisezeitrechner.", erledigt: true },
  { nr: 5, titel: "Mächte und Netz", text: "Ausführliche Profile der Mächte am Weg, Beziehungsdiagramm, Meisterhintergrund zu den Geldflüssen am Weg." },
  { nr: 6, titel: "Spielhilfen", text: "Zufallsbegegnungen je Abschnitt, Gerüchtetabellen (W20), Wetter, Namen für Herbergen, Händler und Reisende." },
  { nr: 7, titel: "Handouts", text: "Stempelheft als PDF zum Drucken, Dokumente: Stationsedikt, offener Brief des Hauses Rabenmund, Verlautbarung des Hauses Paligan (vorhanden). Offen: Geleitbrief, Leumundsbrief, Botenbriefe." },
  { nr: 8, titel: "Geschichten am Raulsweg", text: "Chronik der gespielten Geschichten mit Eintragsvorlage, Verweisen von Stationen, Figuren, Tempeln und Mächten und Markierung der geltenden Möglichkeiten (vorhanden). Offen: Vorlage für eigene Szenarien." },
  { nr: 9, titel: "Export", text: "Druckansicht, PDF und gegebenenfalls EPUB." }
];
