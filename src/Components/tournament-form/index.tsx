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
// @ts-ignore
import TournamentService from '../../services/TournamentService';

export const TournamentForm: FC<{url: string}> = (props: {url}) => {

    const [name, setName] = useState("")
    const [accessMode, setAccessMode] = useState("OPEN")
    const [invitationCode, setInvitationCode] = useState("")

    const [nameError, setNameError] = useState(false)
    const [invitationCodeError, setInvitationCodeError] = useState(false)

    const location = useLocation();

    useEffect(() => {
        setNameError(false)
    },[name])

    useEffect(() => {
        setInvitationCodeError(false)
    },[invitationCode])

    const submitTournament = (e) => {
        let errorFlag = false;

        if(name === ""){
            setNameError(true);
            errorFlag = true;
        }

        if(invitationCode === "" && accessMode === "INVITE_ONLY"){
            setInvitationCodeError(true);
            errorFlag = true;
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }


        TournamentService.createTournament({"name": name, "accessMode": accessMode,
            "creator": 1, "invitationCode": invitationCode}) //TODO: change "1" to an id extracted from AuthenticationService, maybe add getters to the service
    }

    return (
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={location.pathname.split("/create_tournament")[0]} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Create Tournament</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField error={nameError} fullWidth label={nameError?"Tournament name cannot be empty":"Tournament name"}
                           onChange={(e) => setName(e.target.value)}/>
                <FormControl className={styles.form} component={"fieldset"}>
                    <FormLabel component="legend">Access mode</FormLabel>
                    <RadioGroup className={styles.formRadios} row aria-label="Access" value={accessMode}
                                onChange={(e) => setAccessMode(e.target.value)}>
                        <FormControlLabel value="OPEN" control={<Radio/>} label="Open"/>
                        <FormControlLabel value="INVITE_ONLY" control={<Radio/>} label="Invite only"/>
                    </RadioGroup>
                </FormControl>
                {accessMode === "INVITE_ONLY"?
                    <TextField error={invitationCodeError} fullWidth label={invitationCodeError?"Invitation code cannot be empty":"Invitation code"}
                                                         onChange={(e) => setInvitationCode(e.target.value)}/> : null}
                <DialogActions className={styles.submitAction}>
                    <Link to={(invitationCodeError || nameError)?"#":props.url}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => submitTournament(e)}
                            disabled={invitationCodeError || nameError}
                        >CREATE</Button>
                    </Link>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
