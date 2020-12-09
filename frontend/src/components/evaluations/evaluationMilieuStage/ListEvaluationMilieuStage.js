import {
    Button, makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import CandidatureService from '../../../service/CandidatureService';
import AuthService from "../../../service/security/auth.service";


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3',
        width: '100%',
        fontWeight: 'bold',
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
}));


export default function EvaluationMilieuHome() {
    const [candidatures, setCandidatures] = useState([])
    const classes = useStyles();
    const id = AuthService.getTokenDESC().toUpperCase() === "ROLE_ENSEIGNANT" ? AuthService.getTokenId() : '';

    const getEtudiant = async () => {
        const response = await CandidatureService.getCandidaturesEmployeurNonEvalues(id);
        setCandidatures(response.data);
    }

    useEffect(() => {
        getEtudiant()
        return () => {
            setCandidatures([])
        }
    }, [])


    if (candidatures.length === 0) {
        return (
            AlertAucunContrat(true)
        )
    } else {
        return (
            <div className='container-fluid'>
                {candidatures &&
                    <>
                        <TableContainer >
                            <Table className="table table-striped">
                                <TableHead>
                                    <TableRow >
                                        <TableCell className={classes.textTitle} >Nom de l'entreprise</TableCell>
                                        <TableCell className={classes.textTitle}>Courriel</TableCell>
                                        <TableCell className={classes.textTitle}>Téléphone</TableCell>
                                        <TableCell className={classes.textTitle}>Adresse</TableCell>
                                        <TableCell className={classes.textTitle}>Stage en cours</TableCell>
                                        <TableCell className={classes.textTitle}>Étudiant</TableCell>
                                        <TableCell className={classes.textTitle}>Évaluer</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {candidatures.map((row) => (
                                        <Row key={row.id} row={row} id={id}/>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                }
            </div>
        )
    }
};


function Row(props) {
    const { row } = props;
    const classes = useStyles();
    const history = useHistory();

    const handleClickRow = (_candidature) => {
        history.push("/evaluationMilieuStage/"
                        + _candidature.stage.employeur.nom
                        + "/" + _candidature.etudiant.prenom
                        + "/" + _candidature.etudiant.nom
                        + "/" + props.id
                        + "/" + _candidature.id);
    }

    return (
        <React.Fragment>
                <TableRow hover  className={classes.row} >
                    <TableCell className='align-middle'>{row.stage.employeur.nom}</TableCell>
                    <TableCell className='align-middle'>{row.stage.employeur.email}</TableCell>
                    <TableCell className='align-middle'>{row.stage.employeur.telephone}</TableCell>
                    <TableCell className='align-middle'>{row.stage.employeur.adresse}</TableCell>
                    <TableCell className='align-middle'>{row.stage.titre}</TableCell>
                    <TableCell className='align-middle'>{row.etudiant.prenom} {row.etudiant.nom}</TableCell>
                    <TableCell>
                    <Button className='m-2' variant="contained" size="small" color="primary" onClick={() => handleClickRow(row)} style={{ textTransform: 'none' }}>
                    Commencer l'évaluation
                    </Button>
                </TableCell>
                
                </TableRow>
        </React.Fragment>
    );

};
function AlertAucunContrat() {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucune évaluation à remplir pour le moment</Alert>
            </div>
        </div>
    </div>;
}


