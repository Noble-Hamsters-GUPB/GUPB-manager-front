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
import {Link, Route, useLocation, useHistory, BrowserRouter as Router} from 'react-router-dom';
import React from "react";
import {TeamForm} from "../team-form";
import TournamentService from "../../services/TournamentService";
import TeamService from "../../services/TeamService";
import AuthenticateService from "../../services/AuthenticateService";
import {TournamentView} from "../tournament-view";

/*let data = [{id: 1, name: "Ekstraklasa", startDate: "12-05-2021", numberOfRounds: 5, accessMode: "OPEN"},
    {id: 2, name: "Okręgówka", startDate: "16-04-2021", numberOfRounds: 10, accessMode: "INVITE_ONLY"},
    {id: 3, name: "Superpuchar", startDate: "30-05-2021", numberOfRounds: 9, accessMode: "OPEN"}]*/

/*let team_data = [{id: 1, name: "Kojoty"}, {id: 2, name: "Kotki"}, {id: 3, name: "Żyrafy"}]*/

export const TournamentRegisterForm: FC = () => {
    const [tournamentCode, setTournamentCode] = useState("")
    const [teamCode, setTeamCode] = useState("")

    const [tournamentData, setTournamentData] = useState<{id: number, name: string, accessMode: string, creator: string,
        githubLink: string, moduleName: string, branchName: string, invitationCode: string}[]>([])

    const [tournament, setTournament] = useState<{id: number, name: string, accessMode: string, creator: string,
        githubLink: string, moduleName: string, branchName: string, invitationCode: string}>(
            {id: -1, name: "", accessMode: "", creator: "", githubLink:"", moduleName: "", branchName: "", invitationCode: ""});

    const [tournamentOk, setTournamentOk] = useState(false)
    const [tournamentCodeVisibility, setTournamentCodeVisibility] = useState("none")

    const [teamCodeVisibility, setTeamCodeVisibility] = useState("none")

    const [team, setTeam] = useState<{id: number, tournament: string, students: [], name: string, githubLink: string,
        mainClassName: string, branchName: string, playerName: string, playerStatus: string, lastUpdated: string, message:
            string, totalPoints: number, invitationCode: string}>({id: -1, tournament: "", students: [], name: "", githubLink: "",
        mainClassName: "", branchName: "", playerName: "", playerStatus: "", lastUpdated: "", message: "", totalPoints: -1, invitationCode: ""})

    const [addedNewTeam, setAddedNewTeam] = useState("none")
    const [teamData, setTeamData] = useState<{id: number, tournament: string, students: [], name: string, githubLink: string,
        mainClassName: string, branchName: string, playerName: string, playerStatus: string, lastUpdated: string, message:
            string, totalPoints: number, invitationCode: string}[]>([])

    const [tournamentCodeError, setTournamentCodeError] = useState(false)
    const [teamCodeError, setTeamCodeError] = useState(false)
    const [noTournamentPickedError, setNoTournamentPickedError] = useState(false)
    const [noTeamPickedError, setNoTeamPickedError] = useState(false)

    const location = useLocation()

    useEffect(() => {
        TournamentService.getTournamentsWithoutStudent(AuthenticateService.getCurrentUser().id).then((res) => {
            setTournamentData(res.data) })
    }, [])

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

        if(tournament.id === -1){
            setNoTournamentPickedError(true)
        }

        if(tournament.accessMode === "OPEN"){
            setTournamentOk(true)
            return
        }

        if(tournament.accessMode === "INVITE_ONLY"){
            if(tournamentCode === "") {
                setTournamentCodeError(true)
            }
            else{
                if(tournament.invitationCode === tournamentCode) {
                    TeamService.getTeamsForTournament(tournament.id).then((res) => {
                        setTeamData(res.data)
                    })
                    setTournamentCodeError(false)
                    setTournamentOk(true)
                }
                else{
                    setTournamentCodeError(true)
                    setTournamentOk(false)
                }
            }
        }

        e.preventDefault()
        return
    }

    const submitTournamentRequest = (e) => {
        let errorFlag = false;

        if(tournament.accessMode === "INVITE_ONLY"){
            if(tournamentCode === "") {
                setTournamentCodeError(true)
                errorFlag = true
            }
            else{
                if(tournament.invitationCode === tournamentCode) {
                    TeamService.getTeamsForTournament(tournament.id).then((res) => {
                        setTeamData(res.data)
                    })
                    setTournamentCodeError(false)
                    setTournamentOk(true)
                }
                else{
                    errorFlag = true
                }
            }
        }

        if(addedNewTeam==="none"){
            if(teamCode === ""){
                setTeamCodeError(true)
                errorFlag = true
            }
            else{
                if(team.invitationCode === teamCode){
                    setTeamCodeError(false)
                }
                else{
                    setTeamCodeError(true)
                    errorFlag = true
                }
            }
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }
    }

    const handleChangeTournament = (event: ChangeEvent<{ value: unknown }>) => {
        let tournament_tmp = event.target.value;
        // @ts-ignore
        setTournament(tournament_tmp)
        // @ts-ignore
        if(tournament_tmp.accessMode === "INVITE_ONLY"){
            setTournamentOk(false)
            setTournamentCodeVisibility("inline")
        }
        else{
            setTournamentOk(true)
            setTournamentCodeVisibility("none")
            // @ts-ignore
            TeamService.getTeamsForTournament(tournament_tmp.id).then((res) => {
                setTeamData(res.data)
            })
        }
    }

    function handleChangeTeam(event: ChangeEvent<{ value: unknown }>) {
        let team_tmp = event.target.value;
        setTeamCodeVisibility("inline")
        // @ts-ignore
        setTeam(team_tmp)
    }

    const addNewTeam = (team) => {
        setAddedNewTeam("inline")
        console.log(team)
        setTeam(team)
    }

    const getTournament = () => {
        return tournamentData.find(element => element.id === tournament.id) || {id: "", name: "", startDate: "", numberOfRounds: ""};
    }

    return(
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={location.pathname.split("/tournament-register")[0]} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Join tournament</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <Grid container style={{minWidth: '37vw'}} direction={'row'}>
                    <FormControl className={styles.form}>
                    <Grid item xs={12} style={{marginBottom: '2em'}}>
                        <InputLabel id="tournamentCode" error={noTournamentPickedError}>{noTournamentPickedError?
                            "You need to select a tournament":"Select tournament"}</InputLabel>
                        <Select labelId="tournamentCode" id="select" value={tournament} style={{minWidth: '18vw'}} onChange={handleChangeTournament}>
                            {tournamentData.filter((elem) => elem.id!=-1).map((tournament) => {
                                // @ts-ignore
                                return <MenuItem value={tournament} key={tournament.id}>
                                    <div>
                                        <Typography variant="h5" component="h2">
                                            {tournament.name}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Github:  {tournament.githubLink}
                                        </Typography>
                                        <Typography style={{fontSize: '0.8em', color: "#111173"}}>
                                            {tournament.accessMode==="OPEN"?"Open tournament":"You need an invitation code"}
                                        </Typography>
                                </div>
                                </MenuItem>
                            })}
                        </Select>
                    </Grid>
                    <Grid item xs={12} style={{display: tournamentCodeVisibility}}>
                        <TextField label="Enter tournament code" error={tournamentCodeError} variant="outlined" onChange={e => setTournamentCode(e.target.value)}/>
                    </Grid>
                    </FormControl>
                    {!tournamentOk?null:
                        <Grid container>
                    <Grid item xs={12}>
                        <h3 style={{marginBottom: '1em'}}>Select team</h3>
                    </Grid>
                            {addedNewTeam === "none" && <Grid item xs={6} style={{marginBottom: '2em'}}>
                                <FormControl className={styles.form}>
                                <InputLabel id="teamCode" error={noTeamPickedError}>{noTeamPickedError?
                                    "Select a team or create new one":"Select team"}</InputLabel>
                                <Select labelId="teamCode" id="selectTeam" value={team} style={{minWidth: '7vw'}} onChange={handleChangeTeam}>
                                    {teamData.map((team) => {
                                        // @ts-ignore
                                        return <MenuItem value={team} key={team.id}>
                                            <div>
                                                <Typography variant="h6">
                                                    {team.name}
                                                </Typography>
                                            </div>
                                        </MenuItem>
                                    })}
                                </Select>
                                </FormControl>
                            </Grid>}
                            <Grid item xs={6} style={{display: teamCodeVisibility}}>
                                <TextField label="Enter team code" error={teamCodeError} variant="outlined" onChange={e => setTeamCode(e.target.value)}/>
                            </Grid>
                    <Grid item xs={12}>
                        <p style={{marginBottom: '1em', color: "red", fontSize: "0.8em"}}>{noTeamPickedError?"Add new team or pick one from existing":""}</p>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: "1em"}}>
                        <Router>
                        <Link to={location.pathname+"/add-team"} style={{ textDecoration: 'none' }}>
                            <Button variant="outlined"
                                    color="primary">
                                Add new team
                            </Button>
                        </Link>
                            <Route to path={location.pathname+"/add-team"}><TeamForm tournamentId={tournament.id} addTeam={addNewTeam}/></Route>
                        </Router>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: "1em", display: addedNewTeam}}>
                        <p style={{color: "#3f51b5", fontWeight: "bold"} }>Created and selected new team: {team.name}</p>
                    </Grid>
                        </Grid>
                        }
                </Grid>
            </DialogContent>
            <DialogActions className={styles.submitAction}>
                <Router>
                <Link to={(tournamentCodeError || teamCodeError || noTournamentPickedError)?"#":"/tournament-register-confirm"}  style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={(e) => {!tournamentOk?checkTournament(e):submitTournamentRequest(e)}}
                        disabled={tournamentCodeError || teamCodeError || noTournamentPickedError}
                    >SUBMIT</Button>
                </Link>
                    <Route path='/tournament-register-confirm'><TournamentRegisterFormConfirm tournament={tournament} team={team} isTeamCreated={addedNewTeam==="inline"}/></Route>
                </Router>
            </DialogActions>
        </Dialog>
    )
}

const TournamentRegisterFormConfirm = (props: {tournament, team, isTeamCreated}) => {
    const history = useHistory()

    const addToTournament = () => {
        if(props.isTeamCreated){
            TeamService.createTeam(props.team)
            history.push(`/tournament/${props.tournament.id}`)
            history.go(0)
        }
        else{
            TeamService.joinTeam(props.team.id, AuthenticateService.getCurrentUser().id)
            history.push(`/tournament/${props.tournament.id}`)
            history.go(0)
        }
    }

    const location = useLocation()

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
                                    Github:  {props.tournament.githubLink}
                                </Typography>
                                <Typography style={{fontSize: '0.8em'}} color="textSecondary">
                                    Access mode: {props.tournament.accessMode}
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
                <Router>
                    <Link to={location.pathname.split('/tournament-register-confirm')[0]}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="outlined"
                            color="primary"
                        >CANCEL</Button>
                    </Link>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={addToTournament}
                        >OK</Button>
                </Router>
            </DialogActions>
        </Dialog>
    )
}
