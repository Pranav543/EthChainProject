import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

const Accounts = async () => {
	const accounts = await window.web3.eth.getAccounts();
	return accounts[0];
};

const Profile = (props) => {
	const [ address, setAddress ] = useState([]);

	const { className, ...rest } = props;

	useEffect(() => {
		Accounts().then((result) => {
			const account = result;
			setAddress(account);
		});
	});

	console.log(address);

	const classes = useStyles();

	const user = {
		name: 'User',
		avatar: '',
		bio: address
	};

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Avatar alt="Person" className={classes.avatar} component={RouterLink} src={user.avatar} to="/settings" />
			<Typography className={classes.name} variant="h4">
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
