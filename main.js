 // --- FUNKTION SOM SKJULER OG VISER SEKTIONER ---

// --- (Placering og udførelse javascript & fejlfinding) ---
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM indlæst");

    // --- Skjuler alle sektioner (variabler og typer) ---
    let sections = document.querySelectorAll(".info-section, .second-section, .third-section, .fourth-section, .fifth-section, .sixth-section, .seventh-section, .eight-section, .ninth-section, .tenth-section, .eleventh-section, .twelfth-section, .thirteenth-section, .fourteenth-section, .fifteenth-section, .sixteenth-section, .seventeenth-section, .eighteenth-section, .nineteenth-section, .Jose_info-section, .Jose-second-section, .Jose-third-section, .Jose-fourth-section, .Jose-fifth-section, .Jose-sixth-section, .Jose-seventh-section, .Jose-ninth-section, .Jose-eight-section, .Jose-tenth-section, .Jose-eleventh-section, .Jose-twelfth-section, .Jose-thirteenth-section, .Jose-fourteenth-section, .Jose-fifteenth-section, .Jose-sixteenth-section, .Jose-seventeenth-section, .Jose-eighteenth-section, .Jose-nineteenth-section, .Adut_info-section, .Adut-second-section, .Adut-third-section, .Adut-fourth-section, .Adut-fifth-section, .Adut-sixth-section, .Adut-seventh-section, .Adut-ninth-section, .Adut-eight-section, .Adut-tenth-section, .Adut-eleventh-section, .Adut-twelfth-section, .Adut-thirteenth-section, .Adut-fourteenth-section, .Adut-fifteenth-section, .Adut-sixteenth-section, .Adut-seventeenth-section, .Adut-eighteenth-section, .Adut-nineteenth-section");
    sections.forEach(section => section.style.display = "none");

    // --- Scroll ved første knap (logiske operatorer) ---
    let firstButton = document.querySelector(".button_1");
    if (firstButton) {
        firstButton.addEventListener("click", function () {
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
        });
    }

    // --- Navigation mellem sektioner (arrays, kontrolstruktur if-else, objekter, events & loop) ---
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


    // --- POP-UP FUNKTION (download knap) ---
    document.querySelector(".share-result_button").addEventListener("click", () => {
        document.getElementById("popup").style.display = "block";
    });    

    document.getElementById("closeBtn").addEventListener("click", () => {
        document.getElementById("popup").style.display = "none";
    });

        // --- POP-UP FUNKTION  (spørgsmålstegn ikon) ---
    document.querySelectorAll(".question_mark_icon").forEach((icon) => {
        icon.addEventListener("click", () => {
            document.getElementById("popup2").style.display = "block";
        });
    });
    document.getElementById("closeBtn2").addEventListener("click", () => {
        document.getElementById("popup2").style.display = "none";
    });


    // --- BROKEN HEARTS FUNKTION ---
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

    // --- Typewriter + oplæsning Ida ---
    document.addEventListener("DOMContentLoaded", () => {
        const TYPEWRITER_SPEED = 50;
        const synth = window.speechSynthesis;
      
        // Find alle sektioner, som indeholder tekst og ikoner
        const sections = document.querySelectorAll(".info-section");
      
        sections.forEach((section) => {
          const textEl = section.querySelector(".ida_intro p"); // Hver tekst
          const storyText = textEl.innerText;
      
          const startBtn = section.querySelector(".start_icon"); // Play-ikon
          const replayBtn = section.querySelector(".replay_icon"); // Replay-ikon
      
          if (!startBtn || !replayBtn) return; // Hvis knapperne ikke findes, gør ingenting
      
          let isSpeaking = false;
          let isPaused = false;
          let typewriterIndex = 0;
          let typeInterval;
          let utterance;
      
          // Funktion til at nulstille alt
          function reset() {
            clearInterval(typeInterval);
            synth.cancel();
            textEl.textContent = "";
            typewriterIndex = 0;
            isSpeaking = false;
            isPaused = false;
          }
      
          // Typewriter effekt
          function typeWriter() {
            clearInterval(typeInterval);
            typeInterval = setInterval(() => {
              if (typewriterIndex < storyText.length && !isPaused) {
                textEl.textContent += storyText.charAt(typewriterIndex);
                typewriterIndex++;
              } else {
                clearInterval(typeInterval);
              }
            }, TYPEWRITER_SPEED);
          }
      
          // Funktion til at tale teksten
          function speak() {
            utterance = new SpeechSynthesisUtterance(storyText);
            utterance.lang = "da-DK";
            utterance.rate = 0.9;
      
            utterance.onboundary = (event) => {
              if (event.charIndex !== undefined) {
                typewriterIndex = event.charIndex;
              }
            };
      
            utterance.onend = () => {
              isSpeaking = false;
              isPaused = false;
            };
      
            synth.speak(utterance);
            typeWriter();
          }
      
          // Klik på startknap (play-ikon)
          startBtn.addEventListener("click", () => {
            if (isSpeaking) {
              if (isPaused) {
                isPaused = false;
                synth.resume();
                typeWriter();
              } else {
                isPaused = true;
                synth.pause();
                clearInterval(typeInterval);
              }
            } else {
              reset();
              isSpeaking = true;
              speak();
            }
          });
      
          // Klik på replay-knap (restart-ikon)
          replayBtn.addEventListener("click", () => {
            reset();
            isSpeaking = true;
            speak();
          });
        });
      });

    // --- Typewriter + oplæsning Jose ---
    document.addEventListener("DOMContentLoaded", () => {
        const TYPEWRITER_SPEED = 50;
        const synth = window.speechSynthesis;
      
        // Find alle sektioner, som indeholder tekst og ikoner
        const sections = document.querySelectorAll(".Jose_info-section");
      
        sections.forEach((section) => {
          const textEl = section.querySelector(".jose_intro p"); // Hver tekst
          const storyText = textEl.innerText;
      
          const startBtn = section.querySelector(".start_icon"); // Play-ikon
          const replayBtn = section.querySelector(".replay_icon"); // Replay-ikon
      
          if (!startBtn || !replayBtn) return; // Hvis knapperne ikke findes, gør ingenting
      
          let isSpeaking = false;
          let isPaused = false;
          let typewriterIndex = 0;
          let typeInterval;
          let utterance;
      
          // Funktion til at nulstille alt
          function reset() {
            clearInterval(typeInterval);
            synth.cancel();
            textEl.textContent = "";
            typewriterIndex = 0;
            isSpeaking = false;
            isPaused = false;
          }
      
          // Typewriter effekt
          function typeWriter() {
            clearInterval(typeInterval);
            typeInterval = setInterval(() => {
              if (typewriterIndex < storyText.length && !isPaused) {
                textEl.textContent += storyText.charAt(typewriterIndex);
                typewriterIndex++;
              } else {
                clearInterval(typeInterval);
              }
            }, TYPEWRITER_SPEED);
          }
      
          // Funktion til at tale teksten
          function speak() {
            utterance = new SpeechSynthesisUtterance(storyText);
            utterance.lang = "da-DK";
            utterance.rate = 0.9;
      
            utterance.onboundary = (event) => {
              if (event.charIndex !== undefined) {
                typewriterIndex = event.charIndex;
              }
            };
      
            utterance.onend = () => {
              isSpeaking = false;
              isPaused = false;
            };
      
            synth.speak(utterance);
            typeWriter();
          }
      
          // Klik på startknap (play-ikon)
          startBtn.addEventListener("click", () => {
            if (isSpeaking) {
              if (isPaused) {
                isPaused = false;
                synth.resume();
                typeWriter();
              } else {
                isPaused = true;
                synth.pause();
                clearInterval(typeInterval);
              }
            } else {
              reset();
              isSpeaking = true;
              speak();
            }
          });
      
          // Klik på replay-knap (restart-ikon)
          replayBtn.addEventListener("click", () => {
            reset();
            isSpeaking = true;
            speak();
          });
        });
      });

    // --- Typewriter + oplæsning Adut ---
    document.addEventListener("DOMContentLoaded", () => {
        const TYPEWRITER_SPEED = 50;
        const synth = window.speechSynthesis;
      
        // Find alle sektioner, som indeholder tekst og ikoner
        const sections = document.querySelectorAll(".Adut_info-section");
      
        sections.forEach((section) => {
          const textEl = section.querySelector(".adut_intro p"); // Hver tekst
          const storyText = textEl.innerText;
      
          const startBtn = section.querySelector(".start_icon"); // Play-ikon
          const replayBtn = section.querySelector(".replay_icon"); // Replay-ikon
      
          if (!startBtn || !replayBtn) return; // Hvis knapperne ikke findes, gør ingenting
      
          let isSpeaking = false;
          let isPaused = false;
          let typewriterIndex = 0;
          let typeInterval;
          let utterance;
      
          // Funktion til at nulstille alt
          function reset() {
            clearInterval(typeInterval);
            synth.cancel();
            textEl.textContent = "";
            typewriterIndex = 0;
            isSpeaking = false;
            isPaused = false;
          }
      
          // Typewriter effekt
          function typeWriter() {
            clearInterval(typeInterval);
            typeInterval = setInterval(() => {
              if (typewriterIndex < storyText.length && !isPaused) {
                textEl.textContent += storyText.charAt(typewriterIndex);
                typewriterIndex++;
              } else {
                clearInterval(typeInterval);
              }
            }, TYPEWRITER_SPEED);
          }
      
          // Funktion til at tale teksten
          function speak() {
            utterance = new SpeechSynthesisUtterance(storyText);
            utterance.lang = "da-DK";
            utterance.rate = 0.9;
      
            utterance.onboundary = (event) => {
              if (event.charIndex !== undefined) {
                typewriterIndex = event.charIndex;
              }
            };
      
            utterance.onend = () => {
              isSpeaking = false;
              isPaused = false;
            };
      
            synth.speak(utterance);
            typeWriter();
          }
      
          // Klik på startknap (play-ikon)
          startBtn.addEventListener("click", () => {
            if (isSpeaking) {
              if (isPaused) {
                isPaused = false;
                synth.resume();
                typeWriter();
              } else {
                isPaused = true;
                synth.pause();
                clearInterval(typeInterval);
              }
            } else {
              reset();
              isSpeaking = true;
              speak();
            }
          });
      
          // Klik på replay-knap (restart-ikon)
          replayBtn.addEventListener("click", () => {
            reset();
            isSpeaking = true;
            speak();
          });
        });
      });



});
