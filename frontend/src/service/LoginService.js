
const baseURL = "http://localhost:8080/users";

class LoginService{

    async login(email, password){
        let data;
        await fetch(baseURL +"/get/" +email + "/" + password, {method: "GET"} )
            .then(r => data = r.json()).then(res => this.storage(res))
            .catch(error => data = {});
        return data;
    }
    
    async storage(user) {
        await window.localStorage.setItem("id", user.id);
        await window.localStorage.setItem("desc", user.desc);
    }

    async logout() {
        await window.localStorage.removeItem("id");
        await window.localStorage.removeItem("desc");
    }
}

export default new LoginService()