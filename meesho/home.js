/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* Menu show */
navToggle.addEventListener("click", () => {
  navMenu.classList.add("show-menu");
});

/* Menu hidden */
navClose.addEventListener("click", () => {
  navMenu.classList.remove("show-menu");
});

/*=============== SEARCH ===============*/
const search = document.getElementById("search"),
  searchBtn = document.getElementById("search-btn"),
  searchClose = document.getElementById("search-close");

/* Search show */
searchBtn.addEventListener("click", () => {
  search.classList.add("show-search");
});

/* Search hidden */
searchClose.addEventListener("click", () => {
  search.classList.remove("show-search");
});

/*=============== LOGIN ===============*/
const login = document.getElementById("login"),
  loginBtn = document.getElementById("login-btn"),
  loginClose = document.getElementById("login-close");

/* Login show */
loginBtn.addEventListener("click", () => {
  login.classList.add("show-login");
});

/* Login hidden */
loginClose.addEventListener("click", () => {
  login.classList.remove("show-login");
});

// Card
let cardIcon = document.querySelector("#card-icon");
let card = document.querySelector(".card");
let closeCard = document.querySelector("#close-card");

// Open Card
cardIcon.onclick = () => {
    card.classList.add("active");
};

// Close Card
closeCard.onclick = () => {
    card.classList.remove("active");
};

// Card Working JS

if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making Function
function ready() {
    // Remove Items From Card
    let removeCardButtons = document.getElementsByClassName("card-remove");
    console.log(removeCardButtons);
    for (let i = 0; i < removeCardButtons.length; i++) {
        let button = removeCardButtons[i];
        button.addEventListener("click", removeCardItem);
    }
    // Quantity Changes
    let quantityInputs = document.getElementsByClassName("card-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add To Card
    let addCard = document.getElementsByClassName("add-card");
    for (let i = 0; i < addCard.length; i++) { 
        let button = addCard[i];
        button.addEventListener("click", addCardClicked);
    }
    // Buy Button Work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

// Buy Button 
function buyButtonClicked() {
    alert("Siparişiniz verildi")
    let cardContent = document.getElementsByClassName("card-content")[0];
    while(cardContent.hasChildNodes()) {
        cardContent.removeChild(cardContent.firstChild);
    }
    updateTotal();
}

// Remove Items From Card
function removeCardItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// Quantity Changes
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Add To Card
function addCardClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCard(title, price, productImg);
    updateTotal();
}

function addProductToCard(title, price, productImg) {
    let cardShopBox = document.createElement("div");
    cardShopBox.classList.add("card-box");
    let cardItems = document.getElementsByClassName("card-content")[0];
    let cardItemsNames = cardItems.getElementsByClassName("card-product-title");
    for (let i = 0; i < cardItemsNames.length; i++) {
        if (cardItemsNames[i].innerText == title) {
            alert("Bu ürünü zaten listeye eklediniz!");
        return;
        }
    }   

let cardBoxContent = `
                        <img src="${productImg}" alt="" class="card-img">
                        <div class="detail-box">
                            <div class="card-product-title">${title}</div>
                            <div class="card-price">${price}</div>
                            <input type="number" value="1" class="card-quantity">
                        </div>  
                        <!-- Remove Card -->
                        <i class='bx bxs-trash card-remove' ></i>`;
cardShopBox.innerHTML = cardBoxContent;
cardItems.append(cardShopBox);
cardShopBox.getElementsByClassName("card-remove")[0].addEventListener("click", removeCardItem);
cardShopBox.getElementsByClassName("card-quantity")[0].addEventListener("change", quantityChanged);
}

// Update Total
function updateTotal() {
    let cardContent = document.getElementsByClassName("card-content")[0];
    let cardBoxes = cardContent.getElementsByClassName("card-box");
    let total = 0;
    for (let i = 0; i < cardBoxes.length; i++) {
        let cardBox = cardBoxes[i];
        let priceElement = cardBox.getElementsByClassName("card-price")[0];
        let quantityElement = cardBox.getElementsByClassName("card-quantity")[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total = total + price * quantity;
    }
        // If price Contain some  Cents Value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    
}