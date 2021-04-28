import {FC} from "react";
import styles from "../tournament-form/styles.module.css";
import {Dialog, DialogTitle, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from "react-router-dom";

// @ts-ignore
export const TournamentRoundForm: FC = ({elem = {startDate: "", endDate: ""}}) => {
    let title = (elem.startDate==="" && elem.endDate==="") ? "New round": "Edit round";
    return(
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={'/tournament-rounds'} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>{title}</DialogTitle>
        </Dialog>
    )
}
