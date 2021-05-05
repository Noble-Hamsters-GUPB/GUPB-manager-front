import React, {FC} from "react";
import styles from "./styles.module.css"
import {Grid, IconButton} from "@material-ui/core";
import {Edit, Sync} from "@material-ui/icons";
import moment from "moment/moment";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {EditRepository} from "../bot-status-repository-edit";

const groupId = 1
const repository = "https://github.com/Noble-Hamsters-GUPB/GUPB-manager-front"
const lastUpdate = "2021-04-29T00:00:00.00"
const currentRoundStart = "2021-05-02T00:00:00.00"

export const BotStatus: FC = () =>{
    let is_updated = (lastUpdate === null) ? styles.noBot : (Date.parse(lastUpdate) >= Date.parse(currentRoundStart))
        ? styles.updated : styles.notUpdated;
    return(
        <Router>
        <div className={styles.root}>
            <Grid container spacing={2} direction={"row"} justify={"center"} alignItems={"center"}>
                <Grid item xs={12}>
                    <div className={styles.header}>BOT STATUS</div>
                </Grid>
                <Grid item xs={8}>
                    <div className={styles.repositoryName}>{getRepositoryName(repository)}</div>
                </Grid>
                <Grid item xs={2}><IconButton><Sync className={styles.icon}/></IconButton></Grid>
                <Grid item xs={2}><IconButton component={Link} to={'/bot-status/edit-repository'}>
                    <Edit className={styles.icon}/>
                </IconButton></Grid>
                <Grid item xs={12} className={styles.status+" "+is_updated}><div>
                    LAST UPDATED ON {moment(lastUpdate).format("DD.MM.YYYY")}
                </div></Grid>
                {/*<Grid item xs={12} className={styles.status+" "+styles.footer}><div>
                    {daysLeft(currentRoundEnd)} LEFT TO THE END OF ROUND
                </div></Grid>*/}
            </Grid>
        </div>
            <Route path='/bot-status/edit-repository'><EditRepository id={groupId}/></Route>
        </Router>
    )
}

function getRepositoryName(fullName: string): string{
    return fullName.replace("https://github.com/", "");
}

function daysLeft(currentRoundEnd: string): string {
    let start = Date.now();
    let end = Date.parse(currentRoundEnd);

    let diffTime = end - start;
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    diffTime -= diffDays * (1000 * 60 * 60 * 24);
    let diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    diffTime -= diffHours * (1000 * 60 * 60);
    let diffMinutes = Math.floor(diffTime / (1000 * 60));

    return `${diffDays > 0 ? `${diffDays} DAYS ` : ``}${diffHours > 0 ? `${diffHours} HOURS ` : ``}${diffMinutes} MINUTES`;
}
