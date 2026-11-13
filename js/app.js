(function () {
  'use strict';
  var M = window.MODULES, K = 'hcjs:', timer;
  function $(s) { return document.querySelector(s); }
  function get(k, d) { try { var v = localStorage.getItem(K + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(K + k, JSON.stringify(v)); } catch (e) {} }
  var cur = get('cur', [0, 0]);
  if (!M[cur[0]] || !M[cur[0]].schritte[cur[1]]) cur = [0, 0];
  function key(m, s) { return m + '-' + s; }
  function step() { return M[cur[0]].schritte[cur[1]]; }
  var LV = { M: 'Mindeststandard (M)', R: 'Regelstandard (R)', E: 'Expertenstandard (E)' };

  /* Herkunft des Codes: from = Index einer Folie, fromPrev = vorige Folie */
  function fromIdx(m, s) {
    var st = M[m].schritte[s];
    if (typeof st.from === 'number') return st.from;
    return st.fromPrev && s > 0 ? s - 1 : -1;
  }
  function startCode(m, s) {
    var fm = M[m].schritte[s].fromMod;
    if (fm) return get('code:' + key(fm[0], fm[1]), M[fm[0]].schritte[fm[1]].loesung);
    var f = fromIdx(m, s);
    if (f >= 0) return get('code:' + key(m, f), M[m].schritte[f].loesung);
    return M[m].schritte[s].start;
  }
  function inherited(m, s) {
    var out = [], f = fromIdx(m, s);
    while (f >= 0) { out = out.concat(M[m].schritte[f].checks || []); f = fromIdx(m, f); }
    return out;
  }

  /* Syntax-Highlighting (HTML) */
  function esc(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function sp(c, t) { return '<span class="' + c + '">' + esc(t) + '</span>'; }
  function hlAttrs(a) {
    return a.replace(/(\s+)|([^\s=]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s"'=]+))?/g, function (m, ws, name, eq, val) {
      return ws ? ws : sp('a', name) + (eq ? esc(eq) : '') + (val ? sp('s', val) : '');
    });
  }
  function hl(src) {
    var out = '', last = 0, m, re = /<!--[\s\S]*?-->|<![^>]*>|<(\/?)([A-Za-z][\w-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index)); last = re.lastIndex;
      if (m[0].indexOf('<!') === 0) { out += sp(m[0].indexOf('<!--') === 0 ? 'c' : 'd', m[0]); continue; }
      out += sp('t', '<' + m[1] + m[2]) + hlAttrs(m[3]) + sp('t', '>');
    }
    return out + esc(src.slice(last)) + '\n';
  }
  function paint() {
    var ta = $('#editor'), pre = $('#hl');
    $('#hlcode').innerHTML = hl(ta.value);
    pre.scrollTop = ta.scrollTop; pre.scrollLeft = ta.scrollLeft;
  }
  /* Bilder: Beispielbild und eigene Bilder bleiben im Browser (localStorage) */
  var SAMPLE = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="#dfe6f3"/><circle cx="150" cy="115" r="55" fill="#8da2c8"/><path d="M45 285c0-65 48-105 105-105s105 40 105 105z" fill="#8da2c8"/></svg>');
  var IMG = get('imgs', {});
  function bilder() { return ['beispiel.svg'].concat(Object.keys(IMG)); }
  function previewCode() {
    var c = $('#editor').value, m = { 'beispiel.svg': SAMPLE }, k;
    for (k in IMG) m[k] = IMG[k];
    Object.keys(m).forEach(function (nm) { ['"', "'"].forEach(function (q) { c = c.split(q + nm + q).join(q + m[nm] + q); }); });
    return c;
  }
  function preview() { $('#vorschau').srcdoc = previewCode(); }
  function renderBilder() { $('#bildListe').textContent = bilder().join(', '); }

  function gOf(st) { return st.g || (st.reflexion ? 'X' : st.test ? 'T' : st.level); }
  var ORDER = ['M', 'R', 'E', 'T', 'X'];
  function groupIdx(m, g) { var out = []; M[m].schritte.forEach(function (s, i) { if (gOf(s) === g) out.push(i); }); return out; }
  function isDone(m, i) { return get('done:' + key(m, i), false); }
  function go(m, i) { cur = [m, i]; set('cur', cur); show(); $('#main').focus(); }

  function renderNav() {
    var nav = $('#nav'); nav.textContent = '';
    M.forEach(function (mod, mi) {
      var h = document.createElement('h2'); h.textContent = mod.titel; nav.appendChild(h);
      var ul = document.createElement('ul');
      ORDER.forEach(function (g) {
        var idx = groupIdx(mi, g); if (!idx.length) return;
        var done = idx.filter(function (i) { return isDone(mi, i); }).length;
        var li = document.createElement('li'), b = document.createElement('button');
        b.type = 'button';
        b.textContent = mod.gruppen[g] + (idx.length > 1 ? ' (' + done + '/' + idx.length + ')' : '') + (done === idx.length ? ' ✓' : '');
        if (mi === cur[0] && gOf(step()) === g) b.setAttribute('aria-current', 'step');
        b.onclick = function () { var r = get('grp:' + mi + g, idx[0]); go(mi, idx.indexOf(r) > -1 ? r : idx[0]); };
        li.appendChild(b); ul.appendChild(li);
      });
      nav.appendChild(ul);
    });
  }

  function renderFolien() {
    var mod = M[cur[0]], g = gOf(step()), box = $('#folien'), idx = groupIdx(cur[0], g), last = mod.schritte.length - 1;
    box.textContent = ''; box.hidden = g === 'X';
    if (g === 'X') return;
    function mk(txt, fn, cls) { var b = document.createElement('button'); b.type = 'button'; b.textContent = txt; b.onclick = fn; if (cls) b.className = cls; return b; }
    if (cur[1] > 0) {
      var p = cur[1] - 1, pg = gOf(mod.schritte[p]);
      box.appendChild(mk(pg === g ? '← Zurück' : '← Zurück zu ' + mod.gruppen[pg], function () { go(cur[0], p); }));
    }
    if (idx.length > 1) {
      var row = document.createElement('span'); row.className = 'nums';
      idx.forEach(function (i, n) {
        var s = mod.schritte[i], d = isDone(cur[0], i), b = mk((d ? '✓ ' : '') + (s.kurz || (n + 1)), function () { go(cur[0], i); }, 'num');
        b.title = s.titel; b.setAttribute('aria-label', 'Folie ' + (n + 1) + ' von ' + idx.length + ': ' + s.titel + (d ? ', erledigt' : ''));
        if (i === cur[1]) b.setAttribute('aria-current', 'step');
        row.appendChild(b);
      });
      box.appendChild(row);
    }
    if (cur[1] < last) {
      var q = cur[1] + 1, qg = gOf(mod.schritte[q]);
      box.appendChild(mk(qg === g ? 'Weiter →' : 'Weiter zu ' + mod.gruppen[qg] + ' →', function () { go(cur[0], q); }, 'next'));
    }
  }

  function show() {
    var mod = M[cur[0]], st = step(), k = key(cur[0], cur[1]);
    renderNav();
    $('#stepTitle').textContent = st.titel;
    $('#modTitle').textContent = mod.titel;
    var lv = $('#level');
    lv.textContent = st.badge || (st.reflexion ? 'Reflexion' : LV[st.level]);
    lv.className = 'badge ' + (st.reflexion ? 'X' : st.test ? 'T' : st.level);
    set('grp:' + cur[0] + gOf(st), cur[1]); renderFolien();
    $('#lernen').hidden = !!(st.reflexion || st.test);
    $('#testSec').hidden = !st.test;
    $('#reflexion').hidden = !st.reflexion;
    if (st.reflexion) return renderRefl(st);
    if (st.test) return renderTest(st);
    $('#info').innerHTML = st.info; $('#aufgabe').innerHTML = st.aufgabe;
    $('#carry').hidden = fromIdx(cur[0], cur[1]) < 0 && !st.fromMod;
    $('#bildPanel').hidden = !st.bilder; renderBilder();
    showName();
    $('#editor').value = get('code:' + k, startCode(cur[0], cur[1]));
    $('#ergebnis').textContent = ''; $('#status').textContent = ''; $('#loesung').open = false; $('#loesungCode').textContent = '';
    paint(); preview();
  }

  function pruefen() {
    var st = step(), c = $('#editor').value, d = new DOMParser().parseFromString(c, 'text/html'), all = true, ul = $('#ergebnis'), ctx = { bilder: bilder() };
    ul.textContent = '';
    function line(ok, t) {
      var li = document.createElement('li'); li.className = ok ? 'ok' : 'fail';
      li.textContent = (ok ? '✓ ' : '✗ ') + t; ul.appendChild(li); if (!ok) all = false;
    }
    st.checks.forEach(function (ch) { var ok = false; try { ok = !!ch.test(d, c, ctx); } catch (e) {} line(ok, ch.text); });
    var inh = inherited(cur[0], cur[1]);
    if (inh.length) {
      var bad = inh.filter(function (ch) { try { return !ch.test(d, c, ctx); } catch (e) { return true; } });
      if (bad.length) bad.forEach(function (ch) { line(false, 'Bisher erarbeitet: ' + ch.text); });
      else line(true, 'Alles Bisherige ist noch vorhanden');
    }
    $('#status').textContent = all ? 'Super! Alle Prüfungen bestanden.' : 'Noch nicht ganz: Schau dir die Punkte mit ✗ an.';
    if (all) { set('done:' + key(cur[0], cur[1]), true); renderNav(); renderFolien(); }
  }

  function renderTest(st) {
    var f = $('#testForm'); f.textContent = ''; $('#testErg').textContent = '';
    st.fragen.forEach(function (q, i) {
      var fs = document.createElement('fieldset'), lg = document.createElement('legend');
      lg.textContent = (i + 1) + '. ' + q.f; fs.appendChild(lg);
      q.o.forEach(function (o, j) {
        var lab = document.createElement('label'), r = document.createElement('input');
        r.type = 'radio'; r.name = 'q' + i; r.value = j; r.style.width = 'auto';
        lab.style.display = 'block'; lab.appendChild(r); lab.appendChild(document.createTextNode(' ' + o)); fs.appendChild(lab);
      });
      f.appendChild(fs);
    });
  }
  function auswerten() {
    var st = step(), f = $('#testForm'), ok = 0, box = $('#testErg'), ul = document.createElement('ul'), p = document.createElement('p');
    box.textContent = ''; ul.className = 'checks';
    st.fragen.forEach(function (q, i) {
      var s = f.querySelector('input[name=q' + i + ']:checked'), good = !!s && +s.value === q.r, li = document.createElement('li');
      if (good) ok++;
      li.className = good ? 'ok' : 'fail';
      li.textContent = (good ? '✓ ' : '✗ ') + (i + 1) + '. ' + (good ? 'richtig' : (s ? 'falsch. ' : 'nicht beantwortet. ') + q.e);
      ul.appendChild(li);
    });
    var pass = ok >= Math.ceil(st.fragen.length * 0.75);
    p.textContent = ok + ' von ' + st.fragen.length + ' richtig. ' + (pass ? 'Bestanden!' : 'Noch nicht bestanden: Lies die Hinweise und versuche es noch einmal.');
    box.appendChild(p); box.appendChild(ul);
    if (pass) { set('done:' + key(cur[0], cur[1]), true); renderNav(); renderFolien(); }
  }

  function renderRefl(st) {
    var box = $('#reflItems'), k = key(cur[0], cur[1]); box.textContent = '';
    st.items.forEach(function (t, i) {
      var f = document.createElement('fieldset'), l = document.createElement('legend');
      l.textContent = 'Ich kann ' + t; f.appendChild(l);
      ['sicher', 'unsicher', 'noch nicht'].forEach(function (o) {
        var lab = document.createElement('label'), r = document.createElement('input');
        r.type = 'radio'; r.name = 'r' + i; r.value = o; r.style.width = 'auto';
        r.checked = get('refl:' + k + ':' + i, '') === o;
        r.onchange = function () { set('refl:' + k + ':' + i, o); };
        lab.appendChild(r); lab.appendChild(document.createTextNode(' ' + o)); f.appendChild(lab);
      });
      box.appendChild(f);
    });
    ['A', 'B'].forEach(function (x) {
      var t = $('#refl' + x); t.value = get('refl' + x + ':' + k, '');
      t.oninput = function () { set('refl' + x + ':' + k, t.value); };
    });
  }

  function fname() {
    var nm = ($('#nachname').value || '').replace(/[^A-Za-zÄÖÜäöüß-]/g, '') || 'Nachname', g = gOf(step());
    return 'HC' + (cur[0] + 1) + '_' + nm + '_' + g + '_F' + (groupIdx(cur[0], g).indexOf(cur[1]) + 1) + '.html';
  }
  function showName() { $('#dname').textContent = 'Dateiname beim Speichern: ' + fname(); }

  var ta = $('#editor');
  ta.addEventListener('input', function () {
    set('code:' + key(cur[0], cur[1]), ta.value); paint();
    clearTimeout(timer); timer = setTimeout(preview, 300);
  });
  ta.addEventListener('scroll', function () { $('#hl').scrollTop = ta.scrollTop; $('#hl').scrollLeft = ta.scrollLeft; });
  $('#bildInput').onchange = function () {
    var f = this.files[0], inp = this; if (!f) return;
    var nm = f.name.replace(/[^A-Za-z0-9._-]/g, '_'), rd = new FileReader(), info = $('#bildInfo');
    info.textContent = '';
    function save(url) {
      IMG[nm] = url; var ks = Object.keys(IMG); while (ks.length > 3) delete IMG[ks.shift()];
      set('imgs', IMG); renderBilder(); preview(); inp.value = '';
      info.textContent = 'Geladen. Schreibe in src genau: ' + nm;
    }
    rd.onload = function () {
      if (/svg/.test(f.type)) return save(rd.result);
      var im = new Image();
      im.onload = function () {
        var w = Math.min(600, im.width), h = Math.round(im.height * w / im.width), cv = document.createElement('canvas'), cx;
        cv.width = w; cv.height = h; cx = cv.getContext('2d'); cx.fillStyle = '#fff'; cx.fillRect(0, 0, w, h); cx.drawImage(im, 0, 0, w, h);
        save(cv.toDataURL('image/jpeg', 0.8));
      };
      im.onerror = function () { info.textContent = 'Diese Datei konnte nicht als Bild gelesen werden.'; };
      im.src = rd.result;
    };
    rd.readAsDataURL(f);
  };
  $('#bildLoeschen').onclick = function () { IMG = {}; set('imgs', {}); renderBilder(); preview(); $('#bildInfo').textContent = 'Deine geladenen Bilder wurden gelöscht.'; };
  $('#pruefen').onclick = pruefen;
  $('#auswerten').onclick = auswerten;
  $('#zeigen').onclick = function () { $('#loesungCode').textContent = step().loesung; $('#loesung').open = true; };
  $('#reset').onclick = function () {
    if (!window.confirm('Deinen Code für diese Folie zurücksetzen?')) return;
    set('code:' + key(cur[0], cur[1]), startCode(cur[0], cur[1])); show();
  };
  $('#download').onclick = function () {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ta.value], { type: 'text/html' }));
    a.download = fname();
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };
  $('#nachname').value = get('nachname', '');
  $('#nachname').oninput = function () { set('nachname', this.value); showName(); };
  show();
})();
