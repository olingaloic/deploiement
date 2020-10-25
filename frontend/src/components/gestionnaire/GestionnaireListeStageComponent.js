import React, { Component } from 'react';
import StageService from '../../service/StageService';

export default class GestionnaireListStageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { stages: [] };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(id){
        this.props.history.push('/stageSelectEtudiants/' + id);
    }
    
    async componentDidMount() {
            const { data: stages } = await StageService.getStagesApprouves();
            this.setState({ stages });
    }

    render() {

        return (
            <div>
                <div className="pt-3 mt-3">
                    <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Liste des stages approuvées</h5>

                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Titre </th>
                                    <th> Programme </th>
                                    <th> Date Début </th>
                                    <th> Date Finale </th>
                                    <th> Ville </th>
                                    <th> Heures par semaine </th>
                                    <th> Assigner étudiant(s) </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.stages
                                    .filter(stage => stage.ouvert)
                                    .map(
                                        stage =>
                                        <tr key={stage.id}>
                                            <td>{stage.titre}</td>
                                            <td>{stage.programme}</td>
                                            <td>{stage.dateDebut}</td>
                                            <td>{stage.dateFin}</td>
                                            <td>{stage.ville}</td>
                                            <td>{stage.nbHeuresParSemaine}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => this.handleClick(stage.id)} >
                                                    Assigner
                                                </button>
                                            </td>
                                        </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}