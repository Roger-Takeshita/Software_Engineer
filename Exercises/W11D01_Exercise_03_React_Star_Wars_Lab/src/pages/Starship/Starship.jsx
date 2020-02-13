import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Starship.module.css';

const Starship = (props) => {
    let idx = props.match.params.idx;
    if (props.starships[idx]) {
        return(
            <div className={styles.StarshipDiv}>
                <div className={styles.Starship}>
                    <table>
                        <tbody>
                        <tr>
                            <td>NAME:</td>
                            <td>{props.starships[idx].name}</td>
                        </tr>
                        <tr>
                            <td>MODEL:</td>
                            <td>{props.starships[idx].model}</td>
                        </tr>
                        </tbody>
                    </table>
                    <Link to='/starships/' className={styles.StarshipLink}>Return</Link>
                </div>
            </div>
        );
    } else {
        return (
            <h1>Starship not found</h1>
        )
    }
};

export default Starship;