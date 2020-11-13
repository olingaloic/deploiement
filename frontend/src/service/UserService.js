import { API_URL } from '../Constants';

class UserService {
    async getByEmail(email) {
        let data;
        await fetch( API_URL + "/users/get/" + email, {method: "GET"})
        .then(r => data = r.json())
        .catch(error => data = {});
        return data;
        }

}

export default new UserService()