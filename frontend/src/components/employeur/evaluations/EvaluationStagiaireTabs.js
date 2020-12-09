import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import EvaluationsStagiaires from './EvaluationsAFaire';
import ListHistoriqueEvaluationsStagiaires from './ListHistoriqueEvaluationsStagiaires';

import AuthService from "../../../service/security/auth.service";

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
  tabPanel: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(-20),
    margin: 'auto',
    width: '80%',
    marginLeft: theme.spacing(30),
  }
}));

export default function EvaluationStagiaireTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const id = AuthService.getTokenDESC().toUpperCase() === "ROLE_EMPLOYEUR" ? AuthService.getTokenId() : '';

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
        <Tab className='text-left' label="Évaluations stagiaires" {...a11yProps(0)} />
        <Tab className='text-left' label="Historique des évaluations de stagiaire" {...a11yProps(1)} />

      </Tabs>
      <TabPanel value={value} index={0} className={classes.tabPanel} >
        <div>
          <EvaluationsStagiaires id={id} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabPanel}>
        <div>
        <ListHistoriqueEvaluationsStagiaires />
        </div>
      </TabPanel>

    </div>
  );
}

