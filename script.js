window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("pageLoader");
        if (loader) loader.classList.add("hidden");
    }, 1500);
});

const header = document.querySelector("header");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 60);
    backToTop.classList.toggle("visible", window.scrollY > 400);
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id], div[id]");
    const navLinks = document.querySelectorAll("nav ul li a");
    let current = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute("id");
    });
    navLinks.forEach(link => {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === `#${current}`) link.classList.add("active-link");
    });
}

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

const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".fade").forEach(el => fadeObserver.observe(el));

const tabBtns = document.querySelectorAll(".tab-btn");
const menuCards = document.querySelectorAll(".card");
const wishlist = new Set();

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const tab = btn.dataset.tab;
        let visibleCount = 0;
        menuCards.forEach(card => {
            const name = card.querySelector("h3")?.textContent || "";
            const show = tab === "all" || card.dataset.category === tab || (tab === "favourites" && wishlist.has(name));
            if (show) {
                card.classList.remove("hidden");
                card.style.animation = "none";
                requestAnimationFrame(() => { card.style.animation = "cardReveal 0.45s ease forwards"; });
                visibleCount++;
            } else {
                card.classList.add("hidden");
            }
        });

        const cardsGrid = document.querySelector(".cards");
        const existing = document.getElementById("menuEmpty");
        if (existing) existing.remove();

        if (visibleCount === 0 && cardsGrid) {
            const empty = document.createElement("div");
            empty.id = "menuEmpty";
            empty.className = "menu-empty";
            empty.innerHTML = `
                <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-empty-icon">
                    <circle cx="40" cy="40" r="38" stroke="#d9b688" stroke-width="2" stroke-dasharray="6 4" opacity="0.4"/>
                    <path d="M26 52 C26 44 30 38 40 36 C50 38 54 44 54 52" stroke="#b89060" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M30 52 Q32 56 40 57 Q48 56 50 52" stroke="#b89060" stroke-width="2" stroke-linecap="round" fill="none"/>
                    <path d="M54 44 Q60 42 60 47 Q60 52 54 50" stroke="#b89060" stroke-width="2" stroke-linecap="round" fill="none"/>
                    <path d="M36 30 L34 26 M40 29 L40 25 M44 30 L46 26" stroke="#d9b688" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
                    <circle cx="35" cy="44" r="1.5" fill="#b89060" opacity="0.6"/>
                    <circle cx="40" cy="43" r="1.5" fill="#b89060" opacity="0.6"/>
                    <circle cx="45" cy="44" r="1.5" fill="#b89060" opacity="0.6"/>
                    <path d="M33 34 Q35 31 37 34" stroke="#c0392b" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
                    <path d="M37 34 Q39 31 41 34" stroke="#c0392b" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
                    <line x1="20" y1="62" x2="60" y2="62" stroke="#d9b688" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
                </svg>
                <p class="menu-empty-title">Nothing here for now</p>
                <p class="menu-empty-sub">This section is still being brewed — check back soon!</p>
            `;
            cardsGrid.appendChild(empty);
        }

        if (tab === "favourites" && wishlist.size === 0) {
            showToast("♡", "No favourites yet — heart some items first!");
        }
    });
});

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

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); }
    });
}, { threshold: 0.5 });

document.querySelectorAll(".counter").forEach(el => counterObserver.observe(el));

backToTop.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); });

const toastContainer = document.getElementById("toastContainer");

function dismissToast(toast) {
    toast.classList.add("out");
    setTimeout(() => toast.remove(), 350);
}

function showToast(icon, message, duration = 3200) {
    const toast = document.createElement("div");
    toast.className = "lc-toast";
    toast.innerHTML = `<span class="lc-toast-icon">${icon}</span><span>${message}</span><button class="lc-toast-close" aria-label="Dismiss">✕</button>`;
    toast.querySelector(".lc-toast-close").addEventListener("click", () => dismissToast(toast));
    toastContainer.appendChild(toast);
    const timer = setTimeout(() => dismissToast(toast), duration);
    toast.querySelector(".lc-toast-close").addEventListener("click", () => clearTimeout(timer), { once: true });
}

function openModal(contentEl) {
    document.querySelectorAll(".lc-overlay").forEach(el => el.remove());
    document.body.style.overflow = "hidden";
    const overlay = document.createElement("div");
    overlay.className = "lc-overlay";
    const wrapper = document.createElement("div");
    wrapper.style.cssText = "position:relative;width:100%;max-width:" + (contentEl.dataset.maxWidth || "500px");
    wrapper.appendChild(contentEl);
    overlay.appendChild(wrapper);
    overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
    document.body.appendChild(overlay);
}

