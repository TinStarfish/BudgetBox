//Code by Trevor Waters (2018)

var modal = document.getElementById('popupProduct');
var modal_user = document.getElementById('popupUser');
var modal_new_product = document.getElementById('popupNewProduct');
var span = document.getElementsByClassName("close")[0];
var productID = document.getElementById("productID_new");
var nameSetText = document.getElementById("nameSetText");
var priceSetText = document.getElementById("priceSetText");

var productList = [];
var listID = [11];

//View products on admin page
function viewProducts() {    
    console.log("executing viewProducts()...");
	$("productsView").show();
    console.log('End of viewProducts()');
    
}
//View users on admin page
function viewUsers() {
    console.log("executing viewProducts()...");
	$("usersView").show();
    console.log('End of viewProducts()');
    
}

function editProduct (ID, name, price) {  
    modal.style.display = "block";
    
    
}

function editUser (ID, name, admin, current) {
    modal_user.style.display = "block";
    
}

function newProduct () {
    modal_new_product.style.display = "block"; 
    var ID = Math.round((Math.random() * 1000) + (Math.random() * 1000));
    //var ID = 11;
    var name = nameSetText.innerHTML;
    var price = priceSetText.innerHTML;
    

    
    //Assign random ID to product
    for (i = 0; i < listID.length; i++) {
        if (ID==listID[i]) {
            console.log("ID " + ID + " was taken. Rerolling.")
            ID = Math.round((Math.random() * 1000) + (Math.random() * 1000));
            console.log(ID + " is your new ID.")
        
        }
        
    }
    
    if (price <= 0) {
        console.log("Price: " + price + " invalid. Please try again.")   
        
    }
    
    //
    
    productID.innerHTML = "ID: " + ID;
    console.log("ID: " + ID + " successfully assigned.");
    //
    console.log("Name: " + name + " successfully assigned.");
    //
    console.log("Price: " + price + " successfully assigned.");
    
}

function createProduct() {
    
    var product = [
        productID.innerHTML,
        nameSetText.innerHTML,
        priceSetText.innerHTML
        
    ];
    
    productList.push(product);
    sessionStorage.setItem('product',productList);
    console.log(sessionStorage.getItem('product'));
    console.log(productList[0]);
}

function newUser () {
    
    
    
}


span.onclick = function () {
    modal.style.display = "none";
    modal_user.style.display = "none";
    model_new_product.style.display = "none";
    
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
     if (event.target == modal_user) {
        modal_user.style.display = "none";
    }
    
    if (event.target == modal_new_product) {
        modal_new_product.style.display = "none";
        
    }

}
//function 
