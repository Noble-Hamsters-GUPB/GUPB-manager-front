import authHeader from "./AuthHeader";

const axios = require("axios").default;

const REQUIREMENT_API_BASE_URL = "http://localhost:8080/api/v1/requirements"

class RequirementService {

    getRequirements() {
        return axios.get(REQUIREMENT_API_BASE_URL, { headers: authHeader() });
    }

    createRequirement(requirement) {
        return axios.post(REQUIREMENT_API_BASE_URL, requirement, { headers: authHeader() })
    }

    updateRequirement(requirement, requirementId) {
        return axios.put(REQUIREMENT_API_BASE_URL + '/' + requirementId, requirement, { headers: authHeader() });
    }

    deleteRequirement(requirementId) {
        return axios.delete(REQUIREMENT_API_BASE_URL + '/' + requirementId, { headers: authHeader() });
    }

}

export default new RequirementService();