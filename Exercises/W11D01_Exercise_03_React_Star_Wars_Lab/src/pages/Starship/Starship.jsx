import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Starship.module.css';
import { getAllPilots } from '../../services/sw-api';
import Pilots from '../../components/Pilots/Pilots';

class Starship extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pilotsNames: [],
        }
    }

    async componentDidMount() {
        let pilots = [];
        if (this.props.starships[this.props.match.params.idx].pilots.length > 0) {
            for (let i = 0 ; i < this.props.starships[this.props.match.params.idx].pilots.length ; i++) {
                const data = await getAllPilots(this.props.starships[this.props.match.params.idx].pilots[i])
                pilots.push(data.name);
            }
            this.setState({pilotsNames: pilots})
        }
    }

    render() {
        // console.log(this.props.starships[this.props.match.params.idx])
        // if (typeof this.props.starships[this.props.match.params.idx] !== undefined) {
            if (this.props.starships[this.props.match.params.idx].pilots.length === this.state.pilotsNames.length) {
                return (
                    <div className={styles.StarshipDiv}>
                        <div className={styles.Starship}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>NAME:</td>
                                    <td>{this.props.starships[this.props.match.params.idx].name}</td>
                                </tr>
                                <tr>
                                    <td>MODEL:</td>
                                    <td>{this.props.starships[this.props.match.params.idx].model}</td>
                                </tr>
                                <tr>
                                    <td>PILOTS:</td>
                                    <td></td>
                                </tr>
                                <Pilots pilots={this.state.pilotsNames}/>
                                </tbody>
                            </table>
                            <Link to='/starships/' className={styles.StarshipLink}>Return</Link>
                        </div>
                    </div>
                )
            } else {
                return (
                    <h1>Loading pilots...</h1>
                )
            }
        // } else {
        //     return (
        //         <h1>Starship not found</h1>
        //     )
        // }
    }
}

export default Starship;