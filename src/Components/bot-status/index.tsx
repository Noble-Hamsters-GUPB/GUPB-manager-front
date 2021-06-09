import React, {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
import {
    Button,
    Card,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Typography
} from "@material-ui/core";
import {Edit, Sync} from "@material-ui/icons";
import moment from "moment/moment";
import {BrowserRouter as Router, Link, Route, useLocation, useHistory} from 'react-router-dom';
import {EditRepository} from "../bot-status-repository-edit";
import TournamentService from "../../services/TournamentService";
import TeamService from "../../services/TeamService";
import StudentService from "../../services/StudentService";
import AuthenticateService from "../../services/AuthenticateService";
import SockJsClient from 'react-stomp';
import {urls} from "../../services/BaseUrl";


export const BotStatus: FC<{ tournamentId: number }> = (props) => {
    const SOCKET_URL = urls.getSocketUrl();
    const [team, setTeam] = useState<{ id: number, githubLink: string, lastUpdated: string, playerStatus: string, message: string }>
    ({id: -1, githubLink: "", lastUpdated: "", playerStatus: "", message: ""})

    useEffect(() => {
        TeamService.getTeamByTournamentAndStudent(props.tournamentId, AuthenticateService.getCurrentUser().id)
            .then((res) => {
                setTeam(res.data)
            })
    }, [])

    const onMessageReceived = (msg) => {
        console.log(msg)
        setTeam(msg)
    }

    const location = useLocation()

    return (
        <div className={styles.root}>
            <SockJsClient
                url={SOCKET_URL}
                topics={[`/topic/bot-update/${team.id}`]}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />
            <Grid container spacing={2} direction={"row"} justify={"center"} alignItems={"center"}>
                <Grid item xs={12}>
                    <div className={styles.header}>BOT STATUS</div>
                </Grid>
                <Grid item xs={8}>
                    <div className={styles.repositoryName}>{getRepositoryName(team.githubLink)}</div>
                </Grid>
                <Grid item xs={2}><IconButton onClick={(e) => TeamService.updateBot(team.id)}>
                    <Sync className={styles.icon}/></IconButton></Grid>
                <Grid item xs={12} className={styles.status}>
                    <div>
                        LAST UPDATED ON {moment(team.lastUpdated).format("DD.MM.YYYY HH:mm")}
                    </div>
                    <div>
                        STATUS: {team.playerStatus}
                    </div>
                </Grid>
                <Router>
                    <Grid item xs={12} className={styles.status}>
                        <Button variant="contained" color="primary" component={Link}
                                to={location.pathname + "/bot-message"}>MESSAGE</Button>
                    </Grid>
                    <Route path={location.pathname + "/bot-message"}><Message message={team.message}/></Route>
                </Router>


            </Grid>
        </div>
    )
}

function getRepositoryName(fullName: string): string {
    return fullName.replace("https://github.com/", "");
}

const Message: FC<{ message: string }> = (props) => {

    const location = useLocation()
    const history = useHistory()

    function backToPrev() {
        history.push(location.pathname.split("/bot-message")[0])
    }

    return (<Dialog open={true} className={styles.formDialog} maxWidth={"lg"}>
            <DialogTitle className={styles.formTitle}>Bot message</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                {props.message.split("\n").map((item, idx) => {
                    return (
                        <span key={idx}>
                            {item}
                            <br/>
                        </span>
                    )
                })}
            </DialogContent>
            <DialogActions className={styles.submitAction}>
                <Router>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={backToPrev}
                    >OK</Button>
                </Router>
            </DialogActions>
        </Dialog>
    )
}
