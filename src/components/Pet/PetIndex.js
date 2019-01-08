import React, {Component} from 'react'
import axios from 'axios';
import config from '../../config';
import { Route, Link} from "react-router-dom";

export default class PetIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: []
        };

    }

    componentDidMount() {
        this.fetchPets();
    }


    render() {
        const rows = this.state.pets.map((pet) => (
            <tr>
                <td>{pet.name}</td>
                <td>{pet.petType.name}</td>
                <td>{pet.breed}</td>
                <td>{pet.description}</td>
                <td>
                    <button className='button' onClick={() => this.deletePet(pet._id)}>Delete</button>
                </td>
            </tr>
        ));
        return (
            <div>
                <Link className="button is-pulled-left" to="/pets/create/">Add Pet</Link>
                <table className="table is-fullwidth">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Breed</th>
                        <th>Description</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        )
    }

    fetchPets() {
        axios.get(`http://${config.FETCH_URL}/api/v1/pets`)
            .then(response => {
                this.setState({pets: response.data})
            })
            .catch(error => {

            })
    }

    deletePet(id) {
        axios.delete(`http://${config.FETCH_URL}/api/v1/pets/${id}`)
            .then(response => {
                this.setState({pets: this.state.pets.filter(pet => pet._id !== id)});
            })
            .catch(error => {
                console.log(error);
            })
    }
}
