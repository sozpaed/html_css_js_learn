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
- `js/modul2.js`: Listen, Tabellen und Bilder
- `js/modul3.js`: Verknüpfungen und Verweise

Die Vorschau läuft in einem eingeschränkten iframe: Neue Tabs und Downloads sind erlaubt, JavaScript bleibt gesperrt. Browser oder Zielseiten können Links und Downloads trotzdem einschränken. Relative Links auf eigene Dateien, Sprungmarken sowie E-Mail- und Telefonlinks bei Bedarf mit der gespeicherten HTML-Datei außerhalb der Vorschau ausprobieren. Eigene verlinkte Dateien und Bilder müssen separat im richtigen Ordner liegen.

## Neues Modul ergänzen
Neue Datei `js/modulN.js` nach dem Muster von `modul1.js` anlegen (Info, Aufgabe, Musterlösung, `checks`) und vor `app.js` einbinden. Jede Modul-Datei hängt ihr Modul per `window.MODULES.push(...)` an die Liste an.

Der Fortschritt wird anhand einer stabilen Foliennummer gespeichert: Ohne `speicher` ist dies der Index im Modul. Werden Folien eingefügt oder verschoben, müssen bestehende Folien ihre bisherige Nummer als `speicher` behalten; neue Folien erhalten eine bisher ungenutzte Nummer. `from` und `fromMod` beziehen sich weiterhin auf die aktuellen Array-Indizes.
