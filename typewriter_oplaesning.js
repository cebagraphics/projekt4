console.log("Script loaded!");

// ✅ VARIABLER & ARRAY
const texts = [
    "Det var en aften som så mange andre. Ida, 22 år, studerende, ambitiøs, social, en helt almindelig ung kvinde i København. Hun havde glædet sig til festen, klædt sig pænt på, grinet med sine venner og danset til sange, hun elskede. Og så mødte hun ham. Han var charmerende, sjov, virkede interesseret. De snakkede længe, og det føltes rart. Trygt.\n", 
    "Et sted mellem latteren og de ufarlige berøringer forsvandt kontrollen. Senere ville hun tænke tilbage og spørge sig selv: Hvornår ændrede stemningen sig? Hvornår blev det utrygt? Hvornår blev mit nej ikke længere hørt?\n", 
    "Hun husker brudstykker. Følelsen af at være låst fast. Af en krop, der ikke længere reagerede. Af panik, der kæmpede mod en frygtlammet stilhed. Og morgenen efter, den tomme, rungende erkendelse: Det skete.\n", 
    "Dagen efter burde have været som alle andre. Men intet var som før. Kroppen føltes fremmed. Huden kriblede, som om han stadig var der. Hendes tanker kørte i ring: Var det min skyld? Gjorde jeg noget forkert? Ville nogen overhovedet tro mig?\n", 
    "Nu står hun her. Foran et valg, der føles umuligt. Hvad skal hun gøre?"
];
let index = 0;
let textIndex = 0;
let speechSynthesis = window.speechSynthesis;
let isPaused = false;
let currentUtterance = null;

const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");
const storyText = document.getElementById("story-text");

// ✅ TYPEWRITER-EFFEKT (SKRIVER TEKST SYNKRONT MED TALE)
function typeWriter() {
    if (index < texts[textIndex].length && !isPaused) {
        storyText.textContent += texts[textIndex].charAt(index);
        index++;
        setTimeout(typeWriter, 50);
    } else if (index === texts[textIndex].length && textIndex < texts.length - 1) {
        // Når den aktuelle tekst er færdig, skift til næste tekst
        textIndex++;
        index = 0;  // Nulstil index for næste tekst
        setTimeout(() => {
            // Tilføj et linjeskift mellem afsnittene (kun et linjeskift for mindre mellemrum)
            storyText.textContent += "\n"; // Tilføj ét linjeskift
            speakText(); // Start tale for næste tekst
            typeWriter(); // Start typewriter-effekt for næste tekst
        }, 500);  // Vent lidt før den starter næste tekst
    }
}

// ✅ SYNKRONISER TALE OG TEKST
function speakText() {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel(); // Sørger for at stoppe tidligere afspilninger
        currentUtterance = new SpeechSynthesisUtterance(texts[textIndex].substring(index));
        currentUtterance.lang = "da-DK";
        currentUtterance.rate = 1;
        currentUtterance.pitch = 1;
        currentUtterance.onend = () => (isPaused = false); // Reset flag ved afslutning
        speechSynthesis.speak(currentUtterance);
    } else {
        console.log("Din browser understøtter ikke Web Speech API.");
    }
}

// ✅ PAUSE / PLAY FUNKTION
function togglePlayPause() {
    if (isPaused) {
        console.log("Genoptager afspilning");
        isPaused = false;
        speakText();
        typeWriter();
        pauseBtn.innerHTML = "&#10074;&#10074;"; // Pause-ikon
    } else {
        console.log("Afspilning sat på pause");
        speechSynthesis.cancel(); // Stopper tale korrekt
        isPaused = true;
        pauseBtn.innerHTML = "&#9654;"; // Play-ikon
    }
}

// ✅ GENSTART FUNKTION
restartBtn.addEventListener("click", function() {
    console.log("Genstarter historie");
    index = 0;
    textIndex = 0; // Skift til første tekst igen
    storyText.textContent = "";  // Fjern den tidligere tekst
    speechSynthesis.cancel();
    isPaused = false;
    pauseBtn.innerHTML = "&#10074;&#10074;";
    speakText();
    typeWriter();
});

// ✅ EVENT LISTENERS
pauseBtn.addEventListener("click", togglePlayPause);

window.onload = function() {
    speakText();
    typeWriter();
};