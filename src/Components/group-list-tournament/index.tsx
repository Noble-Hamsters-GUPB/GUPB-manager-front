import {FC} from "react";
import styles from "./styles.module.css";
import {Box, Card, CardContent, Grid, makeStyles, Typography} from "@material-ui/core";

const data = [
    {groupName: "Supergrupa", botStatus: "2021-04-11", points: 456},
    {groupName: "Fajnagrupa", botStatus: "2021-04-18", points: 459},
    {groupName: "Leniuchy", botStatus: null, points: 0},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
    {groupName: "Lemury", botStatus: "2021-04-20", points: 441},
]

data.sort(((a, b) => (a.points>b.points)? -1 : ((b.points > a.points)? 1 : 0)))

const currentRoundStart = "2021-04-17";

export const GroupListTournament: FC<{}> = (props) => {
    return(
        <div className={styles.root}>
            <Grid container spacing={2} direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent className={styles.card+" "+styles.header}>
                            <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                                <Grid item xs={1}>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className={styles.typography}>TEAM</div>
                                </Grid>
                                <Grid item xs={5}>
                                    <div className={styles.typography}>LAST UPDATE</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className={styles.typography}>POINTS</div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                {data.map(function(elem, index) {
                    let img_class = (index === 0) ? styles.logo : styles.noLogo;
                    let is_updated = (elem.botStatus === null) ? styles.noBot : (Date.parse(elem.botStatus) >= Date.parse(currentRoundStart))
                        ? styles.updated : styles.notUpdated;
                    return(
                    <Grid item xs={12}>
                        <Card>
                            <CardContent className={styles.card}>
                                <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                                    <Grid item xs={1}>
                                        <img src="/gold_crown.png" className={img_class} alt={"Crown"}/>
                                    </Grid>
                                    <Grid item xs={4} className = {styles.name}>
                                        <div className={styles.typography}>{elem.groupName}</div>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <div className={is_updated+' '+styles.typography}>{elem.botStatus}</div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div className={styles.typography}>{elem.points}</div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    )})}
            </Grid>
        </div>
    )
}
