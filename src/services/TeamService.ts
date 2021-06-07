import authHeader from "./AuthHeader";
import {urls} from "./BaseUrl";

const axios = require("axios").default;

const TEAM_API_BASE_URL = urls.getBaseUrl() + "teams"

class TeamService {

    getTeams() {
        return axios.get(TEAM_API_BASE_URL, {headers: authHeader()});
    }

    getTeamsForTournament(tournamentId) {
        return axios.get(TEAM_API_BASE_URL + "/tournament", {
            params: {tournamentId: tournamentId},
            headers: authHeader()
        })
    }

    checkInvitationCode(teamId, code) {
        return axios.get(TEAM_API_BASE_URL + "/code", {params: {id: teamId, code: code}, headers: authHeader()})
    }

    joinTeam(teamId, studentId) {
        return axios.post(TEAM_API_BASE_URL + "/join", null, {
            params: {id: teamId, studentId: studentId},
            headers: authHeader()
        })
    }

    createTeam(team) {
        return axios.post(TEAM_API_BASE_URL, team, {headers: authHeader()})
    }

}

export default new TeamService()
