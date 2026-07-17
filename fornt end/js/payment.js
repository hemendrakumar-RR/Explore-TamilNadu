const total = Number(localStorage.getItem("grandTotal"));

document.getElementById("amount").textContent = total;

async function payNow() {

    const options = {

        key: "rzp_test_TCgd1JgUuVajyc",

        amount: total * 100,

        currency: "INR",

        name: "Explore Tamil Nadu",

        description: "Trip Booking",

        handler: async function (response) {

            try {
        
                localStorage.setItem("paymentId", response.razorpay_payment_id);
        
                const token = localStorage.getItem("token");
        
                const booking = JSON.parse(localStorage.getItem("pendingBooking"));
        
                booking.paymentId = response.razorpay_payment_id;
                booking.paymentStatus = "Paid";
        
                const res = await fetch("http://localhost:5000/api/bookings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(booking)
                });
        
                const data = await res.json();
        
                if (data.success) {
        
                    window.location.href = "success.html";
        
                } else {
        
                    alert("Booking Failed: " + data.message);
        
                }
        
            } catch (err) {
        
                console.error(err);
                alert("Something went wrong while processing your booking.");
        
            }
        
        }

    };

    const rzp = new Razorpay(options);

    rzp.on("payment.failed", function () {

        localStorage.setItem("lastPaymentStatus", "Failed");

        window.location.href = "payment-failed.html";

    });

    rzp.open();
}