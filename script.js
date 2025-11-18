let cart = [];

function addToCart(productName) {
    cart.push(productName);
    alert(productName + " added to cart!");
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Display cart items
window.onload = function() {
    const cartItems = document.getElementById("cart-items");
    if(cartItems && localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        cartItems.innerHTML = "";
        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            cartItems.appendChild(li);
        });
    }
}

function checkout() {
    if(cart.length === 0){
        alert("Your cart is empty!");
    } else {
        alert("Checkout successful! Items: " + cart.join(", "));
        cart = [];
        localStorage.removeItem("cart");
        location.reload();
    }
}

