import { Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import EmployeurRegister from '../register/EmployeurRegister';
import EnseignantRegister from '../register/EnseignantRegister';
import EtudiantRegister from '../register/EtudiantRegister';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      margin: theme.spacing(2),
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      display: 'inline-flex',
      "& .MuiTab-wrapper": {
        flexDirection: "row",
        justifyContent: "flex-start"
      },
    },
    paper: {
      padding: theme.spacing(4),
      marginTop: theme.spacing(-18),
      margin: 'auto',
      maxWidth: '65%',
      marginLeft: theme.spacing(40),
    }
}));

export default function RegisterTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div className={classes.root}>

            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Étudiant" {...a11yProps(0)} />
                <Tab label="Employeur" {...a11yProps(1)} />
                <Tab label="Enseignant" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0} component='div' >
                <Paper className={classes.paper}>
                    <EtudiantRegister />
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Paper className={classes.paper} >
                    <EmployeurRegister />
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Paper className={classes.paper} >
                    <EnseignantRegister />
                </Paper>
            </TabPanel>

        </div>
    );
}

