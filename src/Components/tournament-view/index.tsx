import {FC, useEffect, useState} from "react";
import AuthenticateService from "../../services/AuthenticateService";
import {TournamentParticipantView} from "../tournament-participant";
import {TournamentOrganizerView} from "../tournament-organizer";
import {useHistory} from 'react-router-dom';
import RoundService from "../../services/RoundService";

export const TournamentView:FC<{match}> =  (props) => {
    const userRole = AuthenticateService.getCurrentUser().roles[0];
    const history = useHistory();
    const [rounds, setRounds] = useState<{id: number,tournament: string, number: number,date: string, completedRuns: number,
        numberOfRuns: number, pathToLogs: string}[]>( [])
    useEffect(() => {
        RoundService.getRoundsByTournament(props.match.params.id).then((res) => {
            setRounds(res.data)
        })
    }, [])
    console.log(props.match);
    return <div>
        {(() => {
          if(userRole==="ADMIN"){
              return <TournamentOrganizerView id={props.match.params.id} rounds={[...rounds]}/>;
          }
          if(userRole==="STUDENT"){
              return <TournamentParticipantView id={props.match.params.id} rounds={[...rounds]}/>;
          }
          history.push("/login");
        })()}
    </div>
}
