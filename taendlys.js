const candles = [ 
    { lit: false, name: "", location: "" }, 
    { lit: true, name: "Sofie", location: "København, Danmark" }, 
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

const candlesPerPage = 10; 
let currentPage = 1;

const startIndex = (currentPage - 1) * candlesPerPage;
const endIndex = startIndex + candlesPerPage;
const visibleCandles = candles.slice(startIndex, endIndex);


function renderCandles() { 
    const grid = document.getElementById("candleGrid"); 
    grid.innerHTML = ""; 
    console.log("Rendering candles:", candles); 


    visibleCandles.forEach((candle, index) => {
        const div = document.createElement("div");
        div.className = "candle";

        let mediaElement;
        if (candle.lit) { 
            mediaElement = document.createElement("video");
            mediaElement.autoplay = true;
            mediaElement.loop = true;
            mediaElement.muted = true;

            const source = document.createElement("source");
            source.src = "images/candle-stage-1.mp4";
            source.type = "video/mp4";
            mediaElement.appendChild(source);

        } else { 
            mediaElement = document.createElement("img");
            mediaElement.className = "unlit_light.png";
            mediaElement.src = "images/unlit_light.png";
            mediaElement.alt = "Candle";
        }

        const nameText = document.createElement("p");
        nameText.className = "candle-name";
        if (startIndex + index === 0 && candle.name === "") {
            nameText.innerHTML = `<input type="text" id="nameInput" placeholder="Indtast dit navn" />`;
        } else {
            nameText.textContent = candle.name || "Ukendt";
        }


        const locationText = document.createElement("p");
        locationText.className = "candle-location"; 
        locationText.textContent = candle.location || "Ukendt placering"; 

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