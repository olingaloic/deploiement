import {
    makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from "react";
import CandidatureService from '../../../service/CandidatureService';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3',
        width: '70%',
        backgroundColor: '#E9E9E9',
        fontWeight: 'bold'
    },
    paper: {
        padding: theme.spacing(0),
        margin: 'auto',
        maxWidth: '50%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(10),
        fontWeight: theme.typography.fontWeightRegular,
    },
    textTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 15
    }
}));

const useRowStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            padding: theme.spacing(1),
            borderBottom: 'unset',
        },
    },
}));
export default function ListEtudiantsByEnseignant(props) {
    const [etudiants, setEtudiants] = useState([])
    const classes = useStyles();
    const params = useParams();

    const getEtudiants = async () => {
        const response = await CandidatureService.ListEtudiantsByEnseignant(params.id)
                setEtudiants(response.data);
    }

    useEffect(() => {
        getEtudiants()
        return () => {
            setEtudiants([])
        }
    }, [])


    if (etudiants.length === 0) {
        return (
            Alert()
        )
    } else {
        return (
            <div className='container-fluid'>
                {etudiants &&
                    <>
                        <TableContainer >
                            <Table className="table table-striped">
                                <TableHead className={classes.root}>
                                    <TableRow >
                                        <TableCell className={classes.textTitle}>Nom </TableCell>
                                        <TableCell className={classes.textTitle}>Courriel</TableCell>
                                        <TableCell className={classes.textTitle}>Téléphone</TableCell>
                                        <TableCell className={classes.textTitle}>Adresse</TableCell>
                                        <TableCell className={classes.textTitle}>Stage en cours</TableCell>
                                        <TableCell className={classes.textTitle}>Étudiant</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {etudiants.map((row) => (
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
    const classes = useRowStyles();
    const [arrow, setArrow] = useState(false);
    const history = useHistory();

    const handleClickRow = (_row) => {
        history.push("/evaluationMilieuStage/" + _row.id);
    }

    const showArrow = () => {
        setArrow(true)
    }

    const hideArrow = () => {
        setArrow(false)
    }

    return (
        <React.Fragment>
            <Tooltip open={arrow} placement="left" onClose={hideArrow} onOpen={showArrow} title="evaluer">
                <TableRow className={classes.root} onClick={() => handleClickRow(row)} style={{ cursor: 'pointer' }} hover>
                    <TableCell >{row.stage.employeur.nom}</TableCell>
                    <TableCell >{row.stage.employeur.email}</TableCell>
                    <TableCell>{row.stage.employeur.telephone}</TableCell>
                    <TableCell>{row.stage.employeur.adresse}</TableCell>
                    <TableCell >{row.stage.titre}</TableCell>
                    <TableCell >{row.etudiant.prenom} {row.etudiant.nom}
                    </TableCell>
                   {/* {arrow &&
                         <ArrowForwardIcon color='disabled' fontSize='large'/>
                    }  */}
                </TableRow>
            </Tooltip>
        </React.Fragment>
    );

};




