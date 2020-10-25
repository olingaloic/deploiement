import React, { Component } from 'react';
import StageService from '../../service/StageService';


export default class ListStagesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: [],
        };
    }


    componentDidMount() {
        StageService.getStages().then((res) => { this.setState({ stage: res.data }) })
    }
    render() {
        return (

            <div >
                <div>
                    <div className="pt-3 mt-3">
                        <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Stages</h5>

                        <div className="row">

                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr >
                                        <th> Titre </th>
                                        <th> Programme </th>
                                        <th> Description </th>
                                        <th> date Début </th>
                                        <th> date Finale </th>
                                        <th> Ville </th>
                                        <th> Heures par semaine </th>
                                        <th> Status </th>
                                        <th> Ouvert </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.stage.map(
                                        stage =>
                                            <tr key={stage.id}>
                                                <td>{stage.titre}</td>
                                                <td>{stage.programme}</td>
                                                <td>{stage.description}</td>
                                                <td>{stage.dateDebut}</td>
                                                <td>{stage.dateFin}</td>
                                                <td>{stage.ville}</td>
                                                <td>{stage.nbHeuresParSemaine}</td>
                                                <td>{stage.approuve
                                                    ? <span className="text-success"> approuvé </span>
                                                    : <span className="text-danger">En attente d'approbation</span>}</td>
                                                <td>{stage.ouvert ? 'Oui' : 'Non'}</td>
                                                
                                            </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

