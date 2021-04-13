import {FC} from "react";
import styles from "./styles.module.css"
// @ts-ignore
import {Route, useRouteMatch} from 'react-router-dom';
import {GroupForm} from "../group-form";


export const GroupList: FC = (props) => {
    const {path} = useRouteMatch();
    return (
        <div>
            <Route path={`${path}/create_group`}>
                <GroupForm/>
            </Route>
        </div>
    )
}
