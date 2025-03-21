const text = "Jeg vidste ikke, hvad jeg skulle gøre..."; 
let index = 0;

function typeWriter() {
    if (index < text.length) {
        document.getElementById("story-text").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // 100 ms mellem bogstaver
    }
}

window.onload = typeWriter;

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.onresult = function(event) {
    let command = event.results[0][0].transcript.toLowerCase();
    if (command.includes("flygt")) {
        chooseOption("escape");
    } else if (command.includes("kæmp")) {
        chooseOption("fight");
    }
};

function startListening() {
    recognition.start();
}
