let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image){

    let availability = localStorage.getItem(name);

    if(availability === "Unavailable"){
        alert("Sorry! This item is currently unavailable.");
        return;
    }

    let existingItem = cart.find(item => item.name === name);

    if(existingItem){

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Item added to cart!");
}

function loadCart(){

    let cartContainer = document.getElementById("cartItems");

    let total = 0;

    cartContainer.innerHTML = "";

    if(cart.length === 0){

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h3>🛒 Your cart is empty.</h3>
                <a href="menu.html">
                    <button class="confirm-btn">
                        Browse Menu
                    </button>
                </a>
            </div>
        `;

        document.getElementById("totalPrice").style.display = "none";

        document.querySelector(".time-slot").style.display = "none";

        document.querySelector(".confirmOrderBtn").style.display = "none";

        return;
    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartContainer.innerHTML += `

        <div class="cart-card">

            <img src="${item.image}">

            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>

            <div class="quantity">

                <button onclick="decreaseQuantity(${index})">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>

        </div>

        `;

    });

    document.getElementById("totalPrice").innerText =
    "Total: ₹" + total;

}

function increaseQuantity(index){

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

function filterItems(category){

    let items = document.querySelectorAll(".food-card");

    items.forEach(item => {

        if(category === "all"){

            item.style.display = "block";

        }

        else if(item.classList.contains(category)){

            item.style.display = "block";

        }

        else{

            item.style.display = "none";

        }

    });

}

function toggleAvailability(toggle, itemName, textId){

    let statusText =
    document.getElementById(textId);

    if(toggle.checked){

        localStorage.setItem(itemName, "Available");

        statusText.innerText = "Available";

        statusText.style.color = "green";

    }

    else{

        localStorage.setItem(itemName, "Unavailable");

        statusText.innerText = "Unavailable";

        statusText.style.color = "red";

    }

}

function placeOrder(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
        alert("Your cart is empty.");
        return;
    }

    let total = document.getElementById("totalPrice").innerText;

    let timeSlot =
    document.querySelector('.time-slot input').value;

    if(timeSlot === ""){
        alert("Please select a pickup time.");
        return;
    }

    let token = localStorage.getItem("tokenNumber");

    if(!token){
        token = 100;
    }

    token = parseInt(token) + 1;

    localStorage.setItem("tokenNumber", token);

    localStorage.setItem("orderTotal", total);
    localStorage.setItem("orderTime", timeSlot);
    localStorage.setItem("orderToken", token);

    localStorage.removeItem("cart");

    window.location.href = "success.html";
}