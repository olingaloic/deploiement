import React, { Component } from 'react';
import EtudiantService from '../../service/EtudiantService';
import axios from 'axios'
import CVService from "../../service/CVService";

export default class ListEtudiantsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { etudiants: [], filter: '', statut: '', idEtudiant: '', isCVApprouve: false};
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event, isValid, id){
        event.preventDefault();
        CVService.updateCVStatus(isValid, id);
        window.location.reload();
    }
    renderColonneApprobation(etudiant){
        if (etudiant.cv == null){
            return <p> Pas de CV</p>
        }
        if (etudiant.cv.status == 'APPROVED'){
            return <p>Approuvé</p>
        }
        if (etudiant.cv.status = 'UNREVIEWED') {
            return(
            <div>
                <button className="btn btn-primary" onClick={(event) =>  this.handleSubmit(event, true, etudiant.cv.id)}>Approuver
                </button>
                <button className="btn btn-primary" onClick={ (event) =>  this.handleSubmit(event, false, etudiant.cv.id)}>Refuser</button>
            </div>
            )
        }
    }
    downloadCV = (idEtudiant) => {
            const method = 'GET';
            const url = 'http://localhost:8080/cvs/get/' + idEtudiant;
            return () => {
                axios
                    .request({
                        url,
                        method,
                        responseType: 'blob',
                    })
                    .then(({data}) => {
                        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                        const link = document.createElement('a');
                        link.href = downloadUrl;
                        link.setAttribute('download', "etudiant" + idEtudiant + ".pdf"); //any other extension
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                    });
            }
    }

    handleChangeText = event => {
        this.setState({ filter: event.target.value });
    };

    handleChangeRadio = event => {
        console.log(event.target.value)
        this.setState({ statut: event.target.value });
    };
    
    async componentDidMount() {
            const { data: etudiants } = await EtudiantService.getEtudiants();
            this.setState({ etudiants });
    }

    render() {

        return (
            <form className="d-flex flex-column">

            <div>
                <h1 className="text-center">Liste des étudiants</h1>

                <div className="form-group">
                    <div className="row">
                        <h4 className="text-center">FILTRAGE MATRICULE</h4>
                    </div>
                    <div className="row"> 
                        <input type='text' value={this.state.filter} onChange={this.handleChangeText} />
                    </div>
                    <div className="row">
                        <h4 className="text-center">STATUT DE STAGE</h4>
                    </div>
                    <div className="row">
                        <label><input type="radio" name="statut" value="aucun stage" 
                                onChange={this.handleChangeRadio}/> N'a aucun stage</label>
                    </div>
                    <div className="row">
                        <label><input type="radio" name="statut" value="possede stage" 
                                onChange={this.handleChangeRadio}/> Possède un stage</label>
                    </div>
                    <div className="row">
                        <label><input type="radio" name="statut" value="" 
                                onChange={this.handleChangeRadio}/> Tous les étudiants</label>
                    </div>
                </div>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Matricule </th>
                                <th> Nom </th>
                                <th> Prénom </th>
                                <th> Programme </th>
                                <th> Courriel </th>
                                <th> Téléphone </th>
                                <th> Statut </th>
                                <th> Télécharger son CV</th>
                                <th> Etat du CV</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.etudiants
                                .filter(etudiant => etudiant.matricule.includes(this.state.filter) && 
                                        etudiant.statutStage.includes(this.state.statut))
                                .map(
                                    etudiant =>
                                    <tr key={etudiant.id}>
                                        <td>{etudiant.matricule}</td>
                                        <td>{etudiant.nom}</td>
                                        <td>{etudiant.prenom}</td>
                                        <td>{etudiant.programme}</td>
                                        <td>{etudiant.email}</td>
                                        <td>{etudiant.telephone}</td>
                                        <td>{etudiant.statutStage}</td>
                                        <td>
                                            {etudiant.cv != null ?<button onClick={this.downloadCV(etudiant.id)} className="btn btn-primary">Telecharger</button>
                                                : <p>Pas de CV</p>}<br/>
                                        </td>
                                        <td>
                                            {this.renderColonneApprobation(etudiant)}



                                        </td>

                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            </form>
        );
    }
}