function closeModal() {
    document.querySelectorAll(".lc-overlay").forEach(el => {
        el.classList.add("closing");
        const ref = el;
        setTimeout(() => ref.remove(), 250);
    });
    document.body.style.overflow = "";
}

document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

let cart = [];

function getCartTotal() { return cart.reduce((sum, item) => sum + item.price * item.qty, 0); }
function getCartCount() { return cart.reduce((sum, item) => sum + item.qty, 0); }

function addToCart(item) {
    const existing = cart.find(c => c.name === item.name);
    if (existing) { existing.qty += item.qty; } else { cart.push({ ...item }); }
    updateCartBtn();
}

function removeFromCart(name) { cart = cart.filter(c => c.name !== name); updateCartBtn(); }

function updateCartItemQty(name, delta) {
    const item = cart.find(c => c.name === name);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    updateCartBtn();
}

function clearCart() { cart = []; updateCartBtn(); }

function updateCartBtn() {
    const btn = document.getElementById("cartFloatBtn");
    if (!btn) return;
    btn.querySelector(".cart-count").textContent = getCartCount();
    btn.classList.add("bump");
    setTimeout(() => btn.classList.remove("bump"), 400);
}

document.getElementById("cartFloatBtn").addEventListener("click", openCartModal);

function openCartModal() {
    const modal = document.createElement("div");
    modal.className = "cart-modal";

    if (cart.length === 0) {
        modal.innerHTML = `
            <div class="cart-header"><h3>Your Order</h3><span>Logan'sCafe</span></div>
            <div class="cart-empty"><span class="cart-empty-icon">☕</span>Nothing here yet — add something delicious!</div>
            <div class="cart-footer"><button class="btn-cart-close" onclick="closeModal()">Close</button></div>
        `;
    } else {
        const count = getCartCount();
        const itemsHtml = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
                </div>
                <div class="cart-item-qty-ctrl">
                    <button onclick="updateCartItemQty('${item.name}', -1); refreshCartModal()">−</button>
                    <span class="cart-item-qty-val">${item.qty}</span>
                    <button onclick="updateCartItemQty('${item.name}', 1); refreshCartModal()">+</button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.name}'); refreshCartModal()" title="Remove">✕</button>
            </div>
        `).join("");
        modal.innerHTML = `
            <div class="cart-header"><h3>Your Order</h3><span>${count} item${count !== 1 ? "s" : ""}</span></div>
            <div class="cart-items">${itemsHtml}</div>
            <div class="cart-footer">
                <div class="cart-total-row"><span>Total</span><span>$${getCartTotal().toFixed(2)}</span></div>
                <button class="btn-cart-checkout" onclick="checkoutFromCart()">Order All — $${getCartTotal().toFixed(2)}</button>
                <button class="btn-cart-close" onclick="closeModal()">Continue Browsing</button>
            </div>
        `;
    }
    openModal(modal);
}

window.refreshCartModal = function () { updateCartBtn(); openCartModal(); };

window.checkoutFromCart = function () {
    if (cart.length === 0) return;
    const label = cart.length === 1 ? cart[0].name : `${cart.length} items`;
    closeModal();
    setTimeout(() => { openCardForm({ name: label, price: getCartTotal(), img: cart[0].img || "" }, 1, true); }, 300);
};

function getMenuItemData(btn) {
    const card = btn.closest(".card");
    if (!card) return null;
    return {
        img: card.querySelector("img")?.src || "",
        name: card.querySelector("h3")?.textContent || "Item",
        price: parseFloat(card.querySelector(".price")?.textContent?.replace("$", "")) || 0,
        desc: card.querySelector("p")?.textContent || "",
        tag: card.querySelector(".card-tag")?.textContent || ""
    };
}

function openOrderModal(item) {
    let qty = 1;
    const modal = document.createElement("div");
    modal.className = "order-modal";

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
                    <span class="qty-val" id="qtyVal">1</span>
                    <button id="qtyPlus">+</button>
                </div>
                <span class="order-modal-total">Total: <strong id="qtyTotal">$${item.price.toFixed(2)}</strong></span>
            </div>
            <div class="order-modal-actions">
                <button class="btn-paypal" id="btnPaypal">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M19.5 6.5c.5 2.5-1 5-4 5.5H13l-1 6H9l.5-3H7L9 5h6.5c2 0 3.5.8 4 1.5z" fill="#003087"/>
                        <path d="M16.5 4C17 6.5 15.5 9 12.5 9.5H10l-1 6H6l.5-3H4L6 2h6.5c2 0 3.5.8 4 2z" fill="#009cde"/>
                    </svg>
                    Pay with PayPal
                </button>
                <button class="btn-card" id="btnCard">💳 Pay with Card</button>
                <button class="btn-modal-close" onclick="closeModal()">Cancel</button>
            </div>
        </div>
    `;

    function updateQty() {
        modal.querySelector("#qtyVal").textContent = qty;
        modal.querySelector("#qtyTotal").textContent = `$${(item.price * qty).toFixed(2)}`;
    }

    modal.querySelector("#qtyMinus").addEventListener("click", () => { qty = Math.max(1, qty - 1); updateQty(); });
    modal.querySelector("#qtyPlus").addEventListener("click", () => { qty = Math.min(10, qty + 1); updateQty(); });
    modal.querySelector("#btnPaypal").addEventListener("click", () => { showToast("🅿️", "PayPal integration coming soon!"); closeModal(); });
    modal.querySelector("#btnCard").addEventListener("click", () => { closeModal(); setTimeout(() => openCardForm(item, qty, false), 300); });

    openModal(modal);
}

