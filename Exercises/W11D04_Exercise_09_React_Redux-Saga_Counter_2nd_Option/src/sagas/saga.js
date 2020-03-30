//!                                   ,,
//!                                 `7MM
//!                                   MM
//!          `7Mb,od8  .gP"Ya    ,M""bMM  `7MM  `7MM  `7M'   `MF'      ,pP"Ybd  ,6"Yb.   .P"Ybmmm  ,6"Yb.
//!            MM' "' ,M'   Yb ,AP    MM    MM    MM    `VA ,V'        8I   `" 8)   MM  :MI  I8   8)   MM
//!            MM     8M"""""" 8MI    MM    MM    MM      XMX    mmmmm `YMMMa.  ,pm9MM   WmmmP"    ,pm9MM
//!            MM     YM.    , `Mb    MM    MM    MM    ,V' VA.        L.   I8 8M   MM  8M        8M   MM
//!          .JMML.    `Mbmmd'  `Wbmd"MML.  `Mbod"YML..AM.   .MA.      M9mmmP' `Moo9^Yo. YMMMMMb  `Moo9^Yo.
//!                                                                                     6'     dP
//!                                                                                     Ybmmmd'

import { takeEvery, takeLatest, put, delay } from 'redux-saga/effects';

//! 2nd we release it
function* countUpAsync() {
    //- helper function to simulate a setTimeOut
    yield delay(2000);
    //- put (dispatch) another action
    //? the type has to be different (cannot be the same as 'AGE_UP') other wise you will have an infinity loop
    yield put({ type: 'INCREMENT_ASYNC', payload: 1 });
}

//! 1st we catch it
//+  * is a generator, with a generator we need to call yield inside
export function* watchCountUp() {
    //- takeEvery is a function from redux-saga, it will listen for each event
    // yield takeEvery('INCREMENT', countUpAsync);

    //- takeLatest is a function from redux-saga, it will listen for one click at the time (it will debouncing)
    yield takeLatest('INCREMENT', countUpAsync);
}
