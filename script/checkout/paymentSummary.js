import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/delivery.js';
import { calculateCents } from '../utils/calculatePrice.js';

export function renderPaymentSummary(){

    let productPriceCents = 0;
    let deliveryPriceCents = 0;
  
    let noOfItems = 0;

    cart.forEach((cartItem)=>{

        noOfItems += cartItem.quantity;

        const productId = cartItem.productId;
        const product = getProduct(productId);

        productPriceCents += product.priceCents*cartItem.quantity;

        const option = getDeliveryOption(
            cartItem.deliveryOptionId
        );

        deliveryPriceCents += option.priceCents;

    })

    const totalPriceCentsBeforeTax = productPriceCents +
     deliveryPriceCents;

    const totalTaxpriceCents =
    totalPriceCentsBeforeTax * 0.1;

    const totalPriceCents =  
    totalPriceCentsBeforeTax 
    +
    totalTaxpriceCents;

    const jsPaymentSummary = document.querySelector(
        `.js-payment-summary`
    );

    const paymentSummaryHTML =
    `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row 
          js-payment-summary-row">
            <div>Items (${
                noOfItems
            }):</div>
            <div class="payment-summary-money">
                $${
                    calculateCents(
                        productPriceCents
                    )
                }
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money
            js-shipping-price">
                $${calculateCents(
                    deliveryPriceCents
                )}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
                $${
                    calculateCents(
                        totalPriceCentsBeforeTax
                    )
                }
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
                $${calculateCents(
                    totalTaxpriceCents
                )}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money
            js-total-price">
            $${calculateCents(
                totalPriceCents
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>

    `

    jsPaymentSummary.innerHTML = paymentSummaryHTML
}