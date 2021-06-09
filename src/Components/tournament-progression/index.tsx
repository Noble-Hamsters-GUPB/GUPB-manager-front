import React, {FC, useState, useEffect} from "react";
import styles from "./styles.module.css"
import {Box, CircularProgress, createStyles, LinearProgress, makeStyles, Paper, Typography, Theme} from "@material-ui/core";
import {green, orange, red, yellow} from "@material-ui/core/colors";
import {urls} from "../../services/BaseUrl";

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
export const TournamentProgression: FC<{time: number, maxRounds: number, finishedRounds: number}>
    = (props) => {

    const classes = useStyles()

    const [round, setRound] = useState(props.finishedRounds);

    const [maxRounds, setMaxRounds] = useState(props.maxRounds);

    const [time, setTime] = useState(props.time);

    useEffect(() => {
        const timer = setInterval(() => {
            if(time===-5){
                return;
            }
            setTime((prevTime) => (prevTime >= 0 ? prevTime - 1 : 0))
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(()=>{
        setRound(props.finishedRounds);
    }, [props.finishedRounds]);

    useEffect(()=>{
        setMaxRounds(props.maxRounds);
    }, [props.maxRounds]);

    useEffect(()=>{
        setTime(props.time);
    }, [props.time]);



    const formatTime = (time:number) =>{
        if(time>24*3600){
            return Math.floor(time/(24*3600)) + "d " + Math.round(time%(24*3600)/(3600)) + "h"
        }else if(time>3600){
            return Math.floor(time/3600) + "h " + Math.round(time%3600/(60)) + "min"
        }else if(time>60){
            return Math.floor(time/(60)) + "min " + time%60 + "sec"
        }else if(time>0){
            return time + "sec"
        }else if(time<-1){
            return "No rounds left"
        }else{
            return "Running..."
        }
    }

    return <Box
            padding={"1em"}
            width={"12em"}
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
            <Box position={"relative"} display={"inline-flex"} alignItems={"center"} left={"1em"}>
                <Box position={"absolute"}>
                    <CircularProgress className={classes.secondsProgress} variant={time > 0 || time ===-5? "determinate" : "indeterminate"} size={"8em"} thickness={2}
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
