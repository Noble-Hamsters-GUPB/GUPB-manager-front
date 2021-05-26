import authHeader from "./AuthHeader";

const axios = require("axios").default;

const ROUND_API_BASE_URL = "https://gupb-manager.herokuapp.com/api/v1/rounds"

class RoundService {

    getRounds() {
        return axios.get(ROUND_API_BASE_URL, { headers: authHeader() });
    }

    createRound(round) {
        return axios.post(ROUND_API_BASE_URL, round, { headers: authHeader() })
    }

}

export default new RoundService();