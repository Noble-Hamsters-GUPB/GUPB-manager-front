import {FC, useState} from "react";
import styles from "./styles.module.css"
// @ts-ignore
import {Route, useRouteMatch} from 'react-router-dom';
import {TournamentForm} from "../tournament-form"


export const TournamentList: FC = (props) => {
    const {path} = useRouteMatch();
    const [tournaments, setTournaments] = useState([{name: "mleko"}, {name: "jajka"}]);
    return (
        <div>
            <Route path={`${path}/create_tournament`}>
                <TournamentForm/>
            </Route>
            {tournaments.map((tournament)=>{
                return <p>{tournament.name}</p>
            })}
        </div>
    )
}
