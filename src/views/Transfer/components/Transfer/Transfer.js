import React, { useState } from 'react';
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

const Transfer = (props) => {
	const { className, ...rest } = props;

	const classes = useStyles();

	let [ loading, changeloading ] = useState(false);

	function random() {
		console.log(loading);
		changeloading((prevState) => (loading = !prevState));
		const a = 5,
			b = 10;
		const c = a * b;
		console.log(c);
		console.log(loading);
		changeloading((prevState) => (loading = !prevState));
	}
	const [ token, setToken ] = React.useState('');
	const [ open, setOpen ] = React.useState(false);

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
					<TextField fullWidth label="Transfer To" name="accoundid" variant="outlined" />
				</CardContent>
				{token === 'eth' && (
					<div>
						<CardContent>
							<TextField fullWidth label="Amount in Ether" name="amount" variant="outlined" />
						</CardContent>

						<Divider />
						<CardActions>
							<Button color="primary" variant="outlined" onClick={random}>
								Transfer
							</Button>
							<Divider />
							{loading && <CircularProgress />}
						</CardActions>
					</div>
				)}
				{token === 'erc20' && (
					<div>
						<CardContent>
							<TextField fullWidth label="Amount" name="amount" variant="outlined" />
						</CardContent>

						<Divider />
						<CardActions>
							<Button color="primary" variant="outlined" onClick={random}>
								Transfer
							</Button>
							<Divider />
							{loading && <CircularProgress />}
						</CardActions>
					</div>
				)}
				{token === 'erc721' && (
					<div>
						<CardContent>
							<TextField fullWidth label="Amount" name="amount" variant="outlined" />
						</CardContent>

						<Divider />
						<CardActions>
							<Button color="primary" variant="outlined" onClick={random}>
								Transfer
							</Button>
							<Divider />
							{loading && <CircularProgress />}
						</CardActions>
					</div>
				)}
			</form>
		</Card>
	);
};

Transfer.propTypes = {
	className: PropTypes.string
};

export default Transfer;
