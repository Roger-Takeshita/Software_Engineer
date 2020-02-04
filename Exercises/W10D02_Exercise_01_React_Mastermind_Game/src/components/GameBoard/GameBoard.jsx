import React from 'react';
import GuessRow from '../GuessRow/GuessRow';

const GameBoard = ({guesses, colors}) => (
  <div>
    {guesses.map((guess, idx) => {
      return(
        <GuessRow 
          guess={guess} 
          colors={colors} 
          key={idx} 
          rowIdx={idx}
          currentGuess={idx === guesses.length - 1} 
        />
      )
    })}
  </div>
);

export default GameBoard;
