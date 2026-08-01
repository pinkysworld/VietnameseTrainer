# Chào nhà · Vietnamesisch-Familientrainer

Ein kleiner, lokaler Browser-Trainer für süd-vietnamesischen Familienalltag. Die App speichert Lernfortschritt und persönliche Karten ausschließlich im Browser dieses Geräts.

## Starten

```bash
npm install
npm run dev
```

Dann die angezeigte lokale Adresse im Browser öffnen. Für eine veröffentlichungsfähige Version:

```bash
npm run build
```

Das Ergebnis liegt in `dist/` und kann auf jeden statischen Webhoster geladen werden.

## Live-Version

Nach jedem Push auf `main` baut GitHub Actions die Anwendung und veröffentlicht sie über GitHub Pages unter `https://pinkysworld.github.io/VietnameseTrainer/`.

## Browser-Hinweise

- Die Sprachausgabe verwendet die vietnamesische Systemstimme des Geräts. Ist keine Stimme verfügbar, zeigt die App einen Hinweis; die Qualität kann zwischen Geräten variieren.
- Selbstaufnahmen benötigen Mikrofonfreigabe und funktionieren am zuverlässigsten über HTTPS oder auf `localhost`.
- Persönliche Karten und der Fortschritt bleiben lokal. Ein Zurücksetzen löscht nur diese lokalen Daten.
