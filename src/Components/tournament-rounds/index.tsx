import {FC, useState} from "react";
import styles from "./styles.module.css";
import {Button, Card, CardContent, Grid} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import moment from "moment/moment";
import {TournamentRoundForm} from "../tournament-rounds-form";
import React from "react";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export const TournamentRoundList = (props:{data}) =>{
    const [rounds, setRounds] = useState(props.data);

    function sortData(){
        if(rounds) {
            rounds.sort((a, b) =>
                (Date.parse(a.startDate) > Date.parse(b.startDate)) ? -1 : (Date.parse(a.startDate) < Date.parse(b.startDate)) ? 1 : 0)
        }
    }

    let handleSetRounds = (data) => {
        setRounds(data)
    }

    sortData()

    return(
        <div className={styles.root}>
            <Grid container spacing={2} direction={"row"} justify={"center"} alignItems={"center"}>
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
                    <Route path='/tournament-rounds/form'><TournamentRoundForm number={-1} date={""} data={rounds} setData={handleSetRounds} numberOfRuns={0}/></Route>
                </Router>
            {rounds && rounds.map(function (elem, index){
                if(Date.now() >= Date.parse(elem.startDate)){
                    if(Date.now() >= Date.parse(elem.endDate)){
                        return(
                            <Grid item xs={12}>
                                <div className={styles.card}>
                                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"} className={styles.grid}>
                                        <Grid item xs={3}  className={styles.alignItems}>
                                            <div className={styles.roundText}>ROUND</div>
                                            <div className={styles.roundText+' '+styles.biggerNum}>{props.data.length-index}</div>
                                        </Grid>
                                        <Grid item xs={6} className={styles.alignItems}>
                                            <div className={styles.date}>Ended on {moment(elem.endDate).format("DD.MM.YYYY")}</div>
                                        </Grid>
                                            <Grid item xs={3} className={styles.alignItems}>
                                                <Button variant={"contained"} color={"primary"}>SEE DETAILS</Button>
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
                                        {/*<Grid item xs={3} className={styles.alignItems}>*/}
                                        {/*    <Button variant={"contained"} color={"secondary"} component={Link}*/}
                                        {/*            to={'/tournament-rounds/form'}>EDIT</Button>*/}
                                        {/*</Grid>*/}
                                    </Grid>
                            </div>
                            <Route path='/tournament-rounds/form'><TournamentRoundForm number={elem.id} date={elem.endDate} data={rounds} numberOfRuns={elem.numberOfIterations} setData={handleSetRounds}/></Route>
                        </Router>
                    </Grid>)
                }
        })}
            </Grid>
        </div>
    )
}
