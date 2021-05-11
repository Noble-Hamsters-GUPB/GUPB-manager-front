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

export const LibraryRequestForm = (props:{libraries, addLibrary}) => {
    const [name, setName] = useState("")
    const [version, setVersion] = useState("")
    const [open, setOpen] = useState(true)

    const [nameError, setNameError] = useState(false)
    const [versionError, setVersionError] = useState(false)

    useEffect(() => {
        setNameError(false)
    },[name])

    useEffect(() => {
        setVersionError(false)
    },[version])

    const submitLibrary= (e) => {
        let errorFlag = false;

        if(name === ""){
            setNameError(true);
            errorFlag = true;
        }


        if(version===""){
            setVersionError(true);
            errorFlag = true;
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }

        let newLibrary = {id: -1, packageInfo: name+"=="+version, status: "pending"}

        props.addLibrary([...props.libraries, newLibrary])
        //TODO: create or update round (backend)
    }

    return(
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to='/tournament-participant' className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>Request Library</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
                <TextField error={nameError} fullWidth label={nameError?"Library name cannot be empty":"Library name"}
                           onChange={(e) => setName(e.target.value)}/>
                <TextField error={versionError} fullWidth  label={versionError?"Version cannot be empty":"Version"}
                           onChange={(e) => setVersion(e.target.value)}/>
                <DialogActions className={styles.submitAction}>
                    <Link Link to={(versionError || nameError)?"#":"/tournament-participant"}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => submitLibrary(e)}
                            disabled={versionError || nameError}
                        >REQUEST</Button>
                    </Link>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
