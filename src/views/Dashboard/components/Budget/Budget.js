import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';

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
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
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

const Budget = props => {
  const { className, ...rest } = props;

  const [ amount, setAmount ] = useState("")

  const [ from, setFrom ] = useState([]);

  let Matic_ERC721Address = "0x33FC58F12A56280503b04AC7911D1EceEBcE179c"
  let Goerli_ERC721Address = "0xfA08B72137eF907dEB3F202a60EfBc610D2f224b"

  const classes = useStyles();

  useEffect(() => {
    Accounts().then((result) => {
			const account = result;
      setFrom(account);
      window.web3.eth.net.getId().then((result)=>{
        // console.log(typeof(window.chainID))
        window.chainID = result;
        if(window.web3 !== undefined || window.matic !== undefined){
            if(window.chainID !== undefined && from !== []){
              try{
                if(window.chainID===80001){
                  window.matic.balanceOfERC721(window.from,Matic_ERC721Address,{from:window.from,parent:false}).then(async(result)=>{
                    setAmount(result)
                  }).catch((err)=>{
                    console.log('again')
                  })
                }
                else if(window.chainID===5){
                  window.matic.balanceOfERC721(window.from,Goerli_ERC721Address,{from:window.from,parent:true}).then(async (result)=>{
                    setAmount(result)
                  }).catch((err)=>{
                    console.log('again')
                  })
                }
                else{
                  console.log("Change network")
                }
              }
              catch(err){
                console.log(err)
              }
              
            }
          
        }
      })
      
		});
  })


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
              ERC721 depositted
            </Typography>
            <Typography variant="h3">{amount}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
