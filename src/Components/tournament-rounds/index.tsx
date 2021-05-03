import {FC} from "react";
import styles from "./styles.module.css";
import {Button, Card, CardContent, Grid} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import moment from "moment/moment";
import {TournamentRoundForm} from "../tournament-rounds-form";
import React from "react";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

const data = [
    {id: 1, startDate: "2021-04-05T00:00:00.00", endDate: "2021-04-18T00:00:00.00"},
    {id: 2, startDate: "2021-04-19T00:00:00.00", endDate: "2021-05-02T00:00:00.00"},
    {id: 3, startDate: "2021-05-03T00:00:00.00", endDate: "2021-05-16T00:00:00.00"},
    {id: 4, startDate: "2021-05-17T00:00:00.00", endDate: "2021-05-21T00:00:00.00"}
]

data.sort((a,b) =>
    (Date.parse(a.startDate)>Date.parse(b.startDate))? -1: (Date.parse(a.startDate)<Date.parse(b.startDate))? 1 : 0)

export const TournamentRoundList: FC = () =>{
    return(
        <div className={styles.root}>
            <Grid container spacing={2} direction={"row"} justify={"center"} alignItems={"center"}>
                <Router>
                <Button style={{width: '100%'}} component={Link} to={'/tournament-rounds/form'}>
                <Grid item xs={12}>
                    <Card>
                            <CardContent className={styles.card}>
                                <div style={{alignItems: 'center'}}>
                                    <AddIcon className={styles.addIcon}/>
                                </div>
                            </CardContent>
                    </Card>
                </Grid>
                </Button>
                    <Route path='/tournament-rounds/form'><TournamentRoundForm id={-1} startDate={""} endDate={""}/></Route>
                </Router>
            {data.map(function (elem, index){
                if(Date.now() >= Date.parse(elem.startDate)){
                    if(Date.now() >= Date.parse(elem.endDate)){
                        return(
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent className={styles.card}>
                                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                                        <Grid item xs={3}  className={styles.alignItems}>
                                            <div className={styles.roundText}>ROUND</div>
                                            <div className={styles.roundText+' '+styles.biggerNum}>{data.length-index}</div>
                                        </Grid>
                                        <Grid item xs={6} className={styles.alignItems}>
                                            <div className={styles.date}>ENDED ON {moment(elem.endDate).format("DD.MM.YYYY")}</div>
                                        </Grid>
                                            <Grid item xs={3} className={styles.alignItems}>
                                                <Button variant={"contained"} color={"primary"}>SEE DETAILS</Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    }
                    else{
                        return(
                            <Grid item xs={12}>
                                <Card>
                                        <CardContent className={styles.card}>
                                            <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                                            <Grid item xs={3} className={styles.alignItems}>
                                                <div className={styles.roundText}>ROUND</div>
                                                <div className={styles.roundText+' '+styles.biggerNum}>{data.length-index}</div>
                                            </Grid>
                                                <Grid item xs={6} className={styles.alignItems}>
                                                    <div className={styles.date}>IN PROGRESS</div>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                </Card>
                            </Grid>
                        )
                    }
                }
                else{
                    return(
                        <Grid item xs={12}>
                        <Router>
                        <Card>
                                <CardContent className={styles.card}>
                                    <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                                    <Grid item xs={3} className={styles.alignItems}>
                                        <div className={styles.roundText}>ROUND</div>
                                        <div className={styles.roundText+' '+styles.biggerNum}>{data.length-index}</div>
                                    </Grid>
                                        <Grid item xs={6} className={styles.alignItems}>
                                            <div className={styles.date}>STARTING ON {moment(elem.startDate).format("DD.MM.YYYY")}</div>
                                        </Grid>
                                        <Grid item xs={3} className={styles.alignItems}>
                                            <Button variant={"contained"} color={"secondary"} component={Link}
                                                    to={'/tournament-rounds/form'}>EDIT</Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                        </Card>
                            <Route path='/tournament-rounds/form'><TournamentRoundForm id={elem.id} startDate={elem.startDate} endDate={elem.endDate}/></Route>
                        </Router>
                    </Grid>)
                }
        })}
            </Grid>
        </div>
    )
}
