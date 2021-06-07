import {Dispatch, FC, useEffect, useState} from "react";
import styles from './styles.module.css';
import {
    Drawer,
    Grid,
    IconButton,
    makeStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Dialog,
} from "@material-ui/core";
import {TournamentProgression} from "../tournament-progression";
import {BotStatus} from "../bot-status";
import {TournamentHeader} from "../tournament-header";
import {GroupListTournamentParticipant} from "../tournament-group-list-participant";
import {LibraryListParticipant} from "../library-list-participant";
import TeamService from "../../services/TeamService";
import AuthenticateService from "../../services/AuthenticateService";
import {Link, Route, useHistory, useLocation, BrowserRouter as Router} from 'react-router-dom';
import {AccountCircle, AddCircleOutline, Edit, FormatListBulleted, Menu, MeetingRoom} from "@material-ui/icons";
import {TournamentList} from "../tournament-list";
import {TournamentForm} from "../tournament-form";
import {TeamForm} from "../team-form";
import {TournamentRegisterForm} from "../tournament-register-form";
import {TournamentRoundList} from "../tournament-rounds";
import {AccountDetails} from "../account-details";
import TournamentService from "../../services/TournamentService";


const useStyles = makeStyles(theme => ({
    drawer: {
        backgroundColor: "rgba(17, 17, 115, 0.5);"
    },
    drawerText: {
        color: "#fff59d;"
    }
}));
export const TournamentParticipantView:FC<{id:number, rounds: {id: number,tournament: string, number: number,date: string, completedRuns: number,
        numberOfRuns: number, pathToLogs: string}[]}> = (props) => {
    const location = useLocation();
    const history = useHistory();
    const [teams, setTeams] = useState([])
    const [tournament, setTournament] = useState<{id: number, name: string, accessMode: string, creator: string,
        githubLink: string, moduleName: string, branchName: string, invitationCode: string}>(
            {id: -1, name: "", accessMode: "", creator: "", githubLink:"", moduleName: "", branchName: "", invitationCode: ""})

    const user = AuthenticateService.getCurrentUser();
    const nextRound = props.rounds.filter((val) => Date.parse(val.date) > Date.now()).sort((a, b) =>
        (Date.parse(a.date) > Date.parse(b.date)) ? -1 : (Date.parse(a.date) < Date.parse(b.date)) ? 1 : 0)[0]
    let timeToRoundEnd;
    if(nextRound !== undefined) {
        timeToRoundEnd = (Date.parse(nextRound.date) - Date.now()) / 1000; //todo: what to do if nextRound is undefined?
    }

    const classes = useStyles()
    const path = useLocation().pathname
    const [drawerState, setDrawerState] = useState(false)
    const [tournamentListOpen, setTournamentListOpen] = useState(true)

    useEffect(() => {
        TeamService.getTeams().then((res) => {
                setTeams(res.data)
        },
            (error) => {
                AuthenticateService.logout();
            })
    }, [])

    useEffect(() => {
        TournamentService.getTournamentById(props.id).then((res) => {
            setTournament((res.data))
        })
    }, [])

    const closeTournamentList = () => {
        setTournamentListOpen(false)
        history.push(path)
    }

    const logout = () => {
        AuthenticateService.logout();
        history.push("/");
    }

    //TODO: set team id and tournament id in TournamentForm
    return(
        <div className={styles.root}>
            <Router>
            <Grid container spacing={5} className={styles.grid}>
                <Grid item xs={1}>
                    <IconButton onClick={(e) => setDrawerState(true)}>
                        <Menu style={{color: "#081c15", transform: "scale(2)", display: drawerState?"none":"inline"}}/>
                    </IconButton>
                    <Drawer classes={{paper: classes.drawer}} anchor={"left"} open={drawerState} onClose={(e) => setDrawerState(false)}>
                        <div style={{width: "15vw"}}>
                            <img src="/logo_transparent.png" className={styles.MainLogo} alt="logo"/>
                        </div>
                        <List>
                            <Link to={location.pathname+"/tournament-list"} style={{ textDecoration: 'none' }}>
                            <ListItem button onClick={(e) => setTournamentListOpen(true)}>
                                <ListItemIcon className={classes.drawerText}><FormatListBulleted/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Tournament list</ListItemText>
                            </ListItem>
                            </Link>
                            <Link to={location.pathname+"/tournament-register"} style={{ textDecoration: 'none' }}>
                                <ListItem button>
                                    <ListItemIcon className={classes.drawerText}><AddCircleOutline/></ListItemIcon>
                                    <ListItemText className={classes.drawerText}>Register to tournament</ListItemText>
                                </ListItem>
                            </Link>
                            <Link to={location.pathname+"/edit-team"} style={{ textDecoration: 'none' }}>
                            <ListItem button>
                                <ListItemIcon className={classes.drawerText}><Edit/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Edit team</ListItemText>
                            </ListItem>
                            </Link>
                            <Link to={location.pathname+"/account"} style={{ textDecoration: 'none' }}>
                            <ListItem button>
                                <ListItemIcon className={classes.drawerText}><AccountCircle/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Account</ListItemText>
                            </ListItem>
                            </Link>
                            <ListItem button onClick={() => logout()}>
                                <ListItemIcon className={classes.drawerText}><MeetingRoom/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Logout</ListItemText>
                            </ListItem>
                        </List>
                    </Drawer>
                </Grid>
                <Grid item xs={11} style={{minHeight: "14vh"}}>
                    <TournamentHeader name={tournament.name}/>
                </Grid>
                <Grid item xs={2} className={styles.firstRow}/>
                <Grid item xs={2} className={styles.progression+" "+styles.firstRow+" "+styles.bar}>
                    {nextRound !== undefined ? <TournamentProgression time={timeToRoundEnd} currentRound={nextRound.number} maxRounds={props.rounds.length}/> : null} {/*todo: what to do if nextRound is undefined?*/}
                </Grid>
                <Grid item xs={2} className={styles.firstRow}/>
                <Grid item xs={6} className={styles.botStatus+" "+styles.bar}>
                    <BotStatus/>
                </Grid>
                <Grid item xs={4} className={styles.libraries+" "+styles.secRow+" "+styles.bar}>
                    <LibraryListParticipant tournamentId={props.id}/>
                </Grid>
                <Grid item xs={4} className={styles.roundList+" "+styles.secRow+" "+styles.bar}>
                    <GroupListTournamentParticipant data={[...teams]} groupId={1}/>
                </Grid>
                <Grid item xs={4} className={styles.roundList+" "+styles.secRow+" "+styles.bar}>
                    <TournamentRoundList rounds={props.rounds} tournamentId={props.id}/>
                </Grid>
            </Grid>
            <Route path={location.pathname+"/tournament-list"}><Dialog open={tournamentListOpen} onClose={(e) => closeTournamentList()}><TournamentList/></Dialog></Route>
            <Route path={location.pathname+"/edit-team"}><TeamForm teamId={1} tournamentId={1}/></Route>
                <Route path={location.pathname+"/tournament-register"}><TournamentRegisterForm/></Route>
                <Route path={location.pathname+"/account"}><AccountDetails/></Route>
        </Router>
        </div>
    )
}
