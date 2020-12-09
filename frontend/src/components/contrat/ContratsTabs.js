import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import ListeContratsSignature from './ListeContratsSignature';
import ListeContrats from './ListeContrats';
import ContratService from '../../service/ContratService';
import EtudiantService from "../../service/EtudiantService";

import {useHistory, useParams} from 'react-router-dom';

import AuthService from "../../service/security/auth.service";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
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

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ScrollableTabsButtonAuto() {

    const classes = useStyles();
    const history = useHistory();
    const params = useParams();
    const [value, setValue] = React.useState(parseInt(params.tab));
  
    const getRegisterd = async () => {
        if (AuthService.getTokenDESC().toUpperCase() === "ROLE_ETUDIANT") {
            const redirect = await EtudiantService.isRegistered(AuthService.getTokenId());
            if (!redirect.data) {
                history.push("/profilEtudiant/0");
            }
        }   
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
      history.push("/listeContrats/" + newValue)
    };

    const [contratsNonSigne, setContratsNonSigne] = useState([]);
    const getContratsNonSigne = async () => {
        let response = [];
        if (AuthService.getTokenDESC().toUpperCase() === "ROLE_EMPLOYEUR") {
            let contrats = await ContratService.getContratByEmployeurId(AuthService.getTokenId());
            response = contrats.data.filter(contrat => contrat.signatureEmployeur.includes("PAS_SIGNE") && 
                                                       contrat.signatureEtudiant.includes("PAS_SIGNE"));
        }
        else if (AuthService.getTokenDESC().toUpperCase() === "ROLE_ETUDIANT") {
            let contrats  = await ContratService.getContratByEtudiantId(AuthService.getTokenId());
            response = contrats.data.filter(contrat => contrat.signatureEmployeur.includes("SIGNE") && 
                                                       contrat.signatureEtudiant.includes("PAS_SIGNE"));
        }
        setContratsNonSigne(response);
    }

    const [contratsEnAttente, setContratsEnAttente] = useState([]);
    const getContratsEnAttente = async () => {
        let response = [];
        if (AuthService.getTokenDESC().toUpperCase() === "ROLE_EMPLOYEUR") {
            let contrats = await ContratService.getContratByEmployeurId(AuthService.getTokenId());
            response = contrats.data.filter(contrat => contrat.signatureEmployeur.includes("EN_ATTENTE") && 
                                                       contrat.signatureEtudiant.includes("PAS_SIGNE"));
        }
        else if (AuthService.getTokenDESC().toUpperCase() === "ROLE_ETUDIANT") {
            let contrats  = await ContratService.getContratByEtudiantId(AuthService.getTokenId());
            response = contrats.data.filter(contrat => contrat.signatureEmployeur.includes("SIGNE") && 
                                                       contrat.signatureEtudiant.includes("EN_ATTENTE"));
        }
        setContratsEnAttente(response);
    }

    const [contratsSigne, setContratsSigne] = useState([]);
    const getContratsSigne = async () => {
        let response = [];
        if (AuthService.getTokenDESC().toUpperCase() === "ROLE_EMPLOYEUR") {
            let contrats = await ContratService.getContratByEmployeurId(AuthService.getTokenId());
            console.log(contrats.data);
            response = contrats.data.filter(contrat => !contrat.signatureEmployeur.includes("PAS_SIGNE") &&
                                                       !contrat.signatureEmployeur.includes("EN_ATTENTE"));
        }
        else if (AuthService.getTokenDESC().toUpperCase() === "ROLE_ETUDIANT") {
            let contrats  = await ContratService.getContratByEtudiantId(AuthService.getTokenId());
            response = contrats.data.filter(contrat => !contrat.signatureEtudiant.includes("PAS_SIGNE") && 
                                                       !contrat.signatureEtudiant.includes("EN_ATTENTE"));
        }
        setContratsSigne(response);
    }

    useEffect(() => {
        getRegisterd();
        getContratsNonSigne();
        getContratsEnAttente();
        getContratsSigne();
    }, [])

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Contrats à signer" {...a11yProps(0)} />
                    <Tab label="Contrats en attente d'approbation" {...a11yProps(1)} />
                    <Tab label="Contrats approuvés" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <ListeContrats contrats={contratsNonSigne}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ListeContratsSignature contrats={contratsEnAttente}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ListeContratsSignature contrats={contratsSigne}/>
            </TabPanel>
        </div>
    );
}