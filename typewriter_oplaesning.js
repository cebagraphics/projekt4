let synth = window.speechSynthesis;
let isSpeaking = false;
let isPaused = false;
let typewriterIndex = 0;
let storyText = document.querySelector(".ida_intro p").innerText;
let typewriterContainer = document.querySelector(".ida_intro p");
let startButton = document.querySelector(".start_icon");
let replayButton = document.querySelector(".replay_icon");
let utterance;
let typewriterInterval;

// Justeret typewriter-hastighed
const TYPEWRITER_SPEED = 60; // Øget forsinkelse for langsommere skrivning

// Funktion til at nulstille typewriter-effekten
function resetTypewriter() {
    typewriterContainer.innerHTML = ""; // Sørg for at teksten bliver skrevet korrekt fra start
    typewriterIndex = 0;
}

// Funktion til typewriter-effekten
function typeWriter(startIndex = 0) {
    resetTypewriter();
    typewriterIndex = startIndex;
    
    typewriterInterval = setInterval(() => {
        if (typewriterIndex < storyText.length && !isPaused) {
            typewriterContainer.innerHTML = storyText.substring(0, typewriterIndex + 1);
            typewriterIndex++;
        } else {
            clearInterval(typewriterInterval);
        }
    }, TYPEWRITER_SPEED); // Justeret hastighed
}

// Funktion til tekst-til-tale
function speakText() {
    if (isSpeaking) {
        if (isPaused) {
            synth.resume();
            isPaused = false;
            typeWriter(typewriterIndex); // Genoptag typewriter fra sidste position
        } else {
            synth.pause();
            isPaused = true;
            clearInterval(typewriterInterval); // Stop typewriter midlertidigt
        }
    } else {
        isSpeaking = true;
        isPaused = false;
        resetTypewriter();
        utterance = new SpeechSynthesisUtterance(storyText);
        utterance.lang = "da-DK"; // Dansk sprog
        utterance.rate = 0.8; // Lavere hastighed for bedre synkronisering
        utterance.onboundary = (event) => {
            typewriterIndex = event.charIndex; // Synkroniser typewriter med tale
        };
        utterance.onend = () => {
            isSpeaking = false;
        };
        synth.speak(utterance);
        typeWriter(0); // Start typewriter fra begyndelsen
    }
}

// Funktion til at genstarte
function restartStory() {
    synth.cancel(); // Stopper evt. igangværende tale
    clearInterval(typewriterInterval);
    isSpeaking = false;
    isPaused = false;
    typeWriter(0);
    speakText();
}

// Event listeners til knapperne
startButton.addEventListener("click", speakText);
replayButton.addEventListener("click", restartStory);

// Sørg for at knapperne forbliver statiske
startButton.style.position = "fixed";
startButton.style.bottom = "20px";
startButton.style.left = "20px";

replayButton.style.position = "fixed";
replayButton.style.bottom = "20px";
replayButton.style.left = "80px";
