const menuBox = document.querySelector(".menu-box");
const cartNoItem = document.querySelector(".cart-no-item");
const cartWithItem = document.querySelector(".cart-with-item");
const cartItemBox = document.querySelector(".cart-item-box");
const orderTotal = document.querySelector(".order-total");
const cartCount = document.querySelector(".cart-count");

let add = true;
let cartArray = [];
let totalAmount = [];
let cartCountValue = 0;

const img_array = [
  "waffle",
  "creme-brulee",
  "macaron",
  "tiramisu",
  "baklava",
  "meringue",
  "cake",
  "brownie",
  "panna-cotta",
];

const menuItems = [
  { name: "Waffle with Berries", type: "Waffle", price: "6.50", id: "waffle"},
  { name: "Vanilla Bean Crème Brûlée", type: "Crème Brûlée", price: "7.00", id: "creme-brulee"},
  { name: "Macaron Mix of Five", type: "Macaron", price: "8.00", id: "macaron"},
  { name: "Classic Tiramisu", type: "Tiramisu", price: "5.50", id: "tiramisu"},
  { name: "Pistachio Baklava", type: "Baklava", price: "4.00", id: "baklava"},
  { name: "Lemon Meringue Pie", type: "Pie", price: "5.00", id: "meringue"},
  { name: "Red Velvet Cake", type: "Cake", price: "4.50", id: "cake"},
  { name: "Salted Caramel Brownie", type: "Brownie", price: "4.50", id: "brownie"},
  { name: "Vanilla Panna Cotta", type: "Panna Cotta", price: "6.50", id: "panna-cotta"},
];

//create the element form array
function buildElement() {
  menuItems.forEach((anElement) => {
    // Create the main div with class "item"
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    // Create the image element
    const imgElement = document.createElement("img");
    imgElement.className = "image";
    imgElement.src = ``;
    imgElement.alt = "";

    // Create the order box div
    const orderBoxDiv = document.createElement("div");
    orderBoxDiv.className = "order-box";

    // Create the before-click div
    const beforeClickDiv = document.createElement("div");
    beforeClickDiv.className = "before-click";

    // Create the add to cart image
    const addToCartImg = document.createElement("img");
    addToCartImg.src = "./assets/images/icon-add-to-cart.svg";
    addToCartImg.alt = "";

    // Create the add to cart span
    const addToCartSpan = document.createElement("span");
    addToCartSpan.textContent = "Add to Cart";

    // Create the after-click div 
    const afterClickDiv = document.createElement('div'); 
    afterClickDiv.className = 'after-click';
    afterClickDiv.id = anElement.id;

    // Create the minus icon 
    const minusIcon = document.createElement('i');
    minusIcon.className = 'fa-solid fa-circle-minus'; 
    
    // Create the span with number 
    const numberSpan = document.createElement('span'); 
    numberSpan.textContent = '0'; 
    
    // Create the plus icon 
    const plusIcon = document.createElement('i'); 
    plusIcon.className = 'fa-solid fa-circle-plus';

    // Append the image and span to the order box div
    beforeClickDiv.appendChild(addToCartImg);
    beforeClickDiv.appendChild(addToCartSpan);

    afterClickDiv.appendChild(minusIcon);
    afterClickDiv.appendChild(numberSpan);
    afterClickDiv.appendChild(plusIcon);

    orderBoxDiv.appendChild(beforeClickDiv);
    orderBoxDiv.appendChild(afterClickDiv);

    // Create the item info div
    const itemInfoDiv = document.createElement("div");
    itemInfoDiv.className = "item-info";

    // Create the item type span
    const itemTypeSpan = document.createElement("span");
    itemTypeSpan.className = "item-type";
    itemTypeSpan.textContent = `${anElement.type}`;

    // Create the item name span
    const itemNameSpan = document.createElement("span");
    itemNameSpan.className = "item-name";
    itemNameSpan.textContent = `${anElement.name}`;

    // Create the price span
    const priceSpan = document.createElement("span");
    priceSpan.className = "price";
    priceSpan.textContent = `$${anElement.price}`;

    // Append the item type, name, and price to the item info div
    itemInfoDiv.appendChild(itemTypeSpan);
    itemInfoDiv.appendChild(itemNameSpan);
    itemInfoDiv.appendChild(priceSpan);

    // Append all parts to the main item div
    itemDiv.appendChild(imgElement);
    itemDiv.appendChild(orderBoxDiv);
    itemDiv.appendChild(itemInfoDiv);

    // Finally, append the itemDiv to the document body or another container
    menuBox.appendChild(itemDiv);
  });
}

//Restore image
function restoreImg() {
  if (window.innerWidth < 480) {
    changeImg("mobile");
  } else if (window.innerWidth < 768) {
    changeImg("tablet");
  } else {
    changeImg("desktop");
  }
}

// change img for mobile
function changeImg(size) {
  const images = document.querySelectorAll(".image");
  images.forEach((image, index) => {
    image.setAttribute(
      "src",
      `./assets/images/image-${img_array[index]}-${size}.jpg`
    );
  });
}

//Change cart 
function cartOn() {
  cartNoItem.hidden = true;
  cartWithItem.hidden = false;
}

function cartOff() {
  cartNoItem.hidden = false;
  cartWithItem.hidden = true;
}

