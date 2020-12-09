import React from 'react';
import {
    makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

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

export default function ListeGenericEtudiant(props) {
    
    const classes = useStyles();

    if (props.etudiants.length === 0) {
        return (
            AlertAucunEtudiant()
        )
    } else {
        return (
        <div className='container' >
            <TableContainer className={classes.root}>
                <Table className="table">
                    <TableHead className={classes.heading}>
                    <TableRow>
                        <TableCell className={classes.textTitle}> Matricule </TableCell>
                        <TableCell className={classes.textTitle}> Nom </TableCell>
                        <TableCell className={classes.textTitle}> Programme </TableCell>
                        <TableCell className={classes.textTitle}> Courriel </TableCell>
                        <TableCell className={classes.textTitle}> Téléphone </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.etudiants
                        .map(
                            etudiant =>
                            <TableRow key={etudiant.id} hover className={classes.row}>
                                <TableCell>{etudiant.matricule}</TableCell>
                                <TableCell>{etudiant.prenom} {etudiant.nom}</TableCell>
                                <TableCell>{etudiant.programme}</TableCell>
                                <TableCell>{etudiant.email}</TableCell>
                                <TableCell>{etudiant.telephone}</TableCell>
                            </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        )
    }
}

function AlertAucunEtudiant() {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">Il n'y a pas d'etudiants</Alert>
            </div>
        </div>
    </div>
}