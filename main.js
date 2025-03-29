
document.addEventListener("DOMContentLoaded", function () {
    // Start med at skjule alle sektioner undtagen den første
    document.querySelectorAll(".info-section, .second-section, .third-section, .fourth-section, .fifth-section, .sixth-section, .seventh-section, .eight-section, .ninth-section, .tenth-section, .eleventh-section, .twelfth-section, .thirteenth-section, .fourteenth-section, .fifteenth-section, .sixteenth-section, .seventeenth-section, .eighteenth-section, .nineteenth-section, .Jose-second-section, .Jose-third-section, .Jose-fourth-section, .Jose-fifth-section, .Jose-sixth-section, .Jose-seventh-section, .Jose-ninth-section, .Jose-eight-section, .Jose-tenth-section, .Jose-eleventh-section, .Jose-twelfth-section, .Jose-thirteenth-section, .Jose-fourteenth-section, .Jose-fifteenth-section, .Jose-sixteenth-section, .Jose-seventeenth-section, .Jose-eighteenth-section, .Jose-nineteenth-section").forEach(section => {
        section.style.display = "none";
    });

    // Event listener til alle knapper
    document.querySelectorAll(".knap2, .knap3, .knap4, .fortsætknap, .choicebutton, .third-section_button, .fourth-section_button, .fifth-section_button, .sixth-section_button, .dilemma2_valg1_knap, .dilemma2_valg2_knap, .sidste_knap").forEach(knap => {
        knap.addEventListener("click", function () {
            let targetId = this.getAttribute("data-target");

            if (targetId) {
                let targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.style.display = "block"; // Vis den nye sektion
                    targetSection.scrollIntoView({ behavior: "smooth" }); // Scroll til den nye sektion
                }
            }
        });
    });

    // Scroll-funktion for første valg
    let firstButton = document.querySelector(".knap1");
    if (firstButton) {
        firstButton.addEventListener("click", function () {
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
        });
    }
});

document.querySelector(".del-resultat_knap").addEventListener("click", () => {
    document.getElementById("popup").style.display = "block";
});

document.getElementById("closeBtn").addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
});


document.querySelector(".spørgsmålstegnicon").addEventListener("click", () => {
    document.getElementById("popup2").style.display = "block";
});

document.getElementById("closeBtn2").addEventListener("click", () => {
    document.getElementById("popup2").style.display = "none";
});


