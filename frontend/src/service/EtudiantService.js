import axios from 'axios';
import { API_URL } from '../Constants';

const ETUDIANTS_URL = API_URL + "/etudiants/findAll";
const baseURL = API_URL + "/etudiants";
const ETUDIANT_GET = API_URL + "/etudiants/get";

class EtudiantService{

    getEtudiants(){
        return axios.get(ETUDIANTS_URL);
    }

    getEtudiantById(id){
        return axios.get(ETUDIANT_GET + "?idEtudiant=" + id);
    }


    getEtudiantsByProgramme(programme){
        return axios.get(ETUDIANT_GET + "/" + programme);
    }

    async getByEmail(email){
        let data;
        await fetch(baseURL +"/email?email=" +email, {method: "GET"} )
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
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
}

export default new EtudiantService()