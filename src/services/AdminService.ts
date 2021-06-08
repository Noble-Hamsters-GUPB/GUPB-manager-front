import authHeader from "./AuthHeader";
import {urls} from "./BaseUrl";

const axios = require("axios").default;

const ADMIN_API_BASE_URL = urls.getBaseUrl() + "admins"

class AdminService {

    getAdmin(id) {
        return axios.get(ADMIN_API_BASE_URL + "/id", {params: {id: id}, headers: authHeader()})
    }
}

export default new AdminService()
