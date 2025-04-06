document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM indlæst");

    // --- Skjul alle sektioner ---
    let sections = document.querySelectorAll(".info-section, .second-section, .third-section, .fourth-section, .fifth-section, .sixth-section, .seventh-section, .eight-section, .ninth-section, .tenth-section, .eleventh-section, .twelfth-section, .thirteenth-section, .fourteenth-section, .fifteenth-section, .sixteenth-section, .seventeenth-section, .eighteenth-section, .nineteenth-section, .Jose_info-section, .Jose-second-section, .Jose-third-section, .Jose-fourth-section, .Jose-fifth-section, .Jose-sixth-section, .Jose-seventh-section, .Jose-ninth-section, .Jose-eight-section, .Jose-tenth-section, .Jose-eleventh-section, .Jose-twelfth-section, .Jose-thirteenth-section, .Jose-fourteenth-section, .Jose-fifteenth-section, .Jose-sixteenth-section, .Jose-seventeenth-section, .Jose-eighteenth-section, .Jose-nineteenth-section, .Adut_info-section, .Adut-second-section, .Adut-third-section, .Adut-fourth-section, .Adut-fifth-section, .Adut-sixth-section, .Adut-seventh-section, .Adut-ninth-section, .Adut-eight-section, .Adut-tenth-section, .Adut-eleventh-section, .Adut-twelfth-section, .Adut-thirteenth-section, .Adut-fourteenth-section, .Adut-fifteenth-section, .Adut-sixteenth-section, .Adut-seventeenth-section, .Adut-eighteenth-section, .Adut-nineteenth-section");
    sections.forEach(section => section.style.display = "none");

    // --- Scroll ved første knap ---
    let firstButton = document.querySelector(".button_1");
    if (firstButton) {
        firstButton.addEventListener("click", function () {
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
        });
    }

    // --- Navigation mellem sektioner ---
    document.querySelectorAll(".button_2, .button_3, .button_4, .continue_button, .choicebutton, .third-section_button, .fourth-section_button, .fifth-section_button, .sixth-section_button, .dilemma2_choice1_button, .dilemma2_choice2_button, .last_button").forEach(knap => {
        knap.addEventListener("click", function () {
            let targetId = this.getAttribute("data-target");
            let targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = "block";
                targetSection.scrollIntoView({ behavior: "smooth" });
            } else {
                console.error("Fejl: Sektionen med ID", targetId, "blev ikke fundet");
            }
        });
    });

    // --- Pop-up funktion ---
    document.querySelector(".share-result_button").addEventListener("click", () => {
        document.getElementById("popup").style.display = "block";
    });    

    document.getElementById("closeBtn").addEventListener("click", () => {
        document.getElementById("popup").style.display = "none";
    });

    document.querySelectorAll(".question_mark_icon").forEach((icon) => {
        icon.addEventListener("click", () => {
            document.getElementById("popup2").style.display = "block";
        });
    });
    document.getElementById("closeBtn2").addEventListener("click", () => {
        document.getElementById("popup2").style.display = "none";
    });

    // --- Broken hearts ---
    let brokenHearts = document.querySelectorAll('.brokenHeart');
    let wholeHearts = document.querySelectorAll('.wholeHeart');

    if (brokenHearts.length === wholeHearts.length) {
        for (let i = 0; i < brokenHearts.length; i++) {
            let broken = brokenHearts[i];
            let whole = wholeHearts[i];

            broken.addEventListener('mouseenter', () => {
                whole.style.display = 'block';
                broken.style.display = 'none';
            });

            whole.addEventListener('mouseleave', () => {
                whole.style.display = 'none';
                broken.style.display = 'block';
            });
        }
    }

    // --- Typewriter + oplæsning ---
    let synth = window.speechSynthesis;
    let isSpeaking = false;
    let isPaused = false;
    let typewriterIndex = 0;

    let storyTextElement = document.querySelector(".ida_intro p");
    let typewriterContainer = storyTextElement;
    let storyText = storyTextElement ? storyTextElement.innerText : "";

    let startButton = document.querySelector(".start_icon");
    let replayButton = document.querySelector(".replay_icon");

    let utterance;
    let typewriterInterval;

    const TYPEWRITER_SPEED = 60;

    function resetTypewriter() {
        if (typewriterContainer) typewriterContainer.innerHTML = "";
        typewriterIndex = 0;
    }

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
        }, TYPEWRITER_SPEED);
    }

    function speakText() {
        if (isSpeaking) {
            if (isPaused) {
                synth.resume();
                isPaused = false;
                typeWriter(typewriterIndex);
            } else {
                synth.pause();
                isPaused = true;
                clearInterval(typewriterInterval);
            }
        } else {
            isSpeaking = true;
            isPaused = false;
            resetTypewriter();
            utterance = new SpeechSynthesisUtterance(storyText);
            utterance.lang = "da-DK";
            utterance.rate = 0.8;
            utterance.onboundary = (event) => {
                typewriterIndex = event.charIndex;
            };
            utterance.onend = () => {
                isSpeaking = false;
            };
            synth.speak(utterance);
            typeWriter(0);
        }
    }

    function restartStory() {
        synth.cancel();
        clearInterval(typewriterInterval);
        isSpeaking = false;
        isPaused = false;
        typeWriter(0);
        speakText();
    }

    if (startButton) {
        startButton.addEventListener("click", speakText);
        startButton.style.cursor = "pointer";
    }

    if (replayButton) {
        replayButton.addEventListener("click", restartStory);
        replayButton.style.cursor = "pointer";
    }

});
