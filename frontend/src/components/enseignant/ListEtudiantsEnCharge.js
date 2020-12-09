import {
    makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import EtudiantService from '../../service/EtudiantService';

import AuthService from "../../service/security/auth.service";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3',
        width: '100%',
        // fontWeight: 'bold',
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
    },
    textCell: {
        verticalAlign: 'middle'
    }
}));

export default function ListEtudiantsEnCharge(props) {
    const [candidatures, setCandidatures] = useState([])
    const classes = useStyles();
    const [isEnseignant, setIsEnseignant] = useState(false)


    const getEtudiant = async (id) => {
        const response = await EtudiantService.getEtudiantsbyEnseignat(id);
        setCandidatures(response.data);
    }

    useEffect(() => {
        var id = props.idEnseignant;
        if (id === undefined || id === null) {
            id = AuthService.getTokenDESC().toUpperCase() === "ROLE_ENSEIGNANT" ? AuthService.getTokenId() : '';
            setIsEnseignant(true)
        }

        getEtudiant(id)
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
                    <>
                        <TableContainer className={classes.root}>
                            <h4 align='left' className='m-2 sticky-top' >Étudiants en charge</h4>
                            <Table className="table">
                                <TableHead className={classes.heading}>
                                    <TableRow >
                                        <TableCell className={classes.textTitle} >Nom </TableCell>
                                        <TableCell className={classes.textTitle}>Courriel</TableCell>
                                        <TableCell className={classes.textTitle}>Téléphone</TableCell>
                                        <TableCell className={classes.textTitle}>Programme</TableCell>
                                        <TableCell className={classes.textTitle}>Adresse</TableCell>
                                        <TableCell className={classes.textTitle}>Matricule</TableCell>

                                        {!isEnseignant &&
                                            <TableCell className={classes.textTitle}>des -Assigner TODO</TableCell>
                                        }

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {candidatures.map((row) => (
                                        <Row key={row.id} row={row} isEnseignant={isEnseignant} />
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

    return (
        <React.Fragment>
            <TableRow hover className={classes.row} className='align-middle'>
                <TableCell className='align-middle'>{row.prenom} {row.nom}</TableCell>
                <TableCell className='align-middle'>{row.email}</TableCell>
                <TableCell className='align-middle'>{row.telephone}</TableCell>
                <TableCell className='align-middle'>{row.programme}</TableCell>
                <TableCell className='align-middle'>{row.adresse}</TableCell>
                <TableCell className='align-middle'>{row.matricule}</TableCell>
                {!props.isEnseignant &&
                    <TableCell>
                        <Button className='m-2' variant="contained" size="small" color="primary" style={{ textTransform: 'none' }}>
                            Assigner étudiants
                        </Button>
                    </TableCell>
                }
            </TableRow>
        </React.Fragment>
    );
};

function AlertAucunContrat() {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucune étudaint en charge pour le moment</Alert>
            </div>
        </div>
    </div>;
}



