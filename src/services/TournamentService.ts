const axios = require("axios").default;

const TOURNAMENT_API_BASE_URL = "http://localhost:8080/api/v1/tournaments"

class TournamentService {

    getTournaments() {
        return axios.get(TOURNAMENT_API_BASE_URL);
    }

    createTournament(tournament) {
        return axios.post(TOURNAMENT_API_BASE_URL, tournament);
    }

}

export default new TournamentService()
