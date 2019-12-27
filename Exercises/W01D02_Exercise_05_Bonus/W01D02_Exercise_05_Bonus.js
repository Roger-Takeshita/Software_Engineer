// Bonus question to work on….
// Let’s say we have a restaurant that does take out and dine in orders. We want to make sure that our takeout orders are served on a first come first served basis, and our dine in orders are served that way as well… We have 3 different arrays
// The take-out orders as they were entered into the system and given to the kitchen. (takeOutOrders)
// The dine-in orders as they were entered into the system and given to the kitchen. (dineInOrders)
// Each customer order (from either register) as it was finished by the kitchen. (servedOrders)
// Given all three arrays, write a function to check that the service is first-come, first-served. All food should come out in the same order customers requested it.
// We’ll represent each customer order as a unique integer.
// So for example
// Take Out Orders: [1, 3, 5]
// Dine In Orders: [2, 4, 6]
// Served Orders: [1, 2, 4, 6, 5, 3]
// would not be first-come, first-served, since order 3 was requested before order 5 but order 5 was served first.
// But
// Take Out Orders: [1, 3, 5]
// Dine In Orders: [2, 4, 6]
// Served Orders: [1, 2, 3, 5, 4, 6]
// Would be first come first served

let countTakeOut = countDineIn = 0;
let takeOutOrders = [1, 3, 5];
let dineInOrders = [2, 4, 6];
// let servedOrders = [1, 2, 4, 6, 5, 3]; // Take out not ordered
// let servedOrders = [1, 2, 4, 6, 3, 5]; // Dine in and take out ordered
let servedOrders = [1, 4, 2, 6, 5, 3]; // Dine in not ordered

function checkOrder (takeOut, dineIn, order) {
   for (let i = 0 ; i < order.length ; i++) {
      // console.log(order[i]);  // Check position by position
      if (takeOut.includes(order[i])) {
         if (order[i] === takeOut[countTakeOut]) {
            countTakeOut += 1;
         } else {
            return "Not Ordered";
         }
      } else if (dineIn.includes(order[i])) {
         if (order[i] === dineIn[countDineIn]) {
            countDineIn += 1;
         } else {
            return "Not Ordered";
         }
      }
   }
   return "Ordered";
}

console.log(checkOrder(takeOutOrders, dineInOrders, servedOrders));
console.log(takeOutOrders)