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
import { txComplete} from './../../../../actions';

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
	try{
        const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
    }
    catch(err){
        console.log('again')
    }
};

const Deposit = (props) => {
	const { className, ...rest } = props;

	const classes = useStyles();

	let [ loading, changeloading ] = useState(false);

	const [ token, setToken ] = useState('');

	const [ from, setFrom ] = useState([]);

	const [ chainID, setChainID ] = useState(0)

	const [ open, setOpen ] = useState(false);

	const [ amount, setAmount ] = useState('');

	let [ txHash, settxHash ] = useState('');

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
	});

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

	const deposit = async () => {
		const err = validate();
		if (err === false) {
			changeloading((prevState) => (loading = !prevState));
			try{
				if (token === 'eth') {
					setError((currentState) => ({ ...currentState, ethError: '' }));
					isErrorProp(false);
					const a = window.web3.utils.toWei(amount, 'ether');
					const Goerli_WEthAddress = '0x60D4dB9b534EF9260a88b0BED6c486fe13E604Fc';
					let token = Goerli_WEthAddress;
					await window.matic.depositEther(a, { from }).then(async (logs) => {
						console.log('Deposit on Goerli:' + logs.transactionHash);
						settxHash((txHash = logs.transactionHash));
						props.txComplete(txHash, 'Deposit', 'ETH');
					});
				} else if (token === 'erc20') {
					setError((currentState) => ({ ...currentState, erc20Error: '' }));
					isErrorProp(false);
					const a = window.web3.utils.toWei(amount, 'ether');
					const Goerli_Erc20Address = '0x3f152B63Ec5CA5831061B2DccFb29a874C317502';
					let token = Goerli_Erc20Address;
					await window.matic.approveERC20TokensForDeposit(token, a, { from }).then(async (logs) => {
						console.log('Approve on Goerli:' + logs.transactionHash);
						await PromiseTimeout(10000);
						await window.matic.depositERC20ForUser(token, from, a, { from }).then(async (logs) => {
							console.log('Deposit on Goerli:' + logs.transactionHash);
							settxHash((txHash = logs.transactionHash));
							props.txComplete(txHash, 'Deposit', 'ERC20');
						});
					});
				} else if (token === 'erc721') {
					setError((currentState) => ({ ...currentState, erc721Error: '' }));
					isErrorProp(false);
					const Goerli_Erc721Address = '0xfA08B72137eF907dEB3F202a60EfBc610D2f224b';
					let token = Goerli_Erc721Address;
					const tokenId = '745';
					await window.matic.safeDepositERC721Tokens(token, tokenId, { from }).then(async (logs) => {
						console.log('Deposit on Ropsten:' + logs.transactionHash);
						settxHash((txHash = logs.transactionHash));
						props.txComplete(txHash, 'Deposit', 'ERC721');
					});
				}
			}
			catch(err){
				alert(err)
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

	if(chainID===5){
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
								<Button color="primary" variant="outlined" onClick={deposit}>
									Deposit
								</Button>
	
								{loading && <CircularProgress />}
							</CardActions>
							{txHash !== '' && (
								<Alert severity="success">
									The transaction was a success! Check it out{' '}
									<a
										href={`https://goerli.etherscan.io/tx/${txHash}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{txHash}
									</a>
								</Alert>
							)}
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
								<Button color="primary" variant="outlined" onClick={deposit}>
									Deposit
								</Button>
	
								{loading && <CircularProgress />}
							</CardActions>
							{txHash !== '' && (
								<Alert severity="success">
									The transaction was a success! Check it out{' '}
									<a
										href={`https://goerli.etherscan.io/tx/${txHash}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{txHash}
									</a>
								</Alert>
							)}
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
								<Button color="primary" variant="outlined" onClick={deposit}>
									Deposit
								</Button>
								{loading && <CircularProgress />}
							</CardActions>
							{txHash !== '' && (
								<Alert severity="success">
									The transaction was a success! Check it out{' '}
									<a
										href={`https://goerli.etherscan.io/tx/${txHash}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{txHash}
										{console.log(props.txProcess)}
									</a>
								</Alert>
							)}
						</div>
					)}
				</form>
			</Card>
		);
	}
	else{
		return(
            <div>
                <Alert severity="error">Change Network to Goerli Testnet!!</Alert>
            </div>
        );
	}
};

Deposit.propTypes = {
	className: PropTypes.string
};



export default connect(null, { txComplete })(Deposit);