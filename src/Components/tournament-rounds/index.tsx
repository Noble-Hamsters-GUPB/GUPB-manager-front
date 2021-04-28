import {FC} from "react";
import styles from "./styles.module.css";
import {Button, Card, CardContent, Grid} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom";

const data = [
    {startDate: "2021-04-05", endDate: "2021-04-18"},
    {startDate: "2021-04-19", endDate: "2021-05-02"},
    {startDate: "2021-05-03", endDate: "2021-05-16"}
]

data.sort((a,b) =>
    (Date.parse(a.startDate)>Date.parse(b.startDate))? -1: (Date.parse(a.startDate)<Date.parse(b.startDate))? 1 : 0)

export const TournamentRoundList: FC = () =>{
    return(
        <div className={styles.root}>
            <Grid container spacing={2} direction={"row"} justify={"center"} alignItems={"center"}>
                <Button style={{width: '100%'}} component={Link} to={'/tournament-rounds/add'}>
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
                                            <div className={styles.date}>ENDED ON {elem.endDate}</div>
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
                            <Card>
                                    <CardContent className={styles.card}>
                                        <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                                        <Grid item xs={3} className={styles.alignItems}>
                                            <div className={styles.roundText}>ROUND</div>
                                            <div className={styles.roundText+' '+styles.biggerNum}>{data.length-index}</div>
                                        </Grid>
                                            <Grid item xs={6} className={styles.alignItems}>
                                                <div className={styles.date}>STARTING ON {elem.startDate}</div>
                                            </Grid>
                                            <Grid item xs={3} className={styles.alignItems}>
                                                <Button variant={"contained"} color={"secondary"}>EDIT</Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                            </Card>
                        </Grid>
                    )
                }
        })}
            </Grid>
        </div>
    )
}
