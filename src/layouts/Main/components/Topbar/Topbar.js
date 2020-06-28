import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
	root: {
		boxShadow: 'none'
	},
	flexGrow: {
		flexGrow: 1
	},
	signOutButton: {
		marginLeft: theme.spacing(1)
	}
}));

const Topbar = (props) => {
	const { className, onSidebarOpen, ...rest } = props;

	const classes = useStyles();

	if(window.web3!==undefined){
		return (
			<AppBar {...rest} className={clsx(classes.root, className)}>
				<Toolbar>
				<RouterLink to="/">
          <img
            alt="Logo"
            src="/images/matic.svg"
          />
          
        </RouterLink>
        <Typography variant="h2" gutterBottom style = {{marginLeft: 5, color: 'white', marginTop: 5}}>DEX</Typography>
					<div className={classes.flexGrow} />
	
					<Hidden lgUp>
						<IconButton color="inherit" onClick={onSidebarOpen}>
							<MenuIcon />
						</IconButton>
					</Hidden>
				</Toolbar>
			</AppBar>
		);
	}
	else{
		return (
			<AppBar {...rest} className={clsx(classes.root, className)}>
				<Toolbar>
					<RouterLink to="/">
						<h1 style={{ color: 'white' }}>EtherMen</h1>
					</RouterLink>
					<div className={classes.flexGrow} />
	
					<Hidden lgUp>
						<IconButton color="inherit" onClick={onSidebarOpen}>
							<MenuIcon />
						</IconButton>
					</Hidden>
				</Toolbar>
			</AppBar>
		);
	}
};

Topbar.propTypes = {
	className: PropTypes.string,
	onSidebarOpen: PropTypes.func
};

export default Topbar;
