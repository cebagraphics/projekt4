const candles = [ //array af objekter (en liste af objekter)
    { lit: false, name: "", location: "" }, // Første lys - bruger vælger navn
    { lit: true, name: "Sofie", location: "København, Danmark" }, 
    // Hvert lys repræsenterer ét lys og er et objekt med 3 properties af typen Boolean og String
    { lit: true, name: "Anders", location: "Århus, Danmark" },
    { lit: true, name: "Maria", location: "Odense, Danmark" },
    { lit: true, name: "Emil", location: "Aalborg, Danmark" },
    { lit: true, name: "Freja", location: "Esbjerg, Danmark" },
    { lit: true, name: "Thomas", location: "Silkeborg, Danmark" },
    { lit: true, name: "Christine", location: "Kolding, Danmark" },
    { lit: true, name: "Mille", location: "Valby, Danmark" },
    { lit: true, name: "Anton", location: "Gadstrup, Danmark" },
    { lit: true, name: "Pernille", location: "Taastrup, Danmark" },
    { lit: true, name: "Jesper", location: "Skagen, Danmark" },
    { lit: true, name: "Adolf", location: "Tønder, Danmark" },
    { lit: true, name: "Knud", location: "Hvalsø, Danmark" },
    { lit: true, name: "Silke", location: "Viborg, Danmark" },
    { lit: true, name: "Mille", location: "Valby, Danmark" },
    { lit: true, name: "Anton", location: "Gadstrup, Danmark" },
    { lit: true, name: "Pernille", location: "Taastrup, Danmark" },
    { lit: true, name: "Jesper", location: "Skagen, Danmark" },
    { lit: true, name: "Adolf", location: "Tønder, Danmark" },
    { lit: true, name: "Knud", location: "Hvalsø, Danmark" },
    { lit: true, name: "Silke", location: "Viborg, Danmark" },
    { lit: true, name: "Amanda", location: "Køge, Danmark" }
];

// Lit er en Boolean value = true/false. 
// Name og Location er såkaldte strings - bruges til at gemme "tekst-data"
// Senere bruger vi arrayet Candles og vores strings/booleans (candle.name og candle.lit) for at tilgå disse værdier

const candlesPerPage = 10; // Lokal variabel const fortæller at der må være max 10 Candles på en side
let currentPage = 1; // Global variabel der holder styr på hvilken side brugeren ser - 1 betyder at man starter med at se den første side

// Viser fint forskellen på const og let. Const er en variabel som der ikke ændres i og let bruges fordi den skal opdateres.

function renderCandles() { // funktion der bruges til at vise lysene på skærmen
    const grid = document.getElementById("candleGrid"); // reference til HTML-elementet med id'et CandleGrid - det er her lysene skal vises på hjemmeside
    grid.innerHTML = ""; // rydder det gamle indhold, så det nye lys vises (ellers ville de være oveni hinanden)
    console.log("Rendering candles:", candles); //fejlfinding som tjekker at lysene vises rigtigt

       // Beregner hvilke lys der skal vises på den aktuelle side - viser 10 lys per side og regner ud, hvilken side du befinder dig på
       const startIndex = (currentPage - 1) * candlesPerPage;
       const endIndex = startIndex + candlesPerPage;
       const visibleCandles = candles.slice(startIndex, endIndex);
    

    // forEach er et loop 
    visibleCandles.forEach((candle, index) => {
        const div = document.createElement("div");
        div.className = "candle";

         // if/else er kontrolstruktur
        let mediaElement;
        if (candle.lit) { // fortæller at hvis lyset bliver tændt så viser den en video
            mediaElement = document.createElement("video");
            mediaElement.autoplay = true;
            mediaElement.loop = true;
            mediaElement.muted = true;

            const source = document.createElement("source");
            source.src = "images/candle-stage-1.mp4";
            source.type = "video/mp4";
            mediaElement.appendChild(source);

        } else { //fortæller at hvis lyset ikke tændes så viser den billedet af de utændte lys
            mediaElement = document.createElement("img");
            mediaElement.className = "unlit_light.png";
            mediaElement.src = "images/unlit_light.png";
            mediaElement.alt = "Candle";
        }

        // Denne kontrolstruktur fortæller at et navn skal komme frem
        const nameText = document.createElement("p");
        nameText.className = "candle-name";
        if (startIndex + index === 0 && candle.name === "") {
            nameText.innerHTML = `<input type="text" id="nameInput" placeholder="Indtast dit navn" />`;
        } else {
            nameText.textContent = candle.name || "Ukendt";
        }

        // Dette indikerer at en lokation skal komme frem
        const locationText = document.createElement("p");
        locationText.className = "candle-location";
        locationText.textContent = candle.location || "Ukendt placering";


        
        // Tilføj elementer
        div.appendChild(mediaElement);
        div.appendChild(nameText);
        div.appendChild(locationText);
        div.onclick = () => lightCandle(startIndex + index);
        grid.appendChild(div);
    });

    updatePagination();
    updateCounter();
}

function lightCandle(index) {
    if (!candles[index].lit) {
        if (index === 0 && candles[index].name === "") {
            const inputField = document.getElementById("nameInput");
            if (inputField && inputField.value.trim() !== "") {
                candles[index].name = inputField.value.trim();
                getLocation(index);
            } else {
                alert("Indtast venligst dit navn, før du tænder lyset.");
                return;
            }
        } else {
            candles[index].lit = true;
            renderCandles();
        }
    }
}

// GEOLOCATION

function getLocation(index) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                    const data = await response.json();
                    const city = data.address.city || data.address.town || data.address.village || "Ukendt by";
                    const country = data.address.country || "Ukendt land";

                    candles[index].location = `${city}, ${country}`;
                    candles[index].lit = true;
                    renderCandles();
                } catch (error) {
                    console.error("Fejl ved hentning af lokation:", error);
                    candles[index].location = "Ukendt placering";
                    candles[index].lit = true;
                    renderCandles();
                }
            },
            () => {
                alert("Kunne ikke hente din placering.");
                candles[index].location = "Ukendt placering";
                candles[index].lit = true;
                renderCandles();
            }
        );
    } else {
        alert("Din browser understøtter ikke geolocation.");
        candles[index].location = "Ukendt placering";
        candles[index].lit = true;
        renderCandles();
    }
}

function updateCounter() {
const litCount = candles.filter(c => c.lit).length;
document.getElementById("counterNumber").textContent = litCount;
}


// PAGINATION (sider)

function updatePagination() {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    const totalPages = Math.ceil(candles.length / candlesPerPage);

    // Tilføj forrige-knap
    if (currentPage > 1) {
        const prevButton = document.createElement("button");
        prevButton.textContent = "←";
        prevButton.onclick = () => {
            currentPage--;
            renderCandles();
        };
        paginationDiv.appendChild(prevButton);
    }

    // Tilføj sidetal
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.className = i === currentPage ? "active" : "";
        pageButton.onclick = () => {
            currentPage = i;
            renderCandles();
        };
        paginationDiv.appendChild(pageButton);
    }

    // Tilføj næste-knap
    if (currentPage < totalPages) {
        const nextButton = document.createElement("button");
        nextButton.textContent = "→";
        nextButton.onclick = () => {
            currentPage++;
            renderCandles();
        };
        paginationDiv.appendChild(nextButton);
    }
}


// Start rendering
renderCandles();