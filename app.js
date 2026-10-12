
const restaurants = [
  {
    id: "madras",
    name: "Madras Meals",
    cuisine: "South Indian",
    rating: 4.9,
    time: "20–30 min",
    fee: 20,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80",
    menu: [
      { id: "m1", name: "Mini Idli Sambar", price: 99, emoji: "🥘" },
      { id: "m2", name: "Masala Dosa", price: 149, emoji: "🥞" },
      { id: "m3", name: "South Indian Meals", price: 199, emoji: "🍛" }
    ]
  },
  {
    id: "burger",
    name: "Burger Theory",
    cuisine: "Burgers",
    rating: 4.8,
    time: "25–35 min",
    fee: 30,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    menu: [
      { id: "b1", name: "Classic Burger", price: 229, emoji: "🍔" },
      { id: "b2", name: "Crispy Chicken Burger", price: 249, emoji: "🍗" },
      { id: "b3", name: "Loaded Fries", price: 129, emoji: "🍟" }
    ]
  },
  {
    id: "pizza",
    name: "Olive & Oven",
    cuisine: "Pizza",
    rating: 4.7,
    time: "30–40 min",
    fee: 25,
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80",
    menu: [
      { id: "p1", name: "Margherita Pizza", price: 279, emoji: "🍕" },
      { id: "p2", name: "Garden Veg Pizza", price: 329, emoji: "🫑" },
      { id: "p3", name: "Garlic Bread", price: 129, emoji: "🥖" }
    ]
  },
  {
    id: "green",
    name: "The Green Bowl",
    cuisine: "Healthy",
    rating: 4.8,
    time: "20–30 min",
    fee: 20,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80",
    menu: [
      { id: "g1", name: "Rainbow Bowl", price: 249, emoji: "🥗" },
      { id: "g2", name: "Paneer Wrap", price: 189, emoji: "🌯" },
      { id: "g3", name: "Mango Smoothie", price: 129, emoji: "🥭" }
    ]
  },
  {
    id: "sweet",
    name: "Sugar Petal",
    cuisine: "Desserts",
    rating: 4.9,
    time: "20–30 min",
    fee: 20,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80",
    menu: [
      { id: "s1", name: "Strawberry Cake", price: 179, emoji: "🍰" },
      { id: "s2", name: "Brownie & Ice Cream", price: 159, emoji: "🍨" },
      { id: "s3", name: "Cheesecake", price: 199, emoji: "🍮" }
    ]
  },
  {
    id: "spice",
    name: "Spice Route",
    cuisine: "South Indian",
    rating: 4.6,
    time: "30–40 min",
    fee: 30,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=700&q=80",
    menu: [
      { id: "r1", name: "Chicken Dum Biryani", price: 249, emoji: "🍚" },
      { id: "r2", name: "Paneer Biryani", price: 199, emoji: "🍛" },
      { id: "r3", name: "Pepper Chicken", price: 229, emoji: "🍗" }
    ]
  }
];

let category = "All";
let selectedRestaurant = null;
let cart = [];

const $ = id => document.getElementById(id);
const money = amount => "₹" + amount.toLocaleString("en-IN");

function allDishes() {
  return restaurants.flatMap(restaurant =>
    restaurant.menu.map(dish => ({
      ...dish,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      fee: restaurant.fee
    }))
  );
}

