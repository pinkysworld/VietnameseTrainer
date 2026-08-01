# Chào nhà · Vietnamesisch für den Alltag

[![Deploy to GitHub Pages](https://github.com/pinkysworld/VietnameseTrainer/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/pinkysworld/VietnameseTrainer/actions/workflows/deploy-pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-f2b84b.svg)](LICENSE)

Ein freundlicher, mobiler Browser-Trainer für Menschen, die süd-vietnamesisches Vietnamesisch im Alltag lernen möchten. Er hilft beim Hören, Nachsprechen, Wiederholen und Verstehen von gebräuchlichen Wörtern und kurzen Sätzen – ohne Konto, Werbung oder Server.

**Live:** [minh.systems/VietnameseTrainer](https://minh.systems/VietnameseTrainer/)

## Was die App kann

- Rund 80 alltagstaugliche Startkarten aus Begrüßung, Familie, Zuhause, Essen, Bitten, Gefühlen, Antworten und unterwegs.
- Deutsch als Hauptsprache und Englisch als zusätzliche Bedeutungsstütze.
- Süd-vietnamesische Aussprachehinweise, Silbentrennung und verständliche Tonerklärung.
- Vietnamesische System-Sprachausgabe in normalem und langsamem Tempo.
- Aufnahme und Wiedergabe der eigenen Aussprache direkt im Browser – ohne automatische, potenziell irreführende Bewertung.
- Kurze Tagesrunden mit lokalen Wiederholungen.
- Einstellbare Tagesziele, Lernserie, Themenfortschritt und Markierung häufig schwieriger Karten.
- Hörverständnis ohne sichtbaren Text, Mini-Dialoge und ein Anrede-Trainer für typische Gesprächssituationen.
- Eigene Karten für Vokabeln, Namen und Formulierungen aus dem persönlichen Alltag.
- Als Progressive Web App installierbar und nach dem ersten Besuch offline nutzbar.

## Schnellstart

Voraussetzungen: aktuelle Node.js-LTS-Version und npm.

```bash
git clone https://github.com/pinkysworld/VietnameseTrainer.git
cd VietnameseTrainer
npm ci
npm run dev
```

Vite zeigt anschließend die lokale Adresse an (normalerweise `http://localhost:5173`). Für einen Produktions-Build:

```bash
npm run build
npm run preview
```

`npm run build` prüft TypeScript und erstellt die veröffentlichbaren Dateien in `dist/`.

## Lernen mit der App

1. Starte mit **Meine Tagesrunde** und bewerte jede Karte ehrlich als „Noch üben“, „Fast“ oder „Konnte ich“.
2. Tippe auf **Hören** oder **½× langsam** und sprich erst nach, wenn der Satz vertraut klingt.
3. Nimm deinen Versuch auf und höre ihn direkt neben dem Vorbild an.
4. Tippe oben rechts auf den Stimmnamen, um eine andere vietnamesische Systemstimme auszuwählen. Die Auswahl bleibt auf diesem Gerät erhalten.
5. Ergänze im Bereich **Eigene** Wörter, die für dich besonders relevant sind.
6. Nutze **Hören**, **Dialoge** und **Anreden**, um Wörter im Zusammenhang statt nur als Karte zu üben.

Die App vermittelt nützliche Aussprache- und Wortschatzgrundlagen; sie ersetzt keine muttersprachliche Rückmeldung. Vietnamesische Anreden hängen von Alter, Beziehung und Kontext ab – die Karten weisen darauf hin, wenn eine Anpassung nötig ist.

## Datenschutz und Browser-Berechtigungen

- Es gibt keine Anmeldung, keine Analyse- oder Werbedienste und keinen App-Server.
- Lernfortschritt, eigene Karten und die gewählte Stimme werden ausschließlich in `localStorage` dieses Browsers gespeichert.
- Aufnahmen werden nur temporär im Browser gehalten und beim Neuladen nicht gespeichert oder übertragen.
- Das Mikrofon wird erst nach einem bewussten Tipp auf **Aufnehmen** angefragt. Es funktioniert zuverlässig nur auf `localhost` oder über HTTPS.
- Die Sprachausgabe nutzt ausschließlich die installierten Systemstimmen des Geräts. Qualität und verfügbare Stimmen unterscheiden sich je nach Browser und Betriebssystem.

## Offline und Installation

Nach dem ersten vollständigen Besuch speichert die App ihre Oberfläche und Lerninhalte für die Offline-Nutzung. In unterstützten Browsern erscheint der Button **Auf dem Handy installieren**. Auf iPhone/iPad lässt sie sich über Safari mit **Teilen → Zum Home-Bildschirm** hinzufügen.

Persönliche Daten bleiben weiterhin browserlokal. Ein Wechsel des Browsers oder ein Löschen von Website-Daten entfernt sie; eine Synchronisierung ist bewusst nicht Teil der aktuellen Version.

## GitHub Pages

Ein Push nach `main` löst den Workflow [Deploy to GitHub Pages](.github/workflows/deploy-pages.yml) aus. Er installiert die gesperrten Abhängigkeiten, baut die Anwendung und veröffentlicht `dist/` über GitHub Pages.

Die Vite-Basis ist auf `/VietnameseTrainer/` gesetzt. Dadurch funktionieren Assets sowohl unter der GitHub-Pages-Projektadresse als auch unter der eingerichteten Live-Domain. Details zur Architektur, Inhaltspflege und zum Deployment stehen in [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

## Mitwirken

Beiträge sind willkommen. Bitte:

1. Erstelle einen Branch von `main`.
2. Halte Lernkarten kurz, kontextbezogen und vorsichtig bei Anreden bzw. regionalen Aussagen.
3. Führe vor einem Pull Request `npm run build` aus.
4. Beschreibe bei Änderungen an Lerninhalten die Quelle oder den sprachlichen Prüfkontext im Pull Request.

## Lizenz

Copyright © 2026 Michel Nguyen. Dieses Projekt ist unter der [MIT-Lizenz](LICENSE) veröffentlicht.
