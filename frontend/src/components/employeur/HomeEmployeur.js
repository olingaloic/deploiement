import React, { Component } from 'react';
import EmployeurService from '../service/EmployeurService'
import CreateStageComponent from './stage/CreateStageComponent';

import AuthService from "../../service/security/auth.service";

class HomeEmployeur extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            employeur: {}, 
            createStage: false, 
            id: AuthService.getTokenDESC().toUpperCase() === "ROLE_EMPLOYEUR" ? AuthService.getTokenId() : '' 
        };
        this.handleCreateStage = this.handleCreateStage.bind(this)
    }

    async componentDidMount() {
        let id = this.state.id;

        EmployeurService.getById(id).then((res) => this.setState({ employeur: res }))
    }

    handleCreateStage() {
        this.setState({ createStage: !this.state.createStage })
    }

    render() {
        const createStage = this.state.createStage;
        let button;
        if (createStage) { button = <button><CreateStageComponent /></button> }

        return (
            <div className="container-fluid">
               
        <h5>Bienvenue employeur {this.state.employeur.id}</h5>

            </div>
        );
    }
}

export default HomeEmployeur;