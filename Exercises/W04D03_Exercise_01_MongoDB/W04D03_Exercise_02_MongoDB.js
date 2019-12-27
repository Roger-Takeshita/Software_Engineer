//+ create 5 burgers (at least 3 should be beef)
   db.burger.insert ({ name: 'Regular Burger', meat: 'beef', cheese: 'cheddar', toppings: [{ condiment: 'mayo', vegetable: 'lettuce' }] })
   db.burger.insert ({ name: 'Bourbon Burger', meat: 'beef', cheese: 'guyere', toppings: [{ condiment: 'HP sauce', vegetable: 'red pepper' }] })
   db.burger.insert ({ name: 'Chicken Burger', meat: 'chicken', cheese: 'swiss', toppings: [{ condiment: 'mayo', vegetable: 'spinach' }] })
   db.burger.insert ({ name: 'Lamb Burger', meat: 'lamb', cheese: 'cheddar', toppings: [{ condiment: 'mayo', vegetable: 'tomato' }] })
   db.burger.insert ({ name: 'American Burger', meat: 'beef', cheese: 'cheddar', toppings: [{ condiment: 'ketchup', vegetable: 'french fries' }] })
​
//+ find all the burgers
   db.burger.find({})
​
//+ show just the meat of each burger
   db.burger.find({}, {meat:1})
​
//+ show just the toppings of each burger
   db.burger.find({}, {toppings:1})
​
//+ show everything but the cheese
   db.burger.find({}, {cheese:0})
​
//+ find all the burgers with beef
   db.burger.find( {meat: "beef" })
​
//+ find all the burgers that are not beef
   db.burger.find({ meat:{$ne: "beef"} })
​
//+ find the first burger with cheese
   db.burger.findOne({}, { name: 1 , cheese: 1 })
​
//+ find one and update the first burger with cheese to have a property of 'double cheese'
   db.burger.update({name: 1}, {$set: {doubleCheese: true}})
​
//+ find the burger you updated to have double cheese
   db.burger.find( {doubleCheese: true })
​
//+ find and update all the beef burgers to be 'veggie'
   db.burger.updateMany({meat: "beef"}, {$set: {meat: "veggie"}})
​
//+ delete one of your veggie burgers
//+ WRONG - dELETES ALL : db.burger.remove({meat: 'veggie'})
   db.burger.remove({meat: "veggie", name: "American Burger"})
​
//+ drop the collection
   //- Expected Output
   //- true
      db.burger.drop()
​
//+ drop the database
   //- Expected Output
   //- {
   //-   "dropped": "burgers",
   //-   "ok": 1
   //- }
      db.dropDatabase()
​
//! Bonus
//+ recreate your burgers database and your burger collection
//+ copy paste your insert burgers from above to reseed your database
   db.burger.insert ({ name: 'Regular Burger', meat: 'beef', cheese: 'cheddar', toppings: [{ condiment: 'mayo', vegetable: 'lettuce' }] })
   db.burger.insert ({ name: 'Bourbon Burger', meat: 'beef', cheese: 'guyere', toppings: [{ condiment: 'HP sauce', vegetable: 'red pepper' }] })
   db.burger.insert ({ name: 'Chicken Burger', meat: 'chicken', cheese: 'swiss', toppings: [{ condiment: 'mayo', vegetable: 'spinach' }] })
   db.burger.insert ({ name: 'Lamb Burger', meat: 'lamb', cheese: 'cheddar', toppings: [{ condiment: 'mayo', vegetable: 'tomato' }] })
   db.burger.insert ({ name: 'American Burger', meat: 'beef', cheese: 'cheddar', toppings: [{ condiment: 'ketchup', vegetable: 'french fries' }] })
​
//+ Change the name of the key cheese to 'pumpkinSpice'
   db.burger.updateMany( {}, { $rename: {"cheese": "pumpkinSpice"}})
​
//+ Change the name of the key cheese to 'pumpkinSpice'
   db.burger.updateMany({}, { $rename: { cheese: 'pumpkinSpice' } });

//+ find all the burgers with ketchup (or another topping you used at least once)
   db.burger.find({ toppings: 'ketchup' });

//+ find all the burgers with pickles (or a topping you used more than once) and remove the pickles
   db.burger.updateMany({ toppings: 'pickles' }, { $pull: { toppings: 'pickles' } });

//+ add a topping of 'eggs' to all the beef burgers
//+ note since this db is 'reset' there should be no veggie burgers, all beef burgers should still be intact
   db.burger.updateMany({ meat: 'beef' }, { $push: { toppings: 'eggs' } });

//+ Add a price to each burger, start with $5.00 for each burger
   db.burger.update({}, { $set: { price: 5.0 } }, { multi: true });