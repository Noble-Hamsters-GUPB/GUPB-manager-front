import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import {Grid, IconButton} from "@material-ui/core";
import {Edit, Sync} from "@material-ui/icons";
import moment from "moment/moment";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {EditRepository} from "../bot-status-repository-edit";
import TournamentService from "../../services/TournamentService";
import TeamService from "../../services/TeamService";
import StudentService from "../../services/StudentService";
import AuthenticateService from "../../services/AuthenticateService";


export const BotStatus: FC<{tournamentId: number}> = (props) =>{
    const [team, setTeam] = useState<{id: number, githubLink: string, lastUpdated: string}>
    ({id: -1, githubLink: "", lastUpdated: ""})

    useEffect(() => {
        TeamService.getTeamByTournamentAndStudent(props.tournamentId, AuthenticateService.getCurrentUser().id)
            .then((res) => {
                console.log(res.data)
            setTeam(res.data)
        })
    }, [])

    return(
        <div className={styles.root}>
            <Grid container spacing={2} direction={"row"} justify={"center"} alignItems={"center"}>
                <Grid item xs={12}>
                    <div className={styles.header}>BOT STATUS</div>
                </Grid>
                <Grid item xs={8}>
                    <div className={styles.repositoryName}>{getRepositoryName(team.githubLink)}</div>
                </Grid>
                <Grid item xs={2}><IconButton onClick={(e) => TeamService.updateBot(team.id)}>
                    <Sync className={styles.icon}/></IconButton></Grid>
                <Grid item xs={12} className={styles.status}><div>
                    LAST UPDATED ON {moment(team.lastUpdated).format("DD.MM.YYYY")}
                </div></Grid>
            </Grid>
        </div>
    )
}

function getRepositoryName(fullName: string): string{
    return fullName.replace("https://github.com/", "");
}
