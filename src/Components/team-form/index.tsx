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
import TeamService from "../../services/TeamService";
import validator from 'validator'
import {DeleteOutline, PersonAdd} from "@material-ui/icons";


export const TeamForm: FC = (props) => {
    const [name, setName] = useState("")
    const [githubLink, setRepoName] = useState("")
    const [members, setTeam] = useState([{firstName: "", lastName: "", indexNumber: ""}])

    const [nameError, setNameError] = useState(false)
    const [repoError, setRepoError] = useState(false)
    const [memberNameError, setMemberNameError] = useState(false)
    const [memberLastNameError, setMemberLastNameError] = useState(false)
    const [memberIndexError, setMemberIndexError] = useState(false)

    useEffect(() => {
        setRepoError(false)
    },[githubLink])

    useEffect(() => {
        setNameError(false)
    },[name])


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

        for(let teamMem of members){
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


        TeamService.createTeam({"name": name, "githubLink": githubLink, "members": members})
    }

    function handleMemberChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) {
        const { name, value } = e.target;
        const list = [...members];
        list[i][name] = value;
        setMemberNameError(false);
        setMemberIndexError(false);
        setMemberLastNameError(false);
        setTeam(list);
    }

    return (
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={'/teams'} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Create Team</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField error={nameError} fullWidth label={nameError?"Team name cannot be empty":"Team name"}
                           onChange={(e) => setName(e.target.value)}/>
                <TextField error={repoError} fullWidth label={repoError?"Link to repository must be a URL":"Link to repository"}
                           onChange={(e) => setRepoName(e.target.value)}/>
                {members.map((x, i) => {
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
                    {members.length-1 === i && <Button color="primary" startIcon={<PersonAdd/>} onClick={() => {
                        function handleAddMember() {
                            setTeam([...members, { firstName: "", lastName: "", indexNumber: "" }]);
                        }

                        handleAddMember() }}>
                    Add new member</Button>}
                    {team.length !== 1 && <Button color="primary" startIcon={<DeleteOutline/>} onClick={() => {
                        function handleRemoveMember(i: number) {
                            const list = [...members];
                            list.splice(i, 1);
                            setTeam(list);
                        }

                        handleRemoveMember(i) }}>
                        Remove</Button>}
                        </Box>)
                })}
                <DialogActions className={styles.submitAction}>
                    <Link to={(repoError || nameError)?"#":"/teams"}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => submitTeam(e)}
                            disabled={repoError || nameError}
                        >CREATE</Button>
                    </Link>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )

}
