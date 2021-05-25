const axios = require("axios").default;

const AUTHENTICATION_API_BASE_URL = "http://localhost:8080/api/v1/auth/signin"

class AuthenticationService {
    login = (email, password) => {
        return axios
            .post(AUTHENTICATION_API_BASE_URL, {
                "emailAddress":email,
                "password":password
            })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
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

    // getRequirements() {
    //     return axios.get(REQUIREMENT_API_BASE_URL);
    // }
    //
    // createRequirement(requirement) {
    //     return axios.post(REQUIREMENT_API_BASE_URL, requirement)
    // }
    //
    // updateRequirement(requirement, requirementId) {
    //     return axios.put(REQUIREMENT_API_BASE_URL + '/' + requirementId, requirement);
    // }
    //
    // deleteRequirement(requirementId) {
    //     return axios.delete(REQUIREMENT_API_BASE_URL + '/' + requirementId);
    // }

}

export default new AuthenticationService();