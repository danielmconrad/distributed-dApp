import React, { Component } from "react";
import styles from "./Poll.css";

import CondorcetDefinition from "../../../build/contracts/Condorcet.json";
import contract from "truffle-contract";

class Poll extends Component {
  state = {
    contract: null,
    candidates: [],
    votes: [],
    isSubmitting: false,
    hasVoted: false
  };

  componentDidMount = () => {
    this.fetchContract()
      .then(() => this.fetchAccount())
      .then(() => this.fetchCandidates());
  };

  fetchAccount = () => {
    return new Promise((resolve, reject) => {
      this.props.web3.eth.getAccounts((error, accounts) => {
        if (error) {
          return reject(error);
        }
        this.setState({ account: accounts[0] }, resolve);
      });
    });
  };

  fetchContract = () => {
    const { web3 } = this.props;
    const Condorcet = contract(CondorcetDefinition);
    Condorcet.setProvider(web3.currentProvider);

    return new Promise((resolve, reject) => {
      Condorcet.deployed()
        .then(contract => this.setState({ contract }, resolve))
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

  candidatesNotYetVotedFor = () => {
    return this.state.candidates.filter(c => {
      return this.state.votes.indexOf(c) < 0
    });
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
  };

  canSubmit = () => {
    const { votes, candidates } = this.state;
    return votes.length > 0 && votes.length === candidates.length;
  };

  submitVote = () => {
    if (this.state.isSubmitting) {
      return;
    }

    this.setState({ isSubmitting: true });
    // this.state.contract.castVote(this.state.votes)
  };

  render() {
    const availableCandidates = this.candidatesNotYetVotedFor();

    return (
      <div className={styles.Poll}>
        <h2>Make your choices</h2>
        {availableCandidates.length 
          ? <p>Select the candidates in the order you prefer.</p>
          : <p>All done!</p>
        }
        <div className={styles.candidates}>
          {availableCandidates.map(candidate => (
            <button 
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
            <button 
              disabled={this.state.isSubmitting}
              className={`${this.state.isSubmitting && styles.submitting} pure-button pure-button-primary`}
              onClick={this.submitVote}
            >
              {this.state.isSubmitting 
                ? 'Casting...' 
                : 'Cast your Vote!'
              }
            </button>
          }

          {this.state.hasVoted && 
            <p>Thanks for voting!</p>
          }
        </div>
      </div>
    );
  }
}

export default Poll;
