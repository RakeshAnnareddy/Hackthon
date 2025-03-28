document.addEventListener("DOMContentLoaded", function () {
    let apiURL = "http://127.0.0.1:5000/api/explore-places";  // API for Explore Page
    let container = document.getElementById("districts-container");

    if (!container) {
        console.error("Error: Element with ID 'districts-container' not found.");
        return;  // Stop execution if the container is missing
    }

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            container.innerHTML = ""; // Clear old content
            if (!data.districts || data.districts.length === 0) {
                container.innerHTML = "<p>No data available</p>";  // Handle empty data
                return;
            }

            data.districts.forEach(district => {
                let districtCard = `
                    <div class="box">
                        <a href="places.html?district=${district.name}" class="district-link">
                            <img src="${district.image}" alt="${district.name}">
                            <h3>${district.name}</h3>
                            <p>${district.description}</p>
                        </a>
                    </div>
                `;
                container.innerHTML += districtCard;
            });
        })
        .catch(error => console.error("Error fetching districts:", error));
});