// create cart item
function creatCart(name, quantity, cartPrice, className){
    // Create the main div with class "cart-item"
    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'cart-item';

    // Create the inner div
    const innerDiv = document.createElement('div');

    // Create the cart item name div
    const cartItemNameDiv = document.createElement('div');
    cartItemNameDiv.className = 'cart-item-name';
    cartItemNameDiv.textContent = `${name}`;

    // Create the cart value div
    const cartValueDiv = document.createElement('div');
    cartValueDiv.className = 'cart-value';
    cartValueDiv.classList.add(`${className}`);

    // Create the quantity span
    const quantitySpan = document.createElement('span');
    quantitySpan.className = 'quantity';
    quantitySpan.textContent = `x${quantity}`;

    // Create the cart price span
    const cartPriceSpan = document.createElement('span');
    cartPriceSpan.className = 'cart-price';
    cartPriceSpan.textContent = `@ $${cartPrice}`;

    // Create the amount span
    const amountSpan = document.createElement('span');
    amountSpan.className = 'amount';
    let totalAmount = (quantity * cartPrice).toFixed(2);
    amountSpan.textContent = `$${totalAmount}`;

    // Append spans to the cart value div
    cartValueDiv.appendChild(quantitySpan);
    cartValueDiv.appendChild(cartPriceSpan);
    cartValueDiv.appendChild(amountSpan);

    // Append cart item name and cart value to the inner div
    innerDiv.appendChild(cartItemNameDiv);
    innerDiv.appendChild(cartValueDiv);

    // Create the icon element
    const iconElement = document.createElement('i');
    iconElement.className = 'fa-regular fa-circle-xmark';

    // Append inner div and icon to the main cart-item div
    cartItemDiv.appendChild(innerDiv);
    cartItemDiv.appendChild(iconElement);

    // Finally, append the cartItemDiv to the document body or another container
    cartItemBox.appendChild(cartItemDiv);
    
}

function createCartItem(btn, orderDisplay){
  let parentID = btn.parentElement.id;  
  let itemInfo = menuItems.find(item => item.id === parentID);
  let name = itemInfo.name;
  let price = itemInfo.price;
  if (add){
    totalAmount.push(Number(price));
  } else {
    totalAmount.push(-Number(price));
  }
  if (!cartArray.includes(parentID)){
    cartArray.push(parentID);
    creatCart(name, orderDisplay , price, itemInfo.id);
    
  } else {
    let itemClass = document.querySelector(`.${parentID}`);
    itemClass.childNodes[0].textContent =  `x${orderDisplay}`;
    itemClass.childNodes[2].textContent =  `$${(orderDisplay * price).toFixed(2)}`;
  }
  updateAmount();
}

function calculateTotal() {
  const sum = totalAmount.reduce((accumulator, currentValue) => { return accumulator + currentValue; }, 0);
  return sum.toFixed(2);
}

function updateAmount() {
  orderTotal.lastChild.textContent =`$${calculateTotal()}`
}

function changeBack(itemID){
  let item = document.querySelector(`#${itemID}`);
      item.style.display = 'none';
      item.previousSibling.style.display = 'flex';
      item.parentElement.style.backgroundColor = 'aliceblue';
      item.childNodes[1].textContent = '0';
}


buildElement();
restoreImg();

const orderBox = document.querySelectorAll('.order-box');
const plusBtns = document.querySelectorAll('.fa-circle-plus');
const minusBtns = document.querySelectorAll('.fa-circle-minus');


orderBox.forEach((box)=>{
    box.addEventListener('click', ()=> {
        box.firstChild.style.display = 'none';
        box.lastChild.style.display = 'flex';
        box.style.backgroundColor = 'var(--Red)';
    })
})

plusBtns.forEach((plusBtn)=>{
    plusBtn.addEventListener('click', ()=>{
        let orderDisplay =  Number(plusBtn.previousSibling.textContent);
        add = true;
        cartOn();
        orderDisplay ++;
        cartCountValue ++;
        cartCount.textContent = cartCountValue;
        plusBtn.previousSibling.textContent = orderDisplay;
        createCartItem(plusBtn, orderDisplay);
    })
})

minusBtns.forEach((minusBtn)=>{
    minusBtn.addEventListener('click', ()=>{
        let orderDisplay =  Number(minusBtn.nextSibling.textContent);
        add = false;
        if (minusBtn.nextSibling.textContent == 0){
          return
        } else {
            orderDisplay --;
            cartCountValue --;
            cartCount.textContent = cartCountValue;
            minusBtn.nextSibling.textContent = orderDisplay;
            createCartItem(minusBtn, orderDisplay);
        }
    })
})

document.body.addEventListener('click', (event) => { 
    if (event.target.classList.contains('fa-circle-xmark')) { 
      let delbtn = event.target; 
      let delNumber = delbtn.previousElementSibling.childNodes[1].childNodes[2].textContent.substring(1); 
      let itemID = delbtn.previousElementSibling.childNodes[1].classList[1]
      let newArray = cartArray.filter(element => element !== itemID);

      changeBack(itemID);

      cartArray = newArray;
      totalAmount.push(-Number(delNumber)); 
      delbtn.parentElement.remove(); 
      updateAmount(); 
      } 
    });

window.addEventListener("resize", () => restoreImg());


