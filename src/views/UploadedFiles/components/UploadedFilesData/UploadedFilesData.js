import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardContent,

	Typography,

	Toolbar,

} from '@material-ui/core';

const useStyles = makeStyles({
    root: {}
});

const UploadedFilesData = (props) => {
	const { className, ...rest } = props;


	const classes = useStyles();

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<Toolbar>
				<Typography variant="h2" id="tableTitle" component="div">
					Uploaded Files
				</Typography>
			</Toolbar>
			<CardContent className={classes.content}>
			</CardContent>
		</Card>
	);
};

UploadedFilesData.propTypes = {
	className: PropTypes.string,
	
};

export default UploadedFilesData;
