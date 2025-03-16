import { renderPaymentSummary } from "../../script/checkout/paymentSummary.js";
import { reloadCart } from "../../data/cart.js";

describe('test suite: payment summary test', ()=>{

    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"

    beforeEach(()=>{
        spyOn(localStorage, 'setItem');

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

        document.querySelector('.js-payment-summary-test')
        .innerHTML = `
        <div class="js-payment-summary"></div>
        `

        renderPaymentSummary();
    })

    afterEach(()=>{
        document.querySelector('.js-payment-summary-test')
        .innerHTML=''
    })

    it('no of items', ()=>{
        expect(document.querySelector(
            '.js-payment-summary-row'
        ).innerText).toContain('Items (3)')
    })
})