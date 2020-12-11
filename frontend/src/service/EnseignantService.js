import axios from 'axios';
import authHeader from './security/auth-header';
import { API_URL } from '../Constants';

const baseURL = API_URL + "/api/enseignants";


class EnseignantService{


    getEnseignantsInscrits(){
        return axios.get(baseURL + "/findAll", { headers: authHeader() });
    }

    getEnseignantById(id){
        return axios.get(baseURL + "/get?idEnseignant=" + id, { headers: authHeader() });
    }

    async post(Enseignant){
        fetch(baseURL + "/createEnseignant",
            {method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Enseignant)} )
            .then(r => r.json());
    }

    async updatePassword(Enseignant, id){
        return axios.put(baseURL + "/updatePassword/" + id, Enseignant, { headers: authHeader() });
    }
}

export default new EnseignantService()