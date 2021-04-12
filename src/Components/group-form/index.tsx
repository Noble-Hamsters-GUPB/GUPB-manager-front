import {Component, FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import TextField from '@material-ui/core/TextField'
import {
    Button, IconButton, Dialog, DialogContent, DialogTitle, DialogActions, Box
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
// @ts-ignore
import {Link, Route, Switch, BrowserRouter as Router} from 'react-router-dom';
// @ts-ignore
import GroupService from "../../services/GroupService";
import validator from 'validator'
import {DeleteOutline, PersonAdd} from "@material-ui/icons";


export const GroupForm: FC = (props) => {
    const [name, setName] = useState("")
    const [repo, setRepoName] = useState("")
    const [team, setTeam] = useState([{firstName: "", lastName: "", indexNumber: ""}])

    const [nameError, setNameError] = useState(false)
    const [repoError, setRepoError] = useState(false)
    const [memberNameError, setMemberNameError] = useState(false)
    const [memberLastNameError, setMemberLastNameError] = useState(false)
    const [memberIndexError, setMemberIndexError] = useState(false)

    useEffect(() => {
        setRepoError(false)
    },[repo])

    useEffect(() => {
        setNameError(false)
    },[name])


    const submitGroup= (e) => {
        let errorFlag = false;

        if(name === ""){
            setNameError(true);
            errorFlag = true;
        }

        if(repo === "" || !validator.isURL(repo)){
            setRepoError(true);
            errorFlag = true;
        }

        for(let teamMem of team){
            if(teamMem['indexNumber'] === "" || !/^(\d{6})$/.test(teamMem['indexNumber'])){
                setMemberIndexError(true);
                errorFlag = true;
            }
            if(teamMem['firstName'] === ""){
                setMemberNameError(true);
                errorFlag = true;
            }
            if(teamMem['lastName'] === ""){
                setMemberLastNameError(true);
                errorFlag = true;
            }
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }


        GroupService.createGroup({"name": name, "githubLink": repo, "members": team})
    }

    function handleMemberChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) {
        const { name, value } = e.target;
        const list = [...team];
        list[i][name] = value;
        setMemberNameError(false);
        setMemberIndexError(false);
        setMemberLastNameError(false);
        setTeam(list);
    }

    return (
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={'/groups'} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Create Group</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField error={nameError} fullWidth label={nameError?"Group name cannot be empty":"Group name"}
                           onChange={(e) => setName(e.target.value)}/>
                <TextField error={repoError} fullWidth label={repoError?"Link to repository must be a URL":"Link to repository"}
                           onChange={(e) => setRepoName(e.target.value)}/>
                {team.map((x, i) => {
                    return(
                        <Box>
                        <TextField error={memberNameError} name="firstName"
                               label={memberNameError ? "Name cannot be empty" : "Member name"}
                               onChange={(e) => handleMemberChange(e, i)}/>
                        <TextField error={memberLastNameError} name="lastName"
                               label={memberLastNameError ? "Last name cannot be empty" : "Member last name"}
                               onChange={(e) => handleMemberChange(e, i)}/>
                               <TextField error={memberIndexError} name="indexNumber"
                                       label={memberIndexError ? "Enter correct index number" : "Index number"}
                                       onChange={(e) => handleMemberChange(e, i)}/>
                    {team.length-1 === i && <Button color="primary" startIcon={<PersonAdd/>} onClick={() => {
                        function handleAddMember() {
                            setTeam([...team, { firstName: "", lastName: "", indexNumber: "" }]);
                        }

                        handleAddMember() }}>
                    Add team member</Button>}
                    {team.length !== 1 && <Button color="primary" startIcon={<DeleteOutline/>} onClick={() => {
                        function handleRemoveMember(i: number) {
                            const list = [...team];
                            list.splice(i, 1);
                            setTeam(list);
                        }

                        handleRemoveMember(i) }}>
                        Remove</Button>}
                        </Box>)
                })}
                <DialogActions className={styles.submitAction}>
                    <Link to={(repoError || nameError)?"#":"/groups"}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => submitGroup(e)}
                            disabled={repoError || nameError}
                        >CREATE</Button>
                    </Link>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )

}
