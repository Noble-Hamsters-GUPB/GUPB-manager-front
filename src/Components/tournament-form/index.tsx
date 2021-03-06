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
    Button, IconButton, Dialog, DialogContent, DialogTitle, DialogActions, InputAdornment, Tooltip
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
// @ts-ignore
import {Link, Route, Switch, BrowserRouter as Router, useLocation, useHistory} from 'react-router-dom';
// @ts-ignore
import TournamentService from '../../services/TournamentService';
import AuthenticationService from '../../services/AuthenticateService'
import {Help} from "@material-ui/icons";
import validator from 'validator'




const isEndingOnGit = function(string) {
    return /git(@|:)|\.git(?:\/?|\\#[\d\w.\-_]+)$/.test(string);
}

export const TournamentForm: FC = () => {

    const [name, setName] = useState("")
    const [accessMode, setAccessMode] = useState("OPEN")
    const [invitationCode, setInvitationCode] = useState("")
    const [githubLink, setGithubLink] = useState("")
    const [branchName, setBranchName] = useState("")
    const [moduleName, setModuleName] = useState("")

    const [nameError, setNameError] = useState("")
    const [invitationCodeError, setInvitationCodeError] = useState("")
    const [githubLinkError, setGithubLinkError] = useState("")
    const [branchNameError, setBranchNameError] = useState("")
    const [moduleNameError, setModuleNameError] = useState("")

    const repositoryTooltip = <span>
        <p>1. Game needs to import configuration from config.json file. The file should be placed in package with module (you should use provided importer.py file or use your own importer with the same encoding" +method). In that file parameter runs_no and list of controllers are placed.</p>
        <p>2. RandomController needs to be implemented and it should be placed in controller package, so you can import it with "from controller.random import RandomController"</p>
        <p>3. Progress of the iteration should be show with tqdm package, with standard settings</p>
        <p>4. Scoreboard should be logged on standard output in format [number_of_place][.][whitespace][number_of_points][.]</p>
        <p>5. There should be a catalog in repository root named 'results' in which log files will be stored. One of the log files should be .log file</p>
        </span>

    const string= ""

    const location = useLocation();
    const history = useHistory();



    useEffect(() => {
        setNameError("")
    },[name])

    useEffect(() => {
        setInvitationCodeError("")
    },[invitationCode])

    useEffect(() => {
        setGithubLinkError("")
    },[githubLink])

    useEffect(() => {
        setBranchNameError("")
    },[branchName])

    useEffect(() => {
        setModuleNameError("")
    },[moduleName])


    const submitTournament = (e) => {
        let errorFlag = false;

        if(name === ""){
            setNameError("Tournament name cannot be empty");
            errorFlag = true;
        }

        //TODO: check if tournament name is unique

        if(isEndingOnGit(githubLink)){
            setGithubLinkError("Github link should not end on .git")
            errorFlag = true
        }


        if(!validator.isURL(githubLink)){
            setGithubLinkError("Invalid link to Github repository")
            errorFlag = true
        }


        if(githubLink===""){
            setGithubLinkError("Github link cannot be empty")
            errorFlag = true
        }

        if(invitationCode === "" && accessMode === "INVITE_ONLY"){
            setInvitationCodeError("Invitation code is required");
            errorFlag = true;
        }

        if(branchName===""){
            setBranchNameError("Branch name cannot be empty")
            errorFlag = true
        }

        if(moduleName===""){
            setModuleNameError("Module name cannot be empty")
            errorFlag = true
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }

        TournamentService.createTournament({name: name, accessMode: accessMode,
            creator: AuthenticationService.getCurrentUser().id, invitationCode: invitationCode,
        moduleName: moduleName, githubLink: githubLink, branchName: branchName}).then( (res) => {
            history.push('/tournament/'+res.data.id)
            history.go(0)
        })
    }

    return (
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={location.pathname.split("/add-tournament")[0]} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Create Tournament</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField required error={nameError!==""} fullWidth label={nameError===""?"Tournament name":nameError}
                           onChange={(e) => setName(e.target.value)}/>
                <TextField required error={githubLinkError!==""} fullWidth label={githubLinkError===""?"Link to repository on Github":githubLinkError}
                           onChange={(e) => setGithubLink(e.target.value)}
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end">
                                       <Tooltip title={repositoryTooltip} style={{whiteSpace: 'pre-line'}}>
                                           <Help style={{color: "rgba(113, 116, 120, 0.6)"}}/>
                                       </Tooltip>
                                   </InputAdornment>
                               ),
                           }}/>
                <TextField required error={branchNameError!==""} fullWidth label={branchNameError===""?"Main branch name":branchNameError}
                           onChange={(e) => setBranchName(e.target.value)}/>
                <TextField required error={moduleNameError!==""} fullWidth label={moduleNameError===""?"Module name":moduleNameError}
                           onChange={(e) => setModuleName(e.target.value)}/>
                <FormControl className={styles.form} component={"fieldset"}>
                    <FormLabel component="legend">Access mode</FormLabel>
                    <RadioGroup className={styles.formRadios} row aria-label="Access" value={accessMode}
                                onChange={(e) => setAccessMode(e.target.value)}>
                        <FormControlLabel value="OPEN" control={<Radio/>} label="Open"/>
                        <FormControlLabel value="INVITE_ONLY" control={<Radio/>} label="Invite only"/>
                    </RadioGroup>
                </FormControl>
                {accessMode === "INVITE_ONLY"?
                    <TextField required error={invitationCodeError!==""} fullWidth label={invitationCodeError===""?"Invitation code":invitationCodeError}
                                                         onChange={(e) => setInvitationCode(e.target.value)}/> : null}
                <DialogActions className={styles.submitAction}>
                    <Link to={(invitationCodeError || nameError)?"#":location.pathname.split("/add-tournament")[0]}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => submitTournament(e)}
                            disabled={invitationCodeError!=="" || nameError!=="" || branchNameError!==""
                            || moduleNameError!=="" || githubLinkError!==""}
                        >CREATE</Button>
                    </Link>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
