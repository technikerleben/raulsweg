/* ==========================================================
   Dokumente: Texte, wie sie in Aventurien kursieren (Stufe 7)
   ----------------------------------------------------------
   Felder: id, titel, art, gruppe, herkunft, begriffe, kurz, text (HTML)
   Optional: meister (Satz), moeglichkeiten [3] für Briefe mit offenem Hintergrund
   gruppe: stellungnahmen | aushaenge | vordrucke | botenbriefe
   Die Texte sind Spielerwissen: Sie hängen öffentlich aus oder
   werden abgeschrieben und weitergereicht.
   ========================================================== */

window.RW = window.RW || {};

RW.dokumente = [
  {
    id: "stationsedikt",
    gruppe: "stellungnahmen",
    titel: "Das Stationsedikt",
    art: "Kaiserliches Edikt",
    herkunft: "Gegeben zu Gareth, ausgehängt an allen Toren der Reichsstraße",
    begriffe: [],
    kurz: "Der Wortlaut des Edikts, mit dem Kaiserin Rohaja die Straße von Gareth nach Perricum zur Musterstraße des Reiches erhebt.",
    text: `
      <p class="dok-anrede">Wir, Rohaja, von der Zwölfe Gnaden Kaiserin des Neuen Reiches, Hüterin des Greifenthrons zu Gareth, entbieten allen Fürsten, Grafen, Baronen, Vögten und Amtleuten, den Städten und Gemeinden, den Geweihten der Zwölfe und allen Untertanen, die Unser Wort erreicht, Unseren Gruß und Unsere Gnade.</p>
      <p>Das Reich lebt von seinen Wegen. Auf ihnen reisen Recht und Nachricht, Ware und Heer, Pilger und Gesandte. Ein Reich, dessen Wege verfallen, verliert seine Glieder, ehe es sein Haupt verliert. Darum haben Wir beschlossen, die Straße von Unserer Stadt Gareth bis an das Perlenmeer zu Perricum so auszubauen, dass sie allen Straßen des Reiches ein Vorbild sei, und verfügen:</p>
      <p><b>Erstens.</b> Entlang dieser Straße sollen in Abständen von etwa einer Tagesreise Stationen errichtet oder erweitert werden. Eine jede Station umfasse eine Kaiserpfalz für Uns, Unseren Hof und die Beamten des Reiches, ein Relais mit Wechselpferden und Poststube sowie Herbergen für alle anderen Reisenden.</p>
      <p><b>Zweitens.</b> Eine jede Station werde einer der Zwölfgöttlichen Mächte geweiht und trage deren Zeichen an Tor und Meilenstein, auf dass der Reisende an jedem Halt der Götter gedenke, die ihn schützen. Welcher Gottheit eine Station geweiht wird, bestimmen Unsere Kanzlei und die Kirchen gemeinsam nach dem Wesen des Ortes.</p>
      <p><b>Drittens.</b> Brücken sollen erneuert, Fahrbahnen gepflastert und Meilensteine gesetzt werden, deren Zählung am Osttor Unserer Stadt Gareth beginnt. Wo der alte Weg zu eng oder zu krumm ist, darf ein neuer gebaut werden.</p>
      <p><b>Viertens.</b> Für Bau und Verwaltung setzen Wir eine Kanzlei des Stationswesens ein, mit einem Wegemeister an ihrer Spitze und einer Stationskanzlei auf halbem Wege, die Rechnung führt über alles, was an der Straße gebaut, gepachtet und eingenommen wird. Ihren Weisungen ist an der Straße Folge zu leisten wie Unseren eigenen.</p>
      <p><b>Fünftens.</b> Die Herbergen der Stationen vergibt die Kanzlei zur Pacht an solche, die von gutem Ruf und geordneten Geschäften sind. Kein Pachtrecht darf vererbt, verkauft oder weiterverpachtet werden ohne Zustimmung der Kanzlei.</p>
      <p><b>Sechstens.</b> Wer im Auftrag oder auf Einladung Unseres Hofes reist, erhält von der Kanzlei einen Geleitbrief. Er öffnet die Pfalzen, gewährt Wechselpferde und Vorrang an den Kontrollen.</p>
      <p><b>Siebtens.</b> Die Benutzung der Straße ist frei für jedermann. Was an Zöllen an Brücken, Furten, Fähren und Kreuzungen rechtens erhoben wird, bleibt unberührt, soweit es nicht diesem Edikt widerspricht. Die Preise der Stationen für Pferde und Unterkunft werden von der Kanzlei festgesetzt und an jedem Tor angeschlagen.</p>
      <p><b>Achtens.</b> Wer die Straße, ihre Stationen, Brücken oder Meilensteine beschädigt, wer Baugut entwendet oder die Arbeiten behindert, wer falsche Geleitbriefe führt oder Unsere Siegel missbraucht, der verfällt der Strafe des Reiches. Die Kontrollposten der Straße sind befugt, Gepäck und Papiere zu prüfen.</p>
      <p><b>Neuntens.</b> Naht Unser Hofzug oder der Tross eines Fürsten des Reiches, so haben alle Reisenden den Weg freizugeben. Doch soll niemandem an den Stationen Obdach, Wasser und Feuer verweigert werden, gleich welchen Standes er sei.</p>
      <p>So geschehe es, zum Wohle des Reiches, zur Ehre der Zwölfe und zum Nutzen aller, die reisen.</p>
      <p class="dok-schluss">Gegeben zu Gareth, im Mond der Peraine.<br>Rohaja<br><span class="dok-siegel">Kaiserliches Siegel</span></p>
    `
  },
  {
    id: "brief-rabenmund",
    gruppe: "stellungnahmen",
    titel: "Offener Brief des Hauses Rabenmund",
    art: "Offener Brief",
    herkunft: "Gesiegelt zu Rommilys, abgeschrieben in den Schenken der Rommilyser Mark",
    begriffe: ["Rabenmund-Brief", "offenen Brief"],
    kurz: "Ein höflicher Brief an die Kaiserin, der die Streckenführung beklagt, ohne die Krone anzugreifen. Er wird in der Rommilyser Mark abgeschrieben und vorgelesen.",
    text: `
      <p class="dok-anrede">An Ihre Kaiserliche Majestät Rohaja, Hüterin des Greifenthrons, Unsere gnädigste Herrin,</p>
      <p>mit tiefer Ehrerbietung und in der Treue, die das Haus Rabenmund dem Greifenthron seit Generationen erweist, haben wir Euer Edikt über die Straße nach Perricum vernommen. Wir preisen den Weitblick, mit dem Ihr die Wege des Reiches stärken wollt. Kein Haus Darpatiens weiß besser als das unsere, was gute Straßen dem Reich bedeuten, denn über unsere Brücken und durch unsere Tore ziehen seit jeher die Händler, Boten und Heere zwischen Garetien und dem Osten.</p>
      <p>Umso größer ist unser Kummer, dass die neue Straße an der Kreuzung bei Rabensbrück nach Süden abbiegt und Rommilys, die Hauptstadt Darpatiens, umgeht. Gewiss haben Eure Ratgeber dies mit Sorgfalt erwogen. Doch erlauben wir uns, in aller Demut auf einige Dinge hinzuweisen, die ihnen entgangen sein mögen:</p>
      <p>Der Weg über Rommilys ist nicht weit länger als der neue. Er besitzt Brücken, Herbergen und Pferdewechsel, die nicht erst gebaut werden müssen, und eine Stadt, die einen reisenden Hof würdig empfangen kann. Die Mittel, die nun in Stationen auf freiem Feld fließen, könnten hier dem Reich doppelt dienen.</p>
      <p>Die alte Straße nach Rommilys wird, wenn der Verkehr ausbleibt, verfallen. Mit ihr verfallen die Dörfer an ihrem Rand, die Zölle, die dem Reich Gewinn bringen, und die Treue derer, die sich von der Krone vergessen fühlen. Schon hört man in den Schenken Spottnamen für die neue Straße, die wir nicht wiederholen wollen und die wir öffentlich missbilligen.</p>
      <p>Wir bitten Eure Majestät daher nicht um Widerruf, denn es steht uns nicht zu, Euer Wort zu tadeln. Wir bitten um Prüfung: ob nicht ein Zweig des neuen Weges über Rommilys geführt, ob nicht die alte Straße in den Schutz des Edikts gestellt und ob nicht eine Station auch in unserer Stadt eingerichtet werden könne. Rommilys steht bereit, Euch und Eurem Hof jederzeit Gastfreundschaft zu erweisen, wie es seit den Tagen Rauls des Großen Brauch ist.</p>
      <p>In unverbrüchlicher Treue und in der Hoffnung auf Eure gnädige Antwort</p>
      <p class="dok-schluss">für das Haus Rabenmund,<br>gegeben zu Rommilys<br><span class="dok-siegel">Siegel des Hauses Rabenmund</span></p>
    `
  },
  {
    id: "verlautbarung-paligan",
    gruppe: "stellungnahmen",
    titel: "Verlautbarung des Hauses Paligan",
    art: "Verlautbarung",
    herkunft: "Verlesen auf dem Markt zu Perricum und an den Stationen östlich von Gaulsfurt",
    begriffe: ["Paligan-Verlautbarung"],
    kurz: "Das Markgrafenhaus von Perricum feiert das Edikt als Segen für Handel, Flotte und Götterfurcht, und vergisst dabei die eigenen Rechte nicht.",
    text: `
      <p class="dok-anrede">Im Namen des Markgrafen von Perricum und des Hauses Paligan an alle Bürger der Stadt, an die Kaufleute, Schiffer und Handwerker, an die Geweihten der Zwölfe und an alle Reisenden, die in Frieden zum Perlenmeer kommen:</p>
      <p>Freut euch! Ihre Kaiserliche Majestät Rohaja hat in ihrer Weisheit beschlossen, die Straße von Gareth nach Perricum zur ersten Straße des Reiches zu machen. Was unsere Väter erträumt haben, wird nun gebaut: ein sicherer, gepflasterter Weg vom Herzen des Reiches bis an unseren Hafen, mit Herbergen, Wechselpferden und geweihten Stationen auf jeder Tagesreise.</p>
      <p>Perricum ist das Tor des Reiches zum Perlenmeer. Was aus Aranien, aus den Tulamidenlanden und von jenseits des Meeres zu uns kommt, Seide, Gewürze, Mondsilber und Weisheit, wird künftig in Tagen statt in Wochen in Gareth sein. Was Gareth zu bieten hat, gelangt ebenso schnell auf unsere Schiffe. Jeder Händler, der diese Straße befährt, wird es an seinem Beutel spüren, und jeder Handwerker in unserer Stadt an seinen Aufträgen.</p>
      <p>Die neue Straße stärkt auch den Schild des Reiches. Unsere Flotte, die das Perlenmeer bewacht, erhält Nachricht und Verstärkung aus der Hauptstadt schneller als je zuvor. Was die Beilunker Reiter, die in unserer Stadt gegründet wurden, im Galopp vermögen, vermag nun auch der Wagen.</p>
      <p>Vor allem aber ist dies ein Werk, das den Göttern gefällt. Zwölf Stationen, zwölf Weihen: Wer von Gareth zu uns reist, empfängt am Herd der Travia den ersten Segen und am Rosenhaus der Rahja den letzten, und dazwischen dankt er Praios für das Recht, Efferd für das Wasser, Phex für den Handel und Boron für die Ruhe der Toten. Nie war eine Reise frömmer, nie sicherer. Wir danken der Kaiserin, dass sie uns diesen Weg schenkt, und den Zwölfen, dass sie ihn schützen.</p>
      <p>Das Haus Paligan wird alles tun, um dieses Werk zu fördern. Es wird die Stationen auf seinem Gebiet schützen, die Arbeiter versorgen und den Reisenden Geleit geben, wie es von alters her das Recht und die Pflicht der Markgrafschaft ist. Die Zölle und Geleitrechte, die der Markgrafschaft seit jeher zustehen, bleiben dabei selbstverständlich gewahrt, zum Nutzen aller.</p>
      <p>Auf eine Straße, die Gareth und das Meer verbindet. Auf die Kaiserin. Auf Perricum.</p>
      <p class="dok-schluss">Gegeben zu Perricum, im Namen des Markgrafen<br><span class="dok-siegel">Siegel des Hauses Paligan</span></p>
    `
  }
];

