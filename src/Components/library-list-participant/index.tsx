import React, {FC, useContext, useEffect, useState} from "react"
import {
    Box,
    Button,
    ButtonGroup, CircularProgress, createStyles,
    List,
    ListItem,
    ListItemText, makeStyles,
} from "@material-ui/core";
import styles from "./styles.module.css"
import RequirementService from "../../services/RequirementService";
import {BrowserRouter as Router, Link, Route, useLocation} from 'react-router-dom';
import {LibraryRequestForm} from "../library-request-dialog";
import SockJsClient from 'react-stomp';
import {urls} from "../../services/BaseUrl";
import TeamService from "../../services/TeamService";
import AuthenticateService from "../../services/AuthenticateService";

const useStyles = makeStyles((theme) =>
    createStyles({
        listItem:{
            justifyContent: "space-between",
        },
        validatingProgress:{
            marginLeft: "0.5em",
            color: "#081c15"
        },
        actionButton:{
            fontSize: "x-small",
            width: "100%"
        },
        actionButtonGroup:{
            width: "9em",
            color: "white"
        },
        buttonGroupContainer:{
            textAlign: "right"
        },
        libraryName:{
            overflow: "hidden",
            marginRight: "0.3em",
            flex: "0 1 40%",
            fontSize: "0.5em",
        }
    })
)

const updateStatus = ()=>{

}

export const LibraryListParticipant: FC<{tournamentId: number}> = (props) =>{
    const classes = useStyles()
    const SOCKET_URL = urls.getSocketUrl();
    const [teamId, setTeamId] = useState(-1);

    const [libList, setLibList] = useState([
        {id: "", packageInfo: "", status: ""}
    ])

    const location = useLocation()

     /*const [libList, setLibList] = useState([
         {id: 1, packageInfo: "dataclasses-json v0.5.2", status: "valid"},
         {id: 2, packageInfo: "pygame v1.0", status: "pending"},
         {id: 3, packageInfo: "sortedcontainers v5.0", status: "declined"},
     ])*/

    function setLibraries(libraries){
        setLibList(libraries)
    }


    useEffect(() => {
        RequirementService.getRequirementsForTournament(props.tournamentId).then((res) => {
            setLibList(res.data)
        })
        TeamService.getTeamByTournamentAndStudent(props.tournamentId, AuthenticateService.getCurrentUser().id).then((res) => {
                setTeamId(res.data.id)
            }
        ).catch((error) => {
            alert(error)
            AuthenticateService.logout()
        })
    }, [])

    const onMessageReceived = (msg) => {
        setLibList(msg)
    }

    const requestRemoval = (library) => {
        setLibList(libList.filter(lib => lib!==library))
        //    TODO: backend communication
    }

    const requestAgain = (library) => {
        let libraryCopy = {...library}
        libraryCopy.status = "PENDING"

        RequirementService.updateRequirement(libraryCopy, libraryCopy.id).then(res => {
            // setLibList(libList.map((lib) => {
            //     if (lib.id == library.id) {
            //         lib.status = "PENDING"
            //     }
            //     return lib;
            // }))
        }).catch(error => alert(error))
    }

    const requestAdd = (library) => {
        //    TODO: implement this (lol)

    }

    const getButtons = (status, library) => {
        switch (status.toLowerCase()) {
            case "valid": return <ButtonGroup className={classes.actionButtonGroup}><Button onClick={() => requestAgain(library)} className={classes.actionButton} variant="contained">Request removal</Button></ButtonGroup>
            case "declined": return <ButtonGroup className={classes.actionButtonGroup}><Button onClick={() => requestAgain(library)} className={classes.actionButton} variant="contained">Request again</Button></ButtonGroup>
            default: return
        }
    }

    const getColor = (status => {
        switch (status.toLowerCase()) {
            case "valid": return "#caffbf"
            case "validating": return "#fdffb6"
            case "invalid": return "#ffd6a5"
            case "pending": return "#a0c4ff"
            case "declined": return "#ffadad"
            default: return
        }
    })

    return <div className={styles.root}>
        <SockJsClient
          url={SOCKET_URL}
          topics={[`/topic/requirements/${props.tournamentId}`]}
          onMessage={msg => onMessageReceived(msg)}
          debug={false}
          />
        <div>
        <div className={styles.header} style={{float: "left"}}>Libraries</div>
            <Router>
            <div>
            <Button style={{marginLeft: "4vw", marginTop: "1.5em"}} component={Link} to={location.pathname + '/library-request'} variant={"contained"} color={"secondary"}>Request new library</Button>
            </div>
                <Route path={location.pathname + '/library-request'}><LibraryRequestForm libraries={libList} addLibrary={setLibraries} teamId={teamId} tournamentId={props.tournamentId}/></Route>
            </Router>
        </div>
        <List>
            {libList.map(lib => {
                return <ListItem className={classes.listItem}>
                    <ListItemText className={classes.libraryName}>{lib.packageInfo}</ListItemText>
                    <ListItemText><Box className={styles.statusBadge} style={{backgroundColor: getColor(lib.status)}}>{lib.status.toUpperCase()}{lib.status=="validating"?<CircularProgress thickness={8} size={"0.9em"} className={classes.validatingProgress}/>:""}</Box></ListItemText>
                    <ListItemText className={classes.buttonGroupContainer}>{getButtons(lib.status, lib)}</ListItemText>

                </ListItem>
            })}
        </List>
    </div>
}
