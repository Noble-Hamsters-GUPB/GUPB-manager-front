import {FC} from "react";
import styles from "./styles.module.css"
import {Box, CircularProgress, LinearProgress, Paper, Typography} from "@material-ui/core";

export const TournamentProgression: FC = (props) => {


    return <Paper>
        <Box
            padding={"1em"}
            width={"8em"}
        >
            this is tournament progression
            <Box
                className={styles.roundProgress}
                paddingBottom={"1em"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
            >

                <Box>
                    <Typography variant={"caption"}>Round progress: 3/4</Typography>
                    <LinearProgress variant={"determinate"} color={"primary"} value={75}/>
                </Box>
            </Box>
            <Box position={"relative"} display={"inline-flex"}>
                <CircularProgress variant={"determinate"} size={"8em"} thickness={2} value={100}/>
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
                    {"12h 43min"}
                </Box>
            </Box>

        </Box>
    </Paper>
}
