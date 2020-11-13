import React, { Component } from 'react';
import EtudiantService from '../../service/EtudiantService';
import StageService from '../../service/StageService';
import Stage from '../../model/Stage';
import Etudiant from '../../model/Etudiant';

import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineCheckSquare, AiOutlineCloseSquare } from 'react-icons/ai';

export default class SelectionnerEtudiantComponent extends Component {    
    constructor(props) {
        super(props);
        this.state = { etudiants: [], etudiantsPermis: [], disabledButtons: [], };
        this.addAllEtudiants = this.addAllEtudiants.bind(this);
        this.removeAllEtudiants = this.removeAllEtudiants.bind(this);
        this.confirmerChoix = this.confirmerChoix.bind(this);
        this.annulerChoix = this.annulerChoix.bind(this);
    }

    async componentDidMount() {
        var stage = new Stage();
        stage = await StageService.getStageById(this.props.match.params.id);
        const { data: etudiants } = await EtudiantService.getEtudiantsByProgramme(stage.data.programme);
        this.setState({ etudiants });
        this.setState({ disabledButtons: new Array(this.state.etudiants.length).fill(false)});

        const { data: etudiantsPermis } = await StageService.getEtudiantsByStageId(this.props.match.params.id);
        this.setState({ etudiantsPermis });
 
        var bouttons = new Array(this.state.etudiants.length).fill(false);
        for(let etudiant of this.state.etudiantsPermis){
            bouttons[etudiant.id] = true;
        }
        this.setState({ disabledButtons: bouttons });

        const stageEtudiants = [];
        if (this.state.etudiantsPermis !== []) { 
            for(let etudiant of this.state.etudiantsPermis){
                stageEtudiants[etudiant.id] = etudiant;
            }
        }
        this.setState({ etudiantsPermis: stageEtudiants });
    }

    addAllEtudiants(){
        const etudiants = [];
        for(let etudiant of this.state.etudiants){
            etudiants.push(etudiant);
        }

        var bouttons = new Array(this.state.etudiants.length).fill(false);
        for(let etudiant of this.state.etudiants){
            bouttons[etudiant.id] = true;
        }
        
        this.setState({ disabledButtons: bouttons });
        this.setState({ etudiantsPermis: etudiants });
    }

    removeAllEtudiants(){
        var bouttons = new Array(this.state.etudiants.length).fill(false);
        for(let etudiant of this.state.etudiants){
            bouttons[etudiant.id] = false;
        }
        
        this.setState({ disabledButtons: bouttons });
        this.setState({ etudiantsPermis: [] });
    }

    async AddToList(index, param, e) {
        var etudiant = new Etudiant();
            etudiant = await EtudiantService.getEtudiantById(index);

        this.setState(oldState => {
            const newEtudiantsPermis = [...oldState.etudiantsPermis];
            newEtudiantsPermis[index] = etudiant.data;
            const newDisabledButtons = [...oldState.disabledButtons];
            newDisabledButtons[index] = true;
            return {
                disabledButtons: newDisabledButtons,
                etudiantsPermis: newEtudiantsPermis,
            }
        });
    }

    async RemoveFromList(index, param, e) {
        var newList = this.state.etudiantsPermis.filter((value) => (value === undefined) ? "" : value);
        const updatedList = newList.filter((etudiant) => etudiant.id !== index);
        this.setState(oldState => {
            const newDisabledButtons = [...oldState.disabledButtons];
            newDisabledButtons[index] = false;
            return {
                disabledButtons: newDisabledButtons,
                etudiantsPermis: updatedList,
            }
        });
    }

    confirmerChoix(){
        StageService.addEtudiants(this.props.match.params.id, this.state.etudiantsPermis);
        this.props.history.push('/gestionnaireStage');
        
        window.location.reload();
    }

    annulerChoix(){
        this.props.history.push('/gestionnaireStage');
    }

    render() {

        return (
            <div className="pt-3 mt-3">
                <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Liste des étudiants</h5>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>  
                                    <button className="btn btn-primary-outline" onClick={this.addAllEtudiants}>
                                        <h3> <AiOutlineCheckSquare /> </h3>
                                    </button>
                                    <button className="btn btn-primary-outline" onClick={this.removeAllEtudiants}>
                                        <h3> <AiOutlineCloseSquare /> </h3>
                                    </button>
                                </th>
                                <th> Matricule </th>
                                <th> Nom </th>
                                <th> Prénom </th>
                                <th> Programme </th>
                                <th> Courriel </th>
                                <th> Téléphone </th>
                                <th> Statut </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.etudiants
                                .map(
                                    etudiant =>
                                    <tr key={etudiant.id}>
                                        <td>
                                            <button className="btn btn-primary-outline" onClick={() => this.AddToList(etudiant.id)}
                                                disabled={this.state.disabledButtons[etudiant.id]}>
                                                {!this.state.disabledButtons[etudiant.id] ? 
                                                <h3> <AiFillCheckCircle style={{color: "green"}}/> </h3> : <h3> <AiOutlineCheckCircle /> </h3>}
                                            </button>
                                            <button className="btn btn-primary-outline" onClick={() => this.RemoveFromList(etudiant.id)}
                                                disabled={!this.state.disabledButtons[etudiant.id]}>
                                                {this.state.disabledButtons[etudiant.id] ? 
                                                <h3> <AiFillCloseCircle style={{color: "red"}}/> </h3> : <h3> <AiOutlineCloseCircle /> </h3>}
                                            </button>
                                        </td>
                                        <td>{etudiant.matricule}</td>
                                        <td>{etudiant.nom}</td>
                                        <td>{etudiant.prenom}</td>
                                        <td>{etudiant.programme}</td>
                                        <td>{etudiant.email}</td>
                                        <td>{etudiant.telephone}</td>
                                        <td>{etudiant.statutStage}</td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="form-group">
                    <div className="row"> 
                        <button className="btn btn-success" onClick={this.confirmerChoix}>Confirmer</button>
                        <button className="btn btn-danger" onClick={this.annulerChoix}>Annuler</button>
                    </div>
                </div>

            </div>
        );
    }
}