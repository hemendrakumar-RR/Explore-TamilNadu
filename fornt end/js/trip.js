let transportDays = 1;
let selectedPlace = {};

let ticketPrice = 0;

let tickets = 1;
let trip = JSON.parse(localStorage.getItem("trip")) || [];
let transportPrice = 0;

let transportName = "";

function saveTrip(){
    localStorage.setItem("trip", JSON.stringify(trip));
}

function toggleTrip(name, price, button){

    trip = JSON.parse(localStorage.getItem("trip")) || [];

    const destination =
        document.querySelector(".destination-title")?.innerText ||
        document.querySelector("h1")?.innerText ||
        localStorage.getItem("currentDestination") ||
        "Unknown";

    const index = trip.findIndex(item =>
        item.type === "place" && item.name === name
    );

    if(index === -1){

        trip.push({

            type: "place",

            destination: destination,

            name: name,

            tickets: 1,

            price: Number(price),

            total: Number(price)

        });

        button.innerHTML = "✅ Added";
        button.classList.remove("btn-warning");
        button.classList.add("btn-success");

    }else{

        trip.splice(index,1);

        button.innerHTML = "Add to Trip";
        button.classList.remove("btn-success");
        button.classList.add("btn-warning");

    }

    saveTrip();

    updateTripSummary();
}   
function openPlaceBooking(name, price){

    selectedPlace.name = name;

    ticketPrice = price;

    tickets = 1;

    document.getElementById("placeName").innerHTML = name;

    document.getElementById("ticketPrice").innerHTML =
    "₹" + price;

    document.getElementById("ticketCount").value = 1;

    document.getElementById("visitDate").value = "";

    document.getElementById("placeTotal").innerHTML = "₹0";

    document.getElementById("confirmPlaceBtn").disabled = true;

    new bootstrap.Modal(
        document.getElementById("placeModal")
    ).show();

}
function changeTickets(value){

    tickets += value;

    if(tickets < 1)
        tickets = 1;

    document.getElementById("ticketCount").value = tickets;

    calculatePlaceTotal();

}
function calculatePlaceTotal(){

    const date =
    document.getElementById("visitDate").value;

    if(date==""){

        document.getElementById("placeTotal").innerHTML="₹0";

        document.getElementById("confirmPlaceBtn").disabled=true;

        return;

    }

    const total = ticketPrice * tickets;

    document.getElementById("placeTotal").innerHTML =
    "₹" + total;

    document.getElementById("confirmPlaceBtn").disabled = false;

}   
document.getElementById("visitDate")
.addEventListener("change",calculatePlaceTotal);
function confirmPlaceBooking() {

    const destination =
        document.querySelector(".destination-title")?.innerText ||
        document.querySelector("h1")?.innerText ||
        localStorage.getItem("currentDestination") ||
        "Unknown";

    trip.push({

        type: "place",

        destination: destination,

        name: selectedPlace.name,

        tickets: tickets,

        price: ticketPrice,

        total: ticketPrice * tickets

    });

    saveTrip();

    updateTripSummary();

    bootstrap.Modal
        .getInstance(document.getElementById("placeModal"))
        .hide();

}
   
function updateTripSummary() {

    const container = document.getElementById("tripPlaces");
    const total = document.getElementById("tripTotal");
    const button = document.getElementById("completeTripBtn");

    if (!container) return;

    if (trip.length === 0) {

        container.innerHTML = "<p>No places selected.</p>";
        total.textContent = "0";

        if (button) button.disabled = true;

        return;
    }

    let html = "";
    let sum = 0;

    trip.forEach(item => {

        html += `

<div class="d-flex justify-content-between align-items-center border-bottom py-3">

    <div>

        <h6 class="mb-1">${item.name}</h6>

        ${item.type === "place"
            ? `<small class="text-muted">${item.tickets} Ticket(s)</small>`
            : ""}

        ${item.type === "hotel"
            ? `<small class="text-muted">${item.nights} Night(s)</small>`
            : ""}

        ${item.type === "transport"
            ? `<small class="text-muted">${item.days || 1} Day(s)</small>`
            : ""}

    </div>

    <div class="text-end">

        <h5 class="text-success mb-2">
            ₹${item.total || item.price}
        </h5>

        <button
            class="btn btn-sm btn-outline-danger"
            onclick="removeTripItem('${item.name}')">

            Remove

        </button>

    </div>

</div>

`;

        sum += Number(item.total || item.price);

    });

    container.innerHTML = html;
    total.textContent = sum;

    // Check booking requirements
    const hasPlace = trip.some(item => item.type === "place");
    const hasHotel = trip.some(item => item.type === "hotel");
    const hasTransport = trip.some(item => item.type === "transport");

    if (button) {
        button.disabled = !(hasPlace && hasHotel && hasTransport);
    }

}
updateTripSummary();
let selectedHotel={};

