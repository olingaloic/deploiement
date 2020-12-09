import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {

  verifyTokenExpired() {
    let token = JSON.parse(localStorage.getItem('user')).accessToken
    let exp = JSON.parse(atob(token.split('.')[1])).exp * 1000
    return Date.now() > exp;
  }

  getTokenId(){
    if (localStorage.getItem('user') !== null)
      return JSON.parse(localStorage.getItem('user')).id;
    return null;
  }

  getTokenDESC(){
    if (localStorage.getItem('user') !== null)
        return JSON.parse(localStorage.getItem('user')).roles[0];
    return null;
  }

  getTokenEmail(){
    if (localStorage.getItem('user') !== null) 
        return JSON.parse(localStorage.getItem('user')).email;
    return null;
  }

  login(username, password) {
    return axios.post(API_URL + "signin", {username, password})
                .then(response => {
                  if (response.data.accessToken) {
                      window.localStorage.setItem("user", JSON.stringify(response.data));
                  }
                  return response.data;
                });
  }

  async validate(username, password) {
    return await axios.post(API_URL + "validate", {username, password})
                      .then(response => { return response.data; });
  }

  async logout() {
    await window.localStorage.removeItem("user");
    await window.localStorage.removeItem("session");
    await window.localStorage.removeItem("nomSession");
  }

  getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('user'));;
  }
}

export default new AuthService();
