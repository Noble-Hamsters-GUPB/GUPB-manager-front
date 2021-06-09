import {FC, useEffect, useState} from "react";
import styles from './styles.module.css';
import {
    Dialog,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles
} from "@material-ui/core";
import {TournamentProgression} from "../tournament-progression";
import {BotStatus} from "../bot-status";
import {LibraryListOrganizer} from "../library-list-organizer";
import {GroupListTournamentOrganizer} from "../tournament-group-list-organizer";
import {TournamentHeader} from "../tournament-header";
import TeamService from "../../services/TeamService";
import AuthenticateService from "../../services/AuthenticateService";
import RoundService from "../../services/RoundService";
import {
    AccountCircle,
    AddCircleOutline,
    AddCircleOutlined,
    FormatListBulleted,
    Menu,
    MeetingRoom,
    AssignmentInd
} from "@material-ui/icons";
import {Link, Route, useHistory, BrowserRouter as Router, useLocation} from 'react-router-dom';
import {TournamentList} from "../tournament-list";
import {TournamentForm} from "../tournament-form";
import {TournamentRoundList} from "../tournament-rounds";
import {AccountDetails} from "../account-details";
import TournamentService from "../../services/TournamentService";
import {AdminForm} from "../admin-form";



const useStyles = makeStyles(theme => ({
    drawer: {
            backgroundColor: "rgba(17, 17, 115, 0.5);"
        },
    drawerText: {
        color: "#fff59d;"
    }
}));
export const TournamentOrganizerView:FC<{id:number, rounds: {id: number,tournament: string, number: number,date: string, completedRuns: number,
    numberOfRuns: number, pathToLogs: string}[]}> = (props) => {
    const location = useLocation();

    const [teams, setTeams] = useState<{id: number, tournament: string, students: [], name: string, githubLink: string,
        mainClassName: string, branchName: string, playerName: string, playerStatus: string, lastUpdated: string, message:
            string, totalPoints: number, invitationCode: string}[]>([{id: -1, tournament: "", students: [], name: "", githubLink: "",
        mainClassName: "", branchName: "", playerName: "", playerStatus: "", lastUpdated: "", message: "", totalPoints: -1, invitationCode: ""}])

    const history = useHistory();
    const classes = useStyles()
    const [drawerState, setDrawerState] = useState(false)
    const [tournamentListOpen, setTournamentListOpen] = useState(true)

    const [tournament, setTournament] = useState<{id: number, name: string, accessMode: string, creator: string,
        githubLink: string, moduleName: string, branchName: string, invitationCode: string}>(
        {id: -1, name: "", accessMode: "", creator: "", githubLink:"", moduleName: "", branchName: "", invitationCode: ""})

    const user = AuthenticateService.getCurrentUser();

    useEffect(() => {
        TeamService.getTeamsForTournament(props.id).then((res) => {
            setTeams(res.data);
        }).catch((error) => {
            alert(error)
            AuthenticateService.logout()
        })

        TournamentService.getTournamentById(props.id).then((res) => {
                setTournament(res.data);
            }).catch((error) => {
            alert(error)
            AuthenticateService.logout()
        })
    }, [])

    let timeToRoundEnd = -5

     useEffect(() => {

     }, [props.rounds])
    // useEffect(() => {
    //     setRounds(props.rounds)
    // }, [])
  //  console.log(props.rounds)
    const filteredRounds = props.rounds.filter((val) => Date.parse(val.date) > Date.now())
    const nextRound = filteredRounds.sort((a, b) =>
        (Date.parse(a.date) > Date.parse(b.date)) ? -1 : (Date.parse(a.date) < Date.parse(b.date)) ? 1 : 0)[filteredRounds.length-1]

    if(nextRound !== undefined) {
        timeToRoundEnd = ((Date.parse(nextRound.date) - Date.now()) / 1000);
    } else{
        timeToRoundEnd = -5;
    }

    const closeTournamentList = () => {
        setTournamentListOpen(false);
        history.push(location.pathname);
    }

    const logout = () => {
        AuthenticateService.logout();
        history.push("/");
    }

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
                            <Link to={location.pathname+"/tournaments"} style={{ textDecoration: 'none' }}>
                            <ListItem button onClick={(e) => setTournamentListOpen(true)}>
                                <ListItemIcon className={classes.drawerText}><FormatListBulleted/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Tournament list</ListItemText>
                            </ListItem>
                            </Link>
                            <Link to={location.pathname+"/add-tournament"} style={{ textDecoration: 'none' }}>
                            <ListItem button>
                                <ListItemIcon className={classes.drawerText}><AddCircleOutline/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Add tournament</ListItemText>
                            </ListItem>
                            </Link>
                            <Link to={location.pathname+"/add-organizer"} style={{ textDecoration: 'none' }}>
                            <ListItem button>
                                <ListItemIcon className={classes.drawerText}><AssignmentInd/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Add organizer</ListItemText>
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
                <Grid item xs={11} style={{minHeight: "10vh"}}>
                    <TournamentHeader name={tournament.name}/>
                </Grid>
                <Grid item xs={2} className={styles.firstRow}/>
                <Grid item xs={2} className={styles.progression+" "+styles.firstRow+" "+styles.bar}>
                    <TournamentProgression time={timeToRoundEnd} finishedRounds={props.rounds.reduce((a, b) => (a+(Date.parse(b.date) < Date.now()?1:0)), 0)} maxRounds={props.rounds.length}/> {/*todo: what to do if nextRound is undefined?*/}
                </Grid>
                <Grid item xs={2} className={styles.firstRow+" "+styles.bar}/>
                <Grid item xs={6} className={styles.botStatus+" "+styles.firstRow}>
                    <LibraryListOrganizer tournamentId={props.id}/>
                </Grid>
                <Grid item xs={6} className={styles.libraries+" "+styles.secRow+" "+styles.bar}>
                    <GroupListTournamentOrganizer data={teams}/>
                </Grid>
                <Grid item xs={6} className={styles.roundList+" "+styles.secRow+" "+styles.bar}>
                    <TournamentRoundList  rounds={props.rounds} tournamentId={props.id}/>
                </Grid>
            </Grid>
                <Route path={location.pathname+"/tournaments"}><Dialog open={tournamentListOpen} onClose={(e) => closeTournamentList()}><TournamentList/></Dialog></Route>
                <Route path={location.pathname+"/add-tournament"}><TournamentForm/></Route>
                <Route path={location.pathname+"/account"}><AccountDetails/></Route>
                <Route path={location.pathname+"/add-organizer"}><AdminForm/></Route>
        </Router>
        </div>
    )
}
