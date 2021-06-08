import {FC, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import StudentService from "../../services/StudentService";
import AuthenticateService from "../../services/AuthenticateService";
import TeamService from "../../services/TeamService";
import RoundService from "../../services/RoundService";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Badge, createStyles,
    Grid,
    IconButton, makeStyles, Theme,
    Typography,
    withStyles
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {TournamentProgression} from "../tournament-progression";
import {GroupListTournament} from "../tournament-list-group-list";
import {inspect} from "util";

const useStyles = makeStyles({
    moreIcon: {
        "margin-left": "auto",
    },
    accordionHeading: {
        flexBasis: '100%',
        flexShrink: 0,
        display: "flex",
        alignItems: "center"
    },
    groupList: {
        height: "20em",
    }
});

const OffsetBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            transform: "translateX(70%) scale(0.7)",
            right: -1,
            top: 8
        },
    }),
)(Badge);

export const TournamentListElement: FC<{tournament: {id: number, name: string, accessMode: string, creator: string,
    githubLink: string, moduleName: string, branchName: string, invitationCode: string}}> = (props) => {

    const styles = useStyles();
    const history = useHistory();

    const [rounds, setRounds] = useState<{id: number,tournament: string, number: number, date: string, completedRuns: number,
        numberOfRuns: number, pathToLogs: string}[]>([])

    const [teams, setTeams] = useState<{id: number, tournament: string, students: [], name: string, githubLink: string,
            mainClassName: string, branchName: string, playerName: string, playerStatus: string, lastUpdated: string, message:
                string, totalPoints: number, invitationCode: string}[]>([])

    useEffect(() => {
        TeamService.getTeamsForTournament(props.tournament.id).then((res) => {
            setTeams(res.data);
        }).catch((error) => {
            alert(error)
            AuthenticateService.logout()
        })
        RoundService.getRoundsByTournament(props.tournament.id).then((res) => {
            setRounds(res.data)
        }).catch(error => {
            alert(error)
            AuthenticateService.logout()
        })
    }, [])

    const nextRound = rounds.filter((val) => Date.parse(val.date) > Date.now()).sort((a, b) =>
        (Date.parse(a.date) > Date.parse(b.date)) ? -1 : (Date.parse(a.date) < Date.parse(b.date)) ? 1 : 0)[0]
    let timeToRoundEnd;
    if(nextRound !== undefined) {
        console.log("hello")
        timeToRoundEnd = (Date.parse(nextRound.date) - Date.now()) / 1000; //todo: what to do if nextRound is undefined?
    }

    return (<Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <OffsetBadge
                badgeContent={props.tournament.hasOwnProperty("notifications") ? props.tournament["notifications"] : 0}
                color={"primary"} max={9}>
                <Typography
                    className={styles.accordionHeading}>{props.tournament.name ? (props.tournament.name.charAt(0).toUpperCase() + props.tournament.name.slice(1)) : "Default name"}</Typography>
            </OffsetBadge>
            <IconButton className={styles.moreIcon} onClickCapture={(e) => {
                history.push(`/tournament/${props.tournament.id}`)
                history.go(0)
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
    </Accordion>)
}