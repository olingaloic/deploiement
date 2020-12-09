import React, {Component, useEffect, useState} from 'react';
import StageService from '../../service/StageService';
import EtudiantService from "../../service/EtudiantService";
import CandidatureService from "../../service/CandidatureService";

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {Col, Container, Modal, Row} from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

import AuthService from "../../service/security/auth.service";

const useStyles = theme => ({
    root: {
        marginTop: '3',
        width: '100%',
        margin:'auto',
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
        textAlign: 'center',
    },
    heading: {
        margin:'auto',
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
    },
    textTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 15,
        margin:'auto',
    },
    row:{
        textAlign: 'center',
    }
});

class ApplicationStageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stages: [],
            etudiant: "",
            hasValidCV: false,
            showSnackbar: false,
            id: AuthService.getTokenDESC().toUpperCase() === "ROLE_ETUDIANT" ? AuthService.getTokenId() : ''
        };

        ShowStage = ShowStage.bind(this);
    }

    async componentDidMount() {

        let id = this.state.id;
        var idSession = localStorage.getItem("session");

        const response = await EtudiantService.isRegistered(id);

        if (!response.data) {
            this.props.history.push("/profilEtudiant/0");
        }

        const {data: etudiant} = await EtudiantService.getEtudiantById(id);
        this.setState({etudiant: etudiant});

        StageService.getStagesEtudiant(id, idSession).then((res) => {
            this.setState({stages: res.data})
        })

        if (this.state.etudiant.cv === undefined || this.state.etudiant.cv === null) {
            this.setState({hasValidCV: false});
        } else {
            if (this.state.etudiant.cv.status === 'APPROVED') {
                this.setState({hasValidCV: true});
            } else {
                this.setState({hasValidCV: false});
            }
        }
        console.log(this.state.stages.length === 0);
    }

    handleCloseSnackbar = () => this.setState({showSnackbar: false});
    handleShowSnackbar = () => this.setState({showSnackbar: true});

    render() {
        
        const { classes } = this.props;

        if (this.state.stages.length !== 0) {
            if (this.state.etudiant.cv === null || this.state.etudiant.cv === undefined) {
                return <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col">
                            <Alert severity="info" variant="filled" className="m-3 text-center">Vous ne pourrez pas
                                postuler si vous n'avez pas de CV.</Alert>
                        </div>
                    </div>
                </div>;
            }
            if (!this.state.hasValidCV) {
                return <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col">
                            <Alert severity="info" variant="filled" className="m-3 text-center">Vous ne pourrez pas
                                postuler si votre CV n'a pas été approuvé.</Alert>
                        </div>
                    </div>
                </div>;
            }
        } else {
            return <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col">
                        <Alert severity="info" variant="filled" className="m-3 text-center">Aucune offre de stage n'est
                            disponible pour vous.</Alert>
                    </div>
                </div>
            </div>;
        }

        return (
            <div className="container">
                <TableContainer className={classes.root}>
                    <Table className="table">
                        <TableHead className={classes.heading}>
                        <TableRow>
                            <TableCell className={classes.textTitle}> Titre </TableCell>
                            <TableCell className={classes.textTitle}> Employeur </TableCell>
                            <TableCell className={classes.textTitle}> Programme </TableCell>
                            <TableCell className={classes.textTitle}> Salaire </TableCell>
                            <TableCell className={classes.textTitle}> Ville </TableCell>
                            <TableCell className={classes.textTitle}> Date limite </TableCell>
                            <TableCell className={classes.textTitle}> Confirmer choix </TableCell>
                        </TableRow>
                        </TableHead>
                            <TableBody>
                                {this.state.stages
                                    .map(stage =>
                                        <TableRow key={stage.id} hover className={classes.row}>
                                            <ShowStage stage={stage}
                                                isSessionSelectionneeEnCours={this.state.isSessionSelectionneeEnCours}
                                                idEtudiant={this.state.id}/>
                                        </TableRow>
                                    )}
                            </TableBody>
                    </Table>
                </TableContainer>
                <Snackbar open={this.state.showSnackbar} autoHideDuration={6000}
                            onClose={this.handleCloseSnackbar}>
                    <Alert onClose={this.handleCloseSnackbar} severity="success">
                        Vous venez de postuler pour un stage.
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(useStyles)(ApplicationStageComponent);


function ShowStage(props) {

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleShowSnackbar = () => this.handleShowSnackbar();

    function handleClick(event) {
        event.preventDefault();

        CandidatureService.post(props.idEtudiant, props.stage.id)

        handleShowSnackbar();
        handleCloseModal();

        setTimeout(function () {
            window.location.reload();
        }, 1000);
    }

    return (
        <>
            <TableCell className='align-middle'>{props.stage.titre}</TableCell>
            <TableCell className='align-middle'>{props.stage.employeur.nom}</TableCell>
            <TableCell className='align-middle'>{props.stage.programme}</TableCell>
            <TableCell className='align-middle'>{props.stage.salaire} $</TableCell>
            <TableCell className='align-middle'>{props.stage.ville}</TableCell>
            <TableCell className='align-middle'>{props.stage.dateLimiteCandidature}</TableCell>

            <TableCell>
                <Button type="submit" className='m-2' variant="contained" size="small" color="primary" 
                        style={{ textTransform: 'none' }}
                        value={props.stage.id} onClick={handleShowModal}>Postuler
                </Button>
            </TableCell>

            <Modal
                size="lg"
                show={showModal}
                onHide={handleCloseModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.stage.titre}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col className="font-weight-bold" style={{color: "red"}}>***Attention***</Col>
                        </Row>
                        <Row>
                            <Col style={{color: "red"}}>Assurez-vous d'avoir bien confirmer choix afin de pouvoir
                                soumettre votre candidature au stage!</Col>
                        </Row>

                        <Row>
                            <Col className="font-weight-bold">Employeur</Col>
                            <Col className="font-weight-bold">Ville</Col>
                            <Col className="font-weight-bold" xs={6} md={4}>Salaire</Col>
                        </Row>
                        <Row>
                            <Col>{props.stage.employeur.nom}</Col>
                            <Col>{props.stage.ville}</Col>
                            <Col xs={6} md={4}>{props.stage.salaire}$/h</Col>
                        </Row>

                        <Row>
                            <Col className="font-weight-bold">Date de début</Col>
                            <Col className="font-weight-bold">Date de fin</Col>
                            <Col className="font-weight-bold" xs={6} md={4}>Heures par semaine</Col>
                        </Row>
                        <Row>
                            <Col>{props.stage.dateDebut}</Col>
                            <Col>{props.stage.dateFin}</Col>
                            <Col xs={6} md={4}>{props.stage.nbHeuresParSemaine}</Col>
                        </Row>

                        <Row>
                            <Col className="font-weight-bold" xs={6} md={4}>Description</Col>
                        </Row>
                        <Row>
                            <Col>{props.stage.description}</Col>
                        </Row>


                        <Row>
                            <Col className="font-weight-bold" xs={6} md={4}>Exigences</Col>
                        </Row>
                        <Row>
                            <Col>{props.stage.exigences}</Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" className='m-2' variant="contained" size="small" color="primary"
                            value={props.stage.id} onClick={handleClick}>Confirmer</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
