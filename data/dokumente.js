/* ==========================================================
   Dokumente: Texte, wie sie in Aventurien kursieren (Stufe 7)
   ----------------------------------------------------------
   Felder: id, titel, art, herkunft, begriffe, kurz, text (HTML)
   Die Texte sind Spielerwissen: Sie hängen öffentlich aus oder
   werden abgeschrieben und weitergereicht.
   ========================================================== */

window.RW = window.RW || {};

RW.dokumente = [
  {
    id: "stationsedikt",
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
