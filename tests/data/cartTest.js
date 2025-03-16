// Testing library- jasmine
// UNIT Tests

import { 
    addToCart, cart, reloadCart, updateDeliveryOption
 } from "../../data/cart.js";

describe('test suite: test add to cart', ()=>{

    beforeEach(()=>{
        // mocking localStorage setItem
        // which creates fake storage
        spyOn(localStorage, 'setItem');
    })

    it(
        `
        increasing cartQuantity when product is
        already in the cart
        `, ()=>{

            // mocking localStorage getItem
            // and uses above created fake storage
            spyOn(localStorage, 'getItem').and
            .callFake(()=>{
                return JSON.stringify([
                    {
                        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                        quantity: 1
                    }
                ]);
            });

            reloadCart();

            addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
            addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
            expect(cart.length).toEqual(1);

            // checks if setItem correctly saves the values.
            expect(localStorage.setItem)
            .toHaveBeenCalledWith(
                'cart', JSON.stringify(
                    [{
                        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        quantity: 3
                    }]
                )
            )

            expect(localStorage.setItem)
            .toHaveBeenCalledTimes(2);

            // prints how many times localstorage
            // .setItems called.
            console.log(
                "localStorage.setItem was called", 
                localStorage.setItem.calls.count(), 
                "times."
            );

            expect(cart[0].productId).toEqual(
                'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
            );

            expect(cart[0].quantity).toEqual(3);
        }
    )

    it(
        'add a product not in the cart', ()=>{
 
            spyOn(localStorage, 'getItem').and
            .callFake(()=>{
                return JSON.stringify([]);
            })

            reloadCart();

            addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
            expect(cart.length).toEqual(1);

            expect(localStorage.setItem)
            .toHaveBeenCalledTimes(1);

            // checks if setItem correctly saves the value.
            expect(localStorage.setItem)
                .toHaveBeenCalledWith('cart', 
                    JSON.stringify(
                        [{
                            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            quantity: 1,
                            deliveryOptionId: '1'
                        }]
                    )   
                )
            
            // prints how many times localstorage
            // .setItems called.
            console.log(
                "localStorage.setItem was called", 
                localStorage.setItem.calls.count(), 
                "times."
            );

            expect(cart[0].productId).toEqual(
                '15b6fc6f-327a-4ec4-896f-486349e85a3d'
            );

            expect(cart[0].quantity).toEqual(1);
        }
        
    )
})

describe(`test suite: updateDeliveryOption`, ()=>{

    beforeEach(()=>{

        spyOn(localStorage, "setItem")

        spyOn(localStorage, "getItem").and
        .callFake(()=>{
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId:"1"
                }
            ])
        })

        reloadCart();
    });

    it("Setting delivery option id", ()=>{
        const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

        updateDeliveryOption(productId, "2");

        expect(cart[0].deliveryOptionId).toEqual('2')

        expect(localStorage.setItem).toHaveBeenCalledWith(
                "cart", JSON.stringify(
                    [{
                        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                        quantity: 1,
                        deliveryOptionId:"2"
                    }]
                )
        );

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it("Update the delivery option of a product that is not in the cart",()=>{
        const productId = '15b6fc6f-327a-4ec4-896f-486349e85a3d'
        updateDeliveryOption(productId, '1');

        expect(cart).toEqual([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId:"1"
            }
        ])

        expect(localStorage.setItem)
        .toHaveBeenCalledTimes(0)
    });

    it("Update the product with delivery option that does not exist",
        ()=>{
            const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c'
            updateDeliveryOption(productId, '4');

            expect(cart).toEqual([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId:"1"
                }
            ]);

            expect(localStorage.setItem)
            .toHaveBeenCalledTimes(0)
        }
    )
})