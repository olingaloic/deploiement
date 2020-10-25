import React, { Component } from 'react';
import '../../App.css';
import axios from "axios";

export default class GestionnaireProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {gestionnaire: {}};
    }

    async componentDidMount() {
        var id;
        if (localStorage.getItem("desc") === "Gestionnaire")
            id = localStorage.getItem("id");

        const {data: gestionnaire} = await axios.get(
            "http://localhost:8080/gestionnaires/get?idGestionnaire=" + id
    );
        this.setState({gestionnaire: gestionnaire});
    }

    render() {
        return (

            <div className="container ">
                <div className="col">
                    <div className="card p-3 m-3">
                        <h3>Votre profil</h3><br/>
                        <label>Nom complet : {this.state.gestionnaire.prenom}  {this.state.gestionnaire.nom}</label>
                        <label>Email : {this.state.gestionnaire.email}</label>
                        <label>Téléphone : {this.state.gestionnaire.telephone}</label>
                    </div>
                </div>
            </div>
    
        );
    }
}