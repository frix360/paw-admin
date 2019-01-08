import React, {Component} from 'react'
import axios from 'axios';
import config from '../../config';
import { Route, Link} from "react-router-dom";

export default class ShelterIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shelters: []
        };

    }

    componentDidMount() {
        this.fetchShelters();
    }


    render() {
        const rows = this.state.shelters.map((shelter) => (
            <tr>
                <td>{shelter.name}</td>
                <td>{shelter.location}</td>
                <td>
                    <button className='button' onClick={() => this.deleteShelter(shelter._id)}>Delete</button>
                </td>
            </tr>
        ));
        return (
            <div>
                <Link className="button is-pulled-left" to="/shelters/create/">Add Shelter</Link>
                <table className="table is-fullwidth">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
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

    fetchShelters() {
        axios.get(`http://${config.FETCH_URL}/api/v1/shelters`)
            .then(response => {
                this.setState({shelters: response.data})
            })
            .catch(error => {

            })
    }

    deleteShelter(id) {
        axios.delete(`http://${config.FETCH_URL}/api/v1/shelters/${id}`)
            .then(response => {
                this.setState({shelters: this.state.shelters.filter(shelter => shelter._id !== id)});
            })
            .catch(error => {
                console.log(error);
            })
    }
}
