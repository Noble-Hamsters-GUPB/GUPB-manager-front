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
import {AccountCircle, AddCircleOutline, AddCircleOutlined, FormatListBulleted, Menu, MeetingRoom} from "@material-ui/icons";
import {Link, Route, useHistory, BrowserRouter as Router, useLocation} from 'react-router-dom';
import {TournamentList} from "../tournament-list";
import {TournamentForm} from "../tournament-form";
import {TournamentRoundList} from "../tournament-rounds";
import {AccountDetails} from "../account-details";

// const groupData = [
//     {groupName: "Supergrupa", botStatus: "2021-04-11", points: 456},
//     {groupName: "Fajnagrupa", botStatus: "2021-04-18", points: 459},
//     {groupName: "Leniuchy", botStatus: null, points: 0},
//     {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
// ]

// const roundsData = [
//     {id: 1, startDate: "2021-04-05T00:00:00.00", endDate: "2021-04-18T00:00:00.00", numberOfIterations: 200},
//     {id: 2, startDate: "2021-04-19T00:00:00.00", endDate: "2021-05-02T00:00:00.00", numberOfIterations: 200},
//     {id: 3, startDate: "2021-05-03T00:00:00.00", endDate: "2021-05-16T00:00:00.00", numberOfIterations: 200},
//     {id: 4, startDate: "2021-05-17T00:00:00.00", endDate: "2021-05-21T00:00:00.00", numberOfIterations: 200}
// ]

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
export const TournamentOrganizerView:FC<{id:number}> = (props) => {
    const location = useLocation();
    const [teams, setTeams] = useState([])
    const history = useHistory();
    const classes = useStyles()
    const [drawerState, setDrawerState] = useState(false)
    const [tournamentListOpen, setTournamentListOpen] = useState(true)

    const user = AuthenticateService.getCurrentUser();

    useEffect(() => {
        TeamService.getTeams().then((res) => {
            setTeams(res.data);
        },
            (error) => {
                AuthenticateService.logout();
            })
    }, [])

    const closeTournamentList = () => {
        setTournamentListOpen(false);
        history.push(location.pathname);
    }

    const logout = () => {
        AuthenticateService.logout();
        history.push("/");
    }

    console.log(tournamentListOpen)

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
                    <TournamentHeader/>
                </Grid>
                <Grid item xs={2} className={styles.firstRow}/>
                <Grid item xs={2} className={styles.progression+" "+styles.firstRow+" "+styles.bar}>
                    <TournamentProgression time={timeToRoundEnd} currentRound={3} maxRounds={4}/>
                </Grid>
                <Grid item xs={2} className={styles.firstRow+" "+styles.bar}/>
                <Grid item xs={6} className={styles.botStatus+" "+styles.firstRow}>
                    <LibraryListOrganizer/>
                </Grid>
                <Grid item xs={6} className={styles.libraries+" "+styles.secRow+" "+styles.bar}>
                    <GroupListTournamentOrganizer data={[...teams]} roundEnd={roundEnd}/>
                </Grid>
                <Grid item xs={6} className={styles.roundList+" "+styles.secRow+" "+styles.bar}>
                    <TournamentRoundList/>
                </Grid>
            </Grid>
                <Route path={location.pathname+"/tournaments"}><Dialog open={tournamentListOpen} onClose={(e) => closeTournamentList()}><TournamentList/></Dialog></Route>
                <Route path={location.pathname+"/add-tournament"}><TournamentForm/></Route>
                <Route path={location.pathname+"/account"}><AccountDetails/></Route>
        </Router>
        </div>
    )
}
