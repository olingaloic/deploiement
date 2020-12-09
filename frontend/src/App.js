import React from 'react';
import './App.css';

import Login from "./components/Login";
import {Route, Switch} from 'react-router-dom';
import Home from "./components/Home";
import HeaderComponent from "./components/HeaderComponent";

import CreateStageComponent from './components/stage/CreateStageComponent';
import ApplicationStageComponent from "./components/etudiant/ApplicationStageComponent";
import ListeCandidaturesEtudiantComponent from './components/etudiant/ListeCandidaturesEtudiantComponent';

import CreationContrat from './components/contrat/CreationContrat';
import TeleverserContrat from './components/utils/TeleverserContrat';

import StageComponent from "./components/stage/StageComponent";

import QuestionProductivite from './components/evaluations/evaluationStagiaire/QuestionProductivite';
import QuestionQualiteTravail from './components/evaluations/evaluationStagiaire/QuestionQualiteTravail';
import QuestionRelations from './components/evaluations/evaluationStagiaire/QuestionRelations';
import QuestionsHabilites from './components/evaluations/evaluationStagiaire/QuestionsHabilites';
import EvaluationMilieuStage from './components/evaluations/evaluationMilieuStage/EvaluationMilieuStage';
import EvaluationStagiaire from './components/evaluations/evaluationStagiaire/EvaluationStagiaire';
import EvaluationStagiaireTabs from './components/employeur/evaluations/EvaluationStagiaireTabs';
import {createMuiTheme} from "@material-ui/core";
import ContratsTabs from "./components/contrat/ContratsTabs";

import ProfilEmployeur from './components/employeur/ProfilEmployeur';
import ProfilGestionnaire from './components/gestionnaire/ProfilGestionnaire';
import ProfilEtudiant from './components/etudiant/ProfilEtudiant';

import ProfilEnseignant from './components/enseignant/ProfilEnseignant';
import EvaluationMiliauStageTabs from './components/evaluations/evaluationMilieuStage/EvaluationMiliauStageTabs';
import ListEtudiantsEnCharge from './components/enseignant/ListEtudiantsEnCharge';
import RegisterTabs from './components/register/RegisterTabs';
import EnseignantsTabs from './components/gestionnaire/rapport-enseignant/EnseignantsTabs';
import RapportEnseignantComponent from './components/gestionnaire/rapport-enseignant/RapportEnseignantComponent';
import RapportEtudiantComponent from './components/gestionnaire/rapport-etudiant/RapportEtudiantComponent';
import RapportStageComponent from './components/gestionnaire/rapport-stage/RapportStageComponent';
import RapportContratComponent from './components/gestionnaire/rapport-contrat/RapportContratComponent';
import RapportEvaluationsComponent from './components/gestionnaire/rapport-evaluations/RapportEvaluationsComponents'

import RapportStageEmployeur from './components/employeur/stage/RapportStageEmployeur';
import ThemeProvider from "@material-ui/styles/ThemeProvider";


import AuthRoute from "./components/security/AuthRoute";

