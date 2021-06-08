import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css";
import {Button, Grid} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import moment from "moment/moment";
import {TournamentRoundForm} from "../tournament-rounds-form";
import React from "react";
import {BrowserRouter as Router, Link, Route, useLocation} from 'react-router-dom';
import AuthenticateService from "../../services/AuthenticateService";
import LogService from "../../services/LogService";
import RoundService from "../../services/RoundService";


export const TournamentRoundList: FC<{rounds: {id: number,tournament: string, number: number,date: string, completedRuns: number,
        numberOfRuns: number, pathToLogs: string}[], tournamentId: number}> = (props ) =>{

    const [rounds, setRounds] = useState<{id: number,tournament: string, number: number,date: string, completedRuns: number,
        numberOfRuns: number, pathToLogs: string}[]>([])

    useEffect(() => {
        setRounds(props.rounds)
    }, [props.rounds])

    const userRole = AuthenticateService.getCurrentUser().roles[0];
    const location = useLocation()

    function sortData(){
        if(rounds) {
            rounds.sort((a, b) =>
                (Date.parse(a.date) > Date.parse(b.date)) ? -1 : (Date.parse(a.date) < Date.parse(b.date)) ? 1 : 0)
        }
    }

    let handleSetRounds = (data) => {
        setRounds([...rounds, data])
        sortData()
    }

    sortData()

    return(
        <div className={styles.root}>
            <Grid container spacing={2} direction={"row"} justify={"center"} alignItems={"center"}>
                <Grid item xs={12}>
                    <div className={styles.darkCard}>
                        <div style={{alignItems: 'center'}} className={styles.title}>
                            Rounds
                        </div>
                    </div>
                </Grid>
                {userRole=="ADMIN"?
                    <Router>
                        <Button style={{width: '100%'}} component={Link} to={location.pathname+'/tournament-rounds/form'}>
                            <Grid item xs={12}>
                                <div className={styles.card}>
                                    <div style={{alignItems: 'center'}} className={styles.grid}>
                                        <AddIcon className={styles.addIcon}/>
                                    </div>
                                </div>
                            </Grid>
                        </Button>
                        <Route path={location.pathname+'/tournament-rounds/form'}><TournamentRoundForm
                            date={""} data={rounds}
                            setData={handleSetRounds} numberOfRuns={0} tournamentId={props.tournamentId}/></Route>
                    </Router>
                :null}
            {rounds && rounds.map(function (elem, index){
                if(Date.now() >= Date.parse(elem.date)){
                    if(Date.now() >= Date.parse(elem.date) + 10){ //todo: end date in  database
                        return(
                            <Grid item xs={12}>
                                <Router>
                                <div className={styles.card}>
                                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"} className={styles.grid}>
                                        <Grid item xs={3}  className={styles.alignItems}>
                                            <div className={styles.roundText}>ROUND</div>
                                            <div className={styles.roundText+' '+styles.biggerNum}>{rounds.length-index}</div>
                                        </Grid>
                                        <Grid item xs={6} className={styles.alignItems}>
                                            <div className={styles.date}>DATE: {moment(elem.date).format("DD.MM.YYYY")}</div>
                                        </Grid>
                                            <Grid item xs={3} className={styles.alignItems}>
                                                <Button variant={"contained"} color={"primary"} component={Link}
                                                        to={location.pathname+"/round/logs/"+(rounds.length-index)}>LOGS</Button>
                                            </Grid>
                                        </Grid>
                                </div>
                                    <Route path={location.pathname+"/round/logs/"+(rounds.length-index)}><RoundLogs id={1}/></Route>
                                </Router>
                            </Grid>
                        )
                    }
                    else{
                        return(
                            <Grid item xs={12}>
                                <div className={styles.card}>
                                            <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                                            <Grid item xs={3} className={styles.alignItems}>
                                                <div className={styles.roundText}>ROUND</div>
                                                <div className={styles.roundText+' '+styles.biggerNum}>{rounds.length-index}</div>
                                            </Grid>
                                                <Grid item xs={6} className={styles.alignItems}>
                                                    <div className={styles.date}>In progress</div>
                                                </Grid>
                                            </Grid>
                                </div>
                            </Grid>
                        )
                    }
                }
                else{
                    return(
                        <Grid item xs={12}>
                        <Router>
                            <div className={styles.card}>
                                    <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                                    <Grid item xs={3} className={styles.alignItems}>
                                        <div className={styles.roundText}>ROUND</div>
                                        <div className={styles.roundText+' '+styles.biggerNum}>{rounds.length-index}</div>
                                    </Grid>
                                        <Grid item xs={6} className={styles.alignItems}>
                                            <div className={styles.date}>DATE: {moment(elem.date).format("DD.MM.YYYY")}</div>
                                        </Grid>
                                        {/*{userRole=="ADMIN"?*/}
                                            {/*<Grid item xs={3} className={styles.alignItems}>*/}
                                            {/*    <Button variant={"contained"} color={"secondary"} component={Link}*/}
                                        {/*            to={location.pathname+'/tournament-rounds/form'}>EDIT</Button>*/}
                                        {/*</Grid>*/}
                                        {/*:null}*/}
                                    </Grid>
                            </div>
                            <Route path={location.pathname+"/tournament-rounds/form"}><TournamentRoundForm date={""} numberOfRuns={0} tournamentId={props.tournamentId} data={rounds} setData={handleSetRounds}/></Route>
                        </Router>
                    </Grid>)
                }
        })}
            </Grid>
        </div>
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
