import authHeader from "./AuthHeader";
import {urls} from "./BaseUrl";

const axios = require("axios").default;

const STUDENT_API_BASE_URL = urls.getBaseUrl() + "student"

class StudentService {

    getTournamentsForStudent(studentId) {
        return axios.get(STUDENT_API_BASE_URL+"/tournaments", studentId, { headers: authHeader() })
    }

    getStudentsNotInTournament(tournamentId) {
        return axios.get(STUDENT_API_BASE_URL+"/not_in_tournament", tournamentId, { headers: authHeader() })
    }

}

export default new StudentService()
