import {FC, useState, useEffect} from "react";
import styles from "./styles.module.css"
import {Box, CircularProgress, createStyles, LinearProgress, makeStyles, Paper, Typography, Theme} from "@material-ui/core";
import {green, orange, red, yellow} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) =>
    createStyles({
        secondsProgress: {
            color: red[500],
        },
        minutesProgress: {
            color: orange[500]
        },
        hoursProgress: {
            color: yellow[500]
        },
    })
)
export const TournamentProgression = (props:{time, maxRounds, currentRound}) => {
    const classes = useStyles()

    const [round, setRound] = useState(props.currentRound) //TODO: Zapiąć z gotowym turniejem jak będzie

    const [maxRounds, setMaxRounds] = useState(props.maxRounds) //TODO: Zapiąć z gotowym turniejem jak będzie

    const [time, setTime] = useState(props.time) //TODO: Zapiąć z gotowym turniejem jak będzie

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => (prevTime >= 0 ? prevTime - 1 : 0))
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    const formatTime = (time:number) =>{
        if(time>24*3600){
            return Math.floor(time/(24*3600)) + "d " + Math.round(time%(24*3600)/(3600)) + "h"
        }else if(time>3600){
            return Math.floor(time/3600) + "h " + Math.round(time%3600/(60)) + "min"
        }else if(time>60){
            return Math.floor(time/(60)) + "min " + time%60 + "sec"
        }else if(time>0){
            return time + "sec"
        }else{
            return "Running..."
        }
    }

    return <Box
            padding={"1em"}
            width={"8em"}
            alignItems={"center"}
        >
            <Box
                className={styles.roundProgress}
                paddingBottom={"1em"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
            >

                <Box>
                    <Typography variant={"caption"}>Round progress: <b>{round}/{maxRounds}</b></Typography>
                    <LinearProgress variant={"determinate"} color={"primary"} value={round/maxRounds*100}/>
                </Box>
            </Box>
            <Box position={"relative"} display={"inline-flex"}>
                <Box position={"absolute"}>
                    <CircularProgress className={classes.secondsProgress} variant={time > 0 ? "determinate" : "indeterminate"} size={"8em"} thickness={2}
                                      value={Math.min(Math.max(time/0.6, 0), 100)}/>
                </Box>
                <Box position={"absolute"} visibility={time <= 0? "hidden" : "visible"}>
                    <CircularProgress className={classes.minutesProgress} variant={"determinate"} size={"8em"} thickness={2}
                                      value={Math.min(Math.max((time-60)/36, 0), 100)}/>
                </Box>
                <Box visibility={time <= 0? "hidden" : "visible"}>
                    <CircularProgress className={classes.hoursProgress} variant={"determinate"} size={"8em"} thickness={2}
                                      value={Math.min(Math.max((time-3600)/(24 * 36), 0), 100)}/>
                </Box>

                <Box
                    position={"absolute"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                >
                    {formatTime(time)}
                </Box>
            </Box>

        </Box>
}
