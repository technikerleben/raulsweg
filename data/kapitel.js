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
    <p>Dieser Band beschreibt die Strecke so, wie Reisende sie erleben: die Orte, ihre Herbergen und Tempel, die Gerüchte am Herdfeuer und die Spannungen, die unter der frischen Pflasterung liegen. Er enthält noch keine Handlung. Er ist eine Bühne, auf der eigene Abenteuer stattfinden können, und die Grundlage für die Kampagne <em>Auf dem Raulsweg</em>.</p>
    <p class="leise">Mit dem Schalter oben rechts lassen sich Meisterinformationen einblenden. Sie verraten, was hinter den Gerüchten steckt, ohne eine bestimmte Handlung vorzugeben.</p>
  `
};

RW.kapitel = {

  ueberblick: {
    titel: "Der Raulsweg im Überblick",
    html: `
      <p class="einleitung">Der Raulsweg ist keine neue Straße. Er ist eine alte Straße mit einem neuen Anspruch.</p>

      <h2>Von der Reichsstraße zum Raulsweg</h2>
      <p>Die Strecke von Gareth nach Perricum ist Teil der <strong>Reichsstraße 3</strong>, die von Elenvina über Angbar und Gareth bis an das Perlenmeer führt. Den östlichen Abschnitt ab der Feste Hohenstein nennt das Volk seit jeher den <strong>Darpatweg</strong>, weil er dem Lauf des Darpat folgt.</p>
      <p>Mit ihrem <strong>Stationsedikt</strong> hat Kaiserin Rohaja beschlossen, diesen Abschnitt zur Musterstraße des Reiches auszubauen. Als Kaiserin, die mehr reist als residiert, braucht sie verlässliche Orte, an denen der Hof übernachten, Recht sprechen und Nachrichten empfangen kann. In festen Abständen sollen Stationen mit Kaiserpfalz, Pferdewechsel und Herbergen entstehen. Brücken werden erneuert, Fahrbahnen gepflastert, Meilensteine gesetzt.</p>
      <p>Vorbild dafür sind die alten Pfalzen der Kaiserzeit, die etwa eine Tagesreise voneinander entfernt lagen. Neu ist, dass jede Station einem der Zwölfgötter geweiht wird und dass die Kanzlei die ganze Strecke nach einheitlichen Regeln verwaltet.</p>

      <h2>Zwei Namen für eine Straße</h2>
      <p>In Gareth heißt die Straße <strong>Raulsweg</strong>, nach Raul, dem Gründer des Reiches. Der Name soll sagen: Hier wird das Reich wieder so tatkräftig wie zu seinen besten Zeiten.</p>
      <p>In Rommilys nennt man sie <strong>Rohajas Rennbahn</strong>. Die Kanzlei hat entschieden, die Strecke nicht über Rommilys zu führen, sondern gerade nach Perricum. Für Haus Rabenmund und die Kaufleute der Stadt ist das eine Kränkung und ein Verlust. Der Spottname ist seither auch in Gareth bekannt, und wer ihn in einer Kaiserpfalz benutzt, erntet strenge Blicke.</p>

      <h2>Der Verlauf</h2>
      <p>Von Gareth führt der Raulsweg nach Osten über Nattersquell und Hartsteen durch das fruchtbare Herz Garetiens. Hinter der Kreuzung nach Rommilys zwängt er sich an der Feste Hohenstein durch eine Enge und folgt dann als Darpatweg dem Fluss: über die Natter, durch Wald und Sumpf, bis er bei Gaulsfurt den Darpat erreicht. Die letzten Meilen führen durch Weinberge nach Perricum.</p>
      <div id="streckenband-platz"></div>
      <div id="entfernungen-platz"></div>
      <p class="leise">Die Entfernungen zwischen Gaulsfurt, Rabicum und Perricum sowie von Gareth nach Nattersquell stammen aus offiziellen Quellen. Die übrigen sind aus den Kartenkoordinaten geschätzt und sollten bei Bedarf auf avesmaps.de nachgemessen werden.</p>

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
      <p>Nach dem Edikt besteht jede vollständige Station aus drei Teilen:</p>
      <h3>Die Kaiserpfalz</h3>
      <p>Das größte Gebäude der Station ist dem Hof, den Reichsbeamten und hohen Gästen vorbehalten. Gewöhnliche Reisende werden hier nicht aufgenommen, ganz gleich, wie viel sie zahlen könnten. Ist der Hof nicht anwesend, verwaltet ein Pfalzvogt das Haus. Reisen zwei hohe Gesellschaften gleichzeitig, erhält die ranghöhere die Pfalz, die andere muss mit dem Gästeflügel vorliebnehmen. Das sorgt für viel Ärger und noch mehr Stoff für Gerüchte.</p>
      <h3>Das Relais</h3>
      <p>Hier stehen frische Pferde für Boten und für Reisende mit Wechselrecht. Die Beilunker Reiter haben an vielen Stationen eigene Ställe gepachtet, an anderen müssen sie sich die Pferde mit den Kurieren der Kanzlei teilen. Das Relais ist auch die Poststelle der Station: Briefe werden hier abgegeben, versiegelt und weitergeleitet.</p>
      <h3>Die Herbergen</h3>
      <p>Für alle anderen gibt es Herbergen, vom Schlafsaal bis zur guten Stube. Die Herbergen der Stationen werden von der Kanzlei verpachtet. Wer eine solche Pacht erhält, verdient an jedem Reisenden des Raulswegs. Entsprechend begehrt sind die Pachtrechte.</p>

      <h2>Die Weihe der Stationen</h2>
      <p>Jede der zwölf Stationen ist einem der Zwölfgötter geweiht. Ein kleiner Schrein oder Tempel gehört zu jeder Station, und das Emblem der Gottheit ziert Tor, Meilenstein und Stempel. Die Reihenfolge folgt nicht dem Kalender, sondern dem Charakter des Ortes: Travia empfängt die Reisenden in Nattersquell, Rahja verabschiedet sie in Rabicum.</p>

      <h2>Papiere</h2>
      <h3>Der Geleitbrief</h3>
      <p>Wer im Auftrag oder auf Einladung des Hofes reist, erhält von der Kanzlei einen Geleitbrief. Er öffnet die Türen der Kaiserpfalzen, gewährt Wechselpferde und beschleunigt die Kontrollen.</p>
      <h3>Der Leumundsbrief</h3>
      <p>Weil schon in den ersten Monaten des Baus Gelder versickert sind, verlangt die Kanzlei von allen, die Stationen beliefern oder Pachten übernehmen wollen, einen Leumundsbrief. Er bescheinigt einen untadeligen Ruf, geordnete Geschäfte und keine offenen Schulden gegenüber dem Reich. Ausgestellt wird er in Mardramund. Wie gründlich dort geprüft wird, ist umstritten.</p>
      <h3>Der Stationsstempel</h3>
      <p>Viele Reisende lassen sich an jeder Station einen Stempel mit dem Emblem der Gottheit in ein Büchlein drücken. Was als Nachweis für Boten begann, ist inzwischen eine Mode geworden. Wer alle zwölf Stempel besitzt, gilt als jemand, der den Raulsweg wirklich bereist hat.</p>

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
      <p class="leise">Schätzwerte für die gesamte Strecke von etwa 240 Meilen auf ausgebauter Straße, keine Regelwerte. Hochwasser an der Natter, Kontrollen an der Feste Hohenstein und Festtage können jede Reise erheblich verlängern.</p>
      <p>Der Unterschied zwischen dem Tempo eines Adelstrosses und dem eines Beilunker Reiters ist gewaltig. Eine Nachricht aus Gareth kann einen langsam reisenden Hof noch auf halber Strecke einholen, und ein Bericht, der in Mardramund abgeschickt wird, ist in Perricum, lange bevor sein Absender dort ankommt.</p>

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
        <p>Wenn die Helden mit einem Tross reisen, legt die Gruppe etwa eine Station pro Tag zurück, das Tempo der Tōkaidō. Das gibt jedem Ort Raum. Wird es eilig, können die Helden den Tross verlassen und mit Wechselpferden vorausreiten. Dann zählen die Relais, die Geleitbriefe und die Gunst der Beilunker Reiter.</p>
      </div>
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
      <dl class="glossar">
        <dt><strong>Darpatweg</strong></dt><dd>Volkstümlicher Name des Abschnitts der Reichsstraße 3 von der Feste Hohenstein nach Perricum.</dd>
        <dt><strong>Geleitbrief</strong></dt><dd>Schreiben der Kanzlei, das Zugang zu den Kaiserpfalzen und Wechselpferden gewährt.</dd>
        <dt><strong>Kaiserpfalz</strong></dt><dd>Hauptgebäude einer Station, dem Hof und hohen Gästen vorbehalten.</dd>
        <dt><strong>Leumundsbrief</strong></dt><dd>Bescheinigung über untadeligen Ruf und geordnete Geschäfte. Pflicht für Lieferanten und Pächter.</dd>
        <dt><strong>Pfalzvogt</strong></dt><dd>Verwalter einer Kaiserpfalz in Abwesenheit des Hofes.</dd>
        <dt><strong>Relais</strong></dt><dd>Pferdewechsel und Poststelle einer Station.</dd>
        <dt><strong>Rohajas Rennbahn</strong></dt><dd>Spottname für den Raulsweg, aus Rommilys.</dd>
        <dt><strong>Stationsedikt</strong></dt><dd>Erlass der Kaiserin, mit dem der Ausbau des Raulswegs beschlossen wurde.</dd>
        <dt><strong>Wegemeister</strong></dt><dd>Kaiserlicher Beamter, der für den Bau der Strecke verantwortlich ist.</dd>
      </dl>

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

