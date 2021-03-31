import {FC, useState} from "react";
import styles from "./styles.module.css"
import TextField from '@material-ui/core/TextField'
import {
    ButtonGroup,
    FormControlLabel,
    Paper,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
    Button, IconButton, Dialog, DialogContent, DialogTitle, DialogActions
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

export const TournamentForm: FC = (props) => {

    const [open, setOpen] = useState(true);

    return (
        <Dialog open={open} className={styles.formDialog}>
            <IconButton className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Create Tournament</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField fullWidth label={"Tournament name"}/>
                <TextField fullWidth defaultValue={"2021-01-01T12:00"} label={"Start time"} type="datetime-local"/>
                <FormControl className={styles.form} component={"fieldset"}>
                    <FormLabel component="legend">Access mode</FormLabel>
                    <RadioGroup className={styles.formRadios} row aria-label="Access" defaultValue="Open">
                        <FormControlLabel value="Open" control={<Radio/>} label="Open"/>
                        <FormControlLabel value="Restricted" control={<Radio/>} label="Restricted"/>
                        <FormControlLabel value="Invite only" control={<Radio/>} label="Invite only"/>
                    </RadioGroup>
                </FormControl>
                <DialogActions className={styles.submitAction} ><Button variant="contained" color="secondary">CREATE</Button></DialogActions>
            </DialogContent>
        </Dialog>
    )

}
