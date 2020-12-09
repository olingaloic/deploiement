import React from "react";
import {
    Button, makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
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

export default function ListStagesApprouve(props) {
    
    const classes = useStyles();

    if (props.stages.length === 0) {
        return (
            AlertAucunStage()
        )
    } else {
        return (
            <div className='container' >
                {props.stages &&
                    <>
                        <TableContainer className={classes.root}>
                            <Table className="table">
                                <TableHead className={classes.heading} >
                                    <TableRow >
                                        <TableCell className={classes.textTitle}> Titre </TableCell>
                                        <TableCell className={classes.textTitle}> Programme </TableCell>
                                        <TableCell className={classes.textTitle}> Date de début </TableCell>
                                        <TableCell className={classes.textTitle}> Date de fin </TableCell>
                                        <TableCell className={classes.textTitle}> Date limite offre </TableCell>
                                        <TableCell className={classes.textTitle}> Ville </TableCell>
                                        <TableCell className={classes.textTitle}> Employeur </TableCell>
                                        <TableCell className={classes.textTitle}> Étudiants </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.stages.map((row) => (
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

    const handleClickRow = (_row) => {
        history.push('/stage/' + _row.id + '/0');
    }

    return (
        <React.Fragment>
            <TableRow hover className={classes.row}>
                <TableCell className='align-middle'>{row.titre}</TableCell>
                <TableCell className='align-middle'>{row.programme}</TableCell>
                <TableCell className='align-middle'>{row.dateDebut}</TableCell>
                <TableCell className='align-middle'>{row.dateFin}</TableCell>
                <TableCell className='align-middle'>{row.dateLimiteCandidature}</TableCell>
                <TableCell className='align-middle'>{row.ville}</TableCell>
                <TableCell className='align-middle'>{row.employeur.nom}</TableCell>
                <TableCell>
                    <Button className='m-2' variant="contained" size="small" color="primary" onClick={() => handleClickRow(row)} style={{ textTransform: 'none' }}>
                        Assigner
                    </Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

function AlertAucunStage() {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">Il n'y a pas de stage approuvé</Alert>
            </div>
        </div>
    </div>;
}


