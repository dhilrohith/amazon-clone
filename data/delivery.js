import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
    {
        id: '1',
        days: '7',
        priceCents: 0
    },
    {
        id: '2',
        days: '3',
        priceCents: 499
    },
    {
        id: '3',
        days: '1',
        priceCents: 999
    }
]

// gets deliveroptionId from cart and
// and matches with deliveryOptions
// objects and returns the matched
// object
export function getDeliveryOption(deliveryOptionId){
    let dateOption;

        deliveryOptions.forEach((deliveryOption) => {
            if (deliveryOption.id === deliveryOptionId) {
                dateOption = deliveryOption;
            }
        })

        return dateOption;
}

// converts the date to nedde format and
// checks for if saturday or sunday delivery
// and manages the delivery day.
export  function dateCalculator(deliveryDay) {
    let date = dayjs();
    
    let daysAdded = 0;

    console.log(date.day(0).format('dddd'));
    
    while(daysAdded < deliveryDay){
        date = date.add(1, 'day')
        if(date.day() !== 0 && date.day() !== 6){
            ++daysAdded;
        }
    }

    return date.format('dddd, MMMM D'); 
}
export default deliveryOptions;