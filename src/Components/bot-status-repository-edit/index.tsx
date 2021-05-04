import {FC, useEffect, useState} from "react";
import TeamService from "../../services/TeamService";
import validator from 'validator'
import styles from "../team-form/styles.module.css";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";

export const EditRepository = (props:{id}) => {
    const [githubLink, setRepoName] = useState("")

    const [repoError, setRepoError] = useState(false)

    useEffect(() => {
        setRepoError(false)
    },[githubLink])

    const submitRepoChange= (e) => {
        let errorFlag = false;

        if(githubLink === "" || !validator.isURL(githubLink)){
            setRepoError(true);
            errorFlag = true;
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }

        //TODO: send updated git url to backend
    }
    return(
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={'/bot-status'} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Edit Repository</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField error={repoError} fullWidth label={repoError?"Link to repository must be a URL":"Link to repository"}
                           onChange={(e) => setRepoName(e.target.value)}/>
                <DialogActions className={styles.submitAction}>
                    <Link to={(repoError)?"#":"/bot-status"}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => submitRepoChange(e)}
                            disabled={repoError}
                        >EDIT</Button>
                    </Link>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