function openCardForm(item, qty, isCartCheckout) {
    const total = (item.price * qty).toFixed(2);
    const label = qty > 1 && !isCartCheckout ? `${item.name} ×${qty}` : item.name;

    const formEl = document.createElement("div");
    formEl.className = "card-form";
    formEl.innerHTML = `
        <h3>Card Details</h3>
        <p class="cf-sub">Your information is never stored or processed.</p>
        <div class="cf-order-summary"><span>${label}</span><strong>$${total}</strong></div>
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
                <label class="cf-label">Expiry</label>
                <input class="cf-input" id="cfExpiry" type="text" placeholder="MM / YY" maxlength="7" autocomplete="cc-exp">
            </div>
            <div>
                <label class="cf-label">CVV</label>
                <input class="cf-input" id="cfCvv" type="text" placeholder="123" maxlength="4" autocomplete="cc-csc" inputmode="numeric">
            </div>
        </div>
        <button class="cf-submit" id="cfSubmit">🔒 Pay $${total}</button>
        <button class="cf-back" onclick="closeModal()">← Go Back</button>
        <div class="secure-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Secured with 256-bit SSL encryption
        </div>
    `;

    const cfNumber = formEl.querySelector("#cfNumber");
    cfNumber.addEventListener("input", e => {
        let val = e.target.value.replace(/\D/g, "").slice(0, 16);
        e.target.value = val.replace(/(.{4})/g, "$1 ").trim();
    });

    const cfExpiry = formEl.querySelector("#cfExpiry");
    cfExpiry.addEventListener("input", e => {
        let val = e.target.value.replace(/\D/g, "").slice(0, 4);
        if (val.length >= 3) val = val.slice(0, 2) + " / " + val.slice(2);
        e.target.value = val;
    });

    formEl.querySelector("#cfCvv").addEventListener("input", e => {
        e.target.value = e.target.value.replace(/\D/g, "");
    });

    formEl.querySelector("#cfSubmit").addEventListener("click", () => {
        const name = formEl.querySelector("#cfName").value.trim();
        const number = cfNumber.value.replace(/\s/g, "");
        const expiry = cfExpiry.value;
        const cvv = formEl.querySelector("#cfCvv").value;
        let valid = true;

        [["#cfName", !name], ["#cfNumber", number.length < 16], ["#cfExpiry", expiry.length < 7], ["#cfCvv", cvv.length < 3]].forEach(([sel, isErr]) => {
            const el = formEl.querySelector(sel);
            el.classList.toggle("error", isErr);
            if (isErr) valid = false;
        });

        if (!valid) return;

        const submitBtn = formEl.querySelector("#cfSubmit");
        submitBtn.innerHTML = `<span style="width:18px;height:18px;border:2px solid rgba(245,239,230,0.4);border-top-color:#f5efe6;border-radius:50%;display:inline-block;animation:spin 0.7s linear infinite"></span> Processing...`;
        submitBtn.disabled = true;

        setTimeout(() => {
            if (isCartCheckout) { clearCart(); } else { addToCart({ name: item.name, price: item.price, qty, img: item.img || "" }); }
            showOrderSuccess(label, total);
        }, 2000);
    });

    openModal(formEl);
}

