/* Sticky nav */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 50);
});


/* Mobile menu */

const menuToggle = document.querySelector(".mobile-menu-toggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "";
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        nav.classList.remove("active");
        document.body.style.overflow = "";
    });
});

document.addEventListener("click", (e) => {
    if (nav.classList.contains("active") && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove("active");
        nav.classList.remove("active");
        document.body.style.overflow = "";
    }
});


/* Fade on scroll */

const fadeObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".fade").forEach(el => {
    fadeObserver.observe(el);
});


/* Active nav link on scroll */

const sections = document.querySelectorAll("section[id], div[id], article[id], header[id]");
const navLinks = document.querySelectorAll("nav ul li a");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active-link"));
                const active = document.querySelector(`nav ul li a[href="#${entry.target.id}"]`);
                if (active) active.classList.add("active-link");
            }
        });
    },
    { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));
