const slides = [
    {
        title: "Schritt 1: Das Grundgerüst & Name",
        level: "Mindeststandard (M)",
        badgeClass: "badge-m",
        description: "Jede Webseite braucht ein Grundgerüst. Ergänze im <code>&lt;body&gt;</code>-Bereich deinen Namen als Hauptüberschrift.",
        explanation: "HTML-Befehle bestehen meist aus einem <b>eröffnenden Tag</b> (z. B. <code>&lt;h1&gt;</code>) und einem <b>schließenden Tag</b> (z. B. <code>&lt;/h1&gt;</code>). Dazwischen steht der Text. Das Element <code>&lt;h1&gt;</code> steht für 'Heading 1' (wichtigste Überschrift).",
        example: "<code>&lt;h1&gt;Max Mustermann&lt;/h1&gt;</code>",
        code: `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Mein Lebenslauf</title>\n</head>\n<body>\n  <!-- Füge hier deine h1-Überschrift ein -->\n  \n</body>\n</html>`,
        solution: `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Mein Lebenslauf</title>\n</head>\n<body>\n  <h1>Max Mustermann</h1>\n</body>\n</html>`,
        rules: [{ tag: "h1" }]
    },
    {
        title: "Schritt 2: Das Kurzprofil (Absatz)",
        level: "Mindeststandard (M)",
        badgeClass: "badge-m",
        description: "Baue auf deinem Code auf! Füge unter deiner Überschrift mit dem <code>&lt;p&gt;</code>-Element einen kurzen Textabsatz über deine Interessen ein.",
        explanation: "Das <code>&lt;p&gt;</code>-Element steht für 'Paragraph' (Absatz). Es erzeugt automatisch einen neuen Zeilenumbruch im Browser.",
        example: "<code>&lt;p&gt;Ich interessiere mich für Informatik.&lt;/p&gt;</code>",
        code: `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Mein Lebenslauf</title>\n</head>\n<body>\n  <h1>Dein Name</h1>\n  <!-- Füge hier deinen p-Absatz ein -->\n  \n</body>\n</html>`,
        solution: `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Mein Lebenslauf</title>\n</head>\n<body>\n  <h1>Dein Name</h1>\n  <p>Ich interessiere mich sehr für Webentwicklung.</p>\n</body>\n</html>`,
        rules: [{ tag: "h1" }, { tag: "p" }]
    },
    {
        title: "Schritt 3: Text formatieren",
        level: "Mindeststandard (M)",
        badgeClass: "badge-m",
        description: "Hebe wichtige Wörter in deinem Absatz hervor. Nutze <code>&lt;b&gt;</code> für fettgedruckten Text und <code>&lt;i&gt;</code> für kursiven Text.",
        explanation: "Elemente können 'geschachtelt' werden. Das <code>&lt;b&gt;</code>-Element (für 'bold') und <code>&lt;i&gt;</code>-Element (für 'italic') werden direkt innerhalb deines <code>&lt;p&gt;</code>-Absatzes um einzelne Wörter gelegt.",
        example: "<code>&lt;p&gt;Ich bin &lt;b&gt;sehr&lt;/b&gt; motiviert.&lt;/p&gt;</code>",
        code: `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Mein Lebenslauf</title>\n</head>\n<body>\n  <h1>Dein Name</h1>\n  <p>Ich interessiere mich sehr für Webentwicklung.</p>\n</body>\n</html>`,
        solution: `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Mein Lebenslauf</title>\n</head>\n<body>\n  <h1>Dein Name</h1>\n  <p>Ich interessiere mich <b>sehr</b> für <i>Webentwicklung</i>.</p>\n</body>\n</html>`,
        rules: [{ tag: "b" }, { tag: "i" }]
    },
    {
        title: "Schritt 4: Struktur durch Unterüberschriften",
        level: "Regelstandard (S)",
        badgeClass: "badge-s",
        description: "Strukturiere den Lebenslauf weiter. Füge eine Unterüberschrift <code>&lt;h2&gt;</code> (z. B. 'Meine Hobbys') unter deinem Profil hinzu.",
        explanation: "Überschriften gibt es von <code>&lt;h1&gt;</code> bis <code>&lt;h6&gt;</code>. Das <code>&lt;h2&gt;</code>-Element ist die direkte Unterüberschrift der Hauptüberschrift. Beachte die korrekte Reihenfolge (Hierarchie) für eine gute Struktur.",
        example: "<code>&lt;h2&gt;Meine Hobbys&lt;/h2&gt;</code>",
        code: `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Mein Lebenslauf</title>\n</head>\n<body>\n  <h1>Dein Name</h1>\n  <p>Ich interessiere mich <b>sehr</b> für <i>Webentwicklung</i>.</p>\n  \n  <!-- Füge hier h2 ein -->\n\n</body>\n</html>`,
        solution: `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Mein Lebenslauf</title>\n</head>\n<body>\n  <h1>Dein Name</h1>\n  <p>Ich interessiere mich <b>sehr</b> für <i>Webentwicklung</i>.</p>\n  <h2>Meine Hobbys</h2>\n</body>\n</html>`,
        rules: [{ tag: "h1" }, { tag: "p" }, { tag: "h2" }]
    },
    {
        title: "Schritt 5: Eine Aufzählung hinzufügen",
        level: "Regelstandard (S)",
        badgeClass: "badge-s",
        description: "Erstelle unter deiner neuen Überschrift eine ungeordnete Liste <code>&lt;ul&gt;</code> mit mindestens zwei Listenpunkten <code>&lt;li&gt;</code>.",
        explanation: "Eine Liste besteht immer aus einem Rahmen-Element <code>&lt;ul&gt;</code> (unordered list). Innerhalb dieses Rahmens wird jeder einzelne Aufzählungspunkt mit einem <code>&lt;li&gt;</code>-Element (list item) umschlossen.",
        example: "<code>&lt;ul&gt;\n  &lt;li&gt;Lesen&lt;/li&gt;\n  &lt;li&gt;Sport&lt;/li&gt;\n</ul></code>",
        code: `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Mein Lebenslauf</title>\n</head>\n<body>\n  <h1>Dein Name</h1>\n  <p>Mein Profil.</p>\n  <h2>Meine Hobbys</h2>\n  <!-- Füge hier ul und li ein -->\n\n</body>\n</html>`,
        solution: `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Mein Lebenslauf</title>\n</head>\n<body>\n  <h1>Dein Name</h1>\n  <p>Mein Profil.</p>\n  <h2>Meine Hobbys</h2>\n  <ul>\n    <li>Lesen</li>\n    <li>Programmieren</li>\n  </ul>\n</body>\n</html>`,
        rules: [{ tag: "h2" }, { tag: "ul" }, { tag: "li" }]
    },
    {
        title: "Schritt 6: Ausblick – Die Tabelle",
        level: "Expertenstandard (E)",
        badgeClass: "badge-e",
        description: "Greifen wir Modul 2 vor! Baue eine kleine Tabelle <code>&lt;table&gt;</code> mit einer Zeile <code>&lt;tr&gt;</code> und zwei Datenzellen <code>&lt;td&gt;</code> (z. B. Jahr und Schule).",
        explanation: "Tabellen werden von außen nach innen gebaut: Das <code>&lt;table&gt;</code>-Element definiert die Tabelle. Das <code>&lt;tr&gt;</code>-Element erzeugt eine Zeile (table row). Das <code>&lt;td&gt;</code>-Element erzeugt eine Zelle (table data) in dieser Zeile.",
        example: "<code>&lt;table&gt;\n  &lt;tr&gt;\n    &lt;td&gt;2025&lt;/td&gt;\n    &lt;td&gt;Marienschule&lt;/td&gt;\n  &lt;/tr&gt;\n</table></code>",
        code: `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Mein Lebenslauf</title>\n</head>\n<body>\n  <h2>Schulbildung</h2>\n  <!-- Füge hier table, tr und td ein -->\n\n</body>\n</html>`,
        solution: `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <title>Mein Lebenslauf</title>\n</head>\n<body>\n  <h2>Schulbildung</h2>\n  <table>\n    <tr>\n      <td>2020 - Heute</td>\n      <td>Marienschule Offenbach</td>\n    </tr>\n  </table>\n</body>\n</html>`,
        rules: [{ tag: "table" }, { tag: "tr" }, { tag: "td" }]
    },
    {
        title: "Schritt 7: Der finale Abschlusstest",
        level: "Wissenstest",
        badgeClass: "badge-test",
        description: "Jetzt gilt es! Schreibe das komplette Grundgerüst <b>samt Meta-Daten</b> und baue im <code>&lt;body&gt;</code> einen Lebenslauf, der <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;b&gt;</code>, <code>&lt;i&gt;</code>, <code>&lt;ul&gt;</code>, <code>&lt;li&gt;</code> und <code>&lt;table&gt;</code> enthält.",
        explanation: "Zur Wiederholung: Der <code>&lt;head&gt;</code>-Bereich ist für den Browser (Metadaten, Titel), der <code>&lt;body&gt;</code>-Bereich enthält alles, was der Nutzer am Ende auf der Webseite sehen soll.",
        example: "(Dein eigener Code)",
        code: `<!-- Schreibe deinen kompletten HTML-Code hier selbst -->\n`,
        solution: `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="utf-8">\n  <meta name="description" content="Mein Lebenslauf als Webseite">\n  <title>Lebenslauf</title>\n</head>\n<body>\n  <h1>Mein Name</h1>\n  <p>Mein <b>Profil</b> ist <i>spannend</i>.</p>\n  <h2>Hobbys</h2>\n  <ul><li>Hobby 1</li></ul>\n  <table><tr><td>2025</td></tr></table>\n</body>\n</html>`,
        rules: [
            { tag: "title" }, { tag: "h1" }, { tag: "p" }, { tag: "b" }, { tag: "i" }, { tag: "ul" }, { tag: "li" }, { tag: "table" }
        ]
    }
];

