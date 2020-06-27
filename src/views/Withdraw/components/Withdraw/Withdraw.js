import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import useInterval from '@use-it/interval';
import LinearProgressWithLabel from './ProgressBar';
import Alert from '@material-ui/lab/Alert';

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
import { txInProcess, txOutProcess, txComplete } from './../../../../actions';


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
	const { className, txHistory, ...rest } = props;

	const classes = useStyles();

	let [ loading, changeloading ] = useState(false);

	const [ token, setToken ] = useState('');

	const [ from, setFrom ] = useState([]);

	const [ chainID, setChainID ] = useState(0)

	const [ open, setOpen ] = useState(false);

	const [ amount, setAmount ] = useState('');

	let [ start, setStart ] = useState(false);

	let [ initTxHash, setInitxHash ] = useState('');

	let [ confirmTxHash, setConfirmTxHash ] = useState('');

	let [ exitTxHash, setExitTxHash ] = useState('');

	let [ progress, setProgress ] = useState(0);

	const [ count, setCount ] = useState(0);

	const [ errorProp, isErrorProp ] = useState(false);

	const [ { ethError, erc20Error, erc721Error }, setError ] = useState({
		ethError: '',
		erc20Error: '',
		erc721Error: ''
	});

	useEffect(() => {
		Accounts().then((result) => {
			const account = result;
			setFrom(account);
			window.web3.eth.net.getId().then((result)=>{
				setChainID(result)
			})
		});
	},0);

	const isNatural = (n) => {
		return n > 0 && Math.floor(n) === +n;
	};

	const validate = () => {
		let isError = false;
		if (token === 'eth' && isNaN(Number(amount))) {
			isError = true;
			isErrorProp(true);
			setError((currentState) => ({ ...currentState, ethError: 'Enter Valid Input' }));
		}
		if (token === 'eth' && Number(amount) <= 0) {
			isError = true;
			isErrorProp(true);
			setError((currentState) => ({ ...currentState, ethError: 'Enter Valid Input' }));
		}
		if (token === 'erc20' && isNaN(Number(amount))) {
			isError = true;
			isErrorProp(true);
			setError((currentState) => ({ ...currentState, erc20Error: 'Enter Valid Input' }));
		}
		if (token === 'erc20' && Number(amount) <= 0) {
			isError = true;
			isErrorProp(true);
			setError((currentState) => ({ ...currentState, erc20Error: 'Enter Valid Input' }));
		}
		if (token === 'erc721' && isNatural(amount) === false) {
			isError = true;
			isErrorProp(true);
			setError((currentState) => ({ ...currentState, erc721Error: 'Please Input Natural Number' }));
		}

		return isError;
	};

	useInterval(() => {
		if (start) {
			setCount(count + 1);
			if (parseInt(count * 100 / 600) > progress) {
				setProgress(progress + 1);
			}
			if (count === 600) {
				setStart((prevState) => (start = !prevState));
			}
		}
	}, 1000);

	const InitWithdraw = async () => {
		const err = validate();
		if (err === false) {
			changeloading((prevState) => (loading = !prevState));
			let t = '';
			if (token === 'eth' || token === 'erc20') {
				setError((currentState) => ({ ...currentState, ethError: '', erc20Error: '' }));
				isErrorProp(false);
				if (token === 'eth') {
					t = '0x4DfAe612aaCB5b448C12A591cD0879bFa2e51d62';
				} else {
					t = '0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e';
				}
				const a = window.web3.utils.toWei(amount, 'ether');
				console.log(t)
				window.matic.startWithdraw(t, a, { from }).then((logs) => {
					
					setInitxHash((initTxHash = logs.transactionHash));
					props.txInProcess(initTxHash,token);

					token === 'eth' && props.txComplete(initTxHash, 'Initial Withdraw', 'ETH');
					token === 'erc20' && props.txComplete(initTxHash, 'Initial Withdraw', 'ERC20');
				});
			} else if (token === 'erc721') {
				setError((currentState) => ({ ...currentState, erc721Error: '' }));
				isErrorProp(false);
				const tokenId = '1';
				t = '0x33FC58F12A56280503b04AC7911D1EceEBcE179c';
				window.matic.startWithdrawForNFT(t, tokenId, { from }).then((logs) => {
					
					setInitxHash((initTxHash = logs.transactionHash));
					props.txInProcess(initTxHash,token);
					props.txComplete(initTxHash, 'Initial Withdraw', 'ERC721');
				});
			}
			console.log('Done');
			changeloading((prevState) => (loading = !prevState));
			setStart((prevState) => (start = !prevState));
		}
	};

	const ConfWithdraw = async () => {
		try{
			let t;
			let transactionHash = props.txProcess[0].txHash
			if (props.txProcess[0].currency === 'eth' || props.txProcess[0].currency === 'erc20') {
				if (props.txProcess[0].currency === 'eth') {
					console.log('Hash: ',typeof(transactionHash))
					console.log('Token: ',props.txProcess[0].currency)
					window.matic
						.withdraw(transactionHash, {
							from
						})
						.then((logs) => {
							console.log('Done');
							console.log(logs.transactionHash);
							setConfirmTxHash((confirmTxHash = logs.transactionHash));
							props.txProcess[0].currency === 'eth' && props.txComplete(confirmTxHash, 'Confirm Withdraw', 'ETH');
							props.txProcess[0].currency === 'erc20' && props.txComplete(confirmTxHash, 'Confirm Withdraw', 'ERC20');
							t = '0x60D4dB9b534EF9260a88b0BED6c486fe13E604Fc';
							window.matic
								.processExits(t, {
									from
								})
								.then((logs) => {
									console.log(logs.transactionHash);
									setExitTxHash((exitTxHash = logs.transactionHash));
									props.txProcess[0].currency === 'eth' && props.txComplete(exitTxHash, 'Exit Withdraw', 'ETH');
									props.txProcess[0].currency === 'erc20' && props.txComplete(exitTxHash, 'Exit Withdraw', 'ERC20');
								});
						});
				} else {
					window.matic
						.withdraw(transactionHash, {
							from
						})
						.then((logs) => {
							console.log(logs.transactionHash);
							setConfirmTxHash((confirmTxHash = logs.transactionHash));
							props.txProcess[0].currency === 'eth' && props.txComplete(confirmTxHash, 'Confirm Withdraw', 'ETH');
							props.txProcess[0].currency === 'erc20' && props.txComplete(confirmTxHash, 'Confirm Withdraw', 'ERC20');
							t = '0x3f152B63Ec5CA5831061B2DccFb29a874C317502';
							window.matic
								.processExits(t, {
									from
								})
								.then((logs) => {
									console.log(logs.transactionHash);
									setExitTxHash((exitTxHash = logs.transactionHash));
									props.txProcess[0].currency === 'eth' && props.txComplete(exitTxHash, 'Exit Withdraw', 'ETH');
									props.txProcess[0].currency === 'erc20' && props.txComplete(exitTxHash, 'Exit Withdraw', 'ERC20');
									props.txOutProcess();
								});
						});
				}
			} else if (props.txProcess[0].currency === 'erc721') {
				window.matic.withdrawNFT(transactionHash, { from }).then((logs) => {
					console.log(logs.transactionHash);
					setConfirmTxHash((confirmTxHash = logs.transactionHash));
					props.txComplete(confirmTxHash, 'Confirm Withdraw', 'ERC721');
					t = '0xfA08B72137eF907dEB3F202a60EfBc610D2f224b';
					window.matic
						.processExits(t, {
							from
						})
						.then((logs) => {
							console.log(logs.transactionHash);
							setExitTxHash((exitTxHash = logs.transactionHash));
							props.txComplete(exitTxHash, 'Exit Withdraw', 'ERC721');
							props.txOutProcess();
						});
				});
			}
		}
		catch(err){
			alert(err)
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
	if (props.txProcess.length === 0) {
		console.log("c: ",chainID)
		if(chainID===80001){
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
										error={errorProp}
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
									<Button color="primary" variant="outlined" onClick={InitWithdraw}>
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
										error={errorProp}
										label="Amount"
										name="amount"
										value={amount}
										onChange={handleAmountChange}
										variant="outlined"
										id="outlined-error-helper-text"
										helperText={erc20Error}
									/>
								</CardContent>
	
								<Divider />
								<CardActions>
									<Button color="primary" variant="outlined" onClick={InitWithdraw}>
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
										error={errorProp}
										label="Amount"
										name="amount"
										value={amount}
										onChange={handleAmountChange}
										variant="outlined"
										id="outlined-error-helper-text"
										helperText={erc721Error}
									/>
								</CardContent>
	
								<Divider />
								<CardActions>
									<Button color="primary" variant="outlined" onClick={InitWithdraw}>
										Withdraw
									</Button>
									<Divider />
									{loading && <CircularProgress />}
								</CardActions>
							</div>
						)}
					</form>
				</Card>
			);
		}
		else{
			return(
				<div>
					<Alert severity="error">Change Network Please!!</Alert>
				</div>
			);
		}
	} else if (props.txProcess.length === 1 && start === true) {
		return (
			<div>
				<Card {...rest} className={clsx(classes.root, className)}>
					<form>
						<CardHeader
							subheader="DO NOT CHANGE YOUR NETWORK UNTIL THE PROGRESS BAR IS FULL"
							title="Withdraw"
						/>
						<Divider />
					</form>
				</Card>

				<LinearProgressWithLabel value={progress} />
			</div>
		);
	} else if (props.txProcess.length === 1 && start === false) {
		if(chainID===5){
			return (
				<Card {...rest} className={clsx(classes.root, className)}>
					<form>
						<CardHeader subheader="Withdraw From Matic Chain" title="Withdraw" />
						<Divider />
						<div>
							<CardActions>
								<Button
									color="primary"
									variant="outlined"
									onClick={ConfWithdraw}
								>
									Confirm Withdraw
								</Button>
								<Divider />
								{loading && <CircularProgress />}
							</CardActions>
							{initTxHash !== '' && (
								<Alert severity="success">
									The transaction was a success! Check it out{' '}
									<a
										href={`https://mumbai-explorer.matic.today/tx/${initTxHash}/token_transfers`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{initTxHash}
									</a>
								</Alert>
							)}
							<Divider />
							{confirmTxHash !== '' && (
								<Alert severity="success">
									The transaction was a success! Check it out{' '}
									<a
										href={`https://goerli.etherscan.io/tx/${confirmTxHash}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{confirmTxHash}
									</a>
								</Alert>
							)}
							<Divider />
							{exitTxHash !== '' && (
								<Alert severity="success">
									The transaction was a success! Check it out{' '}
									<a
										href={`https://goerli.etherscan.io/tx/${exitTxHash}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{exitTxHash}
									</a>
								</Alert>
							)}
						</div>
					</form>
				</Card>
			);
		}
		else{
			return(
				<div>
					<Alert severity="error">Change Network Please!!</Alert>
				</div>
			);
		}
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

export default connect(mapStateToProps, { txInProcess, txOutProcess, txComplete })(Withdraw);
