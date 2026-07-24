const API = "https://explore-tamilnadu-api.onrender.com/api";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "index.html";
}

async function downloadTicket(id) {

    try {

        const response = await fetch(

            `${API}/bookings/${id}/ticket`,

            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }

        );

        if (!response.ok) {
            alert("Unable to download ticket.");
            return;
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

        console.error(err);

        alert("Download Failed.");

    }

}

async function loadPayments() {

    try {

        const response = await fetch(

            `${API}/bookings/my`,

            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }

        );

        const data = await response.json();

        const container = document.getElementById("paymentContainer");

        if (!data.success) {

            container.innerHTML = `

                <div class="alert alert-danger">

                    ${data.message}

                </div>

            `;

            return;

        }

        if (data.bookings.length === 0) {

            container.innerHTML = `

                <div class="text-center py-5">

                    <h3>No Payment History Found</h3>

                </div>

            `;

            return;

        }

        container.innerHTML = "";

        data.bookings.forEach(booking => {

            container.innerHTML += `

<div class="card border-0 shadow-lg rounded-4 mb-4">

<div class="card-body">

<div class="d-flex justify-content-between align-items-center">

<div>

<h3 class="fw-bold text-primary">

${booking.destination}

</h3>

<p class="text-muted mb-0">

Payment ID

</p>

<p>

${booking.paymentId}

</p>

</div>

<span class="badge bg-success fs-6">

${booking.paymentStatus}

</span>

</div>

<hr>

<div class="row">

<div class="col-md-6">

<p>

<b>Amount</b>

</p>

<h4 class="text-success">

₹${booking.amount}

</h4>

</div>

<div class="col-md-6">

<p>

<b>Booking Date</b>

</p>

<p>

${new Date(booking.bookingDate).toLocaleDateString()}

</p>

</div>

</div>

<hr>

<div class="row">

<div class="col-md-6">

<p>

<b>Hotel</b>

</p>

<p>

${booking.hotel || "Not Selected"}

</p>

</div>

<div class="col-md-6">

<p>

<b>Transport</b>

</p>

<p>

${booking.transport || "Not Selected"}

</p>

</div>

</div>

<hr>

<button

class="btn btn-warning rounded-pill"

onclick="downloadTicket('${booking._id}')">

<i class="bi bi-download me-2"></i>

Download Ticket

</button>

</div>

</div>

`;

        });

    }

    catch (err) {

        console.error(err);

        document.getElementById("paymentContainer").innerHTML = `

        <div class="alert alert-danger">

            Failed to load payment history.

        </div>

        `;

    }

}

window.downloadTicket = downloadTicket;

loadPayments();