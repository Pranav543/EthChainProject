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
	try{
        const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
    }
    catch(err){
        console.log('again')
    }
};

const TotalProfit = props => {
  const { className, ...rest } = props;

  const [ amount, setAmount ] = useState("")

  const [ from, setFrom ] = useState([]);

  let Matic_ERC20Address = "0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e"
  let Goerli_ERC20Address = "0x3f152B63Ec5CA5831061B2DccFb29a874C317502"

  const classes = useStyles();

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
              if(window.chainID===80001){
                try{
                  window.matic.balanceOfERC20(window.from,Matic_ERC20Address,{from:window.from,parent:false}).then(async(result)=>{
                    let value = await window.web3.utils.fromWei(result)
                    setAmount(value)
                  }).catch((err)=>{
                    console.log('again')
                  })
                }
                catch(err){
                  console.log("again")
                }
              }
              else if(window.chainID===5){
                try{
                  window.matic.balanceOfERC20(window.from,Goerli_ERC20Address,{from:window.from,parent:true}).then(async (result)=>{
                    let value = await window.web3.utils.fromWei(result)
                    setAmount(value)
                  }).catch((err)=>{
                    console.log('again')
                  })
                }
                catch(err){
                  console.log('again')
                }
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
