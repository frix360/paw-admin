import React, {Component} from 'react'
import axios from 'axios';
import qs from 'qs'
import config from '../../config';
import { Route, Link} from "react-router-dom";


export default class UserCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                isShelter: false

            }

        };

        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    render() {
        return (
            <div style={{width: '50%'}}>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="text" name="email" placeholder="Email" value={this.state.form.email} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">First name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Text input" name="firstName" value={this.state.form.firstName} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Last name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Text input" name="lastName" value={this.state.form.lastName} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" name="password" placeholder="Password" value={this.state.form.password} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="checkbox">
                            <input type="checkbox" name="isShelter" checked={this.state.form.isShelter}  onChange={this.handleChange}/>
                               Is shelter?
                        </label>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button onClick={this.submitForm} className="button is-link">Submit</button>
                    </div>
                </div>
            </div>
        )
    }

    handleChange(e) {
        e.persist();

        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                [e.target.name]: value
            }
        }))
    }

    submitForm() {
        axios.post(`http://${config.FETCH_URL}/api/v1/users`, this.state.form)
            .then(response => {
                this.props.history.push('/users/');
            })
            .catch(error => {
                console.log(error)
            })
    }
}
