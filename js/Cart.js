// Cart.js
// load the body first before creating the Cart object
// written by Ken

// use getElementsByClassName() method to get a collection of elements having the name 'cart-remove-btn' in the page 
// store all these elements in the array referenced by variable removeBtns
var removeBtns = document.getElementsByClassName('cart-remove-btn');
// then loop through each of the remove button in the removeBtns array
for (var i=0; i<removeBtns.length; i++) {
    var removeBtn = removeBtns[i];
    removeBtn.addEventListener('click', removeItem); // when the remove button is clicked, call the removeItem function (event handler)
}

var qtyInputs = document.getElementsByClassName('cart-qty-input');
for (var i=0; i<qtyInputs.length; i++) {
    var input = qtyInputs[i];
    input.addEventListener('change', qtyValid); // check if the quantity is a valid number after quantity input is changed
}

var addBtns = document.getElementsByClassName('cart-add-btn');
for (var i = 0; i<addBtns.length; i++) {
    var addBtn = addBtns[i];
    addBtn.addEventListener('click', fetchData); // fetch the data from the store after "Add to Cart" button is clicked
}

function removeItem(event) {
    var removeClicked = event.target; // the remove button clicked is the event.target (object that triggers the event)
    removeClicked.parentElement.parentElement.parentElement.remove(); // remove the whole table row
    updateTotal(); // update total price of all the merchandise with the function updateTotal()
}

function qtyValid(event) {
    input = event.target;
    // make sure the quantity input is always a number greater than or equal to 1
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal(); // update total price
}

// get the data of individual shop item that is added to cart
function fetchData(event) {
    var addBtn = event.target;
    var shopItem = addBtn.parentElement.parentElement.parentElement;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    var brandName = shopItem.getElementsByClassName('brand-name')[0].innerText;
    var productName = shopItem.getElementsByClassName('product-name')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    // console.log(imageSrc, brandName, productName, price);
    addItem(imageSrc, brandName, productName, price);
}

function addItem(imageSrc, brandName, productName, price) {
    var cartRow = document.createElement('tr');
    cartRow.innerText = brandName;
    var cartTable = document.getElementsByClassName('cart-table')[0];
    console.log(cartTable)
    cartTable.append(cartRow);
}


function updateTotal() {
    var priceArray = document.getElementsByClassName('shop-item-price');
    var total = 0; // initial total price is 0
    // get the price and quantity of each cart item 
    for (var i=0; i<priceArray.length; i++) {
        var priceElement = priceArray[i];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        /*
        var str = priceElement.innerText; // get the innerText of the priceElement and store it into variable str
        console.log(str); // the str actually contains dollar sign which is undesirable
        var price = str.replace('$', ''); // remove the dollar sign from the str object by using replace() method
        parseFloat(price); // turn the str referenced by variable price into a floating point no.
        // should use a complex expression shown above to save memory space
        // because repleace() method does not change the original str and return a new str
        */   
        var qtyElement = qtyInputs[i];
        var qty = qtyElement.value;
        total += price * qty; // get the total price at every iteration 
    }
    total = Math.round(total * 100) / 100; // round the total price to 2 decimal places
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total; // display the total price in the cart
}































