import React, { useState, useEffect } from "react";
import Battery from "../Battery/Battery";
import {register, unregister} from '../../utils/battery';

const BatteryHookContainer = props =>  {
    // const [level, setLevel] =  useState(0.55)               //! State
    // const [charging, setCharging] = useState(false)         //! Added a new state
    const [{level, charging}, setBatteryState] = useState({                     //+ Deconstructing the name of the variables of the array
        level: 0.5,
        charing: false
    })

    function updateBattery (state) {
        setBatteryState(state)
    }

    useEffect(() => {
        register(updateBattery);
        return (
            unregister(updateBattery)
        )
    },[])           //! only runs once
    //})            //+ runs every time
    //},[charging]) //- only runs when 'charging' changes

    return (
        <>
            <Battery level={level} charging={charging} />
            {/* <button onClick={() => setBatteryState({level: level+0.1, charging: false})}>upate</button> */}
        </>
    )
}

export default BatteryHookContainer;
