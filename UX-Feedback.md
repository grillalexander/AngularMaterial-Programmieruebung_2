# UX Review ActiveTogether

Repo: https://github.com/grillalexander/AngularMaterial-Programmieruebung_2

## UX Feedback Punkte

Hab mir die App durchgeschaut und dabei ein paar Sachen gefunden die man verbessern könnte:

### 1. Keine Bestätigung wenn man sich anmeldet
Wenn man das Formular abschickt passiert einfach nichts. Man weiß nicht ob es funktioniert hat oder nicht, das ist echt nervig.

Hab dann einen Snackbar eingebaut der "Anmeldung erfolgreich hinzugefügt!" anzeigt wenns geklappt hat.

Status: gemacht

---

### 2. Löschen ohne Bestätigung
Man kann einfach so eine Anmeldung löschen ohne dass gefragt wird. Hab mich schon mal vertippt und dann war die Anmeldung weg.

Jetzt gibt es einen Dialog der fragt ob man wirklich löschen will. Zeigt auch Name und Kurs an damit man weiß was gelöscht wird.

Status: gemacht

---

### 3. Navigation zeigt nicht wo man ist
Die Links in der Navigation sehen alle gleich aus. Man sieht nicht ob man auf Dashboard oder About ist.

Hab die aktive Seite jetzt hervorgehoben - andere Farbe, fett und mit Strich drunter.

Status: gemacht

---

### 4. Datum Format
Die Geburtsdaten werden als "2024-11-13" angezeigt. Sieht nicht so gut aus.

Hab das jetzt mit der DatePipe auf "13.11.2024" geändert.

Status: gemacht

---

### 5. Fehler werden nicht angezeigt
Wenn was schief geht sieht man nichts. Fehler kommt nur in die Konsole.

Jetzt werden Fehler dem Nutzer angezeigt für alle Backend Sachen (Kurse laden, Anmeldungen laden, hinzufügen, löschen).

Status: gemacht

---

### 6. About Seite ist leer
Die About Seite zeigt nur "about works!" - sieht nicht gut aus.

Hab eine richtige About Seite gemacht mit Infos über die App.

Status: gemacht (extra)

---

### 7. Kein Spinner beim Laden
Wenn Kurse geladen werden steht nur Text da. Spinner wäre besser.

Könnte man noch machen.

Status: nicht gemacht

---

### 8. Dropdown leer wenn keine Kurse
Wenn keine Kurse da sind ist das Dropdown einfach leer.

Könnte man verbessern.

Status: teilweise (gibt schon einen Hinweis)

---

### 9. Tastatur Navigation
Man kann nicht alles mit Tastatur bedienen.

Könnte man noch verbessern, Material hat schon etwas aber könnte mehr sein.

Status: teilweise

---

### 10. Keine Tooltips
Buttons haben keine Tooltips.

Könnte man noch hinzufügen, gibt schon aria-label aber Tooltip wäre besser.

Status: teilweise

---

## Zusammenfassung

Insgesamt 10 Punkte gefunden.

5 davon implementiert:
1. Bestätigung nach Formular
2. Bestätigung beim Löschen
3. Navigation hervorheben
4. Datum formatieren
5. Fehler anzeigen

Extra gemacht:
- About Seite

Nicht gemacht:
- Spinner für Kurse
- Bessere leere Zustände
- Mehr Tastatur Navigation
- Tooltips
