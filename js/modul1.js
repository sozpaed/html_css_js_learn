/* Modul 1: Grundstruktur und Tags. Eine Folie je Element.
   from/fromPrev: Der Code der vorigen Folie wird übernommen und bleibt Teil der Prüfung. */
(function () {
  function n(d, s) { return d.querySelectorAll(s).length; }
  var VOID = { meta: 1, br: 1, img: 1, hr: 1, input: 1, link: 1 };
  function nestOk(c) {
    var re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g, st = [], m;
    c = c.replace(/<!--[\s\S]*?-->/g, '');
    while ((m = re.exec(c))) {
      var t = m[2].toLowerCase();
      if (VOID[t]) continue;
      if (!m[1]) st.push(t); else if (st.pop() !== t) return false;
    }
    return st.length === 0;
  }
  function before(a, b) { return !!(a && b && (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING)); }
  function mitText(d, s) { var l = d.querySelectorAll(s); if (!l.length) return false; for (var i = 0; i < l.length; i++) if (!l[i].textContent.trim()) return false; return true; }
  function reihenfolge(d) {
    var h1 = d.querySelector('h1'), l = d.querySelectorAll('h2'), h3 = d.querySelector('h3');
    if (!h1 || !l.length) return false;
    for (var i = 0; i < l.length; i++) if (!before(h1, l[i])) return false;
    return !h3 || before(l[0], h3);
  }
  function h2MitAbsatz(d) {
    var l = d.querySelectorAll('h2'); if (!l.length) return false;
    for (var i = 0; i < l.length; i++) { var s = l[i].nextElementSibling; while (s && s.tagName === 'H3') s = s.nextElementSibling; if (!s || s.tagName !== 'P') return false; }
    return true;
  }
  function C(t, f) { return { text: t, test: f }; }
  var cNest = C('Alle Tags sind richtig geschlossen und geschachtelt', function (d, c) { return nestOk(c); });
  function S(level, titel, info, aufgabe, loesung, checks, o) {
    var s = { level: level, titel: titel, info: info, aufgabe: aufgabe, loesung: loesung, checks: checks };
    for (var k in o) s[k] = o[k]; return s;
  }
  function doc(o) {
    return '<!DOCTYPE html>\n<html' + (o.lang ? ' lang="de"' : '') + '>\n<head>\n' + (o.cs ? '  <meta charset="utf-8">\n' : '') +
      (o.ds ? '  <meta name="description" content="Mein Lebenslauf als Webseite">\n' : '') + (o.ti ? '  <title>Lebenslauf</title>\n' : '') +
      '</head>\n<body>\n' + (o.b || '') + '</body>\n</html>\n';
  }
  var P1 = '  <p>Ich heiße Max Muster.</p>\n', H1 = '  <h1>Lebenslauf von Max Muster</h1>\n',
    H2 = '  <h2>Persönliche Daten</h2>\n  <p>Ich lebe in Musterstadt.</p>\n',
    Bb = '  <p>Geboren am <b>01.01.2010</b>.</p>\n', Bs = '  <p>Erreichbar unter <strong>01234 567890</strong>.</p>\n',
    Bi = '  <p>Wohnort: <i>Musterstadt</i></p>\n', Bu = '  <p>Schule: <u>Musterschule Musterstadt</u></p>\n',
    Bbr = '  <p>Musterstraße 1<br>\n  12345 Musterstadt</p>\n',
    SCH = '  <h2>Schule</h2>\n  <p>Ich besuche die Musterschule Musterstadt.</p>\n  <h3>Grundschule</h3>\n  <p>Bis 2020 an der Grundschule Mitte.</p>\n',
    INT = '  <h2>Interessen</h2>\n  <p>Fußball und Programmieren.</p>\n',
    SEC = SCH + INT,
    RB = '  <p>Praktikum in der <b><i>Gemeindebücherei</i></b>.</p>\n';
  var ALL = { lang: 1, cs: 1, ds: 1, ti: 1 };
  function d2(b) { return doc({ lang: 1, cs: 1, ds: 1, ti: 1, b: b }); }
  var M13 = H1 + P1 + H2 + Bb + Bs + Bi + Bu + Bbr;
  var FEHLER = ['<!DOCTYPE html>', '<html>', '<body>', '  <h2>Schule</h2>', '  <h1>Lebenslauf von Max Muster', '  <p>Ich besuche die Musterschule.', '  <p>Meine <b>Hobbys: <i>Fußball</b></i>', '</body>', '<head>', '  <title>Lebenslauf</title>', '</head>', '</html>', ''].join('\n');
  var FIX = ['<!DOCTYPE html>', '<html lang="de">', '<head>', '  <meta charset="utf-8">', '  <title>Lebenslauf</title>', '</head>', '<body>', '  <h1>Lebenslauf von Max Muster</h1>', '  <h2>Schule</h2>', '  <p>Ich besuche die Musterschule.</p>', '  <p>Meine <b>Hobbys: <i>Fußball</i></b></p>', '</body>', '</html>', ''].join('\n');
  var prev = { fromPrev: true };
  function ind(s) { return s.replace(/^(?=.)/gm, '  '); }
  function wrap(t, inner) { return '  <' + t + '>\n' + ind(inner) + '  </' + t + '>\n'; }
  var HDR = wrap('header', H1 + P1), MAINALL = H2 + Bb + Bs + Bi + Bu + Bbr + SCH + INT + RB,
    SECS = wrap('section', H2 + Bb + Bs + Bi + Bu + Bbr) + wrap('section', SCH) + wrap('section', INT + RB),
    FTR = wrap('footer', '  <p>Stand: November 2026, Musterschule Musterstadt</p>\n');

  window.MODULES = (window.MODULES || []).concat([{
    titel: 'Modul 1: Grundstruktur und Tags',
    gruppen: { M: 'M - Grundlagen', R: 'R - Zusammenführung', E: 'E - Erweiterungen', T: 'Modultest', X: 'Reflexion' },
    schritte: [
      S('M', 'Seite, Kopf und Körper',
        '<p>Eine HTML-Datei besteht aus drei Teilen. <code>&lt;!DOCTYPE html&gt;</code> (<em>Dokumenttyp</em>) steht ganz oben und sagt dem Browser: modernes HTML. Es ist kein Element. <code>html</code> umschließt die ganze <strong>Seite</strong>. Darin stehen zuerst <code>head</code> (<em>Kopf</em>: Meta-Daten, nicht sichtbar) und danach <code>body</code> (<em>Körper</em>: alles Sichtbare).</p><p>Ein <strong>Tag</strong> steht in spitzen Klammern. Öffnender Tag, Inhalt und schließender Tag (mit <code>/</code>) bilden zusammen ein <strong>HTML-Element</strong>.</p><pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;head&gt; … &lt;/head&gt;\n  &lt;body&gt; … &lt;/body&gt;\n&lt;/html&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Schreibe das Grundgerüst: Doctype, dann <code>html</code>, darin zuerst <code>head</code>, danach <code>body</code>. Schließe alle Tags.</p>',
        doc({}), [
          C('Die Datei beginnt mit <!DOCTYPE html>', function (d, c) { return /^\s*<!doctype html>/i.test(c); }),
          C('Es gibt ein html-Element (öffnend und schließend)', function (d, c) { return /<html[\s>]/i.test(c) && /<\/html>/i.test(c); }),
          C('head und body sind geschrieben, der head steht vor dem body', function (d, c) { var i = c.search(/<head[\s>]/i), j = c.search(/<body[\s>]/i); return i > -1 && j > i; }),
          cNest], { start: '<!-- Schreibe hier das Grundgerüst -->\n' }),
      S('M', 'Die Sprache: lang',
        '<p>Zusatzangaben in einem öffnenden Tag heißen <strong>Attribute</strong> und haben die Form <code>name="wert"</code>. Beim <code>html</code>-Element gibt <code>lang</code> (<em>language</em>, Sprache) die Sprache der Seite an: <code>&lt;html lang="de"&gt;</code> bedeutet Deutsch. Screenreader und Übersetzer brauchen diese Angabe.</p>',
        '<p><strong>Aufgabe:</strong> Ergänze im öffnenden <code>html</code>-Tag das Attribut <code>lang="de"</code>.</p>',
        doc({ lang: 1 }), [C('Das html-Element hat lang="de"', function (d, c) { return /<html[^>]*\blang\s*=\s*["']?de/i.test(c); })], prev),
      S('M', 'Meta-Daten: Zeichensatz',
        '<p><strong>Meta-Daten</strong> sind „Daten über Daten“: Angaben über die Seite, die nicht angezeigt werden. Sie stehen im <code>head</code>. <code>meta</code> (<em>metadata</em>) hat keinen Inhalt und keinen schließenden Tag. <code>&lt;meta charset="utf-8"&gt;</code> legt den <strong>Zeichensatz</strong> fest (<em>character set</em>). Ohne ihn werden Umlaute wie ä, ö, ü oder ß oft falsch angezeigt.</p>',
        '<p><strong>Aufgabe:</strong> Schreibe <code>&lt;meta charset="utf-8"&gt;</code> in den <code>head</code>.</p>',
        doc({ lang: 1, cs: 1 }), [C('Im Kopf steht <meta charset="utf-8">', function (d) { var m = d.head.querySelector('meta[charset]'); return !!m && (m.getAttribute('charset') || '').toLowerCase() === 'utf-8'; })], prev),
      S('M', 'Der Titel',
        '<p><code>title</code> (<em>Titel</em>) steht im <code>head</code> und ist ein Meta-Datum. Sein Text erscheint im Browser-Tab, in Lesezeichen und in Suchergebnissen, aber nicht auf der Seite selbst.</p>',
        '<p><strong>Aufgabe:</strong> Schreibe in den <code>head</code> den Titel <code>&lt;title&gt;Lebenslauf&lt;/title&gt;</code>.</p>',
        doc({ lang: 1, cs: 1, ti: 1 }), [C('Im Kopf steht ein title mit Text', function (d) { var t = d.head.querySelector('title'); return !!t && t.textContent.trim().length > 0; })], prev),
      S('M', 'Meta-Daten: Beschreibung',
        '<p><code>&lt;meta name="description" content="…"&gt;</code> beschreibt die Seite in einem Satz; Suchmaschinen zeigen ihn oft unter dem Titel an. Das Attribut <code>name</code> sagt, <em>was</em> angegeben wird, <code>content</code> (Inhalt) enthält den Text. Weitere Beispiele zum Lesen: <code>name="author"</code> nennt den Autor, <code>name="viewport"</code> steuert die Darstellung auf dem Smartphone.</p>',
        '<p><strong>Aufgabe:</strong> Ergänze im <code>head</code> eine Beschreibung deiner Seite mit <code>meta name="description"</code> und einem Satz als <code>content</code>.</p>',
        doc({ lang: 1, cs: 1, ds: 1, ti: 1 }), [C('Im Kopf steht <meta name="description" content="…"> mit Text', function (d) { var m = d.head.querySelector('meta[name="description"]'); return !!m && (m.getAttribute('content') || '').trim().length > 0; })], prev),
      S('M', 'Der Absatz: p',
        '<p>Ab jetzt geht es um den <code>body</code>. <code>p</code> (<em>paragraph</em>, Absatz) erzeugt einen Textabsatz. Der Browser lässt davor und danach Abstand. Der Text steht zwischen <code>&lt;p&gt;</code> und <code>&lt;/p&gt;</code>.</p>',
        '<p><strong>Aufgabe:</strong> Schreibe in den <code>body</code> einen Absatz mit Text, z. B. „Ich heiße Max Muster.“ (mit deinem Namen).</p>',
        d2(P1), [C('Im Körper steht ein Absatz (p) mit Text', function (d) { return mitText(d.body, 'p'); }), cNest], prev),
      S('M', 'Überschrift 1: h1',
        '<p><code>h</code> steht für <em>heading</em> (Überschrift), die Zahl für die Ebene: <code>h1</code> ist die wichtigste. Es gibt nur eine <code>h1</code> pro Seite, und sie steht am Anfang des Körpers.</p>',
        '<p><strong>Aufgabe:</strong> Schreibe <strong>vor</strong> deinen Absatz eine <code>h1</code> mit „Lebenslauf von“ und deinem Namen.</p>',
        d2(H1 + P1), [C('Genau eine h1 mit Text', function (d) { return n(d, 'h1') === 1 && mitText(d, 'h1'); }), C('Die h1 steht vor dem Absatz', function (d) { return before(d.querySelector('h1'), d.querySelector('p')); }), cNest], prev),
      S('M', 'Überschrift 2: h2',
        '<p><code>h2</code> gliedert die Seite in Abschnitte unterhalb der <code>h1</code>, so wie Kapitel in einem Buch. Die Reihenfolge ist wichtig: Eine <code>h2</code> steht immer nach der <code>h1</code>, nie davor.</p>',
        '<p><strong>Aufgabe:</strong> Ergänze nach dem ersten Absatz eine <code>h2</code> „Persönliche Daten“ mit einem eigenen Absatz darunter.</p>',
        d2(H1 + P1 + H2), [C('Mindestens eine h2 mit Text, die nach der h1 steht', function (d) { return mitText(d, 'h2') && before(d.querySelector('h1'), d.querySelector('h2')); }), C('Auf jede h2 folgt ein Absatz', function (d) { return h2MitAbsatz(d); }), cNest], prev),
      S('M', 'Fett: b',
        '<p><code>b</code> (<em>bold</em>, fett) hebt Text einfach hervor, ohne besondere Bedeutung. Das Element steht <em>im</em> Absatz um die betroffenen Wörter: <code>&lt;p&gt;Geboren am &lt;b&gt;01.01.2010&lt;/b&gt;.&lt;/p&gt;</code></p>',
        '<p><strong>Aufgabe:</strong> Schreibe einen neuen Absatz mit deinem Geburtsdatum und setze das Datum fett.</p>',
        d2(H1 + P1 + H2 + Bb), [C('Ein b mit Text steht in einem Absatz', function (d) { return mitText(d, 'p b'); }), cNest], prev),
      S('M', 'Wichtig: strong',
        '<p><code>strong</code> (<em>stark</em>) hebt Text <strong>deutlich</strong> hervor und sagt: Das ist wichtig. Es sieht meist wie fett aus, Screenreader betonen es aber. Faustregel: Wichtiges bekommt <code>strong</code>, nur optisch Fettes bekommt <code>b</code>.</p>',
        '<p><strong>Aufgabe:</strong> Schreibe einen Absatz, in dem deine Telefonnummer oder E-Mail-Adresse mit <code>strong</code> hervorgehoben ist.</p>',
        d2(H1 + P1 + H2 + Bb + Bs), [C('Ein strong mit Text steht in einem Absatz', function (d) { return mitText(d, 'p strong'); }), cNest], prev),
      S('M', 'Kursiv: i',
        '<p><code>i</code> (<em>italic</em>, kursiv) setzt Text schräg, z. B. für Fremdwörter, Titel oder Namen.</p>',
        '<p><strong>Aufgabe:</strong> Schreibe einen Absatz mit deinem Wohnort und setze ihn kursiv.</p>',
        d2(H1 + P1 + H2 + Bb + Bs + Bi), [C('Ein i mit Text steht in einem Absatz', function (d) { return mitText(d, 'p i'); }), cNest], prev),
      S('M', 'Unterstrichen: u',
        '<p><code>u</code> (<em>underline</em>, unterstrichen) unterstreicht Text. Vorsicht: Im Web wirken unterstrichene Wörter wie Links. Setze <code>u</code> deshalb sparsam ein.</p>',
        '<p><strong>Aufgabe:</strong> Schreibe einen Absatz mit dem Namen deiner Schule und unterstreiche ihn.</p>',
        d2(H1 + P1 + H2 + Bb + Bs + Bi + Bu), [C('Ein u mit Text steht in einem Absatz', function (d) { return mitText(d, 'p u'); }), cNest], prev),
      S('M', 'Zeilenumbruch: br',
        '<p><code>br</code> (<em>break</em>, Umbruch) beginnt innerhalb eines Absatzes eine neue Zeile. Es hat keinen Inhalt und keinen schließenden Tag: <code>Zeile 1&lt;br&gt;Zeile 2</code>.</p>',
        '<p><strong>Aufgabe:</strong> Schreibe einen Absatz mit deiner Adresse: Straße und Hausnummer, dann mit <code>br</code> eine neue Zeile für Postleitzahl und Ort.</p>',
        d2(M13), [C('Ein br steht in einem Absatz', function (d) { return n(d, 'p br') >= 1; }), cNest], prev),
      S('R', 'Fehlersuche',
        '<p>Browser sind gutmütig: Sie zeigen auch fehlerhafte Seiten an und raten, was gemeint ist. Das Ergebnis überrascht aber oft, besonders bei falscher Reihenfolge oder nicht geschlossenen Tags. Der <a href="https://validator.w3.org" target="_blank" rel="noopener noreferrer">W3C Markup Validation Service</a> (öffnet in neuem Tab) findet solche Fehler. Vergleiche Code und Vorschau genau!</p>',
        '<p><strong>Aufgabe:</strong> Im Editor steht eine fehlerhafte Seite. Finde und behebe alle Fehler (es sind mindestens vier). Ergänze außerdem <code>lang="de"</code> und <code>meta charset</code>, die du vorher gelernt hast.</p>',
        FIX, [
          C('Der head steht vor dem body', function (d, c) { var i = c.search(/<head[\s>]/i), j = c.search(/<body[\s>]/i); return i > -1 && j > i; }),
          C('Die h1 steht vor der h2', function (d) { return before(d.querySelector('h1'), d.querySelector('h2')); }),
          C('lang="de" und meta charset sind vorhanden', function (d, c) { return /<html[^>]*\blang\s*=\s*["']?de/i.test(c) && !!d.head.querySelector('meta[charset]'); }),
          C('Der title ist noch vorhanden', function (d) { var t = d.head.querySelector('title'); return !!t && t.textContent.trim().length > 0; }),
          cNest], { start: FEHLER }),
      S('R', 'Lebenslauf gliedern',
        '<p>Überschriften bilden das <strong>Inhaltsverzeichnis</strong> der Seite: <code>h1</code> (Titel), <code>h2</code> (Abschnitte), <code>h3</code> (Unterabschnitte, dritte Ebene). Ebenen dürfen nicht übersprungen werden: Eine <code>h3</code> gehört unter eine <code>h2</code>, nie direkt unter die <code>h1</code>. Suchmaschinen und Screenreader nutzen diese Reihenfolge zur Orientierung.</p>',
        '<p><strong>Aufgabe:</strong> Dein Lebenslauf aus den Folien davor ist übernommen. Gliedere ihn: mindestens <strong>drei</strong> Abschnitte mit <code>h2</code> (z. B. Persönliche Daten, Schule, Interessen), jeweils mit Absatz, und unter „Schule“ eine <code>h3</code> (z. B. Grundschule) mit Absatz.</p>',
        d2(M13 + SEC), [
          C('Mindestens drei h2', function (d) { return n(d, 'h2') >= 3; }),
          C('Mindestens eine h3, die unter einer h2 steht', function (d) { return n(d, 'h3') >= 1 && reihenfolge(d); }),
          C('Auf jede h2 folgt ein Absatz (h3 dazwischen ist erlaubt)', function (d) { return h2MitAbsatz(d); }),
          C('Keine leere Überschrift', function (d) { return mitText(d, 'h1,h2,h3'); }), cNest], { from: 12 }),
      S('R', 'Elemente schachteln',
        '<p>Elemente dürfen ineinander stehen („schachteln“). Regel: Was zuletzt geöffnet wird, wird zuerst geschlossen.</p><pre><code>richtig: &lt;b&gt;&lt;i&gt;Text&lt;/i&gt;&lt;/b&gt;\nfalsch:  &lt;b&gt;&lt;i&gt;Text&lt;/b&gt;&lt;/i&gt;</code></pre><p>Falsch geschachtelten Code „repariert“ jeder Browser auf seine Weise.</p>',
        '<p><strong>Aufgabe:</strong> Hebe in deinem Lebenslauf eine Angabe gleichzeitig <strong>fett und kursiv</strong> hervor (z. B. ein Praktikum), richtig geschachtelt.</p>',
        d2(M13 + SEC + RB), [C('Zwei Formatierungen sind ineinander geschachtelt (z. B. b und i)', function (d) { return !!d.querySelector('b i, i b, strong i, i strong, b u, u b'); }), cNest], prev),
      S('E', 'Semantik: header und main',
        '<p class="note"><em>Erweiterung:</em> Dieses Thema kommt in keinem Modul sonst vor, wird in der Webentwicklung aber fast überall verwendet. Es ist freiwillig.</p><p>Bisher stand alles im <code>body</code> hintereinander. <strong>Semantische Elemente</strong> (<em>semantisch</em> = bedeutungstragend) geben Bereichen einen Namen, den Screenreader, Suchmaschinen und andere Entwickler verstehen. Auf der Seite ändert sich dadurch noch nichts Sichtbares.</p><ul><li><code>header</code> (<em>Kopfzeile</em>) enthält den einleitenden Bereich der Seite, z. B. Titel und Vorstellung.</li><li><code>main</code> (<em>Hauptteil</em>) enthält den Hauptinhalt und kommt pro Seite nur einmal vor.</li></ul><p><strong>Nicht verwechseln:</strong> <code>head</code> ist der unsichtbare Kopf der Datei mit den Meta-Daten, <code>header</code> steht im sichtbaren <code>body</code>.</p><pre><code>&lt;body&gt;\n  &lt;header&gt; … &lt;/header&gt;\n  &lt;main&gt; … &lt;/main&gt;\n&lt;/body&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Dein Lebenslauf aus den R-Folien ist übernommen. Setze die <code>h1</code> mit dem einleitenden Absatz in einen <code>header</code> und alles andere in ein <code>main</code>.</p>',
        d2(HDR + wrap('main', MAINALL)), [
          C('Ein header im Körper enthält die h1', function (d) { return !!d.body.querySelector('header h1'); }),
          C('Es gibt genau ein main im Körper; alle h2 stehen darin', function (d) { var l = [].slice.call(d.querySelectorAll('h2')); return n(d, 'body main') === 1 && l.length > 0 && l.every(function (h) { return !!h.closest('main'); }); }),
          C('Der header steht vor dem main (nicht darin)', function (d) { var h = d.querySelector('header'), m = d.querySelector('main'); return before(h, m) && !h.contains(m); }),
          cNest], prev),
      S('E', 'Semantik: section',
        '<p><code>section</code> (<em>Abschnitt</em>) fasst einen thematisch zusammengehörigen Bereich zusammen, meist mit einer Überschrift am Anfang. Faustregel: Wenn du einem Bereich eine eigene Überschrift geben würdest, passt <code>section</code>. Für Bereiche ohne eigene Bedeutung, die nur zusammengefasst werden sollen (z. B. später fürs Layout mit CSS), gibt es das neutrale Element <code>div</code> (<em>division</em>, Bereich).</p><pre><code>&lt;main&gt;\n  &lt;section&gt;\n    &lt;h2&gt;Schule&lt;/h2&gt;\n    &lt;p&gt; … &lt;/p&gt;\n  &lt;/section&gt;\n&lt;/main&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Setze jeden Abschnitt deines Lebenslaufs (eine <code>h2</code> mit allem darunter bis zur nächsten <code>h2</code>, auch mit <code>h3</code>) in ein <code>section</code>. Die <code>section</code> stehen direkt im <code>main</code>.</p>',
        d2(HDR + wrap('main', SECS)), [
          C('Mindestens drei section stehen direkt im main', function (d) { var l = [].slice.call(d.querySelectorAll('section')); return l.length >= 3 && l.every(function (s) { return s.parentElement.tagName === 'MAIN'; }); }),
          C('Jede section beginnt mit einer h2 und enthält nur diese eine h2', function (d) { var l = [].slice.call(d.querySelectorAll('section')); return l.length > 0 && l.every(function (s) { return s.querySelectorAll('h2').length === 1 && !!s.firstElementChild && s.firstElementChild.tagName === 'H2'; }); }),
          C('Jede h2 steht in einer section', function (d) { var l = [].slice.call(d.querySelectorAll('h2')); return l.length > 0 && l.every(function (h) { return !!h.closest('section'); }); }),
          cNest], prev),
      S('E', 'Semantik: footer',
        '<p><code>footer</code> (<em>Fußzeile</em>) enthält den abschließenden Bereich der Seite, z. B. Stand, Kontakt oder Urheberangaben. Er steht am Ende des <code>body</code>, nach dem <code>main</code>. Zusammen ergibt sich das Gerüst fast aller Webseiten:</p><pre><code>&lt;header&gt; … &lt;/header&gt;\n&lt;main&gt;\n  &lt;section&gt; … &lt;/section&gt;\n&lt;/main&gt;\n&lt;footer&gt; … &lt;/footer&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Ergänze nach dem <code>main</code> einen <code>footer</code> mit einem Absatz, z. B. „Stand: November 2026, Musterschule Musterstadt“.</p>',
        d2(HDR + wrap('main', SECS) + FTR), [
          C('Es gibt genau einen footer mit einem Absatz (p) mit Text', function (d) { return n(d, 'footer') === 1 && mitText(d, 'footer p'); }),
          C('Der footer steht nach dem main (nicht darin)', function (d) { var f = d.querySelector('footer'), m = d.querySelector('main'); return before(m, f) && !m.contains(f); }),
          cNest], prev),
      { titel: 'Modultest: Theorie', kurz: 'Theorie', badge: 'Modultest: Theorieteil', test: true, fragen: [
        { f: 'Welches Element enthält die Meta-Daten einer Seite?', o: ['body', 'head', 'title', 'p'], r: 1, e: 'Meta-Daten stehen im Kopf (head) und werden nicht angezeigt.' },
        { f: 'Was bewirkt <meta charset="utf-8">?', o: ['Es legt die Sprache der Seite fest', 'Es legt den Zeichensatz fest, damit z. B. Umlaute richtig angezeigt werden', 'Es legt den Titel der Seite fest', 'Es macht Text fett'], r: 1, e: 'charset = character set (Zeichensatz).' },
        { f: 'Was ist ein HTML-Element?', o: ['Nur der öffnende Tag', 'Öffnender Tag, Inhalt und schließender Tag zusammen', 'Nur der Inhalt zwischen den Tags', 'Ein Attribut im Kopf'], r: 1, e: 'Tags sind nur die Klammern, das Element umfasst auch den Inhalt.' },
        { f: 'Welche Reihenfolge der Überschriften ist richtig?', o: ['h1, h3, h2', 'h2, h1, h3', 'h1, h2, h3', 'h3, h2, h1'], r: 2, e: 'Ebenen folgen aufeinander: h1, dann h2, darunter h3.' },
        { f: 'Welches Element hat keinen schließenden Tag?', o: ['p', 'br', 'b', 'title'], r: 1, e: 'br (break) hat keinen Inhalt.' },
        { f: 'Was ist an <b><i>Text</b></i> falsch?', o: ['Nichts, das ist richtig', 'Falsch geschachtelt: erst i, dann b schließen', 'Es fehlt ein Absatz', 'b darf nie mit i verwendet werden'], r: 1, e: 'Was zuletzt geöffnet wird, wird zuerst geschlossen.' },
        { f: 'Wo erscheint der Text des title-Elements?', o: ['Als Überschrift auf der Seite', 'Im Browser-Tab', 'Als Absatz am Seitenende', 'Nirgends'], r: 1, e: 'Der title steht im Kopf: Tab, Lesezeichen, Suchergebnis.' },
        { f: 'Wofür steht <html lang="de">?', o: ['Die Seite ist in deutscher Sprache; wichtig für Screenreader und Übersetzer', 'Die Seite wird nur in Deutschland angezeigt', 'Der Text ist fett', 'Die Seite hat eine deutsche Domain'], r: 0, e: 'lang = language (Sprache der Seite).' },
        { f: 'Wofür verwendest du strong?', o: ['Nur wenn Text kursiv sein soll', 'Um wichtigen Text deutlich hervorzuheben', 'Für einen Zeilenumbruch', 'Für den Titel der Seite'], r: 1, e: 'strong = stark; b ist nur optisch fett.' }
      ] },
      S('E', 'Modultest: Praxis – Mein kompletter Lebenslauf',
        '<p>Jetzt zählt dein eigener Entwurf. Plane zuerst die Abschnitte (Persönliches, Schule, Praktikum, Interessen …) und überlege, wo eine Unterüberschrift sinnvoll ist. Prüfe die fertige Datei zusätzlich mit dem <a href="https://validator.w3.org" target="_blank" rel="noopener noreferrer">W3C Markup Validation Service</a> (neuer Tab).</p>',
        '<p><strong>Aufgabe:</strong> Dein Lebenslauf aus den R-Folien ist übernommen. Gestalte daraus deinen vollständigen Lebenslauf: mindestens <strong>vier</strong> Abschnitte (<code>h2</code>) mit Absätzen, mindestens eine <code>h3</code>, alle Formatierungen (<code>b</code>, <code>strong</code>, <code>i</code>, <code>u</code>, <code>br</code>) mindestens einmal, ein <code>title</code> mit „Lebenslauf“ und eine aussagekräftige Beschreibung (mindestens 20 Zeichen).</p>',
        d2(M13 + SEC + RB.replace('  <p>', '  <h2>Praktikum</h2>\n  <p>')), [
          C('Mindestens vier h2 und mindestens eine h3', function (d) { return n(d, 'h2') >= 4 && n(d, 'h3') >= 1; }),
          C('b, strong, i, u und br kommen vor', function (d) { return n(d, 'b') && n(d, 'strong') && n(d, 'i') && n(d, 'u') && n(d, 'br'); }),
          C('Der title enthält „Lebenslauf“', function (d) { var t = d.head.querySelector('title'); return !!t && /lebenslauf/i.test(t.textContent); }),
          C('Die Beschreibung hat mindestens 20 Zeichen', function (d) { var m = d.head.querySelector('meta[name="description"]'); return !!m && (m.getAttribute('content') || '').trim().length >= 20; }),
          C('Mindestens sechs Absätze', function (d) { return n(d, 'p') >= 6; })], { from: 15, g: 'T', kurz: 'Praxis', badge: 'Modultest: Praxisteil (E)' }),
      { titel: 'Reflexion', reflexion: true,
        items: ['die HTML-Elemente zur Formatierung eines Textes benennen.', 'erklären, wie eine HTML-Seite strukturiert wird.', 'eine HTML-Seite in Kopf und Körper einteilen.', 'Meta-Daten im Kopf benennen und schreiben.', 'Formatierungs-Elemente im Editor verwenden.', 'eine vollständige HTML-Seite strukturieren und erstellen.'] }
    ]
  }]);
})();
