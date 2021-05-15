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
import {GroupListTournament} from "../group-list-tournament";

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
    const [tournaments, setTournaments] = useState([{name: "mleko", notifications: 10}, {name: "jajka", notifications: 7}]);

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
                        <OffsetBadge badgeContent={tournament.notifications} color={"primary"} max={9}>
                            <Typography className={styles.accordionHeading}>{tournament.name?(tournament.name.charAt(0).toUpperCase()+tournament.name.slice(1)):"Default name"}</Typography>
                        </OffsetBadge>
                        <IconButton className={styles.moreIcon} onClickCapture={(e) => {
                            e.stopPropagation()
                            console.log("tell me more")
                        }}>
                            <MoreHorizIcon></MoreHorizIcon>
                        </IconButton>
                    </AccordionSummary>
                    <AccordionDetails >
                            <Grid container>
                                <Grid item xs>
                                    <TournamentProgression></TournamentProgression>
                                </Grid>
                                <Grid item xs={9} className={styles.groupList}>
                                    <GroupListTournament></GroupListTournament>
                                </Grid>
                            </Grid>
                    </AccordionDetails>
                </Accordion>
            })}
        </div>
    )
}
