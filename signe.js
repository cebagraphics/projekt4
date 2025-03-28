// script.js
document.getElementById('animateButton').addEventListener('click', function() {
    const paths = document.querySelectorAll('svg path');
    
    paths.forEach((path) => {
      // Fjern eksisterende animation og tilføj en ny for at starte animationen fra toppen
      path.style.animation = 'none';
      path.offsetHeight; // Trigger reflow for at sikre animationen starter korrekt
      path.style.animation = 'draw 5s forwards';
    });
  });
  