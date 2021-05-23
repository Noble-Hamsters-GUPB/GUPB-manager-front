const axios = require("axios").default;

const ROUND_API_BASE_URL = "http://localhost:8080/api/v1/rounds"

class RoundService {

    getRounds() {
        return axios.get(ROUND_API_BASE_URL);
    }

    createRound(round) {
        return axios.post(ROUND_API_BASE_URL, round)
    }

}

export default new RoundService();