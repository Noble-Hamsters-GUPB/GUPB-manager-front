import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import TextField from '@material-ui/core/TextField'
import {
    Button, IconButton, Dialog, DialogContent, DialogTitle, DialogActions, InputAdornment, makeStyles, Theme, createStyles
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
// @ts-ignore
import {Link, Route, Switch, BrowserRouter as Router, useLocation, useHistory} from 'react-router-dom';
import AuthenticateService from "../../services/AuthenticateService";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import TournamentService from "../../services/TournamentService";
import StudentService from "../../services/StudentService";

export const LoginForm: FC = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const location = useLocation();

    useEffect(() => {
        setEmailError("");
    },[email])

    useEffect(() => {
        setPasswordError("");
    },[password])

    const submitLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        let errorFlag = false;

        if(email === ""){
            setEmailError("Email cannot be empty");
            errorFlag = true;
        }

        if(!email.match(/.+@.+\..+/)){
            setEmailError("Invalid Email");
            errorFlag = true;
        }

        if(password === "") {
            setPasswordError("Password cannot be empty");
            errorFlag = true;
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }

        AuthenticateService.login(email, password).then(
            () => {
                let user = AuthenticateService.getCurrentUser()
                if(user.roles[0] === "STUDENT") {
                    StudentService.getTournamentsForStudent(user.id).then((res) => {
                        if(res.data.length > 0){
                            history.push("/tournament/"+res.data[0].id)
                        }
                        else{
                            history.push("/tournament-register")
                        }
                    })
                }
                else if(user.roles[0] === "ADMIN") {
                    TournamentService.getTournaments().then((res) => {
                        if(res.data.length > 0){
                            history.push("/tournament/"+res.data[0].id)
                        }
                        else{
                            history.push("/create-tournament")
                        }
                    })
                }
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setEmailError("Incorrect password or login");
                setPasswordError("Incorrect password or login");
                errorFlag = true;
                setLoading(false);
            }
        )
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    function handleKeyDown(e) {
        if(e.key === "Enter"){
            submitLogin(e)
        }
    }

    return (
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={location.pathname.split("/login")[0]} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Log in</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField error={emailError!==""} fullWidth label={emailError===""?"Email":emailError} onChange={(e) => setEmail(e.target.value)}/>
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    error={passwordError!==""}
                    fullWidth
                    label={passwordError===""?"Password":passwordError}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                    }}
                />
                <DialogActions className={styles.submitAction}>
                    <Link to={(emailError!=="" || passwordError!=="")?"#":(location.pathname.split("/login")[0])}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => submitLogin(e)}
                            disabled={emailError!=="" || passwordError!==""}
                        >LOG IN</Button>
                    </Link>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
