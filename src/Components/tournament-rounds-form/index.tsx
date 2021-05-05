import {useEffect, useState} from "react";
import styles from "../tournament-form/styles.module.css";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";

// @ts-ignore
export const TournamentRoundForm = (props: {id, startDate, endDate, data}) => {
    let initialStartDate = (props.startDate === "") ? getCurrentDate() : props.startDate;
    let initialEndDate = (props.endDate === "") ? getCurrentDate() : props.endDate;
    const [startDate, setStartDate] = useState(initialStartDate)
    const [endDate, setEndDate] = useState(initialEndDate)

    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);

    useEffect(() => {
        setStartDateError(false)
    },[startDate])

    useEffect(() => {
        setEndDateError(false)
    },[endDate])

    const submitRound = (e) => {
        let errorFlag = false;

        if(Date.parse(startDate) < Date.now() || Date.parse(startDate) >= Date.parse(endDate)){
            setStartDateError(true);
            errorFlag = true;
        }

        if(Date.parse(endDate) < Date.now() || Date.parse(startDate) >= Date.parse(endDate)){
            setEndDateError(true);
            errorFlag = true;
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }

        if(props.id === -1){
            props.data.push({id: props.id, startDate: startDate, endDate: endDate})
        }
        else {
            props.data.push({id: props.id+1, startDate: startDate, endDate: endDate})
        }
        //TODO: create or update round (backend)
    }

    let title = (props.startDate==="" && props.endDate==="") ? "New round": "Edit round";
    let button = (props.startDate==="" && props.endDate==="") ? "CREATE": "UPDATE";
    return(
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={'/tournament-organizer'} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>{title}</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
            <TextField error={startDateError} fullWidth defaultValue={startDate} label={startDateError?"Provide a valid start date":"Start date"} type="datetime-local"
                       onChange={(e) => setStartDate(e.target.value)}/>
            <TextField error={endDateError} fullWidth defaultValue={endDate} label={endDateError?"Provide a valid end date":"End date"} type="datetime-local"
                       onChange={(e) => setEndDate(e.target.value)}/>
                <DialogActions className={styles.submitAction}>
                    <Link to={(startDateError || endDateError)?"#":"/tournament-organizer"}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => submitRound(e)}
                            disabled={startDateError || endDateError}
                        >{button}</Button>
                    </Link>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )

    function getCurrentDate(separator='-'){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let time = newDate.getHours();
        let minutes = newDate.getMinutes();
        if( minutes < 10){
            // @ts-ignore
            time = time+":0"+minutes;
        }
        else{
            // @ts-ignore
            time = time+":"+minutes;
        }

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}` : `${date}`}T${time}`
    }
}