function App() {
  return (
    
      <main>
        <ThemeProvider theme={theme}>
        <HeaderComponent />
        <Switch>
          {/* No role required */}  
          <Route path="/" exact component={Home}/>
          <Route path='/login' component={Login} />
          <Route path='/register' component={RegisterTabs} />
          {/* Auth role required */}  
          <AuthRoute path='/offrestage' component={ApplicationStageComponent} requiredRole="ROLE_ETUDIANT"/>
          <AuthRoute path='/createStage' component={CreateStageComponent} requiredRole="ROLE_EMPLOYEUR"/>
          <AuthRoute path='/listecandidatures' component={ListeCandidaturesEtudiantComponent} requiredRole="ROLE_ETUDIANT"/>
          <AuthRoute path='/CreationContrat/:id' component={CreationContrat} requiredRole="ROLE_GESTIONNAIRE"/>

          <AuthRoute path='/televerserContrats/:id' component={TeleverserContrat} requiredRole={["ROLE_EMPLOYEUR", "ROLE_ETUDIANT"]}/>
          <AuthRoute path='/listeContrats/:tab' component={ContratsTabs} requiredRole={["ROLE_EMPLOYEUR", "ROLE_ETUDIANT"]}/>
          <AuthRoute path="/stage/:id/:tab" component={StageComponent} requiredRole={["ROLE_EMPLOYEUR", "ROLE_GESTIONNAIRE"]}/>

          <AuthRoute path="/questionProductivite/:id" component={QuestionProductivite} requiredRole="ROLE_EMPLOYEUR"/>
          <AuthRoute path="/questionQualiteTravail/:id" component={QuestionQualiteTravail} requiredRole="ROLE_EMPLOYEUR"/>
          <AuthRoute path="/questionRelations/:id" component={QuestionRelations} requiredRole="ROLE_EMPLOYEUR"/>
          <AuthRoute path="/questionsHabilites/:id" component={QuestionsHabilites} requiredRole="ROLE_EMPLOYEUR"/>
          <AuthRoute path="/evaluationsEmployeur" component={EvaluationStagiaireTabs} requiredRole="ROLE_EMPLOYEUR"/>
          <AuthRoute path="/evaluationStagiaire/:id" component={EvaluationStagiaire} requiredRole="ROLE_EMPLOYEUR"/>

          <AuthRoute path="/evaluationMilieuStageHome" component={EvaluationMiliauStageTabs} requiredRole="ROLE_ENSEIGNANT"/>
          <AuthRoute path="/evaluationMilieuStage/:employeur/:prenomEtudiant/:nomEtudiant/:idEnseignant/:idCandidature" component={EvaluationMilieuStage} requiredRole="ROLE_ENSEIGNANT"/>
          <AuthRoute path="/etudiantsEnCharge" component={ListEtudiantsEnCharge} requiredRole="ROLE_ENSEIGNANT"/>
          <AuthRoute path="/etudiantsAuEnseignant/:nom/:prenom/:id/:programme" component={EnseignantsTabs} requiredRole={["ROLE_EMPLOYEUR", "ROLE_GESTIONNAIRE"]}/>

          <AuthRoute path="/rapportStageEmployeur" component={RapportStageEmployeur} requiredRole="ROLE_EMPLOYEUR"/>
          <AuthRoute path="/rapportEnseignant" component={RapportEnseignantComponent} requiredRole="ROLE_GESTIONNAIRE"/>
          <AuthRoute path="/rapportEtudiant/:tab" component={RapportEtudiantComponent} requiredRole="ROLE_GESTIONNAIRE"/>
          <AuthRoute path="/rapportStage/:tab" component={RapportStageComponent} requiredRole="ROLE_GESTIONNAIRE"/>
          <AuthRoute path="/rapportContrat/:tab" component={RapportContratComponent} requiredRole="ROLE_GESTIONNAIRE"/>
          <AuthRoute path="/rapportEvaluations" component={RapportEvaluationsComponent} requiredRole="ROLE_GESTIONNAIRE"/>
          
          <AuthRoute path="/profilEtudiant/:tab" component={ProfilEtudiant} requiredRole="ROLE_ETUDIANT"/>

          <AuthRoute path="/profilEmployeur" component={ProfilEmployeur} requiredRole="ROLE_EMPLOYEUR"/>
          <AuthRoute path="/profilGestionnaire" component={ProfilGestionnaire} requiredRole="ROLE_GESTIONNAIRE"/>
          <AuthRoute path="/profilEnseignant" component={ProfilEnseignant} requiredRole="ROLE_ENSEIGNANT"/>
        </Switch>
        </ThemeProvider>
      </main>
    
  );
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#1666DB",
            light: "#4d84e3",
            dark: "#0d3477",
        },
        secondary:{
            main:"#1666DB",
            light: "#ffbe49",
            // dark: "#c55e00",
        },
        action: {
            hover: "#4d84e3",
            disabled: "#ac0505",
            selected: "#ffbe49"
        },
        background: {
            table: "#8e8e8e"
        },
        button: {
            textTransform: "capitalize"
        },

    }
});

export default App;
