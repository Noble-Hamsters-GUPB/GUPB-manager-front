import './App.css';
// @ts-ignore
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {TournamentList} from "../Components/tournament-list";
import {TeamList} from "../Components/team-list";
import {GroupListTournament} from "../Components/group-list-tournament";
import {Main} from "../Components/main";

function App() {
    return <Router>
        <div className="container">
            <Route exact path="/" component={Main}/>
            <Route path="/tournaments" component={TournamentList}/>
            <Route path="/teams" component={TeamList}/>
            <Route path="/tournament-groups" component={GroupListTournament}/>
        </div>
    </Router>;
}

export default App;
