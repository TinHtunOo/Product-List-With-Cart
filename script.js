const menuBox = document.querySelector(".menu-box");

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
  { name: "Waffle with Berries", type: "Waffle", price: "6.50" },
  { name: "Vanilla Bean Crème Brûlée", type: "Crème Brûlée", price: "7.00" },
  { name: "Macaron Mix of Five", type: "Macaron", price: "8.00" },
  { name: "Classic Tiramisu", type: "Tiramisu", price: "5.50" },
  { name: "Pistachio Baklava", type: "Baklava", price: "4.00" },
  { name: "Lemon Meringue Pie", type: "Pie", price: "5.00" },
  { name: "Red Velvet Cake", type: "Cake", price: "4.50" },
  { name: "Salted Caramel Brownie", type: "Brownie", price: "4.50" },
  { name: "Vanilla Panna Cotta", type: "Panna Cotta", price: "6.50" },
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
        orderDisplay ++;
        plusBtn.previousSibling.textContent = orderDisplay;
    })
})

minusBtns.forEach((minusBtn)=>{
    minusBtn.addEventListener('click', ()=>{
        let orderDisplay =  Number(minusBtn.nextSibling.textContent);
        if (minusBtn.nextSibling.textContent == 0){
            return
        } else {
            orderDisplay --;
            minusBtn.nextSibling.textContent = orderDisplay;
        }
    })
})



window.addEventListener("resize", () => restoreImg());
