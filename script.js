/* =============================================
   PAGE LOADER
   ============================================= */
window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("pageLoader");
        if (loader) loader.classList.add("hidden");
    }, 1500);
});


/* =============================================
   STICKY NAV
   ============================================= */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 60);
    // Back to top visibility
    backToTop.classList.toggle("visible", window.scrollY > 400);
});


/* =============================================
   MOBILE MENU
   ============================================= */
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

document.addEventListener("click", e => {
    if (nav.classList.contains("active") && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove("active");
        nav.classList.remove("active");
        document.body.style.overflow = "";
    }
});


/* =============================================
   FADE ON SCROLL (IntersectionObserver)
   ============================================= */
const fadeObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".fade").forEach(el => fadeObserver.observe(el));


/* =============================================
   MENU TAB FILTER
   ============================================= */
const tabBtns = document.querySelectorAll(".tab-btn");
const cards = document.querySelectorAll(".card");

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const tab = btn.dataset.tab;

        cards.forEach(card => {
            const cat = card.dataset.category;
            const show = tab === "all" || cat === tab;

            if (show) {
                card.classList.remove("hidden");
                // Small stagger animation
                card.style.animation = "none";
                requestAnimationFrame(() => {
                    card.style.animation = "cardReveal 0.45s ease forwards";
                });
            } else {
                card.classList.add("hidden");
            }
        });
    });
});

/* Inject keyframe for card reveal */
const style = document.createElement("style");
style.textContent = `
@keyframes cardReveal {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);


/* =============================================
   ANIMATED STAT COUNTERS
   ============================================= */
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out quad
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

document.querySelectorAll(".counter").forEach(el => counterObserver.observe(el));


/* =============================================
   BACK TO TOP
   ============================================= */
const backToTop = document.getElementById("backToTop");

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/* =============================================
   NEWSLETTER FORM (mock)
   ============================================= */
const newsletterForm = document.querySelector(".newsletter-form");
const newsletterInput = document.querySelector(".newsletter-input");
const newsletterBtn = document.querySelector(".newsletter-submit");

if (newsletterBtn) {
    newsletterBtn.addEventListener("click", () => {
        const email = newsletterInput.value.trim();
        if (!email || !email.includes("@")) {
            newsletterInput.style.borderColor = "#e05050";
            newsletterInput.focus();
            return;
        }
        newsletterInput.style.borderColor = "";
        newsletterBtn.textContent = "Subscribed ✓";
        newsletterBtn.style.background = "#2d7a3a";
        newsletterBtn.style.borderColor = "#2d7a3a";
        newsletterBtn.style.color = "#fff";
        newsletterBtn.disabled = true;
        newsletterInput.value = "";
        newsletterInput.disabled = true;
    });
}


/* =============================================
   ORDER BUTTON FEEDBACK
   ============================================= */
document.querySelectorAll(".card .dy-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const original = this.textContent;
        this.textContent = "Added ✓";
        this.style.background = "#2d7a3a";
        this.style.borderColor = "#2d7a3a";
        this.style.color = "#fff";
        setTimeout(() => {
            this.textContent = original;
            this.style.background = "";
            this.style.borderColor = "";
            this.style.color = "";
        }, 1800);
    });
});


/* =============================================
   MILD PARALLAX ON HERO IMAGE
   ============================================= */
const bannerImg = document.querySelector(".banner-img");

if (bannerImg && window.innerWidth > 768) {
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        bannerImg.style.transform = `translateY(${scrollY * 0.3}px)`;
    }, { passive: true });
}
