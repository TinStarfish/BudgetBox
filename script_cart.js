//Code by Trevor Waters (2018)

console.log("Cart script activating...");
console.log("Cart script successfullly loaded!")

var cart = [];
var runningTotal = 0;
var salesTax = .05;
var shippingCost = 10;
var flatShippingRate = 10;
var basicDiscount = 3;

var itemsTable = document.getElementById("itemsTable");
var runningText = document.getElementById("totalTable");
var finalCartText = document.getElementById("finalCart");


var finalItems = document.getElementById("yourItems");
var finalTotalText = document.getElementById("finalRunningTotal");
var taxText = document.getElementById("salesTaxText");
var shippingText = document.getElementById("shippingText");
var discountText = document.getElementById("discountText");
var checkoutTotalText = document.getElementById("finalTotal");

var customerInfo;

//Runs the script
main();

function main () {
    setShippingCost();
    finalTotalText.innerHTML = runningTotal;
    finalCart();   
    
}

function getProducts() {
	console.log("Running getProducts.");
	var myProducts = JSON.parse(products);
	createTable(myProducts);
}

function getCart() {
    var strcart = sessionStorage.getItem("Cart");
    var tempArr = strcart.split(",");
    var temp = [];
    for (var i = 0; i < tempArr.length;) {
        temp[temp.length] = (tempArr[i]);
        i += 3;
        
    }
    
    return temp;
}

function resetCart() { 
    cart = [];
    cartText.innerHTML = "Empty";
    runningTotal = 0;
    runningText.innerHTML = "$0";
    //updateCart();
    
}

function addCart (item, amount, price) {
    itemsTable.insertRow(cart.length + 1).innerHTML = '<tr><td>'+item+'</td><td>'+amount+'</td><td>'+price+'</td></tr>';
    cart[cart.length] = [item , amount, price];
    sessionStorage.setItem("Cart",cart);
    addTotal (price);
    finalTotalText.innerHTML = runningTotal;
    
    
    
}

function addTotal (price) {
    runningTotal += price;
    sessionStorage.setItem("Total",runningTotal);
    
    
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

function setDiscount(discount) {
    salesTax = tax;
    
}

function getDiscount() {
    return discount;
    
}

function setShippingCost(shipping) {
    shippingCost = Math.round(flatShippingRate + (cart.length));
    console.log(shippingCost);
    
}

function getShippingCost() {
    return shippingCost;
    
}

function updateCart() {
    sessionStorage.setItem("Cart",cart);
    console.log(getCart());
    
    cartText.rows[cart.length].cells[0].innerHTML = getCart();
    
}

function updateRunningTotal() {
    sessionStorage.setItem("Total",runningTotal);
    console.log(runningTotal);
    runningText.rows[1].cells[0] = "$" + getTotal();
    
}

function changePage(pageName) {   
    if (window.location !== pageName) {
        window.location = pageName;
    }
    
}

function finalCart() {
   console.log("final cart");
    var items = getCart();
    var total = getTotal();
    var tax = Math.round(total * getSalesTax() * 100)/100;
    var shipping = Math.round(flatShippingRate);
    var discount = basicDiscount;
    var final = (total + tax + shipping - discount);
    
    console.log(items + " " + final);
    
    
    finalItems.innerHTML = items;
    finalTotalText.innerHTML = "Total: " + total;
    taxText.innerHTML = "Tax: " + tax;
    shippingText.innerHTML = "Shipping: " + shipping;
    discountText.innerHTML = "Discount: " + discount + " (signed in discount)";
    checkoutTotalText.innerHTML = final;
    
}

function setCustomerInformation() {  
    var name = document.getElementById("customer_name").value;
    var email = document.getElementById("customer_email").value;
    var phone = document.getElementById("customer_phone").value;
    //var guest = document.getElementById("customer_guest").value;
    var address_1 = document.getElementById("customer_address_1").value;
    var address_2 = document.getElementById("customer_address_2").value;
    var city = document.getElementById("customer_city").value;
    var state = document.getElementById("customer_state").value;
    var zip = document.getElementById("customer_zip").value;
    var country = document.getElementById("customer_country").value;
    var card_type = document.getElementById("customer_card_type").value;
    var CCN = document.getElementById("customer_CCN").value;
    var name_CCN = document.getElementById("customer_CC_Name").value;
    var CC_Exp = document.getElementById("customer_CC_Exp").value;
    var CCV = document.getElementById("customer_CC_CCVCVC").value;
    var cart_amount = getTotal();
    
    return (cart_amount + name + email + phone + address_1 + address_2 + city + state+ zip+ country + card_type + CCN + name_CCN + CC_Exp + CCV);
    

}

function checkInformation () {
    //This will interact with Amazon Pay, ignore for now
    console.log(setCustomerInformation());
    if (setCustomerInformation!==null) {
        console.log("Customer Information was accepted.");
        return true;
        
        } else {
            console.log("Customer Information was rejected.")
            return false;
        }
    
    
    
}

function purchaseItems() {    
    setCustomerInformation();
    checkInformation();
    console.log(customerInfo);
    var thankYouDiv = document.getElementById("thankYouDiv");
    var form = document.getElementById("form");
    
    if (thankYouDiv.style.display=="none") {
        form.style.display = "none";
        thankYouDiv.style.display = "inline";
        
    } else {
        thankYouDiv.style.display = "none";
        form.style.display = "inline";
        
    }
    
}

function cancelPurchase() {
    cart = [];
    finalCartText.innerHTML = "Empty";
    runningTotal = 0;
    finalTotalText.innerHTML = "$0";
    //updateCart();
    changePage('index.html');
    
}

function dropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
            
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
          
          
      }
    }
  }
}

