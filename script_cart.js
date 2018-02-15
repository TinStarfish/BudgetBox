console.log("Cart script activating...");
console.log("Cart script successfullly loaded!")

var cart = [];
var cartText = document.getElementById("cartText");

function getCart() { 
    return cart;
    
}

function resetCart() { 
    cart = [];
    cartText.innerHTML = "Empty";
    //updateCart();
    
}

function addCart(item) {   
    cart[cart.length] = item + "\n";
    updateCart();
    
}

function updateCart() {
    
    console.log(getCart());
    cartText.innerHTML = getCart();
    
}