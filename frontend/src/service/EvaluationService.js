import axios from 'axios';
import authHeader from './security/auth-header';

const baseURLStagiaire = "http://localhost:8080/evaluationStagiaire";
const baseURLMilieuStage = "http://localhost:8080/evaluationMilieuStage";

class EvaluationService{

    async getAllEvaluationsStagiaire(){
        return await axios.get(baseURLStagiaire + "/findAll", { headers: authHeader() });
    }

    async getAllEvaluationsMilieuStage(){
        return await axios.get(baseURLMilieuStage + "/findAll", { headers: authHeader() });
    }


    // duplicate
    async put(evaluation, idEtudaint){
        return axios.post(baseURLStagiaire + '/newEvaluation/'+ idEtudaint, evaluation)
    }

    async putEvaluationStagiaire(result, idEtudaint){
        fetch(baseURLStagiaire + "/newEvaluation/"+idEtudaint,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(result),
               } )
            
    }
    async putEvaluationMilieuStage(result, idCandidature,idEnseignant){
        fetch(baseURLMilieuStage + "/newEvaluation/" + idCandidature + "/" + idEnseignant,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },  
                body: JSON.stringify(result),
               } )
            
    }

    async getEvaluationsStagiaireByEmployeur(idEmployeur, session){
        return await axios.get(baseURLStagiaire + "/getByEmployeur/" + idEmployeur + "?idSession=" + session, { headers: authHeader() });
    }

    async getEvaluationsMilieuStageByEnseignant(idEnseignant){
        return await axios.get(baseURLMilieuStage + "/getByEnseignant/" + idEnseignant, { headers: authHeader() });
    }

    async getEvaluationsStagiaireByEtudaint(idEtudiant){
        return await axios.get(baseURLStagiaire + "/getByEtudiant/" + idEtudiant, { headers: authHeader() });
    }

    async getEvaluationsMilieuStageByEtudiant(idEtudiant){
        return await axios.get(baseURLMilieuStage + "/getByEtudiant/" + idEtudiant, { headers: authHeader() });
    }

    async telechargerEvaluationMilieuStage(idEvaluation) {
        return await( axios.request({
            url: baseURLMilieuStage + "/getEvaluation/"+ idEvaluation,
            method: 'GET',
            responseType: 'blob',
            headers: authHeader()
        }))
    }
    async telechargerEvaluationStagiaire(idEvaluation) {
        return await( axios.request({
            url: baseURLStagiaire + "/getEvaluation/"+ idEvaluation,
            method: 'GET',
            responseType: 'blob',
            headers: authHeader()
        }))
    }
}

export default new EvaluationService()
