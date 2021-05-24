import './styles.module.css';
// @ts-ignore
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {TournamentList} from "../Components/tournament-list";
import {TeamList} from "../Components/team-list";
import {Main} from "../Components/main";
import {TournamentParticipantView} from "../Components/tournament-participant";
import {TournamentOrganizerView} from "../Components/tournament-organizer";
import styles from "./styles.module.css";
import {createContext, useState} from "react";
export const SocketUrlContext = createContext('http://localhost:8080/ws-message');

function App() {
    const [teams, setTeams] = useState([])

    return <Router>
        <div className={styles.container}>
            <Route exact path="/" component={Main}/>
            <Route path="/tournaments" component={TournamentList}/>
            <Route path="/teams" component={TeamList}/>
            <Route path="/tournament-participant"><TournamentParticipantView teams={teams} setTeams={setTeams}/></Route>
            <Route path="/tournament-organizer"><TournamentOrganizerView teams={teams} setTeams={setTeams}/></Route>
        </div>
    </Router>;
}

export default App;
