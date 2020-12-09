import React, {Component} from "react";
import CandidatureService from "../../service/CandidatureService";
import CVService from "../../service/CVService";
import GetAppIcon from '@material-ui/icons/GetApp';
import {makeStyles} from "@material-ui/core/styles";
import {
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    Paper,
    Table,
    TableRow,
    Checkbox, Button
} from "@material-ui/core";

import {useHistory} from 'react-router-dom';

export default class SelectionnerStagiaireComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {candidatures: []};
        this.accepteCandidature = this.accepteCandidature.bind(this);
    }

    async componentDidMount() {
        const {data: candidatures} = await CandidatureService.getByStage(this.props.id);

        this.setState({candidatures});
    }

    accepteCandidature(candidature) {
        CandidatureService.putCandidatureApprouve(candidature.id);
        this.setState({});
        setTimeout(function () {
            window.location.reload();
        }, 500);
    }

    render() {

        return (
            <div>
                <h5 className="card-title text-center">Liste des candidats</h5>
                <CustomTable
                    candidatures={this.state.candidatures}
                    alreadySelect={this.state.candidatures.filter(c => c.statut.includes("APPROUVE")).map((c) => c)}
                />
            </div>
        );
    }
}

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

function CustomTable(props) {
    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    
    const [selectedObj, setSelectedObj] = React.useState([]);

    const history = useHistory();

    const [flag, setFlag] = React.useState(true);
    const isSelected = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        let newSelectedObj = [];
        if (props.alreadySelect.length !== []) {  
            for (let i = 0; i < props.alreadySelect.length; i++) {
                if (props.alreadySelect[i].id === id && selectedIndex === -1 && flag){
                    newSelected = newSelected.concat(selected, props.alreadySelect[i].id);
                    newSelectedObj = newSelectedObj.concat(selectedObj, props.alreadySelect[i]);
                    setSelected(newSelected);
                    setSelectedObj(newSelectedObj);
                    return selectedIndex !== -1;
                }
            }
        }
        return selectedIndex !== -1;
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.candidatures.map((c) => c.id);
            setSelected(newSelecteds);
            const newSelectedsObj = props.candidatures.map((c) => c.id);
            setSelectedObj(newSelectedsObj);
            return;
        }
        setFlag(false);
        setSelected([]);
    };

   const handleClickSelect = (candidature) => {
        const selectedIndex = selected.indexOf(candidature.id);
        let newSelected = [];
        let newSelectedObj = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, candidature.id);
            newSelectedObj = newSelectedObj.concat(selectedObj, candidature);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            newSelectedObj = newSelectedObj.concat(selectedObj.slice(1));
            setFlag(false);
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            newSelectedObj = newSelectedObj.concat(selectedObj.slice(0, -1));
            setFlag(false);
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
            newSelectedObj = newSelectedObj.concat(
                selectedObj.slice(0, selectedIndex),
                selectedObj.slice(selectedIndex + 1),
            );
            setFlag(false);
        }

        setSelected(newSelected);
        setSelectedObj(newSelectedObj);
    };

    function handleConfirmation(event) {
        event.preventDefault();
        if (selected.length === 0) {
            return;
        }
        for (let i = 0; i < selected.length; i++) {
            CandidatureService.putCandidatureApprouve(selected[i]);
        }
        setTimeout(function () {
            history.push("/rapportStageEmployeur/0");
            window.location.reload();
        }, 500);
    }


    function downloadCV(etudiant) {
        CVService.getCVByEtudiant(etudiant).then((response) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', "CV_" + etudiant.prenom + "_" + etudiant.nom + ".pdf");
            document.body.appendChild(link);
            link.click();
        });
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead className={classes.textTitle}>
                        <TableRow>
                            <TableCell padding="checkbox" className={classes.textTitle}>
                                <Checkbox
                                    checked={props.candidatures.length > 0 && selected.length === props.candidatures.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell className={classes.textTitle}>Prénom</TableCell>
                            <TableCell className={classes.textTitle}>Nom</TableCell>
                            <TableCell className={classes.textTitle}>Programme</TableCell>
                            <TableCell className={classes.textTitle}>CV</TableCell>
                            <TableCell className={classes.textTitle}>Téléphone</TableCell>
                            <TableCell className={classes.textTitle}>Email</TableCell>
                            <TableCell className={classes.textTitle}>Adresse</TableCell>
                            <TableCell>Statut</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {props.candidatures
                            .map(
                                candidature => {
                                    const isItemSelected = isSelected(candidature.id)
                                    return (

                                        <TableRow
                                            key={candidature.id}
                                            hover
                                            onClick={(event) => handleClickSelect(candidature)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                />
                                            </TableCell>
                                            <TableCell>{candidature.etudiant.prenom}</TableCell>
                                            <TableCell>{candidature.etudiant.nom}</TableCell>
                                            <TableCell>{candidature.etudiant.programme}</TableCell>
                                            <TableCell>
                                                <button onClick={() => downloadCV(candidature.etudiant)}
                                                        className="btn "><GetAppIcon/></button>
                                            </TableCell>
                                            <TableCell>{candidature.etudiant.telephone}</TableCell>
                                            <TableCell>{candidature.etudiant.email}</TableCell>
                                            <TableCell>{candidature.etudiant.adresse}</TableCell>
                                            <TableCell>{candidature.statut}</TableCell>
                                        </TableRow>
                                    );
                                }
                            )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button variant="contained" className=' m-2' color="primary" onClick={handleConfirmation}>Confirmer</Button>
        </>
    );
}
