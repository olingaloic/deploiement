import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import EtudiantService from '../../../service/EtudiantService';
import ModifierEtudiantsEnchargeEnseignant from '../rapport-enseignant/ModifierEtudiantsEnchargeEnseignant';
import AssignerEtudiantsAuEnseignant from './AssignerEtudiantsAuEnseignant';

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
  
  export default function EnseignantsTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const params = useParams();
    const [listEtudiantsEnCharge, setListEtudiantsEnCharge] = useState([]);
    var idSession = localStorage.getItem("session");
    const labelAssigner= "Assigner des étudiants  " ;
    const labelModifier= "Désassigner des étudiants " ;

    const getEtudaints = async () => {
        const response = await EtudiantService.getEtudiantsbyEnseignat(params.id);
        setListEtudiantsEnCharge(response.data)
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
        getEtudaints();
        return () => {
            setListEtudiantsEnCharge([])
        }
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
            <Tab label= {labelAssigner}    {...a11yProps(0)} />
            <Tab label={labelModifier} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <AssignerEtudiantsAuEnseignant/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ModifierEtudiantsEnchargeEnseignant listEtudiantsEnCharge ={listEtudiantsEnCharge}/>        
        </TabPanel>
      </div>
    );
  }


