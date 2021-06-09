import {urls} from "./BaseUrl";

const axios = require("axios").default;

const AUTHENTICATION_API_BASE_URL = urls.getBaseUrl() + "auth/signin"

class AuthenticationService {
    login = (email, password) => {
        return axios
            .post(AUTHENTICATION_API_BASE_URL, {
                "emailAddress": email,
                "password": password
            })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }

                return response.data;
            });
    };

    logout = () => {
        localStorage.removeItem("user");
    };

    getCurrentUser = () => {
        return JSON.parse(<string>localStorage.getItem("user"));
    };
}

export default new AuthenticationService();
