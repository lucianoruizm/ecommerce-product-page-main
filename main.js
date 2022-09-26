// Section: Change products number with - and +

const minusBtn = document.querySelector('.input__minus');
const plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');

let userInputNumber = 0;

plusBtn.addEventListener('click', ()=>{
    userInputNumber++;
    userInput.value = userInputNumber;
});

minusBtn.addEventListener('click', ()=>{
    userInputNumber--;
    if(userInputNumber <= 0){
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
});

// Add total products to the cart when clicks on ADD TO CART
const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.header__cart--notification');
let lastValue = 0;

addToCartBtn.addEventListener('click', () => {
    lastValue = lastValue + userInputNumber;

    cartNotification.innerText = lastValue;
    cartNotification.style.display = 'block';
    drawProductInModal();
});

//Display details cart modal
const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
// let priceModal = document.querySelector('.cart-modal__price');
const productContainer = document.querySelector('.cart-modal__checkout-container');

cartIconBtn.addEventListener('click', () => {
    cartModal.classList.toggle('show');

    if(lastValue == 0){
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    }else{
        drawProductInModal();
    }

});


// Slide images from the gallery
const imageContainer = document.querySelector('.gallery__image-container');
const previousGalleryBtn = document.querySelector('.gallery__previous');
const nextGalleryBtn = document.querySelector('.gallery__next');
let imgIndex = 1;

nextGalleryBtn.addEventListener('click', ()=> {
    changeNextImg(imageContainer);
})

previousGalleryBtn.addEventListener('click', ()=> {
    changePreviousImg(imageContainer);
})

// Display images modal
const imagesModal = document.querySelector('.modal-gallery__background');
const closeModalBtn = document.querySelector('.modal-gallery__close');

imageContainer.addEventListener('click', ()=>{
    imagesModal.style.display = 'grid';
})

closeModalBtn.addEventListener('click', ()=>{
    imagesModal.style.display = 'none';
})

// Change main images from thumbnails
let thumbnails = document.querySelectorAll('.gallery__thumbnail');
thumbnails = [...thumbnails]

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', event=>{
        imageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id}.jpg')`
    })
})

// Change modal main images from thumbnails
let modalthumbnails = document.querySelectorAll('.modal-gallery__thumbnails');
const modalImageContainer = document.querySelector('.modal-gallery__image-container');
modalthumbnails = [...modalthumbnails]

modalthumbnails.forEach(modalthumbnail => {
    modalthumbnail.addEventListener('click', event=>{
        modalImageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id.slice(-1)}.jpg')`
    });
});

// Slide images from the modal gallery
const previousModalBtn = document.querySelector('.modal-gallery__previous');
const nextModalBtn = document.querySelector('.modal-gallery__next');

nextModalBtn.addEventListener('click', ()=>{
    changeNextImg(modalImageContainer)
});

previousModalBtn.addEventListener('click', ()=>{
    changePreviousImg(modalImageContainer)
});

// Display hamburger menu


// Functions

//Remove product from the cart
function deleteProduct(){
    const deleteProductBtn = document.querySelector('.cart-modal__delete');

    deleteProductBtn.addEventListener('click', () => {
    productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    lastValue = 0;
    cartNotification.innerText = lastValue;
})
}

//Draw content in modal
function drawProductInModal(){
    productContainer.innerHTML =  `
        <div class="cart-modal__checkout-container">
            <div class="cart-modal__details-container">
              <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="thumbnail">
              <div>
                <p class="cart-modal__product">Autumn Limited Edition...</p>
                <p class="cart-modal__price">$125 x3 <span>$375.00</span> </p>
              </div>
              <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete">
            </div>
            <button class="cart-modal__checkout">Checkout</button>
          </div>`
    deleteProduct()
    let priceModal = document.querySelector('.cart-modal__price');
    priceModal.innerHTML = `$125 x${lastValue} <span>$${lastValue*125}.00</span>`
}

//Gallery
function changeNextImg(imgContainer){
    if(imgIndex == 4){
        imgIndex = 1;
    }else{
        imgIndex++;
    }
    imgContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.jpg')`
}

function changePreviousImg(imgContainer){
    if(imgIndex == 1){
        imgIndex = 4;
    }else{
        imgIndex--;
    }
    imgContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.jpg')`
}