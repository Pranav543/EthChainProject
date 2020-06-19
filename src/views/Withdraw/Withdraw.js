import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {  Withdraw } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Withdraws = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={2}
          xs={12}
        >
          
        </Grid>
        <Grid
          item
          md={8}
          xs={12}
        >
          <Withdraw />
        </Grid>
        <Grid
          item
          md={2}
          xs={12}
        >
          
        </Grid>
      </Grid>
    </div>
  );
};

export default Withdraws;
