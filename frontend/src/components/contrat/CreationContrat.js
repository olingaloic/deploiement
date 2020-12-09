import { Card, CardActions, CardContent } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import CandidatureService from '../../service/CandidatureService';
import CreationContratApercue from './CreationContratApercue';
import Televerser from './Televerser';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightRegular,

  },
  paper: {
    width: '80%',
    margin:'auto'
  }
}));


function CreationContrat() {
  const [candidatureFinal, setCandidatureFinal] = useState('')
  const classes = useStyles();
  const [isCreationAuto, setIsCreationAuto] = useState(false);
  const [isTeleversement, setIsTeleversement] = useState(false)
  const { params } = useRouteMatch();

  const getcandidaturefinal = async () => {
    const response = await CandidatureService.getById(params.id);
    setCandidatureFinal(response)
  }

  useEffect(() => {
    getcandidaturefinal();
    return () => {
      setCandidatureFinal('');
    }
  }, [])

  const creationAutomatique = () => {
    setIsCreationAuto(true)
    setIsTeleversement(false)

  }
  const creationParTeleversement = () => {
    setIsTeleversement(true)
    setIsCreationAuto(false)
  }

  return (
    <Paper className="container">

      {/* info contrat */}


      {candidatureFinal &&
        <div className='container'>
          <h4 className='m-3 sticky-top' align='center' >Informations du contrat </h4>
          <div className='row justify-content-md-center'>
            <div >
              <CreateTableauEtudiant candidatureFinal={candidatureFinal} />
            </div>
            <div  >
              <CreateTableauEntreprise candidatureFinal={candidatureFinal} />
            </div>

            <div  >
              <CreateTableauStage candidatureFinal={candidatureFinal} />
            </div>

          </div>
        </div>
      }

      {/* creation contrat */}

      <div className='row justify-content-md-center'>
        <div className='m-3'>
          <Button variant="contained" color="primary"
            component="span"
            fullWidth onClick={creationAutomatique}
          >
            Créer un contrat automatiquement
           </Button>
        </div>

        <div className='m-3'>
          <Button variant="contained" color="primary" component="span"
            fullWidth
            onClick={creationParTeleversement}>
            Téléverser un fichier depuis mon ordinateur
            </Button>
        </div>
      </div>

      {isCreationAuto &&
        <div className="row ">
          <Card className="col ">
            <CardActionArea>
              <CardContent className="text-center">
                <Typography className={classes.heading} >
                  <AnnouncementIcon className="mr-3 " style={{ color: "#F2DE15  " }} />
            La création automatique permet d'utiliser un modèle de contrat défini par le Cégep.
            Ce contrat inclura automatiquement les informations de l'entreprise, de l'étudiant et du stage.
              </Typography>
              </CardContent >

            </CardActionArea >
            <CardActions className="row justify-content-md-center ">
              <CreationContratApercue />
            </CardActions>
          </Card>
        </div>
      }
      {/* televerser lui meme */}
      {isTeleversement &&

        <div className="row">
          <Card className="col">
            <CardActionArea>
              <CardContent className="text-center">
                <Typography className={classes.heading} >
                  <AnnouncementIcon className="mr-3 " style={{ color: "#F2DE15  " }} />
                  Seuls les fichiers au format PDF sont acceptés.
              </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className="row justify-content-md-center m-3">
              <Televerser idCandidture={params.id} />
            </CardActions>
          </Card>
        </div>
      }
    </Paper >
  )


}
export default CreationContrat;

const useStylesCards = makeStyles((theme) => ({
  root: {
    width: 'auto',
    padding: theme.spacing(1),
    marginLeft: theme.spacing(5),
    height:"90%"
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "Bold",
    borderBottom: '1'
  },
  title: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontSize: 18,
    fontWeight: "Bold",
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
  },
  pos: {
    marginBottom: 12,
  },
}));



function CreateTableauEntreprise(props) {
  const classes = useStylesCards();

  return (

    <Card className={classes.root}>
      <CardContent>

        <Typography variant="h5" component="h2" 
          className={classes.title} 
        >  Entreprise   </Typography>

        <Typography className={classes.subtitle}> Nom </Typography>
        <Typography className={classes.pos}> {props.candidatureFinal.stage.employeur.nom} </Typography>

        <Typography className={classes.subtitle}> Email </Typography>
        <Typography className={classes.pos}> {props.candidatureFinal.stage.employeur.email} </Typography>

        <Typography className={classes.subtitle}> Adresse   </Typography>
        <Typography className={classes.pos}> {props.candidatureFinal.stage.employeur.adresse} </Typography>


        <Typography className={classes.subtitle}>Téléphone  </Typography>
        <Typography className={classes.pos}> {props.candidatureFinal.stage.employeur.telephone} </Typography>

      </CardContent>
    </Card>
  )
}

function CreateTableauEtudiant(props) {
  const classes = useStylesCards();

  return (
    <Card className={classes.root}>
      <CardContent>

        <Typography variant="h5" component="h2" className={classes.title}> Étudiant</Typography>

        <Typography className={classes.subtitle}> Nom</Typography>
        <Typography className={classes.pos}>{props.candidatureFinal.etudiant.nom}   {props.candidatureFinal.etudiant.prenom}</Typography>

        <Typography className={classes.subtitle}>Email</Typography>
        <Typography className={classes.pos}>{props.candidatureFinal.etudiant.email}</Typography>

        <Typography className={classes.subtitle}>Adresse</Typography>
        <Typography className={classes.pos}>{props.candidatureFinal.etudiant.adresse} </Typography>

        <Typography className={classes.subtitle}>Téléphone</Typography>
        <Typography className={classes.pos}>{props.candidatureFinal.etudiant.telephone}</Typography>

        <Typography className={classes.subtitle}>Programme</Typography>
        <Typography className={classes.pos}>{props.candidatureFinal.etudiant.programme} </Typography>


      </CardContent>
    </Card >
  )
}

function CreateTableauStage(props) {
  const classes = useStylesCards();
  return (


    <Card className={classes.root}>
      <CardContent>

        <Typography variant="h5" component="h2" className={classes.title}> Stage</Typography>




        <Typography className={classes.subtitle}> Titre</Typography>
        <Typography className={classes.pos}>{props.candidatureFinal.stage.titre}</Typography>

        <Typography className={classes.subtitle}> Date de début</Typography>
        <Typography className={classes.pos}>{props.candidatureFinal.stage.dateDebut} </Typography>

        <Typography className={classes.subtitle}> Date de fin</Typography>
        <Typography className={classes.pos}> {props.candidatureFinal.stage.dateFin} </Typography>

        <Typography className={classes.subtitle}> Nombre d'heures par semaine </Typography>
        <Typography className={classes.pos}>{props.candidatureFinal.stage.nbHeuresParSemaine} </Typography>

        <Typography className={classes.subtitle}> Ville</Typography>
        <Typography className={classes.pos}> {props.candidatureFinal.stage.ville}  </Typography>

      </CardContent>

    </Card >
  )
}

