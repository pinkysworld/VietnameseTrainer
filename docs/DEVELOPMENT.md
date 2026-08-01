# Entwicklung und Betrieb

## Architektur

Die Anwendung ist eine statische React-18-/TypeScript-App, gebaut mit Vite. Sie benötigt keinen Backend-Dienst.

| Bereich | Umsetzung |
| --- | --- |
| Oberfläche und Lernfluss | `src/App.tsx` |
| Startwortschatz | `src/data.ts` |
| Web-Speech-Ausgabe | `src/audio.ts` |
| Lokale Speicherung | `src/storage.ts` |
| Datenformen | `src/types.ts` |
| Gestaltung | `src/styles.css` |
| Dialoge und Anrede-Szenarien | `src/practice.ts` |

Der Startwortschatz umfasst 80 Karten. Karten enthalten vietnamesischen Text, deutsche und englische Bedeutung, Lautbrücke, Silbentrennung, Kontext und Kategorie. Eigene Karten werden mit derselben Form angelegt und in die Wiederholungen eingereiht. Zusätzlich gibt es Hörverständnis ohne sichtbaren Text, Mini-Dialoge mit Antwortwahl und Anrede-Situationen; die Hörübungen aktualisieren den lokalen Lernfortschritt der zugrundeliegenden Karte.

## Lokale Daten

Die App speichert nur einen versionsgebundenen Eintrag in `localStorage` (`chao-nha-v1.0`). Er enthält:

- Wiederholungsstatus jeder gesehenen Karte;
- persönliche Karten;
- die gewünschte tägliche Kartenzahl;
- die ausgewählte Systemstimme.
- Lernserie und Bestwert der Serie.

Das Zurücksetzen in der App entfernt ausschließlich diesen Eintrag. Änderungen am Schema müssen die bestehende Version entweder sicher lesen können oder einen klaren Migrationspfad erhalten.

## Audio und Aussprache

Die App verwendet `SpeechSynthesis` und ausschließlich Stimmen, deren Sprachkennung mit `vi` beginnt. Sie bevorzugt lokal verfügbare, als hochwertig erkennbare Stimmen und hält nach einer Auswahl genau diese `voiceURI` fest.

Wenn beim wiederholten Tippen noch eine Wiedergabe aktiv ist, wird sie beendet und der neue Satz erst nach einer kurzen technischen Pause gestartet. Das verhindert, dass Browser in eine Ersatz- oder Warteschlangenstimme wechseln. Dennoch wird die tatsächliche Klangqualität vom Gerät bestimmt; die sichtbare Stimmwahl ist deshalb bewusst Teil der Oberfläche.

Eigene Ausspracheaufnahmen verwenden `MediaRecorder`. Sie bleiben nur als temporäre Objekt-URL in der aktuellen Sitzung. Browserberechtigungen dürfen nie beim Laden der App angefragt werden.

## Lerninhalte pflegen

Neue Standardkarten gehören in `src/data.ts`. Bitte dabei:

- die bestehende Kategorie verwenden oder Kategorie, Navigation und Styling bewusst erweitern;
- nicht von einer einzigen Alters-, Geschlechts- oder Beziehungssituation ausgehen;
- süd-vietnamesische Aussprachehinweise von der geschriebenen Standardform unterscheiden;
- keine automatischen Ausspracheurteile oder absolute Sprachbehauptungen hinzufügen;
- vor dem Merge eine muttersprachliche oder qualifizierte sprachliche Prüfung einholen.

## Qualitätssicherung

Vor jedem Push ausführen:

```bash
npm ci
npm run build
```

Manuell in einem aktuellen Safari und Chrome prüfen:

- mobile Darstellung und untere Navigation;
- normale sowie langsame Wiedergabe mehrerer Karten nacheinander;
- Wechsel der Systemstimme;
- Mikrofonfreigabe, Aufnahme, Wiedergabe und Verweigerungsfall;
- Anlegen einer persönlichen Karte und Fortbestand nach Neuladen;
- Tagesrunde inklusive aller drei Bewertungsoptionen.

## Deployment

`.github/workflows/deploy-pages.yml` veröffentlicht ausschließlich bei einem Push nach `main` oder per manuellem Workflow-Start. Der Workflow verwendet `npm ci`, um exakt den in `package-lock.json` festgelegten Abhängigkeitsbaum einzusetzen, baut mit `npm run build` und lädt `dist/` als GitHub-Pages-Artefakt hoch.

Nach einem Deploy sollten sowohl der erfolgreiche Actions-Lauf als auch die veröffentlichte Seite kontrolliert werden. Für Mikrofonfunktionen muss die Live-Domain HTTPS verwenden.

## PWA und Offline-Verhalten

`public/manifest.webmanifest` beschreibt die installierbare Anwendung. `public/sw.js` registriert einen bewusst kleinen Service Worker: Er speichert die App-Hülle beim Installieren und legt erfolgreich geladene same-origin Ressourcen in einem Laufzeit-Cache ab. Navigationen fallen bei fehlender Verbindung auf die gespeicherte App-Hülle zurück.

Bei Änderungen an Offline-Verhalten oder statischen Kernressourcen muss der Cache-Name in `public/sw.js` erhöht werden. Teste danach einen frischen Erstbesuch, trenne die Verbindung und lade die App erneut. Es gibt keinen Offline-Cache für externe Systemstimmen oder Webfonts; die Lernfunktionen selbst bleiben jedoch bedienbar.
