import {
    Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import EtudiantService from "../../../service/EtudiantService";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3',
        width: '98%',
        fontWeight: 'bold',
        margin: 'auto'
    },
    table: {
        color: "#ffffff",
    },
    textTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 15
    }
}));

export default function ModifierEtudiantsEnchargeEnseignant(props) {
    var idSession = localStorage.getItem("session");
    return (
        <div>
            { props.listEtudiantsEnCharge.length !== 0 ?
                <CustomTable etudiants={props.listEtudiantsEnCharge} />
                :
                <AlertMessage />
            }
        </div>
    );
}

function CustomTable(props) {
    const classes = useStyles();
    const params = useParams();
    const [selected, setSelected] = React.useState([]);
    const isSelected = (id) => selected.indexOf(id) !== -1;
    const [openModal, setopenModal] = useState(false)

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.etudiants.map((c) => c.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClickSelect = (event, etudiant) => {
        const selectedIndex = selected.indexOf(etudiant);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, etudiant);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const enleverEtudiantAssigne = async (idEtudiant, idEnseignant) => {
        await EtudiantService.enleverEnseignant(idEtudiant, idEnseignant)
    }

    const desAssignationConfirmee = () => {
        if (selected.length === 0) {
            return;
        }
        for (let i = 0; i < selected.length; i++) {
            enleverEtudiantAssigne(selected[i], params.id)
        }

        setTimeout(function () {
            window.location.reload();
        }, 500);
    }

    const desAssignationNonConfirmee = () => {
        if (selected.length === 0) {
            return;
        }
        setopenModal(false);
    }

    const handleConfirmation = (event) => {
        if (selected.length === 0) {
            return;
        }
        setopenModal(true);
    }

    return (
        <div className='container'>
            <h5 align='left' className='m-2 pt-3 pb-3' >Désassigner des étudiants assignés à {params.prenom} {params.nom}</h5>
            <TableContainer component={Paper} >

                <Table >
                    <TableHead className={classes.textTitle}>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={props.etudiants.length > 0 && selected.length === props.etudiants.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>Nom étudiant</TableCell>
                            <TableCell>Matricule</TableCell>
                            <TableCell>Programme</TableCell>
                            <TableCell>Téléphone</TableCell>
                            <TableCell>Courriel</TableCell>
                            <TableCell>Adresse</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {props.etudiants.map(
                            etudiant => {
                                const isItemSelected = isSelected(etudiant.id)
                                return (

                                    <TableRow
                                        key={etudiant.id}
                                        hover
                                        onClick={(event) => handleClickSelect(event, etudiant.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                            />
                                        </TableCell>
                                        <TableCell>{etudiant.prenom} {etudiant.nom}</TableCell>
                                        <TableCell>{etudiant.matricule}</TableCell>
                                        <TableCell>{etudiant.programme}</TableCell>
                                        <TableCell>{etudiant.telephone}</TableCell>
                                        <TableCell>{etudiant.email}</TableCell>
                                        <TableCell>{etudiant.adresse}</TableCell>

                                    </TableRow>

                                );
                            }
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
            <Button variant="contained" className=' m-2' color="primary" onClick={handleConfirmation}>Désassigner</Button>
            {openModal &&
                <AlertConfirmation confirmation={desAssignationConfirmee}
                    nonConfirmation={desAssignationNonConfirmee}
                    numeroEtudiants={selected.length}
                    openModal={openModal} />
            }
        </div>
    );
}



function AlertConfirmation(props) {
    const [open, setOpen] = React.useState(props.openModal);

    const handleCloseNonchanges = () => {
        setOpen(false);
        props.nonConfirmation();
    };

    const handleClose = () => {
        setOpen(false);
        props.confirmation();
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Enlever étudant?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        Confirmez que vous souhaitez désassigner {props.numeroEtudiants} élève(s).
            </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNonchanges} color="primary">
                        Cancel
            </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Oui
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function AlertMessage() {
    return (<div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">L'enseignant n'a pas d'élèves à son charge</Alert>
            </div>
        </div>
    </div>)
}
