const axios = require("axios").default;

const REQUIREMENT_API_BASE_URL = "http://localhost:8080/api/v1/requirements"

class RequirementService {

    getRequirements() {
        return axios.get(REQUIREMENT_API_BASE_URL);
    }

}

export default new RequirementService();