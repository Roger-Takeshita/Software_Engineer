import React from 'react';
import Scores from '../Scores/Scores';

const Students = ({students}) => (
  <div className="students">
    {students.map((student, idx) => {
      return (
        <div>
          <p>Name: {student.name}</p>
          <p>Bio: {student.bio}</p>
          <Scores scores={student.scores} />
        </div>
      )
    })}
  </div>
)

export default Students;