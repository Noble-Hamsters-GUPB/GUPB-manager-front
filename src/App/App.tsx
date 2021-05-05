import './styles.module.css';
// @ts-ignore
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {TournamentList} from "../Components/tournament-list";
import {TeamList} from "../Components/team-list";
import {Main} from "../Components/main";
import {TournamentParticipantView} from "../Components/tournament-participant";
import {TournamentOrganizerView} from "../Components/tournament-organizer";
import styles from "./styles.module.css";

function App() {
    return <Router>
        <div className={styles.container}>
            <Route exact path="/" component={Main}/>
            <Route path="/tournaments" component={TournamentList}/>
            <Route path="/teams" component={TeamList}/>
            <Route path="/tournament-participant" component={TournamentParticipantView}/>
            <Route path="/tournament-organizer" component={TournamentOrganizerView}/>
        </div>
    </Router>;
}

export default App;
