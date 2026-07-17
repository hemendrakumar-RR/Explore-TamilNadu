const trip = JSON.parse(localStorage.getItem("trip")) || [];

let html = "";
let subtotal = 0;

trip.forEach(item => {

    html += `
    <div class="section d-flex justify-content-between align-items-start py-2">

        <div>

            <h5 class="mb-1">${item.name}</h5>

            ${
                item.type === "place"
                ? `<small>${item.tickets || 1} Ticket(s)</small>`
                : ""
            }

            ${
                item.type === "hotel"
                ? `<small>${item.nights} Night(s) × ₹${item.pricePerNight}</small>`
                : ""
            }

            ${
                item.type === "transport"
                ? `<small>${item.days} Day(s) × ₹${item.pricePerDay}</small>`
                : ""
            }

        </div>

        <div>

            <h5 class="price text-success">

                ₹${item.total || item.price}

            </h5>

        </div>

    </div>
    `;

    subtotal += Number(item.total || item.price);

});

document.getElementById("summaryContainer").innerHTML = html;

const gst = Math.round(subtotal * 0.05);
const service = 150;
const grand = subtotal + gst + service;

document.getElementById("gst").innerHTML = "₹" + gst;
document.getElementById("grandTotal").innerHTML = "₹" + grand;

localStorage.setItem("grandTotal", grand);

async function goPayment() {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        return;
    }

    const places = trip.filter(item => item.type === "place");

    const hotel = trip.find(item => item.type === "hotel");

    const transport = trip.find(item => item.type === "transport");

    const destination = localStorage.getItem("destination") || "Unknown";

    const booking = {
        destination,
        places: places.map(place => ({
            name: place.name,
            tickets: place.tickets || 1
        })),
        hotel: hotel ? hotel.name : "Not Selected",
        transport: transport ? transport.name : "Not Selected",
        amount: grand
    };

    // Store booking temporarily
    localStorage.setItem("pendingBooking", JSON.stringify(booking));

    // Go to payment page
    window.location.href = "payment.html";
}