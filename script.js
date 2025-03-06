document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const resultsContainer = document.getElementById("results-container");
    const clearButton = document.getElementById("clear-button");

    searchButton.addEventListener("click", function () {
        const query = searchInput.value.trim().toLowerCase();
        fetch("travel_recommendation_api.json")
            .then(response => response.json())
            .then(data => {
                resultsContainer.innerHTML = "";
                let results = [];
                
                if (query.includes("beach")) {
                    results = data.beaches;
                } else if (query.includes("temple")) {
                    results = data.temples;
                } else {
                    results = data.countries.flatMap(country => country.cities)
                        .filter(city => city.name.toLowerCase().includes(query));
                }
                
                if (results.length > 0) {
                    results.forEach(place => {
                        const placeElement = document.createElement("div");
                        placeElement.classList.add("place-card");
                        placeElement.innerHTML = `
                            <img src="${place.imageUrl}" alt="${place.name}">
                            <h3>${place.name}</h3>
                            <p>${place.description}</p>
                        `;
                        resultsContainer.appendChild(placeElement);
                    });
                } else {
                    resultsContainer.innerHTML = "<p>No results found</p>";
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    });

    function clearResults() {
        resultsContainer.innerHTML = "";  // Corrected from recommendationsContainer
        searchInput.value = "";
    }
    clearButton.addEventListener("click", clearResults);
});
