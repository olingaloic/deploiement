import axios from 'axios'
import CV from "../model/CV";
import { API_URL } from '../Constants';

const CV_URL = API_URL + "/cvs";


class CVService{

    createCV(idEtudiant, formData){
        return axios.put(CV_URL + "/create/" + idEtudiant, formData)

    }
    getCVByEtudiant(idEtudiant){

    }
    updateCVStatus(isValid, id){
        console.log(isValid);
        const formData = new FormData();
        formData.append('isValid', isValid);
        const options = {
            method: 'PUT',
            body: formData
        };
        return axios.put(CV_URL + "/update/" + id, formData)
    }
}

export default new CVService()