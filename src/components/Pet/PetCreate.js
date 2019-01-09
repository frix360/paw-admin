import React, {Component} from 'react'
import axios from 'axios';
import config from '../../config';
import { Route, Link} from "react-router-dom";


export default class PetCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                petType: '',
                shelter: '',
                breed: '',
                age: '',
                description: '',
                photo: '',
            },
            shelters: [],
            petTypes: []
        };

        this.submitForm = this.submitForm.bind(this);
        this.fetchShelters = this.fetchShelters.bind(this);
        this.fetchPetTypes = this.fetchPetTypes.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        this.fetchShelters();
        this.fetchPetTypes();
    }

    render() {
        const shelterOptions = this.state.shelters.map(shelter => (
            <option value={shelter._id}>{shelter.name}</option>
        ));

        const petTypeOptions = this.state.petTypes.map(petType => (
            <option value={petType._id}>{petType.name}</option>
        ));

        return (
            <div style={{width: '50%'}}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" name="name" placeholder="Name" value={this.state.form.name} onChange={this.handleChange}/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Shelter</label>
                    <div className="control">
                        <div className="select">
                            <select value={this.state.form.shelter} name="shelter" onChange={this.handleChange}>
                                <option value={''}>Select shelter</option>
                                {shelterOptions}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Type</label>
                    <div className="control">
                        <div className="select">
                            <select value={this.state.form.petType} name="petType" onChange={this.handleChange}>
                                <option value={''}>Select pet type</option>
                                {petTypeOptions}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Age</label>
                    <div className="control">
                        <input className="input" type="number" name="age" placeholder="Age" value={this.state.form.age} onChange={this.handleChange}/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Breed</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Breed" name="breed" value={this.state.form.breed} onChange={this.handleChange}/>
                    </div>
                </div>


                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea className="textarea" placeholder="Description" name="description" onChange={this.handleChange}>
                            {this.state.form.description}
                        </textarea>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Image link</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Photo" name="photo" value={this.state.form.photo} onChange={this.handleChange}/>
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

    fetchShelters() {
        axios.get(`http://${config.FETCH_URL}/api/v1/shelters`)
            .then(response => {
                this.setState({shelters: response.data})
            })
            .catch(error => {

            })
    }

    fetchPetTypes() {
        axios.get(`http://${config.FETCH_URL}/api/v1/petTypes`)
            .then(response => {
                this.setState({petTypes: response.data})
            })
            .catch(error => {

            })
    }

    submitForm() {
        axios.post(`http://${config.FETCH_URL}/api/v1/pets`, this.state.form)
            .then(response => {
                this.props.history.push('/pets/');
            })
            .catch(error => {
                console.log(error)
            })
    }
}
