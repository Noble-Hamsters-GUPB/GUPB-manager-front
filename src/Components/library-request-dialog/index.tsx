import {FC, useEffect, useState} from "react";
import styles from "../tournament-form/styles.module.css";
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton, Radio,
    RadioGroup
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import RequirementService from "../../services/RequirementService";

export const LibraryRequestForm = (props:{libraries, addLibrary}) => {
    const [name, setName] = useState("")

    const [nameError, setNameError] = useState(false)

    useEffect(() => {
        setNameError(false)
    },[name])

    const submitLibrary= (e) => {
        let errorFlag = false;

        if(name === ""){
            setNameError(true);
            errorFlag = true;
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }

        let newLibrary = {packageInfo: name, status: "PENDING", teamId: 1, tournamentId: 1}

        //props.addLibrary([...props.libraries, newLibrary])
        //TODO: create or update round (backend)
        RequirementService.createRequirement(newLibrary)
    }

    return(
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to='/tournament-participant' className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Request Library</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField error={nameError} fullWidth label={nameError?"Library cannot be empty":"Library"}
                           onChange={(e) => setName(e.target.value)}/>
                <DialogActions className={styles.submitAction}>
                    <Link Link to={(nameError)?"#":"/tournament-participant"}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => submitLibrary(e)}
                            disabled={nameError}
                        >REQUEST</Button>
                    </Link>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
