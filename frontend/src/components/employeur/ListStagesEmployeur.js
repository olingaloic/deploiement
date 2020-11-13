import React, { Component } from 'react';
import StageService from '../../service/StageService';


export default class ListStagesEmployeur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: [],
            employeurId: ""
        };

        this.addStage = this.addStage.bind(this);
    }

    addStage() {

        this.props.history.push('/createStage')
    }

    componentDidMount() {
        var id;
        if (localStorage.getItem("desc") === "Employeur")
            id = localStorage.getItem("id");

        StageService.getStagesByEmployeurId(id).then((res) => { this.setState({ stage: res.data }) })
    }
    render() {
        return (

            <div className="container">
                <div className="col">
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
                                        <th> Veto </th>
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

