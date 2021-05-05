import styles from "./styles.module.css";
import {Grid} from "@material-ui/core";


export const GroupListTournamentOrganizer =  (props: {data, roundEnd}) => {
    props.data.sort(((a, b) => (a.points>b.points)? -1 : ((b.points > a.points)? 1 : 0)))
    return(
        <div className={styles.root}>
            <Grid container spacing={2} direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                <Grid item xs={12}>
                    <div className={styles.card+" "+styles.header}>
                            <Grid container direction={"row"} justify={"flex-start"} alignItems={"flex-start"}>
                                <Grid item xs={1}>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className={styles.typography}>Team</div>
                                </Grid>
                                <Grid item xs={5}>
                                    <div className={styles.typography}>Last update</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className={styles.typography}>Points</div>
                                </Grid>
                            </Grid>
                    </div>
                </Grid>
                {props.data.map(function(elem, index) {
                    let img_class = (index === 0) ? styles.logo : styles.noLogo;
                    let is_updated = (elem.botStatus === null) ? styles.noBot : (Date.parse(elem.botStatus) >= Date.parse(props.roundEnd))
                        ? styles.updated : styles.notUpdated;
                    return(
                    <Grid item xs={12}>
                        <div className={styles.card}>
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
                        </div>
                    </Grid>
                    )})}
            </Grid>
        </div>
    )
}