function showOrderSuccess(label, total) {
    const ref = "LGN-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const modal = document.createElement("div");
    modal.className = "order-success";
    modal.innerHTML = `
        <div class="order-success-icon">✓</div>
        <h3>Order Placed!</h3>
        <p>Thanks for your order — <strong>${label}</strong> will be ready shortly.</p>
        <p>$${total} charged to your card.</p>
        <div class="order-success-ref">Ref: ${ref}</div>
        <button class="btn-success-close" onclick="closeModal()">Done</button>
    `;
    openModal(modal);
}

document.querySelectorAll(".card .dy-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const item = getMenuItemData(this);
        if (!item) return;
        addToCart({ name: item.name, price: item.price, qty: 1, img: item.img });
        showToast("🛒", `${item.name} added to your cart!`);
    });
});

document.querySelectorAll(".card").forEach(card => {
    const imgWrap = card.querySelector(".card-img-wrap");
    if (!imgWrap) return;
    const name = card.querySelector("h3")?.textContent || "";
    const heart = document.createElement("button");
    heart.className = "card-wishlist";
    heart.innerHTML = "♡";
    heart.setAttribute("aria-label", "Add to wishlist");
    heart.addEventListener("click", e => {
        e.stopPropagation();
        if (wishlist.has(name)) {
            wishlist.delete(name);
            heart.innerHTML = "♡";
            heart.classList.remove("wishlisted");
            heart.style.color = "";
            showToast("💔", `Removed ${name} from favourites`);
        } else {
            wishlist.add(name);
            heart.innerHTML = "♥";
            heart.classList.add("wishlisted");
            heart.style.color = "#e05050";
            showToast("❤️", `Added ${name} to favourites!`);
        }
        const activeTab = document.querySelector(".tab-btn.active")?.dataset.tab;
        if (activeTab === "favourites") {
            menuCards.forEach(card => {
                const cardName = card.querySelector("h3")?.textContent || "";
                if (wishlist.has(cardName)) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        }
    });
    imgWrap.style.position = "relative";
    imgWrap.appendChild(heart);
});

const viewAllLink = document.querySelector(".view-all-link");
if (viewAllLink) {
    viewAllLink.addEventListener("click", e => {
        e.preventDefault();
        const modal = document.createElement("div");
        modal.className = "generic-modal";
        modal.innerHTML = `
            <span class="gm-icon">📋</span>
            <h3>Full Menu Coming Soon</h3>
            <p>We're adding seasonal specials, daily roasts, and more. Check back soon!</p>
            <button class="gm-close" onclick="closeModal()">Got it</button>
        `;
        openModal(modal);
    });
}

const heroFloatCard = document.querySelector(".hero-float-card");
if (heroFloatCard) {
    heroFloatCard.style.cursor = "pointer";
    heroFloatCard.addEventListener("click", () => {
        const special = {
            img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&auto=format&fit=crop",
            name: "Vanilla Cloud Latte",
            price: 5.50,
            desc: "A velvety espresso base crowned with house-made vanilla cloud foam. Sweet, airy, and unforgettable. Available today only.",
            tag: "Today's Special"
        };
        const modal = document.createElement("div");
        modal.className = "special-modal";
        modal.innerHTML = `
            <button class="modal-close-x" onclick="closeModal()">✕</button>
            <img src="${special.img}" alt="${special.name}">
            <div class="special-modal-body">
                <span class="special-ribbon">☀️ Today's Special</span>
                <div class="order-modal-name">${special.name}</div>
                <div class="order-modal-price">$${special.price.toFixed(2)}</div>
                <div class="order-modal-desc">${special.desc}</div>
                <div class="order-modal-actions">
                    <button class="btn-card" id="specialOrderBtn">Order Now — $${special.price.toFixed(2)}</button>
                    <button class="btn-modal-close" onclick="closeModal()">Maybe Later</button>
                </div>
            </div>
        `;
        modal.querySelector("#specialOrderBtn").addEventListener("click", () => {
            closeModal();
            setTimeout(() => openOrderModal(special), 300);
        });
        openModal(modal);
    });
}

const meetTeamBtn = document.querySelector(".about .dy-btn");
if (meetTeamBtn) {
    meetTeamBtn.addEventListener("click", () => {
        const members = [
            { initials: "L", name: "Logan",  role: "Founder & Head Barista", color: "#40220b" },
            { initials: "S", name: "Sofia",  role: "Pastry Chef",            color: "#7a4520" },
            { initials: "M", name: "Marcus", role: "Senior Barista",         color: "#b89060" },
            { initials: "A", name: "Aisha",  role: "Cafe Manager",           color: "#5c3415" },
            { initials: "J", name: "Jamie",  role: "Roast Master",           color: "#8c5530" },
            { initials: "R", name: "Rosa",   role: "Front of House",         color: "#d9b688" },
        ];
        const membersHtml = members.map(m => `
            <div class="team-member">
                <div class="team-avatar" style="background:${m.color}">${m.initials}</div>
                <h4>${m.name}</h4>
                <span>${m.role}</span>
            </div>
        `).join("");
        const modal = document.createElement("div");
        modal.className = "team-modal";
        modal.innerHTML = `
            <div class="team-header"><h3>Meet Our Team</h3><p>The people behind every perfect cup</p></div>
            <div class="team-grid">${membersHtml}</div>
            <button class="team-close-btn" onclick="closeModal()">Close</button>
        `;
        openModal(modal);
    });
}

const galleryData = [];
let lightboxIndex = 0;

document.querySelectorAll(".gallery-strip img").forEach((img, i) => {
    galleryData.push({ src: img.src, alt: img.alt });
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openLightbox(i));
});

function openLightbox(index) {
    lightboxIndex = index;
    const { src, alt } = galleryData[index];
    const modal = document.createElement("div");
    modal.className = "lightbox-modal";
    modal.id = "lightboxModal";
    modal.innerHTML = `<img class="lightbox-img" src="${src}" alt="${alt}"><div class="lightbox-caption">${alt}</div>`;

    const overlay = document.createElement("div");
    overlay.className = "lc-overlay";
    overlay.style.background = "rgba(10, 5, 1, 0.92)";
    overlay.appendChild(modal);

    const closeBtn = document.createElement("button");
    closeBtn.className = "lightbox-close";
    closeBtn.textContent = "✕";
    closeBtn.onclick = closeModal;
    overlay.appendChild(closeBtn);

    if (galleryData.length > 1) {
        const prevBtn = document.createElement("button");
        prevBtn.className = "lightbox-nav lightbox-prev";
        prevBtn.innerHTML = "‹";
        prevBtn.onclick = () => navigateLightbox(-1);
        overlay.appendChild(prevBtn);

        const nextBtn = document.createElement("button");
        nextBtn.className = "lightbox-nav lightbox-next";
        nextBtn.innerHTML = "›";
        nextBtn.onclick = () => navigateLightbox(1);
        overlay.appendChild(nextBtn);
    }

    overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
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

const ctaFindUsBtn = document.querySelector(".cta-actions .dy-btn");
if (ctaFindUsBtn) {
    ctaFindUsBtn.addEventListener("click", () => {
        const modal = document.createElement("div");
        modal.className = "map-modal";
        modal.innerHTML = `
            <div class="map-embed"><div class="map-pin"></div></div>
            <div class="map-body">
                <h3>Find Logan'sCafe</h3>
                <div class="map-info-row">
                    <span class="map-info-icon">📍</span>
                    <div><strong>Address</strong>123 Roast Lane, Brew District<br>City Centre, CA 90210</div>
                </div>
                <div class="map-info-row">
                    <span class="map-info-icon">🕐</span>
                    <div><strong>Hours Today</strong>${getTodaysHours()}</div>
                </div>
                <div class="map-info-row">
                    <span class="map-info-icon">📞</span>
                    <div><strong>Phone</strong>+1 (555) 092-CAFE</div>
                </div>
                <div class="map-actions">
                    <button class="btn-directions" id="directionsBtn">Get Directions</button>
                    <button class="btn-map-close" onclick="closeModal()">Close</button>
                </div>
            </div>
        `;
        modal.querySelector("#directionsBtn").addEventListener("click", () => {
            showToast("🗺️", "Opening directions in your maps app...");
            closeModal();
        });
        openModal(modal);
    });
}

function getTodaysHours() {
    const day = new Date().getDay();
    if (day === 0) return "9:00am – 7:00pm";
    if (day === 6) return "8:00am – 9:00pm";
    return "7:00am – 9:00pm";
}

const ctaEmail = document.querySelector(".cta-email");
if (ctaEmail) {
    ctaEmail.addEventListener("click", e => {
        e.preventDefault();
        showToast("📧", "Opening your mail client...");
        setTimeout(() => { window.location.href = "mailto:hello@loganscafe.com"; }, 600);
    });
}

document.querySelectorAll(".s-card-content").forEach(card => {
    const heading = card.querySelector("h3");
    if (!heading || !heading.textContent.includes("Loyalty")) return;
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
        const cupsEarned = 3;
        const cupsNeeded = 10;
        const cupsHtml = Array.from({ length: cupsNeeded }, (_, i) =>
            `<span class="loyalty-cup${i < cupsEarned ? " filled" : ""}">☕</span>`
        ).join("");
        const modal = document.createElement("div");
        modal.className = "loyalty-modal";
        modal.innerHTML = `
            <div class="loyalty-header">
                <div class="loyalty-cups">${cupsHtml}</div>
                <h3>Logan's Loyalty Club</h3>
                <p>Earn a free drink every 10 cups</p>
            </div>
            <div class="loyalty-body">
                <div style="font-size:13px;opacity:0.7;margin-bottom:4px">Your progress</div>
                <div class="loyalty-progress-bar"><div class="loyalty-progress-fill" id="loyaltyBar"></div></div>
                <div class="loyalty-status">${cupsEarned} / ${cupsNeeded} cups — ${cupsNeeded - cupsEarned} more for a free drink!</div>
                <ul class="loyalty-perk-list">
                    <li>Free drink every 10th cup</li>
                    <li>Early access to seasonal specials</li>
                    <li>Birthday surprise from us 🎂</li>
                    <li>Members-only monthly discount</li>
                    <li>Priority pre-ordering</li>
                </ul>
                <button class="btn-loyalty-join" id="loyaltyJoinBtn">Join Now — It's Free!</button>
                <button class="btn-loyalty-close" onclick="closeModal()">Maybe Later</button>
            </div>
        `;
        modal.querySelector("#loyaltyJoinBtn").addEventListener("click", () => {
            closeModal();
            showToast("⭐", "Welcome to the Loyalty Club! Your card is activated.");
        });
        openModal(modal);
        setTimeout(() => {
            const bar = document.getElementById("loyaltyBar");
            if (bar) bar.style.width = (cupsEarned / cupsNeeded * 100) + "%";
        }, 400);
    });
});

