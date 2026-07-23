const token = localStorage.getItem("token");

fetch("https://explore-tamilnadu-api.onrender.com/api/bookings/my", {
    headers: {
        Authorization: "Bearer " + token
    }
})
.then(res => res.json())
.then(data => {

    const bookings = data.bookings;

    let html = "";

    bookings.forEach((booking) => {

        html += `
        <div class="card shadow-lg border-0 rounded-4 mb-4">

            <div class="card-body p-4">

                <div class="d-flex justify-content-between align-items-center">

                    <h3 class="fw-bold text-success">
                            ${booking.destination}
                    </h3>

                    <span class="badge bg-success fs-6">
                        Confirmed
                    </span>

                </div>

                <hr>

                <p class="mb-4">
                    <strong>Booking ID :</strong>
                    BK${booking._id.slice(-6).toUpperCase()}
                </p>

                <div class="row">

                    <div class="col-md-6 mb-4">
                        <h6 class="text-muted">Destination</h6>
                        <h5>${booking.destination}</h5>
                    </div>

                    <div class="col-md-6 mb-4">
    <h6 class="text-muted">Places Booked</h6>

    <h5>
        ${
            booking.places
            ? booking.places
                .map(place => 
                    `${place.name} (${place.tickets} Ticket${place.tickets > 1 ? "s" : ""})`
                )
                .join("<br>")
            : booking.destination
        }
    </h5>

</div>

                    

                    <div class="col-md-6 mb-4">
                        <h6 class="text-muted">Hotel</h6>
                        <h5>${booking.hotel}</h5>
                    </div>

                    <div class="col-md-6 mb-4">
                        <h6 class="text-muted">Transport</h6>
                        <h5>${booking.transport}</h5>
                    </div>

                    <div class="col-md-6 mb-4">
                        <h6 class="text-muted">Paid</h6>
                        <h4 class="text-success fw-bold">
                            ₹${booking.amount}
                        </h4>
                    </div>

                    <div class="col-12 mb-3">
                        <h6 class="text-muted">Booking Date</h6>
                        <h5>
                            ${new Date(booking.createdAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric"
                            })}
                        </h5>
                    </div>

                </div>

                <hr>

                <div class="text-center">

                    <button
                        class="btn btn-warning px-5 rounded-pill"
                        onclick="downloadTicket('${booking._id}')">

                        Download Ticket

                    </button>

                </div>

            </div>

        </div>
        `;

    });
    

    document.getElementById("bookingContainer").innerHTML = html;

})
.catch(err => console.error(err));
async function downloadTicket(id) {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(
            `https://explore-tamilnadu-api.onrender.com/api/bookings/${id}/ticket`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Unable to download ticket");
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "ExploreTamilNadu-Ticket.pdf";

        document.body.appendChild(a);

        a.click();

        a.remove();

        window.URL.revokeObjectURL(url);

    } catch (err) {

        alert(err.message);

    }

}
