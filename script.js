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
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.92) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes overlayIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes toastIn {
  from { opacity: 0; transform: translateX(110%); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes toastOut {
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(110%); }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}

/* ---- MODAL OVERLAY ---- */
.lc-overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 10, 3, 0.72);
  backdrop-filter: blur(6px);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: overlayIn 0.3s ease;
}
.lc-overlay.closing {
  animation: overlayIn 0.25s ease reverse forwards;
}

/* ---- ORDER MODAL ---- */
.order-modal {
  background: #fff8f0;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.3);
  animation: modalIn 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: "DM Sans", sans-serif;
}
.order-modal-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}
.order-modal-body {
  padding: 24px 28px 28px;
}
.order-modal-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #b89060;
  margin-bottom: 6px;
}
.order-modal-name {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 26px;
  font-weight: 700;
  color: #40220b;
  margin-bottom: 4px;
}
.order-modal-price {
  font-size: 20px;
  font-weight: 600;
  color: #d9b688;
  margin-bottom: 12px;
}
.order-modal-desc {
  font-size: 14px;
  color: rgba(64,34,11,0.75);
  line-height: 1.6;
  margin-bottom: 24px;
}
.order-modal-qty {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.order-modal-qty label {
  font-size: 13px;
  font-weight: 500;
  color: #40220b;
}
.qty-ctrl {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1.5px solid #d9b688;
  border-radius: 10px;
  overflow: hidden;
}
.qty-ctrl button {
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  font-size: 18px;
  cursor: pointer;
  color: #40220b;
  transition: background 0.2s;
}
.qty-ctrl button:hover { background: #f5efe6; }
.qty-val {
  width: 40px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: #40220b;
  border: none;
  border-left: 1.5px solid #d9b688;
  border-right: 1.5px solid #d9b688;
  padding: 6px 0;
  background: #fff8f0;
  pointer-events: none;
}
.order-modal-total {
  font-size: 13px;
  color: #40220b;
  opacity: 0.7;
  margin-left: auto;
}
.order-modal-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.btn-paypal {
  background: #FFC439;
  color: #003087;
  border: none;
  border-radius: 12px;
  height: 48px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  letter-spacing: 0.01em;
  transition: opacity 0.2s, transform 0.15s;
}
.btn-paypal:hover { opacity: 0.9; transform: translateY(-1px); }
.btn-card {
  background: #40220b;
  color: #f5efe6;
  border: none;
  border-radius: 12px;
  height: 48px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s, transform 0.15s;
}
.btn-card:hover { background: #5c3415; transform: translateY(-1px); }
.btn-modal-close {
  background: none;
  border: 1.5px solid rgba(64,34,11,0.2);
  border-radius: 12px;
  height: 40px;
  font-size: 14px;
  color: rgba(64,34,11,0.6);
  cursor: pointer;
  transition: all 0.2s;
}
.btn-modal-close:hover { border-color: #40220b; color: #40220b; }
.modal-close-x {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  border: none;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #40220b;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: background 0.2s;
  z-index: 10;
}
.modal-close-x:hover { background: #fff; }

/* ---- CARD FORM ---- */
.card-form {
  padding: 28px;
  font-family: "DM Sans", sans-serif;
  max-width: 500px;
  width: 100%;
  background: #fff8f0;
  border-radius: 20px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.3);
  animation: modalIn 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.card-form h3 {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 22px;
  color: #40220b;
  margin-bottom: 6px;
}
.card-form .cf-sub {
  font-size: 13px;
  color: rgba(64,34,11,0.6);
  margin-bottom: 22px;
}
.cf-order-summary {
  background: #f5efe6;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 13px;
  color: #40220b;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cf-order-summary strong { font-weight: 600; }
.cf-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(64,34,11,0.55);
  display: block;
  margin-bottom: 6px;
  margin-top: 14px;
}
.cf-input {
  width: 100%;
  height: 46px;
  border: 1.5px solid rgba(64,34,11,0.2);
  border-radius: 10px;
  padding: 0 14px;
  font-size: 15px;
  font-family: "DM Sans", sans-serif;
  color: #40220b;
  background: #fff;
  transition: border-color 0.2s;
  outline: none;
}
.cf-input:focus { border-color: #d9b688; }
.cf-input.error { border-color: #e05050; animation: shake 0.3s ease; }
.cf-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.cf-card-icons {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
  margin-top: 4px;
}
.cf-card-icon {
  width: 42px;
  height: 28px;
  border-radius: 5px;
  background: #e8cfa8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: #40220b;
  letter-spacing: 0.05em;
}
.cf-submit {
  width: 100%;
  height: 50px;
  background: #40220b;
  color: #f5efe6;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  font-family: "DM Sans", sans-serif;
  cursor: pointer;
  margin-top: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s, transform 0.15s;
  position: relative;
}
.cf-submit:hover { background: #5c3415; transform: translateY(-1px); }
.cf-back {
  width: 100%;
  height: 40px;
  background: none;
  border: 1.5px solid rgba(64,34,11,0.2);
  border-radius: 10px;
  font-size: 13px;
  color: rgba(64,34,11,0.6);
  cursor: pointer;
  margin-top: 8px;
  font-family: "DM Sans", sans-serif;
  transition: all 0.2s;
}
.cf-back:hover { border-color: #40220b; color: #40220b; }
.secure-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: rgba(64,34,11,0.45);
  margin-top: 12px;
  justify-content: center;
}

/* ---- TOAST ---- */
.lc-toast-container {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}
.lc-toast {
  background: #40220b;
  color: #f5efe6;
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 14px;
  font-family: "DM Sans", sans-serif;
  box-shadow: 0 8px 28px rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 250px;
  max-width: 360px;
  animation: toastIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  pointer-events: auto;
}
.lc-toast.out { animation: toastOut 0.3s ease forwards; }
.lc-toast-icon { font-size: 18px; flex-shrink: 0; }
.lc-toast span { flex: 1; line-height: 1.4; }

/* ---- GENERIC MODAL (Coming Soon, etc.) ---- */
.generic-modal {
  background: #fff8f0;
  border-radius: 20px;
  padding: 40px 36px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  box-shadow: 0 30px 80px rgba(0,0,0,0.3);
  animation: modalIn 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: "DM Sans", sans-serif;
}
.generic-modal .gm-icon {
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
}
.generic-modal h3 {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 24px;
  color: #40220b;
  margin-bottom: 10px;
}
.generic-modal p {
  font-size: 15px;
  color: rgba(64,34,11,0.65);
  line-height: 1.6;
  margin-bottom: 24px;
}
.generic-modal .gm-close {
  background: #40220b;
  color: #f5efe6;
  border: none;
  border-radius: 12px;
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 600;
  font-family: "DM Sans", sans-serif;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}
.generic-modal .gm-close:hover { background: #5c3415; transform: translateY(-1px); }
.generic-modal .gm-secondary {
  background: none;
  border: 1.5px solid rgba(64,34,11,0.2);
  border-radius: 12px;
  padding: 10px 22px;
  font-size: 14px;
  color: rgba(64,34,11,0.6);
  cursor: pointer;
  margin-left: 10px;
  font-family: "DM Sans", sans-serif;
  transition: all 0.2s;
}
.generic-modal .gm-secondary:hover { border-color: #40220b; color: #40220b; }

/* ---- MAP MODAL ---- */
.map-modal {
  background: #fff8f0;
  border-radius: 20px;
  max-width: 560px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.3);
  animation: modalIn 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: "DM Sans", sans-serif;
}
.map-embed {
  width: 100%;
  height: 280px;
  background: #e8cfa8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #40220b;
  position: relative;
  overflow: hidden;
}
.map-embed svg { position: absolute; opacity: 0.08; }
.map-pin {
  width: 48px;
  height: 48px;
  background: #40220b;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(64,34,11,0.4);
  z-index: 1;
}
.map-pin::after {
  content: "☕";
  transform: rotate(45deg);
  font-size: 20px;
}
.map-body {
  padding: 24px 28px;
}
.map-body h3 {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 22px;
  color: #40220b;
  margin-bottom: 16px;
}
.map-info-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  color: rgba(64,34,11,0.75);
}
.map-info-row strong { color: #40220b; display: block; margin-bottom: 2px; }
.map-info-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
.map-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.btn-directions {
  flex: 1;
  height: 46px;
  background: #40220b;
  color: #f5efe6;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  font-family: "DM Sans", sans-serif;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-directions:hover { background: #5c3415; }
.btn-map-close {
  height: 46px;
  padding: 0 20px;
  background: none;
  border: 1.5px solid rgba(64,34,11,0.2);
  border-radius: 12px;
  font-size: 14px;
  color: rgba(64,34,11,0.6);
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  transition: all 0.2s;
}
.btn-map-close:hover { border-color: #40220b; color: #40220b; }

/* ---- LOYALTY MODAL ---- */
.loyalty-modal {
  background: #40220b;
  border-radius: 20px;
  max-width: 440px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.4);
  animation: modalIn 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: "DM Sans", sans-serif;
  color: #f5efe6;
}
.loyalty-header {
  background: linear-gradient(135deg, #5c3415 0%, #40220b 100%);
  padding: 28px;
  text-align: center;
  position: relative;
}
.loyalty-header::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f5efe6' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
}
.loyalty-cups {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 20px 0 16px;
  position: relative;
  z-index: 1;
}
.loyalty-cup {
  font-size: 28px;
  opacity: 0.3;
  transition: all 0.3s;
}
.loyalty-cup.filled {
  opacity: 1;
  filter: drop-shadow(0 0 6px rgba(217,182,136,0.6));
}
.loyalty-header h3 {
  font-family: "Playfair Display", serif;
  font-size: 22px;
  position: relative;
  z-index: 1;
}
.loyalty-header p {
  font-size: 13px;
  opacity: 0.7;
  margin-top: 4px;
  position: relative;
  z-index: 1;
}
.loyalty-body {
  padding: 24px 28px;
}
.loyalty-progress-bar {
  background: rgba(255,255,255,0.1);
  border-radius: 100px;
  height: 8px;
  margin: 14px 0 6px;
  overflow: hidden;
}
.loyalty-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #d9b688, #e8cfa8);
  border-radius: 100px;
  width: 0%;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.loyalty-status {
  font-size: 12px;
  opacity: 0.6;
  text-align: right;
  margin-bottom: 20px;
}
.loyalty-perk-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}
.loyalty-perk-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  opacity: 0.85;
}
.loyalty-perk-list li::before {
  content: "✓";
  width: 22px;
  height: 22px;
  background: rgba(217,182,136,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #d9b688;
  flex-shrink: 0;
}
.btn-loyalty-join {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #d9b688, #b89060);
  color: #40220b;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  font-family: "DM Sans", sans-serif;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
}
.btn-loyalty-join:hover { opacity: 0.9; transform: translateY(-1px); }
.btn-loyalty-close {
  width: 100%;
  height: 40px;
  background: rgba(255,255,255,0.08);
  border: none;
  border-radius: 10px;
  font-size: 13px;
  color: rgba(245,239,230,0.6);
  cursor: pointer;
  margin-top: 8px;
  font-family: "DM Sans", sans-serif;
  transition: background 0.2s;
}
.btn-loyalty-close:hover { background: rgba(255,255,255,0.12); }

/* ---- TEAM MODAL ---- */
.team-modal {
  background: #fff8f0;
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.3);
  animation: modalIn 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: "DM Sans", sans-serif;
}
.team-header {
  padding: 28px 28px 0;
  text-align: center;
}
.team-header h3 {
  font-family: "Playfair Display", serif;
  font-size: 26px;
  color: #40220b;
  margin-bottom: 6px;
}
.team-header p {
  font-size: 14px;
  color: rgba(64,34,11,0.6);
  margin-bottom: 24px;
}
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 0 28px 28px;
}
.team-member {
  text-align: center;
}
.team-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 10px;
  font-family: "Playfair Display", serif;
  font-weight: 700;
  color: #fff8f0;
}
.team-member h4 {
  font-size: 14px;
  font-weight: 600;
  color: #40220b;
  margin-bottom: 2px;
}
.team-member span {
  font-size: 11px;
  color: rgba(64,34,11,0.5);
}
.team-close-btn {
  margin: 0 28px 28px;
  width: calc(100% - 56px);
  height: 44px;
  background: #40220b;
  color: #f5efe6;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  font-family: "DM Sans", sans-serif;
  cursor: pointer;
  transition: background 0.2s;
}
.team-close-btn:hover { background: #5c3415; }

/* ---- GALLERY LIGHTBOX ---- */
.lightbox-modal {
  background: rgba(0,0,0,0.0);
  border-radius: 0;
  max-width: 800px;
  width: 100%;
  animation: modalIn 0.3s ease;
  position: relative;
}
.lightbox-img {
  width: 100%;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  display: block;
}
.lightbox-caption {
  text-align: center;
  color: rgba(255,255,255,0.7);
  font-size: 13px;
  margin-top: 12px;
  font-family: "DM Sans", sans-serif;
}
.lightbox-close {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(4px);
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.lightbox-close:hover { background: rgba(255,255,255,0.25); }
.lightbox-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(4px);
  border: none;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.lightbox-nav:hover { background: rgba(255,255,255,0.25); }
.lightbox-prev { left: 20px; }
.lightbox-next { right: 20px; }

/* ---- TODAY'S SPECIAL MODAL ---- */
.special-modal {
  background: #fff8f0;
  border-radius: 20px;
  max-width: 440px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,0.3);
  animation: modalIn 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: "DM Sans", sans-serif;
}
.special-modal img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}
.special-modal-body {
  padding: 24px 28px 28px;
}
.special-ribbon {
  display: inline-block;
  background: linear-gradient(135deg, #d9b688, #b89060);
  color: #40220b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 100px;
  margin-bottom: 12px;
}

/* ---- SOCIAL TOOLTIP ---- */
.social-tooltip-msg {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  background: #40220b;
  color: #f5efe6;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-family: "DM Sans", sans-serif;
  z-index: 9999;
  box-shadow: 0 8px 28px rgba(0,0,0,0.25);
  animation: toastIn 0.4s ease forwards;
  pointer-events: none;
}

/* ---- WISHLIST HEART ---- */
.card-wishlist {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: transform 0.2s;
  z-index: 5;
}
.card-wishlist:hover { transform: scale(1.1); }
.card-wishlist.wishlisted { animation: heartbeat 0.3s ease; }

/* ---- CART INDICATOR ---- */
.cart-indicator {
  position: fixed;
  bottom: 90px;
  right: 28px;
  background: #40220b;
  color: #f5efe6;
  border-radius: 14px;
  padding: 12px 18px;
  font-family: "DM Sans", sans-serif;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 8px 28px rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.3s;
  z-index: 1000;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
}
.cart-indicator.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.cart-badge {
  background: #d9b688;
  color: #40220b;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

/* ---- CART MODAL ---- */
.cart-modal {
  background: #fff8f0;
  border-radius: 20px;
  max-width: 480px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 30px 80px rgba(0,0,0,0.3);
  animation: modalIn 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: "DM Sans", sans-serif;
}
.cart-header {
  padding: 24px 28px 20px;
  border-bottom: 1px solid rgba(64,34,11,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cart-header h3 {
  font-family: "Playfair Display", serif;
  font-size: 22px;
  color: #40220b;
}
.cart-header span {
  font-size: 13px;
  color: rgba(64,34,11,0.5);
}
.cart-items { padding: 16px 28px; }
.cart-item {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(64,34,11,0.07);
}
.cart-item:last-child { border-bottom: none; }
.cart-item-img {
  width: 54px;
  height: 54px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
}
.cart-item-info { flex: 1; }
.cart-item-name { font-weight: 600; font-size: 14px; color: #40220b; margin-bottom: 3px; }
.cart-item-price { font-size: 13px; color: #b89060; }
.cart-item-remove {
  background: none;
  border: none;
  color: rgba(64,34,11,0.35);
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}
.cart-item-remove:hover { color: #e05050; background: rgba(224,80,80,0.08); }
.cart-item-qty-ctrl {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1.5px solid rgba(64,34,11,0.15);
  border-radius: 8px;
  overflow: hidden;
}
.cart-item-qty-ctrl button {
  background: none;
  border: none;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 15px;
  color: #40220b;
  transition: background 0.2s;
}
.cart-item-qty-ctrl button:hover { background: #f5efe6; }
.cart-item-qty-val {
  width: 32px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #40220b;
  border-left: 1.5px solid rgba(64,34,11,0.15);
  border-right: 1.5px solid rgba(64,34,11,0.15);
  padding: 4px 0;
  background: #fff8f0;
}
.cart-footer {
  padding: 20px 28px;
  border-top: 1px solid rgba(64,34,11,0.1);
}
.cart-total-row {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 700;
  color: #40220b;
  margin-bottom: 16px;
}
.btn-cart-checkout {
  width: 100%;
  height: 50px;
  background: #40220b;
  color: #f5efe6;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  font-family: "DM Sans", sans-serif;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 8px;
}
.btn-cart-checkout:hover { background: #5c3415; }
.btn-cart-close {
  width: 100%;
  height: 40px;
  background: none;
  border: 1.5px solid rgba(64,34,11,0.2);
  border-radius: 10px;
  font-size: 13px;
  color: rgba(64,34,11,0.6);
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  transition: all 0.2s;
}
.btn-cart-close:hover { border-color: #40220b; color: #40220b; }
.cart-empty {
  padding: 40px 28px;
  text-align: center;
  color: rgba(64,34,11,0.4);
  font-size: 14px;
}
.cart-empty .cart-empty-icon { font-size: 40px; margin-bottom: 12px; display: block; }
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
   TOAST SYSTEM
   ============================================= */
const toastContainer = document.createElement("div");
toastContainer.className = "lc-toast-container";
document.body.appendChild(toastContainer);

function showToast(icon, message, duration = 3200) {
    const toast = document.createElement("div");
    toast.className = "lc-toast";
    toast.innerHTML = `<span class="lc-toast-icon">${icon}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("out");
        setTimeout(() => toast.remove(), 350);
    }, duration);
}


/* =============================================
   MODAL SYSTEM
   ============================================= */
function openModal(contentEl) {
    // Instantly nuke every existing overlay — no async, no orphans
    document.querySelectorAll(".lc-overlay").forEach(el => el.remove());
    document.body.style.overflow = "hidden";

    const overlay = document.createElement("div");
    overlay.className = "lc-overlay";

    const wrapper = document.createElement("div");
    wrapper.style.cssText = "position: relative; width: 100%; max-width: " + (contentEl.dataset.maxWidth || "500px");
    wrapper.appendChild(contentEl);
    overlay.appendChild(wrapper);

    overlay.addEventListener("click", e => {
        if (e.target === overlay) closeModal();
    });

    document.body.appendChild(overlay);
}

function closeModal() {
    // Remove ALL overlays synchronously — guaranteed clean slate
    document.querySelectorAll(".lc-overlay").forEach(el => {
        el.classList.add("closing");
        // Use a cloned reference so the timeout is always targeting the right element
        const ref = el;
        setTimeout(() => { ref.remove(); }, 250);
    });
    document.body.style.overflow = "";
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
});


/* =============================================
   CART STATE
   ============================================= */
let cart = [];

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartIndicator() {
    const indicator = document.getElementById("lcCartIndicator");
    if (!indicator) return;
    const count = getCartCount();
    if (count > 0) {
        indicator.classList.add("show");
        indicator.querySelector(".cart-badge").textContent = count;
        indicator.querySelector(".cart-label").textContent = `$${getCartTotal().toFixed(2)}`;
    } else {
        indicator.classList.remove("show");
    }
}

function addToCart(item) {
    const existing = cart.find(c => c.name === item.name);
    if (existing) {
        existing.qty += item.qty;
    } else {
        cart.push({ ...item });
    }
    updateCartIndicator();
}

function removeFromCart(name) {
    cart = cart.filter(c => c.name !== name);
    updateCartIndicator();
}

function updateCartQty(name, delta) {
    const item = cart.find(c => c.name === name);
    if (item) {
        item.qty = Math.max(1, item.qty + delta);
    }
    updateCartIndicator();
}

// Create cart indicator button
const cartIndicator = document.createElement("div");
cartIndicator.id = "lcCartIndicator";
cartIndicator.className = "cart-indicator";
cartIndicator.innerHTML = `
  <span style="font-size:18px">🛒</span>
  <span class="cart-label">$0.00</span>
  <span class="cart-badge">0</span>
`;
cartIndicator.addEventListener("click", openCartModal);
document.body.appendChild(cartIndicator);


/* =============================================
   CART MODAL
   ============================================= */
function openCartModal() {
    const modal = document.createElement("div");
    modal.className = "cart-modal";

    if (cart.length === 0) {
        modal.innerHTML = `
      <div class="cart-header">
        <h3>Your Order</h3>
        <span>Logan'sCafe</span>
      </div>
      <div class="cart-empty">
        <span class="cart-empty-icon">☕</span>
        Your cart is empty.<br>Add something delicious!
      </div>
      <div class="cart-footer">
        <button class="btn-cart-close" onclick="closeModal()">Close</button>
      </div>
    `;
    } else {
        const itemsHtml = cart.map(item => `
      <div class="cart-item" data-name="${item.name}">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        </div>
        <div class="cart-item-qty-ctrl">
          <button onclick="updateCartQty('${item.name}', -1); refreshCartModal()">−</button>
          <span class="cart-item-qty-val">${item.qty}</span>
          <button onclick="updateCartQty('${item.name}', 1); refreshCartModal()">+</button>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.name}'); refreshCartModal()" title="Remove">✕</button>
      </div>
    `).join("");

        modal.innerHTML = `
      <div class="cart-header">
        <h3>Your Order</h3>
        <span>${getCartCount()} item${getCartCount() !== 1 ? 's' : ''}</span>
      </div>
      <div class="cart-items">${itemsHtml}</div>
      <div class="cart-footer">
        <div class="cart-total-row">
          <span>Total</span>
          <span>$${getCartTotal().toFixed(2)}</span>
        </div>
        <button class="btn-cart-checkout" onclick="openCheckoutFromCart()">Proceed to Checkout</button>
        <button class="btn-cart-close" onclick="closeModal()">Continue Browsing</button>
      </div>
    `;
    }

    openModal(modal);
}

window.refreshCartModal = function() {
    updateCartIndicator();
    openCartModal();
};

window.openCheckoutFromCart = function() {
    if (cart.length === 0) return;
    closeModal();
    setTimeout(() => {
        const firstItem = cart[0];
        openCardForm({
            name: cart.length === 1 ? firstItem.name : `${cart.length} items`,
            price: getCartTotal(),
            qty: 1,
            tag: "Your Order"
        }, null);
    }, 300);
};


/* =============================================
   ORDER MODAL
   ============================================= */
function getMenuItemData(btn) {
    const card = btn.closest(".card");
    if (!card) return null;

    const img = card.querySelector("img")?.src || "";
    const name = card.querySelector("h3")?.textContent || "Item";
    const priceText = card.querySelector(".price")?.textContent || "$0.00";
    const price = parseFloat(priceText.replace("$", "")) || 0;
    const desc = card.querySelector("p")?.textContent || "";
    const tag = card.querySelector(".card-tag")?.textContent || "";

    return { img, name, price, desc, tag };
}

function openOrderModal(item) {
    let qty = 1;

    const modal = document.createElement("div");
    modal.className = "order-modal";
    modal.style.position = "relative";

    function render() {
        modal.innerHTML = `
      <button class="modal-close-x" onclick="closeModal()">✕</button>
      <img class="order-modal-img" src="${item.img}" alt="${item.name}">
      <div class="order-modal-body">
        <div class="order-modal-tag">${item.tag}</div>
        <div class="order-modal-name">${item.name}</div>
        <div class="order-modal-price">$${item.price.toFixed(2)}</div>
        <div class="order-modal-desc">${item.desc}</div>
        <div class="order-modal-qty">
          <label>Quantity</label>
          <div class="qty-ctrl">
            <button id="qtyMinus">−</button>
            <span class="qty-val" id="qtyVal">${qty}</span>
            <button id="qtyPlus">+</button>
          </div>
          <span class="order-modal-total">Total: <strong>$${(item.price * qty).toFixed(2)}</strong></span>
        </div>
        <div class="order-modal-actions">
          <button class="btn-paypal" id="btnPaypal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19.5 6.5c.5 2.5-1 5-4 5.5H13l-1 6H9l.5-3H7L9 5h6.5c2 0 3.5.8 4 1.5z" fill="#003087"/><path d="M16.5 4C17 6.5 15.5 9 12.5 9.5H10l-1 6H6l.5-3H4L6 2h6.5c2 0 3.5.8 4 2z" fill="#009cde"/></svg>
            Pay with PayPal
          </button>
          <button class="btn-card" id="btnCard">
            💳 Pay with Card
          </button>
          <button class="btn-modal-close" onclick="closeModal()">Cancel</button>
        </div>
      </div>
    `;

        modal.querySelector("#qtyMinus").addEventListener("click", () => {
            qty = Math.max(1, qty - 1);
            render();
        });
        modal.querySelector("#qtyPlus").addEventListener("click", () => {
            qty = Math.min(10, qty + 1);
            render();
        });
        modal.querySelector("#btnPaypal").addEventListener("click", () => {
            showToast("🅿️", "PayPal integration coming soon! Redirecting you to PayPal...");
            closeModal();
        });
        modal.querySelector("#btnCard").addEventListener("click", () => {
            closeModal();
            setTimeout(() => openCardForm(item, qty), 300);
        });
    }

    render();
    openModal(modal);
}


/* =============================================
   CARD PAYMENT FORM
   ============================================= */
function openCardForm(item, qty) {
    const total = qty ? (item.price * qty).toFixed(2) : item.price.toFixed(2);
    const displayName = qty > 1 ? `${item.name} ×${qty}` : item.name;

    const formEl = document.createElement("div");
    formEl.className = "card-form";
    formEl.innerHTML = `
    <h3>Card Details</h3>
    <p class="cf-sub">Your information is never stored or processed.</p>
    <div class="cf-order-summary">
      <span>${displayName}</span>
      <strong>$${total}</strong>
    </div>
    <div class="cf-card-icons">
      <div class="cf-card-icon">VISA</div>
      <div class="cf-card-icon">MC</div>
      <div class="cf-card-icon">AMEX</div>
      <div class="cf-card-icon">DISC</div>
    </div>
    <label class="cf-label">Cardholder Name</label>
    <input class="cf-input" id="cfName" type="text" placeholder="Jane Doe" autocomplete="cc-name">
    <label class="cf-label">Card Number</label>
    <input class="cf-input" id="cfNumber" type="text" placeholder="1234 5678 9012 3456" maxlength="19" autocomplete="cc-number" inputmode="numeric">
    <div class="cf-row">
      <div>
        <label class="cf-label">Expiry Date</label>
        <input class="cf-input" id="cfExpiry" type="text" placeholder="MM / YY" maxlength="7" autocomplete="cc-exp">
      </div>
      <div>
        <label class="cf-label">CVV</label>
        <input class="cf-input" id="cfCvv" type="text" placeholder="123" maxlength="4" autocomplete="cc-csc" inputmode="numeric">
      </div>
    </div>
    <button class="cf-submit" id="cfSubmit">
      🔒 Pay $${total}
    </button>
    <button class="cf-back" onclick="closeModal()">← Go Back</button>
    <div class="secure-badge">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      Secured with 256-bit SSL encryption
    </div>
  `;

    // Card number formatting
    const cfNumber = formEl.querySelector("#cfNumber");
    cfNumber.addEventListener("input", e => {
        let val = e.target.value.replace(/\D/g, "").slice(0, 16);
        e.target.value = val.replace(/(.{4})/g, "$1 ").trim();
    });

    // Expiry formatting
    const cfExpiry = formEl.querySelector("#cfExpiry");
    cfExpiry.addEventListener("input", e => {
        let val = e.target.value.replace(/\D/g, "").slice(0, 4);
        if (val.length >= 3) val = val.slice(0, 2) + " / " + val.slice(2);
        e.target.value = val;
    });

    // CVV numeric only
    const cfCvv = formEl.querySelector("#cfCvv");
    cfCvv.addEventListener("input", e => {
        e.target.value = e.target.value.replace(/\D/g, "");
    });

    // Submit
    formEl.querySelector("#cfSubmit").addEventListener("click", () => {
        const name = formEl.querySelector("#cfName").value.trim();
        const number = cfNumber.value.replace(/\s/g, "");
        const expiry = cfExpiry.value;
        const cvv = cfCvv.value;

        let valid = true;

        [["#cfName", !name], ["#cfNumber", number.length < 16], ["#cfExpiry", expiry.length < 7], ["#cfCvv", cvv.length < 3]].forEach(([sel, err]) => {
            const el = formEl.querySelector(sel);
            el.classList.toggle("error", err);
            if (err) valid = false;
        });

        if (!valid) return;

        const btn = formEl.querySelector("#cfSubmit");
        btn.innerHTML = `<span style="width:18px;height:18px;border:2px solid rgba(245,239,230,0.4);border-top-color:#f5efe6;border-radius:50%;display:inline-block;animation:spin 0.7s linear infinite"></span> Processing...`;
        btn.disabled = true;

        setTimeout(() => {
            closeModal();
            // Add to cart tracking
            if (qty) {
                addToCart({ name: item.name, price: item.price, qty, img: item.img || "" });
            }
            showToast("✅", `Order placed! ${displayName} — $${total}. Thank you!`, 4000);
        }, 2000);
    });

    openModal(formEl);
}


/* =============================================
   ATTACH ORDER BUTTONS
   ============================================= */
document.querySelectorAll(".card .dy-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        const item = getMenuItemData(this);
        if (item) {
            openOrderModal(item);
        }
    });
});


/* =============================================
   ADD WISHLIST HEARTS TO CARDS
   ============================================= */
const wishlist = new Set();

document.querySelectorAll(".card").forEach(card => {
    const imgWrap = card.querySelector(".card-img-wrap");
    if (!imgWrap) return;

    const heart = document.createElement("button");
    heart.className = "card-wishlist";
    heart.innerHTML = "♡";
    heart.title = "Add to wishlist";
    heart.setAttribute("aria-label", "Add to wishlist");

    const name = card.querySelector("h3")?.textContent || "";

    heart.addEventListener("click", e => {
        e.stopPropagation();
        if (wishlist.has(name)) {
            wishlist.delete(name);
            heart.innerHTML = "♡";
            heart.classList.remove("wishlisted");
            heart.style.color = "";
            showToast("💔", `Removed ${name} from wishlist`);
        } else {
            wishlist.add(name);
            heart.innerHTML = "♥";
            heart.classList.add("wishlisted");
            heart.style.color = "#e05050";
            showToast("❤️", `Added ${name} to your wishlist!`);
        }
    });

    imgWrap.style.position = "relative";
    imgWrap.appendChild(heart);
});


/* =============================================
   VIEW FULL MENU LINK
   ============================================= */
const viewAllLink = document.querySelector(".view-all-link");
if (viewAllLink) {
    viewAllLink.addEventListener("click", e => {
        e.preventDefault();
        const modal = document.createElement("div");
        modal.className = "generic-modal";
        modal.innerHTML = `
      <span class="gm-icon">📋</span>
      <h3>Full Menu Coming Soon</h3>
      <p>We're putting the finishing touches on our complete menu — seasonal specials, daily roasts, and more. Check back soon!</p>
      <button class="gm-close" onclick="closeModal()">Got it</button>
    `;
        openModal(modal);
    });
}


/* =============================================
   HERO FLOAT CARD — TODAY'S SPECIAL
   ============================================= */
const heroFloatCard = document.querySelector(".hero-float-card");
if (heroFloatCard) {
    heroFloatCard.style.cursor = "pointer";
    heroFloatCard.title = "View today's special";
    heroFloatCard.addEventListener("click", () => {
        const modal = document.createElement("div");
        modal.className = "special-modal";
        modal.style.position = "relative";
        modal.innerHTML = `
      <button class="modal-close-x" onclick="closeModal()">✕</button>
      <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&auto=format&fit=crop" alt="Vanilla Cloud Latte">
      <div class="special-modal-body">
        <span class="special-ribbon">☀️ Today's Special</span>
        <div class="order-modal-name">Vanilla Cloud Latte</div>
        <div class="order-modal-price">$5.50</div>
        <div class="order-modal-desc">Our barista's creation of the day — a velvety espresso base crowned with house-made vanilla cloud foam. Sweet, airy, and unforgettable. Available today only.</div>
        <div class="order-modal-actions" style="margin-top: 0">
          <button class="btn-card" onclick="closeModal(); setTimeout(() => openOrderModal({img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80', name: 'Vanilla Cloud Latte', price: 5.50, desc: 'A velvety espresso base crowned with house-made vanilla cloud foam. Sweet, airy, and unforgettable.', tag: 'Today\\'s Special'}), 300)">Order Now — $5.50</button>
          <button class="btn-modal-close" onclick="closeModal()">Maybe Later</button>
        </div>
      </div>
    `;
        openModal(modal);
    });
}


/* =============================================
   ABOUT — MEET THE TEAM BUTTON
   ============================================= */
const meetTeamBtn = document.querySelector(".about .dy-btn");
if (meetTeamBtn) {
    meetTeamBtn.addEventListener("click", () => {
        const modal = document.createElement("div");
        modal.className = "team-modal";

        const members = [
            { initials: "L", name: "Logan", role: "Founder & Head Barista", color: "#40220b" },
            { initials: "S", name: "Sofia", role: "Pastry Chef", color: "#7a4520" },
            { initials: "M", name: "Marcus", role: "Senior Barista", color: "#b89060" },
            { initials: "A", name: "Aisha", role: "Cafe Manager", color: "#5c3415" },
            { initials: "J", name: "Jamie", role: "Roast Master", color: "#8c5530" },
            { initials: "R", name: "Rosa", role: "Front of House", color: "#d9b688" },
        ];

        const membersHtml = members.map(m => `
      <div class="team-member">
        <div class="team-avatar" style="background:${m.color}">${m.initials}</div>
        <h4>${m.name}</h4>
        <span>${m.role}</span>
      </div>
    `).join("");

        modal.innerHTML = `
      <div class="team-header">
        <h3>Meet Our Team</h3>
        <p>The people behind every perfect cup</p>
      </div>
      <div class="team-grid">${membersHtml}</div>
      <button class="team-close-btn" onclick="closeModal()">Close</button>
    `;
        openModal(modal);
    });
}


/* =============================================
   GALLERY STRIP — LIGHTBOX
   ============================================= */
const galleryImgs = document.querySelectorAll(".gallery-strip img");
const galleryData = [];

galleryImgs.forEach((img, i) => {
    galleryData.push({ src: img.src, alt: img.alt });
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openLightbox(i));
});

let lightboxIndex = 0;

function openLightbox(index) {
    lightboxIndex = index;
    const { src, alt } = galleryData[lightboxIndex];

    const modal = document.createElement("div");
    modal.className = "lightbox-modal";
    modal.id = "lightboxModal";
    modal.innerHTML = `
    <img class="lightbox-img" src="${src}" alt="${alt}">
    <div class="lightbox-caption">${alt}</div>
  `;

    const overlay = document.createElement("div");
    overlay.className = "lc-overlay";
    overlay.style.background = "rgba(10, 5, 1, 0.92)";
    overlay.appendChild(modal);

    const closeBtn = document.createElement("button");
    closeBtn.className = "lightbox-close";
    closeBtn.textContent = "✕";
    closeBtn.onclick = closeModal;

    const prevBtn = document.createElement("button");
    prevBtn.className = "lightbox-nav lightbox-prev";
    prevBtn.innerHTML = "‹";
    prevBtn.onclick = () => navigateLightbox(-1);

    const nextBtn = document.createElement("button");
    nextBtn.className = "lightbox-nav lightbox-next";
    nextBtn.innerHTML = "›";
    nextBtn.onclick = () => navigateLightbox(1);

    overlay.appendChild(closeBtn);
    if (galleryData.length > 1) {
        overlay.appendChild(prevBtn);
        overlay.appendChild(nextBtn);
    }

    overlay.addEventListener("click", e => {
        if (e.target === overlay) closeModal();
    });

    // Remove any existing overlays first, then append
    document.querySelectorAll(".lc-overlay").forEach(el => el.remove());
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
}

function navigateLightbox(dir) {
    lightboxIndex = (lightboxIndex + dir + galleryData.length) % galleryData.length;
    const modal = document.getElementById("lightboxModal");
    if (!modal) return;
    const { src, alt } = galleryData[lightboxIndex];
    modal.querySelector(".lightbox-img").src = src;
    modal.querySelector(".lightbox-caption").textContent = alt;
}

document.addEventListener("keydown", e => {
    if (!document.querySelector(".lc-overlay")) return;
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
});


/* =============================================
   CTA — FIND US (MAP MODAL)
   ============================================= */
const ctaFindUsBtn = document.querySelector(".cta-actions .dy-btn");
if (ctaFindUsBtn) {
    ctaFindUsBtn.addEventListener("click", () => {
        const modal = document.createElement("div");
        modal.className = "map-modal";
        modal.innerHTML = `
      <div class="map-embed">
        <div class="map-pin"></div>
      </div>
      <div class="map-body">
        <h3>Find Logan'sCafe</h3>
        <div class="map-info-row">
          <span class="map-info-icon">📍</span>
          <div>
            <strong>Address</strong>
            123 Roast Lane, Brew District<br>City Centre, CA 90210
          </div>
        </div>
        <div class="map-info-row">
          <span class="map-info-icon">🕐</span>
          <div>
            <strong>Hours Today</strong>
            ${getHoursForToday()}
          </div>
        </div>
        <div class="map-info-row">
          <span class="map-info-icon">📞</span>
          <div>
            <strong>Phone</strong>
            +1 (555) 092-CAFE
          </div>
        </div>
        <div class="map-actions">
          <button class="btn-directions" onclick="showToast('🗺️', 'Opening directions in your maps app...'); closeModal();">Get Directions</button>
          <button class="btn-map-close" onclick="closeModal()">Close</button>
        </div>
      </div>
    `;
        openModal(modal);
    });
}

function getHoursForToday() {
    const day = new Date().getDay();
    if (day === 0) return "9:00am – 7:00pm";
    if (day === 6) return "8:00am – 9:00pm";
    return "7:00am – 9:00pm";
}


/* =============================================
   EMAIL LINK (CTA)
   ============================================= */
const ctaEmail = document.querySelector(".cta-email");
if (ctaEmail) {
    ctaEmail.addEventListener("click", e => {
        e.preventDefault();
        showToast("📧", "Opening your mail client...");
        setTimeout(() => {
            window.location.href = "mailto:hello@loganscafe.com";
        }, 600);
    });
}


/* =============================================
   LOYALTY REWARDS (Services section)
   ============================================= */
const loyaltySCard = document.querySelectorAll(".s-card-content");
loyaltySCard.forEach(card => {
    const heading = card.querySelector("h3");
    if (heading && heading.textContent.includes("Loyalty")) {
        card.style.cursor = "pointer";
        card.addEventListener("click", openLoyaltyModal);
    }
});

function openLoyaltyModal() {
    const modal = document.createElement("div");
    modal.className = "loyalty-modal";

    const cupsEarned = 3;
    const cupsNeeded = 10;
    const progress = (cupsEarned / cupsNeeded) * 100;

    const cupsHtml = Array.from({ length: cupsNeeded }, (_, i) =>
        `<span class="loyalty-cup${i < cupsEarned ? " filled" : ""}">☕</span>`
    ).join("");

    modal.innerHTML = `
    <div class="loyalty-header">
      <div class="loyalty-cups">${cupsHtml}</div>
      <h3>Logan's Loyalty Club</h3>
      <p>Earn a free drink every 10 cups</p>
    </div>
    <div class="loyalty-body">
      <div style="font-size:13px; opacity:0.7; margin-bottom:4px">Your progress</div>
      <div class="loyalty-progress-bar">
        <div class="loyalty-progress-fill" id="loyaltyBar"></div>
      </div>
      <div class="loyalty-status">${cupsEarned} / ${cupsNeeded} cups — ${cupsNeeded - cupsEarned} more for a free drink!</div>
      <ul class="loyalty-perk-list">
        <li>Free drink every 10th cup</li>
        <li>Early access to seasonal specials</li>
        <li>Birthday surprise from us 🎂</li>
        <li>Members-only monthly discount</li>
        <li>Priority pre-ordering</li>
      </ul>
      <button class="btn-loyalty-join" onclick="closeModal(); showToast('⭐', 'Welcome to the Loyalty Club! Your card is activated.')">Join Now — It\'s Free!</button>
      <button class="btn-loyalty-close" onclick="closeModal()">Maybe Later</button>
    </div>
  `;

    openModal(modal);

    setTimeout(() => {
        const bar = document.getElementById("loyaltyBar");
        if (bar) bar.style.width = progress + "%";
    }, 400);
}


/* =============================================
   SOCIAL LINKS — SHARE FEEDBACK
   ============================================= */
const socialLinks = document.querySelectorAll(".socials a");
const socialNames = { 0: "Instagram", 1: "Twitter / X", 2: "Facebook", 3: "LinkedIn" };

socialLinks.forEach((link, i) => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const name = socialNames[i % 4] || "our social";
        showToast("🔗", `Following us on ${name}! (Links live soon)`);
    });
});


/* =============================================
   HERO — ORDER NOW & EXPLORE BUTTONS
   ============================================= */
const heroOrderBtn = document.querySelector(".hero-actions .dy-btn");
if (heroOrderBtn) {
    heroOrderBtn.addEventListener("click", () => {
        document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
        setTimeout(() => showToast("☕", "Scroll down to see our full menu!"), 600);
    });
}


/* =============================================
   NAV — ORDER NOW BUTTON
   ============================================= */
const navOrderBtn = document.querySelector(".nav-btn .dy-btn");
if (navOrderBtn) {
    navOrderBtn.addEventListener("click", e => {
        e.preventDefault();
        document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    });
}


/* =============================================
   NEWSLETTER FORM
   ============================================= */
const newsletterBtn = document.querySelector(".newsletter-submit");
const newsletterInput = document.querySelector(".newsletter-input");

if (newsletterBtn) {
    newsletterBtn.addEventListener("click", () => {
        const email = newsletterInput.value.trim();
        if (!email || !email.includes("@")) {
            newsletterInput.style.borderColor = "#e05050";
            newsletterInput.style.animation = "shake 0.3s ease";
            newsletterInput.focus();
            setTimeout(() => newsletterInput.style.animation = "", 400);
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
        showToast("📬", `You're subscribed! Check ${email} for a welcome email.`, 4000);
    });

    newsletterInput.addEventListener("keydown", e => {
        if (e.key === "Enter") newsletterBtn.click();
    });
}


/* =============================================
   PROCESS STEPS — CLICK INTERACTION
   ============================================= */
document.querySelectorAll(".process-step, .step").forEach(step => {
    step.style.cursor = "pointer";
    step.addEventListener("click", () => {
        step.style.transform = "scale(0.97)";
        setTimeout(() => step.style.transform = "", 200);
    });
});


/* =============================================
   TESTIMONIALS — CLICK TO RATE
   ============================================= */
document.querySelectorAll(".testimonial-card").forEach(card => {
    const stars = card.querySelector(".stars");
    if (!stars) return;
    stars.style.cursor = "pointer";
    stars.title = "Click to react";
    stars.addEventListener("click", () => {
        showToast("⭐", "Thanks for loving this review!");
        stars.style.animation = "heartbeat 0.3s ease";
        setTimeout(() => stars.style.animation = "", 400);
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


/* =============================================
   FOOTER LINKS
   ============================================= */
document.querySelectorAll("footer .footer-col ul li a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


/* =============================================
   EXPOSE GLOBALS FOR INLINE HANDLERS
   ============================================= */
window.closeModal = closeModal;
window.openOrderModal = openOrderModal;
window.openCardForm = openCardForm;
window.openLightbox = openLightbox;
window.showToast = showToast;
window.updateCartQty = updateCartQty;
window.removeFromCart = removeFromCart;
