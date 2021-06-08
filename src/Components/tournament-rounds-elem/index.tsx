import React, {FC, useEffect, useState} from "react";
import SockJsClient from 'react-stomp';
import {Button, Grid} from "@material-ui/core";
import styles from "../tournament-rounds-elem/styles.module.css";
import moment from "moment/moment";
import {TournamentRoundForm} from "../tournament-rounds-form";
import {BrowserRouter as Router, Link, Route, useLocation} from 'react-router-dom';
import LogService from "../../services/LogService";
import {urls} from "../../services/BaseUrl";

export const TournamentRoundListElem: FC<{round: {id: number,tournament: string, number: number,date: string, completedRuns: number,
        numberOfRuns: number, pathToLogs: string}, rounds: {id: number,tournament: string, number: number,date: string, completedRuns: number,
        numberOfRuns: number, pathToLogs: string}[], index: number, tournamentId: number, reloadData: any}> = (props ) =>{
    const SOCKET_URL = urls.getSocketUrl();
    const location = useLocation()

    const [finishedRuns, setFinishedRuns] = useState(props.round.completedRuns !== undefined ? props.round.completedRuns : 0)

    useEffect(() => {
        setFinishedRuns(props.round.completedRuns)
    }, [props.rounds])

    const onMessageReceived = (msg) => {
        setFinishedRuns(msg)
    }

    const wrapRound = () => {
        if(Date.now() >= Date.parse(props.round.date)){
            if(Date.now() >= Date.parse(props.round.date) + 10){ //todo: end date in  database
                return(
                        <Router>
                            <div className={styles.card}>

                                <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"} className={styles.grid}>
                                    <Grid item xs={3}  className={styles.alignItems}>
                                        <div className={styles.roundText}>ROUND</div>
                                        <div className={styles.roundText+' '+styles.biggerNum}>{props.rounds.length-props.index}</div>
                                    </Grid>
                                    <Grid item xs={6} className={styles.alignItems}>
                                        <div className={styles.date}>DATE: {moment(props.round.date).format("DD.MM.YYYY")}</div>
                                        <div className={styles.runs}>Completed runs: {finishedRuns}/{props.round.numberOfRuns}</div>
                                    </Grid>
                                    <Grid item xs={3} className={styles.alignItems}>
                                        <Button variant={"contained"} color={"primary"} component={Link} disabled={finishedRuns !== props.round.numberOfRuns}
                                                to={location.pathname+"/round/logs/"+(props.rounds.length-props.index)}>LOGS</Button>
                                    </Grid>
                                </Grid>
                            </div>
                            <Route path={location.pathname+"/round/logs/"+(props.rounds.length-props.index)}><RoundLogs id={1}/></Route>
                        </Router>
                )
            }
            else{
                return(
                        <div className={styles.card}>
                            <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                                <Grid item xs={3} className={styles.alignItems}>
                                    <div className={styles.roundText}>ROUND</div>
                                    <div className={styles.roundText+' '+styles.biggerNum}>{props.rounds.length-props.index}</div>
                                </Grid>
                                <Grid item xs={6} className={styles.alignItems}>
                                    <div className={styles.date}>In progress</div>
                                    <div className={styles.runs}>Completed runs: {finishedRuns}/{props.round.numberOfRuns}</div>
                                </Grid>
                            </Grid>
                        </div>
                )
            }
        }
        else{
            return(
                    <Router>
                        <div className={styles.card}>
                            <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                                <Grid item xs={3} className={styles.alignItems}>
                                    <div className={styles.roundText}>ROUND</div>
                                    <div className={styles.roundText+' '+styles.biggerNum}>{props.rounds.length-props.index}</div>
                                </Grid>
                                <Grid item xs={6} className={styles.alignItems}>
                                    <div className={styles.date}>Date: {moment(props.round.date).format("DD.MM.YYYY")}</div>
                                    <div className={styles.runs}>Completed runs: {finishedRuns}/{props.round.numberOfRuns}</div>
                                </Grid>
                                {/*{userRole=="ADMIN"?*/}
                                {/*<Grid item xs={3} className={styles.alignItems}>*/}
                                {/*    <Button variant={"contained"} color={"secondary"} component={Link}*/}
                                {/*            to={location.pathname+'/tournament-rounds/form'}>EDIT</Button>*/}
                                {/*</Grid>*/}
                                {/*:null}*/}
                            </Grid>
                        </div>
                        <Route path={location.pathname+"/tournament-rounds/form"}><TournamentRoundForm date={""} numberOfRuns={0} tournamentId={props.tournamentId} data={props.rounds} reloadData={props.reloadData}/></Route>
                    </Router>
                )
        }
    }

    return(
        <Grid item xs={12}>
            <SockJsClient
                url={SOCKET_URL}
                topics={[`/topic/rounds/${props.round.id}`]}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />
            {wrapRound()}
        </Grid>
    )
}

const RoundLogs: FC<{id: number}> = (props: {id}) => {
    const [data, setData] = useState("")

    const getData = () => {
        LogService.getLogs(props.id).then((res)=> setData(res.data))
    }

    useEffect(() =>
            getData()
        ,[])

    return(
        <p>{data}</p>
    )
}
