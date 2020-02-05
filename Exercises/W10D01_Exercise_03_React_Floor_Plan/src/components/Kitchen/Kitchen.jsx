import React from 'react';
import Oven  from '../Oven/Oven';
import Sink  from '../Sink/Sink';

function Kitchen(props) {
  return (
    <div className="kitchen">
      <Oven />
      <Sink />
      <div id="real-kitchen">
        <h5>Kitchen</h5>
      </div>
    </div>
  );
}

export default Kitchen;