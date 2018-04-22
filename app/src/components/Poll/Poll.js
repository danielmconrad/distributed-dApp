import React, { Component } from "react";
import styles from "./Poll";

import CondorcetDefinition from "../../../build/contracts/Condorcet.json";
import contract from "truffle-contract";

class Poll extends Component {
  state = {};

  componentDidMount() {
    const Condorcet = contract(CondorcetDefinition);
    Condorcet.setProvider(this.props.web3.currentProvider);

    // this.state.web3.eth.getAccounts((error, accounts) => {
    // });

    Condorcet.deployed().then(condorcet => {
      condorcet.numCandidates()
        .then(cs => {
          debugger;
          cs.toNumber();
        })
        .catch(err => {
          debugger
        });
    });

  }

  render() {
    return <div className={styles.Poll}>POLL</div>;
  }
}

export default Poll;
