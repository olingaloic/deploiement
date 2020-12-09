
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import StageService from '../../../service/StageService';
import ListeGenericStage from './ListeGenericStage';
import ApprobationStage from './ApprobationStage';
import ListeStageApprouve from './ListeStageApprouve';

import {useHistory, useParams} from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
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
    
    let idSession = localStorage.getItem("session");


    const [offreStagesApprouve, setOffreStagesApprouve] = useState([]);
    const getOffreStagesApprouve = async () => {
        const response = await StageService.getStagesApprouves(idSession);
        setOffreStagesApprouve(response.data);
    }

    const [offreStagesNonCombles, setOffreStagesNonCombles] = useState([]);
    const getOffreStagesNonCombles = async () => {
        const response = await StageService.getStagesNonCombles(idSession);
        setOffreStagesNonCombles(response.data);
    }

    useEffect(() => {
      getOffreStagesApprouve();
      getOffreStagesNonCombles();
    },[])

    const classes = useStyles();
    const history = useHistory();
    const params = useParams();
    const [value, setValue] = React.useState(parseInt(params.tab));
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      history.push("/rapportStage/" + newValue); 
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
            <Tab label="Stages approuvés" {...a11yProps(0)} />
            <Tab label="Stages non approuvés" {...a11yProps(1)} />
            <Tab label="Stages non comblés" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ListeStageApprouve stages={offreStagesApprouve}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ApprobationStage/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ListeGenericStage stages={offreStagesNonCombles}/>
        </TabPanel>
      </div>
    );
  }