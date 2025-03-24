document.querySelectorAll(".knap2, .knap3, .knap4").forEach(knap => {
    knap.addEventListener("click", function() {
        let targetId = this.getAttribute("data-target");

        // Skjuler alle sektioner først
        document.querySelectorAll(".info-section").forEach(section => {
            section.style.display = "none";
        });

        // Viser den valgte sektion
        let targetSection = document.getElementById(targetId);
        targetSection.style.display = "flex";

        // Scroller ned til den valgte sektion
        targetSection.scrollIntoView({ behavior: "smooth" });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".info-section").forEach(section => {
        section.style.display = "none"; // Skjuler alle sektioner ved start
    });
});


document.querySelector(".knap1").addEventListener("click", function() {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
});