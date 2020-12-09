import axios from 'axios';

const BASE_URL = "http://localhost:8080/sessions/"

class SessionService {

    isSessionSelectionneeEnCours(idSession){
        return axios.get(BASE_URL + "isSessionSelectionneeEnCours/" +  idSession);
    }

    getSessionById(id){
        return axios.get(BASE_URL + "findById/"+id);
    }

    getAllSessions(){
        return axios.get(BASE_URL + "findAll");
    }

    async storeSessionParDefaut(){
        axios.get(BASE_URL + "getSessionEnCours").then(res => window.localStorage.setItem("session", res.data.id));
        axios.get(BASE_URL + "getSessionEnCours").then(res => window.localStorage.setItem("nomSession", res.data.nom));
    }

    async changeSession(id, nom){
        await window.localStorage.removeItem("session");
        await window.localStorage.removeItem("nomSession");
        await window.localStorage.setItem("session", id);
        await window.localStorage.setItem("nomSession", nom);
    }
}

export default new SessionService();