import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import { DropzoneDialog } from 'material-ui-dropzone';
import { Card, CardHeader, CardContent, Divider, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {},
	button: {
		display: 'block',
		marginTop: theme.spacing(2)
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	}
}));

const Accounts = async () => {
	const accounts = await window.web3.eth.getAccounts();
	return accounts[0];
};

const StateSync = (props) => {
	const { className, ...rest } = props;

	const classes = useStyles();

	const [ from, setFrom ] = useState([]);

	const [ open, setOpen ] = useState(false);

	const [ file, handleSave ] = useState([]);

	const handleChange = (file) => {
		//Saving files to state for further use.
		handleSave(file);
		setOpen(false);
		console.log(file);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	useEffect(() => {
		Accounts().then((result) => {
			const account = result;
			setFrom(account);
		});
	});

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardHeader subheader="Upload Files to Matic Chain" title="Upload(State-Sync Feature)" />
			<Divider />

			<CardContent>
				<Button color="primary" variant="outlined" onClick={handleOpen}>
					Upload File
				</Button>

				<DropzoneDialog
					open={open}
					onSave={handleChange}
					showPreviews={true}
					maxFileSize={50000000}
					onClose={handleClose}
				/>
			</CardContent>
		</Card>
	);
};

StateSync.propTypes = {
	className: PropTypes.string
};

export default StateSync;
