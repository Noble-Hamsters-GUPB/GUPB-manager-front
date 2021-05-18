const axios = require("axios").default;

const REQUIREMENT_API_BASE_URL = "http://localhost:8080/api/v1/requirements"

class RequirementService {

    getRequirements() {
        return axios.get(REQUIREMENT_API_BASE_URL);
    }

    createRequirement(requirement) {
        return axios.post(REQUIREMENT_API_BASE_URL, requirement)
    }

    updateRequirement(requirement, requirementId) {
        return axios.put(REQUIREMENT_API_BASE_URL + '/' + requirementId, requirement);
    }

    deleteRequirement(requirementId) {
        return axios.delete(REQUIREMENT_API_BASE_URL + '/' + requirementId);
    }

}

export default new RequirementService();