function openHotelBooking(name,price){
    document.getElementById("checkIn").value = "";
document.getElementById("checkOut").value = "";
document.getElementById("guests").value = "1";
document.getElementById("rooms").value = "1";

document.getElementById("hotelTotal").innerHTML = "₹0";

document.getElementById("confirmHotelBtn").disabled = true;
    console.log(name, price);

selectedHotel.name=name;

selectedHotel.price=price;

document.getElementById("hotelName").innerHTML=name;

document.getElementById("nightPrice").innerHTML=
"₹"+price+"/night";

document.getElementById("checkIn").value="";

document.getElementById("checkOut").value="";

document.getElementById("rooms").value=1;

document.getElementById("hotelTotal").innerHTML="₹0";

new bootstrap.Modal(
document.getElementById("hotelModal")
).show();

}


function removeTripItem(name){

    trip = trip.filter(item => item.name !== name);

    saveTrip();

    updateTripSummary();


}


function calculateHotelPrice(){

    const checkIn = document.getElementById("checkIn").value;
const checkOut = document.getElementById("checkOut").value;

if(checkIn==="" || checkOut===""){

    document.getElementById("confirmHotelBtn").disabled=true;
    document.getElementById("hotelTotal").innerHTML="₹0";
    return;

}
    const inDate=new Date(
    document.getElementById("checkIn").value);
    
    const outDate=new Date(
    document.getElementById("checkOut").value);
    
    const rooms=parseInt(
    document.getElementById("rooms").value);
    
    
    document.getElementById("confirmHotelBtn").disabled = false;
    
    if(isNaN(inDate)||isNaN(outDate)) return;
    
    let nights=
    (outDate-inDate)/(1000*60*60*24);
    
    if(nights<1) nights=1;
    
    const total=
    nights*
    selectedHotel.price*
    rooms;
    
    document.getElementById("hotelTotal").innerHTML=
    "₹"+total.toLocaleString();
    
    selectedHotel.total=total;
    
    selectedHotel.nights=nights;
    
    selectedHotel.rooms=rooms;
    
    }

    document.getElementById("checkIn")
.addEventListener("change",calculateHotelPrice);

document.getElementById("checkOut")
.addEventListener("change",calculateHotelPrice);

document.getElementById("rooms")
.addEventListener("change",calculateHotelPrice);



function confirmHotelBooking(){
    const checkIn = document.getElementById("checkIn").value;
const checkOut = document.getElementById("checkOut").value;

if (checkIn === "" || checkOut === "") {

    alert("Please select both Check-in and Check-out dates.");

    return;
}

trip.push({

    type:"hotel",

    name:selectedHotel.name,

    nights:selectedHotel.nights,

    pricePerNight:selectedHotel.price,

    total:selectedHotel.total

});
    saveTrip();
    
    updateTripSummary();
    
    bootstrap.Modal
    .getInstance(
    document.getElementById("hotelModal")
    ).hide();
    
    
    }
    document
.getElementById("hotelModal")
.addEventListener("hidden.bs.modal", function () {

    document.getElementById("checkIn").value = "";
    document.getElementById("checkOut").value = "";
    document.getElementById("guests").value = "1";
    document.getElementById("rooms").value = "1";

    document.getElementById("hotelTotal").innerHTML = "₹0";

    document.getElementById("confirmHotelBtn").disabled = true;

});
document.getElementById("checkIn")
.addEventListener("change", calculateHotelPrice);

