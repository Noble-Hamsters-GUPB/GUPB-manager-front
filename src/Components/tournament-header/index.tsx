import {FC} from "react";
import styles from "./styles.module.css";
import {Badge, Button, Grid} from "@material-ui/core";
import {Notifications} from "@material-ui/icons";

export const TournamentHeader: FC = () => {
    return(
        <div className={styles.root}>
            <Grid container spacing={5}>
                <Grid item xs={1}>
                    <div style={{margin: "1.5em"}}>
                    <Badge badgeContent={4} color="secondary">
                        <Notifications className={styles.bell}/>
                    </Badge>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className={styles.name}>Superturniej</div>
                </Grid>
                <Grid item xs={2}>
                    <Button style={{marginTop: "1.5em"}} color={"secondary"} variant={"contained"}>Get logs</Button>
                </Grid>
            </Grid>
        </div>
    )
}
