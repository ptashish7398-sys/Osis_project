let cartModal = document.getElementById("cart-modal");
let profileModal = document.getElementById("profile-modal");
let cartCount = 0;
let cartItems = [];
let cartTotal = 0;

function toggleCart() {
        profileModal.style.display = "none";
        cartModal.style.display = cartModal.style.display === "block" ? "none" : "block";
        renderCart();
}

function toggleProfile() {
        cartModal.style.display = "none";
        profileModal.style.display = profileModal.style.display === "block" ? "none" : "block";
}

function addToCart(name, price) {
        cartItems.push({ name, price });
        cartCount++;
        cartTotal += price;
        document.getElementById("cart-count").textContent = cartCount;
        renderCart();
}

function renderCart() {
        let list = document.getElementById("cart-items");
        list.innerHTML = "";
        cartItems.forEach(item => {
                let li = document.createElement("li");
                li.textContent = `${item.name} - ₹${item.price}`;
                list.appendChild(li);
        });
        document.getElementById("cart-total").textContent = cartTotal;
}

function checkout() {
        alert("Order placed! (Simulated)");
        cartItems = [];
        cartCount = 0;
        cartTotal = 0;
        document.getElementById("cart-count").textContent = 0;
        renderCart();
        cartModal.style.display = "none";
}

function viewOrders() {
        alert("Order History clicked!");
}

function editInfo() {
        alert("Edit Info clicked!");
}


function checkout() {
        document.getElementById('checkout-modal').style.display = 'block';
        document.getElementById('order-items').value = JSON.stringify(cartItems);
        document.getElementById('order-total').value = cartTotal;
}

document.getElementById("checkout-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch("checkout.php", {
                method: "POST",
                body: formData,
        })
                .then((res) => res.text())
                .then((data) => {
                        if (data === "success") {
                                alert("Order placed successfully!");
                                cartItems = [];
                                cartCount = 0;
                                cartTotal = 0;
                                document.getElementById("cart-count").textContent = 0;
                                renderCart();
                                document.getElementById('checkout-modal').style.display = 'none';
                                cartModal.style.display = 'none';
                        } else {
                                alert("Something went wrong: " + data);
                        }
                });
});

document.getElementById("subscribe-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch("subscribe.php", {
                method: "POST",
                body: formData,
        })
                .then((res) => res.text())
                .then((result) => {
                        if (result === "success") {
                                showToast("Subscribed successfully !");
                                this.reset();
                        } else {
                                showToast("Subscription failed: " + result);
                        }
                })
                .catch(() => {
                        showToast("Network error. Try again.");
                });
});

function showToast(message) {
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.style.cssText = `
          position: fixed;
          top: 20px;
          right: 600px;
          letter-spacing: 3px;
          font-size: 20px;
          background: #4caf50;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          z-index: 10000;
          font-weight: bold;
          animation: fadeout 3s forwards;
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
}


// document.getElementById("contactForm").addEventListener("submit", function (e) {
//         e.preventDefault();

//         const formData = new FormData(this);
//         fetch("contact.php", {
//                 method: "POST",
//                 body: formData
//         })
//                 .then(res => res.text())
//                 .then(result => {
//                         const responseBox = document.getElementById("contact-response");
//                         if (result.trim() === "success") {
//                                 responseBox.textContent = "Message sent successfully!";
//                                 responseBox.style.color = "green";
//                                 this.reset();
//                         } else {
//                                 responseBox.textContent = "Failed to send message.";
//                                 responseBox.style.color = "red";
//                         }
//                 })
//                 .catch(() => {
//                         document.getElementById("contact-response").textContent = "Server error!";
//                 });
// });


// Open modal when contact form link clicked
document.querySelector(".contact-form-link").addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("contact-modal").style.display = "flex";
});

// Close modal
document.getElementById("close-contact").addEventListener("click", function () {
        document.getElementById("contact-modal").style.display = "none";
});

// Handle form submission via AJAX
document.getElementById("contactForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch("submit-query.php", {
                method: "POST",
                body: formData
        })
                .then(res => res.text())
                .then(data => {
                        alert("Thank you! Your message has been sent.");
                        document.getElementById("contact-modal").style.display = "none";
                        this.reset();
                })
                .catch(() => {
                        alert("Something went wrong. Try again.");
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


// login modal
// setTimeout(() => {
//         if (!sessionStorage.getItem('loggedIn')) {
//                 document.getElementById('authOverlay').classList.remove('hidden');
//         }
// }, 5000);

// function closeAuthModal() {
//         document.getElementById('authOverlay').classList.add('hidden');
// }

// function toggleToRegister() {
//         document.getElementById('loginForm').classList.add('hidden');
//         document.getElementById('registerForm').classList.remove('hidden');
// }

// function toggleToLogin() {
//         document.getElementById('registerForm').classList.add('hidden');
//         document.getElementById('loginForm').classList.remove('hidden');
// }

// document.getElementById('loginForm').addEventListener('submit', function (e) {
//         e.preventDefault();
//         const formData = new FormData(this);
//         fetch('login.php', {
//                 method: 'POST',
//                 body: formData
//         }).then(res => res.text())
//                 .then(data => {
//                         if (data.trim() === 'success') {
//                                 sessionStorage.setItem('loggedIn', true);
//                                 closeAuthModal();
//                                 alert('Login successful');
//                         } else {
//                                 alert(data);
//                         }
//                 });
// });

// document.getElementById('registerForm').addEventListener('submit', function (e) {
//         e.preventDefault();
//         const formData = new FormData(this);
//         fetch('register.php', {
//                 method: 'POST',
//                 body: formData
//         }).then(res => res.text())
//                 .then(data => {
//                         alert(data);
//                         if (data.includes('success')) toggleToLogin();
//                 });
// });

function toggleToRegister() {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.remove('hidden');
}

function toggleToLogin() {
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
                if (!sessionStorage.getItem('authShown')) {
                        document.getElementById('authOverlay').classList.remove('hidden');
                        sessionStorage.setItem('authShown', 'true');
                }
        }, 5000);
});
