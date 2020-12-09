import axios from 'axios';
import authHeader from './security/auth-header';

const baseURL = "http://localhost:8080/employeurs";

class EmployeurService{

    async getById(id) {
       return await axios.get(baseURL + "/get?idEmployeur=" + id, { headers: authHeader() });
    }

    async post(employeur){
        fetch(baseURL + "/createEmploye",
            {method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeur)} )
            .then(r => r.json());
    }

    async updatePassword(employeur, id){
        return axios.put(baseURL + "/updatePassword/" + id, employeur, { headers: authHeader() });
    }
}

export default new EmployeurService()































