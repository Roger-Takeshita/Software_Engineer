import React from 'react';
import { Link } from 'react-router-dom';
import styles from './StarshipList.module.css';

const StarshipPage = (props) => {
    return(
        <div className={styles.StarshipList}>
            {props.starships.map((starship, idx) => {
                return(
                    <Link 
                        to={{
                            pathname: `/starships/${idx}`,
                            state: {idx}
                        }}
                        key={starship.name}
                        className={`${styles.StarshipListButton} btn btn-default`}
                    >
                        {starship.name}
                    </Link>
                )
            })}
        </div>
    );
};

export default StarshipPage;