//Code by Trevor Waters (2018)
console.log("Admin page loading...");
var modal = document.getElementById('popupProduct');
var modal_user = document.getElementById('popupUser');
var modal_new_product = document.getElementById('popupNewProduct');
var span = document.getElementsByClassName("close")[0];

var productID_new = document.getElementById("productID_new");
var productName_new = document.getElementById("productName_new");
var productPrice_new = document.getElementById("productprice_new");

var productsTable = document.getElementById("productsTable");

var productList = [];
var listID = [11];

console.log("Loaded.");

function loadProducts () {
    var some
    
    
}

function changePage(pageName) {
    if (window.location!=pageName) {
    window.location = pageName;
    }
    
}

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

//Opens new product tab and assigns new product an ID
function newProduct () {
    modal_new_product.style.display = "block"; 
    var ID = Math.round((Math.random() * 1000) + (Math.random() * 1000));

    //Assign randomized ID to product
    for (i = 0; i < listID.length; i++) {
        if (ID==listID[i]) {
            console.log("ID " + ID + " was taken. Rerolling.")
            ID = Math.round((Math.random() * 1000) + (Math.random() * 1000));
            console.log(ID + " is your new ID.")
        
        }   
    }

    productID.innerHTML = "#" + ID;
    
    
    
}

function createProduct() {
    var productId = productID_new.innerHTML;
    var productName = productName_new.innerHTML;
    var productPrice = producPrice_new.innerHTML;
    
    var product = [
        productId,
        productName,
        productPrice
        
        
    ];
    
    console.log("New product- " + product);
    
    productList.push(product);
    sessionStorage.setItem('product',productList);
    console.log(sessionStorage.getItem('product'));
    console.log(productList);

    productsTable.insertRow(productList.length).innerHTML = '<tr><td>'+productId+'</td><td>'+"productName"+'</td><td>'+productPrice+'</td></tr>';
            
    modal_new_product.style.display = "none";
    
}

function newUser () {
    
    
    
}

function setName () {
    console.log("NAME SET");
    
}

function setPrice () {
    console.log("PRICE SET");
    
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
