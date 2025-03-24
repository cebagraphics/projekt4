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
let intervalId;

// Hent audio elementet
const audioPlayer = document.getElementById("audio-player");
let isPaused = false;

const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");
const storyText = document.getElementById("story-text");

// ✅ SYNKRONISER AFSPILNING OG TEKST
function syncTextWithAudio() {
    // Start med at afspille lyd fra starten
    audioPlayer.play();

    intervalId = setInterval(() => {
        // Tjek lydens tid og synkroniser tekst
        const currentTime = audioPlayer.currentTime;

        // Når vi når en ny sektion af teksten, opdater teksten
        if (currentTime >= getSectionStartTime(textIndex)) {
            if (index < texts[textIndex].length) {
                storyText.textContent += texts[textIndex].charAt(index);
                index++;
            } else {
                // Skift til næste tekst
                textIndex++;
                index = 0;
                storyText.textContent += "\n";
                if (textIndex >= texts.length) {
                    clearInterval(intervalId); // Stop ved slutningen af teksten
                }
            }
        }
    }, 50); // Opdater hver 50ms
}

// Returnerer starttidspunktet for hver tekstsektion i lydfilen
function getSectionStartTime(index) {
    const sectionTimes = [
        0,       // Starttidspunkt for første tekst
        5,       // Starttidspunkt for anden tekst
        10,      // Starttidspunkt for tredje tekst
        15,      // Starttidspunkt for fjerde tekst
        20       // Starttidspunkt for femte tekst
    ];
    return sectionTimes[index] || 0;
}

// ✅ PAUSE / PLAY FUNKTION
function togglePlayPause() {
    if (isPaused) {
        console.log("Genoptager afspilning");
        isPaused = false;
        audioPlayer.play();
        syncTextWithAudio(); // Resume text sync
        pauseBtn.innerHTML = "&#10074;&#10074;"; // Pause-ikon
    } else {
        console.log("Afspilning sat på pause");
        audioPlayer.pause();
        clearInterval(intervalId); // Stop synkronisering af teksten
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
    syncTextWithAudio();
});

// ✅ EVENT LISTENERS
pauseBtn.addEventListener("click", togglePlayPause);

// Når vinduet er færdig med at loade, start automatisk afspilning og tekstsynkronisering
window.onload = function() {
    console.log("Window loaded!");
    // Sørg for at afspilning kan starte automatisk
    audioPlayer.play()
        .then(() => {
            syncTextWithAudio(); // Start synkroniseringen af tekst og lyd
        })
        .catch((error) => {
            console.log("Error with autoplay: ", error);
        });
};