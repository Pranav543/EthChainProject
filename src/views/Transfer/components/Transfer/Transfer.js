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

	const [ chainID, setChainID ] = useState(0)

	const [ open, setOpen ] = React.useState(false);

	const [ amount, setAmount ] = React.useState('');

	const [ TransferTo, setTransferTo ] = React.useState('');

	let [ txHash, settxHash ] = React.useState('');

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

	const transfer = async () => {
		const err = validate();
		if (err === false) {
			changeloading((prevState) => (loading = !prevState));
			try{
				if (token === 'eth') {
					setError((currentState) => ({ ...currentState, ethError: '' }));
					isErrorProp(false);
					const a = window.web3.utils.toWei(amount, 'ether');
					console.log(a)
					console.log(from)
					console.log(TransferTo)
					const Matic_WEthAddress = '0x4DfAe612aaCB5b448C12A591cD0879bFa2e51d62';
					let token = Matic_WEthAddress;
					await window.matic.transferERC20Tokens(token, TransferTo, a, { from }).then(async (logs) => {
						console.log('Transfer on Matic:' + logs.transactionHash);
						settxHash((txHash = logs.transactionHash));
						props.txComplete(txHash, 'Transfer', 'ETH');
					});
				} else if (token === 'erc20') {
					setError((currentState) => ({ ...currentState, erc20Error: '' }));
					isErrorProp(false);
					const a = window.web3.utils.toWei(amount, 'ether');
					const Matic_Erc20Address = '0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e';
					let token = Matic_Erc20Address;
					await window.matic.transferERC20Tokens(token, TransferTo, a, { from }).then(async (logs) => {
						console.log('Transfer on Matic:' + logs.transactionHash);
						settxHash((txHash = logs.transactionHash));
						props.txComplete(txHash, 'Transfer', 'ERC20');
					});
				} else if (token === 'erc721') {
					setError((currentState) => ({ ...currentState, erc721Error: '' }));
					isErrorProp(false);
					const Matic_Erc721Address = '0x33FC58F12A56280503b04AC7911D1EceEBcE179c';
					let token = Matic_Erc721Address;
					const tokenId = '746';
					await window.matic.transferERC721Tokens(token, TransferTo, tokenId, { from }).then(async (logs) => {
						console.log('Transfer on Matic:' + logs.transactionHash);
						settxHash((txHash = logs.transactionHash));
						props.txComplete(txHash, 'Transfer', 'ERC721');
					});
				}
			}
			catch(err){
				alert(err)
			}
			changeloading((prevState) => (loading = !prevState));
		}
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

	if(chainID===80001){
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
								<Button color="primary" variant="outlined" onClick={transfer}>
									Transfer WETH
								</Button>
	
								{loading && <CircularProgress />}
							</CardActions>
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
						</form>
					</div>
				)}
				{token === 'erc20' && (
					<div>
						<form>
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
								<Button color="primary" variant="outlined" onClick={transfer}>
									Transfer ERC20
								</Button>
	
								{loading && <CircularProgress />}
							</CardActions>
	
							{txHash !== '' && (
								<Alert severity="success">
									The transaction was a success! Check it out{' '}
									<a
										href={`https://mumbai-explorer.matic.today/tx/${txHash}/token_transfers`}
										target="_blank"
										rel="noopener noreferrer"
									>
										{txHash}
									</a>
								</Alert>
							)}
						</form>
					</div>
				)}
				{token === 'erc721' && (
					<div>
						<form>
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
								<Button color="primary" variant="outlined" onClick={transfer}>
									Transfer ERC721
								</Button>
	
								{loading && <CircularProgress />}
							</CardActions>
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
						</form>
					</div>
				)}
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
};

Transfer.propTypes = {
	className: PropTypes.string
};

export default connect(null, { txComplete })(Transfer);
