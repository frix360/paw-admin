import React, {Component} from 'react'
import axios from 'axios';
import config from '../../config';
import { Route, Link} from "react-router-dom";

export default class PetTypeIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            petTypes: []
        };

    }

    componentDidMount() {
        this.fetchPetTypes();
    }


    render() {
        const rows = this.state.petTypes.map((petType) => (
            <tr>
                <td>{petType.name}</td>
                <td>
                    <button className='button' onClick={() => this.deletePetType(petType._id)}>Delete</button>
                </td>
            </tr>
        ));
        return (
            <div>
                <Link className="button is-pulled-left" to="/petTypes/create/">Add PetType</Link>
                <table className="table is-fullwidth">
                    <thead>
                    <tr>
                        <th>Name</th>
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

    fetchPetTypes() {
        axios.get(`http://${config.FETCH_URL}/api/v1/petTypes`)
            .then(response => {
                this.setState({petTypes: response.data})
            })
            .catch(error => {

            })
    }

    deletePetType(id) {
        axios.delete(`http://${config.FETCH_URL}/api/v1/petTypes/${id}`)
            .then(response => {
                this.setState({petTypes: this.state.petTypes.filter(petType => petType._id !== id)});
            })
            .catch(error => {
                console.log(error);
            })
    }
}
