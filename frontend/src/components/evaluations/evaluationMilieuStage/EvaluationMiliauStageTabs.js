import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import ListEvaluationMilieuStage from './ListEvaluationMilieuStage'
import HistoriqueEvaluationsMilieuStage from './HistoriqueEvaluationsMilieuStage'

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
    display: 'flex',


    //height: 224,
    margin: theme.spacing(3),
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
    marginTop: theme.spacing(-10),
    margin: 'auto',
    width: '80%',
    marginLeft: theme.spacing(1, 'inherit'),
  }
}));

export default function EvaluationMiliauStageTabs() {
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

        <Tab className='text-left' label="Évaluations de milieu de stage en attente" {...a11yProps(0)} />
        <Tab className='text-left' label="Historique des évaluations" {...a11yProps(1)} />

      </Tabs>
      <TabPanel value={value} index={0} className={classes.tabPanel} >
        <div className='mt-4'>
          <ListEvaluationMilieuStage />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabPanel} >
        <div className='mt-4'>
          <HistoriqueEvaluationsMilieuStage />
        </div>

      </TabPanel>

    </div>
  );
}


