console.log("Script loaded!");

// ✅ Hent tekst fra HTML i stedet for at have den i JS
const storyParagraphs = document.querySelectorAll(".story-text");
let texts = Array.from(storyParagraphs).map(p => p.textContent);

let index = 0;
let textIndex = 0;
let intervalId;
let isPaused = false;

// Hent audio elementet
const audioPlayer = document.getElementById("audio-player");
const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");
const storyText = document.getElementById("story-text");

if (!audioPlayer) {
    console.error("Audio element not found!");
}

// ✅ TYPEWRITER-FUNKTION MED LYD-SYNKRONISERING
function syncTextWithAudio() {
    if (!audioPlayer) return;
    audioPlayer.play().catch(error => console.log("Error with autoplay:", error));

    intervalId = setInterval(() => {
        if (isPaused) return;

        const currentTime = audioPlayer.currentTime;
        if (currentTime >= getSectionStartTime(textIndex)) {
            if (index < texts[textIndex].length) {
                storyText.textContent += texts[textIndex].charAt(index);
                index++;
            } else {
                textIndex++;
                index = 0;
                storyText.textContent += "\n";
                if (textIndex >= texts.length) {
                    clearInterval(intervalId);
                }
            }
        }
    }, 50);
}

// ✅ Returnerer starttidspunktet for hver tekstsektion i lydfilen
function getSectionStartTime(index) {
    const sectionTimes = [0, 5, 10, 15, 20];
    return sectionTimes[index] || 0;
}

// ✅ PAUSE / PLAY FUNKTION
function togglePlayPause() {
    if (!audioPlayer) return;

    if (isPaused) {
        console.log("Genoptager afspilning");
        isPaused = false;
        audioPlayer.play();
        syncTextWithAudio();
        pauseBtn.innerHTML = "&#10074;&#10074;"; // Pause-ikon
    } else {
        console.log("Afspilning sat på pause");
        audioPlayer.pause();
        clearInterval(intervalId);
        isPaused = true;
        pauseBtn.innerHTML = "&#9654;"; // Play-ikon
    }
}

// ✅ GENSTART FUNKTION
restartBtn.addEventListener("click", function() {
    console.log("Genstarter historie");
    index = 0;
    textIndex = 0;
    storyText.textContent = "";
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
    isPaused = false;
    pauseBtn.innerHTML = "&#10074;&#10074;";
    syncTextWithAudio();
});

// ✅ EVENT LISTENERS
pauseBtn.addEventListener("click", togglePlayPause);

// ✅ START SYNKRONISERING NÅR SIDEN INDLÆSES
window.onload = function() {
    console.log("Window loaded!");
    if (audioPlayer) {
        audioPlayer.play().then(syncTextWithAudio).catch(error => {
            console.log("Autoplay error:", error);
        });
    }
};