let currentSlide = 0;
const solvedStatus = new Array(slides.length).fill(false);
let flaskEditor = null; 

function validateHtmlStructure(rawCode, rules) {
    const trimmedCode = rawCode.trim();
    if (!trimmedCode) return { valid: false, message: "Das Eingabefeld ist leer." };

    const parser = new DOMParser();
    const doc = parser.parseFromString(trimmedCode, "text/html");

    for (const rule of rules) {
        const tag = rule.tag.toLowerCase();
        
        if (tag !== "title" && tag !== "meta") {
            const tagPattern = new RegExp(`<\\/${tag}>`, "i");
            if (!tagPattern.test(trimmedCode)) {
                return {
                    valid: false,
                    message: `Formfehler: Das Element <code>&lt;${tag}&gt;</code> fehlt oder der schließende Tag <code>&lt;/${tag}&gt;</code> wurde vergessen.`
                };
            }
        }

        let elements = doc.querySelectorAll(tag);
        if (elements.length === 0) {
            return {
                valid: false,
                message: `Fehler: Das Element <code>&lt;${tag}&gt;</code> ist falsch geschrieben oder fehlt.`
            };
        }
    }

    if (currentSlide === slides.length - 1) {
        const metaDesc = doc.querySelector('meta[name="description"]');
        if (!metaDesc) {
            return { valid: false, message: "Fehler: Das <code>&lt;meta&gt;</code>-Element mit der Beschreibung (description) fehlt im Head." };
        }
    }

    return { valid: true, message: "Hervorragend! Die HTML-Struktur ist korrekt." };
}

