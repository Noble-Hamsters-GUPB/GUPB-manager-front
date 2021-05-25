import {ChangeEvent, FC, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    Select,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputLabel,
    MenuItem, FormControl, Grid, Card, Typography, FormControlLabel, Checkbox, CardContent
} from "@material-ui/core";
import styles from "../tournament-form/styles.module.css";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import {Link, Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import React from "react";
import {TeamForm} from "../team-form";

let data = [{id: 1, name: "Ekstraklasa", startDate: "12-05-2021", numberOfRounds: 5},
    {id: 2, name: "Okręgówka", startDate: "16-04-2021", numberOfRounds: 10},
    {id: 3, name: "Superpuchar", startDate: "30-05-2021", numberOfRounds: 9}]

export const TournamentRegisterForm = (props: {returnLink: string}) => {
    const [tournamentCode, setTournamentCode] = useState("")
    const [teamCode, setTeamCode] = useState("")
    const [tournament, setTournament] = useState({id: -1, name: "", startDate: "", numberOfRounds: 0});
    const [tournamentCodeChecked, setTournamentCodeChecked] = useState(false)
    const [tournamentCodeVisibility, setTournamentCodeVisibility] = useState("none")
    const [teamCodeChecked, setTeamCodeChecked] = useState(false)
    const [teamCodeVisibility, setTeamCodeVisibility] = useState("none")
    const [team, setTeam] = useState({id: -1, name: ""})
    const [addedNewTeam, setAddedNewTeam] = useState("none")

    const [tournamentCodeError, setTournamentCodeError] = useState(false)
    const [teamCodeError, setTeamCodeError] = useState(false)
    const [noTournamentPickedError, setNoTournamentPickedError] = useState(false)
    const [noTeamPickedError, setNoTeamPickedError] = useState(false)

    useEffect(() => {
        setTournamentCodeError(false)
    },[tournamentCode])

    useEffect(() => {
        setTeamCodeError(false)
    },[teamCode])

    useEffect(() => {
        setNoTournamentPickedError(false)
    }, [tournamentCode, tournament])

    useEffect(() => {
        setNoTeamPickedError(false)
    }, [teamCode, team])


    const checkTournament = (e) => {

        if((tournamentCode === "" || (tournamentCode !== "" && !tournamentCodeChecked)) && tournament.id === -1){
            setNoTournamentPickedError(true)
        }

        if(tournamentCodeChecked){
            //test
            if(tournamentCode === "1234") {
                setTournament({id: 4, name: "Tajnyturniej", startDate: "13-05-2021", numberOfRounds: 7})
            }
            if(tournamentCode === ""){
                setTournamentCodeError(true)
            }
            else{
                //TODO: check in database
            }
        }

        e.preventDefault()
        return
    }

    const submitTournamentRequest = (e) => {
        let errorFlag = false;

        //TODO: need some backend validation for tournament code and team code


        if((tournamentCode === "" || (tournamentCode !== "" && !tournamentCodeChecked)) && tournament.id === -1){
            setNoTournamentPickedError(true)
            errorFlag = true
        }

        if((teamCode === "" || (teamCode !== "" && !teamCodeChecked)) && team.id === -1){
            setNoTeamPickedError(true)
            errorFlag = true
        }

        if(tournamentCodeChecked){
            //test
            if(tournamentCode === "1234") {
                setTournament({id: 4, name: "Tajnyturniej", startDate: "13-05-2021", numberOfRounds: 7})
            }
            if(tournamentCode === ""){
                setTournamentCodeError(true)
                errorFlag = true
            }
            else{
                //TODO: check in database
            }
        }

        if(teamCodeChecked){
            //test
            if(teamCode === 'abcd') {
                setTeam({id: 1, name: "Lemury"})
            }
            if(teamCode === ""){
                setTeamCodeError(true)
                errorFlag = true
            }
            else{
                //TODO: check in database
            }
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }
    }

    const handleChangeTournament = (event: ChangeEvent<{ value: unknown }>) => {
        // @ts-ignore
        setTournament(event.target.value);
    }

    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        setTournamentCodeChecked(event.target.checked);
        if(event.target.checked){
            setTournamentCodeVisibility("inline")
            setTournament({id: -1, name: "", startDate: "", numberOfRounds: 0})
        }
        else{
            setTournamentCodeVisibility("none")
            setTournament({id: -1, name: "", startDate: "", numberOfRounds: 0})
        }
    }

    const handleCheckTeam = (event: ChangeEvent<HTMLInputElement>) => {
        setTeamCodeChecked(event.target.checked);
        if(event.target.checked){
            setTeamCodeVisibility("inline")
        }
        else{
            setTeamCodeVisibility("none")
            setTeam({id: -1, name: ""})
        }
    }

    const addNewTeam = (team) => {
        setAddedNewTeam("inline")
        setTeam(team)
    }

    const getTournament = () => {
        return data.find(element => element.id === tournament.id) || {id: "", name: "", startDate: "", numberOfRounds: ""};
    }

    return(
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={props.returnLink} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Join tournament</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <FormControl className={styles.form} component={"fieldset"}>
                <Grid container style={{minWidth: '37vw'}} direction={'row'}>
                    <Grid item xs={12} style={{marginBottom: '2em'}}>
                        <InputLabel id="tournamentCode" error={noTournamentPickedError}>{noTournamentPickedError?
                            "Select open tournament or enter code":"Select one of the open tournaments"}</InputLabel>
                        <Select labelId="tournamentCode" id="select" value={tournament} style={{minWidth: '18vw'}} onChange={handleChangeTournament}>
                            {data.map((tournament) => {
                                // @ts-ignore
                                return <MenuItem value={tournament} key={tournament}>
                                    <div>
                                        <Typography variant="h5" component="h2">
                                            {tournament.name}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Starts on {tournament.startDate}
                                        </Typography>
                                        <Typography style={{fontSize: '0.8em'}} color="textSecondary">
                                            Number of rounds: {tournament.numberOfRounds}
                                        </Typography>
                                </div>
                                </MenuItem>
                            })}
                        </Select>
                    </Grid>
                    <Grid item xs={6} className={styles.inlineBlock}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={tournamentCodeChecked}
                                    onChange={handleCheck}
                                    name="checked"
                                    color="primary"
                                />
                            }
                            label="I have tournament code"
                        />
                    </Grid>
                    <Grid item xs={6} style={{display: tournamentCodeVisibility}}>
                        <TextField label="Enter tournament code" error={tournamentCodeError} variant="outlined" onChange={e => setTournamentCode(e.target.value)}/>
                    </Grid>
                    {tournament.id===-1?null:
                        <Grid container>
                    <Grid item xs={12}>
                        <h3 style={{marginBottom: '1em'}}>Select team</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <p style={{marginBottom: '1em', color: "red", fontSize: "0.8em"}}>{noTeamPickedError?"Add new team or enter code":""}</p>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: "1em"}}>
                        <Router>
                        <Link to={"/create-team"} style={{ textDecoration: 'none' }}>
                            <Button variant="outlined"
                                    color="primary">
                                Add new team
                            </Button>
                        </Link>
                            <Route to path={"/create-team"}><TeamForm teamId={-1} tournamentId={tournament.id} addTeam={addNewTeam} url={window.location.pathname}/></Route>
                        </Router>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: "1em", display: addedNewTeam}}>
                        <p style={{color: "#3f51b5", fontWeight: "bold"} }>Added new team: {team.name}</p>
                    </Grid>
                    <Grid item xs={6} className={styles.inlineBlock}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={teamCodeChecked}
                                    onChange={handleCheckTeam}
                                    name="checked"
                                    color="primary"
                                />
                            }
                            label="I have team code"
                        />
                    </Grid>
                    <Grid item xs={6} style={{display: teamCodeVisibility}}>
                        <TextField label="Enter team code" error={teamCodeError} variant="outlined" onChange={e => setTeamCode(e.target.value)}/>
                    </Grid>
                        </Grid>}
                </Grid>
                </FormControl>
            </DialogContent>
            <DialogActions className={styles.submitAction}>
                <Router>
                <Link to={(tournamentCodeError || teamCodeError || noTournamentPickedError)?"#":"/tournament-register-confirm"}  style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={(e) => {tournament.id===-1?checkTournament(e):submitTournamentRequest(e)}}
                        disabled={tournamentCodeError || teamCodeError || noTournamentPickedError}
                    >SUBMIT</Button>
                </Link>
                    <Route to path='/tournament-register-confirm'><TournamentRegisterFormConfirm tournament={tournament} team={team} returnLink={props.returnLink}/></Route>
                </Router>
            </DialogActions>
        </Dialog>
    )
}

const TournamentRegisterFormConfirm = (props: {tournament, team, returnLink}) => {
    const addToTournament = () => {
        //TODO: backend - add team/user to tournament
    }

    return(
        <Dialog open={true} className={styles.formDialog}>
            <DialogTitle className={styles.formTitle}>Confirm tournament request</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
            <Grid container>
                <Grid item xs={5}>
                        <h3 style={{marginBottom: '2em'}}>Tournament</h3>
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={5}>
                        <h3 style={{marginBottom: '2em'}}>Your team</h3>
                    </Grid>
                    <Grid item xs={5}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {props.tournament.name}
                                </Typography>
                                <Typography color="textSecondary">
                                    Starts on {props.tournament.startDate}
                                </Typography>
                                <Typography style={{fontSize: '0.8em'}} color="textSecondary">
                                    Number of rounds: {props.tournament.numberOfRounds}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={5}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {props.team.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
            </Grid>
            </DialogContent>
            <DialogActions className={styles.submitAction}>
                    <Link to={"/tournament-register"}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="outlined"
                            color="primary"
                        >CANCEL</Button>
                    </Link>
                    <Link to={"#"}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={addToTournament}
                        >OK</Button>
                    </Link>
            </DialogActions>
        </Dialog>
    )
}
