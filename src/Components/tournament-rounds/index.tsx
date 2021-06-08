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
import {TournamentRoundListElem} from "../tournament-rounds-elem";


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

    const reloadData = async (round) => {
        setRounds([...rounds, round])
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
                            reloadData={reloadData} numberOfRuns={0} tournamentId={props.tournamentId}/></Route>
                    </Router>
                :null}
            {rounds.map((elem, index) => {
                return <TournamentRoundListElem round={elem} index={index} reloadData={reloadData} rounds={rounds} tournamentId={props.tournamentId}/>
        })}
            </Grid>
        </div>
    )
}


