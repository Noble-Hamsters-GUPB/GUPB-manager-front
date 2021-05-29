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
    FormControlLabel, Grid, InputLabel, Select, Input, MenuItem, List, ListItem, Typography, ListSubheader
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
// @ts-ignore
import {Link, Route, Switch, BrowserRouter as Router} from 'react-router-dom';
// @ts-ignore
import TeamService from "../../services/TeamService";
import validator from 'validator'
import {DeleteOutline, Help, PersonAdd} from "@material-ui/icons";


export const TeamForm: FC<{teamId: number, tournamentId: number, addTeam?: any, url: string}> = ({teamId, tournamentId, addTeam, url}) => {
    //TODO: set parameters if editing
    const [name, setName] = useState("")
    const [githubLink, setRepoName] = useState("")
    const [className, setClassName] = useState("")
    const [invitationCode, setInvitationCode] = useState("")
    //TODO: if team is being edited, set members from database
    const [members, setTeam] = useState([{id: 5, name: "Mania", surname: "Pawlik"}, {id: 10, name: "Andrzej", surname: "Kos"}])
    const [addingMembers, setAddingMembers] = useState(false)
    const [newMembers, setNewMembers] = useState([])
    const [membersVisibility, setMembersVisibility] = useState("none")
    const repositoryTooltip = "Requirements for repository structure"
    const isTeamBeingCreated = teamId === -1
    //TODO: get all available students for tournament from database
    const students = [{id: 1, name: "Kasia", surname: "Wojas"},
        {id: 2, name: "Anna", surname: "But"},
        {id: 3, name: "Wojtek", surname: "Gruszka"}]

    const [nameError, setNameError] = useState(false)
    const [repoError, setRepoError] = useState(false)
    const [invitationCodeError, setInvitationCodeError] = useState(false)

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

        if(githubLink === "" || !validator.isURL(githubLink)){
            setRepoError(true);
            errorFlag = true;
        }

        if(teamId === -1 && invitationCode === ""){
            setInvitationCodeError(true)
            errorFlag = true
        }

        //TODO: check in database if invitation code is unique

        if(errorFlag){
            e.preventDefault();
            return;
        }

        //TODO: update id after add database connection
        if(addTeam){

        }

        //TODO: update existing service and add edit option
        TeamService.createTeam({"name": name, "githubLink": githubLink, "members": members})
    }

    const handleAddMembers = (event: ChangeEvent<HTMLInputElement>) => {
        setAddingMembers(event.target.checked)
        if(event.target.checked){
            setMembersVisibility("flex")
        }
        else{
            setMembersVisibility("none")
            setTeam([])
        }
    }

    const handleMembersChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        // @ts-ignore
        setNewMembers(event.target.value as string[])
    }

    return (
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={url} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>{isTeamBeingCreated?"Create team":"Edit team"}</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField error={nameError} required fullWidth label={nameError?"Team name cannot be empty":"Team name"}
                           onChange={(e) => setName(e.target.value)}/>
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
                <TextField fullWidth label={"Main class name"}
                           onChange={(e) => setClassName(e.target.value)}/>
                {isTeamBeingCreated? <div><TextField error={invitationCodeError} fullWidth required label={invitationCodeError?"Invitation code can not be empty":"Pick invitation code"}
                                         onChange={(e) => setClassName(e.target.value)}/>
                    </div>
                                         :null}
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
                                    {student.name+" "+student.surname}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={6} style={{display: isTeamBeingCreated?"none":"flex"}}>
                        <List>
                            <ListSubheader>Current members</ListSubheader>
                        {members.map((student) => (
                            <ListItem>{student.name} {student.surname}</ListItem>
                        ))}
                        </List>
                    </Grid>
                </Grid>
                <DialogActions className={styles.submitAction}>
                    <Link to={(repoError || nameError)?"#":url}  style={{ textDecoration: 'none' }}>
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
