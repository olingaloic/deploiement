import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import EnseignantService from '../../service/EnseignantService';

import ProfilEnseignantMotsDePasse from './ProfilEnseignantMotsDePasse';

import { Avatar, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import photo from '../../images/photo-avatar-profil.png';

import AuthService from "../../service/security/auth.service";

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
    marginTop: theme.spacing(-10),
    margin: 'auto',
    maxWidth: '75%',
    marginLeft: theme.spacing(35),
  }
}));

export default function ProfileHome() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  
  const id = AuthService.getTokenDESC().toUpperCase() === "ROLE_ENSEIGNANT" ? AuthService.getTokenId() : '';

  const [enseignant, setEnseignant] = useState('')
  const getEnseignant = async () => {
        const response = await EnseignantService.getEnseignantById(id);
        setEnseignant(response.data);
  }

  useEffect(() => {
        getEnseignant()
        return () => {
            setEnseignant('')
        }
  }, [])

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
        <Tab label="Votre profile" {...a11yProps(0)} />
        <Tab label="Changer mot de passe" {...a11yProps(1)} />

      </Tabs>
      <TabPanel value={value} index={0} component={'span'} variant={'body2'}>
            <Paper className={classes.paper} >
                <Typography variant="h4" align='center'>
                    Votre profile
                </Typography>
                <div className='row justify-content-md-center p-4'>
                    <Avatar alt={enseignant.nom} src={photo} className={classes.large} />
                </div>

                <Typography variant="h4" align='center'>{enseignant.prenom} {enseignant.nom}</Typography>
                <Typography variant="subtitle2" align='center'>{enseignant.programme} </Typography>
                <br></br>

                <Typography variant="subtitle2" align='center'>
                    <PersonIcon /> <strong>Information</strong>
                </Typography>
                <br></br>

                <div className='container text-left justify-content-center'>
                    <div className='row justify-content-center '>
                        <div className='col-sm-2'>
                            <Typography variant="subtitle2" align='left'><strong>Téléphone: </strong></Typography>
                        </div>
                        <div className='col-sm-2'>
                            <Typography variant="subtitle2" align='left'>{enseignant.telephone}</Typography>
                        </div>
                    </div>

                    <div className='row justify-content-center'>
                        <div className='col-sm-2'>
                            <Typography variant="subtitle2" align='left'><strong>Email:</strong></Typography>
                        </div>
                        <div className='col-sm-2'>
                            <Typography variant="subtitle2" align='left'>{enseignant.email}</Typography>
                        </div>
                    </div>
                </div>
            </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
            <Paper className={classes.paper} >
                <Typography variant="h4" align='center'>Changer votre mot de passe</Typography>
                <ProfilEnseignantMotsDePasse/>
                <Typography variant="subtitle2" align='center'>
                    *Votre nouveau mot de passe doit comprendre 1 majuscule, 1 minuscule et 1 chiffre
                </Typography>
            </Paper>
      </TabPanel>
    </div>
  );
}

