import {calculateCents} from '../../script/utils/calculatePrice.js';

// this suite is nothing group of test cases which means
// this group of test cases title.

console.log(`test suite: formatCurrency`)


console.log('converts cents into dollars')

if(calculateCents(2095) === '20.95'){
    console.log("Passed")
}
else{
    console.log('Failed');
    console.log(calculateCents(2095))
}


console.log('deals with 0')

if(calculateCents(0)=== '0.00'){
    console.log("Passed");
}else{
    console.log("Failed");
}


console.log('rounds up to the nearest cent')

if(calculateCents(2000.5) === '20.01'){
    console.log("Passed")
}else{
    console.log("Failed");
}
