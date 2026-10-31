#!/usr/bin/env node
/* Druckt die Vordrucke (Geleitbrief, Leumundsbrief, Botenbrief) und den Preisanschlag als A4-PDF nach export/.
   Aufruf im Wurzelverzeichnis: node tools/vordrucke.js   (braucht Playwright mit Chromium) */
"use strict";
const path = require("path");
const { chromium } = require("playwright");

const WURZEL = path.join(__dirname, "..");
const VORDRUCKE = ["geleitbrief", "leumundsbrief", "botenbrief", "preisanschlag"];

(async () => {
  const browser = await chromium.launch();
  for (const id of VORDRUCKE) {
    const seite = await browser.newPage();   // je Vordruck frisch laden
    await seite.goto(`file://${path.join(WURZEL, "index.html")}#/dokumente/${id}`);
    await seite.waitForSelector(`#${id} .dok-blatt`);
    await seite.evaluate(() => document.fonts.ready);
    // dieselbe Einzeldruck-Ansicht wie der Knopf „Als Handout drucken“
    await seite.evaluate(ziel => { document.getElementById(ziel).classList.add("druck-ziel"); document.body.classList.add("druck-einzeln"); }, id);
    await seite.emulateMedia({ media: "print" });
    const datei = path.join(WURZEL, "export", `vordruck-${id}.pdf`);
    await seite.pdf({ path: datei, format: "A4", margin: { top: "15mm", bottom: "15mm", left: "18mm", right: "18mm" } });
    await seite.close();
    console.log("geschrieben:", path.relative(WURZEL, datei));
  }
  await browser.close();
})();
