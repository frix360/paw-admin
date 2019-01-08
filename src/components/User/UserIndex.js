import React, {Component} from 'react'
import axios from 'axios';
import config from '../../config';
import { Route, Link} from "react-router-dom";

export default class UserIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

    }

    componentDidMount() {
        this.fetchUsers();
    }


    render() {
        const rows = this.state.users.map((user) => (
            <tr>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.isShelter ? 'Yes' : 'No'}</td>
                <td>
                    <button className='button' onClick={() => this.deleteUser(user._id)}>Delete</button>
                </td>
            </tr>
        ));
        return (
            <div>
                <Link className="button is-pulled-left" to="/users/create/">Add User</Link>
                <table className="table is-fullwidth">
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Is shelter?</th>
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

    fetchUsers() {
        axios.get(`http://${config.FETCH_URL}/api/v1/users`)
            .then(response => {
                this.setState({users: response.data})
            })
            .catch(error => {

            })
    }

    deleteUser(id) {
        axios.delete(`http://${config.FETCH_URL}/api/v1/users/${id}`)
            .then(response => {
                this.setState({users: this.state.users.filter(user => user._id !== id)});
            })
            .catch(error => {
                console.log(error);
            })
    }
}
