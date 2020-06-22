import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const Accounts = async () => {
	const accounts = await window.web3.eth.getAccounts();
	return accounts[0];
};

const TotalProfit = props => {
  const { className, ...rest } = props;

  const [ amount, setAmount ] = useState("")

  const [ from, setFrom ] = useState([]);

  //let Matic_ERC20Address = "0xBc0AEe9f7b65fd3d8be30ba648e00dB5F734942b"

  const classes = useStyles();

  /* useEffect(() => {
    Accounts().then((result) => {
			const account = result;
      setFrom(account);
      console.log(Matic_ERC20Address)
      window.matic.balanceOfERC20(from,Matic_ERC20Address,{from,parent:false}).then((result)=>{
        console.log(result)
        setAmount(result)
      })
		});
  }); */

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              ERC20 depositted
            </Typography>
            <Typography
              color="inherit"
              variant="h3"
            >
              {amount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
