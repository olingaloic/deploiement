import axios from 'axios';
import authHeader from './security/auth-header';

const baseURL = "http://localhost:8080/etudiants";

class EtudiantService{

    getEtudiants(idSession){
        return axios.get(baseURL + "/findAll", { params: { idSession: idSession}, headers: authHeader() });
    }

    getEtudiantById(id){
        return axios.get(baseURL + "/get?idEtudiant=" + id, { headers: authHeader() });
    }

    getEtudiantsAucunCV(idSession){
        return axios.get(baseURL + "/getAllSansCV", { params: { idSession: idSession}, headers: authHeader() });
    }

    getEtudiantsCVNonApprouve(idSession){
        return axios.get(baseURL + "/getAllCVNonApprouve", { params: { idSession: idSession}, headers: authHeader() });
    }

    getEtudiantsSansStage(idSession){
        return axios.get(baseURL + "/get/aucunStage", { params: { idSession: idSession}, headers: authHeader() });
    }

    getEtudiantsByProgramme(programme, idSession){
        return axios.get(baseURL + "/get/" + programme, { params: { idSession: idSession}, headers: authHeader() });
    }

    async post(etudiant){
        fetch(baseURL + "/create",
            {method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(etudiant)} )
            .then(r => r.json());
    }

    isRegistered(id) {
        return axios.get(baseURL + "/registration/isRegistered/" + id, { headers: authHeader() })
    }

    async register(id) {
        return axios.put(baseURL + "/registration/register/" + id, { headers: authHeader() })
    }

    async updatePassword(etudiant, id){
        return axios.put(baseURL + "/updatePassword/" + id, etudiant, { headers: authHeader() });
    }

    async setEnseignant(idetudiant, idEnseignant) {
        return await axios.put(baseURL + "/setEnseignant/" + idetudiant + "/" + idEnseignant, { headers: authHeader() })
    }

    async enleverEnseignant(idetudiant, idEnseignant) {
        return await axios.put(baseURL + "/enleverEnseignant/" + idetudiant + "/" + idEnseignant, { headers: authHeader() })
    }

    async getEtudiantsbyEnseignat(idEnseignant){
        return axios.get(baseURL + "/getAllbyEnseignant/" + idEnseignant, { headers: authHeader() });
    }
    
}

export default new EtudiantService()