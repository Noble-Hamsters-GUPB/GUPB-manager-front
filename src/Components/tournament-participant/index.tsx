import {Dispatch, FC, useEffect, useState} from "react";
import styles from './styles.module.css';
import {Grid} from "@material-ui/core";
import {TournamentProgression} from "../tournament-progression";
import {BotStatus} from "../bot-status";
import {TournamentHeader} from "../tournament-header";
import {GroupListTournamentParticipant} from "../tournament-group-list-participant";
import {LibraryListParticipant} from "../library-list-participant";
import TeamService from "../../services/TeamService";

// const groupData = [
//     {id: 1, groupName: "Supergrupa", points: 456},
//     {id: 2, groupName: "Fajnagrupa",  points: 459},
//     {id: 3, groupName: "Leniuchy",  points: 0},
//     {id: 4, groupName: "Lemury", points: 441},
// ]

const roundEnd = "2021-05-16T00:00:00.00";
const timeToRoundEnd =  (Date.parse(roundEnd) - Date.now())/1000;

export const TournamentParticipantView = () => {
    const [teams, setTeams] = useState([])

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
                <Grid item xs={2} className={styles.firstRow}/>
                <Grid item xs={6} className={styles.botStatus+" "+styles.bar}>
                    <BotStatus/>
                </Grid>
                <Grid item xs={6} className={styles.libraries+" "+styles.secRow+" "+styles.bar}>
                    <LibraryListParticipant/>
                </Grid>
                <Grid item xs={6} className={styles.roundList+" "+styles.secRow}>
                    <GroupListTournamentParticipant data={teams} groupId={1}/>
                </Grid>
            </Grid>
        </div>
    )
}
