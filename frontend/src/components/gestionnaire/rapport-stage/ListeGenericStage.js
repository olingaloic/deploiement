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

export default function ListeGenericStage(props) {

    const classes = useStyles();

    if (props.stages.length === 0) {
        return (
            AlertAucunStage()
        )
    } else {
        return (
        
            <div className='container' >
            <TableContainer className={classes.root}>
                <Table className="table">
                    <TableHead className={classes.heading}>
                    <TableRow>
                        <TableCell className={classes.textTitle}> Titre </TableCell>
                        <TableCell className={classes.textTitle}> Programme </TableCell>
                        <TableCell className={classes.textTitle}> Date de début </TableCell>
                        <TableCell className={classes.textTitle}> Date de fin </TableCell>
                        <TableCell className={classes.textTitle}> Date limite pour postuler </TableCell>
                        <TableCell className={classes.textTitle}> Ville </TableCell>
                        <TableCell className={classes.textTitle}> Employeur </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.stages
                            .map(
                                stage =>
                                <TableRow key={stage.id} hover className={classes.row}>
                                    <TableCell>{stage.titre}</TableCell>
                                    <TableCell>{stage.programme}</TableCell>
                                    <TableCell>{stage.dateDebut}</TableCell>
                                    <TableCell>{stage.dateFin}</TableCell>
                                    <TableCell>{stage.dateLimiteCandidature}</TableCell>
                                    <TableCell>{stage.ville}</TableCell>
                                    <TableCell>{stage.employeur.nom}</TableCell>
                                </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        )
    }
}

function AlertAucunStage() {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">Il n'y a pas de stage.</Alert>
            </div>
        </div>
    </div>
}