import React, {FC} from "react";
import AuthenticateService from "../../services/AuthenticateService";
import {Dialog, DialogContent, DialogTitle, Grid, IconButton} from "@material-ui/core";
import styles from "../account-details/styles.module.css";
import CloseIcon from "@material-ui/icons/Close";
import {Link, useLocation} from "react-router-dom";
import {AccountCircle} from "@material-ui/icons";

export const AccountDetails: FC =  () => {
    const userRole = AuthenticateService.getCurrentUser().roles[0];
    const location = useLocation()

    return(
    <Dialog open={true}>
        <IconButton component={Link} to={location.pathname.split("/account")[0]} className={styles.closeButton}><CloseIcon/></IconButton>
        <DialogTitle className={styles.formTitle}>Account details</DialogTitle>
        <DialogContent className={styles.formDialogContent}>
            <Grid container style={{minWidth: '37vw'}} direction={'row'}>
                <Grid item xs={6}>
                    <Grid container direction={'row'}>
                <Grid item xs={12}>
                    <div className={styles.bolder}>First name:</div><div>name</div>
                </Grid>
                <Grid item xs={12}>
                    <div className={styles.bolder}>Last name:</div><div>last_name</div>
                </Grid>
                <Grid item xs={12}>
                    <div className={styles.bolder}>E-mail address:</div><div>{AuthenticateService.getCurrentUser().email}</div>
                </Grid>
                {userRole==="STUDENT"?
                    <Grid item xs={12}>
                        <div className={styles.bolder}>Index number:</div><div>index</div>
                    </Grid>:null}
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction={'row'} style={{overflow: "hidden"}}>
                        <Grid item xs={12} style={{textAlign: "center", fontSize: "3em"}}>
                            <AccountCircle style={{color: "#3f51b5", transform: "scale(3)", height: "100%"}}/>
                        </Grid>
                        <Grid item xs={12} style={{textAlign: "center", fontSize: "1em"}}>
                            name last_name
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
