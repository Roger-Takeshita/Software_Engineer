import React from 'react';
	
// function Greeter(props) {       //! Accepts an argument 'props'
//   return (                      //! Always have to return, could be null but has to return something
//     <div>
//       <h1>Greetings Earthling {props.earthling}</h1>
//       <h2>New Greeting</h2>
//       <h3>New New Greeting</h3>
//       <h4>New New New Greeting</h4>
//     </div>
//   );
// }

function Greeter(props) {
  const things = ["Water", "Cattle", "Plutonium", "Gold"];
  return (
    <div>
      <h1>Greetings Earthling, {props.earthling}</h1>
      <h2>We have come {new Date().getDay() === 1 ? "on a Monday" : "in peace"}</h2>
      <h3>Give us your:</h3>
      <ul>{things.map(thing => <li key={thing}>{thing}</li>)}</ul>
    </div>
  );
}

export default Greeter;