// Display restaurants
function renderRestaurants() {
  const search = $("search-input").value.toLowerCase().trim();

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
      data-restaurant="${r.id}" tabindex="0">
      <img src="${r.image}" alt="${r.name}"
        loading="lazy">
      <div class="card-body">
        <h3>${r.name}</h3>
        <p>${r.cuisine} · ★ ${r.rating}</p>
        <p>Delivery in ${r.time}</p>
        <div class="card-meta">
          <span>Delivery: ${money(r.fee)}</span>
          <span>View menu ↗</span>
        </div>
      </div>
    </article>
  `).join("");

  $("empty-state").hidden = filtered.length > 0;
}

// Open restaurant menu
function openRestaurant(id) {
  selectedRestaurant = restaurants.find(r => r.id === id);
  if (!selectedRestaurant) return;

  $("modal-title").textContent = selectedRestaurant.name;
  $("modal-meta").textContent =
    `${selectedRestaurant.cuisine} · ★ ${selectedRestaurant.rating} · ${selectedRestaurant.time}`;

  $("menu-grid").innerHTML = selectedRestaurant.menu.map(dish => `
    <div class="menu-item">
      <h4>${dish.emoji} ${dish.name}</h4>
      <strong>${money(dish.price)}</strong>
      <button data-add="${dish.id}">+ Add</button>
    </div>
  `).join("");

  showOverlay();
  $("restaurant-modal").classList.remove("hidden");
}

// Overlay and cart controls
function showOverlay() {
  $("overlay").classList.remove("hidden");
}

function hideOverlayIfClosed() {
  const cartOpen = $("cart-drawer").classList.contains("open");
  const menuOpen = !$("restaurant-modal").classList.contains("hidden");
  const checkoutOpen = !$("checkout-modal").classList.contains("hidden");

  if (!cartOpen && !menuOpen && !checkoutOpen) {
    $("overlay").classList.add("hidden");
  }
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

// Add a dish, keeping one restaurant per order
function addToCart(dishId) {
  const dish = allDishes().find(item => item.id === dishId);
  if (!dish) return;

  if (cart.length && cart[0].restaurantId !== dish.restaurantId) {
    const confirmed = confirm(
      `Your cart contains food from ${cart[0].restaurantName}. ` +
      `Clear it and order from ${dish.restaurantName}?`
    );

    if (!confirmed) return;
    cart = [];
  }

  const existing = cart.find(item => item.id === dishId);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...dish, qty: 1 });
  }

  renderCart();
}

// Update quantity and bill
function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
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

  $("cart-empty").hidden = count > 0;
  $("cart-footer").hidden = count === 0;
  $("subtotal").textContent = money(subtotal);
  $("delivery-fee").textContent = money(delivery);
  $("total").textContent = money(total);
  $("checkout-total").textContent = money(total);
}

// Handle buttons using event delegation
document.addEventListener("click", event => {
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

    if (item) {
      item.qty += Number(quantityButton.dataset.qty);

      if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== item.id);
      }

      renderCart();
    }
  }
});

// Cuisine filters
document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    category = button.dataset.category;

    document.querySelectorAll("[data-category]").forEach(btn => {
      btn.classList.toggle("active", btn === button);
    });

    renderRestaurants();
  });
});

// Search
$("search-input").addEventListener("input", renderRestaurants);

// Open and close cart
$("open-cart").addEventListener("click", openCart);
$("close-cart").addEventListener("click", closeCart);

// Close restaurant menu
$("close-restaurant").addEventListener("click", closeModals);

// Close checkout
$("close-checkout").addEventListener("click", closeModals);

// Close dialogs by clicking the background
$("overlay").addEventListener("click", () => {
  closeCart();
  closeModals();
});

// Checkout
$("checkout-button").addEventListener("click", () => {
  if (!cart.length) return;

  closeCart();
  $("checkout-modal").classList.remove("hidden");
  showOverlay();
});

$("checkout-form").addEventListener("submit", event => {
  event.preventDefault();

  if (!cart.length) return;

  const form = new FormData(event.target);
  const name = form.get("name");
  const orderNumber = "CR" + Math.floor(10000 + Math.random() * 90000);
  const restaurant = cart[0].restaurantName;
  const amount = $("checkout-total").textContent;

  alert(
    `Thank you, ${name}!\n\n` +
    `Demo order: ${orderNumber}\n` +
    `Restaurant: ${restaurant}\n` +
    `Total: ${amount}\n\n` +
    `This is a demo. No real order or payment was sent.`
  );

  cart = [];
  renderCart();
  event.target.reset();
  closeModals();
});

// Escape key closes open panels
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    closeModals();
  }

  if (event.key === "Enter" &&
      event.target.matches(".restaurant-card")) {
    openRestaurant(event.target.dataset.restaurant);
  }
});

// Initial page setup
renderRestaurants();
renderCart();
  
