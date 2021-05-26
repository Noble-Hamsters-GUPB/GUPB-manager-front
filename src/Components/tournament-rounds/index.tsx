import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css";
import {Button, Grid} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import moment from "moment/moment";
import {TournamentRoundForm} from "../tournament-rounds-form";
import React from "react";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import RoundService from "../../services/RoundService";

const roundData = [{number: 1, date: "2021-06-07", numberOfRuns: 100}]

export const TournamentRoundList: FC<{isOrganizer: boolean}> = ({isOrganizer}) =>{
    const [rounds, setRounds] = useState<{number: number, date: string, numberOfRuns: number}[]>( [])
    //const [rounds, setRounds] = useState(props.data);

    useEffect(() => {
        RoundService.getRounds().then((res) => {
            setRounds(res.data)
        })
        setRounds([...roundData])
    }, [rounds])

    function sortData(){
        if(rounds) {
            rounds.sort((a, b) =>
                (Date.parse(a.date) > Date.parse(b.date)) ? -1 : (Date.parse(a.date) < Date.parse(b.date)) ? 1 : 0)
        }
    }

    let handleSetRounds = (data) => {
        setRounds(data)
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
                {isOrganizer?
                    <Router>
                        <Button style={{width: '100%'}} component={Link} to={'/tournament-rounds/form'}>
                            <Grid item xs={12}>
                                <div className={styles.card}>
                                    <div style={{alignItems: 'center'}} className={styles.grid}>
                                        <AddIcon className={styles.addIcon}/>
                                    </div>
                                </div>
                            </Grid>
                        </Button>
                        <Route path='/tournament-rounds-organizer/form'><TournamentRoundForm
                            number={Math.max(...rounds.map(o => o.number), 0)} date={""} data={rounds}
                            setData={handleSetRounds} numberOfRuns={0} url={window.location.pathname}/></Route>
                    </Router>
                :null}
            {rounds && rounds.map(function (elem, index){
                if(Date.now() >= Date.parse(elem.date)){
                    if(Date.now() >= Date.parse(elem.date) + 10){ //todo: end date in  database
                        return(
                            <Grid item xs={12}>
                                <div className={styles.card}>
                                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"} className={styles.grid}>
                                        <Grid item xs={3}  className={styles.alignItems}>
                                            <div className={styles.roundText}>ROUND</div>
                                            <div className={styles.roundText+' '+styles.biggerNum}>{rounds.length-index}</div>
                                        </Grid>
                                        <Grid item xs={6} className={styles.alignItems}>
                                            <div className={styles.date}>Ended on {moment(elem.date).format("DD.MM.YYYY")}</div> {/*todo: end date in  database*/}
                                        </Grid>
                                            <Grid item xs={3} className={styles.alignItems}>
                                                <Button variant={"contained"} color={"primary"}>LOGS</Button>
                                            </Grid>
                                        </Grid>
                                </div>
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
                                            <div className={styles.date}>Starting on {moment(elem.date).format("DD.MM.YYYY")}</div>
                                        </Grid>
                                        {/*{isOrganizer ?*/}
                                            {/*<Grid item xs={3} className={styles.alignItems}>*/}
                                            {/*    <Button variant={"contained"} color={"secondary"} component={Link}*/}
                                        {/*            to={'/tournament-rounds/form'}>EDIT</Button>*/}
                                        {/*</Grid>*/}
                                        {/*:null}*/}
                                    </Grid>
                            </div>
                            <Route path='/tournament-rounds/form'><TournamentRoundForm number={elem.number} date={elem.date} data={rounds} numberOfRuns={elem.numberOfRuns} setData={handleSetRounds} url={window.location.pathname}/></Route> {/*todo: end date in  database*/}
                        </Router>
                    </Grid>)
                }
        })}
            </Grid>
        </div>
    )
}
