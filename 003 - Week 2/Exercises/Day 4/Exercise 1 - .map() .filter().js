//? Use map to create a new array that adds the string " is awesome" to each element in the array.
//? ["Alex is awesome", "Daniel is awesome", "Shahzad is awesome", "Jim is awesome"]
   
   const instructors = ["Alex", "Daniel", "Shahzad", "Jim"];

   //* Function
      // let newArray = instructors.map( function(instructor) {
      //    return `${instructor} is awesome`
      // })

   //* Arrow Function
      let newArray = instructors.map( (instructor) => `${instructor} is awesome`)

   console.log(newArray);


//? filter out all "jercks"
   const people = ["jerks", "nice people", "jerks", "nice people", "nice people"];

   let newArray1 = people.filter((ppl) => ppl !== "jerks")
   
   console.log(newArray1);