import {FC, useEffect, useState} from "react";
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
import {Link, Route, Switch, BrowserRouter as Router, useLocation} from 'react-router-dom';

export const RegistrationForm: FC = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [password2Error, setPassword2Error] = useState("");

    const location = useLocation();

    useEffect(() => {
        console.log(location);
    })

    useEffect(() => {
        setEmailError("");
    },[email])

    useEffect(() => {
        setPasswordError("");
    },[password])

    useEffect(() => {
        setPassword2Error("");
    },[password2])

    const submitRegistration = (e) => {
        let errorFlag = false;

        if(email === ""){
            setEmailError("Email cannot be empty");
            errorFlag = true;
        }

        if(!email.match(/.+@.+\..+/)){
            setEmailError("Invalid Email");
            errorFlag = true;
        }

        if(false/*todo: validate email*/){
            setEmailError("Email allready in use");
            errorFlag = true;
        }

        if(password === "") {
            setPasswordError("Password cannot be empty");
            errorFlag = true;
        }

        if(password2 === "") {
            setPassword2Error("Password cannot be empty");
            errorFlag = true;
        }

        if(password!==password2){
            setPassword2Error("Passwords don't match");
            errorFlag = true;
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }

        //todo: register
    }

    return (
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={location.pathname.split("/register")[0]} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Create account</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField error={emailError!==""} fullWidth label={emailError===""?"Email":emailError} onChange={(e) => setEmail(e.target.value)}/>
                <TextField type={"password"} error={passwordError!==""} fullWidth label={passwordError===""?"Password":passwordError} onChange={(e) => setPassword(e.target.value)}/>
                <TextField type={"password"} error={password2Error!==""} fullWidth label={password2Error===""?"Password":password2Error} onChange={(e) => setPassword2(e.target.value)}/>
                <DialogActions className={styles.submitAction}>
                    <Link to={(emailError!=="" || passwordError!=="" || password2Error!=="")?"#":(location.pathname.split("/register")[0])}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => submitRegistration(e)}
                            disabled={emailError!=="" || passwordError!=="" || password2Error!==""}
                        >REGISTER</Button>
                    </Link>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
