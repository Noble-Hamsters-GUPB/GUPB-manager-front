import authHeader from "./AuthHeader";
import {urls} from "./BaseUrl";

const axios = require("axios").default;

const ROUND_API_BASE_URL = urls.getBaseUrl() + "rounds"

class RoundService {

    getRounds() {
        return axios.get(ROUND_API_BASE_URL, { headers: authHeader() });
    }

    createRound(round) {
        return axios.post(ROUND_API_BASE_URL, round, { headers: authHeader() })
    }

}

export default new RoundService();