import React, {FC, useEffect, useState} from "react";
import AuthenticateService from "../../services/AuthenticateService";
import {Dialog, DialogContent, DialogTitle, Grid, IconButton} from "@material-ui/core";
import styles from "../account-details/styles.module.css";
import CloseIcon from "@material-ui/icons/Close";
import {Link, useLocation} from "react-router-dom";
import {AccountCircle} from "@material-ui/icons";
import AdminService from "../../services/AdminService";
import StudentService from "../../services/StudentService";

export const AccountDetails: FC =  () => {
    const userRole = AuthenticateService.getCurrentUser().roles[0];
    const location = useLocation()

    const [user, setUser] = useState<{id: number, firstName: string, lastName: string}>
    ({id: -1, firstName: "", lastName: ""})

    const [index, setIndex] = useState<string>("")

    useEffect(() => {
        if(userRole === "ADMIN"){
            AdminService.getAdmin(AuthenticateService.getCurrentUser().id).then((res) => {
                setUser(res.data)
            })
        }
        else if(userRole === "STUDENT"){
            StudentService.getStudent(AuthenticateService.getCurrentUser().id).then((res) => {
                setUser(res.data)
                setIndex(res.data.indexNumber)
            })
        }
    }, [])

    return(
    <Dialog open={true}>
        <IconButton component={Link} to={location.pathname.split("/account")[0]} className={styles.closeButton}><CloseIcon/></IconButton>
        <DialogTitle className={styles.formTitle}>Account details</DialogTitle>
        <DialogContent className={styles.formDialogContent}>
            <Grid container style={{minWidth: '37vw'}} direction={'row'}>
                <Grid item xs={6}>
                    <Grid container direction={'row'}>
                <Grid item xs={12}>
                    <div className={styles.bolder}>First name:</div><div>{user.firstName}</div>
                </Grid>
                <Grid item xs={12}>
                    <div className={styles.bolder}>Last name:</div><div>{user.lastName}</div>
                </Grid>
                <Grid item xs={12}>
                    <div className={styles.bolder}>E-mail address:</div><div>{AuthenticateService.getCurrentUser().email}</div>
                </Grid>
                {userRole==="STUDENT"?
                    <Grid item xs={12}>
                        <div className={styles.bolder}>Index number:</div><div>{index}</div>
                    </Grid>:null}
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction={'row'} style={{overflow: "hidden"}}>
                        <Grid item xs={12} style={{textAlign: "center", fontSize: "3em"}}>
                            <AccountCircle style={{color: "#3f51b5", transform: "scale(3)", height: "100%"}}/>
                        </Grid>
                        <Grid item xs={12} style={{textAlign: "center", fontSize: "1em"}}>
                            {user.firstName} {user.lastName}
                        </Grid>
                        <Grid item xs={12} style={{textAlign: "center", fontSize: "1em", color: "#3f51b5"}}>
                            {userRole.toLowerCase()}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DialogContent>
    </Dialog>)
}
