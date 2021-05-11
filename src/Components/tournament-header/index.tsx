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
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
