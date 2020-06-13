import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

<<<<<<< HEAD
async function Accounts(){
  let accounts = await window.web3.eth.getAccounts()
  return accounts[0];
}

const Profile = props => {
  const { className, ...rest } = props;

  let account;

  Accounts().then((result)=>{
    account = result
    console.log(account)
  })

  console.log(account)
  
=======
const Profile = props => {
  const { className, ...rest } = props;

>>>>>>> 802c9b134fdee7a462a050b363774abc7c10b076
  const classes = useStyles();

  const user = {
    name: 'User',
    avatar: '',
<<<<<<< HEAD
    bio: 'Account'
  };
  
  
=======
    bio: 'Account Address'
  };
>>>>>>> 802c9b134fdee7a462a050b363774abc7c10b076

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
