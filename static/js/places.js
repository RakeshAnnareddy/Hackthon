document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:5000/api/districts") // Fetch data from Flask API
        .then(response => response.json())
        .then(data => displayDistricts(data))
        .catch(error => console.error("Error fetching data:", error));
});

function displayDistricts(districts) {
    const districtList = document.getElementById("districtList");
    const placesContainer = document.getElementById("placesContainer");
    const districtTitle = document.getElementById("districtTitle");
    const districtDesc = document.getElementById("districtDesc");

    districtList.innerHTML = ""; // Clear previous content

    districts.forEach(district => {
        let li = document.createElement("li");
        li.textContent = district.name;
        li.addEventListener("click", function () {
            districtTitle.textContent = district.name;
            districtDesc.textContent = district.description;

            placesContainer.innerHTML = ""; // Clear previous places

            district.places.forEach(place => {
                let placeDiv = document.createElement("div");
                placeDiv.classList.add("box");
                placeDiv.innerHTML = `
                    <h3>${place.name}</h3>
                    <p>${place.description}</p>
                    <p><strong>Timings:</strong> ${place.timings}</p>
                    <p><strong>Pricing:</strong> ${place.pricing}</p>
                `;
                placesContainer.appendChild(placeDiv);
            });
        });

        districtList.appendChild(li);
    });
}
