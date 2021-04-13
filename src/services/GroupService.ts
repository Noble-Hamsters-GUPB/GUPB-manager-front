// @ts-ignore
const axios = require("axios").default;

const GROUP_API_BASE_URL = "http://localhost:8080/api/v1/groups"

class GroupService {

    getGroups() {
        return axios.get(GROUP_API_BASE_URL);
    }

    createGroup(group) {
        return axios.post(GROUP_API_BASE_URL);
    }

}

export default new GroupService()
