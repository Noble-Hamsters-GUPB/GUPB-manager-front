import './App.css';
// @ts-ignore
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {TournamentList} from "../Components/tournament-list";
import {GroupList} from "../Components/group-list";
import {GroupListTournament} from "../Components/group-list-tournament";
import {Main} from "../Components/main";
import {TournamentProgression} from "../Components/tournament-progression";

function App() {
    return <Router>
        <div className="container">
            <Route exact path="/" component={Main}/>
            <Route path="/tournaments" component={TournamentList}/>
            <Route path="/groups" component={GroupList}/>
            <Route path="/tournament-groups" component={GroupListTournament}/>
        </div>
    </Router>
            <Route path="/tournament_details" component={TournamentProgression}/>
        </Switch>
    </Router>;
}

export default App;
