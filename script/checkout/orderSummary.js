import {
    cart, removeProduct, updateCartQuantity, updateQuantity,
    updateDeliveryOption
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { calculateCents } from "../utils/calculatePrice.js";
import deliveryOptions from "../../data/delivery.js";
import { getDeliveryOption, dateCalculator } from "../../data/delivery.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
    let jsOrderSummary = document.querySelector(".js-order-summary");

    let orderSummaryHTML = '';
    
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        let deliveryDate;
        const dateOption = getDeliveryOption(
            cartItem.deliveryOptionId
        )

        deliveryDate = dateCalculator(dateOption.days)

        orderSummaryHTML +=
            `<div class="cart-item-container-${matchingProduct.id}
                js-cart-item-container-${matchingProduct.id}
                js-cart-item-container">
                <div class="delivery-date
                js-delivery-date-${matchingProduct.id}"
                data-product-id=${matchingProduct.id}
                >
                    ${deliveryDate}
                </div>
    
                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src=${matchingProduct.image}>
    
                    <div class="cart-item-details">
                    <div class="product-name
                    js-product-name-${matchingProduct.id}">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price
                    js-product-price-${matchingProduct.id}">
                    ${calculateCents(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity
                    js-product-quantity-${matchingProduct.id}">
                        <span>
                            Quantity:
                            <span class="quantity-label
                                js-quantity-label-${matchingProduct.id}">
                                ${cartItem.quantity}
                            </span>
                        </span>
                        <span class="update-quantity-link link-primary
                            js-update-link"
                            data-product-id = ${matchingProduct.id}>
                        Update
                        </span>
                        <input class="quantity-input 
                        js-quantity-input-${matchingProduct.id}"
                        data-product-id=${matchingProduct.id}>
                        <span class="save-quantity-link 
                            link-primary 
                            js-save-link"
                            data-product-id=${matchingProduct.id}
                        >
                            Save
                        </span>
                        <span class="delete-quantity-link link-primary
                        js-delete-link-${matchingProduct.id}"
                            data-product-id=${matchingProduct.id}>
                        Delete
                        </span>
                    </div>
                    </div>
    
                    <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOption(cartItem, matchingProduct.id)}
                    </div>
                </div>
        </div>`

        jsOrderSummary.innerHTML = orderSummaryHTML;

    })

    // shows the cart quantity 
    let countCart = document.querySelector(
        ".js-count-cart"
    )

    countCart.innerHTML = `${updateCartQuantity(cart)} items`

    // creates delivery optionHTML
    function deliveryOption(cartItem, productId) {
        let deliveryOptionHTML = ""
        deliveryOptions.forEach((deliveryOption) => {

            const deliveryDayFormat = dateCalculator(deliveryOption.days)

            const deliverPrice = deliveryOption.priceCents === 0
                ? "FREE Shipping"
                : `$${calculateCents(deliveryOption.priceCents)}`;

            let isChecked = "";

            if (deliveryOption.id === cartItem.deliveryOptionId) {
                isChecked = "checked"
            }

            deliveryOptionHTML += `
                <div class="delivery-option
                js-delivery-option"
                data-product-id=${productId}
                data-option-id=${deliveryOption.id}
                >
                        <input type="radio" ${isChecked}
                        class="delivery-option-input
                        js-delivery-option-input-${
                            cartItem.productId
                        }-${deliveryOption.id}
                        js-delivery-option-input"
                        data-product-id=${productId}
                        data-option-id=${deliveryOption.id}
                        data-option-item=${deliveryOption.days}
                        name=${cartItem.productId}>
                        <div>
                        <div class="delivery-option-date">
                            ${deliveryDayFormat}
                        </div>
                        <div class="delivery-option-price">
                            ${deliverPrice}
                        </div>
                        </div>
                </div>
            `
        })

        return deliveryOptionHTML
    }
    // eventListener for deliveryOption
    // document.querySelectorAll(".js-delivery-option")
    //     .forEach((link)=>{
    //         link.addEventListener("click", ()=>{
    //             const productId = link.dataset.productId;

    //             const deliveryOptionId = 
    //             link.dataset.optionId;

    //             updateDeliveryOption(productId, deliveryOptionId);
    //             const optionDay = link.dataset.optionItem

    //             afterUpdateDate(productId)
    //         })
    //     })


    // managing delivery options
    jsOrderSummary.addEventListener("click", (event) => {
        if (event.target.classList.contains(`js-delivery-option-input`)) {
            const productId = event.target.dataset.productId;

            const deliveryOptionId =
                event.target.dataset.optionId;

            const deliveryDay = event.target.dataset.optionItem

            updateDeliveryOption(productId, deliveryOptionId);

            renderOrderSummary();
            renderPaymentSummary();
            // document.querySelector(`.js-delivery-date-${productId}`)
            //     .innerHTML = dateCalculator(deliveryDay)
        }
    })


    /* 
        adding event listeners to delete button to
        remove the product from cart 
    */
    document.querySelectorAll(".delete-quantity-link")
        .forEach((link) => {
            link.addEventListener("click", () => {
                const productId = link.dataset.productId;
                removeProduct(productId);
                renderPaymentSummary();
                document.querySelector(
                    `.js-cart-item-container-${productId}`
                ).remove();
                countCart.innerHTML = `
                ${updateCartQuantity(cart)} items
                `
            })
        })
    // or
    /*
        jsOrderSummary.addEventListener("click", (event)=>{
            if(event.target.classList = "delete-quantity-link"){
                const productId = event.target.dataset.productId
                removeProduct(productId);
                document.querySelector(`.js-cart-item-container-${productId}`).remove();
            }
        })
    */

    // manages update and save clicks.
    jsOrderSummary.addEventListener("click", (event) => {
        if (event.target.classList.contains("js-update-link")) {
            const productId = event.target.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`)
            container.classList.add("is-editing-quantity");

            // we are taking input
            const quantityInput = document.querySelector(
                `.js-quantity-input-${productId}`
            );

            quantityInput.focus();

            const onEnter = (e) => {
                if (e.key === "Enter") {
                    handleUpdateQuantity(productId, quantityInput);

                    quantityInput.removeEventListener("keydown", onEnter);
                }
            }

            quantityInput.addEventListener("keydown", onEnter);
        }

        //updates delivery day in the top left HTML 
        // else if(event.target.classList.contains(`js-delivery-option-input`)){
        //     const productId = event.target.dataset.productId;
        //     const deliveryDay = event.target.dataset.optionItem
        //     document.querySelector(`.js-delivery-date-${productId}`)
        //         .innerHTML = dateCalculator(deliveryDay)
        // }

        else if (event.target.classList.contains("js-save-link")) {
            const productId = event.target.dataset.productId;

            const quantityInput = document.querySelector(
                `.js-quantity-input-${productId}`
            )

            handleUpdateQuantity(productId, quantityInput);
            renderPaymentSummary();
        }
    })

    // updates the quantity in cart and updates
    // in HTML.
    function handleUpdateQuantity(productId, quantityInput) {
        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        container.classList.remove("is-editing-quantity");

        const newQuantity = Number(quantityInput.value);

        updateQuantity(productId, newQuantity);

        const quantityLabel =
            document.querySelector(
                `.js-quantity-label-${productId}`
            )

        quantityLabel.innerHTML = newQuantity;
        countCart.innerHTML = `${updateCartQuantity(cart)} items`
    }
}
