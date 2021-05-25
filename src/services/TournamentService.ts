import authHeader from "./AuthHeader";
import {AxiosRequestConfig} from "axios";

const axios = require("axios").default;

const TOURNAMENT_API_BASE_URL = "http://localhost:8080/api/v1/tournaments"

    class TournamentService {


    getTournaments() {
        return axios.get(TOURNAMENT_API_BASE_URL, { headers: authHeader() });
    }

    createTournament(tournament) {
        return axios.post(TOURNAMENT_API_BASE_URL, tournament, { headers: authHeader() });
    }

}

export default new TournamentService()
