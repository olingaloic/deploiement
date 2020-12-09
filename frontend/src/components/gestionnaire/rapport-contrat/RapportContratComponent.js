import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import ContratService from '../../../service/ContratService';
import ListeGenericContrat from './ListeGenericContrat';
import ListCandidatureChoisi from '../../contrat/ListCandidatureChoisi'

import {useHistory, useParams} from 'react-router-dom';

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

    var idSession = localStorage.getItem("session");

    const [contratsNonSigneEtudiant, setContratsNonSigneEtudiant] = useState([]);
    const getContratsNonSigneEtudiant = async () => {
        const response = await ContratService.getContratsNonSignesEtudiant(idSession);
        setContratsNonSigneEtudiant(response.data);
    }

    const [contratsNonSigneEmployeur, setContratsNonSigneEmployeur] = useState([]);
    const getContratsNonSigneEmployeur = async () => {
        const response = await ContratService.getContratsNonSignesEmployeur(idSession);
        setContratsNonSigneEmployeur(response.data);
    }

    const [contratsNonSigneAdministration, setContratsNonSigneAdministration] = useState([]);
    const getContratsNonSigneAdministration = async () => {
        const response = await ContratService.getContratsNonSignesAdministration(idSession);
        setContratsNonSigneAdministration(response.data);
    }

    useEffect(() => {
        getContratsNonSigneEtudiant();
        getContratsNonSigneEmployeur();
        getContratsNonSigneAdministration();
    }, [])

    const classes = useStyles();
    const history = useHistory();
    const params = useParams();
    const [value, setValue] = React.useState(parseInt(params.tab));
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      history.push("/rapportContrat/" + newValue)
    };

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
                    <Tab label="Contrats à générer" {...a11yProps(0)} />
                    <Tab label="Contrats non signés par employeur" {...a11yProps(1)} />
                    <Tab label="Contrats non signés par étudiant" {...a11yProps(2)} />
                    <Tab label="Contrats à envoyer à l'administration" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <ListCandidatureChoisi/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ListeGenericContrat contrats={contratsNonSigneEmployeur}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ListeGenericContrat contrats={contratsNonSigneEtudiant}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ListeGenericContrat contrats={contratsNonSigneAdministration}/>
            </TabPanel>
        </div>
    );
}