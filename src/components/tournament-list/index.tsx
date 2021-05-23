import TournamentService from '../../services/TournamentService';
import {FC, useEffect, useState} from "react";
import styles from "./styles.module.css"
// @ts-ignore
import {Route, useRouteMatch} from 'react-router-dom';
import {TournamentForm} from "../tournament-form"
import {
    Accordion,
    AccordionSummary,
    makeStyles,
    Typography,
    createStyles,
    Icon,
    IconButton,
    AccordionDetails,
    Badge, withStyles, Theme, Box, Grid
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Translate} from "@material-ui/icons";
import {TournamentProgression} from "../tournament-progression";
import {BotStatus} from "../bot-status";
import {GroupListTournament} from "../tournament-list-group-list";
import {GroupListTournamentParticipant} from "../tournament-group-list-participant"

const OffsetBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            transform: "translateX(70%) scale(0.7)",
            right: -1,
            top: 8
        },
    }),
)(Badge);

const useStyles = makeStyles({
    moreIcon: {
        "margin-left": "auto",
    },
    accordionHeading: {
        flexBasis: '33.33%',
        flexShrink: 0,
        display: "flex",
        alignItems: "center"
    },
    groupList: {
        height: "20em",
    }
});

export const TournamentList: FC = (props) => {
    const styles = useStyles();

    const {path} = useRouteMatch();
    const [tournaments, setTournaments] = useState([{name: "mleko"}, {name: "jajka"}]);

    // useEffect(() => {
    //     console.log("useEffect ran")
    //     TournamentService.getTournaments().then(res => console.log(res))
    // }, tournaments)

    return (
        <div>
            <Route path={`${path}/create_tournament`}>
                <TournamentForm/>
            </Route>
            {tournaments.map((tournament)=>{
                return <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <OffsetBadge badgeContent={tournament.hasOwnProperty("notifications")?tournament["notifications"]:0} color={"primary"} max={9}>
                            <Typography className={styles.accordionHeading}>{tournament.name?(tournament.name.charAt(0).toUpperCase()+tournament.name.slice(1)):"Default name"}</Typography>
                        </OffsetBadge>
                        <IconButton className={styles.moreIcon} onClickCapture={(e) => {
                            e.stopPropagation()
                        }}>
                            <MoreHorizIcon></MoreHorizIcon>
                        </IconButton>
                    </AccordionSummary>
                    <AccordionDetails >
                            <Grid container>
                                <Grid item xs>
                                    <TournamentProgression currentRound={1} maxRounds={21} time={1}/>
                                </Grid>
                                <Grid item xs={9} className={styles.groupList}>
                                    <GroupListTournament data={[
                                        {id: 12, name: "jajka", totalPoints: 100},
                                        {id: 1, name: "ser", totalPoints: 100},
                                        {id: 3, name: "mleko", totalPoints: 100},
                                        {id: 4, name: "kiełbaska", totalPoints: 100},
                                        {id: 4, name: "parówa", totalPoints: 100},
                                        {id: 4, name: "ziemniaczki", totalPoints: 100}
                                    ]} roundEnd={1}/>
                                </Grid>
                            </Grid>
                    </AccordionDetails>
                </Accordion>
            })}
        </div>
    )
}
