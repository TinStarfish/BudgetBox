console.log("Cart script activating...");
console.log("Cart script successfullly loaded!")

var cart = [];
var runningTotal = 0;
var cartText = document.getElementById("cartText");
var runningText = document.getElementById("runningTotal");
var finalCartText = document.getElementById("finalCart");
var finalTotalText = document.getElementById("finalRunningTotal");

function getCart() { 
    return sessionStorage.getItem("Cart");
    //return cart;
    
}

function getTotal() {
    return sessionStorage.getItem("Total");
    
}

function resetCart() { 
    cart = [];
    cartText.innerHTML = "Empty";
    runningTotal = 0;
    runningText.innerHTML = "$0";
    //updateCart();
    
}

function addCart(item, price) {   
    cart[cart.length] = item;
    runningTotal += price;
    updateCart();
    updateRunningTotal();
    
}

function updateCart() {
    sessionStorage.setItem("Cart",cart);
    console.log(getCart());
    cartText.innerHTML = getCart();
    
}

function updateRunningTotal() {
    sessionStorage.setItem("Total",runningTotal);
    console.log(runningTotal);
    runningText.innerHTML = "$" + runningTotal;
    
}

function changePage(pageName) {   
    if (window.location !== pageName) {
        window.location = pageName;
    }
    
}

function finalCart() {
        console.log(getCart());
        finalCartText.innerHTML = getCart();
        console.log(getTotal());
        finalTotalText.innerHTML = "$" + getTotal();
    
}

finalCart();