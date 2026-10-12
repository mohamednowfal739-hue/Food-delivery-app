
const restaurants = [
  {
    id: "madras",
    name: "Madras Meals",
    cuisine: "South Indian",
    rating: 4.9,
    time: "20–30 min",
    fee: 20,
    tag: "LOCAL FAVOURITE",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    menu: [
      {id:"m1",name:"Mini Idli Sambar",price:99,emoji:"🥘",description:"Soft idlis with warm sambar"},
      {id:"m2",name:"Masala Dosa",price:149,emoji:"🥞",description:"Crispy dosa and potato masala"},
      {id:"m3",name:"South Indian Meals",price:199,emoji:"🍛",description:"Rice, poriyal and kootu"},
      {id:"m4",name:"Filter Coffee",price:49,emoji:"☕",description:"Fresh South Indian coffee"}
    ]
  },
  {
    id: "burger",
    name: "Burger Theory",
    cuisine: "Burgers",
    rating: 4.8,
    time: "25–35 min",
    fee: 30,
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    menu: [
      {id:"b1",name:"Classic Smash Burger",price:229,emoji:"🍔",description:"Burger with cheese and house sauce"},
      {id:"b2",name:"Crispy Chicken Burger",price:249,emoji:"🍗",description:"Crispy chicken and spicy mayo"},
      {id:"b3",name:"Loaded Fries",price:129,emoji:"🍟",description:"Fries with cheese and herbs"},
      {id:"b4",name:"Chocolate Shake",price:119,emoji:"🥤",description:"Creamy chocolate milkshake"}
    ]
  },
  {
    id: "pizza",
    name: "Olive & Oven",
    cuisine: "Pizza",
    rating: 4.7,
    time: "30–40 min",
    fee: 25,
    tag: "OVEN FRESH",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80",
    menu: [
      {id:"p1",name:"Margherita Pizza",price:279,emoji:"🍕",description:"Tomato, mozzarella and basil"},
      {id:"p2",name:"Garden Veg Pizza",price:329,emoji:"🫑",description:"Peppers, olives, onion and corn"},
      {id:"p3",name:"Garlic Bread",price:129,emoji:"🥖",description:"Garlic butter toasted bread"},
      {id:"p4",name:"Tiramisu Cup",price:149,emoji:"🍰",description:"Coffee and creamy dessert"}
    ]
  },
  {
    id: "biryani",
    name: "Spice Route Biryani",
    cuisine: "Biryani",
    rating: 4.8,
    time: "30–40 min",
    fee: 30,
    tag: "HEARTY BITES",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=80",
    menu: [
      {id:"r1",name:"Chicken Dum Biryani",price:249,emoji:"🍚",description:"Fragrant basmati and chicken"},
      {id:"r2",name:"Paneer Biryani",price:199,emoji:"🍛",description:"Spiced rice with soft paneer"},
      {id:"r3",name:"Pepper Chicken",price:229,emoji:"🍗",description:"Pepper-seasoned chicken"},
      {id:"r4",name:"Bread Halwa",price:89,emoji:"🍮",description:"Traditional sweet dessert"}
    ]
  },
  {
    id: "green",
    name: "The Green Bowl",
    cuisine: "Healthy",
    rating: 4.8,
    time: "20–30 min",
    fee: 20,
    tag: "FRESH PICK",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    menu: [
      {id:"g1",name:"Rainbow Buddha Bowl",price:249,emoji:"🥗",description:"Greens, grains and chickpeas"},
      {id:"g2",name:"Paneer Power Wrap",price:189,emoji:"🌯",description:"Paneer and crunchy vegetables"},
      {id:"g3",name:"Avocado Toast",price:199,emoji:"🥑",description:"Avocado on toasted sourdough"},
      {id:"g4",name:"Mango Smoothie",price:129,emoji:"🥭",description:"Mango and creamy yoghurt"}
    ]
  },
  {
    id: "sweet",
    name: "Sugar Petal",
    cuisine: "Desserts",
    rating: 4.9,
    time: "20–30 min",
    fee: 20,
    tag: "SWEET SPOT",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
    menu: [
      {id:"s1",name:"Strawberry Cake",price:179,emoji:"🍰",description:"Sponge cake, cream and berries"},
      {id:"s2",name:"Brownie & Ice Cream",price:159,emoji:"🍨",description:"Warm brownie and vanilla ice cream"},
      {id:"s3",name:"Macaron Box",price:249,emoji:"🍬",description:"Six colourful macarons"},
      {id:"s4",name:"Classic Cheesecake",price:199,emoji:"🍮",description:"Creamy cheesecake and biscuit base"}
    ]
  }
];

let category = "All";
let selectedRestaurant = null;
let cart = [];
let favorites = new Set();
let customerName = "Foodie";
let toastTimer;

