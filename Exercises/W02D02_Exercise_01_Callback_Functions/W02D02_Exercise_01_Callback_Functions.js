const cars = [
               { make: 'Toyota', yrsOld: 5, mileage: 92399 },
               { make: 'Ford', yrsOld: 12, mileage: 255005 },
               { make: 'Ferrari', yrsOld: 9, mileage: 12966 },
               { make: 'Subaru', yrsOld: 9, mileage: 111266 },
               { make: 'Toyota', yrsOld: 2, mileage: 41888 },
               { make: 'Tesla', yrsOld: 3, mileage: 57720 }
             ];
 
//! --------------------------------Arrow Function
   let result = cars.filter(car => car.mileage > 20000);
x
   result.forEach(obj => {
      console.log(obj);
   });

//! --------------------------------Function
   let result2 = cars.filter(function(car) {
      return car.mileage>20000;
   });

   result2.forEach( newCar => {
      console.log(newCar);
   })