// FUNCTION Testing.

import { calculateCents } from "../../script/utils/calculatePrice.js";

describe(' test suite : converts cents to dollars$', ()=>{
    it('converts cents into dollar', ()=>{
        expect(calculateCents(2095)).toEqual('20.95');
    })

    it('handles 0', ()=>{
        expect(calculateCents(0)).toEqual('0.00')
    })

    it('round to the nearest cent', ()=>{
        expect(calculateCents(2000.5)).toEqual('20.01');
        expect(calculateCents(2000.4)).toEqual('20.00')
        expect(calculateCents(-2000.4)).toEqual('-20.00')
    })
})