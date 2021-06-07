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
import AuthenticateService from "../../services/AuthenticateService";
import StudentService from "../../services/StudentService";
import set = Reflect.set;
import RoundService from "../../services/RoundService";
import TeamService from "../../services/TeamService";

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
    const user = AuthenticateService.getCurrentUser().id;

    const {path} = useRouteMatch();
    const [tournaments, setTournaments] = useState<{id: number, name: string, accessMode: string, creator: string,
        githubLink: string, moduleName: string, branchName: string, invitationCode: string}[]>([]);

     useEffect(() => {
         StudentService.getTournamentsForStudent(user).then((res) => {
             setTournaments(res.data)
         })
     }, [])

    return (
        <div>
            {tournaments.map((tournament) => {
                const [rounds, setRounds] = useState<{id: number,tournament: string, number: number, date: string, completedRuns: number,
                    numberOfRuns: number, pathToLogs: string}[]>( [])

                const [teams, setTeams] = useState<{id: number, tournament: string, students: [], name: string, githubLink: string,
                    mainClassName: string, branchName: string, playerName: string, playerStatus: string, lastUpdated: string, message:
                        string, totalPoints: number, invitationCode: string}[]>([{id: -1, tournament: "", students: [], name: "", githubLink: "",
                    mainClassName: "", branchName: "", playerName: "", playerStatus: "", lastUpdated: "", message: "", totalPoints: -1, invitationCode: ""}])

                const nextRound = rounds.filter((val) => Date.parse(val.date) > Date.now()).sort((a, b) =>
                    (Date.parse(a.date) > Date.parse(b.date)) ? -1 : (Date.parse(a.date) < Date.parse(b.date)) ? 1 : 0)[0]

                const timeToRoundEnd =  (Date.parse(nextRound.date) - Date.now())/1000;

                useEffect(() => {
                    TeamService.getTeamsForTournament(tournament.id).then((res) => {
                            setTeams(res.data);
                        },
                        (error) => {
                            AuthenticateService.logout();
                        })
                }, [])

                useEffect(() => {
                    RoundService.getRoundsByTournament(tournament.id).then((res) => {
                        setRounds(res.data)
                    })
                }, [])
                return <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <OffsetBadge
                            badgeContent={tournament.hasOwnProperty("notifications") ? tournament["notifications"] : 0}
                            color={"primary"} max={9}>
                            <Typography
                                className={styles.accordionHeading}>{tournament.name ? (tournament.name.charAt(0).toUpperCase() + tournament.name.slice(1)) : "Default name"}</Typography>
                        </OffsetBadge>
                        <IconButton className={styles.moreIcon} onClickCapture={(e) => {
                            e.stopPropagation()
                        }}>
                            <MoreHorizIcon/>
                        </IconButton>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container>
                            <Grid item xs>
                                <TournamentProgression currentRound={nextRound.number} maxRounds={rounds.length} time={timeToRoundEnd}/>
                            </Grid>
                            <Grid item xs={9} className={styles.groupList}>
                                <GroupListTournament data={[...teams]} roundEnd={nextRound.date}/>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            })}
        </div>
    )
}