const $ = id => document.getElementById(id);
const money = amount => "₹" + amount.toLocaleString("en-IN");

// DEMO LOGIN
function signIn(name) {
  customerName = name.trim() || "Foodie";
  $("welcome-name").textContent = customerName.split(" ")[0];
  $("profile-label").textContent = customerName.split(" ")[0];

  $("login-screen").classList.add("hidden");
  $("app").classList.remove("hidden");

  renderRestaurants();
  window.scrollTo(0, 0);
}

$("google-login").addEventListener("click", () => {
  const name = prompt(
    "Demo Google sign-in: enter the name you want to use."
  );

  if (name && name.trim()) {
    signIn(name);
  }
});

$("phone-form").addEventListener("submit", event => {
  event.preventDefault();

  const phone = $("phone").value.trim();

  if (!/^\d{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  const name = prompt("Enter your name to continue.");

  if (name && name.trim()) {
    signIn(name);
  }
});

$("profile-button").addEventListener("click", () => {
  if (confirm("Sign out of this demo session?")) {
    cart = [];
    renderCart();

    $("app").classList.add("hidden");
    $("login-screen").classList.remove("hidden");
    $("phone").value = "";

    closeModals();
    closeCart();
  }
});

// SEARCH AND RESTAURANT CARDS
function renderRestaurants() {
  const search = $("search-input").value
    .trim()
    .toLowerCase();

  const filtered = restaurants.filter(restaurant => {
    const categoryMatch =
      category === "All" || restaurant.cuisine === category;

    const searchable = [
      restaurant.name,
      restaurant.cuisine,
      ...restaurant.menu.map(dish => dish.name)
    ].join(" ").toLowerCase();

    return categoryMatch && searchable.includes(search);
  });

  $("restaurant-grid").innerHTML = filtered.map(r => `
    <article class="restaurant-card"
      data-restaurant="${r.id}" tabindex="0" role="button">
      <div class="restaurant-photo"
        style="background-image:url('${r.image}')">
        <span class="photo-tag">${r.tag}</span>
        <button class="heart-btn ${favorites.has(r.id) ? "saved" : ""}"
          data-favorite="${r.id}" aria-label="Save ${r.name}">
          ${favorites.has(r.id) ? "♥" : "♡"}
        </button>
      </div>

      <div class="card-body">
        <div class="card-title">
          <h3>${r.name}</h3>
          <span class="rating">★ ${r.rating}</span>
        </div>
        <p>${r.cuisine} · ${r.time}</p>
        <div class="card-meta">
          <span>Delivery</span>
          <strong>${money(r.fee)}</strong>
          <span>View menu ↗</span>
        </div>
      </div>
    </article>
  `).join("");

  $("empty-state").classList.toggle(
    "hidden", filtered.length > 0
  );
}

$("search-input").addEventListener("input", renderRestaurants);

$("filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  category = button.dataset.category;

  document.querySelectorAll("[data-category]").forEach(btn => {
    btn.classList.toggle("active", btn === button);
  });

  renderRestaurants();
});

$("reset-search").addEventListener("click", () => {
  $("search-input").value = "";
  category = "All";

  document.querySelectorAll("[data-category]").forEach(btn => {
    btn.classList.toggle(
      "active", btn.dataset.category === "All"
    );
  });

  renderRestaurants();
});

// RESTAURANT MENU
function openRestaurant(id) {
  selectedRestaurant = restaurants.find(r => r.id === id);
  if (!selectedRestaurant) return;

  $("modal-title").textContent = selectedRestaurant.name;
  $("modal-meta").textContent =
    `★ ${selectedRestaurant.rating} · ${selectedRestaurant.time}` +
    ` · Delivery ${money(selectedRestaurant.fee)}`;

  $("menu-grid").innerHTML = selectedRestaurant.menu.map(dish => `
    <article class="menu-item">
      <h4>${dish.emoji} ${dish.name}</h4>
      <p>${dish.description}</p>
      <strong>${money(dish.price)}</strong>
      <button class="add-btn" data-add="${dish.id}">+ Add</button>
    </article>
  `).join("");

  showOverlay();
  $("restaurant-modal").classList.remove("hidden");
}

// FAVOURITES
function toggleFavorite(id) {
  if (favorites.has(id)) {
    favorites.delete(id);
    showToast("Removed from favourites");
  } else {
    favorites.add(id);
    showToast("Added to favourites ♥");
  }

  renderRestaurants();
}

// CART
function addToCart(dishId) {
  if (!selectedRestaurant) return;

  const dish = selectedRestaurant.menu.find(
    item => item.id === dishId
  );

  if (!dish) return;

  if (
    cart.length &&
    cart[0].restaurantId !== selectedRestaurant.id
  ) {
    const confirmed = confirm(
      `Your cart has items from ${cart[0].restaurantName}. ` +
      `Clear it and order from ${selectedRestaurant.name}?`
    );

    if (!confirmed) return;
    cart = [];
  }

  const existing = cart.find(item => item.id === dishId);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      ...dish,
      restaurantId: selectedRestaurant.id,
      restaurantName: selectedRestaurant.name,
      fee: selectedRestaurant.fee,
      qty: 1
    });
  }

  renderCart();
  showToast(dish.name + " added to cart");
}

