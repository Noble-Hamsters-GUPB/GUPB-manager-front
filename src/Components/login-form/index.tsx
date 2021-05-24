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
import {Link, Route, Switch, BrowserRouter as Router} from 'react-router-dom';
// @ts-ignore
import TournamentService from '../../services/TournamentService';

export const TournamentForm: FC = (props) => {

    const [date, setDate] = useState(getCurrentDate())
    const [name, setName] = useState("")
    const [accessMode, setAccessMode] = useState("OPEN")


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    useEffect(() => {
        setUsernameError(false);
    },[username])

    useEffect(() => {
        setPasswordError(false);
    },[password])

    const submitLogin = (e) => {
        let errorFlag = false;

        if(username === ""){
            setUsernameError(true);
            errorFlag = true;
        }

        if(password === "") {
            setPasswordError(true);
            errorFlag = true;
        }

        //todo: incorrect password

        if(errorFlag){
            e.preventDefault();
            return;
        }


        TournamentService.createTournament({"date": date, "name": name, "accessMode": accessMode})
    }

    return (
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={'/tournaments'} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Create Tournament</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField error={nameError} fullWidth label={nameError?"Tournament name cannot be empty":"Tournament name"} onChange={(e) => setName(e.target.value)}/>
                <TextField error={userNameError} fullWidth defaultValue={date} label={userNameError?"Provide a future date":"Start time"} type="datetime-local"
                           onChange={(e) => setDate(e.target.value)}/>
                <FormControl className={styles.form} component={"fieldset"}>
                    <FormLabel component="legend">Access mode</FormLabel>
                    <RadioGroup className={styles.formRadios} row aria-label="Access" value={accessMode}
                                onChange={(e) => setAccessMode(e.target.value)}>
                        <FormControlLabel value="OPEN" control={<Radio/>} label="Open"/>
                        <FormControlLabel value="RESTRICTED" control={<Radio/>} label="Restricted"/>
                        <FormControlLabel value="INVITE_ONLY" control={<Radio/>} label="Invite only"/>
                    </RadioGroup>
                </FormControl>
                <DialogActions className={styles.submitAction}>
                    <Link to={(userNameError || nameError)?"#":"/tournaments"}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => submitLogin(e)}
                            disabled={userNameError || nameError}
                        >CREATE</Button>
                    </Link>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )

    function getCurrentDate(separator='-'){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let time = newDate.getHours()+":"+newDate.getMinutes();

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}T${time}`
    }
}
