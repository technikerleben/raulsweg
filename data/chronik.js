/* ==========================================================
   Chronik des Raulswegs
   ----------------------------------------------------------
   Jede gespielte Geschichte bekommt einen Eintrag, in der Reihenfolge,
   in der sie gespielt wurde (der neueste unten). Die Website zeigt den
   neuesten zuerst und verweist von Stationen, Figuren, Tempeln und
   Mächten auf die Geschichten, in denen sie vorkamen.

   Felder:
   id               kurz, klein, mit Bindestrichen (wird zur Adresse)
   titel            Name der Geschichte
   spielleitung     wer geleitet hat
   gespielt         Datum des Spielabends, z. B. "14.11.2026"
   aventurisch      optional, z. B. "Ende Peraine 1047 BF"
   orte             IDs der Stationen oder Städte, z. B. ["natterbruecke"]
   figuren          IDs der Figuren aus data/figuren.js, die vorkamen
   zusammenfassung  [Absätze] – was die Helden erlebt haben
   enthuellt        [{ ziel, variante, text }] – was am Tisch aufgedeckt wurde
                    ziel: "figur:<id>", "tempel:<id>", "station:<id>" oder "macht:<id>"
                    variante: optional "A", "B" oder "C", wenn eine der
                    möglichen Geheimnisse/Wahrheiten gilt; bei eigener Lösung weglassen
   veraenderungen   [{ ziel, text }] – was sich in der Welt geändert hat
   neu              [Texte] – neue Figuren, Orte, Dinge
   offen            [Texte] – lose Fäden für spätere Geschichten
   meister          optional: nur für Spielleitungen (z. B. was entschieden,
                    aber nicht enthüllt wurde)

   Was hier steht, gilt für alle späteren Geschichten.
   ========================================================== */

window.RW = window.RW || {};

RW.chronik = [

];
