import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';


import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Profile, SidebarNav } from './components';

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: 240,
		[theme.breakpoints.up('lg')]: {
			marginTop: 64,
			height: 'calc(100% - 64px)'
		}
	},
	root: {
		backgroundColor: theme.palette.white,
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		padding: theme.spacing(2)
	},
	divider: {
		margin: theme.spacing(2, 0)
	},
	nav: {
		marginBottom: theme.spacing(2)
	}
}));

const Sidebar = (props) => {
	const { open, variant, onClose, className, ...rest } = props;

	const classes = useStyles();

	const pages = [
		{
			title: 'Dashboard',
			href: '/dashboard',
			icon: <DashboardIcon />
		},
		{
			title: 'Deposit',
			href: '/deposit',
			icon: <SettingsEthernetIcon />
		},
		{
			title: 'Transfer',
			href: '/transfer',
			icon: <SyncAltIcon />
		},
		{
			title: 'Withdraw',
			href: '/withdraw',
			icon: <ImportExportIcon />
		},
		{
			title: 'Upload',
			href: '/upload',
			icon: <CloudUploadIcon />
		},
		{
			title: 'Transactions History',
			href: '/history',
			icon: <PeopleIcon />
		},

		{
			title: 'UploadedFiles',
			href: '/uploadedfiles',
			icon: <FileCopyIcon />
		}
	];
	
	return (
		<Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
			<div {...rest} className={clsx(classes.root, className)}>
				<Profile />
				<Divider className={classes.divider} />
				<SidebarNav className={classes.nav} pages={pages} />
			</div>
		</Drawer>
	);
};

Sidebar.propTypes = {
	className: PropTypes.string,
	onClose: PropTypes.func,
	open: PropTypes.bool.isRequired,
	variant: PropTypes.string.isRequired
};

export default Sidebar;
