console.log("Script loaded!");

// Hent tekst fra HTML i stedet for at have den i JS
const storyParagraphs = document.querySelectorAll(".story-text");
let texts = Array.from(storyParagraphs).map(p => p.textContent);

let index = 0;
let textIndex = 0;
let intervalId;
let isPaused = false;

const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");
const storyText = document.getElementById("story-text");
const speakBtn = document.getElementById("speak-btn");

// OPLÆSNINGSFUNKTION MED WEB SPEECH API
let isSpeaking = false;
let speechSynthesisUtterance = new SpeechSynthesisUtterance();

function syncTextWithSpeech() {
    if (isSpeaking) {
        speechSynthesis.cancel();
        isSpeaking = false;
        return;
    }
    
    storyText.textContent = "";
    textIndex = 0;
    index = 0;
    isSpeaking = true;
    speakNextSection();
}

function speakNextSection() {
    if (textIndex >= texts.length) {
        isSpeaking = false;
        return;
    }

    speechSynthesisUtterance.text = texts[textIndex];
    speechSynthesisUtterance.lang = "da-DK";
    speechSynthesisUtterance.rate = 1;

    const voices = speechSynthesis.getVoices();
    const danishVoice = voices.find(voice => voice.lang === "da-DK");
    if (danishVoice) {
        speechSynthesisUtterance.voice = danishVoice;
    }

    speechSynthesis.speak(speechSynthesisUtterance);
    typeWriterEffect(texts[textIndex], () => {
        textIndex++;
        speechSynthesisUtterance.onend = speakNextSection;
    });
}

function typeWriterEffect(text, callback) {
    let i = 0;
    storyText.textContent = "";

    function type() {
        if (i < text.length) {
            storyText.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// PAUSE / PLAY FUNKTION
function togglePlayPause() {
    if (isSpeaking) {
        speechSynthesis.cancel();
        isSpeaking = false;
        pauseBtn.innerHTML = "&#9654;";
    } else {
        syncTextWithSpeech();
        pauseBtn.innerHTML = "&#10074;&#10074;";
    }
}

// GENSTART FUNKTION
restartBtn.addEventListener("click", function() {
    speechSynthesis.cancel();
    isSpeaking = false;
    storyText.textContent = "";
    textIndex = 0;
    index = 0;
    syncTextWithSpeech();
});

// EVENT LISTENERS
pauseBtn.addEventListener("click", togglePlayPause);
speakBtn.addEventListener("click", syncTextWithSpeech);

// START SYNKRONISERING NÅR SIDEN INDLÆSES
window.onload = function() {
    console.log("Window loaded!");
    syncTextWithSpeech();
};