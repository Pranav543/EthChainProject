import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
		padding: theme.spacing(0)
	},
	content: {
		paddingTop: 15,
		textAlign: 'center'
	},
	image: {
		marginTop: 30,
		display: 'inline-block',
		maxWidth: '100%',
		width: 1200
	}
}));

const Welcome = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
          <div className={classes.content}>
            <Typography variant="h1">
              We're Very Happy To See You!
            </Typography>
            <img
              alt="Welcome!"
              className={classes.image}
              src="/images/welcome.svg"
            />
          </div>
    </div>
  );
};

export default Welcome;
