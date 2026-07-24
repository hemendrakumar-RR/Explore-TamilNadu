(function () {
    'use strict';

    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    const authButtons = document.getElementById('authButtons');
    const profileMenu = document.getElementById('profileMenu');
    const userNameEl = document.getElementById('userName');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const profileModal = document.getElementById('profileModal');

    function getNavbarHeight() {
        return navbar ? navbar.offsetHeight : 80;
    }

    function closeMobileNav() {
        const collapseEl = document.getElementById('navbarNav');
        if (!collapseEl || !collapseEl.classList.contains('show')) return;
        const instance = bootstrap.Collapse.getInstance(collapseEl);
        if (instance) instance.hide();
    }

    function getUser() {
        const data = localStorage.getItem("user");
        return data ? JSON.parse(data) : null;
    }

    function setLoggedInUI(isLoggedIn) {
        if (!authButtons || !profileMenu || !userNameEl) return;

        if (isLoggedIn) {
            const user = getUser();
            if (!user) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setLoggedInUI(false);
                return;
            }
            authButtons.classList.add('d-none');
            profileMenu.classList.remove('d-none');
            userNameEl.textContent = user.fullName;
        } else {
            authButtons.classList.remove('d-none');
            profileMenu.classList.add('d-none');
            userNameEl.textContent = 'Profile';
        }
    }

    function updateProfileModal(user) {
        if (!user) return;

        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        const editName = document.getElementById('editName');
        const editEmail = document.getElementById('editEmail');
        const profileImage = document.getElementById('profileImage');

        if (profileName) profileName.textContent = user.fullName;
        if (profileEmail) profileEmail.textContent = user.email;
        if (editName) editName.value = user.fullName;
        if (editEmail) editEmail.value = user.email;
        if (profileImage) {

            if (user.profileImage && user.profileImage !== "") {
        
                profileImage.src = user.profileImage;
        
            } else {
        
                profileImage.src =
                    "https://ui-avatars.com/api/?background=0B3D3D&color=fff&size=200&name=" +
                    encodeURIComponent(user.fullName);
        
            }
        
        }
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Back to top button
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('show', window.scrollY > 600);
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth scroll for section links (skip modal/dropdown # links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - getNavbarHeight();
            window.scrollTo({ top, behavior: 'smooth' });
            closeMobileNav();
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + getNavbarHeight() + 20;
        let current = '';

        sections.forEach(section => {
            if (section.offsetTop <= scrollPos) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.navbar-nav .nav-link[href^="#"]').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    });

    // Counter fade-in on scroll
    const counters = document.querySelectorAll('.counter');
    if (counters.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counter.style.opacity = '0';
            counter.style.transition = 'opacity 1s ease';
            observer.observe(counter);
            setTimeout(() => { counter.style.opacity = '1'; }, 300);
        });
    }

    // Auto popup after 15 seconds (only if user is not logged in)
    setTimeout(() => {
        if (!localStorage.getItem('token')) {
            const loginModalEl = document.getElementById('loginModal');
            if (loginModalEl) {
                bootstrap.Modal.getOrCreateInstance(loginModalEl).show();
            }
        }
    }, 15000);

    // Signup
    
    // Login
    
    // Profile modal populate on open
    if (profileModal) {
        profileModal.addEventListener('show.bs.modal', function () {
            const user = getUser();
            if (!user) return;
            updateProfileModal(user);
        });
    }

    // Session check on load
    setLoggedInUI(!!localStorage.getItem('token'));
    // Logout (global for onclick in HTML)
    window.logout = function (e) {
        if (e) e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');        
        
        setLoggedInUI(false);
        closeMobileNav();
        if (loginForm) loginForm.reset();
    };

    // Save profile (global for onclick in HTML)
    window.saveProfile = function () {
        const user = getUser();
        if (!user) {
            alert('No user profile found. Please log in again.');
            return;
        }

        const name = document.getElementById('editName').value.trim();
        const email = document.getElementById('editEmail').value.trim();

        if (!name || !email) {
            alert('Name and email cannot be empty.');
            return;
        }

        user.fullName = name;
        user.email = email;
        localStorage.setItem('user', JSON.stringify(user));

        if (userNameEl) userNameEl.textContent = user.fullName;
        updateProfileModal(user);

        alert('Profile Updated Successfully!');

        const modalInstance = bootstrap.Modal.getInstance(profileModal);
        if (modalInstance) modalInstance.hide();
    };
    const uploadInput = document.getElementById("profileUpload");

if (uploadInput) {

    uploadInput.addEventListener("change", async function (e) {

        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("photo", file);

        try {

            const response = await fetch(
                "https://explore-tamilnadu-api.onrender.com/api/users/upload-photo",
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    },
                    body: formData
                }
            );

            const data = await response.json();

            if (data.success) {

                const user = getUser();

                user.profileImage = data.image;

                localStorage.setItem("user", JSON.stringify(user));

                updateProfileModal(user);

                alert("Profile picture updated successfully!");

            } else {

                alert(data.message);

            }

        } catch (err) {

            console.error(err);

            alert("Upload failed.");

        }

    });

}
})();
