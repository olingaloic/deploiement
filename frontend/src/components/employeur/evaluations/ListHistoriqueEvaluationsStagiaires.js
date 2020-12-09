import { TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Table, Button  }from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from "react";
import EvaluationService from '../../../service/EvaluationService';
import AuthService from "../../../service/security/auth.service";


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

export default function ListHistoriqueEvaluationsStagiaires() {

  const [listEvaluationsEmployeur, setListEvaluationsEmployeur] = useState([])
  const id = AuthService.getTokenDESC().toUpperCase() === "ROLE_EMPLOYEUR" ? AuthService.getTokenId() : '';
  const classes = useStyles();

  const getListEvaluations = async () => {
    var idSession = localStorage.getItem("session");
    const response = await EvaluationService.getEvaluationsStagiaireByEmployeur(id, idSession);
    setListEvaluationsEmployeur(response.data);
  }

  useEffect(() => {
    getListEvaluations()
    return () => {
    }
  }, [])

  if (listEvaluationsEmployeur.length === 0) {
    return (
      AlertAucunContrat(true)
    )
  } else {
    return (
      <div className='container-fluid'>
        {listEvaluationsEmployeur &&
          <>
            <TableContainer >
              <Table className="table table-striped">
                <TableHead>
                  <TableRow >
                    <TableCell className={classes.textTitle} >Date de création </TableCell>
                    <TableCell className={classes.textTitle}>Étudiant </TableCell>
                    <TableCell className={classes.textTitle}>Programme </TableCell>
                    <TableCell className={classes.textTitle}>Courriel </TableCell>
                    <TableCell className={classes.textTitle}>Téléphone</TableCell>
                    <TableCell className={classes.textTitle}>Remplie par</TableCell>
                    <TableCell className={classes.textTitle}>Télécharger évaluation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listEvaluationsEmployeur.map((row) => (
                    <Row key={row.id} row={row} />
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

  const downloadEvaluation = async (evaluation) => {
    await EvaluationService.telechargerEvaluationStagiaire(evaluation.id).then((response) => {
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', "Evaluation_stagaire_" + 
                          evaluation.etudiant.prenom + "_" + evaluation.etudiant.nom + ".pdf");
        document.body.appendChild(link);
        link.click();
    });
}

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell className='align-middle'>{row.dateCreation}</TableCell>
        <TableCell className='align-middle'>{row.etudiant.prenom} {row.etudiant.nom}</TableCell>
        <TableCell className='align-middle'>{row.etudiant.programme}</TableCell>
        <TableCell className='align-middle'>{row.etudiant.email}</TableCell>
        <TableCell className='align-middle'>{row.etudiant.telephone}</TableCell>
        <TableCell className='align-middle'>{row.employeur.nom}</TableCell>
        <TableCell>
                    <Button className='m-2' 
                    size="small" 
                    color="primary" 
                    onClick={() => downloadEvaluation(row)}><GetAppIcon /></Button>
                </TableCell>
      </TableRow>
    </React.Fragment>
  );

};
function AlertAucunContrat(isGestionnaire) {
  return <div className="container">
    <div className="row justify-content-md-center">
      <div className="col">
        <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez fait aucune évaluation.</Alert>
      </div>
    </div>
  </div>;
}
