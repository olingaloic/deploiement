import axios from 'axios';
import authHeader from './security/auth-header';

const STAGES_URL = "http://localhost:8080/stages";


class StageService{

    getStagesApprouves(idSession){
        return axios.get(STAGES_URL + "/approuves", { params: { idSession: idSession}, headers: authHeader() });
    }

    getStagesNonApprouves(idSession){
        return axios.get(STAGES_URL + "/nonApprouves", { params: { idSession: idSession}, headers: authHeader() });
    }

    getStagesNonCombles(idSession){
        return axios.get(STAGES_URL + "/nonComble", { params: { idSession: idSession}, headers: authHeader() });
    }
    
    getStageById(id){
        return axios.get(STAGES_URL + "/getStage?idStage=" + id, { headers: authHeader() });
    }

    getStagesEtudiant(idEtudiant, idSession){
        return axios.get(STAGES_URL + "/stagesEtudiant/"+ idEtudiant, { params: { idSession: idSession}, headers: authHeader() });
    }
    
    getEtudiantsByStageId(idStage) {
        return axios.get(STAGES_URL + "/getEtudiantsAdmits/" + idStage, { headers: authHeader() });
    }

    async updateStage(stage, id){
        fetch( STAGES_URL + "/updateStage/"+ id,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stage)} )
            .then(r => r.json())
    }

    createStage(stage){
        return axios.post(STAGES_URL + "/createStage", stage, { headers: authHeader() })
    }

    addEtudiants(id, etudiants){
        return axios.put(STAGES_URL + "/updateEtudiantsAdmits/" + id, etudiants, { headers: authHeader() });
    }

    getStagesApprouvesByEmployeurId(idEmployeur, idSession){
        return axios.get(STAGES_URL + "/stagesApprouvesByEmployeurId/" + idEmployeur, { params: { idSession: idSession}, headers: authHeader() });
    }

    getStagesNonApprouvesByEmployeurId(idEmployeur, idSession){
        return axios.get(STAGES_URL + "/stagesNonApprouvesByEmployeurId/" + idEmployeur, { params: { idSession: idSession}, headers: authHeader() });
    }
}

export default new StageService()