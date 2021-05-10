import {FC} from "react";
import styles from "./styles.module.css";
import {Badge, Button, Grid} from "@material-ui/core";
import {Notifications} from "@material-ui/icons";

export const TournamentHeader: FC = () => {
    return(
        <div className={styles.root}>
            <Grid container spacing={5}>
                <Grid item xs={5}>
                    <div>
                    <div className={styles.name}>Superturniej</div>
                        <div>
                        <Button style={{marginTop: "1.5em"}} color={"secondary"} variant={"contained"}>Get logs</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
