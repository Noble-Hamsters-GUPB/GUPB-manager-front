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

export const LoginForm: FC = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

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

    const submitLogin = (e) => {
        let errorFlag = false;

        if(email === ""){
            setEmailError("Email cannot be empty");
            errorFlag = true;
        }

        if(!email.match(new RegExp(".+@.+\..+"))){
            setEmailError("Invalid Email");
            errorFlag = true;
        }

        if(password === "") {
            setPasswordError("Password cannot be empty");
            errorFlag = true;
        }

        if(false){//todo: incorrect password
            setPasswordError("Incorrect password or login");
            errorFlag = true;
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }

        //todo: login
    }

    return (
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={location.pathname.split("/login")[0]} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Log in</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField error={!(emailError==="")} fullWidth label={emailError===""?"Email":emailError} onChange={(e) => setEmail(e.target.value)}/>
                <TextField error={!(passwordError==="")} fullWidth label={passwordError===""?"Password":passwordError} onChange={(e) => setPassword(e.target.value)}/>
                <DialogActions className={styles.submitAction}>
                    <Link to={(!(emailError==="") || !(passwordError===""))?"#":(location.pathname.split("/login")[0])}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => submitLogin(e)}
                            disabled={!(emailError==="") || !(passwordError==="")}
                        >LOG IN</Button>
                    </Link>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
