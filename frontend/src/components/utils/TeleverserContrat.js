import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import React, {Component} from 'react';
import ContratService from "../../service/ContratService";

import AuthService from "../../service/security/auth.service";

export default class TeleverserContrat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            showSnackbarValid: false,
            showSnackbarInvalid: false,
            url: ""

        }

        this.telecharger = this.telecharger.bind(this)

        this.handleClick = this.handleClick.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    handleCloseSnackbarValid = () => this.setState({showSnackbarValid: false});
    handleShowSnackbarValid = () => this.setState({showSnackbarValid: true});

    handleCloseSnackbarInvalid = () => this.setState({showSnackbarInvalid: false});
    handleShowSnackbarInvalid = () => this.setState({showSnackbarInvalid: true});

    checkMimeType = (event) => {
        let files = event.target.files
        let err = ''
        const types = ['application/pdf']
        for (let x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err += files[x].type + ' is not a supported format\n'
            }
        }

        if (err !== '') {
            event.target.value = null
            return false;
        }
        return true;

    }
    onChangeHandler = event => {
        if (this.checkMimeType(event)) {
            const url =
                this.setState({
                    file: event.target.files[0],
                    url: window.URL.createObjectURL(new Blob(event.target.files, {type: "application/pdf"}))
                });
        }
    }

    handleClick(event) {
        event.preventDefault();
        const desc = AuthService.getTokenDESC().toUpperCase();
        const id = this.props.match.params.id;
        if (this.state.file !== undefined && this.state.file !== null) {
            const formData = new FormData();
            formData.append('file', this.state.file)
            formData.append('desc', desc);
            ContratService.updateContrat(id, formData);
            this.handleShowSnackbarValid()
        } else {
            this.handleShowSnackbarInvalid();
        }
    }

    telecharger() {
        let id = parseInt(this.props.match.params.id);
        ContratService.telechargerDocument(id).then((response) => {
            sauvegarderEtMontrerDoc(response)
        });
    }

    async componentDidMount() {
        const pdf = await ContratService.telechargerDocument(parseInt(this.props.match.params.id));
        this.setState({url: window.URL.createObjectURL(new Blob([pdf.data], {type: "application/pdf"}))})
    }


    render() {
        const iframeStyle = {
            width: '100%',
            height: '100%',
            border: '0',
            position: 'relative',
            margin: 'auto',
            minHeight: '45em'

        }


        const styleContainerButton  ={
            display: "grid",
            gridGap: "50px",
            gridAutoRows: ""
            // gridColumnStart: 1,
            // gridColumnEnd: 3,
            // gridRowEnd: 3,
            // gridRowStart:1,
        }

        // const styleButton = {
        //     display: "inline-grid"
        // }

        return (
            <>
                <div className="col">
                    <form>
                        <div>
                            <h3>Signature du contrat</h3>
                            <p>Veuillez télécharger le contrat, le lire attentivement, le signer et le dater, puis le
                                téléverser</p>


                            <div style={styleContainerButton}>
                                <Button
                                    className={"grid-item"}
                                    color="primary"
                                    variant="contained"
                                    onClick={this.telecharger}
                                    style={{gridColumnStart: 1,gridColumnEnd: 1}}
                                >
                                    Télécharger
                                </Button>


                                <label
                                    htmlFor="contained-button-file"
                                    className={"grid-item"}
                                    style={{gridColumnStart: 2, gridColumnEnd: 2, overflow: "auto", margin:0}}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                        style={{width:"100%", height:"100%"}}
                                    >
                                        Chosir fichier
                                    </Button>
                                    <input
                                        id="contained-button-file"
                                        type="file"
                                        onChange={this.onChangeHandler}
                                        style={{display:"none"}}
                                    />
                                </label>


                                <Button
                                    className={"grid-item"}
                                    onClick={this.handleClick}
                                    variant="contained"
                                    color="primary"
                                    style={{gridColumnStart: 3,gridColumnEnd: 3,}}
                                >
                                    Téléverser
                                </Button>


                                <IconButton color="primary"/>
                            </div>
                        </div>

                        <Snackbar
                            open={this.state.showSnackbarValid} autoHideDuration={6000}
                            onClose={this.handleCloseSnackbarValid}>
                            <Alert
                                onClose={this.handleCloseSnackbarValid}
                                severity="success"
                            >
                                Le contrat a été téléversé.
                            </Alert>
                        </Snackbar>
                        <Snackbar
                            open={this.state.showSnackbarInvalid}
                            autoHideDuration={6000}
                            onClose={this.handleCloseSnackbarInvalid}
                        >
                            <Alert
                                onClose={this.handleCloseSnackbarInvalid}
                                severity="error"
                            >
                                Il n'y a pas de contrat a téléverser.
                            </Alert>
                        </Snackbar>

                    </form>
                    <iframe
                        title={"Apercu contrat"}
                        src={this.state.url}
                        style={iframeStyle}
                    />

                </div>
            </>
        )
    }
}

function sauvegarderEtMontrerDoc(response) {
    const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/octet-stream'}));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf');
    document.body.appendChild(link);
    link.click();
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
