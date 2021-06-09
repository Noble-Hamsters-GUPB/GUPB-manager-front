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

export const LibraryListOrganizer: FC<{tournamentId: number}> = ({tournamentId}) =>{
    const classes = useStyles()
    const SOCKET_URL = urls.getSocketUrl();

    const [libList, setLibList] = useState([
        {id: "", packageInfo: "", status: ""}
    ])


    useEffect(() => {
        RequirementService.getRequirementsForTournament(tournamentId).then((res) => {
            setLibList(res.data)
        })
    }, [])

    const onMessageReceived = (msg) => {
        setLibList(msg)
    }

    const updateStatus = (library, status) => {
        let libraryCopy = {...library}
        libraryCopy.status = status.toUpperCase()
        RequirementService.updateRequirement(libraryCopy, libraryCopy.id).then(res => {
            // setLibList(libList.map((lib) => {
            //         if(lib.id == library.id) {
            //             console.log("halo")
            //             lib.status = status.toUpperCase()
            //         }
            //         return lib;
            //     }))
        }).catch(error => alert(error)) //todo: handle error
        // setLibList(libList.map((lib) => {
        //     if(lib == library) {
        //         lib.status = status.toUpperCase()
        //         RequirementService.updateRequirement(lib, lib.id)
        //     }
        //     return lib;
        // }))
        //    DONE: backend communication
    }

    const removeLibrary = (library) => {
        RequirementService.deleteRequirement(library.id).then(res => {
            setLibList(libList.filter(lib => lib!==library))
        })
    //    DONE: backend communication
    }

    // const validateLibrary = (library) => {
    // //    TODO: implement this
    //
    // }

    const getButtons = (status, library) => {
        switch (status.toLowerCase()) {
            case "valid": return <ButtonGroup className={classes.actionButtonGroup}><Button onClick={() => removeLibrary(library)} className={classes.actionButton} variant="contained">Remove</Button></ButtonGroup>
            case "validating": return <ButtonGroup className={classes.actionButtonGroup}>/<Button  onClick={() => updateStatus(library, "invalid")} className={classes.actionButton} variant="contained">Stop</Button></ButtonGroup>
            case "invalid": return <ButtonGroup className={classes.actionButtonGroup}><Button onClick={() => updateStatus(library, "pending")} className={classes.actionButton} variant="contained">Retry</Button><Button onClick={() => updateStatus(library, "declined")} className={classes.actionButton} variant="contained">Decline</Button></ButtonGroup>
            case "pending": return <ButtonGroup className={classes.actionButtonGroup}><Button  onClick={() => updateStatus(library, "valid")} className={classes.actionButton} variant="contained">Validate</Button><Button onClick={() => updateStatus(library, "declined")} className={classes.actionButton} variant="contained">Decline</Button></ButtonGroup>
            case "declined": return <ButtonGroup className={classes.actionButtonGroup}><Button onClick={() => removeLibrary(library)} className={classes.actionButton} variant="contained">Remove</Button></ButtonGroup>
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
            topics={[`/topic/requirements/${tournamentId}`]}
            onMessage={msg => onMessageReceived(msg)}
            debug={false}/>
        <div className={styles.header}>Libraries</div>
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
