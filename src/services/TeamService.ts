import authHeader from "./AuthHeader";
import {urls} from "./BaseUrl";

const axios = require("axios").default;

const TEAM_API_BASE_URL = urls.getBaseUrl() + "teams"

class TeamService {

    getTeams() {
        return axios.get(TEAM_API_BASE_URL, { headers: authHeader() });
    }

    createTeam(team) {
        return axios.post(TEAM_API_BASE_URL, team, { headers: authHeader() })
    }

}

export default new TeamService()
