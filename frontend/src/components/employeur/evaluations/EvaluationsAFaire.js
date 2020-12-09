import {
    Button, makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import CandidatureService from '../../../service/CandidatureService';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3',
        width: '100%',
        fontWeight: 'bold',
        margin: 'auto',
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
        textAlign: 'center',

    },
    heading: {
        margin: 'auto',
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
    },
    textTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 15,
        margin: 'auto',
    },
    row: {
        textAlign: 'center',
    }
}));

export default function EvaluationsStagiaires(props) {
    const classes = useStyles();
    const [candidatures, setCandidatures] = useState([]);

    const getCandidature = async () => {
        var idSession = window.localStorage.getItem("session");
        const response = await CandidatureService.getCandidaturesAEvaluerParEmployeur(props.id, idSession);
        setCandidatures(response.data);
    }

    useEffect(() => {
        getCandidature()
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
            <div className='container'>
                {candidatures &&
                    <TableContainer className={classes.root}>
                        <h4 className='mb-3 sticky-top' align='left' >Évaluations à effectuer </h4>
                        <Table className="table" >
                            <TableHead className={classes.heading}>
                                <TableRow>
                                    <TableCell className={classes.textTitle}>Étudiant</TableCell>
                                    <TableCell className={classes.textTitle}>Programme</TableCell>
                                    <TableCell className={classes.textTitle}>Stage</TableCell>
                                    <TableCell className={classes.textTitle}>Date début</TableCell>
                                    <TableCell className={classes.textTitle}>Date fin</TableCell>
                                    <TableCell className={classes.textTitle}>
                                        Évaluer
                                </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {candidatures.map((row) => (
                                    <Row key={row.id} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </div>
        )
    }
};



function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [candidature, setCandidature] = useState(null);
    const classes = useStyles();
    const [redirect, setRedirect] = useState(false);


    const handleSelectCandidature = (_row) => {
        setCandidature(_row);
        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to={`/evaluationStagiaire/${candidature.id}`} />
    }
    return (

        <React.Fragment>
            <TableRow hover className={classes.row}>
                <TableCell className='align-middle'>{row.etudiant.prenom} {row.etudiant.nom}</TableCell>
                <TableCell className='align-middle'>{row.etudiant.programme}</TableCell>
                <TableCell className='align-middle'>{row.stage.titre}</TableCell>
                <TableCell className='align-middle'>{row.stage.dateDebut}</TableCell>
                <TableCell className='align-middle'>{row.stage.dateFin}</TableCell>
                <TableCell className='align-middle'>
                    <Button className='m-2'
                        variant="contained"
                        size="small" color="primary"
                        onClick={() => handleSelectCandidature(row)} 
                        style={{ textTransform: 'none' }}>Commencer l'évaluation</Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );

};
function AlertAucunContrat(isGestionnaire) {
    return <div className="container">
        <h4 className='mb-3 sticky-top' align='left' >Évaluations à effectuer </h4>
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucune évaluation à remplir pour le moment.</Alert>
            </div>
        </div>
    </div>;
}

