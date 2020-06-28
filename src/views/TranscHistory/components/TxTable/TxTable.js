import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardContent,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	Paper,
	Toolbar,
	TableContainer
} from '@material-ui/core';

const useStyles = makeStyles({
	table: {
		minWidth: 700
	},
	content: {
		padding: 0
	}
});

const TxTable = (props) => {
	const { className, txHistory, ...rest } = props;
	console.log(txHistory);

	const classes = useStyles();

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<Toolbar>
				<Typography variant="h2" id="tableTitle" component="div">
					Transaction History
				</Typography>
			</Toolbar>
			<CardContent className={classes.content}>
				<PerfectScrollbar>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Transaction Hash</TableCell>
									<TableCell align="centre">Method</TableCell>
									<TableCell align="centre">Token</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{txHistory.map((tx) => (
									<TableRow key={tx.txHash}>
										{tx.method === 'Deposit' && (
											<TableCell component="th" scope="row">
												<a
													href={`https://goerli.etherscan.io/tx/${tx.txHash}`}
													target="_blank"
													rel="noopener noreferrer"
												>
													{tx.txHash}
												</a>
											</TableCell>
										)}
										{tx.method === 'Transfer' && (
											<TableCell component="th" scope="row">
												<a
													href={`https://mumbai-explorer.matic.today/tx/${tx.txHash}/token_transfers`}
													target="_blank"
													rel="noopener noreferrer"
												>
													{tx.txHash}
												</a>
											</TableCell>
										)}
										{tx.method === 'Confirm Withdraw' && (
											<TableCell component="th" scope="row">
												<a
													href={`https://goerli.etherscan.io/tx/${tx.txHash}`}
													target="_blank"
													rel="noopener noreferrer"
												>
													{tx.txHash}
												</a>
											</TableCell>
										)}
										{tx.method === 'Exit Withdraw' && (
											<TableCell component="th" scope="row">
												<a
													href={`https://goerli.etherscan.io/tx/${tx.txHash}`}
													target="_blank"
													rel="noopener noreferrer"
												>
													{tx.txHash}
												</a>
											</TableCell>
										)}
										{tx.method === 'Initial Withdraw' && (
											<TableCell component="th" scope="row">
												<a
													href={`https://mumbai-explorer.matic.today/tx/${tx.txHash}/token_transfers`}
													target="_blank"
													rel="noopener noreferrer"
												>
													{tx.txHash}
												</a>
											</TableCell>
										)}
										<TableCell align="centre">{tx.method}</TableCell>
										<TableCell align="centre">{tx.currency}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</PerfectScrollbar>
			</CardContent>
		</Card>
	);
};

TxTable.propTypes = {
	className: PropTypes.string,
	txHistory: PropTypes.array.isRequired
};

export default TxTable;
