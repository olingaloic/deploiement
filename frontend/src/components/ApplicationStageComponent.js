import React, { Component } from 'react';
import StageService from '../service/StageService';
import EtudiantService from "../service/EtudiantService";
import CandidatureService from "../service/CandidatureService";

export default class ApplicationStageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stages: [],
            etudiant: "",
            hasValidCV: false,
            hasApplied:""
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        var id;
        if (localStorage.getItem("desc") == "Etudiant")
            id = localStorage.getItem("id");
        const {data: etudiant} = await EtudiantService.getEtudiantById(id);
        this.setState({etudiant: etudiant});
        StageService.getStagesEtudiant(id).then((res) => { this.setState({ stages: res.data }) })
        if (this.state.etudiant.cv == undefined){
            this.setState({ hasValidCV: false});
        }
        else {
            if (this.state.etudiant.cv.status == 'APPROVED'){
                this.setState({ hasValidCV: true});
            }
            else {
                this.setState({ hasValidCV: false});
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        var idEtudiant;
        if (localStorage.getItem("desc") == "Etudiant")
            idEtudiant = localStorage.getItem("id");
        var idStage = event.target.value
        this.setState({hasApplied: true});
        CandidatureService.post(idEtudiant, idStage)
        setTimeout(function() {
            window.location.reload();
        }, 1000);
    }
    displayWarningMessage() {
        if(this.state.stages.length != 0){
            if (this.state.etudiant.cv == null)
                return <label>Vous ne pourrez pas postuler si vous n'avez pas de CV.</label>
            if (!this.state.hasValidCV)
                return <label>Vous ne pourrez pas postuler si votre CV n'a pas été approuvé.</label>
        }
        else {
                return <label>Aucune offre de stage n'est disponible pour vous.</label>
        }
    }

    render() {
        return (
            <form className="d-flex flex-column">
            <div className="container">
                <div className="col">
                    <div className="pt-3 mt-3">
                        <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Offres de stage</h5>

                        <div className="row">

                            <table className="table table-striped table-bordered">
                                <thead>
                                <tr >
                                    <th> Titre </th>
                                    <th> Programme </th>
                                    <th> Description </th>
                                    <th> Date de début </th>
                                    <th> Date finale </th>
                                    <th> Ville </th>
                                    <th> Nombre d'heures par semaine </th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.stages.map(
                                    stage =>
                                        <tr key={stage.id}>
                                            <td>{stage.titre}</td>
                                            <td>{stage.programme}</td>
                                            <td>{stage.description}</td>
                                            <td>{stage.dateDebut}</td>
                                            <td>{stage.dateFin}</td>
                                            <td>{stage.ville}</td>
                                            <td>{stage.nbHeuresParSemaine}</td>
                                            {this.state.hasValidCV ?
                                                <td>
                                                    <button type="submit" className="btn btn-primary" value={stage.id} onClick={this.handleSubmit}>Postuler</button>
                                                </td> : null
                                            }
                                        </tr>
                                )}
                                </tbody>
                            </table>
                            {(this.displayWarningMessage())}<br/>

                            {this.state.hasApplied? <label style={{color: "green"}}>Vous venez de postuler au stage</label>: null}<br/>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        );
    }
}

