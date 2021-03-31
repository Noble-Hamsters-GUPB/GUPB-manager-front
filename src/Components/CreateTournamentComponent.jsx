import React, { Component } from 'react'
import TournamentService from "../services/TournamentService";

class CreateTournamentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startTime: '',
            githubLink: ''
        }

        this.startTimeHandleChange = this.startTimeHandleChange.bind(this);
        this.githubLinkHandleChange = this.githubLinkHandleChange.bind(this);
        this.submitTournamentData = this.submitTournamentData.bind(this);
    }

    submitTournamentData(e) {
        e.preventDefault();
        let tournament = {githubLink: this.state.githubLink, startTime: this.state.startTime};
        console.log('tournament => ' + JSON.stringify(tournament));

        TournamentService.createTournament(tournament).then(res => {
            //todo: Popup message with successful adding operation
            this.props.history.push("/");
        })
    }

    startTimeHandleChange(e) {
        this.setState({startTime: e.target.value});
    }

    githubLinkHandleChange(e) {
        this.setState({githubLink: e.target.value});
    }

    cancel() {
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {
                                <h3 className = "text-center">Create tournament</h3>
                            }
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Start time: </label>
                                        <input type="date" name="startTime" className="form-control"
                                               value={this.state.startTime} onChange={this.startTimeHandleChange} />
                                    </div>
                                    <div className = "form-group">
                                        <label> Github link: </label>
                                        <input placeholder="Github link" name="githubLink" className="form-control"
                                               value={this.state.githubLink} onChange={this.githubLinkHandleChange} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.submitTournamentData}>Submit</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateTournamentComponent