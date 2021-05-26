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
import {Link, Route, useHistory, BrowserRouter as Router} from 'react-router-dom';
import {AccountCircle, AddCircleOutline, Edit, FormatListBulleted, Menu, MeetingRoom} from "@material-ui/icons";
import {TournamentList} from "../tournament-list";
import {TournamentForm} from "../tournament-form";
import {TeamForm} from "../team-form";
import {TournamentRegisterForm} from "../tournament-register-form";
import {TournamentRoundList} from "../tournament-rounds";

/* const groupData = [
    {id: 1, name: "Supergrupa", totalPoints: 456},
     {id: 2,name: "Fajnagrupa",  totalPoints: 459},
     {id: 3, name: "Leniuchy",  totalPoints: 0},
     {id: 4, name: "Lemury", totalPoints: 441},
 ]*/

const roundEnd = "2021-05-16T00:00:00.00";
const timeToRoundEnd =  (Date.parse(roundEnd) - Date.now())/1000;

const useStyles = makeStyles(theme => ({
    drawer: {
        backgroundColor: "rgba(17, 17, 115, 0.5);"
    },
    drawerText: {
        color: "#fff59d;"
    }
}));
export const TournamentParticipantView = () => {
    const history = useHistory();
    const [teams, setTeams] = useState([])

    const user = AuthenticateService.getCurrentUser();

    if(!user) {
        history.push("/login");
    }
    else if(user.roles[0] !== "STUDENT") {
        if(user.roles[0] === "ADMIN") {
            history.push("/tournament-organizer");
        }
        else {
            history.push("/");
        }
    }

    const classes = useStyles();
    const path = window.location.pathname
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
                        <Menu style={{color: "#081c15", transform: "scale(2)"}}/>
                    </IconButton>
                    <Drawer classes={{paper: classes.drawer}} anchor={"left"} open={drawerState} onClose={(e) => setDrawerState(false)}>
                        <div style={{width: "15vw"}}>
                            <img src="/logo_transparent.png" className={styles.MainLogo} alt="logo"/>
                        </div>
                        <List>
                            <Link to={"/tournament-list"} style={{ textDecoration: 'none' }}>
                            <ListItem button onClick={(e) => setTournamentListOpen(true)}>
                                <ListItemIcon className={classes.drawerText}><FormatListBulleted/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Tournament list</ListItemText>
                            </ListItem>
                            </Link>
                            <Link to={"/tournament-register"} style={{ textDecoration: 'none' }}>
                                <ListItem button>
                                    <ListItemIcon className={classes.drawerText}><AddCircleOutline/></ListItemIcon>
                                    <ListItemText className={classes.drawerText}>Register to tournament</ListItemText>
                                </ListItem>
                            </Link>
                            <Link to={"/edit-team"} style={{ textDecoration: 'none' }}>
                            <ListItem button>
                                <ListItemIcon className={classes.drawerText}><Edit/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Edit team</ListItemText>
                            </ListItem>
                            </Link>
                            <ListItem button>
                                <ListItemIcon className={classes.drawerText}><AccountCircle/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Account</ListItemText>
                            </ListItem>
                            <ListItem button onClick={() => logout()}>
                                <ListItemIcon className={classes.drawerText}><MeetingRoom/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Logout</ListItemText>
                            </ListItem>
                        </List>
                    </Drawer>
                </Grid>
                <Grid item xs={11} style={{minHeight: "14vh"}}>
                    <TournamentHeader/>
                </Grid>
                <Grid item xs={2} className={styles.firstRow}/>
                <Grid item xs={2} className={styles.progression+" "+styles.firstRow+" "+styles.bar}>
                    <TournamentProgression time={timeToRoundEnd} currentRound={3} maxRounds={4}/>
                </Grid>
                <Grid item xs={2} className={styles.firstRow}/>
                <Grid item xs={6} className={styles.botStatus+" "+styles.bar}>
                    <BotStatus/>
                </Grid>
                <Grid item xs={4} className={styles.libraries+" "+styles.secRow+" "+styles.bar}>
                    <LibraryListParticipant/>
                </Grid>
                <Grid item xs={4} className={styles.roundList+" "+styles.secRow}>
                    <GroupListTournamentParticipant data={[...teams]} groupId={1}/>
                </Grid>
                <Grid item xs={4} className={styles.roundList+" "+styles.secRow}>
                    <TournamentRoundList isOrganizer={false}/>
                </Grid>
            </Grid>
            <Route path={"/tournament-list"}><Dialog open={tournamentListOpen} onClose={(e) => closeTournamentList()}><TournamentList/></Dialog></Route>
            <Route path={"/edit-team"}><TeamForm teamId={1} tournamentId={1} url={path}/></Route>
                <Route path={"/tournament-register"}><TournamentRegisterForm returnLink={path}/></Route>
        </Router>
        </div>
    )
}
