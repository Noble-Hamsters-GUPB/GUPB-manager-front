import {FC, useEffect, useState} from "react";
import AuthenticateService from "../../services/AuthenticateService";
import {TournamentParticipantView} from "../tournament-participant";
import {TournamentOrganizerView} from "../tournament-organizer";
import {useHistory} from 'react-router-dom';

export const TournamentView:FC<{match}> =  (props) => {
    const userRole = AuthenticateService.getCurrentUser().roles[0];
    const history = useHistory();
    console.log(props.match);
    return <div>
        {(() => {
          if(userRole==="ADMIN"){
              return <TournamentOrganizerView id={props.match.params.id}/>;
          }
          if(userRole==="STUDENT"){
              return <TournamentParticipantView id={props.match.params.id}/>;
          }
          history.push("/login");
        })()}
    </div>
}
