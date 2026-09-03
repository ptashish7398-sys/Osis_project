// explore.js

document.addEventListener("DOMContentLoaded", () => {
        // Navigation link switching
        const navLinks = document.querySelectorAll(".nav-link");
        const sections = document.querySelectorAll(".drink-section");

        navLinks.forEach(link => {
                link.addEventListener("click", (e) => {
                        e.preventDefault();

                        navLinks.forEach(l => l.classList.remove("active"));
                        link.classList.add("active");

                        const target = link.getAttribute("href").substring(1);

                        sections.forEach(section => {
                                section.classList.remove("active-section");
                                if (section.id === target) {
                                        section.classList.add("active-section");
                                }
                        });
                });
        });

        // Overlays
        const cartIcon = document.getElementById("cart-icon");
        const cartOverlay = document.getElementById("cart-overlay");
        const profileIcon = document.getElementById("profile-icon");
        const profileOverlay = document.getElementById("profile-overlay");

        const closeOverlays = () => {
                cartOverlay.classList.add("hidden");
                profileOverlay.classList.add("hidden");
        };

        cartIcon.addEventListener("click", (e) => {
                e.stopPropagation();
                profileOverlay.classList.add("hidden");
                cartOverlay.classList.toggle("hidden");
        });

        profileIcon.addEventListener("click", (e) => {
                e.stopPropagation();
                cartOverlay.classList.add("hidden");
                profileOverlay.classList.toggle("hidden");
        });

        // Close overlays on outside click
        document.addEventListener("click", (e) => {
                if (!e.target.closest(".overlay") && !e.target.closest(".cart-icon") && !e.target.closest(".profile-icon")) {
                        closeOverlays();
                }
        });

        // Close overlays on ESC
        document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                        closeOverlays();
                }
        });

        // Placeholder: Add one item to cart to test badge
        const cartCount = document.getElementById("cart-count");
        const addToCartExample = () => {
                let count = parseInt(cartCount.textContent) || 0;
                cartCount.textContent = count + 1;
        };

        // Uncomment below if testing:
        // setTimeout(addToCartExample, 2000);
});


// Add to cart functionality
btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');

        fetch('add_to_cart.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `id=${id}`
        })
                .then(res => res.text())
                .then(response => {
                        updateCartBadge();
                        showToast('Added to cart!');
                });
});

// cart overlay

const cartIcon = document.querySelector("#cartIcon");
const cartOverlay = document.querySelector("#cartOverlay");
const cartItemsList = document.querySelector("#cartItems");
const cartTotalEl = document.querySelector("#cartTotal");

function toggleCart() {
        cartOverlay.classList.toggle("hidden");
}

// Trigger open
cartIcon.addEventListener("click", () => {
        fetch("get_cart.php")
                .then(response => response.json())
                .then(data => {
                        cartItemsList.innerHTML = "";
                        let total = 0;

                        data.forEach(item => {
                                const li = document.createElement("li");
                                li.innerHTML = `${item.name} <span>₹${item.price}</span>`;
                                cartItemsList.appendChild(li);
                                total += parseFloat(item.price);
                        });

                        cartTotalEl.textContent = total.toFixed(2);
                        toggleCart();
                });
});
