import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';


import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';

import Web3 from 'web3';
const Network = require("@maticnetwork/meta/network");
const Matic = require("@maticnetwork/maticjs");



const browserHistory = createBrowserHistory();


validate.validators = {
  ...validate.validators,
  ...validators
};




export default class App extends Component {
  render() {
    
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      try {
        window.ethereum.enable();
      } catch (error) {
        alert('Please allow access for the app to work');
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const network = new Network("testnet", "v3");
    const MainNetwork = network.Main;

    window.matic = new Matic({
      maticProvider: window.web3,
      parentProvider: window.web3,
      rootChain: MainNetwork.Contracts.RootChain,
      withdrawManager: MainNetwork.Contracts.WithdrawManagerProxy,
      depositManager: MainNetwork.Contracts.DepositManagerProxy,
      registry: MainNetwork.Contracts.Registry
    });

    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}