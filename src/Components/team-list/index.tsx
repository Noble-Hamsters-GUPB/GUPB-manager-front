import {FC} from "react";
import styles from "./styles.module.css"
// @ts-ignore
import {Route, useRouteMatch} from 'react-router-dom';
import {TeamForm} from "../team-form";


export const TeamList: FC = (props) => {
    const {path} = useRouteMatch();
    return (
        <div>
            <Route path={`${path}/create_team`}>
                <TeamForm/>
            </Route>
        </div>
    )
}
