import {FC, useState} from "react"
import {
    Box,
    Button,
    ButtonGroup, CircularProgress, createStyles,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText, makeStyles,
    Switch,
    Typography
} from "@material-ui/core";
import {yellow, red, blue, green, orange} from "@material-ui/core/colors";
import styles from "./styles.module.css"

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

export const LibraryListOrganizer: FC = (props) =>{
    const classes = useStyles()

    const [libList, setLibList] = useState([
        {name: "dataclasses-json v0.5.2", status: "valid"},
        {name: "pygame v1.0", status: "pending"},
        {name: "sortedcontainers v5.0", status: "declined"},
    ])

    const updateStatus = (library, status)=>{
        setLibList(libList.map((lib) => {
            if(lib == library){
                lib.status = status
            }
            return lib;
        }))
        //    TODO: backend communication
    }

    const removeLibrary = (library) => {
        setLibList(libList.filter(lib => lib!==library))
    //    TODO: backend communication
    }

    const validateLibrary = (library) => {
    //    TODO: implement this

    }

    const getButtons = (status, library) => {
        switch (status) {
            case "valid": return <ButtonGroup className={classes.actionButtonGroup}><Button onClick={() => removeLibrary(library)} className={classes.actionButton} variant="contained">Remove</Button></ButtonGroup>
            case "validating": return <ButtonGroup className={classes.actionButtonGroup}>/<Button  onClick={() => updateStatus(library, "invalid")} className={classes.actionButton} variant="contained">Stop</Button></ButtonGroup>
            case "invalid": return <ButtonGroup className={classes.actionButtonGroup}><Button onClick={() => validateLibrary(library)} className={classes.actionButton} variant="contained">Retry</Button><Button onClick={() => updateStatus(library, "declined")} className={classes.actionButton} variant="contained">Decline</Button></ButtonGroup>
            case "pending": return <ButtonGroup className={classes.actionButtonGroup}><Button  onClick={() => updateStatus(library, "valid")} className={classes.actionButton} variant="contained">Validate</Button><Button onClick={() => updateStatus(library, "declined")} className={classes.actionButton} variant="contained">Decline</Button></ButtonGroup>
            case "declined": return <ButtonGroup className={classes.actionButtonGroup}><Button onClick={() => removeLibrary(library)} className={classes.actionButton} variant="contained">Remove</Button></ButtonGroup>
            default: return
        }
    }

    const getColor = (status => {
        switch (status) {
            case "valid": return "#caffbf"
            case "validating": return "#fdffb6"
            case "invalid": return "#ffd6a5"
            case "pending": return "#a0c4ff"
            case "declined": return "#ffadad"
            default: return
        }
    })

    return <div className={styles.root}>
        <div className={styles.header}>Libraries</div>
        <List>
            {libList.map(lib => {
                return <ListItem className={classes.listItem}>
                    <ListItemText className={classes.libraryName}>{lib.name}</ListItemText>
                    <ListItemText><Box className={styles.statusBadge} style={{backgroundColor: getColor(lib.status)}}>{lib.status.toUpperCase()}{lib.status=="validating"?<CircularProgress thickness={8} size={"0.9em"} className={classes.validatingProgress}/>:""}</Box></ListItemText>
                    <ListItemText className={classes.buttonGroupContainer}>{getButtons(lib.status, lib)}</ListItemText>

                </ListItem>
            })}
        </List>
    </div>
}