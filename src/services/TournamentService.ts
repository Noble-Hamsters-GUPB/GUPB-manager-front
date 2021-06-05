import authHeader from "./AuthHeader";
import {AxiosRequestConfig} from "axios";
import {urls} from "./BaseUrl";

const axios = require("axios").default;

const TOURNAMENT_API_BASE_URL = urls.getBaseUrl() + "tournaments"

    class TournamentService {


    getTournaments() {
        return axios.get(TOURNAMENT_API_BASE_URL, { headers: authHeader() });
    }

    getTournamentById(id) {
        return axios.get(TOURNAMENT_API_BASE_URL+"/id", id,{ headers: authHeader() });
    }

    checkInvitationCode(tournamentId, code){
        return axios.get(TOURNAMENT_API_BASE_URL+"/code", tournamentId, code, { headers: authHeader() });
    }

    createTournament(tournament) {
        return axios.post(TOURNAMENT_API_BASE_URL, tournament, { headers: authHeader() });
    }

}

export default new TournamentService()
