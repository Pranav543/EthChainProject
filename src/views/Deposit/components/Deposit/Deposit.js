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
import Alert from '@material-ui/lab/Alert';
import { txComplete } from './../../../../actions';

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

const PromiseTimeout = async (delayms) => {
	return new Promise(function(resolve, reject) {
		setTimeout(resolve, delayms);
	});
};

const Accounts = async () => {
	const accounts = await window.web3.eth.getAccounts();
	return accounts[0];
};

const Deposit = (props) => {
	const { className, ...rest } = props;

	const classes = useStyles();

	let [ loading, changeloading ] = useState(false);

	const [ token, setToken ] = useState('');

	const [ from, setFrom ] = useState([]);

	const [ open, setOpen ] = useState(false);

	const [ amount, setAmount ] = useState('');

	let [ txHash, settxHash ] = useState('');

	const [ { ethError, erc20Error, erc721Error }, setError ] = useState({
		ethError: '',
		erc20Error: '',
		erc721Error: ''
	});

	useEffect(() => {
		Accounts().then((result) => {
			const account = result;
			setFrom(account);
		});
	});

	const validate = () => {
		let isError = false;
		console.log(isNaN(Number(amount)));
		if (isNaN(Number(amount))) {
			isError = true;
			setError((currentState) => ({ ...currentState, ethError: 'Enter Valid Input' }));
		} else if (Number(amount) <= 0) {
			isError = true;
			setError((currentState) => ({ ...currentState, ethError: 'Enter Valid Input' }));
		}

		return isError;
	};

	const deposit = async () => {
		const err = validate();
		if (err === false) {
			setError((currentState) => ({ ...currentState, ethError: '' }));
			changeloading((prevState) => (loading = !prevState));
			if (token === 'eth') {
				const a = window.web3.utils.toWei(amount, 'ether');
				const Ropsten_WEthAddress = '0x7BdDd37621186f1382FD59e1cCAE0316F979a866';
				let token = Ropsten_WEthAddress;
				await window.matic.depositEther(a, { from }).then(async (logs) => {
					console.log('Deposit on Ropsten:' + logs.transactionHash);
					settxHash((txHash = logs.transactionHash));
					props.txComplete(txHash, 'Deposit', 'ETH');
				});
			} else if (token === 'erc20') {
				const Ropsten_Erc20Address = '0xEc5C207897C4378658F52bCCCE0ea648D1f17D65';
				let token = Ropsten_Erc20Address;
				await window.matic.approveERC20TokensForDeposit(token, amount, { from }).then(async (logs) => {
					console.log('Approve on Ropsten:' + logs.transactionHash);
					await PromiseTimeout(10000);
					await window.matic.depositERC20ForUser(token, from, amount, { from }).then(async (logs) => {
						console.log('Deposit on Ropsten:' + logs.transactionHash);
						settxHash((txHash = logs.transactionHash));
						props.txComplete(txHash, 'Deposit', 'ERC20');
					});
				});
			} else if (token === 'erc721') {
				const Ropsten_Erc721Address = '0x07d799252cf13c01f602779b4dce24f4e5b08bbd';
				let token = Ropsten_Erc721Address;
				const tokenId = '745';
				await window.matic.safeDepositERC721Tokens(token, tokenId, { from }).then(async (logs) => {
					console.log('Deposit on Ropsten:' + logs.transactionHash);
					settxHash((txHash = logs.transactionHash));
					props.txComplete(txHash, 'Deposit', 'ERC721');
				});
			}
			changeloading((prevState) => (loading = !prevState));
		}
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

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<form>
				<CardHeader subheader="Deposit to Matic Chain" title="Deposit" />
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
								id="outlined-error-helper-text"
								helperText={ethError}
							/>
						</CardContent>

						<Divider />
						<CardActions>
							<Button color="primary" variant="outlined" onClick={deposit}>
								Deposit
							</Button>
							<Divider />
							{loading && <CircularProgress />}
							<Divider />
							{txHash !== '' && (
								<Alert severity="success">
									The transaction was a success! Check it out{' '}
									<a
										href={`https://ropsten.etherscan.io/tx/${txHash}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{txHash}
									</a>
								</Alert>
							)}
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
								errorText={erc20Error}
							/>
						</CardContent>

						<Divider />
						<CardActions>
							<Button color="primary" variant="outlined" onClick={deposit}>
								Deposit
							</Button>
							<Divider />
							{loading && <CircularProgress />}
							<Divider />
							{txHash !== '' && (
								<Alert severity="success">
									The transaction was a success! Check it out{' '}
									<a
										href={`https://ropsten.etherscan.io/tx/${txHash}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{txHash}
									</a>
								</Alert>
							)}
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
								errorText={erc721Error}
							/>
						</CardContent>

						<Divider />
						<CardActions>
							<Button color="primary" variant="outlined" onClick={deposit}>
								Deposit
							</Button>
							<Divider />
							{loading && <CircularProgress />}
							<Divider />
							{txHash !== '' && (
								<Alert severity="success">
									The transaction was a success! Check it out{' '}
									<a
										href={`https://ropsten.etherscan.io/tx/${txHash}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{txHash}
									</a>
								</Alert>
							)}
						</CardActions>
					</div>
				)}
			</form>
		</Card>
	);
};

Deposit.propTypes = {
	className: PropTypes.string
};

export default connect(null, { txComplete })(Deposit);
