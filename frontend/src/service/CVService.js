import axios from 'axios';

import authHeader from './security/auth-header';

const CV_URL = "http://localhost:8080/cvs";

class CVService{

    createCV(idEtudiant, formData){
        return axios.put(CV_URL + "/create/" + idEtudiant, formData, { headers: authHeader() })
    }

    async getCVByEtudiant(etudiant) {
        const method = 'GET';
        const url = CV_URL + '/get/' + etudiant.id;
        return (axios.request({
                url,
                method,
                responseType: 'blob',
                headers: authHeader()
            }))
    }

    updateCVStatus(isValid, id){
        const formData = new FormData();
        formData.append('isValid', isValid);
        const options = {
            method: 'PUT',
            body: formData
        };
        return axios.put(CV_URL + "/update/" + id, formData, { headers: authHeader() })
    }
}

export default new CVService()