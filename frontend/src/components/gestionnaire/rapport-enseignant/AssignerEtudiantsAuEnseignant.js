import React, { useEffect, useState } from "react";
import CandidatureService from "../../../service/CandidatureService";
import {
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    Paper,
    Table,
    TableRow,
    Checkbox, Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from 'react-router-dom';
import EtudiantService from "../../../service/EtudiantService";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3',
        width: '70%',
        backgroundColor: '#E9E9E9',
        fontWeight: 'bold'
    },
    paper: {
        padding: theme.spacing(0),
        margin: 'auto',
        maxWidth: '50%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(10),
        fontWeight: theme.typography.fontWeightRegular,
    },
    textTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 15
    }
}));

export default function AssignerEtudiantsAuEnseignant(props) {
    const [listCandidaturesChoisis, setListCandidaturesChoisis] = useState([])
    var idSession = localStorage.getItem("session");

    const getCandidatures = async () => {
        const response = await CandidatureService.getCandidaturesChoisis(idSession);
        setListCandidaturesChoisis(response.data)
    }

    useEffect(() => {
        getCandidatures();
        return () => {
            setListCandidaturesChoisis([])
        }
    }, [])

    return (
        <div>
            <CustomTable candidatures={listCandidaturesChoisis} />
        </div>
    );
}

function CustomTable(props) {
    const classes = useStyles();
    const params = useParams();
    const [selected, setSelected] = React.useState([]);
    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.candidatures.map((c) => c.etudiant.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClickSelect = (event, candidature) => {
        const selectedIndex = selected.indexOf(candidature);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, candidature);
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

    const setAssignerEtudiant = async (idEtudiant, idEnseignant) =>{
        await EtudiantService.setEnseignant(idEtudiant, idEnseignant)
    }

    const handleConfirmation=  (event) => {
        event.preventDefault();
        if (selected.length === 0) {
            return;
        }
        for (let i = 0; i < selected.length; i++) {
            setAssignerEtudiant(selected[i],params.id)
        }
        setTimeout(function() {
            window.location.reload();
        }, 500);
    }
 
    return (
        <div className='container'>
        <h5 align='left' className='m-2 pt-3 pb-3'>Assigner des étudiants à {params.prenom} {params.nom}</h5>
            <TableContainer component={Paper} >
                <Table>
                    <TableHead className={classes.textTitle}>
                        <TableRow>
                            <TableCell padding="checkbox" className={classes.textTitle}>
                                <Checkbox
                                    checked={props.candidatures.length > 0 && selected.length === props.candidatures.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell className={classes.textTitle}>Nom de l'étudiant(e)</TableCell>
                            <TableCell className={classes.textTitle}>Programme</TableCell>
                            <TableCell className={classes.textTitle}>Téléphone</TableCell>
                            <TableCell className={classes.textTitle}>Courriel</TableCell>
                            <TableCell className={classes.textTitle}>Adresse</TableCell>
                            <TableCell className={classes.textTitle}>Stage en cours</TableCell>
                     </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.candidatures
                        .filter(item => item.etudiant.enseignant === null)
                        .filter(item=> item.etudiant.programme === params.programme)
                            .map(
                                candidature => {
                                    const isItemSelected = isSelected(candidature.etudiant.id)
                                    return (
                                        <TableRow
                                            key={candidature.id}
                                            hover
                                            onClick={(event) => handleClickSelect(event, candidature.etudiant.id)}
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
                                            <TableCell>{candidature.etudiant.prenom} {candidature.etudiant.nom}</TableCell>
                                            <TableCell>{candidature.etudiant.programme}</TableCell>
                                            <TableCell>{candidature.etudiant.telephone}</TableCell>
                                            <TableCell>{candidature.etudiant.email}</TableCell>
                                            <TableCell>{candidature.etudiant.adresse}</TableCell>
                                            <TableCell>{candidature.stage.titre}</TableCell>
                                        </TableRow>

                                    );
                                }
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" className=' m-2' color="primary" onClick={handleConfirmation}>Confirmer</Button>
        </div>
    );
                   

    function Alert(isGestionnaire) {
        return <div className="container">
            <div className="row justify-content-md-center">
                <div className="col">
                    <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucune évaluation à remplir pour le moment</Alert>
                </div>
            </div>
        </div>;
    }
}

