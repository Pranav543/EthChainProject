import React from 'react';
import { makeStyles } from '@material-ui/styles';


import { UploadedFilesData } from './components';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UploadedFiles = (props) => {
  const classes = useStyles();
  
  // console.log(txHistory)


  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <UploadedFilesData />
      </div>
      </div>
  );
};



export default UploadedFiles;
