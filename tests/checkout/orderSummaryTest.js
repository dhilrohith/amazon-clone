// Testing framework- jasmine

// INTEGRATION Testing

// Integration Test = tests many units/pieces of
//                    code working together

import { renderOrderSummary } from "../../script/checkout/orderSummary.js";
import { 
    reloadCart, cart, removeProduct,
    updateDeliveryOption
} from "../../data/cart.js";


const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"

describe('test-suite: orderSummaryTest', ()=>{

    // creates the basic code in all tests before start 
    beforeEach(()=>{
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-order-summary-test')
            .innerHTML = `
            <div class='js-count-cart'></div>

            <div class='js-order-summary'></div>

            <div class='js-payment-summary'></div>
            `
        
        spyOn(localStorage, 'getItem').and
            .callFake(()=>{
                return JSON.stringify(
                    [        
                        {
                            productId: productId1,
                            quantity: 2,
                            deliveryOptionId: '1'
                        },
                        {
                            productId: productId2,
                            quantity: 1,
                            deliveryOptionId: '2'
                        },]
                )
            })
        reloadCart();

        renderOrderSummary();
    })

    afterEach(()=>{
        document.querySelector(`.js-order-summary-test`)
            .innerHTML='';
    })

    it("createsHTML", ()=>{
        
        //  checking no.of products in cart
        expect(document.querySelectorAll('.js-cart-item-container')
        .length).toEqual(2);

        // checking cart Quantity
        expect(document.querySelector(`
            .js-product-quantity-${productId1}
            `).innerText
        ).toContain('Quantity: 2');

        expect(document.querySelector(
            `.js-product-quantity-${productId2}`
        )
        .innerText).toContain('Quantity: 1');

        expect(document.querySelector(`
            .js-product-name-${productId1}
            `).innerText
        ).toEqual
        (
            `Black and Gray Athletic Cotton Socks - 6 Pairs`
        )

        expect(document.querySelector(
            `.js-product-price-${productId1}`
         ).innerText
        ).toEqual(
            '10.90'
        )
    })

    it("delete product", ()=>{

        // automatically triggers the first product 
        // delete  button.
        document.querySelector(`.js-delete-link-${productId1}`)
        .click();

        // checks if one product is available.
        expect(
            document.querySelectorAll(
                '.js-cart-item-container'
            ).length
        ).toEqual(1);

        // checks if first product is deleted.
        expect(
            document.querySelector(
                `.js-cart-item-container-${productId1}`
            )
        ).toEqual(null);

        // checks if 2nd product is available
        expect(document.querySelector(
            `.js-cart-item-container-${productId2}`
        )).not.toEqual(null);

        expect(cart.length).toEqual(1);

        expect(cart[0].productId).toEqual(productId2);
        
        expect(
            document.querySelector(
                `.js-product-name-${productId2}`
            ).innerText
        ).toEqual(
            `Intermediate Size Basketball`
        );

        expect(document.querySelector(
            `.js-product-price-${productId2}`
         ).innerText
        ).toEqual(
            '20.95'
        );
    })
})

describe('test suite: remove from cart',
    ()=>{

        beforeEach(()=>{

            // mock storage
            spyOn(localStorage, 'setItem')

            // mock storage items
            spyOn(localStorage, 'getItem').and
            .callFake(()=>{
                return JSON.stringify(
                    [        
                        {
                            productId: productId1,
                            quantity: 2,
                            deliveryOptionId: '1'
                        }
                    ]
                )
            })

            reloadCart();
        });

        it('removes product from cart', ()=>{
            removeProduct(productId1);

            // if the cart is empty product removed
            expect(cart).toEqual([])

            expect(cart.length).toEqual(0);

            expect(
                localStorage.setItem
            ).toHaveBeenCalledTimes(1);

            expect(
                localStorage.setItem
            ).toHaveBeenCalledWith(
                'cart', JSON.stringify([])
            )
        })
    }
)

describe('test-suite: update delivery option', ()=>{
    beforeEach(()=>{
        spyOn(localStorage, 'setItem')

        document.querySelector('.js-order-summary-test')
            .innerHTML = `
            <div class='js-count-cart'></div>

            <div class='js-order-summary'></div>

            <div class='js-payment-summary'></div>
            `
        spyOn(localStorage, 'getItem')
        .and.callFake(()=>{
            return JSON.stringify(
                [
                    {
                        productId: productId1,
                        quantity: 2,
                        deliveryOptionId: '1'
                    },

                    {
                        productId: productId2,
                        quantity: 1,
                        deliveryOptionId: '2'
                    }
                ]
            )
        })

        reloadCart();
        renderOrderSummary();
    })

    afterEach(()=>{
        document.querySelector(`
            .js-order-summary-test`
        ).innerHTML=''
    })
    it('updates chosen delivery option', ()=>{
        document.querySelector(`
            .js-delivery-option-input-${
                cart[0].productId
            }-${
                3
            }
            `).click()

        expect(cart[0].deliveryOptionId)
        .toEqual('3')


        expect(
            document.querySelector(`
                .js-delivery-option-input-${
                    cart[0].productId
                }-${
                    3
                }
                `).checked
        ).toEqual(true);

        expect(
            document.querySelector(
                `.js-shipping-price`
            ).innerText
        ).toEqual('$14.98');

        expect(
            document.querySelector(
                `.js-total-price`
            ).innerText
        ).toEqual('$63.50')

        expect(cart.length).toEqual(2);

    })
})