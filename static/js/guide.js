// Sample data for guides
const guides = [
  { name: "Ravi Kumar", location: "Chittoor", language: "Telugu", rating: 4.5, available: true, contact: "+91 98765 43210" },
  { name: "Anjali Sharma", location: "West Godavari", language: "English", rating: 4.8, available: false, contact: "+91 98765 43211" },
  { name: "Vishal Reddy", location: "Visakhapatnam", language: "Telugu", rating: 4.3, available: true, contact: "+91 98765 43212" },
  { name: "Neelam Reddy", location: "Guntur", language: "Telugu", rating: 4.7, available: true, contact: "+91 98765 43213" },
  { name: "Sudhir Patel", location: "Bapatla", language: "English", rating: 4.6, available: false, contact: "+91 98765 43214" },
  { name: "Priya Iyer", location: "East Godavari", language: "English", rating: 4.4, available: true, contact: "+91 98765 43215" },
  { name: "Suresh Kumar", location: "Srikakulam", language: "Telugu", rating: 4.2, available: true, contact: "+91 98765 43216" },
  { name: "Sonia Gupta", location: "Krishna", language: "Hindi", rating: 4.9, available: true, contact: "+91 98765 43217" }
];

document.getElementById('search-btn').addEventListener('click', searchGuides);

function searchGuides() {
  const searchQuery = document.getElementById('search-bar').value.toLowerCase();
  const locationFilter = document.getElementById('location-filter').value.toLowerCase();
  const languageFilter = document.getElementById('language-filter').value.toLowerCase();

  const filteredGuides = guides.filter(guide => {
    const matchesLocation = locationFilter ? guide.location.toLowerCase().includes(locationFilter) : true;
    const matchesLanguage = languageFilter ? guide.language.toLowerCase().includes(languageFilter) : true;
    return guide.location.toLowerCase().includes(searchQuery) && matchesLocation && matchesLanguage;
  });

  displayGuides(filteredGuides);
}

function displayGuides(guides) {
  const guideListContainer = document.querySelector('.guide-list');
  guideListContainer.innerHTML = '';

  guides.forEach((guide, index) => {
    const guideCard = document.createElement('div');
    guideCard.classList.add('guide-card');

    guideCard.innerHTML = `
      <h4>${guide.name}</h4>
      <p>Location: ${guide.location}</p>
      <p>Language: ${guide.language}</p>
      <p>Rating: ${guide.rating}</p>
      <p>Status: ${guide.available ? "Available" : "Unavailable"}</p>
      <p>Contact: ${guide.contact}</p>
      ${guide.available ? `<button onclick="showBudgetOptions(${index})">Book Guide</button>` : ""}
    `;

    guideListContainer.appendChild(guideCard);
  });
}

// Show Budget Popup
function showBudgetOptions(index) {
  const popup = document.getElementById('budget-popup');
  popup.style.display = "block";
  popup.dataset.index = index;
}

// Book Guide
function bookGuide(budgetType) {
  const index = document.getElementById('budget-popup').dataset.index;
  guides[index].available = false; // Mark as unavailable
  displayGuides(guides); // Refresh the guide list
  closePopup();
}

// Close Popup
function closePopup() {
  document.getElementById('budget-popup').style.display = "none";
}

// Initialize with all guides
displayGuides(guides);
