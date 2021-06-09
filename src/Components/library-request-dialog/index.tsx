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
import {Link, useLocation, useHistory} from "react-router-dom";
import RequirementService from "../../services/RequirementService";
import AuthenticateService from "../../services/AuthenticateService";

export const LibraryRequestForm = (props:{libraries, addLibrary, teamId, tournamentId}) => {
    const [name, setName] = useState("")

    const [nameError, setNameError] = useState("")

    const history = useHistory()

    const location = useLocation()

    useEffect(() => {
        setNameError("")
    },[name])

    const submitLibrary = (e) => {
        let errorFlag = false;

        if(name === "") {
            setNameError("Library cannot be empty");
            errorFlag = true;
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }

        let newLibrary = {packageInfo: name, status: "PENDING", teamId: props.teamId}

        e.preventDefault()

        RequirementService.checkRequirement(name, props.tournamentId).then(res => {
            if(res.data) {
                setNameError("Library doesn't exist or already in tournament")
                errorFlag = true
            } else {
                RequirementService.createRequirement(newLibrary)
                    .catch(error => {
                    alert(error)
                    AuthenticateService.logout()
                })
                history.push(location.pathname.split('/library-request')[0])
                return
            }
        }).catch(error => {
            alert(error)
            AuthenticateService.logout()
        })
    }

    return(
        <Dialog open={true} className={styles.formDialog} maxWidth={"xs"} fullWidth={true}>
            <IconButton component={Link} to={location.pathname.split('/library-request')[0]} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Request Library</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField error={nameError!==""} fullWidth label={nameError===""?"Library":nameError}
                           onChange={(e) => setName(e.target.value)}/>
                <DialogActions className={styles.submitAction}>
                    <Link Link to={(nameError)?"#":location.pathname.split('/library-request')[0]}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => submitLibrary(e)}
                            disabled={nameError!==""}
                        >REQUEST</Button>
                    </Link>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
