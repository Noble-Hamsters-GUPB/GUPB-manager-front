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
import {Link, Route, useHistory, BrowserRouter as Router} from 'react-router-dom';
import {AccountCircle, AddCircleOutline, Edit, FormatListBulleted, Menu} from "@material-ui/icons";
import {TournamentList} from "../tournament-list";
import {TournamentForm} from "../tournament-form";
import {TeamForm} from "../team-form";
import {TournamentRegisterForm} from "../tournament-register-form";

// const groupData = [
//     {id: 1, groupName: "Supergrupa", points: 456},
//     {id: 2, groupName: "Fajnagrupa",  points: 459},
//     {id: 3, groupName: "Leniuchy",  points: 0},
//     {id: 4, groupName: "Lemury", points: 441},
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

export const TournamentParticipantView: FC<{teams, setTeams}> = (props) => {
    const classes = useStyles();
    const history = useHistory()
    const path = window.location.pathname
    const [drawerState, setDrawerState] = useState(false)
    const [tournamentListOpen, setTournamentListOpen] = useState(true)

    useEffect(() => {
        TeamService.getTeams().then((res) => {
            if(!(JSON.stringify(res.data) == JSON.stringify(props.teams)))
                props.setTeams(res.data)
        })
    }, [props.teams])

    const closeTournamentList = () => {
        setTournamentListOpen(false)
        history.push(path)
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
                            <ListItem button>
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
                        </List>
                    </Drawer>
                </Grid>
                <Grid item xs={11}>
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
                <Grid item xs={6} className={styles.libraries+" "+styles.secRow+" "+styles.bar}>
                    <LibraryListParticipant/>
                </Grid>
                <Grid item xs={6} className={styles.roundList+" "+styles.secRow}>
                    <GroupListTournamentParticipant data={[...props.teams]} groupId={1}/>
                </Grid>
            </Grid>
            <Route path={"/tournament-list"}><Dialog open={tournamentListOpen} onClose={(e) => closeTournamentList()}><TournamentList/></Dialog></Route>
            <Route path={"/edit-team"}><TeamForm teamId={1} tournamentId={1} url={path}/></Route>
                <Route path={"/tournament-register"}><TournamentRegisterForm returnLink={path}/></Route>
        </Router>
        </div>
    )
}
