import {FC} from "react";
import {Box, Button, ButtonGroup, Switch} from "@material-ui/core";
import PostAdd from "@material-ui/icons/PostAdd";
import GroupAdd from "@material-ui/icons/GroupAdd";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockIcon from '@material-ui/icons/Lock';
import {Link} from "react-router-dom";
import styles from "./styles.module.css";

export const Main: FC = (props) => {
    return(
        <Box className={styles.Main}>
            <header className={styles.MainHeader}>
                <img src="/logo_transparent.png" className={styles.MainLogo} alt="logo"/>
                <ButtonGroup color="secondary" variant="contained" id={styles.buttonContainer}>
                    {/*<Button variant="contained" color="secondary" className={styles.addButton} startIcon={<PostAdd className="icon"/>}*/}
                    {/*        component={Link} to={'/tournaments/create_tournament'}>*/}
                    {/*    Create Tournament</Button>*/}
                    {/*<Button variant="contained" color="secondary" className={styles.addButton} startIcon={<GroupAdd className="icon"/>}
                            component={Link} to={'/teams/create_team'}>
                        Create Team</Button>*/}
                    <Button className={styles.addButton} startIcon={<VpnKeyIcon className="icon"/>}
                            component={Link} to={'/login'}>
                        Login</Button>
                    <Button className={styles.addButton} startIcon={<LockIcon className="icon"/>}
                            component={Link} to={'/register'}>
                        Register</Button>
                </ButtonGroup>
            </header>
        </Box>
    )
}
