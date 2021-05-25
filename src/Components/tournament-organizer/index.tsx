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
import RoundService from "../../services/RoundService";
import {AccountCircle, AddCircleOutline, AddCircleOutlined, FormatListBulleted, Menu} from "@material-ui/icons";
import {Link, Route, useHistory, BrowserRouter as Router} from 'react-router-dom';
import {TournamentList} from "../tournament-list";
import {TournamentForm} from "../tournament-form";
import {TournamentRoundList} from "../tournament-rounds";

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

export const TournamentOrganizerView: FC<{teams, setTeams}> = (props) => {
    const classes = useStyles()
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
                            <Link to={"/add-tournament"} style={{ textDecoration: 'none' }}>
                            <ListItem button>
                                <ListItemIcon className={classes.drawerText}><AddCircleOutline/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Add tournament</ListItemText>
                            </ListItem>
                            </Link>
                            <ListItem button>
                                <ListItemIcon className={classes.drawerText}><AccountCircle/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Account</ListItemText>
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
                <Grid item xs={2} className={styles.firstRow+" "+styles.bar}/>
                <Grid item xs={6} className={styles.botStatus+" "+styles.firstRow}>
                    <LibraryListOrganizer/>
                </Grid>
                <Grid item xs={6} className={styles.libraries+" "+styles.secRow+" "+styles.bar}>
                    <GroupListTournamentOrganizer data={[...props.teams]} roundEnd={roundEnd}/>
                </Grid>
                <Grid item xs={6} className={styles.roundList+" "+styles.secRow+" "+styles.bar}>
                    <TournamentRoundList /*data={roundsData}*/ isOrganizer={true}/>
                </Grid>
            </Grid>
                <Route path={"/tournament-list"}><Dialog open={tournamentListOpen} onClose={(e) => closeTournamentList()}><TournamentList/></Dialog></Route>
                <Route path={"/add-tournament"}><TournamentForm url={path}/></Route>
        </Router>
        </div>
    )
}
