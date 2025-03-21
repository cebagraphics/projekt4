console.log("Script loaded!"); // Fejlfinding

// ✅ VARIABLER & ARRAY
const texts = ["Det var en aften som så mange andre. Ida, 22 år, studerende, ambitiøs, social, en helt almindelig ung kvinde i København. Hun havde glædet sig til festen, klædt sig pænt på, grinet med sine venner og danset til sange, hun elskede. Og så mødte hun ham. Han var charmerende, sjov, virkede interesseret. De snakkede længe, og det føltes rart. Trygt. Et sted mellem latteren og de ufarlige berøringer forsvandt kontrollen. Senere ville hun tænke tilbage og spørge sig selv: Hvornår ændrede stemningen sig? Hvornår blev det utrygt? Hvornår blev mit nej ikke længere hørt? Hun husker brudstykker. Følelsen af at være låst fast. Af en krop, der ikke længere reagerede. Af panik, der kæmpede mod en frygtlammet stilhed. Og morgenen efter, den tomme, rungende erkendelse: Det skete. Dagen efter burde have været som alle andre. Men intet var som før. Kroppen føltes fremmed. Huden kriblede, som om han stadig var der. Hendes tanker kørte i ring: Var det min skyld? Gjorde jeg noget forkert? Ville nogen overhovedet tro mig? Nu står hun her. Foran et valg, der føles umuligt. Hvad skal hun gøre?"];
let index = 0;
let textIndex = 0;
let speechSynthesis = window.speechSynthesis; // Web Speech API
let isPaused = false; // Pause status
let timeoutId; // ID til setTimeout for tekst-typen

// ✅ TEKST-INDTASTNING MED LYD
function typeWriter() {
    console.log(`Typing text: ${texts[textIndex]}`); // Debugging

    if (index < texts[textIndex].length && !isPaused) {
        document.getElementById("story-text").innerHTML += texts[textIndex].charAt(index);
        index++;
        timeoutId = setTimeout(typeWriter, 100); // Hastighed på tekst-typing
    } else {
        console.log("Tekst færdig!");
    }
}

// ✅ LÆSER TEKST OP
function speakText(text) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "da-DK"; // Dansk stemme
        utterance.rate = 1; // Normal hastighed
        utterance.pitch = 1; // Normal tonehøjde
        speechSynthesis.speak(utterance);
    } else {
        console.log("Din browser understøtter ikke Web Speech API.");
    }
}

// ✅ PAUSE-FUNKTION
function pauseStory() {
    if (!isPaused) {
        isPaused = true;
        clearTimeout(timeoutId); // Stop tekst-animation
        speechSynthesis.pause(); // Pause lyd
        document.getElementById("pause-btn").textContent = "Fortsæt"; // Skift knaptekst
    } else {
        isPaused = false;
        typeWriter(); // Genoptag tekst-animation
        speechSynthesis.resume(); // Fortsæt lyd
        document.getElementById("pause-btn").textContent = "Pause"; // Skift knaptekst
    }
}

// ✅ GENSTART-FUNKTION
function restartStory() {
    isPaused = false;
    clearTimeout(timeoutId); // Stop eksisterende tekst-animation
    speechSynthesis.cancel(); // Stop lyd
    document.getElementById("story-text").innerHTML = ""; // Nulstil tekst
    index = 0;
    textIndex = (textIndex + 1) % texts.length; // Skift mellem teksterne
    startStory(); // Start forfra
}

// ✅ START HISTORIE (første gang eller efter genstart)
function startStory() {
    speakText(texts[textIndex]); // Læs første tekst op
    typeWriter(); // Start tekst-animation
}

// ✅ EVENT: Klik for at genstarte tekst OG stemme
document.getElementById("restart-btn").addEventListener("click", function() {
    console.log("Genstart knappen blev klikket!");
    restartStory();
});

// ✅ EVENT: Klik for at pause/fortsætte
document.getElementById("pause-btn").addEventListener("click", function() {
    pauseStory();
});

// ✅ START TYPEWRITER + LÆS OP VED INDLÆSNING
window.onload = function() {
    startStory(); // Start automatisk ved indlæsning
};