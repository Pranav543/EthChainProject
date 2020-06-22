import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {connect} from 'react-redux'

import { TxTable } from './components';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TranscHistory = (props) => {
  const classes = useStyles();
  const {txHistory} = props.state
  // console.log(txHistory)


  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <TxTable txHistory = {txHistory}/>
      </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state 
  }
}

export default connect(mapStateToProps)(TranscHistory);
