import React from 'react';

const Pilots = (props) => {
    if (props.pilots.length > 0) {
        return (
            <>
                {props.pilots.map((pilot) => {
                    return (
                        <tr key={pilot}>
                            <td></td>
                            <td>{pilot}</td>
                        </tr>
                    )
                })}
            </>
        );
    } else {
        return (
            <>  
                <tr>
                    <td></td>
                    <td>No Pilots</td>
                </tr>
            </>
        )
    }
};

export default Pilots;