/* ----------------------------------------------------------
   Vordrucke zum Ausfüllen (Handouts für die Helden)
   feld(was, breite) erzeugt eine leere Schreiblinie mit kleiner Beschriftung.
   ---------------------------------------------------------- */
(function () {
  const feld = (was, breite = 10) => `<span class="feld" data-was="${was}" style="min-width:${breite}em"></span>`;
  const kasten = "<span class=\"ankreuz\" aria-hidden=\"true\"></span>";

  RW.dokumente.push(
    {
      id: "geleitbrief",
      gruppe: "vordrucke",
      titel: "Geleitbrief der Kanzlei",
      art: "Vordruck",
      herkunft: "Ausgestellt von der Kanzlei des Stationswesens zu Gareth, eingetragen in Mardramund",
      begriffe: [],
      kurz: "Das Papier, das nach dem sechsten Artikel des Edikts die Pfalzen öffnet, Wechselpferde gewährt und an den Kontrollen Vorrang gibt. Zum Ausfüllen für die Helden.",
      text: `
      <p class="dok-kopf">Kanzlei des Stationswesens<br><span class="dok-kopf-zeile">Geleitbrief Nr. ${feld("Nummer", 5)}</span></p>
      <p class="dok-anrede">Kraft des sechsten Artikels des Edikts Ihrer Kaiserlichen Majestät Rohaja über die Straße von Gareth nach Perricum ergeht an alle Pfalzvögte, Relaismeister, Herbergswirte, Torwachen und Kontrollposten dieser Straße folgendes Geheiß:</p>
      <p>Der Inhaber dieses Briefes, ${feld("Name", 14)}, ${feld("Stand und Herkunft", 12)}, reist ${kasten} im Auftrag ${kasten} auf Einladung des Hofes, in Begleitung von ${feld("Zahl", 3)} Personen mit ${feld("Zahl", 3)} Pferden und ${feld("Zahl", 3)} Wagen.</p>
      <p>Ihm ist zu gewähren:</p>
      <p><b>Erstens.</b> Einlass in die Kaiserpfalzen der Stationen und Unterkunft nach seinem Rang.</p>
      <p><b>Zweitens.</b> Wechselpferde an den Relais, soweit vorhanden, zum angeschlagenen Preis, zu tragen ${kasten} von der Kanzlei ${kasten} vom Reisenden.</p>
      <p><b>Drittens.</b> Vorrang an den Kontrollen, unbeschadet des Rechts der Wachen, Gepäck und Papiere zu prüfen, wie es der achte Artikel bestimmt.</p>
      <p>Dieser Brief gilt von ${feld("Ort", 8)} bis ${feld("Ort", 8)}, vom ${feld("Tag", 7)} bis zum ${feld("Tag", 7)}, und nur in der Hand dessen, auf den er ausgestellt ist. Er ist an jeder Station vorzuzeigen und dort zu vermerken.</p>
      <p>Wer diesen Brief fälscht, verändert, verleiht oder verkauft, verfällt der Strafe des Reiches.</p>
      <p class="dok-schluss">Gegeben zu Gareth, am ${feld("Tag", 8)}<br>für den Kaiserlichen Wegemeister<br>${feld("Unterschrift", 12)}<br><span class="dok-siegel">Siegel der Kanzlei</span></p>
      <table class="dok-tabelle rueckseite">
        <caption>Rückseite: Vermerke der Stationen</caption>
        <thead><tr><th scope="col">Station</th><th scope="col">Tag</th><th scope="col">Pferde</th><th scope="col">Zeichen</th></tr></thead>
        <tbody>${["Nattersquell", "Hartsteen", "Sonnenfeld", "Rommilyser Kreuz", "Feste Hohenstein", "Natterbrücke", "Mardramund", "Wasserburg", "Wandlether Hof", "Gnitzenkuhl", "Gaulsfurt", "Rabicum"].map((s, i) => `<tr><td>${i + 1} ${s}</td><td></td><td></td><td></td></tr>`).join("")}</tbody>
      </table>`
    },
    {
      id: "leumundsbrief",
      gruppe: "vordrucke",
      titel: "Leumundsbrief der Stationskanzlei",
      art: "Vordruck",
      herkunft: "Ausgestellt in der Stationskanzlei zu Mardramund",
      begriffe: [],
      kurz: "Die Bescheinigung über guten Ruf und geordnete Geschäfte, ohne die niemand Stationen beliefern oder eine Pacht übernehmen darf. Zum Ausfüllen für die Helden.",
      text: `
      <p class="dok-kopf">Stationskanzlei zu Mardramund<br><span class="dok-kopf-zeile">Leumundsbrief, Register Nr. ${feld("Nummer", 5)}</span></p>
      <p class="dok-anrede">Die Stationskanzlei zu Mardramund, bestellt durch das Edikt Ihrer Kaiserlichen Majestät über die Straße nach Perricum, bescheinigt hiermit allen, die es angeht:</p>
      <p>${feld("Name", 14)}, ${feld("Gewerbe", 10)}, ansässig zu ${feld("Ort", 9)}, ist der Kanzlei bekannt als Person von gutem Ruf und geordneten Geschäften.</p>
      <p>Nach Prüfung der vorgelegten Bücher, Bürgschaften und Zeugnisse ist gegen die genannte Person nichts bekannt geworden: keine offene Schuld gegenüber dem Reich, kein Urteil wegen Betrugs, Unterschlagung oder Missbrauchs von Siegeln, keine Klage aus früheren Pachten.</p>
      <p>Für den guten Leumund bürgen mit Stand und Wohnort:<br>
        1. ${feld("Name, Stand, Wohnort", 20)}<br>
        2. ${feld("Name, Stand, Wohnort", 20)}</p>
      <p>Die genannte Person ist damit zugelassen</p>
      <p class="dok-auswahl">${kasten} zur Belieferung der Stationen mit ${feld("Ware", 10)}<br>
        ${kasten} zum Gebot auf die Pacht der Herberge zu ${feld("Station", 9)}<br>
        ${kasten} zum Handel auf den Märkten der Stationen</p>
      <p>Dieser Brief gilt ein Jahr und einen Tag. Er erlischt, sobald die genannte Person gegen das Edikt verstößt oder sich ihre Angaben als falsch erweisen. Gebühr entrichtet: ${feld("Betrag", 4)} Silbertaler.</p>
      <p class="dok-schluss">Gegeben zu Mardramund, am ${feld("Tag", 8)}<br>${feld("Unterschrift", 12)}<br>Odilo Federlein, Vorsteher der Stationskanzlei<br><span class="dok-siegel">Siegel der Stationskanzlei</span></p>`
    }
  );
})();

