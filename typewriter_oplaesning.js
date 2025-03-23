console.log("Script loaded!"); // Fejlfinding

// ✅ VARIABLER & ARRAY
const texts = ["Det var en aften som så mange andre. Ida, 22 år, studerende, ambitiøs, social, en helt almindelig ung kvinde i København. Hun havde glædet sig til festen, klædt sig pænt på, grinet med sine venner og danset til sange, hun elskede. Og så mødte hun ham. Han var charmerende, sjov, virkede interesseret. De snakkede længe, og det føltes rart. Trygt. Et sted mellem latteren og de ufarlige berøringer forsvandt kontrollen. Senere ville hun tænke tilbage og spørge sig selv: Hvornår ændrede stemningen sig? Hvornår blev det utrygt? Hvornår blev mit nej ikke længere hørt? Hun husker brudstykker. Følelsen af at være låst fast. Af en krop, der ikke længere reagerede. Af panik, der kæmpede mod en frygtlammet stilhed. Og morgenen efter, den tomme, rungende erkendelse: Det skete. Dagen efter burde have været som alle andre. Men intet var som før. Kroppen føltes fremmed. Huden kriblede, som om han stadig var der. Hendes tanker kørte i ring: Var det min skyld? Gjorde jeg noget forkert? Ville nogen overhovedet tro mig? Nu står hun her. Foran et valg, der føles umuligt. Hvad skal hun gøre?"];
let index = 0;
let textIndex = 0;
let speechSynthesis = window.speechSynthesis; // Web Speech API

let isPaused = false;  // Flag til at holde styr på, om afspilningen er sat på pause

// Pause og genstart knapper
const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");

// ✅ TEKST-INDTASTNING MED LYD
function typeWriter() {
    console.log(`Typing text: ${texts[textIndex]}`); // Debugging

    if (index < texts[textIndex].length && !isPaused) {
        document.getElementById("story-text").innerHTML += texts[textIndex].charAt(index);
        index++;
        setTimeout(typeWriter, 50); // Justeret til hurtigere hastighed (50 ms)
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

// Funktion til at starte/stoppe afspilning
function togglePlayPause() {
    if (isPaused) {
        // Genstart afspilning (play)
        console.log("Afspilning genoptages");

        // Start tale og tekst fra det punkt, hvor vi stoppede
        speakText(texts[textIndex].substring(index));  // Begynd at læse fra det punkt, vi stoppede
        typeWriter();  // Begynd at skrive fra det punkt, vi stoppede

        pauseBtn.innerHTML = "&#10074;&#10074;";  // Skift til pause-ikon
        isPaused = false;
    } else {
        // Pause afspilning
        console.log("Afspilning sat på pause");
        speechSynthesis.pause();  // Stop afspilningen
        pauseBtn.innerHTML = "&#9654;";  // Skift til play-ikon
        isPaused = true;
    }
}

// Genstart knappen
restartBtn.addEventListener("click", function() {
    console.log("Genstart knappen blev klikket!");
    index = 0;
    textIndex = (textIndex + 1) % texts.length; // Skift mellem teksterne
    document.getElementById("story-text").innerHTML = "";

    // Stop nuværende tale, før vi starter en ny
    speechSynthesis.cancel();

    // Start tekst og tale
    speakText(texts[textIndex]); // Læs teksten op
    typeWriter(); // Vis teksten på skærmen
    pauseBtn.innerHTML = "&#10074;&#10074;";  // Skift til pause-ikon, når vi genstarter
    isPaused = false;
});

// Event listener for pause knappen
pauseBtn.addEventListener("click", togglePlayPause);

// Start typewriter og læs op ved indlæsning
window.onload = function() {
    speakText(texts[textIndex]); // Læs første tekst op
    typeWriter();
};