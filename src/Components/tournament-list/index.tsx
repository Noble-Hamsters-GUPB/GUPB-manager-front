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
import {TournamentProgression} from "../tournament-progression";
import {GroupListTournament} from "../tournament-list-group-list";
import AuthenticateService from "../../services/AuthenticateService";
import StudentService from "../../services/StudentService";
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
                //console.log("test")
                setTournaments(res.data)
            }
            ).catch(() => AuthenticateService.logout())
    }, [])


    const wrapTournaments = () => {
        return ([...tournaments].map((tournament) => {
            let rounds:{id: number,tournament: string, number: number, date: string, completedRuns: number,
                numberOfRuns: number, pathToLogs: string}[] = [];

            let teams:{id: number, tournament: string, students: [], name: string, githubLink: string,
                mainClassName: string, branchName: string, playerName: string, playerStatus: string, lastUpdated: string, message:
                    string, totalPoints: number, invitationCode: string}[] = [];

            TeamService.getTeamsForTournament(tournament.id).then((res) => {
                return res.data;
            }).catch(error => alert(error)) //todo: problem with async function

            RoundService.getRoundsByTournament(tournament.id).then((res) => {
                rounds = res.data
            }).catch(error => alert(error)) //todo: problem with async function

            const nextRound = rounds.filter((val) => Date.parse(val.date) > Date.now()).sort((a, b) =>
                (Date.parse(a.date) > Date.parse(b.date)) ? -1 : (Date.parse(a.date) < Date.parse(b.date)) ? 1 : 0)[0]
            let timeToRoundEnd;
            if(nextRound !== undefined) {
                console.log("hello")
                timeToRoundEnd = (Date.parse(nextRound.date) - Date.now()) / 1000; //todo: what to do if nextRound is undefined?
            }

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
                            {nextRound !== undefined ? <TournamentProgression currentRound={nextRound.number} maxRounds={rounds.length} time={timeToRoundEnd}/> : null} {/*todo: what to do if nextRound is undefined?*/}
                        </Grid>
                        <Grid item xs={9} className={styles.groupList}>
                            {nextRound !== undefined ? <GroupListTournament data={[...teams]} roundEnd={nextRound.date}/> : null} {/*todo: what to do if nextRound is undefined?*/}
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        }))
    }

    return (
        <div>
            {wrapTournaments()}
        </div>
    )
}
