let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image){

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

    window.location.href = "cart.html";

}

function loadCart(){

    let cartContainer = document.getElementById("cartItems");

    let total = 0;

    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartContainer.innerHTML += `

        <div class="cart-card">

            <img src="${item.image}">

            <div>
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