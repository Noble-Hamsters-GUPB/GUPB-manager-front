import {FC} from "react";
import {Box, Button, Switch} from "@material-ui/core";
import PostAdd from "@material-ui/icons/PostAdd";
import GroupAdd from "@material-ui/icons/GroupAdd";
import {Link} from "react-router-dom";
import styles from "./styles.module.css";

export const Main: FC = (props) => {
    return(
        <Box className={styles.Main}>
            <header className={styles.MainHeader}>
                <img src="/logo_transparent.png" className={styles.MainLogo} alt="logo"/>
                <Box id={styles.buttonContainer}>
                    <Button variant="contained" color="secondary" className={styles.addButton} startIcon={<PostAdd className="icon"/>}
                            component={Link} to={'/tournaments/create_tournament'}>
                        Create Tournament</Button>
                    <Button variant="contained" color="secondary" className={styles.addButton} startIcon={<GroupAdd className="icon"/>}
                            component={Link} to={'/groups/create_group'}>
                        Create Group</Button>
                </Box>
            </header>
        </Box>
    )
}
