const API_URL = "http://localhost:5000/api/auth";

// ================= SIGNUP =================
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName,
                email,
                password
            })
        });

        const data = await response.json();

        if (data.success) {

            alert("Registration Successful!");

            bootstrap.Modal.getInstance(
                document.getElementById("signupModal")
            ).hide();

            document.getElementById("signupForm").reset();

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.error(err);

        alert("Server Error");

    }

});

// ================= LOGIN =================
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {

        const response = await fetch(`${API_URL}/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (data.success) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login Successful!");

            bootstrap.Modal.getInstance(
                document.getElementById("loginModal")
            ).hide();

            updateNavbar();

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.error(err);

        alert("Server Error");

    }

});

// ================= NAVBAR =================

function updateNavbar() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    document.getElementById("authButtons").classList.add("d-none");

    document.getElementById("profileMenu").classList.remove("d-none");

    document.getElementById("userName").textContent = user.fullName;

    document.getElementById("dropdownUserName").textContent = user.fullName;

    document.getElementById("dropdownUserEmail").textContent = user.email;
}

// ================= LOGOUT =================

function logout(e){

    if(e) e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    location.reload();

}

window.onload = updateNavbar;