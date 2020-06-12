import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Password = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

 ;

  

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Deposit to Matic Chain"
          title="Deposit"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Amount in Ether"
            name="amount"
            
            
            variant="outlined"
          />
          
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
          >
            Deposit
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
