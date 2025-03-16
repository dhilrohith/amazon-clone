import {deliveryOptions} from './delivery.js';

export let cart ;

reloadCart();

export function reloadCart(){
    cart = JSON.parse(localStorage.getItem("cart")) ||
    [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
        },
    ]
}
    
// this store the products in the cart to the localstorage
function addToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartQuantity(cart){
    let cartQuantity = 0
    cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity
    })
    return cartQuantity
}

/*adds the products in the cart and checks if the 
product is already added, increases the quantity*/
export function addToCart(productId) {

    let matchingItem;

    cart.forEach((item) => {
        if (item.productId === productId) {
            matchingItem = item;
         } 
    })

    if (matchingItem) {
        matchingItem.quantity += 1
    }

    else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        })
    }
    
    addToStorage();
}

export function removeProduct(productId){
    let newArr = [];

    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newArr.push(cartItem);
        }
    })

    cart = newArr;
    addToStorage();
}

export function updateQuantity(productId, newQuantity){
    cart.forEach((cartItem)=>{
        if(cartItem.productId===productId){
            cartItem.quantity = newQuantity;
            addToStorage();
        }
    })

}

export function updateDeliveryOption(productId, deliveryOptionId){

    let matchingItem;

    cart.forEach((cartItem)=>{

        if(cartItem.productId === productId){
            matchingItem = cartItem;

            deliveryOptions.forEach((deliveryOption)=>{
                if(deliveryOption.id === 
                    deliveryOptionId
                ){
                    matchingItem.deliveryOptionId = deliveryOptionId;
                    addToStorage();
                }
            })
        }
    })
}