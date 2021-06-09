import authHeader from "./AuthHeader";
import {urls} from "./BaseUrl";

const axios = require("axios").default;

const REQUIREMENT_API_BASE_URL = urls.getBaseUrl() + "requirements"

class RequirementService {

    getRequirements() {
        return axios.get(REQUIREMENT_API_BASE_URL, {headers: authHeader()});
    }

    getRequirementsForTournament(tournamentId) {
        return axios.get(REQUIREMENT_API_BASE_URL + "/tournament", {params: {id: tournamentId}, headers: authHeader()})
    }

    createRequirement(requirement) {
        return axios.post(REQUIREMENT_API_BASE_URL, requirement, {headers: authHeader()})
    }

    updateRequirement(requirement, requirementId) {
        return axios.put(REQUIREMENT_API_BASE_URL, requirement, {params: {id: requirementId,}, headers: authHeader()});
    }

    deleteRequirement(requirementId) {
        return axios.delete(REQUIREMENT_API_BASE_URL, {params: {id: requirementId}, headers: authHeader()});
    }

}

export default new RequirementService();
