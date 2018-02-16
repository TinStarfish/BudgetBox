console.log("Cart script activating...");
console.log("Cart script successfullly loaded!")

var cart = [];
var runningTotal = 0;
var salesTax = .05;
var cartText = document.getElementById("cartText");
var runningText = document.getElementById("runningTotal");
var finalCartText = document.getElementById("finalCart");
var finalTotalText = document.getElementById("finalRunningTotal");
var checkoutTotalText = document.getElementById("finalTotal");
var taxText = document.getElementById("salesTaxText");

function getCart() { 
    return sessionStorage.getItem("Cart");
    //return cart;
    
}

function getTotal() {
    
    return JSON.parse(sessionStorage.getItem("Total"));
    
}

function setSalesTax(tax) {
    
    salesTax = tax;
    
}

function getSalesTax() {
    return salesTax;
    
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
        var total = getTotal();
        var tax = getTotal() * getSalesTax();
        var final = total + tax;
        console.log(getCart());
        finalCartText.innerHTML = getCart();
    
        console.log(getTotal());
        finalTotalText.innerHTML = "Total: $" + getTotal();
        taxText.innerHTML = "Tax: $" + tax;
        checkoutTotalText.innerHTML = "Final Amount: $" + final;
    
}

finalCart();