/* ----------------------------------------------------------
   Aushang: Preisanschlag der Kanzlei (aus data/preise.js)
   ---------------------------------------------------------- */
(function () {
  const P = RW.preise;
  if (!P) return;
  const gruppen = [...new Set(P.anschlag.map(a => a.gruppe))];
  const NAMEN = { Relais: "Relais und Post", Post: "", Herberge: "Herberge", Kanzlei: "Kanzlei", Frei: "Ohne Entgelt" };
  RW.dokumente.push({
    id: "preisanschlag",
    gruppe: "aushaenge",
    titel: "Preisanschlag der Kanzlei",
    art: "Aushang",
    herkunft: "Angeschlagen an jedem Stationstor, nach dem siebten Artikel des Edikts",
    begriffe: ["Preisanschlag"],
    kurz: "Was Wechselpferde, Post, Herberge und Kanzlei an den Stationen kosten dürfen. Hängt neben dem Tor, meist etwas verwittert.",
    text: `
      <p class="dok-kopf">Preise der Station<br><span class="dok-kopf-zeile">festgesetzt von der Kanzlei des Stationswesens</span></p>
      <p class="dok-anrede">Nach dem siebten Artikel des Edikts Ihrer Kaiserlichen Majestät gelten an dieser Station folgende Preise. Wer mehr verlangt, verstößt gegen das Edikt; wer mehr gezahlt hat, melde es dem Pfalzvogt.</p>
      <table class="dok-tabelle preis-tabelle">
        <thead><tr><th scope="col">Leistung</th><th scope="col">Preis</th></tr></thead>
        <tbody>${gruppen.map(g => (NAMEN[g] ? `<tr class="zwischen"><th scope="rowgroup" colspan="2">${NAMEN[g]}</th></tr>` : "") +
          P.anschlag.filter(a => a.gruppe === g).map(a => `<tr><td>${a.posten}${a.anmerkung ? `<small>${a.anmerkung}</small>` : ""}</td><td>${a.preis}</td></tr>`).join("")).join("")}</tbody>
      </table>
      <p class="dok-fuss">1 Dukat = 10 Silbertaler = 100 Heller = 1000 Kreuzer. Zölle an Brücken, Furten und Toren sind nicht inbegriffen.</p>
      <p class="dok-schluss">Für die Kanzlei<br><span class="dok-siegel">Siegel der Kanzlei</span></p>`
  });
})();

