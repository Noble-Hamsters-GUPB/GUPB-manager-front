import {FC, useEffect, useState} from "react";
import styles from './styles.module.css';
import {Grid} from "@material-ui/core";
import {TournamentProgression} from "../tournament-progression";
import {BotStatus} from "../bot-status";
import {LibraryListOrganizer} from "../library-list-organizer";
import {GroupListTournamentOrganizer} from "../tournament-group-list-organizer";
import {TournamentHeader} from "../tournament-header";
import {TournamentRoundList} from "../tournament-rounds";
import TeamService from "../../services/TeamService";
import {useHistory} from "react-router-dom";
import AuthenticateService from "../../services/AuthenticateService";

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

export const TournamentOrganizerView = () => {
    const [teams, setTeams] = useState([])
    const history = useHistory();

    const user = AuthenticateService.getCurrentUser();

    if(!user) {
        history.push("/login");
    }
    else if(user.roles[0] !== "ADMIN") {
        if(user.roles[0] === "STUDENT") {
            history.push("/tournament-participant");
        } else {
            history.push("/");
        }
    }

    useEffect(() => {
        TeamService.getTeams().then((res) => {
            setTeams(res.data)
        })
    }, [])

    return(
        <div className={styles.root}>
            <Grid container spacing={5} className={styles.grid}>
                <Grid item xs={12}>
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
                    <GroupListTournamentOrganizer data={teams} roundEnd={roundEnd}/>
                </Grid>
                <Grid item xs={6} className={styles.roundList+" "+styles.secRow+" "+styles.bar}>
                    <TournamentRoundList /*data={roundsData}*//>
                </Grid>
            </Grid>
        </div>
    )
}
