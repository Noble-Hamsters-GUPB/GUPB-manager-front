import authHeader from "./AuthHeader";
import {urls} from "./BaseUrl";

const axios = require("axios").default;

const STUDENT_API_BASE_URL = urls.getBaseUrl() + "students"

class StudentService {

    getTournamentsForStudent(studentId) {
        return axios.get(STUDENT_API_BASE_URL + "/tournaments", {params: {id: studentId}, headers: authHeader()})
    }

    getStudentsNotInTournament(tournamentId) {
        return axios.get(STUDENT_API_BASE_URL + "/not-in-tournament", {
            params: {id: tournamentId},
            headers: authHeader()
        })
    }

    emailAlreadyExists(email) {
        return axios.get(STUDENT_API_BASE_URL + "/email", {
            params: {emailAddress: email},
            headers: authHeader()
        })
    }

    indexAlreadyExists(indexNumber) {
        return axios.get(STUDENT_API_BASE_URL + "/index", {
            params: {indexNumber: indexNumber},
            headers: authHeader()
        })
    }

    getStudent(id) {
        return axios.get(STUDENT_API_BASE_URL + "/id", {
            params: {id: id},
            headers: authHeader()
        })
    }

    createStudent(student) {
        return axios.post(STUDENT_API_BASE_URL, student, {headers: authHeader()})
    }

}

export default new StudentService()