function renderCart() {
  const count = cart.reduce(
    (sum, item) => sum + item.qty, 0
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );

  const delivery = cart.length ? cart[0].fee : 0;
  const total = subtotal + delivery;

  $("cart-count").textContent = count;
  $("cart-restaurant").textContent = cart.length
    ? "Ordering from " + cart[0].restaurantName
    : "";

  $("cart-items").innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.emoji} ${item.name}</strong>
        <p>${money(item.price)} each</p>
      </div>

      <div class="qty">
        <button data-qty="-1" data-id="${item.id}">−</button>
        <span>${item.qty}</span>
        <button data-qty="1" data-id="${item.id}">+</button>
      </div>
    </div>
  `).join("");

  $("cart-empty").classList.toggle("hidden", count > 0);
  $("cart-footer").classList.toggle("hidden", count === 0);

  $("subtotal").textContent = money(subtotal);
  $("delivery-fee").textContent = money(delivery);
  $("total").textContent = money(total);
  $("checkout-total").textContent = money(total);
}

// BUTTON EVENTS
document.addEventListener("click", event => {
  const favoriteButton = event.target.closest("[data-favorite]");

  if (favoriteButton) {
    event.stopPropagation();
    toggleFavorite(favoriteButton.dataset.favorite);
    return;
  }

  const restaurantCard = event.target.closest("[data-restaurant]");

  if (restaurantCard) {
    openRestaurant(restaurantCard.dataset.restaurant);
    return;
  }

  const addButton = event.target.closest("[data-add]");

  if (addButton) {
    addToCart(addButton.dataset.add);
    return;
  }

  const quantityButton = event.target.closest("[data-qty]");

  if (quantityButton) {
    const item = cart.find(
      i => i.id === quantityButton.dataset.id
    );

    if (!item) return;

    item.qty += Number(quantityButton.dataset.qty);

    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== item.id);
    }

    renderCart();
  }
});

// CART DRAWER
function showOverlay() {
  $("overlay").classList.remove("hidden");
}

function openCart() {
  $("cart-drawer").classList.add("open");
  showOverlay();
  renderCart();
}

function closeCart() {
  $("cart-drawer").classList.remove("open");
  hideOverlayIfClosed();
}

function closeModals() {
  $("restaurant-modal").classList.add("hidden");
  $("checkout-modal").classList.add("hidden");
  hideOverlayIfClosed();
}

function hideOverlayIfClosed() {
  const cartOpen = $("cart-drawer").classList.contains("open");
  const menuOpen = !$("restaurant-modal").classList.contains("hidden");
  const checkoutOpen = !$("checkout-modal").classList.contains("hidden");

  if (!cartOpen && !menuOpen && !checkoutOpen) {
    $("overlay").classList.add("hidden");
  }
}

$("open-cart").addEventListener("click", openCart);
$("close-cart").addEventListener("click", closeCart);

$("browse-food")?.addEventListener("click", () => {
  closeCart();
  $("restaurants").scrollIntoView({ behavior: "smooth" });
});

$("close-restaurant").addEventListener("click", closeModals);
$("close-checkout").addEventListener("click", closeModals);

$("overlay").addEventListener("click", () => {
  closeCart();
  closeModals();
});

// CHECKOUT
$("checkout-button").addEventListener("click", () => {
  if (!cart.length) return;

  closeCart();
  showOverlay();
  $("checkout-modal").classList.remove("hidden");
});

$("checkout-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!cart.length) return;

  const data = new FormData(event.target);
  const name = data.get("name");
  const orderId = "CR" + Math.floor(10000 + Math.random() * 90000);
  const restaurant = cart[0].restaurantName;
  const amount = $("checkout-total").textContent;

  closeModals();

  alert(
    `Thank you, ${name}!\n\n` +
    `Demo order: ${orderId}\n` +
    `Restaurant: ${restaurant}\n` +
    `Total: ${amount}\n\n` +
    `No real order or payment was sent.`
  );

  cart = [];
  renderCart();
  event.target.reset();
  showToast("Demo order " + orderId + " completed");
});

// KEYBOARD SUPPORT
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    closeModals();
  }

  if (
    event.key === "Enter" &&
    event.target.matches(".restaurant-card")
  ) {
    openRestaurant(event.target.dataset.restaurant);
  }
});

// NOTIFICATION
function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 2200);
}

// INITIAL SETUP
renderRestaurants();
renderCart();