/* ----------------------------------------------------------
   Botenbriefe: ein Vordruck der Relaispost und Briefe, die
   unterwegs in falsche Hände geraten können. Was dahinter steckt,
   bleibt offen (moeglichkeiten).
   ---------------------------------------------------------- */
(function () {
  const feld = (was, breite = 10) => `<span class="feld" data-was="${was}" style="min-width:${breite}em"></span>`;
  const kasten = "<span class=\"ankreuz\" aria-hidden=\"true\"></span>";
  const zeilen = n => Array.from({ length: n }, () => `<span class="schreibzeile"></span>`).join("");

  RW.dokumente.push(
    {
      id: "botenbrief",
      gruppe: "vordrucke",
      titel: "Botenbrief der Relaispost",
      art: "Vordruck",
      herkunft: "Zu haben in jeder Poststube der Stationen, 2 Heller das Blatt",
      begriffe: [],
      kurz: "Ein Briefbogen mit Postvermerk, wie ihn die Poststuben ausgeben. Für Briefe, die die Helden selbst schreiben, oder für solche, die sie abfangen.",
      text: `
      <p class="dok-kopf">Relaispost des Raulswegs<br><span class="dok-kopf-zeile">Botenbrief</span></p>
      <p>An ${feld("Empfänger", 14)} zu ${feld("Ort oder Station", 10)}</p>
      <div class="schreibfeld">${zeilen(10)}</div>
      <p class="dok-schluss">${feld("Absender", 12)}</p>
      <div class="postvermerk">
        <p><b>Vermerk der Poststube</b></p>
        <p>Aufgegeben zu ${feld("Station", 9)} am ${feld("Tag", 6)} · Gebühr ${feld("Betrag", 4)}</p>
        <p>${kasten} gewöhnlich ${kasten} eilig ${kasten} durch die Beilunker Reiter</p>
        <p>Siegel bei Übergabe unversehrt: ${kasten} ja ${kasten} nein · Zeichen des Boten ${feld("Zeichen", 5)}</p>
      </div>`
    },
    {
      id: "brief-kreutzer",
      gruppe: "botenbriefe",
      titel: "Der Wegemeister an die Stationskanzlei",
      art: "Botenbrief",
      herkunft: "Relaispost, Siegel der Kanzlei, aufgegeben in Sonnenfeld, bestimmt für Mardramund",
      begriffe: [],
      kurz: "Answald Kreutzer bittet Odilo Federlein, Abrechnungen unter Verschluss zu halten. Wer ihn liest, fragt sich: vor wem?",
      text: `
      <p class="dok-anrede">Werter Vorsteher Federlein,</p>
      <p>die Abrechnungen der Station Natterbrücke für die letzten beiden Monde sind mir in einer Fassung zugegangen, die ich so nicht abgezeichnet habe. Ich bitte Euch, die Urschriften bis zu meiner Ankunft unter Verschluss zu halten und niemandem Einsicht zu gewähren, auch nicht Eurem Stellvertreter.</p>
      <p>Ferner: Die Rücklage für die Fundamente in Sonnenfeld ist nicht anzutasten, gleich wer danach fragt und mit welchem Siegel er kommt.</p>
      <p>Ich verlasse mich auf Eure Verschwiegenheit, wie Ihr Euch auf die meine verlassen könnt.</p>
      <p class="dok-schluss">A. K., Wegemeister<br><span class="dok-siegel">Siegel der Kanzlei</span></p>
      <p class="dok-nachschrift">Nachschrift: Verbrennt diesen Brief.</p>`,
      meister: "Federlein hat den Brief nicht verbrannt. Wie er unterwegs in andere Hände gerät, entscheidet die Spielleitung: liegengeblieben im Relais, von einem Boten verkauft, oder Federlein zeigt ihn selbst herum.",
      moeglichkeiten: [
        "Kreutzer ist einem Fälscher in seiner eigenen Kanzlei auf der Spur und will die Urschriften sichern, bevor jemand sie austauscht.",
        "Kreutzer will verhindern, dass jemand nachrechnet, was die Fundamente in Sonnenfeld wirklich gekostet haben, und warum.",
        "Der Brief ist nicht von Kreutzer. Jemand prüft, ob Federlein auf ein fremdes Siegel hin Akten herausgibt oder zurückhält."
      ]
    },
    {
      id: "brief-vanstein",
      gruppe: "botenbriefe",
      titel: "Ein Kontorbericht nach Perricum",
      art: "Botenbrief",
      herkunft: "Relaispost, ohne Wappen gesiegelt, an ein Postfach in Perricum",
      begriffe: [],
      kurz: "Ludeger Vanstein meldet seinen Auftraggebern, wie die Pachten stehen. Wer die Auftraggeber sind, steht nicht darin.",
      text: `
      <p class="dok-anrede">Verehrte Auftraggeber,</p>
      <p>wie gewünscht melde ich: Die Pacht der Herberge in Nattersquell ist zu dem genannten Gebot zu haben, sofern die Kanzlei bis zum Mond des Boron nicht anders entscheidet.</p>
      <p>Der Leumundsbrief aus Mardramund ist mir ohne Schwierigkeiten erteilt worden. Man hat keine Fragen gestellt, was ich als Entgegenkommen deute.</p>
      <p>In Gaulsfurt nimmt das Mondsilberkontor Eure Wechsel an, aber mit einem Abschlag, den ich für eine Beleidigung halte. Ich erbitte Weisung, ob ich weiter biete oder abwarte.</p>
      <p>Die Abschriften Eurer letzten Anweisungen bewahre ich, wie stets, sorgfältig auf.</p>
      <p class="dok-schluss">Euer ergebener<br>L. V.</p>
      <p class="dok-nachschrift">Postfach 17, Perricum, abzuholen gegen das bekannte Zeichen.</p>`,
      meister: "Der letzte Satz vor dem Gruß kann eine Höflichkeit sein oder eine Drohung. Wer das Postfach leert, ist offen.",
      moeglichkeiten: [
        "Vanstein sichert sich ab: Die Abschriften sind seine Versicherung, und der Satz ist an jemanden gerichtet, der ihn fallen lassen könnte.",
        "Vanstein ist so arglos, wie er klingt. Er hält den Leumundsbrief wirklich für Entgegenkommen und ahnt nicht, wer dafür bezahlt hat.",
        "Das Postfach leert ein Mittelsmann, der die Berichte an mehrere Häuser verkauft. Vanstein arbeitet ohne es zu wissen für alle."
      ]
    },
    {
      id: "brief-ugdalf",
      gruppe: "botenbriefe",
      titel: "Eine Einladung zur Jagd",
      art: "Botenbrief",
      herkunft: "Ohne Siegel, einem Rossknecht in Rabensbrück mitgegeben",
      begriffe: [],
      kurz: "Ugdalf von Rabenmund lädt einen Freund an die Kreuzung ein. Gejagt werden soll nicht Wild.",
      text: `
      <p class="dok-anrede">Bruder im Geiste!</p>
      <p>Am Abend nach dem Praiostag sind wir am Kreuz, dort, wo die Krähen sitzen. Bring die Hunde nicht mit, sie bellen.</p>
      <p>Der Fremde mit dem guten Wein hat versprochen, dass er wieder zahlt. Er sagt, die Gerüste am Hang stehen auf Sand, und wir wollen sehen, ob er recht hat.</p>
      <p>Kein Wort zu meinem Oheim. Was wir tun, tun wir für die Ehre des Hauses, auch wenn das Haus es noch nicht weiß.</p>
      <p class="dok-schluss">U.</p>`,
      meister: "Die Handschrift ist schwungvoll und fleckig, der Brief riecht nach Wein. Wer ihn findet, findet auch den Rossknecht, der ihn nie abgeliefert hat.",
      moeglichkeiten: [
        "Ugdalf meint es ernst und wird am Hang ein Gerüst lockern. Mit den übrigen Schäden am Weg hat er nichts zu tun.",
        "Ugdalf prahlt nur. Am Abend sitzen sie am Kreuz, trinken und reden, und niemand rührt ein Gerüst an.",
        "Der Fremde mit dem Wein ist der eigentliche Absender der Idee. Er wird nicht kommen, aber er wird wissen, wer kam."
      ]
    },
    {
      id: "brief-lehmkuhl",
      gruppe: "botenbriefe",
      titel: "Ruf ins Treidelhaus",
      art: "Botenbrief",
      herkunft: "Von Hand zu Hand unter den Flussträgern, geschrieben von Gesa Natterer",
      begriffe: [],
      kurz: "Bruna Lehmkuhl ruft alle Träger zusammen. Es geht um ein Angebot der Kanzlei und um das, was am Damm passiert ist.",
      text: `
      <p class="dok-anrede">An alle Träger zwischen Rabenbrücke und Hausen.</p>
      <p>Am Abend des nächsten Markttags im Treidelhaus. Jeder kommt, auch die Jungen.</p>
      <p>Es geht um das Angebot der Kanzlei und um das, was am Damm passiert ist. Wer den Mund nicht halten kann, bleibt zu Hause. Wer etwas weiß, sagt es mir und niemandem sonst.</p>
      <p class="dok-schluss">Bruna</p>
      <p class="dok-nachschrift">Geschrieben von Gesa, weil Bruna die Feder nicht mag.</p>`,
      meister: "Der Zettel geht durch viele Hände. Eine Abschrift landet früher oder später bei der Kanzlei, beim Bauaufseher oder bei den Helden.",
      moeglichkeiten: [
        "Bruna will herausfinden, ob ihr Schweigen über einen ihrer Träger noch zu halten ist, bevor das Angebot der Kanzlei kommt.",
        "Bruna hat selbst einmal Hand angelegt und will ihren Leuten einschärfen, dass so etwas nie wieder geschieht.",
        "Am Damm hat kein Träger etwas getan. Bruna lässt die Leute trotzdem rätseln, weil Angst vor den Trägern ihr bessere Bedingungen bringt."
      ]
    },
    {
      id: "brief-khorim",
      gruppe: "botenbriefe",
      titel: "Aus dem Mondsilberkontor",
      art: "Botenbrief",
      herkunft: "Relaispost, Siegel des Mondsilberkontors, von Gaulsfurt nach Perricum",
      begriffe: [],
      kurz: "Khorim ibn Dschelef warnt sein Haus vor den Wechseln der neuen Kontore und bittet um einen verständigen Menschen, den in Gaulsfurt niemand kennt.",
      text: `
      <p class="dok-anrede">An das ehrwürdige Haus zu Perricum, Friede über Euren Waagen.</p>
      <p>Drei Wechsel der neuen Kontore sind in diesem Mond bei mir eingegangen, alle auf dasselbe Haus in Perricum gezogen, dessen Namen ich hier nicht schreibe, weil Briefe Ohren haben.</p>
      <p>Der Damm bei Gnitzenkuhl wird mit Schuldscheinen bezahlt. Die Arbeiter tragen sie zu mir, um sie gegen Silber zu tauschen, zu einem Kurs, der mich nachts wach hält.</p>
      <p>Ich bitte Euch, dem Kontor, dem wir geliehen haben, nichts mehr zu geben, bis ich weiß, ob es zahlen kann. Schickt mir einen verständigen Menschen, den hier niemand kennt.</p>
      <p class="dok-schluss">Khorim, Wechselmeister zu Gaulsfurt<br><span class="dok-siegel">Siegel des Mondsilberkontors</span></p>`,
      meister: "Der verständige Mensch, den niemand kennt, können die Helden sein, wenn sie den Brief vor seinem Empfänger lesen.",
      moeglichkeiten: [
        "Khorim weiß den Namen des Hauses und verschweigt ihn, um ihn teuer zu verkaufen, notfalls an die Helden.",
        "Khorim weiß weniger, als er schreibt. Der Brief soll sein eigenes Haus beruhigen und ihm Zeit verschaffen.",
        "Khorims Haus hat dem Kontor tatsächlich viel geliehen. Der Brief ist ein Hilferuf, und das Silber ist vielleicht schon verloren."
      ]
    },
    {
      id: "brief-haselbach",
      gruppe: "botenbriefe",
      titel: "Siegelbericht einer Reiterin",
      art: "Botenbrief",
      herkunft: "Durch die Beilunker Reiter, an das Haupthaus in Gareth",
      begriffe: [],
      kurz: "Jorinde Haselbach meldet ihrem Haus, dass an den Relais Siegel nachgegossen worden sein könnten.",
      text: `
      <p class="dok-anrede">An den Hauptmann der Reiter im Haupthaus zu Gareth,</p>
      <p>ich melde, dass an drei Relais des Raulswegs Briefe mit Siegeln eingetroffen sind, die nicht so aussehen, wie sie aussehen sollten: zu glatt, zu frisch, das Wachs eine Spur zu dunkel. Ich habe die Siegel gezählt und gezeichnet, die Zeichnungen liegen bei.</p>
      <p>Ich beschuldige niemanden. Aber wer Briefe öffnet und wieder verschließt, tut es nicht aus Neugier, und er tut es dort, wo die Pferde gewechselt werden.</p>
      <p>Ich bitte um Weisung, ob ich weiter beobachte oder melde, und an wen.</p>
      <p class="dok-schluss">J. H., Reiterin<br><span class="dok-siegel">Siegel der Beilunker Reiter</span></p>`,
      meister: "Die Zeichnungen fehlen, wenn der Brief in andere Hände gerät. Wer sie herausgenommen hat, ist die erste Frage.",
      moeglichkeiten: [
        "Ein Kollege Jorindes öffnet Briefe an den Relais und verkauft Abschriften. Sie ist ihm dicht auf den Fersen.",
        "Jorinde verkauft selbst Nachrichten über Reisende und lenkt mit dem Bericht den Verdacht von sich weg.",
        "Die Siegel sind echt nachgegossen, aber im Auftrag der Kanzlei, die mitlesen will. Jorinde ahnt nicht, wen sie meldet."
      ]
    }
  );
})();
