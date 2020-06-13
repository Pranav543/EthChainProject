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

<<<<<<< HEAD
import Web3 from 'web3';

=======
>>>>>>> 802c9b134fdee7a462a050b363774abc7c10b076
const browserHistory = createBrowserHistory();


validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  render() {
<<<<<<< HEAD
    
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
    
=======
>>>>>>> 802c9b134fdee7a462a050b363774abc7c10b076
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}
