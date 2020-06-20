import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Button,
	TextField,
	FormControl,
	MenuItem,
	InputLabel,
	Select
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { txInProcess, txOutProcess } from './../../../../actions';

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

const Withdraw = (props) => {
	const { className, ...rest } = props;

	const classes = useStyles();

	let [ loading, changeloading ] = useState(false);

	const [ token, setToken ] = useState('');

	const [ from, setFrom ] = useState([]);

	const [ open, setOpen ] = useState(false);

	const [ amount, setAmount ] = useState('');

	useEffect(() => {
		Accounts().then((result) => {
			const account = result;
			setFrom(account);
		});
	});

	const withdraw = async () => {
		changeloading((prevState) => (loading = !prevState));

		//function

		changeloading((prevState) => (loading = !prevState));
	};

	const handleAmountChange = (event) => {
		setAmount(event.target.value);
	};

	const handleChange = (event) => {
		setToken(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	if (props.txProcess.length === 0) {
		return (
			<Card {...rest} className={clsx(classes.root, className)}>
				<form>
					<CardHeader subheader="Withdraw From Matic Chain" title="Withdraw" />
					<Divider />

					<FormControl className={classes.formControl}>
						<InputLabel id="demo-controlled-open-select-label">Set Token</InputLabel>
						<Select
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							open={open}
							onClose={handleClose}
							onOpen={handleOpen}
							value={token}
							onChange={handleChange}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={'eth'}>Ether</MenuItem>
							<MenuItem value={'erc20'}>ERC20</MenuItem>
							<MenuItem value={'erc721'}>ERC721</MenuItem>
						</Select>
					</FormControl>

					{token === 'eth' && (
						<div>
							<CardContent>
								<TextField
									fullWidth
									label="Amount in Ether"
									name="amount"
									value={amount}
									onChange={handleAmountChange}
									variant="outlined"
								/>
							</CardContent>

							<Divider />
							<CardActions>
								<Button color="primary" variant="outlined" onClick={withdraw}>
									Withdraw
								</Button>
								<Divider />
								{loading && <CircularProgress />}
							</CardActions>
						</div>
					)}
					{token === 'erc20' && (
						<div>
							<CardContent>
								<TextField
									fullWidth
									label="Amount"
									name="amount"
									value={amount}
									onChange={handleAmountChange}
									variant="outlined"
								/>
							</CardContent>

							<Divider />
							<CardActions>
								<Button color="primary" variant="outlined" onClick={withdraw}>
									Withdraw
								</Button>
								<Divider />
								{loading && <CircularProgress />}
							</CardActions>
						</div>
					)}
					{token === 'erc721' && (
						<div>
							<CardContent>
								<TextField
									fullWidth
									label="Amount"
									name="amount"
									value={amount}
									onChange={handleAmountChange}
									variant="outlined"
								/>
							</CardContent>

							<Divider />
							<CardActions>
								<Button color="primary" variant="outlined" onClick={withdraw}>
									Withdraw
								</Button>
								<Divider />
								{loading && <CircularProgress />}
								<Divider />
							</CardActions>
						</div>
					)}
				</form>
			</Card>
		);
	} else if (props.txProcess.length === 1) {
		return (
			<Card {...rest} className={clsx(classes.root, className)}>
				<form>
					<CardHeader subheader="Withdraw From Matic Chain" title="Withdraw" />
					<Divider />
					<div>
						<CardActions>
							<Button color="primary" variant="outlined">
								Confirm Withdraw
							</Button>
							<Divider />
							{loading && <CircularProgress />}
							<Divider />
						</CardActions>
					</div>
				</form>
			</Card>
		);
	}
};

Withdraw.propTypes = {
	className: PropTypes.string
};

const mapStateToProps = (state) => {
	return {
		txProcess: state.txProcess
	};
};

export default connect(mapStateToProps, { txInProcess, txOutProcess })(Withdraw);
