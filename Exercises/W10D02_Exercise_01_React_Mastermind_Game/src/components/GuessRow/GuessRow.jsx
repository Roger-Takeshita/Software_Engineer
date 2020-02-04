import React from 'react';
import GuessPegs from '../GuessPegs/GuessPegs';
import GuessScore from '../GuessScore/GuessScore';
import ScoreButton from '../ScoreButton/ScoreButton';

const GuessRow = ({rowIdx, colors, guess, currentGuess}) => (
  <div className='flex-h'>
    <div>{rowIdx + 1}</div>
    <GuessPegs
      colors={colors}
      code={guess.code}
    />
    { currentGuess ? <ScoreButton /> : <GuessScore /> }
  </div>
);

export default GuessRow;
