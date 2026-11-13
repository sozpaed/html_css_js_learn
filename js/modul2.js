/* Modul 2: Listen, Tabellen und Bilder. Eine Folie je Element oder Attribut. */
(function () {
  function n(d, s) { return d.querySelectorAll(s).length; }
  function C(t, f) { return { text: t, test: f }; }
  function S(level, titel, info, aufgabe, loesung, checks, o) {
    var s = { level: level, titel: titel, info: info, aufgabe: aufgabe, loesung: loesung, checks: checks };
    for (var k in o) s[k] = o[k]; return s;
  }
  function X(a, b) { var r = {}, k; for (k in a) r[k] = a[k]; for (k in b) r[k] = b[k]; return r; }
  function list(d, s) { return [].slice.call(d.querySelectorAll(s)); }
  function all(d, s, f) { var l = list(d, s); return l.length > 0 && l.every(f); }
  function some(d, s, f) { return list(d, s).some(f); }
  function kids(e, t) { return [].filter.call(e.children, function (x) { return x.tagName === t; }); }
  function bildOk(d, x) { return some(d, 'img', function (i) { return !!x && x.bilder.indexOf(i.getAttribute('src')) > -1; }); }

  /* Strukturprüfung: Schließen, Schachteln und erlaubte Eltern-Elemente */
  var VOID = { meta: 1, br: 1, img: 1, hr: 1, input: 1, link: 1 };
  var RULE = { li: { only: ['ul', 'ol'] }, td: { only: ['tr'] }, th: { only: ['tr'] }, tr: { only: ['table', 'thead', 'tbody', 'tfoot'] },
    thead: { only: ['table'] }, tbody: { only: ['table'] }, tfoot: { only: ['table'] }, caption: { only: ['table'] }, figcaption: { only: ['figure'] },
    dt: { only: ['dl'] }, dd: { only: ['dl'] }, ul: { not: ['ul', 'ol'] }, ol: { not: ['ul', 'ol'] } };
  function baumOk(c) {
    var re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g, st = [], m;
    c = c.replace(/<!--[\s\S]*?-->/g, '');
    while ((m = re.exec(c))) {
      var t = m[2].toLowerCase();
      if (VOID[t]) continue;
      if (m[1]) { if (st.pop() !== t) return false; continue; }
      var r = RULE[t], top = st[st.length - 1];
      if (r && r.only && r.only.indexOf(top) < 0) return false;
      if (r && r.not && r.not.indexOf(top) > -1) return false;
      st.push(t);
    }
    return st.length === 0;
  }
  var cBau = C('Alle Tags sind geschlossen und stehen am richtigen Platz (li in ul/ol, td/th in tr, tr in table)', function (d, c) { return baumOk(c); });

  /* Ausgangspunkt: der Lebenslauf aus dem Praxisteil von Modul 1 */
  var M1 = window.MODULES[0], PX = M1.schritte.filter(function (s) { return s.kurz === 'Praxis'; })[0], PXI = M1.schritte.indexOf(PX), BASE = PX.loesung;

  var U = '  <h2>Stärken</h2>\n  <ul>\n    <li>Teamarbeit</li>\n    <li>Zuverlässigkeit</li>\n    <li>Neugier</li>\n  </ul>\n';
  var NESTLI = '<li>Realschule\n      <ul>\n        <li>Deutsch</li>\n        <li>Informatik</li>\n      </ul>\n    </li>';
  function olS(o) { return '  <h2>Schullaufbahn</h2>\n  <ol' + (o.type ? ' type="I"' : '') + '>\n    <li>Grundschule</li>\n    ' + (o.nest ? NESTLI : '<li>Realschule</li>') + '\n    <li>Abschlussprüfung</li>\n  </ol>\n'; }
  var BEW = '  <h2>Bewerbung in vier Schritten</h2>\n  <ol>\n    <li>Stellenanzeige lesen</li>\n    <li>Lebenslauf schreiben</li>\n  </ol>\n  <p>Weiter geht es mit:</p>\n  <ol start="3">\n    <li>Bewerbung abschicken</li>\n    <li>Auf Antwort warten</li>\n  </ol>\n';
  function ntS(o) {
    function row(a, b, t) { return '    <tr>\n      <' + t + '>' + a + '</' + t + '>\n      <' + t + '>' + b + '</' + t + '>\n    </tr>\n'; }
    return '  <h2>Noten</h2>\n  <table' + (o.border ? ' border="1"' : '') + '>\n' + (o.cap ? '    <caption>Noten im Zeugnis Klasse 9</caption>\n' : '') +
      (o.span ? '    <tr>\n      <th colspan="2">Zeugnis Klasse 9</th>\n    </tr>\n' : '') + row('Fach', 'Note', o.th ? 'th' : 'td') + row('Deutsch', '2', 'td') + row('Mathematik', '1', 'td') + '  </table>\n';
  }
  var PRAK = '  <h2>Praktikumsstationen</h2>\n  <table border="1">\n    <tr>\n      <th>Station</th>\n      <th>Aufgabe</th>\n    </tr>\n    <tr>\n      <td rowspan="2">Gemeindebücherei</td>\n      <td>Bücher sortieren</td>\n    </tr>\n    <tr>\n      <td>Ausleihe betreuen</td>\n    </tr>\n  </table>\n';
  function imS(o) {
    var t = '<img src="beispiel.svg"' + (o.alt ? ' alt="Porträtfoto von Max Muster"' : '') + (o.width ? ' width="200"' : '') + '>';
    if (o.fig) t = '<figure>\n    ' + t + '\n    <figcaption>Porträt von Max Muster, eigenes Foto</figcaption>\n  </figure>';
    return '  <h2>Foto</h2>\n  ' + t + '\n';
  }
  var QU = '  <h2>Bilder</h2>\n  <table border="1">\n    <tr>\n      <th>Bild</th>\n      <th>Urheber</th>\n      <th>Erscheinungsjahr</th>\n    </tr>\n    <tr>\n      <td><img src="beispiel.svg" alt="Porträtfoto von Max Muster" width="100"></td>\n      <td>Max Muster</td>\n      <td>2026</td>\n    </tr>\n  </table>\n  <h3>Bildquellen</h3>\n  <ul>\n    <li>Porträt: eigenes Foto</li>\n  </ul>\n';
  var DL = '  <h2>Steckbrief</h2>\n  <dl>\n    <dt>Name</dt>\n    <dd>Max Muster</dd>\n    <dt>Geboren</dt>\n    <dd>01.01.2010</dd>\n    <dt>Wohnort</dt>\n    <dd>Musterstadt</dd>\n  </dl>\n';
  function build(o) {
    var b = (o.ul ? U : '') + (o.ol ? olS(o) : '') + (o.bew ? BEW : '') + (o.tab ? ntS(o) : '') + (o.prak ? PRAK : '') + (o.img ? imS(o) : '') + (o.qu ? QU : '') + (o.dl ? DL : '');
    return BASE.replace('</body>', b + '</body>');
  }
  var a1 = { ul: 1 }, a2 = X(a1, { ol: 1 }), a3 = X(a2, { type: 1 }), a4 = X(a3, { bew: 1 }), a5 = X(a4, { tab: 1 }), a6 = X(a5, { th: 1 }), a7 = X(a6, { border: 1 }),
    a8 = X(a7, { span: 1 }), a9 = X(a8, { prak: 1 }), a10 = X(a9, { img: 1 }), a11 = X(a10, { alt: 1 }), a12 = X(a11, { width: 1 }),
    r2 = X(a12, { nest: 1 }), r3 = X(r2, { qu: 1 }), e1 = X(r3, { fig: 1 }), e2 = X(e1, { cap: 1 }), e3 = X(e2, { dl: 1 });

  var FEHLER = ['<!DOCTYPE html>', '<html lang="de">', '<head>', '  <meta charset="utf-8">', '  <title>Fehlersuche</title>', '</head>', '<body>', '  <h1>Mein Stundenplan</h1>', '  <li>Deutsch</li>', '  <li>Mathe', '  <table border="1">', '    <td>Fach</td><td>Note</td>', '    <tr><td>Deutsch</td><td>2</td></tr>', '  </table>', '  <img src="beispiel.svg">', '</body>', '</html>', ''].join('\n');
  var FIX = ['<!DOCTYPE html>', '<html lang="de">', '<head>', '  <meta charset="utf-8">', '  <title>Fehlersuche</title>', '</head>', '<body>', '  <h1>Mein Stundenplan</h1>', '  <ul>', '    <li>Deutsch</li>', '    <li>Mathe</li>', '  </ul>', '  <table border="1">', '    <tr><th>Fach</th><th>Note</th></tr>', '    <tr><td>Deutsch</td><td>2</td></tr>', '  </table>', '  <img src="beispiel.svg" alt="Beispielbild">', '</body>', '</html>', ''].join('\n');
  var prev = { fromPrev: true }, prevB = { fromPrev: true, bilder: true };

  window.MODULES.push({
    titel: 'Modul 2: Listen, Tabellen und Bilder',
    gruppen: { M: 'M - Grundlagen', R: 'R - Zusammenführung', E: 'E - Erweiterungen', T: 'Modultest', X: 'Reflexion' },
    schritte: [
      S('M', 'Ungeordnete Liste: ul und li',
        '<p>Listen fassen zusammengehörige Einträge übersichtlich zusammen. <code>ul</code> (<em>unordered list</em>, ungeordnete Liste) zeigt Aufzählungspunkte. Jeder Eintrag steht in einem <code>li</code> (<em>list item</em>, Listeneintrag). Ein <code>li</code> gehört <strong>immer</strong> in ein <code>ul</code> oder <code>ol</code>.</p><pre><code>&lt;ul&gt;\n  &lt;li&gt;Erster Punkt&lt;/li&gt;\n  &lt;li&gt;Zweiter Punkt&lt;/li&gt;\n&lt;/ul&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Dein Lebenslauf aus Modul 1 ist übernommen. Schreibe am Ende des <code>body</code> eine <code>h2</code> „Stärken“ und darunter eine ungeordnete Liste mit mindestens drei Einträgen.</p>',
        build(a1), [C('Eine ul mit mindestens drei li', function (d) { return some(d, 'ul', function (u) { return kids(u, 'LI').length >= 3; }); }), cBau], { fromMod: [0, PXI] }),
      S('M', 'Geordnete Liste: ol',
        '<p><code>ol</code> (<em>ordered list</em>, geordnete Liste) nummeriert die Einträge automatisch. Sie passt, wenn die Reihenfolge wichtig ist, z. B. bei einer Schullaufbahn oder einer Schrittfolge. Die Einträge sind wieder <code>li</code>.</p>',
        '<p><strong>Aufgabe:</strong> Schreibe eine <code>h2</code> „Schullaufbahn“ und darunter eine geordnete Liste mit drei Einträgen (z. B. Grundschule, Realschule, Abschlussprüfung).</p>',
        build(a2), [C('Eine ol mit mindestens drei li', function (d) { return some(d, 'ol', function (u) { return kids(u, 'LI').length >= 3; }); }), cBau], prev),
      S('M', 'Nummerierung: type',
        '<p>Das Attribut <code>type</code> (Typ) bestimmt die Art der Nummerierung bei <code>ol</code>: <code>"1"</code> Zahlen (Standard), <code>"A"</code> und <code>"a"</code> Buchstaben, <code>"I"</code> und <code>"i"</code> römische Zahlen. <code>&lt;ol type="I"&gt;</code> ergibt I., II., III. und eignet sich für Gliederungen.</p>',
        '<p><strong>Aufgabe:</strong> Nummeriere deine Schullaufbahn mit römischen Zahlen.</p>',
        build(a3), [C('Eine ol hat type="I" oder type="i"', function (d) { return some(d, 'ol', function (o) { return /^[Ii]$/.test(o.getAttribute('type') || ''); }); }), cBau], prev),
      S('M', 'Weiterzählen: start',
        '<p>Das Attribut <code>start</code> (Start) legt fest, bei welcher Zahl die Nummerierung beginnt. <code>&lt;ol start="3"&gt;</code> beginnt bei 3. So kannst du eine Liste nach einem Absatz fortsetzen.</p>',
        '<p><strong>Aufgabe:</strong> Schreibe eine <code>h2</code> „Bewerbung in vier Schritten“: eine <code>ol</code> mit zwei Schritten, danach ein Absatz „Weiter geht es mit:“, danach eine zweite <code>ol</code> mit <code>start="3"</code> und zwei weiteren Schritten.</p>',
        build(a4), [C('Eine ol hat start mit einer Zahl größer als 1', function (d) { return some(d, 'ol[start]', function (o) { return +o.getAttribute('start') > 1; }); }), cBau], prev),
      S('M', 'Tabelle: table, tr, td',
        '<p><code>table</code> (Tabelle) umschließt die ganze Tabelle. <code>tr</code> (<em>table row</em>, Tabellenzeile) bildet eine Zeile. <code>td</code> (<em>table data</em>, Tabellendaten) ist eine Zelle in einer Zeile. Der Aufbau ist immer <strong>table → tr → td</strong>: Zellen stehen nie direkt in der Tabelle.</p><pre><code>&lt;table&gt;\n  &lt;tr&gt;\n    &lt;td&gt;Zelle 1&lt;/td&gt;\n    &lt;td&gt;Zelle 2&lt;/td&gt;\n  &lt;/tr&gt;\n&lt;/table&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Schreibe eine <code>h2</code> „Noten“ und darunter eine Tabelle mit drei Zeilen und zwei Spalten (Fach, Note), zunächst nur mit <code>td</code>.</p>',
        build(a5), [C('Eine Tabelle hat mindestens drei Zeilen (tr) und mindestens sechs Zellen', function (d) { return some(d, 'table', function (t) { return n(t, 'tr') >= 3 && n(t, 'td,th') >= 6; }); }), cBau], prev),
      S('M', 'Kopfzellen: th',
        '<p><code>th</code> (<em>table header</em>, Tabellenkopf) ist eine Kopfzelle. Sie steht statt <code>td</code> in der ersten Zeile und nennt, was in der Spalte steht. Browser zeigen sie fett und zentriert, Screenreader nutzen sie zur Orientierung.</p>',
        '<p><strong>Aufgabe:</strong> Ändere in deiner Notentabelle die Zellen der ersten Zeile von <code>td</code> in <code>th</code>.</p>',
        build(a6), [C('Es gibt eine Kopfzeile: eine Zeile mit mindestens zwei th und ohne td', function (d) { return some(d, 'tr', function (r) { return kids(r, 'TH').length >= 2 && kids(r, 'TD').length === 0; }); }), cBau], prev),
      S('M', 'Rahmen: border',
        '<p>Das Attribut <code>border</code> (Rand) mit dem Wert <code>"1"</code> zeichnet Linien um alle Zellen: <code>&lt;table border="1"&gt;</code>.</p><p><strong>Zum Lesen:</strong> Früher gab es <code>cellspacing</code> (Abstand zwischen Zellen) und <code>cellpadding</code> (Abstand im Zellinnern). Im aktuellen HTML sind sie veraltet, der W3C Markup Validation Service meldet sie als Fehler. Abstände und Rahmen gestaltest du in Modul 4 mit CSS.</p>',
        '<p><strong>Aufgabe:</strong> Gib deiner Notentabelle mit <code>border="1"</code> einen Rahmen.</p>',
        build(a7), [C('Eine table hat border="1"', function (d) { return n(d, 'table[border="1"]') >= 1; }), cBau], prev),
      S('M', 'Spalten verbinden: colspan',
        '<p><code>colspan</code> (<em>column span</em>, Spaltenspanne) gibt an, über wie viele Spalten sich eine Zelle erstreckt: <code>&lt;th colspan="2"&gt;</code> belegt zwei Spalten. Die Zeile hat dann nur noch eine Zelle statt zwei.</p>',
        '<p><strong>Aufgabe:</strong> Füge als erste Zeile deiner Notentabelle eine Zeile mit <strong>einer</strong> <code>th</code> ein, die zwei Spalten belegt. Text: „Zeugnis Klasse 9“.</p>',
        build(a8), [C('Eine th mit colspan="2" und Text steht allein in ihrer Zeile', function (d) { return some(d, 'th[colspan]', function (e) { return e.getAttribute('colspan') === '2' && e.textContent.trim().length > 0 && e.parentElement.children.length === 1; }); }), cBau], prev),
      S('M', 'Zeilen verbinden: rowspan',
        '<p><code>rowspan</code> (<em>row span</em>, Zeilenspanne) gibt an, über wie viele Zeilen sich eine Zelle erstreckt. Die Zelle „reicht“ in die Zeile darunter. Deshalb hat diese Zeile eine Zelle weniger.</p><pre><code>&lt;tr&gt;\n  &lt;td rowspan="2"&gt;Station&lt;/td&gt;\n  &lt;td&gt;Aufgabe 1&lt;/td&gt;\n&lt;/tr&gt;\n&lt;tr&gt;\n  &lt;td&gt;Aufgabe 2&lt;/td&gt;\n&lt;/tr&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Schreibe eine <code>h2</code> „Praktikumsstationen“ und eine Tabelle mit Kopfzeile (Station, Aufgabe). Eine Station belegt per <code>rowspan="2"</code> zwei Zeilen mit zwei Aufgaben.</p>',
        build(a9), [C('Eine td hat rowspan="2"; die darauffolgende Zeile hat nur eine Zelle', function (d) { return some(d, 'td[rowspan]', function (e) { var tr = e.parentElement, nx = tr.nextElementSibling; return e.getAttribute('rowspan') === '2' && !!nx && nx.children.length === tr.children.length - 1; }); }), cBau], prev),
      S('M', 'Bild: img und src',
        '<p><code>img</code> (<em>image</em>, Bild) fügt ein Bild ein. Es hat keinen Inhalt und keinen schließenden Tag. Das Attribut <code>src</code> (<em>source</em>, Quelle) nennt die Bilddatei: <code>&lt;img src="foto.jpg"&gt;</code>. Der Browser sucht die Datei im selben Ordner wie die HTML-Datei, und Groß- und Kleinschreibung zählt.</p><p>Lade unten dein Bild über „Eigenes Bild laden“ (oder nimm das Beispielbild <code>beispiel.svg</code>) und schreibe den angezeigten Namen in <code>src</code>. Beim Speichern wird nur die HTML-Datei gesichert: Lege das Bild dort in denselben Ordner.</p>',
        '<p><strong>Aufgabe:</strong> Schreibe eine <code>h2</code> „Foto“ und binde darunter dein Bild mit <code>img</code> und <code>src</code> ein.</p>',
        build(a10), [C('Ein img zeigt mit src auf eines der verfügbaren Bilder', function (d, c, x) { return bildOk(d, x); }), cBau], prevB),
      S('M', 'Ersatztext: alt',
        '<p><code>alt</code> (<em>alternative text</em>, Ersatztext) beschreibt, was auf dem Bild zu sehen ist. Screenreader lesen ihn vor, und er erscheint, wenn das Bild nicht lädt. Fehlt <code>alt</code>, meldet der Validator einen Fehler. Beschreibe den Inhalt („Porträtfoto von Max Muster“), nicht „Bild“. Nur bei rein dekorativen Bildern ist ein leeres <code>alt=""</code> erlaubt.</p>',
        '<p><strong>Aufgabe:</strong> Ergänze bei deinem Bild ein <code>alt</code> mit einer aussagekräftigen Beschreibung (mindestens 8 Zeichen).</p>',
        build(a11), [C('Jedes img hat ein alt mit mindestens 8 Zeichen', function (d) { return all(d, 'img', function (i) { return (i.getAttribute('alt') || '').trim().length >= 8; }); }), cBau], prevB),
      S('M', 'Größe: width und height',
        '<p><code>width</code> (Breite) und <code>height</code> (Höhe) legen die Größe in Pixeln fest, z. B. <code>width="200"</code>. Gibst du nur eine Angabe an, passt der Browser die andere im richtigen Verhältnis an. Gibst du beide an, müssen sie zum Seitenverhältnis des Bildes passen, sonst wird das Bild verzerrt.</p>',
        '<p><strong>Aufgabe:</strong> Setze bei deinem Bild die Breite auf einen Wert zwischen 50 und 600 Pixel.</p>',
        build(a12), [C('Jedes img hat width als Zahl zwischen 50 und 600', function (d) { return all(d, 'img', function (i) { var w = i.getAttribute('width') || ''; return /^\d+$/.test(w) && +w >= 50 && +w <= 600; }); }), cBau], prevB),
      S('R', 'Fehlersuche',
        '<p>Bei Listen und Tabellen „repariert“ der Browser Fehler besonders stark: Zellen ohne Zeile, Listeneinträge ohne Liste, fehlende Endtags. Das Ergebnis sieht oft anders aus als gedacht. Vergleiche Code und Vorschau genau und prüfe mit dem <a href="https://validator.w3.org" target="_blank" rel="noopener noreferrer">W3C Markup Validation Service</a> (öffnet in neuem Tab).</p>',
        '<p><strong>Aufgabe:</strong> Im Editor steht eine fehlerhafte Seite. Finde und behebe alle Fehler (es sind mindestens vier). Die Kopfzeile der Tabelle soll aus <code>th</code> bestehen.</p>',
        FIX, [
          C('Alle li stehen in einer ul oder ol', function (d) { return n(d, 'li') >= 2 && all(d, 'li', function (l) { return /^(UL|OL)$/.test(l.parentElement.tagName); }); }),
          C('Die erste Tabellenzeile besteht aus th', function (d) { return some(d, 'table', function (t) { var r = t.querySelector('tr'); return !!r && kids(r, 'TH').length >= 2; }); }),
          C('Das Bild hat einen Ersatztext (alt)', function (d) { return all(d, 'img', function (i) { return (i.getAttribute('alt') || '').trim().length > 0; }); }),
          cBau], { start: FEHLER, bilder: true }),
      S('R', 'Listen verschachteln',
        '<p>Ein <code>li</code> darf selbst eine weitere Liste enthalten. Die Unterliste steht <strong>im</strong> <code>li</code>, nicht direkt in der äußeren Liste:</p><pre><code>richtig:\n&lt;ul&gt;\n  &lt;li&gt;Realschule\n    &lt;ul&gt;&lt;li&gt;Deutsch&lt;/li&gt;&lt;/ul&gt;\n  &lt;/li&gt;\n&lt;/ul&gt;\nfalsch: &lt;ul&gt;&lt;ul&gt;…&lt;/ul&gt;&lt;/ul&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Dein Lebenslauf aus den M-Folien ist übernommen. Ergänze in der Schullaufbahn bei einem Eintrag eine Unterliste (<code>ul</code>) mit zwei Fächern. Sie steht im <code>li</code>.</p>',
        build(r2), [C('Eine Liste steht innerhalb eines li', function (d) { return n(d, 'li ul, li ol') >= 1; }), cBau], { from: 11, bilder: true }),
      S('R', 'Bilder in Tabellen und Quellen',
        '<p>Zellen dürfen auch Bilder enthalten: <code>&lt;td&gt;&lt;img …&gt;&lt;/td&gt;</code>. Wer fremde Bilder verwendet, muss Urheber und Quelle nennen. Das geschieht oft in einer Tabelle (Bild, Urheber, Erscheinungsjahr) und einer Liste der Quellen.</p>',
        '<p><strong>Aufgabe:</strong> Schreibe eine <code>h2</code> „Bilder“ und eine Tabelle mit den Kopfzellen Bild, Urheber und Erscheinungsjahr. In der Datenzeile steht dein Bild (mit <code>alt</code>). Darunter folgt eine <code>h3</code> „Bildquellen“ mit einer Aufzählung der Quellen.</p>',
        build(r3), [
          C('Ein Bild mit alt steht in einer Tabellenzelle', function (d) { return some(d, 'td img', function (i) { return (i.getAttribute('alt') || '').trim().length > 0; }); }),
          C('Die Kopfzellen heißen Urheber und Erscheinungsjahr', function (d) { var t = list(d, 'th').map(function (x) { return x.textContent.trim().toLowerCase(); }); return t.indexOf('urheber') > -1 && t.indexOf('erscheinungsjahr') > -1; }),
          C('Unter einer Überschrift „Bildquellen“ steht eine Liste mit Text', function (d) { return some(d, 'h2,h3', function (h) { var l = h.nextElementSibling; return /bildquellen/i.test(h.textContent) && !!l && /^(UL|OL)$/.test(l.tagName) && l.textContent.trim().length > 0; }); }),
          cBau], { fromPrev: true, bilder: true }),
      S('E', 'Bildunterschrift: figure und figcaption',
        '<p class="note"><em>Erweiterung:</em> Dieses Thema kommt in keinem Modul sonst vor, wird aber fast überall verwendet. Es ist freiwillig.</p><p>Bisher stand unter einem Bild höchstens ein Absatz. <code>figure</code> (<em>Abbildung</em>) fasst ein Bild und seine Beschriftung zu einer Einheit zusammen. <code>figcaption</code> (<em>figure caption</em>, Bildunterschrift) enthält die Beschriftung, z. B. Titel und Urheber. Browser und Screenreader wissen dadurch, dass beides zusammengehört.</p><pre><code>&lt;figure&gt;\n  &lt;img src="foto.jpg" alt="…"&gt;\n  &lt;figcaption&gt;Beschriftung&lt;/figcaption&gt;\n&lt;/figure&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Setze dein Bild im Abschnitt „Foto“ in ein <code>figure</code> und ergänze eine <code>figcaption</code> mit mindestens 10 Zeichen (z. B. Name und Urheber des Fotos).</p>',
        build(e1), [
          C('Ein figure enthält ein img', function (d) { return n(d, 'figure img') >= 1; }),
          C('Das figure hat eine figcaption mit mindestens 10 Zeichen', function (d) { return some(d, 'figure figcaption', function (f) { return f.textContent.trim().length >= 10; }); }),
          cBau], prevB),
      S('E', 'Tabellenüberschrift: caption',
        '<p><code>caption</code> (<em>Beschriftung</em>) gibt einer Tabelle eine Überschrift, die fest zur Tabelle gehört. Anders als eine <code>h2</code> davor wird sie von Screenreadern als Name der Tabelle vorgelesen. Sie steht als <strong>erstes</strong> Element direkt in der <code>table</code>.</p><pre><code>&lt;table&gt;\n  &lt;caption&gt;Noten&lt;/caption&gt;\n  &lt;tr&gt; … &lt;/tr&gt;\n&lt;/table&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Gib deiner Notentabelle eine <code>caption</code> (z. B. „Noten im Zeugnis Klasse 9“).</p>',
        build(e2), [C('Eine table beginnt mit einer caption mit Text', function (d) { return some(d, 'table', function (t) { var f = t.firstElementChild; return !!f && f.tagName === 'CAPTION' && f.textContent.trim().length > 0; }); }), cBau], prevB),
      S('E', 'Beschreibungsliste: dl, dt, dd',
        '<p>Für Paare aus Begriff und Beschreibung (wie in einem Steckbrief) gibt es die <strong>Beschreibungsliste</strong>: <code>dl</code> (<em>description list</em>) umschließt sie, <code>dt</code> (<em>description term</em>) ist der Begriff, <code>dd</code> (<em>description details</em>) die Beschreibung. Auf jedes <code>dt</code> folgt ein <code>dd</code>.</p><pre><code>&lt;dl&gt;\n  &lt;dt&gt;Name&lt;/dt&gt;\n  &lt;dd&gt;Max Muster&lt;/dd&gt;\n&lt;/dl&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Schreibe eine <code>h2</code> „Steckbrief“ und darunter eine Beschreibungsliste mit mindestens drei Paaren (z. B. Name, Geboren, Wohnort).</p>',
        build(e3), [
          C('Ein dl enthält mindestens drei dt', function (d) { return some(d, 'dl', function (l) { return kids(l, 'DT').length >= 3; }); }),
          C('Auf jedes dt folgt direkt ein dd', function (d) { return all(d, 'dt', function (t) { var x = t.nextElementSibling; return !!x && x.tagName === 'DD'; }); }),
          cBau], prevB),
      { titel: 'Modultest: Theorie', kurz: 'Theorie', badge: 'Modultest: Theorieteil', test: true, fragen: [
        { f: 'Welches Element erzeugt eine Aufzählung mit Punkten?', o: ['ol', 'ul', 'li', 'dl'], r: 1, e: 'ul = unordered list (ungeordnete Liste).' },
        { f: 'Was ist der Unterschied zwischen ul und ol?', o: ['ul ist geordnet, ol ungeordnet', 'ul zeigt Punkte, ol nummeriert die Einträge', 'Beide sind gleich', 'ol ist nur für Tabellen'], r: 1, e: 'ol = ordered list: Die Reihenfolge ist wichtig und wird nummeriert.' },
        { f: 'Wohin gehört ein li?', o: ['In ein ul oder ol', 'Direkt in den body', 'In ein tr', 'In den head'], r: 0, e: 'Ein li ist immer ein Eintrag einer Liste.' },
        { f: 'Wie ist eine Tabelle richtig aufgebaut?', o: ['table, td, tr', 'table, tr, td', 'tr, table, td', 'td, tr, table'], r: 1, e: 'Die Tabelle enthält Zeilen (tr), die Zeilen enthalten Zellen (td oder th).' },
        { f: 'Wofür steht th?', o: ['table height', 'table header: Kopfzelle', 'text hyperlink', 'third'], r: 1, e: 'th = table header.' },
        { f: 'Was bewirkt colspan="2"?', o: ['Die Zelle ist zwei Pixel breit', 'Die Zelle erstreckt sich über zwei Zeilen', 'Die Zelle erstreckt sich über zwei Spalten', 'Die Tabelle hat zwei Spalten'], r: 2, e: 'colspan = column span (Spalten), rowspan = row span (Zeilen).' },
        { f: 'Wozu dient das Attribut alt bei img?', o: ['Es legt die Größe fest', 'Es nennt den Dateipfad', 'Es ist der Ersatztext für Screenreader und wenn das Bild nicht lädt', 'Es macht das Bild anklickbar'], r: 2, e: 'alt = alternative text. Ohne alt meldet der Validator einen Fehler.' },
        { f: 'Welches Element hat keinen schließenden Tag?', o: ['td', 'li', 'th', 'img'], r: 3, e: 'img hat keinen Inhalt.' },
        { f: 'Was bewirkt start="5" bei einer ol?', o: ['Die Liste hat 5 Einträge', 'Die Zählung beginnt bei 5', 'Die Liste ist 5 Pixel eingerückt', 'Die Liste hat den Typ 5'], r: 1, e: 'start legt die erste Zahl fest.' },
        { f: 'Wo muss die Bilddatei liegen, damit src="foto.jpg" funktioniert?', o: ['Irgendwo im Internet', 'Im head der Seite', 'Im selben Ordner wie die HTML-Datei', 'In der Tabelle'], r: 2, e: 'Ohne Pfadangabe sucht der Browser im selben Ordner; auch die Schreibweise muss stimmen.' }
      ] },
      S('E', 'Modultest: Praxis – Mein kompletter Lebenslauf',
        '<p>Jetzt zählt dein eigener Entwurf. Dein Lebenslauf enthält am Ende Listen, Tabellen und ein Bild, die zusammenpassen und sauber aufgebaut sind. Prüfe die fertige Datei zusätzlich mit dem <a href="https://validator.w3.org" target="_blank" rel="noopener noreferrer">W3C Markup Validation Service</a> (neuer Tab).</p>',
        '<p><strong>Aufgabe:</strong> Dein Lebenslauf aus den R-Folien ist übernommen. Mache daraus einen vollständigen Lebenslauf mit: mindestens einer ungeordneten und einer geordneten Liste (je drei Einträge), einer Tabelle mit Kopfzeile und mindestens drei Zeilen, mindestens einer verbundenen Zelle (<code>colspan</code> oder <code>rowspan</code>) und einem Porträt mit <code>alt</code> und <code>width</code>.</p>',
        build(r3), [
          C('Eine ul mit mindestens drei li', function (d) { return some(d, 'ul', function (u) { return kids(u, 'LI').length >= 3; }); }),
          C('Eine ol mit mindestens drei li', function (d) { return some(d, 'ol', function (u) { return kids(u, 'LI').length >= 3; }); }),
          C('Eine Tabelle mit Kopfzeile (th) und mindestens drei Zeilen', function (d) { return some(d, 'table', function (t) { return n(t, 'th') > 0 && n(t, 'tr') >= 3; }); }),
          C('Eine Zelle ist über mehrere Spalten oder Zeilen verbunden', function (d) { return n(d, '[colspan],[rowspan]') >= 1; }),
          C('Mindestens ein Bild hat alt und width', function (d) { return some(d, 'img', function (i) { return (i.getAttribute('alt') || '').trim().length > 0 && /^\d+$/.test(i.getAttribute('width') || ''); }); }),
          cBau], { from: 14, g: 'T', kurz: 'Praxis', badge: 'Modultest: Praxisteil (E)', bilder: true }),
      { titel: 'Reflexion', reflexion: true,
        items: ['die HTML-Elemente zur Erstellung einer Tabelle benennen.', 'die HTML-Elemente zur Erstellung einer Liste oder Aufzählung benennen.', 'erklären, wie eine Tabelle strukturiert wird.', 'Bilder mit dem Editor in eine HTML-Seite einbinden.', 'die Attribute in Bezug auf Bilder einsetzen.', 'eine Tabelle im Editor in einer HTML-Seite erstellen.', 'die Attribute in Bezug auf Tabellen einsetzen.'] }
    ]
  });
})();
