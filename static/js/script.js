document.addEventListener("DOMContentLoaded", function () {
    let apiURL = "http://127.0.0.1:5000/api/places";  // API for Home Page Places

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById("places-container");
            container.innerHTML = "";
            data.places.forEach(place => {
                let placeCard = `
                    <div class="place-card">
                        <img src="${place.image}" alt="${place.name}">
                        <div>
                            <h2>${place.name}</h2>
                            <p><strong>Location:</strong> ${place.location}</p>
                            <p>${place.description}</p>
                        </div>
                    </div>
                `;
                container.innerHTML += placeCard;
            });
        })
        .catch(error => console.error("Error fetching places:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    let exploreBtn = document.getElementById("explore-btn");
    if (exploreBtn) {
        exploreBtn.addEventListener("click", function () {
            window.location.href = "/explore";
        });
    }
});