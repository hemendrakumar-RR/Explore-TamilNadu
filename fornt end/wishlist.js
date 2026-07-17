document.addEventListener("DOMContentLoaded", () => {

    loadWishlistIcons();

    const wishlistModal = document.getElementById("wishlistModal");

    if (wishlistModal) {

        wishlistModal.addEventListener("show.bs.modal", loadWishlistPage);

    }

});

function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(list) {
    localStorage.setItem("wishlist", JSON.stringify(list));
}

function toggleWishlist(place, button) {

    let wishlist = getWishlist();

    const index = wishlist.indexOf(place);

    const icon = button.querySelector("i");

    if (index === -1) {

        wishlist.push(place);

        icon.classList.remove("bi-heart");
        icon.classList.add("bi-heart-fill", "text-danger");

    } else {

        wishlist.splice(index, 1);

        icon.classList.remove("bi-heart-fill", "text-danger");
        icon.classList.add("bi-heart");

    }

    saveWishlist(wishlist);

loadWishlistIcons();

loadWishlistPage();

}

function loadWishlistIcons() {

    const wishlist = getWishlist();

    document.querySelectorAll(".wishlist-btn").forEach(btn => {

        const place = btn.getAttribute("onclick")
            .match(/'([^']+)'/)[1];

        const icon = btn.querySelector("i");

        if (wishlist.includes(place)) {

            icon.className = "bi bi-heart-fill text-danger";

        } else {

            icon.className = "bi bi-heart";

        }

    });

}
function loadWishlistPage() {

    const container = document.getElementById("wishlistContainer");

    if (!container) return;

    const wishlist = getWishlist();

    if (wishlist.length === 0) {

        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-heart fs-1 text-danger"></i>
                <h4>Your Wishlist is Empty</h4>
                <p class="text-muted">
                    Click the heart icon on any destination to save it.
                </p>
            </div>
        `;

        return;
    }

    let html = "";

    wishlist.forEach(place => {

        html += `
            <div class="card mb-3 shadow-sm rounded-4">

                <div class="card-body d-flex justify-content-between align-items-center">

                    <div>

                        <h5 class="mb-1">${place}</h5>

                        <small class="text-muted">
                            Saved Destination
                        </small>

                    </div>

                    <button
                        class="btn btn-danger btn-sm rounded-pill"
                        onclick="removeWishlist('${place}')">

                        Remove

                    </button>

                </div>

            </div>
        `;

    });

    container.innerHTML = html;

}

function removeWishlist(place) {

    let wishlist = getWishlist();

    wishlist = wishlist.filter(item => item !== place);

    saveWishlist(wishlist);

    loadWishlistIcons();

    loadWishlistPage();

}