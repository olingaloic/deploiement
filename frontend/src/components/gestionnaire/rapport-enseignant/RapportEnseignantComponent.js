import {
    Button, makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import EnseignantService from '../../../service/EnseignantService';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3',
        width: '100%',
        // fontWeight: 'bold',
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

export default function RapportEnseignantComponent() {
    const [enseignants, setEnseignants] = useState([])
    const classes = useStyles();

    const getEnseignants = async () => {
        const response = await EnseignantService.getEnseignantsInscrits();
        setEnseignants(response.data);
    }

    useEffect(() => {
        getEnseignants()
        return () => {
            setEnseignants([])
        }
    }, [])


    if (enseignants.length === 0) {
        return (
            AlertAucunEnseignant(true)
        )
    } else {
        return (
            <div className='container' >
                {enseignants &&
                    <>
                        <TableContainer  className={classes.root}>
                            <h4  className='m-2 sticky-top' >Enseignants </h4>
                            <Table className="table "  >
                                <TableHead className={classes.heading} >
                                    <TableRow>
                                        <TableCell className={classes.textTitle}>Nom de l'enseignant(e)</TableCell>
                                        <TableCell className={classes.textTitle}>Programme</TableCell>
                                        <TableCell className={classes.textTitle}>Courriel</TableCell>
                                        <TableCell className={classes.textTitle}>Téléphone</TableCell>
                                        <TableCell className={classes.textTitle}>Assignation des étudiants</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {enseignants.map((row) => (
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
    const history = useHistory();
    const classes = useStyles();

    const handleClickAssingner = (_row) => {
        history.push("etudiantsAuEnseignant/" + _row.nom + "/" + _row.prenom + "/" + _row.id + "/" + _row.programme);
    }
    const handleClickDesAssigner = (_row) => {
        history.push("etudiantsAuEnseignant/" + _row.nom + "/" + _row.prenom + "/" + _row.id + "/" + _row.programme);
    }

    return (
        <React.Fragment>
            <TableRow hover  className={classes.row}>
                <TableCell className='align-middle'>{row.prenom} {row.nom}</TableCell>
                <TableCell className='align-middle'>{row.programme}</TableCell>
                <TableCell className='align-middle'>{row.email}</TableCell>
                <TableCell className='align-middle'>{row.telephone}</TableCell>
                <TableCell>
                    <Button className='m-2' variant="contained" size="small" color="primary" onClick={() => handleClickAssingner(row)} style={{ textTransform: 'none' }}>
                        Assigner étudiants
                    </Button>
                    <Button variant="outlined" size="small" color="primary"  onClick={() => handleClickDesAssigner(row)} style={{ textTransform: 'none' }} >
                        Voir étudiants assigneés
                    </Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};
function AlertAucunEnseignant() {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">Il n'y a pas d'enseignant inscrit</Alert>
            </div>
        </div>
    </div>;
}


