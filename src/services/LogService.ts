import authHeader from "./AuthHeader";
import {urls} from "./BaseUrl";

const axios = require("axios").default;

const LOGS_API_BASE_URL = urls.getBaseUrl() + "logs"

class LogsService {

    getLogs(id) {
        return axios.get(LOGS_API_BASE_URL+"/"+id, { headers: authHeader() })
    }

}

export default new LogsService();
