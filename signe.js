document.addEventListener("DOMContentLoaded", function () {
    const path = document.getElementById("animatedPath");
    const button = document.getElementById("startAnimation");
    const pathLength = path.getTotalLength();

    // Initial styling
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = -pathLength;
    path.style.transition = "none";
    path.style.opacity = "0"; // Skjuler stregen ved start

    button.addEventListener("click", function () {
        path.style.opacity = "1"; // Gør stregen synlig
        path.style.transition = "stroke-dashoffset 3s ease-in-out";
        path.style.strokeDashoffset = "0"; 

        // If-sætning for at tjekke, om animationen er færdig
        if (path.style.strokeDashoffset == "0") {
            // Vent til animationen er færdig, før vi skifter side
            setTimeout(() => {
                window.location.href = "main.html"; // Skift til næste side
            }, 3000); // Vent 3 sekunder (samme som animationens varighed)
        } else {
            console.log("Animation er ikke færdig");
        }
    });
});