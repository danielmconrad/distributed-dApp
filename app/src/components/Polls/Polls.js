import React, { Component } from 'react'
import styles from './Polls'

import Condorcet from '../../../build/contracts/Condorcet.json'
import contract from 'truffle-contract'

class Polls extends Component {
  componentDidMount() {
    const condorcet = contract(Condorcet);
    condorcet.setProvider(this.props.web3.currentProvider);
  }

  render() {
    return (
      <div className={styles.Polls}>
        POLLS
      </div>
    );
  }
}

export default Polls;