const socialNames = ["Instagram", "Twitter / X", "Facebook", "LinkedIn"];
document.querySelectorAll(".socials a").forEach((link, i) => {
    link.addEventListener("click", e => {
        e.preventDefault();
        showToast("🔗", `Following us on ${socialNames[i % 4]}! (Links live soon)`);
    });
});

const heroOrderBtn = document.querySelector(".hero-actions .dy-btn");
if (heroOrderBtn) {
    heroOrderBtn.addEventListener("click", () => { document.getElementById("menu").scrollIntoView({ behavior: "smooth" }); });
}

const navOrderBtn = document.querySelector(".nav-btn .dy-btn");
if (navOrderBtn) {
    navOrderBtn.addEventListener("click", e => { e.preventDefault(); document.getElementById("menu").scrollIntoView({ behavior: "smooth" }); });
}

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
    newsletterInput.addEventListener("keydown", e => { if (e.key === "Enter") newsletterBtn.click(); });
}

document.querySelectorAll(".process-step, .step").forEach(step => {
    step.style.cursor = "pointer";
    step.addEventListener("click", () => {
        step.style.transform = "scale(0.97)";
        setTimeout(() => step.style.transform = "", 200);
    });
});

document.querySelectorAll(".testimonial-card").forEach(card => {
    const stars = card.querySelector(".stars");
    if (!stars) return;
    stars.style.cursor = "pointer";
    stars.addEventListener("click", () => {
        showToast("⭐", "Thanks for loving this review!");
        stars.style.animation = "heartbeat 0.3s ease";
        setTimeout(() => stars.style.animation = "", 400);
    });
});

const bannerImg = document.querySelector(".banner-img");
if (bannerImg && window.innerWidth > 768) {
    window.addEventListener("scroll", () => {
        bannerImg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }, { passive: true });
}

document.querySelectorAll("footer .footer-col ul li a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
    });
});

window.closeModal = closeModal;
window.openOrderModal = openOrderModal;
window.openCardForm = openCardForm;
window.openLightbox = openLightbox;
window.showToast = showToast;
window.updateCartItemQty = updateCartItemQty;
window.removeFromCart = removeFromCart;
