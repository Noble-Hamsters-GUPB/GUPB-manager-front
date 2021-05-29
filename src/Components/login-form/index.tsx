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
        console.log(location);
    })

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
                history.push("/tournament/1");
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
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
