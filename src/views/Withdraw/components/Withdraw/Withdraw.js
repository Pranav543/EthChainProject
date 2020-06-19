import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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

const Withdraw = (props) => {
	const { className, ...rest } = props;

	const classes = useStyles();

	let [ loading, changeloading ] = useState(false);

	const [ token, setToken ] = useState('');

	const [ open, setOpen ] = useState(false);

	const [ amount, setAmount ] = useState('');

	const withdraw = async () => {
		changeloading((prevState) => (loading = !prevState));

		//function

		changeloading((prevState) => (loading = !prevState));
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
								
								variant="outlined"
							/>
						</CardContent>

						<Divider />
						<CardActions>
							<Button color="primary" variant="outlined" onClick={Withdraw}>
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
							
								variant="outlined"
							/>
						</CardContent>

						<Divider />
						<CardActions>
							<Button color="primary" variant="outlined" onClick={Withdraw}>
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
};

Withdraw.propTypes = {
	className: PropTypes.string
};

export default Withdraw;
