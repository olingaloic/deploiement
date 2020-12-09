import {
    makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from "react";
import EtudiantService from '../../../service/EtudiantService';
import CVService from '../../../service/CVService';
import GetAppIcon from '@material-ui/icons/GetApp';
import SessionService from "../../../service/SessionService";


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

export default function ListEtudiants(props) {
    const classes = useStyles();

    const [sessionSelectionneeEnCours, setSessionSelectionneeEnCours] = useState([]);

    var idSession = localStorage.getItem("session");

    const isSessionSelectionneeEnCours = async () => {
        const response = await SessionService.isSessionSelectionneeEnCours(idSession);
        setSessionSelectionneeEnCours(response.data);
    }

    useEffect(() => {
        isSessionSelectionneeEnCours();
        return () => {
        }
    }, [])


    if (props.etudiants.length === 0) {
        return (
            AlertAucunCV()
        )
    } else {
        return (
            <div className='container' >
                {props.etudiants &&
                    <>
                        <TableContainer  className={classes.root}>
                            <Table className="table ">
                                <TableHead className={classes.heading}>
                                    <TableRow>
                                        <TableCell className={classes.textTitle}>Matricule</TableCell>
                                        <TableCell className={classes.textTitle}>Nom</TableCell>
                                        <TableCell className={classes.textTitle}>Programme</TableCell>
                                        <TableCell className={classes.textTitle}>Courriel</TableCell>
                                        <TableCell className={classes.textTitle}>Téléphone</TableCell>
                                        <TableCell className={classes.textTitle}>Télécharger</TableCell>
                                        <TableCell className={classes.textTitle} hidden={!sessionSelectionneeEnCours}>Approbation CV</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.etudiants.map((row) => (
                                        <Row key={row.id} row={row} sessionSelectionneeEnCours={sessionSelectionneeEnCours}/>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                }
            </div>
        )
    }
}

function Row(props) {
    const { row } = props;
    const classes = useStyles();

    const handleClickRow = (isValid, id) => {
        CVService.updateCVStatus(isValid, id);
        window.location.reload(false);
    }

    const downloadCV = (etudiant) => {
        CVService.getCVByEtudiant(etudiant).then((response) => {

        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', "CV_" + etudiant.prenom + "_" + etudiant.nom + ".pdf");
            document.body.appendChild(link);
            link.click();
        });
    }

    const renderColonneApprobationCV = (etudiant) => {
        if (etudiant.cv.status === 'APPROVED'){
            return <p>Approuvé</p>
        }
        if (etudiant.cv.status === 'UNREVIEWED') {
            return(
            <div>
                <Button className='m-2' variant="contained" size="small" color="primary" onClick={() => handleClickRow(true, row.cv.id)} style={{ textTransform: 'none' }}>
                    Approuver
                </Button>
            
                <Button className='m-2' variant="contained" size="small" color="primary" onClick={() => handleClickRow(false, row.cv.id)} style={{ textTransform: 'none' }}>
                    Refuser
                </Button>  
            </div>
            )
        }
    }

    return (
        <React.Fragment>
            <TableRow hover className={classes.row}>
                <TableCell className='align-middle'>{row.matricule}</TableCell>
                <TableCell className='align-middle'>{row.prenom} {row.nom}</TableCell>
                <TableCell className='align-middle'>{row.programme}</TableCell>
                <TableCell className='align-middle'>{row.email}</TableCell>
                <TableCell className='align-middle'>{row.telephone}</TableCell>
                
                <TableCell className='align-middle'>
                    {row.cv.status !== "APPROVED" ?
                    <Button className='m-2' size="small"color="primary" onClick={() => downloadCV(row)}><GetAppIcon/></Button> : "Pas de CV"}<br/>
                </TableCell>

                <TableCell className='align-middle' hidden={!props.sessionSelectionneeEnCours}>
                    {renderColonneApprobationCV(row)}
                </TableCell>
            </TableRow>

        </React.Fragment>
    )
}

function AlertAucunCV() {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">Il n'y a pas d'etudiants avec un CV non approuvé</Alert>
            </div>
        </div>
    </div>
}


