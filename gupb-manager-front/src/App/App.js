import './App.css';
import {Button} from "@material-ui/core";
import Add from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';

function App() {
  return (
      <Router>
    <div className="Main">
      <header className="Main-header">
        <img src="/logo_transparent.png" className="Main-logo" alt="logo" />
            <Button variant="contained" color="secondary" id="createTournament" startIcon={<Add/>}
                    component={Link} to={'/create_tournament'}>
                Create Tournament</Button>
      </header>
    </div>
          <Switch>
              <Route path="/create_tournament">
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