document.getElementById("checkOut")
.addEventListener("change", calculateHotelPrice);

document.getElementById("guests")
.addEventListener("change", calculateHotelPrice);

document.getElementById("rooms")
.addEventListener("change", calculateHotelPrice);


    function openTransportBooking(name, price){
        document.getElementById("pickupDate").value = "";
document.getElementById("returnDate").value = "";
document.getElementById("passengers").value = "1";

document.getElementById("transportTotal").innerHTML = "₹0";

document.getElementById("confirmTransportBtn").disabled = true;

        transportName = name;
    
        transportPrice = price;
    
        document.getElementById("transportName").innerHTML = name;
    
        document.getElementById("transportPrice").innerHTML =
        "₹" + price + "/Day";
    
        document.getElementById("transportTotal").innerHTML =
        "₹0";
    
        const modal =
        new bootstrap.Modal(document.getElementById("transportModal"));
    
        modal.show();
    
    }

    function calculateTransport(){
       ;
        const pickup=document.getElementById("pickupDate").value;
const drop=document.getElementById("returnDate").value;

if(pickup==="" || drop===""){

    document.getElementById("confirmTransportBtn").disabled=true;
    document.getElementById("transportTotal").innerHTML="₹0";
    return;

}
        
        document.getElementById("confirmTransportBtn").disabled = false;

        const start = document.getElementById("pickupDate").value;
        const end = document.getElementById("returnDate").value;
    
        const totalElement = document.getElementById("transportTotal");
        const button = document.getElementById("confirmTransportBtn");
    
        if (!start || !end) {
    
            totalElement.innerHTML = "₹0";
            button.disabled = true;
    
            return;
        }
    
        const startDate = new Date(start);
        const endDate = new Date(end);
    
        let days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        transportDays = days;
    
        if (days <= 0) {
    
            totalElement.innerHTML = "₹0";
            button.disabled = true;
    
            return;
        }
    
        const total = days * transportPrice;
    
        totalElement.innerHTML = "₹" + total;
    
        button.disabled = false;
    }
    document.getElementById("pickupDate")
.addEventListener("change",calculateTransport);

document.getElementById("returnDate")
.addEventListener("change",calculateTransport);

function confirmTransportBooking(){

    const start =
    document.getElementById("pickupDate").value;

    const end =
    document.getElementById("returnDate").value;

    if(start=="" || end==""){

        alert("Please select both dates.");

        return;

    }

    const total =
    Number(
        document.getElementById("transportTotal")
        .innerText.replace(/[₹,]/g,"")
    );

    trip.push({

        type:"transport",
    
        name:transportName,
    
        days:transportDays,
    
        pricePerDay:transportPrice,
    
        total:total
    
    });

    saveTrip();

    updateTripSummary();

    bootstrap.Modal.getInstance(
    document.getElementById("transportModal"))
    .hide();

}
document
.getElementById("transportModal")
.addEventListener("hidden.bs.modal", function () {

    document.getElementById("pickupDate").value = "";
    document.getElementById("returnDate").value = "";
    document.getElementById("passengers").value = "1";

    document.getElementById("transportTotal").innerHTML = "₹0";

    document.getElementById("confirmTransportBtn").disabled = true;

});
document.getElementById("pickupDate")
.addEventListener("change", calculateTransport);

document.getElementById("returnDate")
.addEventListener("change", calculateTransport);

document.getElementById("passengers")
.addEventListener("change", calculateTransport);
function goToTripSummary() {

    const trip = JSON.parse(localStorage.getItem("trip")) || [];

    const hasPlace = trip.some(item => item.type === "place");
    const hasHotel = trip.some(item => item.type === "hotel");
    const hasTransport = trip.some(item => item.type === "transport");

    if (!hasPlace || !hasHotel || !hasTransport) {

        alert("Please book at least one attraction, one hotel, and one transport before proceeding.");

        return;
    }

    window.location.href = "trip-summary.html";
}