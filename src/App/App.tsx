import './App.css';
import {Box, Button} from "@material-ui/core";
import PostAdd from '@material-ui/icons/PostAdd';
import GroupAdd from '@material-ui/icons/GroupAdd';
// @ts-ignore
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {TournamentList} from "../Components/tournament-list";
import {GroupList} from "../Components/group-list";
import {TournamentProgression} from "../Components/tournament-progression";

function App() {
    return <Router>
        <Box className="Main" >
            <header className="Main-header">
                <img src="/logo_transparent.png" className="Main-logo" alt="logo"/>
                <Box id="buttonContainer">
                <Button variant="contained" color="secondary" className="addButton" startIcon={<PostAdd className="icon"/>}
                        component={Link} to={'/tournaments/create_tournament'}>
                    Create Tournament</Button>
                <Button variant="contained" color="secondary" className="addButton" startIcon={<GroupAdd className="icon"/>}
                        component={Link} to={'/groups/create_group'}>
                    Create Group</Button>
                </Box>
            </header>
        </Box>
        <Switch>
            <Route path="/tournaments" component={TournamentList}/>
            <Route path="/groups" component={GroupList}/>
            <Route path="/tournament_details" component={TournamentProgression}/>
        </Switch>
    </Router>;
}

export default App;
