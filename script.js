const slides = [
    {
        title: "Schritt 1: Der Name als Hauptüberschrift",
        description: "Jeder Lebenslauf beginnt mit dem Namen im Kopf. Verwende das <b><h1></b>-Element, um deinen vollständigen Namen als Hauptüberschrift festzulegen.",
        code: "<h1>Dein Name</h1>",
        solution: "<h1>Max Mustermann</h1>"
    },
    {
        title: "Schritt 2: Wohnort und Hervorhebung",
        description: "Nutze das <b><b></b>-Element, um deinen Wohnort fett zu markieren, und das <b><i></b>-Element für deine Berufsbezeichnung kursiv.",
        code: "<b>Wohnort:</b> <i>Beruf</i>",
        solution: "<b>Offenbach am Main</b> – <i>Schüler</i>"
    },
    {
        title: "Schritt 3: Das Kurzprofil (Absatz)",
        description: "Füge mit dem <b><p></b>-Element einen kurzen, aussagekräftigen Textabsatz über deine Ziele oder Interessen im Lebenslauf ein.",
        code: "<p>Hier steht dein kurzer Beschreibungstext...</p>",
        solution: "<p>Motivierter Lernender mit großem Interesse an Webentwicklung und Informatik.</p>"
    },
    {
        title: "Schritt 4: Strukturierte Abschnitte (Überschriften)",
        description: "Gliedere deinen Lebenslauf mit einer Unterüberschrift <b><h2></b> für den nächsten Abschnitt (z. B. Berufserfahrung oder Bildungsweg).",
        code: "<h2>...</h2>",
        solution: "<h2>Bildungsweg</h2>"
    }
];

let currentSlide = 0;
const solvedStatus = new Array(slides.length).fill(false);

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
            <h2>${slide.title}</h2>
            <p>${slide.description}</p>
            
            <span class="editor-label">Quelltext im Editor bearbeiten:</span>
            <textarea id="code-input" class="code-textarea" rows="3">${slide.code}</textarea>
            
            <div class="preview-box" id="preview-box">
                ${slide.code}
            </div>

            <div class="check-container">
                <button id="check-btn" class="check-btn">Aufgabe überprüfen</button>
            </div>
            <div id="feedback-box" class="feedback-box"></div>

            <div class="solution-container">
                <button id="toggle-solution-btn" class="solution-btn">Lösung anzeigen</button>
                <div id="solution-box" class="solution-box">
                    ${escapeHtml(slide.solution)}
                </div>
            </div>
        </div>
    `;

    const textarea = document.getElementById("code-input");
    const previewBox = document.getElementById("preview-box");
    const checkBtn = document.getElementById("check-btn");
    const feedbackBox = document.getElementById("feedback-box");
    const toggleBtn = document.getElementById("toggle-solution-btn");
    const solutionBox = document.getElementById("solution-box");

    if (solvedStatus[currentSlide]) {
        feedbackBox.className = "feedback-box feedback-success";
        feedbackBox.innerHTML = "Richtig! Dieser Baustein sitzt perfekt.";
        feedbackBox.style.display = "block";
    }

    textarea.addEventListener("input", () => {
        previewBox.innerHTML = textarea.value;
        if (!solvedStatus[currentSlide]) {
            feedbackBox.style.display = "none";
        }
    });

    checkBtn.addEventListener("click", () => {
        const studentCode = textarea.value.trim();
        const targetCode = slide.solution.trim();

        feedbackBox.style.display = "block";

        if (studentCode === targetCode) {
            feedbackBox.className = "feedback-box feedback-success";
            feedbackBox.innerHTML = "Richtig! Ausgezeichnet umgesetzt.";
            solvedStatus[currentSlide] = true;
        } else {
            feedbackBox.className = "feedback-box feedback-error";
            feedbackBox.innerHTML = "Noch nicht ganz passend. Prüfe die Tags oder den Inhalt.";
        }
    });

    toggleBtn.addEventListener("click", () => {
        if (solutionBox.style.display === "none" || solutionBox.style.display === "") {
            solutionBox.style.display = "block";
            toggleBtn.innerText = "Lösung verbergen";
            toggleBtn.style.backgroundColor = "#64748b";
        } else {
            solutionBox.style.display = "none";
            toggleBtn.innerText = "Lösung anzeigen";
            toggleBtn.style.backgroundColor = "#059669";
        }
    });

    document.getElementById("slide-counter").innerText = `Schritt ${currentSlide + 1} von ${slides.length}`;
    document.getElementById("prev-btn").disabled = currentSlide === 0;
    nextBtn.disabled = false;

    if (currentSlide === slides.length - 1) {
        nextBtn.innerText = "Zur Auswertung →";
    } else {
        nextBtn.innerText = "Nächster Schritt →";
    }
}

function renderSummary(container) {
    const correctCount = solvedStatus.filter(Boolean).length;
    const totalCount = slides.length;
    const percentage = Math.round((correctCount / totalCount) * 100);

    let listHtml = "<ul class='summary-list'>";
    slides.forEach((slide, index) => {
        const isDone = solvedStatus[index];
        const statusText = isDone ? "✅ Erfolgreich erstellt" : "❌ Noch offen";
        const color = isDone ? "#166534" : "#991b1b";
        listHtml += `<li><b>Schritt ${index + 1}:</b> ${slide.title.split(':')[1]} – <span style="color: ${color}; float: right; font-weight: 600;">${statusText}</span></li>`;
    });
    listHtml += "</ul>";

    container.innerHTML = `
        <div class="slide-content" style="text-align: center;">
            <h2>Dein Lebenslauf-Modul: Auswertung</h2>
            <p>Du hast alle Stationen durchlaufen und die Bausteine für deinen digitalen Lebenslauf erstellt.</p>
            
            <div class="summary-score">
                ${correctCount} von ${totalCount} Bausteinen gemeistert (${percentage}%)
            </div>
            
            ${listHtml}
            
            <p style="font-size: 0.85rem; color: #64748b; margin-top: 20px;">
                Tipp: Nutze den „Zurück“-Button, falls du dir einzelne Bausteine noch einmal ansehen möchtest.
            </p>
        </div>
    `;

    document.getElementById("slide-counter").innerText = "Abschluss";
    document.getElementById("prev-btn").disabled = false;
    document.getElementById("next-btn").disabled = true;
    document.getElementById("next-btn").innerText = "Fertig";
}

function nextSlide() {
    if (currentSlide <= slides.length) {
        currentSlide++;
        renderSlide();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        renderSlide();
    }
}

function escapeHtml(text) {
    return text.replace(/</g, "<").replace(/>/g, ">");
}

renderSlide();