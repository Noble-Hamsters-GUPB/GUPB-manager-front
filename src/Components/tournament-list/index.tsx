import {FC} from "react";
import {Route, useRouteMatch} from 'react-router-dom';
import {TournamentForm} from "../tournament-form"


export const TournamentList: FC = (props) => {
    const {path} = useRouteMatch();
    return (
        <div>
            <Route path={`${path}/create_tournament`}>
                <TournamentForm/>
            </Route>
            <p>This is tournament list</p>
        </div>
    )
}