function renderSlide() {
    const container = document.getElementById("slide-container");
    const nextBtn = document.getElementById("next-btn");
    
    if (currentSlide === slides.length) {
        renderSummary(container);
        return;
    }

    const slide = slides[currentSlide];
    
    container.innerHTML = `
        <div class="slide-content">
            <div class="badge-container">
                <span class="badge ${slide.badgeClass}">${slide.level}</span>
            </div>
            <h2>${slide.title}</h2>
            <p>${slide.description}</p>
            
            <div class="info-box">
                <strong>Erklärung:</strong> ${slide.explanation}<br><br>
                <strong>Beispiel:</strong> <br><div class="example-box">${slide.example}</div>
            </div>
            
            <span class="editor-label">Live-Editor (Syntax-Highlighting aktiviert):</span>
            <div id="code-editor" class="code-editor-container"></div>
            
            <div class="preview-box" id="preview-box"></div>

            <div class="check-container">
                <button id="check-btn" class="check-btn">Code ausführen & prüfen</button>
            </div>
            <div id="feedback-box" class="feedback-box"></div>

            <div class="solution-container">
                <button id="toggle-solution-btn" class="solution-btn">Musterlösung anzeigen</button>
                <div id="solution-box" class="solution-box">
                    ${escapeHtml(slide.solution)}
                </div>
            </div>
        </div>
    `;

    flaskEditor = new CodeFlask('#code-editor', { 
        language: 'html', 
        lineNumbers: true,
        defaultTheme: false 
    });
    
    flaskEditor.updateCode(slide.code);
    const previewBox = document.getElementById("preview-box");
    
    const updatePreview = (code) => {
        previewBox.innerHTML = code;
    };
    updatePreview(slide.code);
    
    flaskEditor.onUpdate((code) => {
        updatePreview(code);
        document.getElementById("feedback-box").style.display = "none";
    });

    const checkBtn = document.getElementById("check-btn");
    const feedbackBox = document.getElementById("feedback-box");
    const toggleBtn = document.getElementById("toggle-solution-btn");
    const solutionBox = document.getElementById("solution-box");

    if (solvedStatus[currentSlide]) {
        feedbackBox.className = "feedback-box feedback-success";
        feedbackBox.innerHTML = "Bereits gelöst! Formale Struktur ist korrekt.";
        feedbackBox.style.display = "block";
    }

    checkBtn.addEventListener("click", () => {
        const result = validateHtmlStructure(flaskEditor.getCode(), slide.rules);
        feedbackBox.style.display = "block";

        if (result.valid) {
            feedbackBox.className = "feedback-box feedback-success";
            feedbackBox.innerHTML = result.message;
            solvedStatus[currentSlide] = true;
        } else {
            feedbackBox.className = "feedback-box feedback-error";
            feedbackBox.innerHTML = result.message;
        }
    });

    toggleBtn.addEventListener("click", () => {
        if (solutionBox.style.display === "none" || solutionBox.style.display === "") {
            solutionBox.style.display = "block";
            toggleBtn.innerText = "Musterlösung verbergen";
        } else {
            solutionBox.style.display = "none";
            toggleBtn.innerText = "Musterlösung anzeigen";
        }
    });

    document.getElementById("slide-counter").innerText = `Schritt ${currentSlide + 1} von ${slides.length}`;
    document.getElementById("prev-btn").disabled = currentSlide === 0;
    nextBtn.disabled = false;
    nextBtn.innerText = currentSlide === slides.length - 1 ? "Zum Ergebnis →" : "Nächster Schritt →";
}

