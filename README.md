# Lernpfad HTML, CSS und JavaScript – Mein Lebenslauf

Statische Lernplattform ohne Server, Anmeldung oder Build-Schritt. Fortschritt und Code bleiben im Browser (localStorage).

## Starten
- Lokal: `index.html` im Browser öffnen.
- Online: Repository auf GitHub hochladen, unter Settings > Pages den Branch `main` (Ordner `/`) veröffentlichen.

## Struktur
- `index.html`: Oberfläche (Navigation, Editor, Live-Vorschau, Prüfen, Reflexion)
- `css/style.css`: Gestaltung (hell/dunkel, responsiv)
- `js/app.js`: Plattform-Logik, für alle Module gleich
- `js/modul1.js`: Folien, Prüfungen und Modultest von Modul 1 (Gruppen M, R, E, Modultest mit Theorie- und Praxisteil)

## Neues Modul ergänzen
Neue Datei `js/modulN.js` nach dem Muster von `modul1.js` anlegen (Info, Aufgabe, Musterlösung, `checks`) und vor `app.js` einbinden. Jede Modul-Datei hängt ihr Modul per `window.MODULES.push(...)` an die Liste an.
