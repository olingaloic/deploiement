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

export default function ListeContrat(props) {
    
    const classes = useStyles();

    if (props.contrats.length === 0) {
        return (
            AlertAucunContrat(true)
        )
    } else {
        return (
            <>
            <div className="container">
                <TableContainer className={classes.root}>
                    <Table className="table">
                        <TableHead className={classes.heading}>
                            <TableRow>
                                <TableCell className={classes.textTitle}> Date de creation</TableCell>
                                <TableCell className={classes.textTitle}> Employeur </TableCell>
                                <TableCell className={classes.textTitle}> Étudiant(e) </TableCell>
                                <TableCell className={classes.textTitle}> Stage </TableCell>
                                <TableCell className={classes.textTitle}> Programme </TableCell>
                                <TableCell className={classes.textTitle}> Signature</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.contrats
                                .map(
                                    contrat =>
                                    <TableRow key={contrat.id} hover className={classes.row}>
                                        <TableCell className='align-middle'>{contrat.dateGeneration}</TableCell>
                                        <TableCell className='align-middle'>{contrat.employeur.nom}</TableCell>
                                        <TableCell className='align-middle'>{contrat.candidature.etudiant.prenom} {contrat.candidature.etudiant.nom}</TableCell>
                                        <TableCell className='align-middle'>{contrat.candidature.stage.titre}</TableCell>
                                        <TableCell className='align-middle'>{contrat.candidature.etudiant.programme}</TableCell>
                                        <TableCell>
                                            <Button
                                                href={"/televerserContrats/" + contrat.id}
                                                type="submit" 
                                                className='m-2' 
                                                variant="contained" 
                                                size="small" 
                                                color="primary"
                                                style={{ textTransform: 'none' }}
                                            >
                                                Signer le contrat
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            </>
        );
    }
}

function AlertAucunContrat() {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">
                    Vous n'avez aucun contrat à signer pour le moment.
                </Alert>
            </div>
        </div>
    </div>;
}
