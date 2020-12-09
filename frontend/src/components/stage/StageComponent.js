import React, {Component} from 'react';
import {Button} from '@material-ui/core';
import StageService from "../../service/StageService";
import '../../css/StageVeto.css';
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import * as PropTypes from "prop-types";
import StageInfo from "./StageInfoComponent";
import SelectionnerStagiaireComponent from "../employeur/SelectionnerStagiaireComponent";
import SelectionnerEtudiantComponent from "../gestionnaire/SelectionnerEtudiantComponent";

import CandidatureService from '../../service/CandidatureService';
import {useHistory, useParams} from 'react-router-dom';

import AuthService from "../../service/security/auth.service";

export default class StageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: {},
            employeur: {},
            candidatures: [],
            showModal: false
        };
        this.handleShowModal = this.handleShowModal.bind(this)
    }

    handleShowModal = () => this.setState({showModal: true});

    componentDidMount() {
        StageService.getStageById(this.props.match.params.id)
            .then((res) => {
                this.setState({stage: res.data})
                this.setState({employeur: res.data.employeur})
            })

        CandidatureService.getByStage(this.props.match.params.id)
            .then(res => {
                this.setState({candidatures: res.data})
            }
        )
    }

    render() {
        return (
            <div className="container">
                <MyTabs
                    stage={this.state.stage}
                    employeur={this.state.employeur}
                    candidatures={this.state.candidatures}
                />
            </div>
        );
    }
}

export function Veto(props){
    const approved = "APPROUVÉ";
    const denied = "REFUSÉ";

    const history = useHistory();

    function toggleBtns(isApprouved) {
        document.getElementsByName(approved)[0].disabled = isApprouved
        document.getElementsByName(denied)[0].disabled = !isApprouved
    }

    async function handleClickStatut(event) {
        event.preventDefault();

        props.stage.statut = event.currentTarget.name;
        props.stage.ouvert = event.currentTarget.name === approved;
        toggleBtns(event.currentTarget.name === approved);
        await StageService.updateStage(props.stage, parseInt(event.currentTarget.value));

        history.push("/rapportStage/1");
        window.location.reload();
    }

    return (
        <>
            <div>
                <h4>Informations à regarder: </h4>
                <ul>
                    <li>Est-ce que la durée du stage est suffisante?</li>
                    <li>Est-ce que la date de début est adéquate?</li>
                    <li>Est-ce que le nombre d'heures par semaine est réaliste?</li>
                    <li>Est-ce que le salaire est adéquat?</li>
                    <li>Est-ce que les exigences et la description sont adaptées pour le programme ciblé?</li>
                </ul>
            </div>
            <Button
                className='m-2' variant="contained" size="small" color="primary"
                name={approved}
                disabled={props.stage.statut === approved}
                value={props.stage.id}
                onClick={handleClickStatut}
            >
                Approuver
            </Button>
            <Button
                className='m-2' variant="contained" size="small" color="primary"
                name={denied}
                disabled={props.stage.statut === denied}
                value={props.stage.id}
                onClick={handleClickStatut}
            >
                Refuser
            </Button>
        </>
    );
}


function MyTabs(props) {

    const history = useHistory();
    const params = useParams();
    const [value, setValue] = React.useState(parseInt(params.tab));

    const handleChange = (event, newValue) => {
        setValue(newValue);
        history.push("/stage/" + props.stage.id + "/" + newValue)
    };

    const roles = [

        {stageApprouve: true, stageVeto: true, employeur: true},
        {stageApprouve: false, stageVeto: true, employeur: false},
        {stageApprouve: true, stageVeto: false, employeur: false},
        {stageApprouve: false, stageVeto: false, employeur: true},
    ];

    const tags = [
        {label: "Info", disabled: false},
        {label: "Approbation",  disabled: false},
        {label: "Assigner étudiants",  disabled: false},
        {label: "Choix des stagiaires",  disabled: props.candidatures.length === 0},
    ];
    const panels =[
        {component: <StageInfo stage={props.stage} employeur={props.employeur}/>},
        {component: <Veto stage={props.stage}/>},
        {component: <SelectionnerEtudiantComponent stage={props.stage}/>},
        {component: <SelectionnerStagiaireComponent id={props.stage.id}/>},
    ];

    let usedTags=[];
    let usedPanels=[];

    let useCase = "";
    if (AuthService.getTokenDESC().toUpperCase() === "ROLE_GESTIONNAIRE") {
        if (props.stage.statut === "APPROUVÉ") {
            useCase = "stageApprouve";
        }
        else{
            useCase = "stageVeto";
        }
    }
    else if (AuthService.getTokenDESC().toUpperCase() === "ROLE_EMPLOYEUR") {
        useCase = "employeur";
    }

    for (let i = 0; i < roles.length; i++){
        if(roles[i][useCase]){
            tags[i].id = usedTags.length;
            panels[i].id = usedPanels.length;
            usedTags.push(tags[i]);
            usedPanels.push(panels[i]);
        }
    }

    return (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
            >
                {usedTags.map(
                    tab =>
                        <Tab
                            key={tab.id}
                            label={tab.label}
                            disabled={tab.disabled}
                        />
                )}
            </Tabs>

            {usedPanels.map(
                panel =>
                    <TabPanel key={panel.id} value={value} index={panel.id}>
                        {panel.component}
                    </TabPanel>
            )}
        </>
    );

}

export function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