/* Ausbaustufen des Bandes – erscheinen auf der Seite „Bauplan“ */
RW.ausbaustufen = [
  { nr: 1, titel: "Grundgerüst", text: "Kapitel, zwölf Stationen mit Bildern, Streckenband, Entfernungen, Reisezeiten, Meisterinformationen ein- und ausblendbar.", erledigt: true },
  { nr: 2, titel: "Figuren", text: "Zwei bis drei Figuren pro Station und durchreisende Personen; Figurenkarten mit Porträt, Rolle, Motiv und Spielwerten; Übersicht aller Figuren." },
  { nr: 3, titel: "Gebäude und Orte", text: "Kaiserpfalz, Relais, Herbergen und Tempel je Station; einfache Grundrisse für wichtige Schauplätze." },
  { nr: 4, titel: "Karte und Strecke", text: "Interaktives Streckenband im Stil einer Bildrolle, Reisezeitrechner, Wegpunkte zwischen den Stationen." },
  { nr: 5, titel: "Mächte und Netz", text: "Ausführliche Profile der Mächte am Weg, Beziehungsdiagramm, Meisterhintergrund zu den Geldflüssen am Weg." },
  { nr: 6, titel: "Spielhilfen", text: "Zufallsbegegnungen je Abschnitt, Gerüchtetabellen (W20), Wetter, Namen für Herbergen, Händler und Reisende." },
  { nr: 7, titel: "Handouts", text: "Geleitbrief, Leumundsbrief, Stationsstempel-Heft zum Sammeln, Botenbriefe." },
  { nr: 8, titel: "Abenteuer", text: "Die vier Abenteuer der Kampagne Auf dem Raulsweg als eigener Meisterbereich, verknüpft mit Stationen und Figuren." },
  { nr: 9, titel: "Export", text: "Druckansicht, PDF und gegebenenfalls EPUB." }
];
