import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import useInterval from '@use-it/interval';
import LinearProgressWithLabel from './ProgressBar'

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

	let [ start, setStart ] = useState(false)

	let [ progress, setProgress ] = useState(0) 

	const [count, setCount] = useState(0);

	useEffect(() => {
		Accounts().then((result) => {
			const account = result;
			setFrom(account);
		});
	});

	useInterval(() => {    
		if(start){
			setCount(count + 1)
			if(parseInt((count*100)/360)>progress){
				setProgress(progress + 1);
			}
			if(count===360){
				setStart((prevState) => (start = !prevState));
			}
		}      
	}, 1000);

	const InitWithdraw = async () => {
		changeloading((prevState) => (loading = !prevState));
		let t = ""
		if(token==='eth' || token==='erc20'){
			if(token==='eth'){
				t = "0x8567184E6F9b1B77f24AfF6168453419AD22f90e"
			}
			else{
				t = "0xBc0AEe9f7b65fd3d8be30ba648e00dB5F734942b"
			}
			window.matic.startWithdraw(t, amount, {from}).then(logs => props.txInProcess(logs.transactionHash));
		}
		else if(token==='erc721'){
			const tokenId = '1' 
			t = "0x8D5231e0B79edD9331e0CF0d4B9f3F30d05C47A5"
			window.matic.startWithdrawForNFT(t, amount, {from}).then(logs => props.txInProcess(logs.transactionHash));
		}
		console.log("Done")
		changeloading((prevState) => (loading = !prevState));
		setStart((prevState) => (start = !prevState));
	};

	const ConfWithdraw = async(transactionHash) => {
		let t;
		if(token==='eth' || token==='erc20'){
			if(token==='eth'){
				window.matic.withdraw(transactionHash, {
					from
				 })
				 .then(logs => {
					console.log(logs.transactionHash)
					t = "0x28C8713DDe7F063Fdc4cA01aB2A8856e0F243Fec"
					window.matic.processExits(t,  {
						from
					 })
					 .then(logs => console.log(logs.transactionHash));
				 });
			}
			else{
				window.matic.withdraw(transactionHash, {
					from
				 })
				 .then(logs => {
					console.log(logs.transactionHash)
					t = "0xEc5C207897C4378658F52bCCCE0ea648D1f17D65"
					window.matic.processExits(t,  {
						from
					 })
					 .then(logs => console.log(logs.transactionHash));
				 })
			}
		}
		else if(token==='erc721'){
			window.matic.withdrawNFT(transactionHash, {from}).then(logs => {
				console.log(logs.transactionHash)
				t = "0x07d799252cf13c01f602779b4dce24f4e5b08bbd"
				window.matic.processExits(t,  {
					from
				 })
				 .then(logs => console.log(logs.transactionHash));
			});
		}
		props.txOutProcess()
		console.log("Done")
	}

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
									label="Amount"
									name="amount"
									value={amount}
									onChange={handleAmountChange}
									variant="outlined"
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
									label="Amount"
									name="amount"
									value={amount}
									onChange={handleAmountChange}
									variant="outlined"
								/>
							</CardContent>

							<Divider />
							<CardActions>
								<Button color="primary" variant="outlined" onClick={InitWithdraw}>
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
	} 

	else if(props.txProcess.length === 1 && start===true){
		return (
			<div>
			<Card {...rest} className={clsx(classes.root, className)}>
				<form>
					<CardHeader subheader="DO NOT CHANGE YOUR NETWORK UNTIL THE PROGRESS BAR IS FULL" title="Withdraw" />
					<Divider />
				</form>
				
			</Card>
			
				<LinearProgressWithLabel value={progress} />
			</div>
		);

	}
	
	else if (props.txProcess.length === 1 && start===false) {
		return (
			<Card {...rest} className={clsx(classes.root, className)}>
				<form>
					<CardHeader subheader="Withdraw From Matic Chain" title="Withdraw" />
					<Divider />
					<div>
						<CardActions>
							<Button color="primary" variant="outlined" onClick={ConfWithdraw(props.txProcess[0].txHash)}>
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
