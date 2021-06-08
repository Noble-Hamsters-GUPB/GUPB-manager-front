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
import {TournamentListElement} from "../tournament-list-element";



export const TournamentList: FC = (props) => {
    const user = AuthenticateService.getCurrentUser().id;
    const userRole = AuthenticateService.getCurrentUser().roles[0];
    const {path} = useRouteMatch();
    const [tournaments, setTournaments] = useState<{id: number, name: string, accessMode: string, creator: string,
        githubLink: string, moduleName: string, branchName: string, invitationCode: string}[]>([]);


    useEffect(() => {
        if(userRole === "ADMIN") {
            TournamentService.getTournaments().then((res) => {
                    setTournaments(res.data)
                }
            ).catch((error) => {
                alert(error)
                AuthenticateService.logout()
            })
        }
        else if(userRole === "STUDENT") {
            StudentService.getTournamentsForStudent(user).then((res) => {
                    setTournaments(res.data)
                }
            ).catch((error) => {
                alert(error)
                AuthenticateService.logout()
            })
        }
    }, [])


    const wrapTournaments = () => {
        return ([...tournaments].map((tournament) => {
            return <TournamentListElement tournament={tournament}/>
        }))
    }

    return (
        <div>
            {wrapTournaments()}
        </div>
    )
}
