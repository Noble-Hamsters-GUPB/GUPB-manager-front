import {FC} from "react";
import styles from "./styles.module.css";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";

const data = [
    {groupName: "Supergrupa", botStatus: "12.04.2021", points: 456},
    {groupName: "Fajnagrupa", botStatus: "18.04.2021", points: 459},
    {groupName: "Leniuchy", botStatus: null, points: 0},
    {groupName: "Lemury", botStatus: "20.04.2021", points: 441},
]

data.sort(((a, b) => (a.points>b.points)? -1 : ((b.points > a.points)? 1 : 0)))

const currentRoundStart = new Date("17.04.2021")

export const GroupListTournament: FC = (props) => {
    return(
        <div className={styles.root}>
            <Grid container spacing={2} direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                {data.map(elem => (
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography className={styles.typography}>{elem.groupName}</Typography>
                                <Typography className={styles.typography}>Last update: {elem.botStatus}</Typography>
                                <Typography className={styles.typography}>Points: {elem.points}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