function renderSummary(container) {
    const correctCount = solvedStatus.filter(Boolean).length;
    const totalCount = slides.length;
    const percentage = Math.round((correctCount / totalCount) * 100);

    let listHtml = "<ul class='summary-list'>";
    slides.forEach((slide, index) => {
        const isDone = solvedStatus[index];
        const statusText = isDone ? "✅ Bestanden" : "❌ Offen";
        const color = isDone ? "#166534" : "#991b1b";
        listHtml += `<li><b>Schritt ${index + 1}:</b> ${slide.title.split(':')[0]} – <span style="color: ${color}; float: right;">${statusText}</span></li>`;
    });
    listHtml += "</ul>";

    container.innerHTML = `
        <div class="slide-content" style="text-align: center;">
            <h2>Abschlussbericht: HTML-Modul 1</h2>
            <div class="summary-score">${correctCount} von ${totalCount} Aufgaben gelöst (${percentage}%)</div>
            ${listHtml}
        </div>
    `;

    document.getElementById("slide-counter").innerText = "Abschluss";
    document.getElementById("next-btn").disabled = true;
}

function nextSlide() { if (currentSlide <= slides.length) { currentSlide++; renderSlide(); } }
function prevSlide() { if (currentSlide > 0) { currentSlide--; renderSlide(); } }
function escapeHtml(text) { return text.replace(/</g, "<").replace(/>/g, ">"); }

renderSlide();