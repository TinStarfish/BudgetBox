console.log("Cart script activating...");
console.log("Cart script successfullly loaded!")

var cart = [];
var runningTotal = 0;
var salesTax = .05;
var shippingCost = 10;
var flatShippingRate = 10;
var discount = 10;

var cartText = document.getElementById("itemsTable");
var runningText = document.getElementById("totalTable");
var finalCartText = document.getElementById("finalCart");

var finalTotalText = document.getElementById("finalRunningTotal");
var taxText = document.getElementById("salesTaxText");
var shippingText = document.getElementById("shippingText");
var discountText = document.getElementById("discountText");
var checkoutTotalText = document.getElementById("finalTotal");

var customerInfo;

function getProducts() {
	console.log("Running getProducts.");
	var myProducts = JSON.parse(products);
	createTable(myProducts);
}

window.onkeyup = function(e) {
    var key = e.keyCode;
    if (key == 13) {
        console.log("ENTER");
        
        
    }
    console.log("NOT ENTER");
    
}

function createTable(myProducts) {
	console.log("Running createTable.");
	var products = myProducts;
	var myTable = "<table><thead><tr>";
	myTable+="<th scope=\"col\">Product Name</th>";
	myTable+="<th scope=\"col\">Price</th>";
	myTable+="</tr></thead><tbody>";
	
	for (i = 0; i < products.length; i++) {
		myTable+="<tr><td>";
		myTable+=products[i].name;
		myTable+="</td><td>$";
		myTable+=products[i].price;
		myTable+="</td></tr>";
	}
	myTable+="</tbody></table>";
	
	document.getElementById('myItems').innerHTML = myTable;
}

function getCart() { 
    return sessionStorage.getItem("Cart");
    //return cart;
    
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
    
    for (i = 0; i <= cart.length; i++) {
        for (j = 1; j <= cart.length; j++) {
            cartText.rows[j].cells[i].innerHTML = getCart();
        
            }
    }
    
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
    
    finalCartText.innerHTML = getCart();
    
    var total = getTotal();
    var tax = Math.round(getTotal() * getSalesTax() * 100)/100;
    var shipping = Math.round(getShippingCost(shippingCost));
    var final = Math.round(total + tax + shipping - discount) ;
    console.log(getCart());
    finalCartText.innerHTML = getCart();
    console.log(getTotal());
    finalTotalText.innerHTML = "Total: " + getTotal();
    taxText.innerHTML = "Tax: +" + tax;
    shippingText.innerHTML = "Shipping: +" + shipping;
    discountText.innerHTML = "Discount: -" + discount + " (Sign up for a discount on your first order!)";
    checkoutTotalText.innerHTML = "Final Amount:    $" + final;
        
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
    
    //This will interact with Amazon Pay, ignore
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

setShippingCost();
finalCart();