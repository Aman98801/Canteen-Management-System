if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

let cartItemsList = [];
let ordererName = 'Lucy Adam';
let ordererPhone = '5965956849';

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    var userName = document.getElementById("userName").value;
    var userNumber = document.getElementById("userNumber").value;
    var userEnrollmentNo = document.getElementById("userEnrollmentNo").value;
    var userSEM = document.getElementById("userSEM").value;

    if (cartItemsList == [] || userName == '' || userNumber == '' || userEnrollmentNo == '' || userSEM == '') {
        console.log('All  Empty Items');

        alert('Fill All The Fileds')
    }else{
        
    // ******************//***************************************** */
    // this Code Used for Send Data to backend API to DataBase

    // console.log(cartItemsList);
    var cartItemsForDB;

    if(cartItemsList != []){
        cartItemsForDB = cartItemsList;
    }else{
        cartItemsForDB = [
            {'itemID':'1', 'itemName':'Sample Data', 'itemPrice':'20',  'itemQuantity':'20',},
            
        ];
    }

    const url = "/data";
    let UserData = {
        'orderTime': new Date().toLocaleString(), 
        'name': userName, // ordererName let for name 
        'PhoneNumber':userNumber, // ordererName var for Phone Number
        'userSEM': userSEM,
        'userEnrollmentNo': userEnrollmentNo, 
        'orderItems': cartItemsForDB,
    }
    
    fetch(url, {
        method : "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        body: JSON.stringify(UserData) // send this Data
    }).then(function (response) {
        return response.json(); // call the json method on the response to get JSON
    })
    .then(function (json) {
        console.log(json)
    })
    

    // ******************//***************************************** */
    
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

}
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    // console.log(cartRows); /// 125

    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        // console.log(cartRow); 
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        console.log(priceElement); //
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        console.log(quantityElement); //
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        console.log(quantity); //
        total = total + (price * quantity)

    }
    cartItemsList =[];
    
    for (var k = 0; k < cartRows.length; k++) {
        var cartRow = cartRows[k]
        // console.log(cartRow); 
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]

        var nameElement = cartRow.getElementsByClassName('cart-item-title')[0]
        var imageSrc = cartRow.getElementsByClassName('cart-item-image')[0].src
        
        var itemName = nameElement.innerText
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        
        console.log(imageSrc); ///

        cartItemsList.push({name:itemName, price:price, quantity:quantity, imageUrl: imageSrc }); // this add cart items to array
    }


    // console.log(cartItemsList); // used to get cart data 

    total = Math.round(total * 100) / 100;
    console.log(total);
    document.getElementsByClassName('cart-total-price')[0].innerText = total
}




















