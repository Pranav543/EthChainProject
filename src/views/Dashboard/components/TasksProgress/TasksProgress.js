import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const Accounts = async () => {
	const accounts = await window.web3.eth.getAccounts();
	return accounts[0];
};

const TasksProgress = props => {
  const { className, ...rest } = props;

  const [ amount, setAmount ] = useState('')

  const [ from, setFrom ] = useState([]);

  let Matic_WEthAddress = "0x8567184E6F9b1B77f24AfF6168453419AD22f90e"

  useEffect(() => {
    Accounts().then((result) => {
			const account = result;
      setFrom(account);
      window.web3.eth.net.getId().then((result)=>{
        // console.log(typeof(window.chainID))
        window.chainID = result;
        if(window.web3 !== undefined || window.matic !== undefined){
          try{
            if(window.chainID !== undefined){
              console.log("HEllo")
              if(window.chainID===15001){
                console.log("From: ",window.from)
                console.log("Token: ",Matic_WEthAddress)
                let a = window.from
                window.matic.balanceOfERC20(a,Matic_WEthAddress,{from:window.from,parent:false}).then(async (result)=>{
                  let value = await window.web3.utils.fromWei(result)
                  console.log(value)
                  setAmount(value)
                })
              }
              else if(window.chainID===3){
                console.log(from)
                window.web3.eth.getBalance(from).then(async(result)=>{
                  let value = await window.web3.utils.fromWei(result)
                  console.log(value)
                  setAmount(value)
                })
              }
              else{
                console.log("Change network")
              }
            }
          }
          catch(err){
            console.log(err)
          }
        }
      })
      
		});
  });


  const classes = useStyles();

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
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Ether depositted
            </Typography>
            <Typography variant="h3">{amount}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;
