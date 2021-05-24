import {Dispatch, FC, useEffect, useState} from "react";
import styles from './styles.module.css';
import {Drawer, Grid, IconButton, makeStyles, List, ListItem, ListItemIcon, ListItemText,} from "@material-ui/core";
import {TournamentProgression} from "../tournament-progression";
import {BotStatus} from "../bot-status";
import {TournamentHeader} from "../tournament-header";
import {GroupListTournamentParticipant} from "../tournament-group-list-participant";
import {LibraryListParticipant} from "../library-list-participant";
import TeamService from "../../services/TeamService";
import {AccountCircle, Edit, FormatListBulleted, Menu} from "@material-ui/icons";

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
    const [drawerState, setDrawerState] = useState(false)

    useEffect(() => {
        TeamService.getTeams().then((res) => {
            if(!(JSON.stringify(res.data) == JSON.stringify(props.teams)))
                props.setTeams(res.data)
        })
    }, [props.teams])

    return(
        <div className={styles.root}>
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
                            <ListItem button>
                                <ListItemIcon className={classes.drawerText}><FormatListBulleted/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Tournament list</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon className={classes.drawerText}><Edit/></ListItemIcon>
                                <ListItemText className={classes.drawerText}>Edit team</ListItemText>
                            </ListItem>
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
        </div>
    )
}
