import './App.css';
import {Button} from "@material-ui/core";
import Add from '@material-ui/icons/Add';
// @ts-ignore
import {Link, Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {TournamentList} from "../Components/tournament-list";

function App() {
    let router = <Router>
        <div className="Main">
            <header className="Main-header">
                <img src="/logo_transparent.png" className="Main-logo" alt="logo"/>
                <Button variant="contained" color="secondary" id="createTournament" startIcon={<Add/>}
                        component={Link} to={'/tournaments/create_tournament'}>
                    Create Tournament</Button>
            </header>
        </div>
        <Switch>
            <Route path="/tournaments" component={TournamentList}/>
        </Switch>
    </Router>;
    return router;
}

export default App;
