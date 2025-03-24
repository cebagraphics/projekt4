document.addEventListener("DOMContentLoaded", function() {
    // Initially hide all sections
    document.querySelectorAll(".info-section, .second-section, .third-section, .fourth-section, .fifth-section, .sixth-section").forEach(section => {
        section.style.display = "none";
    });

    
    // Event listener 
    document.querySelectorAll(".knap2, .knap3, .knap4, .fortsætknap, .ida_valg1_knap, .ida_valg2_knap, .ida_valg3_knap, .ida_valg4_knap").forEach(knap => {
        knap.addEventListener("click", function() {
            let targetId = this.getAttribute("data-target");

            console.log("Button clicked, targetId:", targetId); // Debugging line

            // Check if a valid targetId exists
            if (targetId) {
                // Hide all sections except info3
                document.querySelectorAll(".info-section, .second-section, .third-section, .fourth-section, .fifth-section, .sixth-section").forEach(section => {
                    if (section.id !== "info3") {
                        section.style.display = "none";
                    }
                });

                // Show the selected section
                let targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.style.display = "block"; // or "flex" depending on your layout
                    targetSection.scrollIntoView({ behavior: "smooth" });
                    console.log("Section displayed:", targetSection.id); // Debugging line
                } else {
                    console.log("Target section not found:", targetId); // Debugging line
                }
            }
        });
    });

    

    // Optional: Scroll down to the first section when the "Tag det første valg" button is clicked
    document.querySelector(".knap1").addEventListener("click", function() {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    });
});