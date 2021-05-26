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
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {LibraryRequestForm} from "../library-request-dialog";
import SockJsClient from 'react-stomp';
import {urls} from "../../services/BaseUrl";

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
            width: "10em",
            color: "white"
        },
        buttonGroupContainer:{
            textAlign: "right"
        },
        libraryName:{
            overflow: "hidden",
            marginRight: "0.3em",
            flex: "0 1 40%"
        }
    })
)

const updateStatus = ()=>{

}

export const LibraryListParticipant: FC = (props) =>{
    const classes = useStyles()
    const SOCKET_URL = urls.getSocketUrl();

    const [libList, setLibList] = useState([
        {id: "", packageInfo: "", status: ""}
    ])

     /*const [libList, setLibList] = useState([
         {id: 1, packageInfo: "dataclasses-json v0.5.2", status: "valid"},
         {id: 2, packageInfo: "pygame v1.0", status: "pending"},
         {id: 3, packageInfo: "sortedcontainers v5.0", status: "declined"},
     ])*/

    function setLibraries(libraries){
        setLibList(libraries)
    }


    useEffect(() => {
        RequirementService.getRequirements().then((res) => {
            setLibList(res.data)
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
            setLibList(libList.map((lib) => {
                if (lib.id == library.id) {
                    lib.status = "PENDING"
                }
                return lib;
            }))
        })
    }

    const requestAdd = (library) => {
        //    TODO: implement this

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
          topics={['/topic/requirements']}
          onMessage={msg => onMessageReceived(msg)}
          debug={false}
          />
        <div>
        <div className={styles.header} style={{float: "left"}}>Libraries</div>
            <Router>
            <div>
            <Button style={{marginLeft: "4vw", marginTop: "1.5em"}} component={Link} to={'/library-request'} variant={"contained"} color={"secondary"}>Request new library</Button>
            </div>
                <Route path={'/library-request'}><LibraryRequestForm libraries={libList} addLibrary={setLibraries}/></Route>
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
