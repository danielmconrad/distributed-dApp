import React, { Component } from 'react'
import getWeb3 from '../../utils/getWeb3'
import Header from '../Header';
import Polls from '../Polls';

import styles from './App.css'

const ERR_NO_WEB3 = 'Error finding web3.';

class App extends Component {
  state = {
    storageValue: 0,
    web3: null
  };

  componentWillMount() {
    getWeb3
      .then(({web3}) => this.setState({ web3 }))
      .catch(() => console.log(ERR_NO_WEB3));
  }

  render() {
    if (!this.state.web3) { 
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div className={styles.App}>
        <Header web3={this.state.web3} />
        <Polls />
      </div>
    );
  }
}

export default App
