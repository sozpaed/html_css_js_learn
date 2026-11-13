/* Modul 3: Verknüpfungen und Verweise. */
(function () {
  function C(t, f) { return { text: t, test: f }; }
  function S(level, titel, info, aufgabe, loesung, checks, o) {
    var s = { level: level, titel: titel, info: info, aufgabe: aufgabe, loesung: loesung, checks: checks };
    for (var k in o) s[k] = o[k]; return s;
  }
  function list(d, s) { return [].slice.call(d.querySelectorAll(s)); }
  function some(d, s, f) { return list(d, s).some(f); }
  function text(a) { return a.textContent.trim(); }
  function href(a) { return (a.getAttribute('href') || '').trim(); }
  function web(a) { return /^https?:\/\/[^\s/]+/i.test(href(a)); }
  function blank(a) { return (a.getAttribute('target') || '').toLowerCase() === '_blank'; }
  function rel(a, word) { return (a.getAttribute('rel') || '').toLowerCase().split(/\s+/).indexOf(word) !== -1; }
  function newTabText(a) { return /(?:neuer|neuen|neues|neuem)\s+(?:tab|fenster)/i.test(text(a)); }
  function uniqueIds(d) {
    var ids = list(d, '[id]').map(function (e) { return e.id; });
    return ids.every(function (id, i) { return !!id && ids.indexOf(id) === i; });
  }
  function target(d, a) {
    var h = href(a);
    return /^#[^\s#]+$/.test(h) && !!d.getElementById(h.slice(1));
  }
  function tocLinks(d, nav) {
    return list(nav, 'a[href^="#"]').filter(function (a) {
      var e = target(d, a) && d.getElementById(href(a).slice(1));
      return e && /^H[1-6]$/.test(e.tagName) && text(a).length > 0;
    });
  }
  function tocOk(d) {
    return uniqueIds(d) && some(d, 'nav', function (nav) {
      var links = tocLinks(d, nav), ids = links.map(href);
      return links.length >= 3 && ids.filter(function (id, i) { return ids.indexOf(id) === i; }).length >= 3;
    });
  }
  function useful(a) { return !!text(a) && !/^(hier|hier klicken|klick hier|link|mehr)$/i.test(text(a)); }
  var cIds = C('Alle id-Werte sind eindeutig und nicht leer', function (d) { return uniqueIds(d); });
  var cExternal = C('Ein Link mit Text verweist auf eine vollständige http- oder https-Adresse', function (d) {
    return some(d, 'a[href]', function (a) { return web(a) && !!text(a); });
  });
  var cBlank = C('Ein Weblink hat target="_blank" und weist im Linktext auf den neuen Tab hin', function (d) {
    return some(d, 'a[href]', function (a) { return web(a) && blank(a) && newTabText(a); });
  });
  var cTitle = C('Ein Weblink hat ein title-Attribut mit zusätzlichem Text', function (d) {
    return some(d, 'a[href]', function (a) { return web(a) && (a.getAttribute('title') || '').trim().length > 0; });
  });
  var cRel = C('Ein Weblink mit target="_blank" hat rel="noopener noreferrer"', function (d) {
    return some(d, 'a[href]', function (a) { return web(a) && blank(a) && rel(a, 'noopener') && rel(a, 'noreferrer'); });
  });
  var cDownload = C('Ein Link zu bewerbung.pdf mit Text hat das download-Attribut', function (d) {
    return some(d, 'a[download][href]', function (a) { return !!text(a) && /^(?:\.\/)?bewerbung\.pdf$/i.test(href(a)); });
  });
  var cRelative = C('Ein Link mit Text verweist relativ auf kontakt.html', function (d) {
    return some(d, 'a[href]', function (a) { return /^(?:\.\/)?kontakt\.html$/i.test(href(a)) && !!text(a); });
  });
  var cAnchor = C('Ein Link verweist auf eine vorhandene id', function (d) {
    return some(d, 'a[href^="#"]', function (a) { return !!text(a) && target(d, a); });
  });
  var cToc = C('Das Inhaltsverzeichnis enthält Links zu drei verschiedenen Überschriften', function (d) { return tocOk(d); });

  var M2 = window.MODULES[1], PX = M2.schritte.filter(function (s) { return s.kurz === 'Praxis'; })[0],
    PXI = M2.schritte.indexOf(PX), BASE = PX.loesung;
  function build(n) {
    var b = BASE, link = '<a href="https://example.org"' +
      (n >= 2 ? ' target="_blank"' : '') +
      (n >= 3 ? ' title="Beispiel für eine externe Website"' : '') +
      (n >= 4 ? ' rel="noopener noreferrer"' : '') +
      '>Website der Schule' + (n >= 2 ? ' (neuer Tab)' : '') + '</a>';
    var extra = '  <h2>Verweise</h2>\n  <p>' + link + '</p>\n';
    if (n >= 5) extra += '  <p><a href="bewerbung.pdf" download>Bewerbung' + (n >= 9 ? ' als PDF' : '') + ' herunterladen</a></p>\n';
    if (n >= 6) extra += '  <p><a href="kontakt.html">Zur Kontaktseite</a></p>\n';
    if (n >= 7) {
      b = b.replace('<h2>Schule</h2>', '<h2 id="schule">Schule</h2>');
      extra += '  <p><a href="#schule">Zum Abschnitt Schule</a></p>\n';
    }
    if (n >= 8) {
      b = b.replace('<h2>Persönliche Daten</h2>', '<h2 id="daten">Persönliche Daten</h2>')
        .replace('<h2>Interessen</h2>', '<h2 id="interessen">Interessen</h2>');
      b = b.replace('</h1>', '</h1>\n  <nav aria-label="Inhaltsverzeichnis">\n    <h2>Inhaltsverzeichnis</h2>\n    <ul>\n      <li><a href="#daten">Persönliche Daten</a></li>\n      <li><a href="#schule">Schule</a></li>\n      <li><a href="#interessen">Interessen</a></li>\n    </ul>\n  </nav>');
    }
    if (n >= 9) extra += '  <p><a href="https://www.wikipedia.org/">Wikipedia</a></p>\n';
    if (n >= 10) extra += '  <p><a href="mailto:kontakt@example.org' + (n >= 13 ? '?subject=Bewerbung' : '') + '">' + (n >= 12 ? 'kontakt@example.org' : 'E-Mail schreiben') + '</a></p>\n';
    if (n >= 11) extra += '  <p><a href="tel:+491234567890">Telefon: +49 123 4567890</a></p>\n';
    if (n >= 14) extra += '  <p><a href="#">Nach oben</a></p>\n';
    return b.replace('</body>', extra + '</body>');
  }
  var FEHLER = '<!DOCTYPE html>\n<html lang="de">\n<head><meta charset="utf-8"><title>Fehlersuche</title></head>\n<body>\n  <h1>Mein Lebenslauf</h1>\n  <p><a>Website der Schule</a></p>\n  <p><a href="#schulle">Zur Schule</a></p>\n  <p><a href="https://example.org"></a></p>\n  <h2 id="schule">Schule</h2>\n  <p>Ich besuche die Musterschule.</p>\n</body>\n</html>\n';
  var FIX = '<!DOCTYPE html>\n<html lang="de">\n<head><meta charset="utf-8"><title>Fehlersuche</title></head>\n<body>\n  <h1>Mein Lebenslauf</h1>\n  <p><a href="https://example.org">Website der Schule</a></p>\n  <p><a href="#schule">Zur Schule</a></p>\n  <p><a href="https://example.org">Weitere Informationen</a></p>\n  <h2 id="schule">Schule</h2>\n  <p>Ich besuche die Musterschule.</p>\n</body>\n</html>\n';
  var KSTART = '<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title></title>\n</head>\n<body>\n  <!-- Schreibe hier deine Kontaktseite -->\n</body>\n</html>\n';
  var KFIX = '<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Kontakt</title>\n</head>\n<body>\n  <h1>Kontakt</h1>\n  <p>Max Muster, Musterstraße 1, 12345 Musterstadt</p>\n  <p><a href="lebenslauf.html">Zurück zum Lebenslauf</a></p>\n</body>\n</html>\n';
  var prev = { fromPrev: true, bilder: true };

  window.MODULES.push({
    titel: 'Modul 3: Verknüpfungen und Verweise',
    gruppen: { M: 'M - Grundlagen', R: 'R - Zusammenführung', E: 'E - Erweiterungen', T: 'Modultest', X: 'Reflexion' },
    schritte: [
      S('M', 'Ein Link: a und href',
        '<p>Ein Link verbindet deine Seite mit einem Ziel. Das Element <code>a</code> (Anker) enthält den sichtbaren Linktext; das Attribut <code>href</code> nennt das Ziel. Der Text zwischen den Tags wird angeklickt.</p><pre><code>&lt;a href="https://example.org"&gt;Website der Schule&lt;/a&gt;</code></pre><p>Verwende für deinen Lebenslauf keine echten privaten Daten, wenn du ihn veröffentlichst.</p>',
        '<p><strong>Aufgabe:</strong> Dein Lebenslauf aus dem Praxisteil von Modul 2 ist übernommen. Ergänze eine Überschrift „Verweise“ und darunter einen Link mit Text zu einer Website, z. B. einer Schule. Beginne die Adresse mit <code>https://</code>.</p>',
        build(1), [cExternal], { fromMod: [1, PXI], bilder: true }),
      S('M', 'Neuer Tab: target',
        '<p>Mit <code>target="_blank"</code> kann ein Link in einem neuen Tab geöffnet werden. Das kann überraschen: Kündige den neuen Tab im sichtbaren Linktext an. Screenreader lesen den Hinweis zusammen mit dem Linktext vor. So wissen auch Menschen, die sich die Seite vorlesen lassen, dass sich ein neuer Tab öffnet. Ob ein Tab oder Fenster erscheint, entscheidet der Browser. Ein aus der Vorschau geöffneter Tab übernimmt deren Einschränkungen; manche Websites funktionieren dort nicht vollständig.</p><pre><code>&lt;a href="https://example.org" target="_blank"&gt;Schule (neuer Tab)&lt;/a&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Ergänze bei deinem Weblink <code>target="_blank"</code> und den Hinweis „(neuer Tab)“ im Linktext.</p>',
        build(2), [cBlank], prev),
      S('M', 'Zusatzhinweis: title',
        '<p>Das Attribut <code>title</code> kann zusätzliche Informationen zu einem Link enthalten. Manche Browser zeigen sie beim Darüberfahren mit der Maus. Nicht alle Menschen erhalten diesen Hinweis: Der Linktext muss auch ohne <code>title</code> verständlich sein.</p><pre><code>&lt;a href="https://example.org" title="Informationen zur Schule"&gt;Website der Schule&lt;/a&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Ergänze bei deinem Weblink ein <code>title</code> mit einem zusätzlichen Hinweis.</p>',
        build(3), [cTitle], prev),
      S('M', 'Sicherer neuer Tab: rel',
        '<p>Bei Links mit <code>target="_blank"</code> kannst du <code>rel="noopener noreferrer"</code> ergänzen. <code>noopener</code> verhindert den Zugriff der neuen Seite auf das öffnende Fenster; <code>noreferrer</code> unterdrückt zusätzlich die Übermittlung der verweisenden Seitenadresse. Moderne Browser behandeln <code>_blank</code> bereits wie <code>noopener</code>.</p><pre><code>&lt;a href="https://example.org" target="_blank" rel="noopener noreferrer"&gt;Schule (neuer Tab)&lt;/a&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Ergänze bei deinem Weblink <code>rel="noopener noreferrer"</code>.</p>',
        build(4), [cRel], prev),
      S('M', 'Datei herunterladen: download',
        '<p>Das Attribut <code>download</code> schlägt dem Browser vor, das Linkziel herunterzuladen statt es anzuzeigen. Browser und Server können anders entscheiden; bei fremden Websites funktioniert es nicht immer.</p><pre><code>&lt;a href="bewerbung.pdf" download&gt;Bewerbung als PDF herunterladen&lt;/a&gt;</code></pre><p>Die Beispieldatei ist nicht in der Lernplattform enthalten. Lege eine eigene Datei mit diesem Namen neben deine gespeicherte HTML-Datei, um den Link außerhalb der Vorschau auszuprobieren. Keine persönlichen Unterlagen hochladen.</p>',
        '<p><strong>Aufgabe:</strong> Ergänze einen Link zu <code>bewerbung.pdf</code> mit <code>download</code> und einem passenden Linktext.</p>',
        build(5), [cDownload], prev),
      S('M', 'Absolute und relative URLs',
        '<p>Eine <strong>absolute URL</strong> enthält die vollständige Adresse, z. B. <code>https://example.org/</code>. Eine <strong>relative URL</strong> beschreibt den Weg ausgehend von der HTML-Datei: <code>kontakt.html</code> liegt im selben Ordner, <code>seiten/kontakt.html</code> in einem Unterordner. Schreibweise und Groß- und Kleinschreibung müssen stimmen.</p><pre><code>&lt;a href="https://example.org/"&gt;Website der Schule&lt;/a&gt;\n&lt;a href="kontakt.html"&gt;Zur Kontaktseite&lt;/a&gt;\n&lt;a href="seiten/kontakt.html"&gt;Kontaktseite im Unterordner&lt;/a&gt;</code></pre><p>Der Editor verwaltet nur eine HTML-Datei. Erstelle <code>kontakt.html</code> bei Bedarf separat und lege sie neben die gespeicherte Datei; dort kannst du den Link testen.</p>',
        '<p><strong>Aufgabe:</strong> Ergänze einen Link mit dem relativen Ziel <code>kontakt.html</code> und einem passenden Linktext. Dein absoluter Weblink bleibt erhalten.</p>',
        build(6), [cRelative], prev),
      S('M', 'Sprungziel: id',
        '<p>Das Attribut <code>id</code> gibt einem Element eine Kennung. Damit kannst du eine Stelle auf deiner Seite als Ziel für einen Link markieren. Eine <code>id</code> darf auf einer Seite nur einmal vorkommen und keine Leerzeichen enthalten.</p><pre><code>&lt;h2 id="schule"&gt;Schule&lt;/h2&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Gib einer vorhandenen <code>h2</code>-Überschrift eine eindeutige <code>id</code>, zum Beispiel <code>schule</code>.</p>',
        build(6).replace('<h2>Schule</h2>', '<h2 id="schule">Schule</h2>'), [
          C('Eine h2 hat eine id ohne Leerzeichen', function (d) { return some(d, 'h2[id]', function (h) { return !!h.id && !/\s/.test(h.id); }); }), cIds],
        { fromPrev: true, bilder: true, speicher: 15 }),
      S('M', 'Sprungmarken: id und #',
        '<p>Mit einer Sprungmarke verweist du auf eine Stelle derselben Seite. Im Link steht vor der <code>id</code> des Ziels ein <code>#</code>. Die Schreibweise muss genau übereinstimmen.</p><pre><code>&lt;a href="#schule"&gt;Zur Schule&lt;/a&gt;\n...\n&lt;h2 id="schule"&gt;Schule&lt;/h2&gt;</code></pre><p>Wenn ein Sprung in der Vorschau nicht funktioniert, probiere ihn in der gespeicherten HTML-Datei aus.</p>',
        '<p><strong>Aufgabe:</strong> Ergänze einen Link, der zur Überschrift mit deiner <code>id</code> springt.</p>',
        build(7), [cAnchor, cIds], { fromPrev: true, bilder: true, speicher: 6 }),
      S('R', 'Fehlersuche bei Links',
        '<p>Prüfe bei einem Link das Ziel und den sichtbaren Text. Bei Sprungmarken müssen <code>href="#name"</code> und <code>id="name"</code> genau zusammenpassen. Hier ein Beispiel für einen passenden Link und sein Ziel:</p><pre><code>&lt;a href="#interessen"&gt;Zu meinen Interessen&lt;/a&gt;\n...\n&lt;h2 id="interessen"&gt;Interessen&lt;/h2&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Repariere die drei Links: Ergänze ein fehlendes Ziel, korrigiere die Sprungmarke und gib dem leeren Link einen Text.</p>',
        FIX, [
          C('Alle drei Links haben ein Ziel und sichtbaren Text', function (d) { var a = list(d, 'a'); return a.length >= 3 && a.every(function (x) { return !!href(x) && !!text(x); }); }),
          C('Die Sprungmarke zeigt auf eine vorhandene id', function (d) { return some(d, 'a[href^="#"]', function (a) { return target(d, a); }); }),
          cIds], { start: FEHLER, speicher: 7 }),
      S('R', 'Eine zweite Seite verlinken',
        '<p>Eine Website kann aus mehreren HTML-Dateien bestehen. Dein Lebenslauf verweist bereits auf <code>kontakt.html</code>. Die Kontaktseite kann mit <code>href="lebenslauf.html"</code> zurückführen:</p><pre><code>&lt;a href="lebenslauf.html"&gt;Zurück zum Lebenslauf&lt;/a&gt;</code></pre><p>Speichere zuerst deinen Lebenslauf. Schreibe dann hier die Kontaktseite und speichere auch sie. Die Plattform schlägt Abgabenamen vor: Erstelle für den Test Kopien mit den Namen <code>lebenslauf.html</code> und <code>kontakt.html</code> im selben Ordner und öffne sie im Browser. Der Editor verwaltet nur eine Seite gleichzeitig. Verwende erfundene Daten.</p>',
        '<p><strong>Aufgabe:</strong> Schreibe eine Kontaktseite mit <code>lang="de"</code>, Zeichensatz, Titel, einer <code>h1</code> „Kontakt“, einem Absatz mit erfundenen Angaben und einem Link zu <code>lebenslauf.html</code>.</p>',
        KFIX, [
          C('Das html-Element hat lang="de" und im head steht meta charset="utf-8"', function (d) { var m = d.head.querySelector('meta[charset]'); return d.documentElement.getAttribute('lang') === 'de' && !!m && m.getAttribute('charset').toLowerCase() === 'utf-8'; }),
          C('Die Seite hat einen Titel und eine h1 „Kontakt“', function (d) { var t = d.head.querySelector('title'); return !!t && !!text(t) && some(d, 'h1', function (h) { return /^kontakt$/i.test(text(h)); }); }),
          C('Ein Absatz enthält eigene Kontaktangaben', function (d) { return some(d, 'p', function (p) { return !p.querySelector('a') && text(p).length > 0; }); }),
          C('Ein Link mit Text führt relativ zu lebenslauf.html', function (d) { return some(d, 'a[href]', function (a) { return /^(?:\.\/)?lebenslauf\.html$/i.test(href(a)) && !!text(a); }); })
        ], { start: KSTART, speicher: 16 }),
      S('R', 'Inhaltsverzeichnis mit Sprungmarken',
        '<p>Ein Inhaltsverzeichnis hilft bei der Orientierung. Ein <code>nav</code>-Element kennzeichnet einen Navigationsbereich. Darin kann eine Liste von Links auf die Überschriften deiner Seite stehen.</p><pre><code>&lt;nav aria-label="Inhaltsverzeichnis"&gt;\n  &lt;ul&gt;\n    &lt;li&gt;&lt;a href="#schule"&gt;Schule&lt;/a&gt;&lt;/li&gt;\n  &lt;/ul&gt;\n&lt;/nav&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Dein Lebenslauf aus den M-Folien ist wieder übernommen. Ergänze am Anfang ein <code>nav</code> mit einer Liste aus mindestens drei Links zu drei verschiedenen vorhandenen Überschriften. Gib diesen Überschriften passende, eindeutige <code>id</code>-Werte.</p>',
        build(8), [cToc, C('Die Links im nav stehen in einer Liste', function (d) { return some(d, 'nav', function (nav) { return list(nav, 'li a[href^="#"]').filter(function (a) { return target(d, a); }).length >= 3; }); }), cIds], { from: 7, bilder: true, speicher: 8 }),
      S('R', 'Verständliche Linktexte',
        '<p>Ein Linktext sollte auch allein verständlich sein, zum Beispiel „Website der Schule“ statt „hier klicken“. Screenreader können Links als Liste vorlesen. Ein Hinweis auf einen neuen Tab gehört sichtbar in den Linktext, nicht nur ins <code>title</code>. Nenne bei einem Download auch den Dateityp, damit vor dem Anklicken klar ist, was heruntergeladen wird.</p><pre><code>&lt;a href="https://example.org" target="_blank"&gt;Website der Schule (neuer Tab)&lt;/a&gt;\n&lt;a href="bewerbung.pdf" download&gt;Bewerbung als PDF herunterladen&lt;/a&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Kontrolliere deine Links und ergänze unter „Verweise“ einen zweiten Weblink mit aussagekräftigem Text. Verwende keine Linktexte wie „hier klicken“ oder „Link“. Ergänze im Text deines Download-Links den Dateityp „PDF“.</p>',
        build(9), [
          C('Mindestens zwei Weblinks haben Linktext', function (d) { return list(d, 'a[href]').filter(function (a) { return web(a) && !!text(a); }).length >= 2; }),
          C('Alle Links haben Text und keinen allgemeinen Text wie „hier klicken“', function (d) { var a = list(d, 'a'); return a.length > 0 && a.every(useful); }),
          C('Jeder Link zu einem neuen Tab weist im Text darauf hin', function (d) { return list(d, 'a[target]').filter(blank).every(newTabText); }),
          C('Der Download-Link zu bewerbung.pdf nennt PDF im Linktext', function (d) { return some(d, 'a[download][href]', function (a) { return /^(?:\.\/)?bewerbung\.pdf$/i.test(href(a)) && /\bpdf\b/i.test(text(a)); }); })],
        { fromPrev: true, bilder: true, speicher: 9 }),
      S('E', 'E-Mail: mailto',
        '<p><strong>Freiwillige Erweiterung:</strong> Ein Link mit <code>mailto:</code> kann ein eingerichtetes E-Mail-Programm öffnen. Es wird nicht automatisch eine Nachricht versendet.</p><pre><code>&lt;a href="mailto:kontakt@example.org"&gt;E-Mail schreiben&lt;/a&gt;</code></pre><p>Verwende eine erfundene Adresse und veröffentliche keine privaten Kontaktdaten. Ob ein Programm startet, hängt vom Gerät und Browser ab.</p>',
        '<p><strong>Aufgabe:</strong> Ergänze einen E-Mail-Link mit einer erfundenen Adresse und verständlichem Linktext.</p>',
        build(10), [C('Ein Link mit Text hat ein mailto-Ziel mit Adresse', function (d) { return some(d, 'a[href]', function (a) { return /^mailto:[^\s@?]+@[^\s@?]+/i.test(href(a)) && useful(a); }); })], { fromPrev: true, bilder: true, speicher: 10 }),
      S('E', 'Telefon: tel',
        '<p><strong>Freiwillige Erweiterung:</strong> Ein Link mit <code>tel:</code> übergibt eine Telefonnummer an eine passende Telefonie-App. Ob das funktioniert, hängt vom Gerät ab; es wird nicht automatisch ein Anruf aufgebaut.</p><pre><code>&lt;a href="tel:+491234567890"&gt;Telefon: +49 123 4567890&lt;/a&gt;</code></pre><p>Verwende eine erfundene Nummer. Die internationale Schreibweise beginnt mit <code>+</code> und der Landesvorwahl; die führende Null der Orts- oder Mobilfunkvorwahl entfällt.</p>',
        '<p><strong>Aufgabe:</strong> Ergänze einen Telefonlink mit einer erfundenen Nummer und verständlichem Linktext.</p>',
        build(11), [C('Ein Link mit Text hat ein tel-Ziel mit Telefonnummer', function (d) { return some(d, 'a[href]', function (a) { return /^tel:\+?[0-9][0-9().-]{2,}$/i.test(href(a)) && useful(a); }); })], { fromPrev: true, bilder: true, speicher: 11 }),
      S('E', 'Kontaktdaten sichtbar machen',
        '<p><strong>Freiwillige Erweiterung:</strong> Nicht auf jedem Gerät ist ein E-Mail- oder Telefonprogramm eingerichtet. Zeige deshalb die erfundene Adresse und Telefonnummer im Linktext, damit man sie auch lesen und abschreiben kann.</p><pre><code>&lt;a href="mailto:kontakt@example.org"&gt;kontakt@example.org&lt;/a&gt;\n&lt;a href="tel:+491234567890"&gt;+49 123 4567890&lt;/a&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Ändere die Linktexte deiner Kontaktlinks: Zeige die E-Mail-Adresse und die Telefonnummer an. Die Angaben müssen zu den jeweiligen Zielen passen.</p>',
        build(12), [
          C('Ein mailto-Link zeigt seine E-Mail-Adresse im Linktext', function (d) { return some(d, 'a[href]', function (a) { var address = href(a).replace(/^mailto:/i, '').split('?')[0]; return /^mailto:/i.test(href(a)) && !!address && text(a).toLowerCase().indexOf(address.toLowerCase()) >= 0; }); }),
          C('Ein tel-Link zeigt seine Telefonnummer im Linktext', function (d) { return some(d, 'a[href]', function (a) { var h = href(a), number = h.replace(/\D/g, ''), shown = text(a).replace(/\D/g, ''); return /^tel:/i.test(h) && number.length >= 3 && (shown === number || (h.indexOf('tel:+49') === 0 && shown === '0' + number.slice(2))); }); })
        ], { fromPrev: true, bilder: true, speicher: 17 }),
      S('E', 'E-Mail mit Betreff',
        '<p><strong>Freiwillige Erweiterung:</strong> Du kannst bei einem <code>mailto:</code>-Link einen Betreff vorbelegen. Nach der Adresse folgt <code>?subject=</code> und der Betreff. Ein Leerzeichen wird in der Adresse als <code>%20</code> geschrieben. Die Nachricht wird dadurch nicht automatisch versendet.</p><pre><code>&lt;a href="mailto:kontakt@example.org?subject=Bewerbung"&gt;kontakt@example.org&lt;/a&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Ergänze bei deinem E-Mail-Link den Betreff <code>Bewerbung</code>. Die Adresse bleibt im Linktext sichtbar.</p>',
        build(13), [C('Ein mailto-Link hat den Betreff Bewerbung', function (d) { return some(d, 'a[href]', function (a) { var h = href(a), q = h.indexOf('?'); return /^mailto:/i.test(h) && q >= 0 && new URLSearchParams(h.slice(q + 1)).get('subject') === 'Bewerbung'; }); })],
        { fromPrev: true, bilder: true, speicher: 18 }),
      S('E', 'Zurück zum Seitenanfang',
        '<p><strong>Freiwillige Erweiterung:</strong> Ein Link mit <code>href="#"</code> führt zum Anfang derselben Seite. Das kann bei langen Seiten hilfreich sein.</p><pre><code>&lt;a href="#"&gt;Nach oben&lt;/a&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Ergänze am Ende deines Lebenslaufs einen Link „Nach oben“ mit <code>href="#"</code>.</p>',
        build(14), [C('Ein Link mit href="#" hat einen passenden Linktext', function (d) { return some(d, 'a[href="#"]', function (a) { return /nach oben/i.test(text(a)); }); })],
        { fromPrev: true, bilder: true, speicher: 19 }),
      { titel: 'Modultest: Theorie', kurz: 'Theorie', badge: 'Modultest: Theorieteil', test: true, speicher: 12, fragen: [
        { f: 'Welches Element erstellt einen Link?', o: ['a', 'p', 'img', 'h2'], r: 0, e: 'Das a-Element enthält den sichtbaren Linktext.' },
        { f: 'Welches Attribut enthält das Linkziel?', o: ['alt', 'href', 'title', 'id'], r: 1, e: 'href gibt das Ziel des Links an.' },
        { f: 'Was bewirkt target="_blank"?', o: ['Es löscht das Ziel', 'Es öffnet das Ziel normalerweise in einem neuen Tab oder Fenster', 'Es lädt immer eine Datei herunter', 'Es macht den Link unsichtbar'], r: 1, e: 'Der Browser entscheidet, ob ein Tab oder Fenster geöffnet wird.' },
        { f: 'Was bewirkt rel="noopener" bei einem neuen Tab?', o: ['Es verhindert den Zugriff der neuen Seite auf das öffnende Fenster', 'Es fügt einen Ersatztext ein', 'Es färbt den Link', 'Es erstellt eine Sprungmarke'], r: 0, e: 'noopener schützt das öffnende Fenster vor Zugriff durch die neue Seite.' },
        { f: 'Welche Adresse ist relativ?', o: ['https://example.org/kontakt.html', 'kontakt.html', 'https://example.org/', 'https://www.wikipedia.org/'], r: 1, e: 'kontakt.html bezeichnet eine Datei relativ zur HTML-Seite.' },
        { f: 'Welcher Link passt zu id="schule"?', o: ['href="schule"', 'href="#schule"', 'href="id=schule"', 'href="#kontakt"'], r: 1, e: 'Bei einer Sprungmarke steht vor der id ein #.' },
        { f: 'Welcher Linktext beschreibt sein Ziel am besten?', o: ['Hier klicken', 'Mehr', 'Website der Schule', 'Link'], r: 2, e: 'Ein verständlicher Linktext beschreibt das Ziel auch ohne umgebenden Text.' },
        { f: 'Was macht das download-Attribut?', o: ['Es schlägt dem Browser einen Download des Ziels vor', 'Es erstellt die Datei automatisch', 'Es öffnet immer eine E-Mail', 'Es verhindert jeden Download'], r: 0, e: 'Ob heruntergeladen wird, hängt auch von Browser und Ziel ab.' }
      ] },
      S('E', 'Modultest: Praxis – Verweise im Lebenslauf',
        '<p>Überarbeite deinen Lebenslauf. Kontrolliere die Ziele auch selbst: Die automatische Prüfung kann nicht feststellen, ob eine externe Website erreichbar oder ein Linktext sinnvoll ist. Prüfe Sprungmarken bei Bedarf in der gespeicherten Datei.</p><p>Zur Erinnerung: Ein Link auf eine Überschrift und ein externer Link können so aussehen:</p><pre><code>&lt;a href="#interessen"&gt;Zu meinen Interessen&lt;/a&gt;\n...\n&lt;h2 id="interessen"&gt;Interessen&lt;/h2&gt;\n&lt;a href="https://example.org"&gt;Website der Schule&lt;/a&gt;</code></pre>',
        '<p><strong>Aufgabe:</strong> Ergänze ein Inhaltsverzeichnis mit mindestens drei Links zu verschiedenen Überschriften und eine Verweissammlung mit mindestens zwei externen Weblinks. Einer öffnet einen neuen Tab, nennt das im Linktext und hat <code>rel="noopener noreferrer"</code>. Verwende verständliche Linktexte.</p>',
        build(9), [cToc, cIds,
          C('Mindestens zwei Weblinks haben Linktext', function (d) { return list(d, 'a[href]').filter(function (a) { return web(a) && useful(a); }).length >= 2; }),
          C('Ein Weblink öffnet einen angekündigten neuen Tab und hat noopener und noreferrer', function (d) { return some(d, 'a[href]', function (a) { return web(a) && blank(a) && newTabText(a) && rel(a, 'noopener') && rel(a, 'noreferrer'); }); }),
          C('Alle Links haben Text statt „hier klicken“ oder „Link“', function (d) { var a = list(d, 'a'); return a.length > 0 && a.every(useful); })],
        { from: 11, g: 'T', kurz: 'Praxis', badge: 'Modultest: Praxisteil', bilder: true, speicher: 13 }),
      { titel: 'Reflexion', reflexion: true, speicher: 14,
        items: ['Links mit a und href erstellen.', 'absolute und relative URLs unterscheiden.', 'Sprungmarken mit id und href verwenden.', 'ein Inhaltsverzeichnis mit internen Links erstellen.', 'verständliche Linktexte schreiben und neue Tabs ankündigen.', 'erklären, wie ein Link zu einer Datei funktioniert.'] }
    ]
  });
})();
