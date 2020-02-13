import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Starship.module.css';

const Starship = (props) => {
    return(
        <div className={styles.StarshipDiv}>
            <div className={styles.Starship}>
                <table>
                    <tr>
                        <td>NAME:</td>
                        <td>{props.starships[props.location.state.idx].name}</td>
                    </tr>
                    <tr>
                        <td>MODEL:</td>
                        <td>{props.starships[props.location.state.idx].model}</td>
                    </tr>
                    <tr>
                        <Link to='/starships/' className={styles.StarshipLink}>Return</Link>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default Starship;