import React, {Component} from 'react'
import axios from 'axios';
import qs from 'qs'
import config from '../../config';
import { Route, Link} from "react-router-dom";


export default class PetTypeCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                location: ''
            }
        };

        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    render() {
        return (
            <div style={{width: '50%'}}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" name="name" placeholder="Name" value={this.state.form.name} onChange={this.handleChange}/>
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
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                [e.target.name]: e.target.value
            }
        }))
    }

    submitForm() {
        axios.post(`http://${config.FETCH_URL}/api/v1/petTypes`, this.state.form)
            .then(response => {
                this.props.history.push('/petTypes/');
            })
            .catch(error => {
                console.log(error)
            })
    }
}
