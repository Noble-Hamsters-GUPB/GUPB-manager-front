import {useEffect, useState} from "react";
import styles from "../tournament-form/styles.module.css";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {Link, useLocation} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import RoundService from "../../services/RoundService";


// @ts-ignore
export const TournamentRoundForm: FC<{date: string, numberOfRuns: number, tournamentId: number,
    data: {id: number,tournament: string, number: number,date: string, completedRuns: number,
        numberOfRuns: number, pathToLogs: string}[], setData: any}> = (props) => {
    let initialDate = (props.date === "") ? getCurrentDate() : props.date;
    let initialNumberOfIterations = props.numberOfRuns;

    const [date, setDate] = useState(initialDate)
    const [numberOfRuns, setNumberOfIterations] = useState(initialNumberOfIterations)

    const [dateError, setDateError] = useState(false);
    const [numberOfIterationsError, setNumberOfIterationsError] = useState(false);

    const location = useLocation()

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


        if(!isPositiveInteger(numberOfRuns)){
            setNumberOfIterationsError(true);
            errorFlag = true;
        }

        if(errorFlag){
            e.preventDefault();
            return;
        }

        let newRound

        if(props.date === ""){
            newRound = {date: date, numberOfRuns: numberOfRuns, tournamentId: props.tournamentId}
            RoundService.createRound(newRound)
        }
        else {
            newRound = {date: date, numberOfRuns: numberOfRuns, tournamentId: props.tournamentId}
        }
    }

    const isPositiveInteger = (n:string) =>{
        return !isNaN(parseFloat(n)) && (parseFloat(n) > 0) && ((parseFloat(n) % 1) == 0);
    }

    let title = (props.date==="") ? "New round": "Edit round";
    let button = (props.date==="") ? "CREATE": "UPDATE";
    return(
        <Dialog open={true} className={styles.formDialog}>
            <IconButton component={Link} to={location.pathname.split("/tournament-rounds/form")[0]} className={styles.closeButton}><CloseIcon/></IconButton>
            <DialogTitle className={styles.formTitle}>{title}</DialogTitle>
            <DialogContent className={styles.formDialogContent}>
            <TextField error={dateError} fullWidth defaultValue={date} label={dateError?"Start date should be after current date":"Start date"} type="datetime-local"
                       onChange={(e) => setDate(e.target.value)}/>

                       <TextField error={numberOfIterationsError} fullWidth defaultValue={numberOfRuns} label={numberOfIterationsError?"Number should be a positive integer"
                           :"Number of runs"} type={"number"} onChange={(e) => setNumberOfIterations(e.target.value)}/>
                <DialogActions className={styles.submitAction}>
                    <Link to={(dateError)?"#":location.pathname.split("/tournament-rounds/form")[0]}  style={{ textDecoration: 'none' }}>
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
