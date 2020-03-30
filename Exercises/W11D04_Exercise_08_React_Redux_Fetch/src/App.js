import React, { useEffect } from 'react';
import './App.css';
import { connect, useDispatch } from 'react-redux';
import apiServices from './utils/apiServices';

function App(props) {
    let dispatch = useDispatch();
    useEffect(() => {
        let cancelFlag = false;
        async function getStudents() {
            try {
                const data = await apiServices.getStudents('https://swapi.co/api/starships');
                if (cancelFlag) return;
                dispatch({
                    type: 'UPDATE_STUDENTS',
                    payload: data['results']
                });
            } catch (err) {
                console.log(err);
            }
        }
        getStudents();
        return () => {
            cancelFlag = true;
        };
    }, []);

    if (props.students.length > 0) {
        console.log(props.students);
        return (
            <div>
                <h1>
                    {props.students.map((student, idx) => {
                        return <li key={idx}>{student.name}</li>;
                    })}
                </h1>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
}

const mapStateToProps = (state) => ({
    students: state.students
});

export default connect(mapStateToProps)(App);
