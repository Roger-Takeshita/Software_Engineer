import React from 'react';

const ColorPicker = ({selColorIdx, colors}) => (
  <div>
    {colors.map(color => (
      <button key={color}> {color} </button>
    ))}
    
    {/* //! More than one line of code, i have to use the return() */}
      {/* {colors.map(color => {
        return(<button key={color}> {color} </button>)
      })} */}

    {/* //! Hard way o create the butons */}
      {/* <button> {colors[0]} </button>
      <button> {colors[1]} </button>
      <button> {colors[2]} </button>
      <button> {colors[3]} </button> */}
  </div>
);

export default ColorPicker;
