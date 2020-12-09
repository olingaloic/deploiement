import React, {Component } from "react";
import EtudiantService from '../../service/EtudiantService';
import StageService from '../../service/StageService';

import {
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    Paper,
    Table,
    TableRow,

    Checkbox,
    Button
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

import {useHistory} from 'react-router-dom';

export default class SelectionnerEtudiantComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { etudiants: [], etudiantsPermis: [] };
    }

    async componentDidMount() {
        let stage = this.props.stage;
        const { data: etudiants } = await EtudiantService.getEtudiantsByProgramme(this.props.stage.programme, localStorage.getItem("session"));

        this.setState({ etudiants });

        const { data: etudiantsPermis } = await StageService.getEtudiantsByStageId(stage.id);
        this.setState({ etudiantsPermis });
    }

    render() {
        return (
            <div>
                <CustomTable etudiants={this.state.etudiants} stage={this.props.stage} etudiantsPermis={this.state.etudiantsPermis}/>
            </div>
        );
    }
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        color: "#000000"
    },
    table:{
        color:"#ffffff",
    }
}));

function CustomTable(props){
    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    
    const [selectedObj, setSelectedObj] = React.useState([]);

    const history = useHistory();

    const [flag, setFlag] = React.useState(true);
    const isSelected = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        let newSelectedObj = [];
        if (props.etudiantsPermis.length !== []) {  
            for (let i = 0; i < props.etudiantsPermis.length; i++) {
                if (props.etudiantsPermis[i].id === id && selectedIndex === -1 && flag){
                    newSelected = newSelected.concat(selected, props.etudiantsPermis[i].id);
                    newSelectedObj = newSelectedObj.concat(selectedObj, props.etudiantsPermis[i]);
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
            const newSelecteds = props.etudiants.map((etudiant) => etudiant.id);
            setSelected(newSelecteds);
            const newSelectedsObj = props.etudiants.map((etudiant) => etudiant);
            setSelectedObj(newSelectedsObj);
            return;
        }
        setFlag(false);
        setSelected([]);
    };

    const handleClickSelect = (etudiant) => {
        const selectedIndex = selected.indexOf(etudiant.id);
        let newSelected = [];
        let newSelectedObj = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, etudiant.id);
            newSelectedObj = newSelectedObj.concat(selectedObj, etudiant);
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


    function handleConfirmation(event){
        event.preventDefault();
        if (selected.length === 0) {
            return;
        }
        StageService.addEtudiants(props.stage.id, selectedObj);
        setTimeout(function() {
            history.push("/rapportStage/0");
            window.location.reload();
        }, 500);
    }


    return(
        <>
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={props.etudiants.length > 0 && selected.length === props.etudiants.length}
                                onChange={handleSelectAllClick}
                            />
                        </TableCell>
                        <TableCell>Prénom</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Programme</TableCell>
                        <TableCell>Téléphone</TableCell>
                        <TableCell>Courriel</TableCell>
                        <TableCell>Adresse</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.etudiants
                        .map(
                            etudiant => {
                                const isItemSelected = isSelected(etudiant.id)
                                return (

                                    <TableRow
                                        key={etudiant.id}
                                        hover
                                        onClick={(event) => handleClickSelect(etudiant)}
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
                                        <TableCell>{etudiant.prenom}</TableCell>
                                        <TableCell>{etudiant.nom}</TableCell>
                                        <TableCell>{etudiant.programme}</TableCell>
                                        <TableCell>{etudiant.telephone}</TableCell>
                                        <TableCell>{etudiant.email}</TableCell>
                                        <TableCell>{etudiant.adresse}</TableCell>
                                    </TableRow>
                                );
                            }
                        )}
                </TableBody>

            </Table>
        </TableContainer>
            <Button variant="contained" color="primary" onClick={handleConfirmation}>Confirmer</Button>
                            
        </>
    );
}
