import React from 'react';

const Scores = ({scores}) =>  (
  <div className="scores">
    <ul>
      {scores.map((score, idx) => {
        return(
          <li key={idx}>Score: {score.score} ({score.date}) </li>
        )
      })}
    </ul>
  </div>
)

export default Scores;