import { Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import ContratService from '../../service/ContratService';

import {
    Button, makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

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

export default function ListCandidatureChoisi() {
    
    const classes = useStyles();

    const [candidaturesChoisis, setCandidaturesChoisis] = useState([]);

    const getCandidaturesChoisis = async () => {
        var idSession = localStorage.getItem("session");
        const response = await ContratService.getCandidaturesSansContrat(idSession);
        setCandidaturesChoisis(response.data);
    }

    useEffect(() => {
        getCandidaturesChoisis();
        return () => {
            setCandidaturesChoisis([]);
        }
    }, []);

    if (candidaturesChoisis.length === 0) {
        return (
            AlertAucunContrat()
        )
    } else {
        return (
            <Container>
                {candidaturesChoisis &&
                    <TableContainer className={classes.root}>
                        <Table className="table">
                            <TableHead className={classes.heading}>
                                <TableRow>
                                    <TableCell className={classes.textTitle}>Stage</TableCell>
                                    <TableCell className={classes.textTitle}>Employeur</TableCell>
                                    <TableCell className={classes.textTitle}>Étudiant</TableCell>
                                    <TableCell className={classes.textTitle}>Programme</TableCell>
                                    <TableCell className={classes.textTitle}>Générer le contrat</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {candidaturesChoisis.map((row) => (
                                    <Row key={row.id} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Container>
        )
    }
};



function Row(props) {
    const { row } = props;
    const classes = useStyles();
    const history = useHistory();

    const handleSelectCandidature = (_row) => {
        history.push('/CreationContrat/' + _row.id);
    }

    return (

        <React.Fragment>
            <TableRow className={classes.root} hover className={classes.row}>
                <TableCell className='align-middle'>{row.stage.titre}</TableCell>
                <TableCell className='align-middle'>{row.stage.employeur.nom}</TableCell>
                <TableCell className='align-middle'>{row.etudiant.prenom} {row.etudiant.nom}</TableCell>
                <TableCell className='align-middle'>{row.etudiant.programme}</TableCell>
                <TableCell className='align-middle'>
                    <Button className='m-2' variant="contained" size="small" color="primary" onClick={() => handleSelectCandidature(row)} style={{ textTransform: 'none' }}>
                        Générer
                    </Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );

}
function AlertAucunContrat() {
    return <div className="container">
      <div className="row justify-content-md-center">
        <div className="col">
         <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucun contrat à générer pour le moment.</Alert>
        </div>
      </div>
    </div>;
  }
