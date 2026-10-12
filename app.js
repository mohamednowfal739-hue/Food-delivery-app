const restaurants = [
  {id:"madras",name:"Madras Meals",cuisine:"South Indian",description:"Comforting classics & filter coffee",rating:4.9,time:"20–30 min",fee:20,tag:"LOCAL FAVOURITE",image:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=85",menu:[
    {id:"m1",name:"Mini Idli Sambar",description:"Soft idlis, warm sambar, ghee",price:99,emoji:"🥘"},{id:"m2",name:"Masala Dosa",description:"Crispy dosa with potato masala",price:149,emoji:"🥞"},{id:"m3",name:"South Indian Meals",description:"Rice, poriyal, kootu & more",price:199,emoji:"🍛"},{id:"m4",name:"Filter Coffee",description:"Strong, frothy and aromatic",price:49,emoji:"☕"}]},
  {id:"burger",name:"Burger Theory",cuisine:"Burgers",description:"Big flavours between soft buns",rating:4.8,time:"25–35 min",fee:30,tag:"BESTSELLER",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",menu:[
    {id:"b1",name:"Classic Smash Burger",description:"Smashed patty, cheddar, house sauce",price:229,emoji:"🍔"},{id:"b2",name:"Crispy Chicken Burger",description:"Crunchy chicken, slaw, spicy mayo",price:249,emoji:"🍗"},{id:"b3",name:"Loaded Fries",description:"Golden fries, cheese & herbs",price:129,emoji:"🍟"},{id:"b4",name:"Chocolate Shake",description:"Creamy chocolate milkshake",price:119,emoji:"🥤"}]},
  {id:"pizza",name:"Olive & Oven",cuisine:"Pizza",description:"Stone-baked pizza, made to share",rating:4.7,time:"30–40 min",fee:25,tag:"OVEN FRESH",image:"https://images.unsplash.com/photo- pizza-?auto=format&fit=crop&w=900&q=85".replace("photo- pizza-","photo-1579751626657-72bc17010498"),menu:[
    {id:"p1",name:"Margherita Pizza",description:"Tomato, mozzarella, fresh basil",price:279,emoji:"🍕"},{id:"p2",name:"Garden Veg Pizza",description:"Peppers, olives, onion & corn",price:329,emoji:"🫑"},{id:"p3",name:"Garlic Bread",description:"Toasted bread with garlic butter",price:129,emoji:"🥖"},{id:"p4",name:"Tiramisu Cup",description:"Coffee-soaked, creamy layers",price:149,emoji:"🍰"}]},
  {id:"green",name:"The Green Bowl",cuisine:"Healthy",description:"Fresh bowls, wraps & feel-good food",rating:4.8,time:"20–30 min",fee:20,tag:"FRESH PICK",image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",menu:[
    {id:"g1",name:"Rainbow Buddha Bowl",description:"Grains, greens, chickpeas & tahini",price:249,emoji:"🥗"},{id:"g2",name:"Paneer Power Wrap",description:"Grilled paneer and crunchy veggies",price:189,emoji:"🌯"},{id:"g3",name:"Avocado Toast",description:"Sourdough, avocado, chilli flakes",price:199,emoji:"🥑"},{id:"g4",name:"Mango Smoothie",description:"Mango blended with creamy yoghurt",price:129,emoji:"🥭"}]},
  {id:"sweet",name:"Sugar Petal",cuisine:"Desserts",description:"Little treats for your sweet tooth",rating:4.9,time:"20–30 min",fee:20,tag:"SWEET SPOT",image:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85",menu:[
    {id:"s1",name:"Strawberry Cake",description:"Soft sponge, cream and berries",price:179,emoji:"🍰"},{id:"s2",name:"Brownie & Ice Cream",description:"Warm chocolate brownie, vanilla scoop",price:159,emoji:"🍨"},{id:"s3",name:"Macaron Box",description:"Six colourful French macarons",price:249,emoji:"🍬"},{id:"s4",name:"Classic Cheesecake",description:"Creamy cheesecake, biscuit base",price:199,emoji:"🍮"}]},
  {id:"spice",name:"Spice Route",cuisine:"South Indian",description:"Bold spices, biryani & family favourites",rating:4.6,time:"30–40 min",fee:30,tag:"HEARTY BITES",image:"https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85",menu:[
    {id:"r1",name:"Chicken Dum Biryani",description:"Fragrant basmati, tender chicken",price:249,emoji:"🍚"},{id:"r2",name:"Paneer Biryani",description:"Spiced rice with soft paneer",price:199,emoji:"🍛"},{id:"r3",name:"Pepper Chicken",description:"Peppery, juicy chicken bites",price:229,emoji:"🍗"},{id:"r4",name:"Bread Halwa",description:"Rich, warm South Indian dessert",price:89,emoji:"🍮"}]}
];
let activeCategory = "All", activeRestaurant = null, cart = [], favorites = new Set(), toastTimer;
const $ = id => document.getElementById(id);
const money = n => "₹" + n.toLocaleString("en-IN");
function showToast(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2300)}
function allDishes(){return restaurants.flatMap(r=>r.menu.map(m=>({...m,restaurantId:r.id,restaurantName:r.name,cuisine:r.cuisine})))}
function renderRestaurants(){
  const q=$("search-input").value.trim().toLowerCase();
  const matches=restaurants.filter(r=>(activeCategory==="All"||r.cuisine===activeCategory)&&(`${r.name} ${r.cuisine} ${r.description} ${r.menu.map(m=>m.name).join(" ")}`).toLowerCase().includes(q));
  $("results-count").textContent=`${matches.length} ${matches.length===1?"place":"places"} to explore`;
  $("restaurant-grid").innerHTML=matches.map(r=>`<article class="restaurant-card" data-restaurant="${r.id}" tabindex="0" role="button" aria-label="View ${r.name} menu"><div class="restaurant-photo" style="background-image:url('${r.image}')"><span class="photo-tag">${r.tag}</span><button class="heart-btn ${favorites.has(r.id)?"saved":""}" data-favorite="${r.id}" aria-label="Save ${r.name}">${favorites.has(r.id)?"♥":"♡"}</button></div><div class="restaurant-info"><div class="restaurant-title-row"><h3>${r.name}</h3><span class="rating">★ ${r.rating}</span></div><p>${r.description}</p><div class="restaurant-meta"><span>◷ ${r.time}</span><span>Delivery <strong>${money(r.fee)}</strong></span><span class="card-arrow">↗</span></div></div></article>`).join("");
  $("empty-state").classList.toggle("hidden",matches.length>0);
}
function openRestaurant(id){
  activeRestaurant=restaurants.find(r=>r.id===id);if(!activeRestaurant)return;
  $("modal-hero").style.backgroundImage=`url('${activeRestaurant.image}')`;$("modal-title").textContent=activeRestaurant.name;$("modal-cuisine").textContent=activeRestaurant.cuisine.toUpperCase();$("modal-meta").textContent=`${activeRestaurant.description} · ${activeRestaurant.time}`;$("modal-rating").textContent=`★ ${activeRestaurant.rating}`;
  $("menu-grid").innerHTML=activeRestaurant.menu.map(m=>`<article class="menu-item"><div class="menu-emoji">${m.emoji}</div><div class="menu-description"><h3>${m.name}</h3><p>${m.description}</p><strong>${money(m.price)}</strong></div><button class="add-btn" data-add="${m.id}">+ Add</button></article>`).join("");
  showOverlay();$("restaurant-modal").classList.remove("hidden");
}
function showOverlay(){$("overlay").classList.remove("hidden")}
function closeModals(){$("restaurant-modal").classList.add("hidden");$("checkout-modal").classList.add("hidden");if(!$("cart-drawer").classList.contains("open"))$("overlay").classList.add("hidden")}
function openCart(){$("cart-drawer").classList.add("open");$("cart-drawer").setAttribute("aria-hidden","false");showOverlay();renderCart()}
function closeCart(){$("cart-drawer").classList.remove("open");$("cart-drawer").setAttribute("aria-hidden","true");if($("restaurant-modal").classList.contains("hidden")&&$("checkout-modal").classList.contains("hidden"))$("overlay").classList.add("hidden")}
function addToCart(itemId){
  const dish=activeRestaurant?.menu.find(m=>m.id===itemId)||allDishes().find(m=>m.id===itemId);if(!dish)return;
  const r=restaurants.find(r=>r.menu.some(m=>m.id===itemId));
  if(cart.length&&cart[0].restaurantId!==r.id){if(!confirm(`Your bag has items from ${cart[0].restaurantName}. Clear it and order from ${r.name} instead?`))return;cart=[]}
  const found=cart.find(x=>x.id===itemId);if(found)found.qty++;else cart.push({...dish,restaurantId:r.id,restaurantName:r.name,fee:r.fee,qty:1});
  renderCart();showToast(`${dish.name} added to your bag`);
}
function renderCart(){
  const count=cart.reduce((s,i)=>s+i.qty,0),subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0),fee=cart.length?cart[0].fee:0;
  $("cart-count").textContent=count;$("drawer-count").textContent=`(${count})`;$("cart-empty").classList.toggle("hidden",count>0);$("cart-footer").classList.toggle("hidden",count===0);
  $("cart-restaurant").textContent=count?`ORDERING FROM ${cart[0].restaurantName.toUpperCase()}`:"";
  $("cart-items").innerHTML=cart.map(i=>`<div class="cart-row"><div class="cart-food-emoji">${i.emoji}</div><div class="cart-item-details"><strong>${i.name}</strong><small>${money(i.price)} each</small></div><div class="qty-control"><button data-qty="-1" data-id="${i.id}" aria-label="Remove one ${i.name}">−</button><span>${i.qty}</span><button data-qty="1" data-id="${i.id}" aria-label="Add one ${i.name}">+</button></div></div>`).join("");
  $("subtotal").textContent=money(subtotal);$("delivery-fee").textContent=money(fee);$("total").textContent=money(subtotal+fee);$("checkout-total").textContent=money(subtotal+fee);
}
document.addEventListener("click",e=>{
  const fav=e.target.closest("[data-favorite]");if(fav){e.stopPropagation();const id=fav.dataset.favorite;favorites.has(id)?favorites.delete(id):favorites.add(id);renderRestaurants();return}
  const card=e.target.closest("[data-restaurant]");if(card){openRestaurant(card.dataset.restaurant);return}
  const add=e.target.closest("[data-add]");if(add){addToCart(add.dataset.add);return}
  const qty=e.target.closest("[data-qty]");if(qty){const item=cart.find(i=>i.id===qty.dataset.id);if(item){item.qty+=Number(qty.dataset.qty);if(item.qty<=0)cart=cart.filter(i=>i.id!==item.id);renderCart()}return}
});
$("category-row").addEventListener("click",e=>{const btn=e.target.closest("[data-category]");if(!btn)return;activeCategory=btn.dataset.category;document.querySelectorAll(".category").forEach(b=>b.classList.toggle("active",b===btn));renderRestaurants()});
$("search-input").addEventListener("input",renderRestaurants);
$("reset-search").addEventListener("click",()=>{$("search-input").value="";activeCategory="All";document.querySelectorAll(".category").forEach(b=>b.classList.toggle("active",b.dataset.category==="All"));renderRestaurants()});
$("open-cart").addEventListener("click",openCart);$("close-cart").addEventListener("click",closeCart);
$("browse-food").addEventListener("click",()=>{closeCart();$("restaurants").scrollIntoView({behavior:"smooth"})});
$("close-restaurant").addEventListener("click",closeModals);$("overlay").addEventListener("click",()=>{closeCart();closeModals()});
$("checkout-button").addEventListener("click",()=>{closeCart();$("checkout-modal").classList.remove("hidden");showOverlay()});
$("close-checkout").addEventListener("click",closeModals);
$("checkout-form").addEventListener("submit",e=>{
  e.preventDefault();if(!cart.length)return;
  const form=new FormData(e.target),orderId="CR"+Math.floor(10000+Math.random()*90000),name=form.get("name");
  $("checkout-modal").classList.add("hidden");$("overlay").classList.add("hidden");closeCart();
  alert(`Thank you, ${name}!\\n\\nYour demo order ${orderId} has been created.\\nRestaurant: ${cart[0].restaurantName}\\nTotal: ${$("checkout-total").textContent}\\n\\nThis is a front-end demo. No order was sent to a restaurant and no payment was taken.`);
  cart=[];renderCart();e.target.reset();showToast(`Demo order ${orderId} complete`);
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeCart();closeModals()}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("search-input").focus()}if(e.key==="Enter"&&e.target.matches(".restaurant-card"))openRestaurant(e.target.dataset.restaurant)});
renderRestaurants();renderCart();