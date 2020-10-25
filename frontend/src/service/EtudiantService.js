import axios from 'axios'

const ETUDIANTS_URL = "http://localhost:8080/etudiants/findAll";
const baseURL = "http://localhost:8080/etudiants";
const ETUDIANT_GET = "http://localhost:8080/etudiants/get";

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