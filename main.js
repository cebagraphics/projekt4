
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM indlæst"); // Fejlfinding

     // Array til at gemme alle sektioner, der skal skjules
     let sections = document.querySelectorAll(".info-section, .second-section, .third-section, .fourth-section, .fifth-section, .sixth-section, .seventh-section, .eight-section, .ninth-section, .tenth-section, .eleventh-section, .twelfth-section, .thirteenth-section, .fourteenth-section, .fifteenth-section, .sixteenth-section, .seventeenth-section, .eighteenth-section, .nineteenth-section, .Jose-second-section, .Jose-third-section, .Jose-fourth-section, .Jose-fifth-section, .Jose-sixth-section, .Jose-seventh-section, .Jose-ninth-section, .Jose-eight-section, .Jose-tenth-section, .Jose-eleventh-section, .Jose-twelfth-section, .Jose-thirteenth-section, .Jose-fourteenth-section, .Jose-fifteenth-section, .Jose-sixteenth-section, .Jose-seventeenth-section, .Jose-eighteenth-section, .Jose-nineteenth-section");

     sections.forEach(section => {
         section.style.display = "none";
     });

    // Event listener til alle knapper
    document.querySelectorAll(".button_2, .button_3, .button_4, .continue_button, .choicebutton, .third-section_button, .fourth-section_button, .fifth-section_button, .sixth-section_button, .dilemma2_choice1_button, .dilemma2_choice2_button, .last_button").forEach(knap => {
        knap.addEventListener("click", function () {
            let targetId = this.getAttribute("data-target");

            //  Kontrolstruktur (if-else)
            if (targetId) {
                let targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.style.display = "block"; // Vis den nye sektion
                    targetSection.scrollIntoView({ behavior: "smooth" }); // Scroll til den nye sektion
                } else {
                    console.error("Fejl: Sektionen med ID", targetId, "blev ikke fundet");
                }
            } else {
                console.error("Fejl: Knap har ikke et gyldigt data-target");
            }
        });


    // Eksempel på brug af et objekt (kun for at inkludere det - kan man gøre andet?)
    let exampleObject = {
        name: "Interaktiv Historie",
        version: 1.0,
        showInfo: function () {
            console.log("Projekt:", this.name, "- Version:", this.version);
        }
    };

    exampleObject.showInfo(); // Kalder objektets metode
});

    // Scroll-funktion for første valg
    let firstButton = document.querySelector(".button_1");
    if (firstButton) {
        firstButton.addEventListener("click", function () {
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
        });
    }
});


// Pop-up javascript

document.querySelectorAll(".question_mark_icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      document.getElementById("popup2").style.display = "block";
    });
  });
document.getElementById("closeBtn").addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
});


document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".question_mark_icon").addEventListener("click", () => {
        document.getElementById("popup2").style.display = "block";
    });

    document.getElementById("closeBtn2").addEventListener("click", () => {
        document.getElementById("popup2").style.display = "none";
    });
});


//Broken heart javascript

console.log('JavaScript loaded');

// Find alle hjerte-billeder
let brokenHearts = document.querySelectorAll('.brokenHeart');
let wholeHearts = document.querySelectorAll('.wholeHeart');

// Kontroller at der er lige mange af hver
if (brokenHearts.length === wholeHearts.length) {
    for (let i = 0; i < brokenHearts.length; i++) {
        let broken = brokenHearts[i];
        let whole = wholeHearts[i];

        // Tilføj event listeners
        broken.addEventListener('mouseenter', () => {
            console.log('Musen er over det knuste hjerte');
            whole.style.display = 'block';
            broken.style.display = 'none';
        });

        whole.addEventListener('mouseleave', () => {
            console.log('Musen er væk fra det hele hjerte');
            whole.style.display = 'none';
            broken.style.display = 'block';
        });
    }
} else {
    console.error('Antal knuste og hele hjerter matcher ikke!');
}

// Brug af array og loop
let heartImages = [];
brokenHearts.forEach((el) => heartImages.push(el.src));
wholeHearts.forEach((el) => heartImages.push(el.src));

console.log('Heart images:', heartImages);
for (let i = 0; i < heartImages.length; i++) {
    console.log('Heart image at index', i, heartImages[i]);
}

// Objekteksempel
let heartStatus = {
    isBroken: true,
    toggleHeartStatus: function () {
        this.isBroken = !this.isBroken;
        console.log('Hjerte status ændret:', this.isBroken ? 'Knust' : 'Hele');
    }
};

// Scope test
let globalVar = 'Jeg er global';
function checkScope() {
    let localVar = 'Jeg er lokal';
    console.log(globalVar);
    console.log(localVar);
}
checkScope();

// Loop-eksempel
let count = 0;
let maxClicks = 3;
for (let i = 0; i < maxClicks; i++) {
    console.log('Klik nr.', count + 1);
    count++;
}

// Operator-test (virker kun hvis du kigger på første hjerte)
if (wholeHearts.length > 0) {
    let isHeartWhole = wholeHearts[0].style.display === 'block';
    console.log('Er første hjerte helt?', isHeartWhole);
}




let synth = window.speechSynthesis;
let isSpeaking = false;
let isPaused = false;
let typewriterIndex = 0;
let storyText = document.querySelectorAll(".ida_intro p").innerText;
let typewriterContainer = document.querySelectorAll(".ida_intro p");
let startButton = document.querySelectorAll(".start_icon");
let replayButton = document.querySelectorAll(".replay_icon");
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