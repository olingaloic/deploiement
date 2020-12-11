import axios from "axios";
import authHeader from './security/auth-header';
import { API_URL } from '../Constants';

const baseURL = API_URL + "/api/gestionnaires";

class GestionnaireService{

    getGestionnaireById(id){
        return axios.get(baseURL + "/get?idGestionnaire=" + id, { headers: authHeader() });
    }

    async updatePassword(gestionnaire, id){
        return axios.put(baseURL + "/updatePassword/" + id, gestionnaire, { headers: authHeader() });
    }
}

export default new GestionnaireService()































