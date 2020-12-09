import React from 'react';
import {
    makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ContratService from "../../service/ContratService";
import GetAppIcon from '@material-ui/icons/GetApp';

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

function sauvegarderEtMontrerDoc(response) {
    const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/octet-stream'}));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'contrat.pdf');
    document.body.appendChild(link);
    link.click();
}

  
export default function ListeGenericContrat(props) {

    const classes = useStyles();

    const clickHandle = (path) => {
        ContratService.telechargerDocument(path).then((response) => {
            sauvegarderEtMontrerDoc(response)
        });
    }

    if (props.contrats.length === 0) {
        return (
            AlertAucunContrat()
        )
    } else {
        return (
          <div className='container' >
            <TableContainer className={classes.root}>
            <Table className="table">
                <TableHead className={classes.heading}>
                <TableRow>
                    <TableCell className={classes.textTitle}> Date de création </TableCell>
                    <TableCell className={classes.textTitle}> Employeur </TableCell>
                    <TableCell className={classes.textTitle}> Étudiant(e) </TableCell>
                    <TableCell className={classes.textTitle}> Stage </TableCell>
                    <TableCell className={classes.textTitle}> Programme </TableCell>
                    <TableCell className={classes.textTitle}> Télécharger </TableCell>
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
                            <TableCell className='align-middle'>
                              <Button className='m-2' size="small"color="primary" onClick={() => clickHandle(contrat.id)}>
                                <GetAppIcon/>
                              </Button>
                            </TableCell>
                          </TableRow>
                  )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        )
    }
}

function AlertAucunContrat() {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">
                    Vous n'avez aucun contrat pour le moment.
                </Alert>
            </div>
        </div>
    </div>
}