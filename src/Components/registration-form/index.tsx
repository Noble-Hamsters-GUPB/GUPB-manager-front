import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import TextField from '@material-ui/core/TextField'
import {
    ButtonGroup,
    FormControlLabel,
    Paper,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
    Button, IconButton, Dialog, DialogContent, DialogTitle, DialogActions
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
// @ts-ignore
import {Link, Route, Switch, BrowserRouter as Router, useLocation, useHistory} from 'react-router-dom';
import StudentService from "../../services/StudentService";
import {TournamentRegisterForm} from "../tournament-register-form";
import AuthenticateService from "../../services/AuthenticateService";

export const RegistrationForm: FC = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [index, setIndex] = useState("")

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [password2Error, setPassword2Error] = useState("")
    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [indexError, setIndexError] = useState("")

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        setEmailError("");
    },[email])

    useEffect(() => {
        setPasswordError("");
    },[password])

    useEffect(() => {
        setPassword2Error("");
    },[password2])

    useEffect(() => {
        setFirstNameError("");
    },[firstName])

    useEffect(() => {
        setLastNameError("");
    },[lastName])

    useEffect(() => {
        setIndexError("");
    },[index])

    const submitRegistration = async (e) => {
        let errorFlag = false;

        if (email === "") {
            setEmailError("E-mail address cannot be empty");
            errorFlag = true;
        }

        if (!email.match(/.+@.+\..+/)) {
            setEmailError("Invalid e-mail");
            errorFlag = true;
        }

        if (password === "") {
            setPasswordError("Password cannot be empty");
            errorFlag = true;
        }

        if (!/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password)) {
            setPasswordError("Password should contain at least one special character")
            errorFlag = true
        }

        if (!/\d/.test(password)) {
            setPasswordError("Password should contain at least one number")
            errorFlag = true
        }

        if (password.length < 8) {
            setPasswordError("Password should contain at least 8 characters")
            errorFlag = true
        }

        if (password2 === "") {
            setPassword2Error("Password confirmation cannot be empty");
            errorFlag = true;
        }

        if (password !== password2) {
            setPassword2Error("Passwords don't match");
            errorFlag = true;
        }

        if (firstName === "") {
            setFirstNameError("First name cannot be empty");
            errorFlag = true;
        }

        if (lastName === "") {
            setLastNameError("Last name cannot be empty");
            errorFlag = true;
        }

        if (index === "") {
            setIndexError("Index number cannot be empty");
            errorFlag = true;
        }

        if (!/^(\d{6})$/.test(index)) {
            setIndexError("Invalid index number")
            errorFlag = true
        }

        e.preventDefault();

        if (errorFlag) {
            return;
        }

        StudentService.emailAlreadyExists(email).then((res) => {
            if(res.data === true){
                setEmailError("E-mail already exists")
                return
            }
            else{
                StudentService.indexAlreadyExists(index).then((res) => {
                    if(res.data === true){
                        setIndexError("Index already exists")
                        return
                    }
                    else{
                        StudentService.createStudent({
                            firstName: firstName, lastName: lastName, indexNumber: index
                            , emailAddress: email, password: password
                        }).then(async (res) =>
                            AuthenticateService.login(email, password).then((res) => {
                                history.push("/tournament-register")
                            }))
                    }
                })
            }
        })

    }

    return (
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={location.pathname.split("/register")[0]} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Create account</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField required error={emailError!==""} fullWidth label={emailError===""?"Email":emailError} onChange={(e) => setEmail(e.target.value)}/>
                <TextField required type={"password"} error={passwordError!==""} fullWidth label={passwordError===""?"Password":passwordError} onChange={(e) => setPassword(e.target.value)}/>
                <TextField required type={"password"} error={password2Error!==""} fullWidth label={password2Error===""?"Confirm password":password2Error} onChange={(e) => setPassword2(e.target.value)}/>
                <TextField required error={firstNameError!==""} fullWidth label={firstName===""?"First name":firstNameError} onChange={(e) => setFirstName(e.target.value)}/>
                <TextField required error={lastNameError!==""} fullWidth label={lastName===""?"Last name":lastNameError} onChange={(e) => setLastName(e.target.value)}/>
                <TextField required error={indexError!==""} fullWidth label={index===""?"Index number":indexError} onChange={(e) => setIndex(e.target.value)}/>
                <DialogActions className={styles.submitAction}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => submitRegistration(e)}
                            disabled={emailError!=="" || passwordError!=="" || password2Error!=="" || firstNameError!=="" || lastNameError!=="" || indexError!==""}
                        >REGISTER</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
