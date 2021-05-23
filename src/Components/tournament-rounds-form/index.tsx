import {useEffect, useState} from "react";
import styles from "../tournament-form/styles.module.css";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import RoundService from "../../services/RoundService";

// @ts-ignore
export const TournamentRoundForm = (props: {number, date, numberOfRuns, data, setData}) => {
    let initialDate = (props.date === "") ? getCurrentDate() : props.date;
    let initialNumberOfIterations = props.numberOfRuns;

    const [date, setDate] = useState(initialDate)
    const [numberOfRuns, setNumberOfIterations] = useState(initialNumberOfIterations)

    const [dateError, setDateError] = useState(false);
    const [numberOfIterationsError, setNumberOfIterationsError] = useState(false);

    useEffect(() => {
        setDateError(false)
    },[date])

    useEffect(() => {
        setNumberOfIterationsError(false)
    },[numberOfRuns])

    const submitRound = (e) => {
        let errorFlag = false;

        if(Date.parse(date) < Date.now()){
            setDateError(true);
            errorFlag = true;
        }


        if(numberOfRuns<=0){
            setNumberOfIterationsError(true);
            errorFlag = true;
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }

        let newRound

        if(props.number === -1){
            newRound = {date: date, number: props.number, numberOfRuns: numberOfRuns, teamId: 1}
        }
        else {
            newRound = {date: date, number: props.number+1, numberOfRuns: numberOfRuns, teamId: 1}
        }

        props.setData([...props.data, newRound])
        RoundService.createRound(newRound)
        //TODO: create or update round (backend)
    }

    let title = (props.date==="") ? "New round": "Edit round";
    let button = (props.date==="") ? "CREATE": "UPDATE";
    return(
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={'/tournament-organizer'} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>{title}</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
            <TextField error={dateError} fullWidth defaultValue={date} label={dateError?"Start date should be after current date":"Start date"} type="datetime-local"
                       onChange={(e) => setDate(e.target.value)}/>

                       <TextField error={numberOfIterationsError} fullWidth defaultValue={numberOfRuns} label={numberOfIterationsError?"Number should be higher than 0"
                           :"Number of runs"} type={"number"} onChange={(e) => setNumberOfIterations(e.target.value)}/>
                <DialogActions className={styles.submitAction}>
                    <Link to={(dateError)?"#":"/tournament-organizer"}  style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => submitRound(e)}
                            disabled={dateError}
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
