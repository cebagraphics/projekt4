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

// Hent audio elementet
const audioPlayer = document.getElementById("audio-player");
let isPaused = false;

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
        storyText.textContent += "\n"; // Tilføj ét linjeskift
        playAudio(); // Start afspilning af lyd
        typeWriter(); // Start typewriter-effekt for næste tekst
    }
}

// ✅ SYNKRONISER AFSPILNING OG TEKST
function playAudio() {
    audioPlayer.currentTime = 0;
    audioPlayer.play();
}

// ✅ PAUSE / PLAY FUNKTION
function togglePlayPause() {
    if (isPaused) {
        console.log("Genoptager afspilning");
        isPaused = false;
        playAudio();
        typeWriter();
        pauseBtn.innerHTML = "&#10074;&#10074;"; // Pause-ikon
    } else {
        console.log("Afspilning sat på pause");
        audioPlayer.pause(); // Stopper lydafspilning korrekt
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
    audioPlayer.pause(); // Stop afspilning af lyd
    audioPlayer.currentTime = 0; // Sæt afspilningstidspunktet til starten
    isPaused = false;
    pauseBtn.innerHTML = "&#10074;&#10074;";
    playAudio();
    typeWriter();
});

// ✅ EVENT LISTENERS
pauseBtn.addEventListener("click", togglePlayPause);

window.onload = function() {
    // Start med det samme, både tekst og lyd
    playAudio(); // Start lydafspilning med det samme
    typeWriter(); // Start typewriter-effekt med det samme
};