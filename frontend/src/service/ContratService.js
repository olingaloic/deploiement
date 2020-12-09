import axios from "axios";
import authHeader from './security/auth-header';

const baseURL = "http://localhost:8080/contrats/";


class ContratService {

    async getContrats(idSession) {
        return await axios.get(baseURL + '/findAll', { params: { idSession: idSession}, headers: authHeader() });
    }

    async getCandidaturesSansContrat(idSession) {
        return await axios.get(baseURL + 'getCandidaturesSansContrat', { params: { idSession: idSession}, headers: authHeader() });
    }

    async telechargerDocument(id) {
        return ( axios.request({
            url: baseURL + "getContratFile/"+ id,
            method: 'GET',
            responseType: 'blob',
            headers: authHeader()
        }))
    }

    async telechargerApercueContrat(id) {
        return ( axios.request({
            url: baseURL + "getApercueContrat/"+ id,
            method: 'GET',
            responseType: 'blob',
            headers: authHeader()
        }))
    }

    async getContratByEmployeurId(id) {
        return await axios.get(baseURL + "getByEmployeurId/" + id, { headers: authHeader() });
    }

    async getContratByEtudiantId(id) {
        return await axios.get(baseURL + "getByEtudiantId/" + id, { headers: authHeader() });
    }

    async candidatureHasContrat(idcandidature) {
        return await axios.get(baseURL + "contratExiste/" + idcandidature, { headers: authHeader() });
    }

    // duplicate ?
    async createContrat(idCandidature, formData){
        return axios.put(baseURL + "update/" + idCandidature, formData, { headers: authHeader() })
    }

    // duplicate ?
    async updateContrat(idCandidature, formData){
        return axios.put(baseURL + "update/" + idCandidature, formData, { headers: authHeader() })
    }


    accepteSignatureContrat(id, desc){
        var formData = new FormData();
        formData.append('desc', desc);
        return axios.put(baseURL + "accepteSignatureContrat/" + id, formData, { headers: authHeader() })
    }

    refuseSignatureContrat(id, desc){
        var formData = new FormData();
        formData.append('desc', desc);
        return axios.put(baseURL + "refuseSignatureContrat/" + id, formData, { headers: authHeader() })
    }

    // duplicate ?
    async createContrat(idCandidature, file){
        const formData = new FormData();
            formData.append('file', file)
            formData.append('name',file.name);
        return axios.put(baseURL + "create/" + idCandidature, formData, { headers: authHeader() })
    }

    async createContratAuto(idCandidature){
        return axios.put(baseURL + "createAuto/" + idCandidature, { headers: authHeader() })
    }

    getContratsNonSignesEtudiant(idSession) {
        return axios.get(baseURL + 'getContratsNonSignesEtudiant', { params: { idSession: idSession}, headers: authHeader() });
    }

    getContratsNonSignesEmployeur(idSession) {
        return axios.get(baseURL + 'getContratsNonSignesEmployeur', { params: { idSession: idSession}, headers: authHeader() });
    }

    getContratsNonSignesAdministration(idSession) {
        return axios.get(baseURL + 'getContratsNonSignesAdministration', { params: { idSession: idSession}, headers: authHeader() });
    }

}
export default new ContratService()
