import './App.css';
import {Button} from "@material-ui/core";
import Add from '@material-ui/icons/Add';

function App() {
  return (
    <div className="Main">
      <header className="Main-header">
        <img src="/logo_transparent.png" className="Main-logo" alt="logo" />
            <Button variant="contained" color="secondary" id="createTournament" startIcon={<Add/>}>
                Create Tournament</Button>
      </header>
    </div>
  );
}

export default App;
