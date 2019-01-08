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

class App extends Component {
    render() {


        const Shelters = () => <h2>About</h2>;
        const Users = () => <h2>Users</h2>;
        const Pets = () => <h2>Pets</h2>;

        return (
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
                    </nav>

                    <Route path="/" exact component={Shelters}/>
                    <Route path="/users/" exact component={UserIndex}/>
                    <Route path="/users/create/" exact component={UserCreate}/>
                    <Route path="/shelters/" exact component={ShelterIndex}/>
                    <Route path="/shelters/create/" exact component={ShelterCreate}/>
                    <Route path="/pets/" exact component={PetIndex}/>
                    <Route path="/pets/create/" exact component={PetCreate}/>
                    <Route path="/petTypes/" exact component={PetTypeIndex}/>
                    <Route path="/petTypes/create/" exact component={PetTypeCreate}/>


                </div>
            </Router>
        );
    }
}

export default App;
