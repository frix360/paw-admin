import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ShelterIndex from './components/Shelter/ShelterIndex'
import ShelterCreate from './components/Shelter/ShelterCreate'
import PetIndex from './components/Pet/PetIndex'
import PetCreate from './components/Pet/PetCreate'
import PetTypeIndex from './components/PetType/PetTypeIndex'
import PetTypeCreate from './components/PetType/PetTypeCreate'
import UserIndex from './components/User/UserIndex'
import UserCreate from './components/User/UserCreate'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from "axios";
import config from "./config";


class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loggedIn: false,
            email: '',
            password: ''
        }

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }


    componentDidMount() {
        let jwt = localStorage.getItem('jwt');
        if (jwt) {
            this.setState({loggedIn: true});
        } else {
            this.setState({loggedIn: false});
        }

        this.setAuthorizationToken(jwt);
    }

    setAuthorizationToken(token) {
        if(token) {
            axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['authorization'];
        }
    }

    login() {
        axios.post(`http://${config.FETCH_URL}/api/v1/authenticate`, {
            email: this.state.email,
            password: this.state.password
        })
            .then(response => {
                localStorage.setItem('jwt', response.data.token);
                this.setState({loggedIn: true})
            })
            .catch(error => {
                console.log(error)
            })
    }

    logout() {
        this.setAuthorizationToken();
        localStorage.removeItem('jwt');
        this.setState({loggedIn: false});

    }

    render() {

        return (
            this.state.loggedIn ?
                <Router>
                <div className="App">

                    <nav className="navbar" role="navigation" aria-label="main navigation">
                        <div className="navbar-brand">
                            <a className="navbar-item" href="https://bulma.io">
                                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
                            </a>

                            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                               data-target="navbarBasicExample">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>

                        <div id="navbarBasicExample" className="navbar-menu">
                            <div className="navbar-start">
                                <Link className="navbar-item" to='/users/'>
                                    Users
                                </Link>

                                <Link className="navbar-item" to='/shelters/'>
                                    Shelters
                                </Link>

                                <Link className="navbar-item" to='/pets/'>
                                    Pets
                                </Link>
                                <Link className="navbar-item" to='/petTypes/'>
                                    Pet types
                                </Link>
                            </div>

                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <button onClick={this.logout} className="button is-light">
                                        Log out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <Route path="/" exact component={UserIndex}/>
                    <Route path="/users/" exact component={UserIndex}/>
                    <Route path="/users/create/" exact component={UserCreate}/>
                    <Route path="/shelters/" exact component={ShelterIndex}/>
                    <Route path="/shelters/create/" exact component={ShelterCreate}/>
                    <Route path="/pets/" exact component={PetIndex}/>
                    <Route path="/pets/create/" exact component={PetCreate}/>
                    <Route path="/petTypes/" exact component={PetTypeIndex}/>
                    <Route path="/petTypes/create/" exact component={PetTypeCreate}/>


                </div>
            </Router>  :  <div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Email" onChange={event => {this.setState({email: event.target.value})}}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="Password" onChange={event => {this.setState({password: event.target.value})}}/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button className="button is-link" onClick={this.login}>Submit</button>
                        </div>
                    </div>
                </div>


        );
    }
}

export default App;
