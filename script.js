// Fejlfinding (console.log)
console.log('JavaScript loaded');

// Variabler
let brokenHeart = document.getElementById('brokenHeart');
let wholeHeart = document.getElementById('wholeHeart');

// Kontrolstruktur: if-else til at tjekke tilstedeværelsen af billeder
if (brokenHeart && wholeHeart) {
    // Event: Mouse over og mouse out
    brokenHeart.addEventListener('mouseenter', makeHeartWhole);
    brokenHeart.addEventListener('mouseleave', makeHeartBroken);
} else {
    console.error('Billederne blev ikke fundet!');
}

// Funktion: Gør hjertet helt
function makeHeartWhole() {
    console.log('Musen er over det knuste hjerte');
    // Skift billede: vis hele hjertet, skjul det knuste
    wholeHeart.style.display = 'block';
    brokenHeart.style.display = 'none';
}

// Funktion: Gør hjertet knust igen
function makeHeartBroken() {
    console.log('Musen er væk fra det knuste hjerte');
    // Skift billede: vis det knuste hjerte, skjul hele hjertet
    wholeHeart.style.display = 'none';
    brokenHeart.style.display = 'block';
}

// Array til at gemme en liste af billeder (her bruges kun 2)
let heartImages = [brokenHeart.src, wholeHeart.src];
console.log('Heart images:', heartImages);

// Brug af loop (eksempel)
for (let i = 0; i < heartImages.length; i++) {
    console.log('Heart image at index', i, heartImages[i]);
}

// Objekter: Definer et objekt med egenskaber og metoder
let heartStatus = {
    isBroken: true,
    toggleHeartStatus: function() {
        this.isBroken = !this.isBroken;
        console.log('Hjerte status ændret:', this.isBroken ? 'Knust' : 'Hele');
    }
};

// Global og lokal variabel scope
let globalVar = 'Jeg er global';
function checkScope() {
    let localVar = 'Jeg er lokal';
    console.log(globalVar); // Kan tilgå global
    console.log(localVar);  // Kan kun tilgå lokal inde i funktionen
}

// Test af funktioner og kontrolstruktur
checkScope();

// Brug af let i loop
let count = 0;
let maxClicks = 3;
for (let i = 0; i < maxClicks; i++) {
    console.log('Klik nr.', count + 1);
    count++;
}

// Brug af operatorer
let isHeartWhole = wholeHeart.style.display === 'block';
console.log('Er hjertet helt?', isHeartWhole);
