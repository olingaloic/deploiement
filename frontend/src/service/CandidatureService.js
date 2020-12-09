import axios from "axios";
import authHeader from './security/auth-header';

const baseURL = "http://localhost:8080/candidatures";


class CandidatureService{

    async getById(id) {
        let data;
        await fetch(baseURL + "/get?idCandidature=" + id, {method: "GET", headers: authHeader()})
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    getByEtudiant(idEtudiant, idSession) {
        return axios.get(baseURL + "/getByEtudiant/" + idEtudiant, { params: { idSession: idSession}, headers: authHeader() });
    }

    getByStage(idStage) {
        return axios.get(baseURL + "/getByStage?stage=" + idStage, { headers: authHeader() });
    }

    async post(idEtudiant, idStage){
        return axios.post(baseURL + "/createCandidature?idEtudiant=" + idEtudiant + "&idStage=" + idStage);
    }

    async putCandidatureChoisi(id){
        return axios.put(baseURL + "/updateChoisi/" + id, { headers: authHeader() });
    }

    async putCandidatureApprouve(id){
        return axios.put(baseURL + "/updateApprouve/" + id, { headers: authHeader() });
    }

    async getCandidatureChoisi(id){
        let data;
        await fetch(baseURL + "/getChoisi/" + id, {method: "GET", headers: authHeader()})
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }


    async getCandidaturesChoisis(idSession) {
        return await axios.get(baseURL +"/getAllChoisis", { params: { idSession: idSession}, headers: authHeader() });
    }

    async getCandidaturesAEvaluerParEmployeur(idEmployeur, idSession) {
        return axios.get(baseURL + "/getListAEvaluer/" + idEmployeur, { params: { idSession: idSession}, headers: authHeader() });
    }

    async getCandidaturesEmployeurNonEvalues(id) {
        return await axios.get(baseURL + "/getListByEmployeurNonEvalues/" + id, { headers: authHeader() });
    }
}

export default new CandidatureService()































