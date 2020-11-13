import axios from 'axios';
import { API_URL } from '../Constants';

const STAGE_ETUDIANTS_URL_PUT = API_URL + "/stages/updateEtudiantsAdmits/";
const STAGES_URL = API_URL + "/stages";
const STAGES_URL_POST = API_URL + "/stages/createStage";

class StageService{

    getStages(){
        return axios.get(STAGES_URL + "/findAll");
    }

    getStagesApprouves(){
        return axios.get(STAGES_URL + "/approuves");
    }
    
    getStageById(id){
        return axios.get(STAGES_URL + "/getStage?idStage=" + id);
    }

    getStagesByEmployeurId(idEmployeur){
        return axios.get(STAGES_URL + "/stageByEmployeurId?idEmployeur="+ idEmployeur);
    }

    getStagesEtudiant(idEtudiant){
        return axios.get(STAGES_URL + "/stagesEtudiant?idEtudiant="+ idEtudiant);
    }
    
    getEtudiantsByStageId(idStage) {
        return axios.get(STAGES_URL + "/getEtudiantsAdmits/" + idStage);
    }

    async getById(id) {
        let data;
        await fetch(STAGES_URL + "/getStage?idStage=" + id, {method: "GET"})
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async updateStage(stage, id){
        fetch( STAGES_URL + "/updateStatusStage/"+ id,
            {method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(stage)} )
            .then(r => r.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    createStage(stage){
        return axios.post(STAGES_URL_POST, stage)
    }

    addEtudiants(id, etudiants){
        return axios.put(STAGE_ETUDIANTS_URL_PUT + id, etudiants);
    }
}

export default new StageService()