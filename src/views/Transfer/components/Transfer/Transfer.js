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

const Accounts = async () => {
	const accounts = await window.web3.eth.getAccounts();
	return accounts[0];
};

const Transfer = (props) => {
	const { className, ...rest } = props;

	const classes = useStyles();

	let [ loading, changeloading ] = useState(false);

	const [ from, setFrom ] = useState([]);

	const [ token, setToken ] = React.useState('');

	const [ open, setOpen ] = React.useState(false);

	const [ amount, setAmount ] = React.useState('');

	const [ TransferTo, setTransferTo ] = React.useState('');

	let [ txHash, settxHash ] = React.useState('');

	useEffect(() => {
		Accounts().then((result) => {
			const account = result;
			setFrom(account);
		});
	});

	const transfer = async () => {
		console.log(loading);
		changeloading((prevState) => (loading = !prevState));
		if (token === 'eth') {
			const a = window.web3.utils.toWei(amount, 'ether');
			const Matic_WEthAddress = '0x8567184E6F9b1B77f24AfF6168453419AD22f90e';
			let token = Matic_WEthAddress;
			await window.matic.transferERC20Tokens(token, TransferTo, a, { from }).then(async (logs) => {
				console.log('Transfer on Ropsten:' + logs.transactionHash);
				settxHash((txHash = logs.transactionHash));
				props.txComplete(txHash, 'Transfer', 'ETH');
			});
		} else if (token === 'erc20') {
			const Matic_Erc20Address = '0x9a93c912F4eFf0254d178a18ACD980C1B05b57b0';
			let token = Matic_Erc20Address;
			await window.matic.transferERC20Tokens(token, TransferTo, amount, { from }).then(async (logs) => {
				console.log('Transfer on Ropsten:' + logs.transactionHash);
				settxHash((txHash = logs.transactionHash));
				props.txComplete(txHash, 'Transfer', 'ERC20');
			});
		} else if (token === 'erc721') {
			const Matic_Erc721Address = '0x8D5231e0B79edD9331e0CF0d4B9f3F30d05C47A5';
			let token = Matic_Erc721Address;
			const tokenId = '746';
			await window.matic.transferERC721Tokens(token, TransferTo, tokenId, { from }).then(async (logs) => {
				console.log('Transfer on Ropsten:' + logs.transactionHash);
				settxHash((txHash = logs.transactionHash));
				props.txComplete(txHash, 'Transfer', 'ERC721');
			});
		}
		console.log(loading);
		changeloading((prevState) => (loading = !prevState));
	};

	const handleTransferChange = (event) => {
		setTransferTo(event.target.value);
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
			<CardHeader subheader="Transfer On Matic Chain" title="Transfer" />
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
			<CardContent>
				<TextField
					fullWidth
					label="Transfer To"
					name="accoundid"
					value={TransferTo}
					onChange={handleTransferChange}
					variant="outlined"
				/>
			</CardContent>
			{token === 'eth' && (
				<div>
					<form>
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
							<Button color="primary" variant="outlined" onClick={transfer}>
								Transfer WETH
							</Button>
							<Divider />
							{loading && <CircularProgress />}
							<Divider />
							{txHash !== '' && (
								<Alert severity="success">
									The transaction was a success! Check it out{' '}
									<a
										href={`https://testnetv3-explorer.matic.network/tx/${txHash}/token_transfers`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{txHash}
									</a>
								</Alert>
							)}
						</CardActions>
					</form>
				</div>
			)}
			{token === 'erc20' && (
				<div>
					<form>
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
							<Button color="primary" variant="outlined" onClick={transfer}>
								Transfer ERC20
							</Button>
							<Divider />
							{loading && <CircularProgress />}
							<Divider />
							{txHash !== '' && (
								<Alert severity="success">
									The transaction was a success! Check it out{' '}
									<a
										href={`https://testnetv3-explorer.matic.network/tx/${txHash}/token_transfers`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{txHash}
									</a>
								</Alert>
							)}
						</CardActions>
					</form>
				</div>
			)}
			{token === 'erc721' && (
				<div>
					<form>
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
							<Button color="primary" variant="outlined" onClick={transfer}>
								Transfer ERC721
							</Button>
							<Divider />
							{loading && <CircularProgress />}
							<Divider />
							{txHash !== '' && (
								<Alert severity="success">
									The transaction was a success! Check it out{' '}
									<a
										href={`https://testnetv3-explorer.matic.network/tx/${txHash}/token_transfers`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{txHash}
									</a>
								</Alert>
							)}
						</CardActions>
					</form>
				</div>
			)}
		</Card>
	);
};

Transfer.propTypes = {
	className: PropTypes.string
};

export default connect(null, { txComplete })(Transfer);
