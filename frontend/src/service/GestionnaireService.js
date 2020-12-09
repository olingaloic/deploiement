import axios from "axios";
import authHeader from './security/auth-header';

const baseURL = "https://azure-veille-technologique.azurewebsites.net/api/gestionnaires";

class GestionnaireService{

    getGestionnaireById(id){
        return axios.get(baseURL + "/get?idGestionnaire=" + id, { headers: authHeader() });
    }

    async updatePassword(gestionnaire, id){
        return axios.put(baseURL + "/updatePassword/" + id, gestionnaire, { headers: authHeader() });
    }
}

export default new GestionnaireService()































