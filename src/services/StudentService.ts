import authHeader from "./AuthHeader";
import {urls} from "./BaseUrl";

const axios = require("axios").default;

const STUDENT_API_BASE_URL = urls.getBaseUrl() + "students"

class StudentService {

    getTournamentsForStudent(studentId) {
        return axios.get(STUDENT_API_BASE_URL + "/tournaments", {params: {id: studentId}, headers: authHeader()})
    }

    getStudentsNotInTournament(tournamentId) {
        return axios.get(STUDENT_API_BASE_URL + "/not_in_tournament", {
            params: {id: tournamentId},
            headers: authHeader()
        })
    }

    createStudent(student) {
        return axios.post(STUDENT_API_BASE_URL, student, {headers: authHeader()})
    }

}

export default new StudentService()
