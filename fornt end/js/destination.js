function openDestination(place) {

    const currentDestination = localStorage.getItem("currentDestination");

    if (currentDestination !== place) {

        localStorage.removeItem("trip");
    }

    localStorage.setItem("currentDestination", place);

    window.location.href =
        "destination.html?place=" + encodeURIComponent(place);
}

const params = new URLSearchParams(window.location.search);
const place = params.get("place");



if (place && destinations[place]) {

    const data = destinations[place];
    localStorage.setItem("destination", data.title);
    document.title = data.title;

    document.getElementById("heroImage").src = data.hero;

    document.getElementById("title").textContent = data.title;

    document.getElementById("subtitle").textContent = data.subtitle;

    document.getElementById("about").textContent = data.about;

    document.getElementById("places").innerHTML =
data.places.map(place =>

`
<div class="col-lg-4 col-md-6">

<div class="card place-card h-100">

<img src="${place.image}" class="card-img-top">

<div class="card-body">

<h4>${place.name}</h4>

<p>${place.description}</p>

<div class="place-info">

<span>⭐ ${place.rating}</span>

<span> ${place.time}</span>



<h5 class="text-success">

₹${place.total || place.price}

</h5></span></div>
<div class="d-grid gap-2 mt-3">

<a href="https://www.google.com/maps/search/${encodeURIComponent(place.name)}"
   target="_blank"
   class="btn btn-outline-success">

    <i class="bi bi-geo-alt-fill"></i>
    View on Maps

</a>

<button
    class="btn btn-warning w-100 mt-2"
    onclick="openPlaceBooking('${place.name}', ${place.price})">

    Add to Trip

</button>   

</div>

</div>

</div>

</div>

`

)
.join("");
document.getElementById("hotels").innerHTML =
data.hotels.map(hotel =>

`

<div class="col-lg-4">

<div class="card hotel-card h-100">

<img src="${hotel.image}"
class="card-img-top">

<div class="card-body">

<h4>${hotel.name}</h4>  

<p>⭐ ${hotel.rating}</p>



<h5 class="text-success">${hotel.price}</h5>

<button
class="btn btn-warning w-100"
onclick="openHotelBooking('${hotel.name}', ${hotel.price.replace(/[^\d]/g,'')})">
Reserve Hotel
</button>
</div>

</div>

</div>

`

).join("");


document.getElementById("transport").innerHTML =
data.transport.map(car =>

`

<div class="col-lg-4">

<div class="card hotel-card h-100">

<img src="${car.image}" class="card-img-top">

<div class="card-body">

<h4>${car.name}</h4>

<p>Seats : ${car.seats}</p>

<h4 class="text-success fw-bold">
₹${car.price}/Day
</h4>

<button
class="btn btn-warning w-100"
onclick="openTransportBooking('${car.name}', ${car.price})">

Reserve Vehicle

</button>

</div>

</div>

</div>

`

).join("");
function bookPlace(place){

    localStorage.setItem("selectedPlace", place);

    window.location.href = "booking.html";

}
}
function addWishlist(){

    let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];
    
    const place =
    new URLSearchParams(location.search).get("place");
    
    if(!wishlist.includes(place)){
    
    wishlist.push(place);
    
    localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
    );
    
    alert("Added to Wishlist");
    
    }
    else{
    
    alert("Already in Wishlist");
    
    }
    
    }
    function scrollPlaces(){

        document
        .getElementById("placesSection")
        .scrollIntoView({
        
        behavior:"smooth"
        
        });
        
        }
        