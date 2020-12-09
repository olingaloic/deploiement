import React, {Component} from 'react';
import CVService from "../../service/CVService";
import EtudiantService from "../../service/EtudiantService";
import { Button } from '@material-ui/core';

import AuthService from "../../service/security/auth.service";

export default class HomeEtudiant extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            etudiant: {},
            file: "",
            displayInvalidFileMessage: false,
            displayNoSessionMessage: false,
            displaySubmitCVButton: false,
            CVInfoMessage: "",
            hasUploadedCV: false,
            id: AuthService.getTokenDESC().toUpperCase() === "ROLE_ETUDIANT" ? AuthService.getTokenId() : ''
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    onChangeHandler = event => {
        if (this.checkMimeType(event)) {
            this.setState({
                file: event.target.files[0]
            });

        }
        this.setState({hasUploadedCV: false});
    }

    async componentDidMount() {

        const {data: etudiant} = await EtudiantService.getEtudiantById(this.state.id);

        this.setState({
            etudiant: etudiant,
            hasAlreadyCV: this.state.etudiant.cv !== undefined
        });
    }

    displayCVMessage() {
        if (this.state.etudiant.cv != undefined) {
            switch (this.state.etudiant.cv.status) {
                case "APPROVED":
                    return <p className="text-center alert alert-success mt-3" role="alert"> Votre CV a déjà été approuvé. Mais vous pouvez le mettre à jour.</p>
                case "DENIED" :
                    return <p className="text-center alert alert-danger mt-3" role="alert"> Votre CV a été refusé. Veuillez en soumettre un autre pour postuler à une offre de stage.</p>
                case "UNREVIEWED" :
                    return <p className="text-center alert alert-success mt-3" role="alert"> Votre CV est en cours d'évaluation.</p>
                default :
                    break;
            }
        } else {
            return <p className="text-center alert alert-warning mt-3" role="alert"> Vous n'avez pas de CV, veuillez en soumettre un afin de postuler à une offre de stage.</p>
        }
    }

    checkMimeType = (event) => {
        let files = event.target.files
        let err = ''
        const types = ['application/pdf']
        for (var x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err += files[x].type + ' is not a supported format\n'
                this.setState({displayInvalidFileMessage: true});
                this.setState({displaySubmitCVButton: false});
            }
            else {
                this.setState({displayInvalidFileMessage: false});
                this.setState({displaySubmitCVButton: true});
            }
        }

        if (err !== '') {
            event.target.value = null
            return false;
        }
        return true;

    }

    handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData();
        formData.append('file', this.state.file)
        formData.append('name', this.state.file.name);
        this.setState({hasUploadedCV: true});
        CVService.createCV(this.state.id, formData)
    }

    downloadCV = (etudiant) => {
        CVService.getCVByEtudiant(etudiant).then((response) => {

        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', "CV_" + etudiant.prenom + "_" + etudiant.nom + ".pdf");
            document.body.appendChild(link);
            link.click();
        });
    }

    render() {
        return (
            <div className="card p-3 m-3">
                <form onSubmit={this.handleSubmit} className="d-flex flex-column">
                    <div className="container">
                        
                        {this.displayCVMessage()}
                        <br/>
                        <label>Téléverser votre CV :</label>
                        <input type="file" name="file" 
                                className="form-control-file"
                                accept="application/pdf"
                                ref={this.inputRef}
                                defaultValue={this.state.file}
                                onChange={this.onChangeHandler}/>
                        
                        <br/>
                        {this.state.displayInvalidFileMessage ?
                            <label style={{color: "red"}}>Ce format de fichier n'est pas autorisé. Seuls les fichiers au
                                format PDF sont autorisés.</label> : null}
                        {this.state.displaySubmitCVButton ?
                            <Button type="submit" color="primary" variant="contained" 
                                    style={{ textTransform: 'none' }}>Enregistrer mon CV</Button> : null}<br/>
                        {this.state.hasUploadedCV ?
                            <label style={{color: "green"}}>Vous venez de téléverser votre CV. Il doit cependant être
                                approuvé pour que vous puissiez postuler aux offres de stage.</label> : null}
                        <br/>

                        <label>{this.state.etudiant.cv != null ? "Télécharger votre CV : " : null}</label> 
                        <br/>
                        <label>
                            {this.state.etudiant.cv != null ?
                            <Button color="primary" variant="contained" onClick={() => this.downloadCV(this.state.etudiant)} 
                                    style={{ textTransform: 'none' }}>Télécharger mon CV</Button> : null}<br/>
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}