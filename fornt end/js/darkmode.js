function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    document.getElementById("darkSwitch").checked = isDark;

}

document.addEventListener("DOMContentLoaded", () => {

    const isDark = localStorage.getItem("theme") === "dark";

    if (isDark) {
        document.body.classList.add("dark-mode");
    }

    const sw = document.getElementById("darkSwitch");

    if (sw) {
        sw.checked = isDark;
    }

});