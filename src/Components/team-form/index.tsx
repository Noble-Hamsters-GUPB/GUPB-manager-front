import React, {ChangeEvent, Component, FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import TextField from '@material-ui/core/TextField'
import {
    Button,
    IconButton,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Box,
    InputAdornment,
    Tooltip,
    Checkbox,
    FormControlLabel,
    Grid,
    InputLabel,
    Select,
    Input,
    MenuItem,
    List,
    ListItem,
    Typography,
    ListSubheader,
    DialogContentText
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
// @ts-ignore
import {Link, Route, Switch, useLocation,useHistory, BrowserRouter as Router} from 'react-router-dom';
// @ts-ignore
import TeamService from "../../services/TeamService";
import validator from 'validator'
import {DeleteOutline, Help, PersonAdd} from "@material-ui/icons";
import StudentService from "../../services/StudentService";
import AuthenticateService from "../../services/AuthenticateService";


export const TeamForm: FC<{teamId: number, tournamentId: number, addTeam?: any}> = ({teamId, tournamentId, addTeam}) => {

    //TODO: set team for player id and tournament id
    const [team, setTeam] = useState<{id: number, tournament: string, students: [], name: string, githubLink: string,
        mainClassName: string, branchName: string, playerName: string, playerStatus: string, lastUpdated: string, message:
            string, totalPoints: number, invitationCode: string}>({id: -1, tournament: "", students: [], name: "", githubLink: "",
        mainClassName: "", branchName: "", playerName: "", playerStatus: "", lastUpdated: "", message: "", totalPoints: -1, invitationCode: ""})

    const [name, setName] = useState(teamId===-1?"":team.name)

    const [githubLink, setRepoName] = useState(teamId===-1?"":team.githubLink)

    const [className, setClassName] = useState(teamId===-1?"":team.mainClassName)

    const [invitationCode, setInvitationCode] = useState("")

    const [branchName, setBranchName] = useState(teamId===-1?"":team.branchName)

    const [playerName, setPlayerName] = useState(teamId===-1?"":team.playerName)

    //TODO: if team is being edited, set members from database

    const [members, setMembers] = useState<{id: number, teams: [], firstName: string, lastName: string,
        indexNumber: string, emailAddress: string, password: string}[]>([])
    const [addingMembers, setAddingMembers] = useState(false)
    const [newMembers, setNewMembers] = useState<number[]>([])
    const [membersVisibility, setMembersVisibility] = useState("none")

    const repositoryTooltip = "Requirements for repository structure"

    const isTeamBeingCreated = teamId === -1

    const [students, setStudents] = useState<{id: number, teams: [], firstName: string, lastName: string,
        indexNumber: string, emailAddress: string, password: string}[]>([])

    const [nameError, setNameError] = useState(false)
    const [repoError, setRepoError] = useState(false)
    const [classNameError, setClassNameError] = useState(false)
    const [branchNameError, setBranchNameError] = useState(false)
    const [playerNameError, setPlayerNameError] = useState(false)
    const [invitationCodeError, setInvitationCodeError] = useState(false)

    const location = useLocation()
    const history = useHistory()


    useEffect(() => {
        StudentService.getStudentsNotInTournament(tournamentId).then((res) => {
            setStudents(res.data.filter((e) => e.id!==AuthenticateService.getCurrentUser().id))
        })
    }, [])

    useEffect(() => {
        setRepoError(false)
    },[githubLink])

    useEffect(() => {
        setNameError(false)
    },[name])

    useEffect(() => {
        setInvitationCodeError(false)
    }, [invitationCode])


    const submitTeam= (e) => {
        let errorFlag = false;

        if(name === ""){
            setNameError(true);
            errorFlag = true;
        }

        if(githubLink === "" || !validator.isURL(githubLink) || /git(@|:)|\.git(?:\/?|\\#[\d\w.\-_]+)$/.test(githubLink)){
            setRepoError(true);
            errorFlag = true;
        }

        if(playerName===""){
            setPlayerNameError(true)
            errorFlag = true
        }

        if(className === ""){
            setClassNameError(true)
            errorFlag = true
        }

        if(branchName===""){
            setBranchNameError(true)
            errorFlag = true
        }

        if(teamId === -1 && invitationCode === ""){
            setInvitationCodeError(true)
            errorFlag = true
        }

        e.preventDefault()

        if(errorFlag){
            return;
        }

        TeamService.nameAlreadyExists(name).then((res) => {
            if(res.data === true){
                setNameError(true)
                return;
            }
            else{
                TeamService.playerNameAlreadyExists(playerName).then((res) => {
                    if(res.data === true){
                        setPlayerNameError(true)
                        return;
                    }
                    else{
                        if(addTeam){
                            let membersList:{id: number}[] = []
                            newMembers.forEach((e) => membersList.push({id: e}))
                            membersList.push({id: AuthenticateService.getCurrentUser().id})
                            addTeam({name: name, githubLink: githubLink, members: membersList, tournament_id: tournamentId,
                                playerName: playerName, branchName: branchName, className: className, invitationCode: invitationCode})
                            history.push(location.pathname.split("/add-team")[0])
                            //TODO: add edit option
                        }
                    }
                })
            }})



    }

    const handleAddMembers = (event: ChangeEvent<HTMLInputElement>) => {
        setAddingMembers(event.target.checked)
        if(event.target.checked){
            setMembersVisibility("flex")
        }
        else{
            setMembersVisibility("none")
            setMembers([])
        }
    }

    const handleMembersChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        // @ts-ignore
        setNewMembers(event.target.value as number)
    }

    return (
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={isTeamBeingCreated?location.pathname.split("/add-team")[0]:location.pathname.split("/edit-team")[0]} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>{isTeamBeingCreated?"Create team":"Edit team"}</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <DialogContentText className={styles.dialogText}>Team details</DialogContentText>
                <TextField error={nameError} required fullWidth label={nameError?"Team name cannot be empty or name already in use":"Team name"}
                           onChange={(e) => setName(e.target.value)}/>
                {isTeamBeingCreated? <div><TextField error={invitationCodeError} fullWidth required label={invitationCodeError?"Invitation code cannot be empty":"Enter invitation code"}
                                                     onChange={(e) => setInvitationCode(e.target.value)}/>
                    </div>
                    :null}
                           <DialogContentText className={styles.dialogText}>Repository</DialogContentText>
                <TextField error={repoError} required fullWidth label={repoError?"Link to repository must be a URL":"Link to repository"}
                           onChange={(e) => setRepoName(e.target.value)}
                           InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip title={repositoryTooltip}>
                            <Help style={{color: "rgba(113, 116, 120, 0.6)"}}/>
                            </Tooltip>
                        </InputAdornment>
                    ),
                }}/>
                <TextField required error={branchNameError} fullWidth label={branchNameError?"Branch name cannot be empty":"Branch name"}
                           onChange={(e) => setBranchName(e.target.value)}/>
                <DialogContentText className={styles.dialogText}>Bot details</DialogContentText>
                <TextField required error={classNameError} fullWidth label={classNameError?"Main class name cannot be empty":"Main class name"}
                           onChange={(e) => setClassName(e.target.value)}/>
                <TextField required error={playerNameError} fullWidth label={playerNameError?"Player name cannot be empty or name already in use":"Player name"}
                           onChange={(e) => setPlayerName(e.target.value)}/>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={addingMembers}
                            onChange={handleAddMembers}
                            name="checked"
                            color="primary"
                        />
                    }
                    label="I want to add other team members"
                />
                <Grid container style={{display: membersVisibility}}>
                    <Grid item xs={6}>
                        <InputLabel id="addMembers">Students</InputLabel>
                        <Select style={{minWidth: '18vw'}}
                            labelId="addMembers"
                            id="addMembers"
                            multiple
                            value={newMembers}
                            onChange={handleMembersChange}
                            input={<Input />}
                        >
                            {students.map((student) => (
                                <MenuItem key={student.id} value={student.id}>
                                    {student.firstName+" "+student.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={6} style={{display: isTeamBeingCreated?"none":"flex"}}>
                        <List>
                            <ListSubheader>Current members</ListSubheader>
                        {members.map((student) => (
                            <ListItem>{student.firstName} {student.lastName}</ListItem>
                        ))}
                        </List>
                    </Grid>
                </Grid>
                <DialogActions className={styles.submitAction}>
                    <Link to={(repoError || nameError)?"#":isTeamBeingCreated?location.pathname.split("/add-team")[0]:location.pathname.split("/edit-team")[0]}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => submitTeam(e)}
                            disabled={repoError || nameError || invitationCodeError}
                        >{isTeamBeingCreated?"CREATE":"EDIT"}</Button>
                    </Link>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )

}
