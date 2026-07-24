const API_URL = "https://explore-tamilnadu-api.onrender.com/api/auth";

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
// ================= SEND OTP =================

async function sendOTP() {

    const email = document.getElementById("forgotEmail").value.trim();

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/send-otp`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email
            })

        });

        const data = await response.json();

        if (data.success) {

            alert("OTP has been sent to your email.");

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.error(err);

        alert("Server Error");

    }

}
// ================= VERIFY OTP =================

async function verifyOTP() {

    const email = document.getElementById("forgotEmail").value.trim();

    const otp = document.getElementById("forgotOTP").value.trim();

    const newPassword =
        document.getElementById("forgotNewPassword").value;

    if (!email || !otp || !newPassword) {

        alert("Please fill all fields.");

        return;

    }

    try {

        const response = await fetch(`${API_URL}/verify-otp`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                email,
                otp,
                newPassword

            })

        });

        const data = await response.json();

        if (data.success) {

            alert("Password changed successfully.");

            bootstrap.Modal.getInstance(
                document.getElementById("forgotPasswordModal")
            ).hide();

            document.getElementById("forgotEmail").value = "";
            document.getElementById("forgotOTP").value = "";
            document.getElementById("forgotNewPassword").value = "";

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.error(err);

        alert("Server Error");

    }

}


window.sendOTP = sendOTP;
window.verifyOTP = verifyOTP;
window.logout = logout;

window.onload = updateNavbar;