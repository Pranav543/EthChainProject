import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Network,
  ETHER,
  ERC20,
  ERC721,
  Welcome
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Network />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <ETHER />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <ERC20 />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <ERC721 />
        </Grid>
        <Grid
          item
          lg={2}
          md={0}
          xl={2}
          xs={0}
        >
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
        <Welcome />
        </Grid>
        <Grid
          item
          lg={2}
          md={0}
          xl={2}
          xs={0}
        >  
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
