document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchDestination");
    const searchButton = document.querySelector(".search-box button");

    if (!searchInput || !searchButton) return;

    searchButton.addEventListener("click", searchDestination);

    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            searchDestination();
        }
    });

    function searchDestination() {

        const value = searchInput.value.trim().toLowerCase();

        const cards = document.querySelectorAll(".destination-item");

        let firstMatch = null;

        cards.forEach(card => {

            const name = card.dataset.name.toLowerCase();

            if (name.startsWith(value)) {

                card.style.display = "block";

                if (!firstMatch) {
                    firstMatch = card;
                }

            } else {

                card.style.display = "none";

            }

        });

        if (firstMatch) {

            firstMatch.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        } else {

            alert("Destination not found.");

            // Show everything again
            cards.forEach(card => {
                card.style.display = "block";
            });

        }

    }

});