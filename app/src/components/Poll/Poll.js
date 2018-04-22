import React, { Component } from "react";
import styles from "./Poll.css";

import CondorcetDefinition from "../../../build/contracts/Condorcet.json";
import contract from "truffle-contract";

class Poll extends Component {
  state = {
    contract: null,
    candidates: [],
    votes: [],
    minimumVoteCount: 3
  };

  componentDidMount = () => {
    this.fetchContract().then(() => this.fetchCandidates());
  };

  fetchContract = () => {
    const { web3 } = this.props;
    const Condorcet = contract(CondorcetDefinition);
    Condorcet.setProvider(web3.currentProvider);

    return new Promise((resolve, reject) => {
      Condorcet.deployed()
        .then(contract => {
          this.setState({ contract }, () => resolve());
        })
        .catch(reject);
    });
  };

  fetchCandidates = () => {
    this.state.contract
      .candidates()
      .then(candidates => candidates.map(this.candidateFromHex))
      .then(candidates => this.setState({ candidates }))
      .catch(err => console.log(err));
  };

  candidateFromHex = c => {
    const name = this.props.web3.toAscii(c);
    return { id: name, name };
  };

  addCandidate = candidate => {
    this.setState({
      votes: [...this.state.votes, candidate]
    });
  };

  removeCandidate = candidate => {
    this.setState({
      votes: this.state.votes.filter(c => c !== candidate)
    });
  };

  hasVotedFor = (candidate) => {
    return this.state.votes.indexOf(candidate) >= 0;
  }

  canSubmit = () => {
    return this.state.votes.length >= this.state.minimumVoteCount
  }

  render() {
    return (
      <div className={styles.Poll}>
        <h2>Meet the candidates</h2>
        <p>Choose at least three candidates in the order you prefer.</p>
        <div className={styles.candidates}>
          {this.state.candidates.map(candidate => (
            this.hasVotedFor(candidate) 
              ? null 
              : <button 
                  key={candidate.id} 
                  className="pure-button"
                  onClick={() => this.addCandidate(candidate)}
                >
                  {candidate.name}
                </button>
          ))}
        </div>

        {this.state.votes.length > 0 && <h2>Your choices</h2>}
        <div>
          {this.state.votes.map((candidate, i) => (
            <button 
              key={candidate.id} 
              className="pure-button"
              onClick={() => this.removeCandidate(candidate)}
            >
              {i+1}) {candidate.name} <i className="far fa-times-circle"></i>
            </button>
          ))}
        </div>

        <div className={styles.submitSection}>
          {this.canSubmit() &&
            <button className="pure-button pure-button-primary">
              Submit Votes
            </button>
          }
        </div>
      </div>
    );
  }
}

export default Poll;
