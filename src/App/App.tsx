import './styles.module.css';
// @ts-ignore
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {TournamentList} from "../Components/tournament-list";
import {Main} from "../Components/main";
import styles from "./styles.module.css";
import {LoginForm} from "../Components/login-form";
import {RegistrationForm} from "../Components/registration-form";
import {TournamentView} from "../Components/tournament-view";
import {TournamentRegisterForm} from "../Components/tournament-register-form";
import {TournamentForm} from "../Components/tournament-form";

function App() {

    return <Router>
        <div className={styles.container}>
            <Route exact path="/" component={Main}/>
            <Route exact path="/login" component={Main}/>
            <Route exact path="/register" component={Main}/>
            <Route path="*/tournaments" component={TournamentList}/>
            <Route path="/tournament/:id" component={TournamentView}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/register" component={RegistrationForm}/>
            <Route path="/tournament-register" component={TournamentRegisterForm}/>
            <Route path="/create-tournament" component={TournamentForm}/>
        </div>
    </Router>;
}

export default App;
