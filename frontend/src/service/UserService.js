
class UserService {
    async getByEmail(email) {
        let data;
        await fetch("http://localhost:8080/users/get/" + email, {method: "GET"})
        .then(r => data = r.json())
        .catch(error => data = {});
        return data;
        }

}

export default new UserService()