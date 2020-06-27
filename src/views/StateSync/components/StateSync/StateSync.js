import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import { DropzoneDialog } from 'material-ui-dropzone';
import { Card, CardHeader, CardContent, Divider, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';



const bs58 = require('bs58');

const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const Sender = require('../../../../artifacts/Sender.json')




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

const StateSync = (props) => {
	const { className, ...rest } = props;

	const classes = useStyles();

	const [ from, setFrom ] = useState([]);

	const [ open, setOpen ] = useState(false);

	const [ chainID, setChainID ] = useState(0)

	const [ buffer, setBuffer ] = useState(null);

	let [ txHash, settxHash ] = useState('');

	const handleChange = async(file) => {
		try{
			const reader = new FileReader()
    		reader.readAsArrayBuffer(file[0])
    		reader.onloadend = () => {
      		setBuffer(Buffer(reader.result))
      		console.log('buffer', buffer)
			}
		}
		catch(err){
			console.log("again")
		}
	}

	const handleSubmit = async(file) => {
		try{
			console.log(buffer)
			let sender = await new window.web3.eth.Contract(Sender,"0x2D929d34de4f48DB14F82dBb0e0639cD0D638A25")
			const file_bs58 = await ipfs.add(buffer);
			const file_bytes = bs58.decode(file_bs58[0].hash);
			const file_hex = '0x' + file_bytes.slice(2).toString('hex');
			console.log(file_hex)
			console.log(sender)
			const transaction = await sender.methods.sendState(file_hex).send({from})
			console.log(transaction.transactionHash)
			settxHash((txHash = transaction.transactionHash));
			setOpen(false);
		}
		catch(err){
			alert(err)
		}
	}

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	useEffect(() => {
		Accounts().then((result) => {
			const account = result;
			setFrom(account);
			window.web3.eth.net.getId().then((result)=>{
				setChainID(result)
			})
		});
	});

	if(chainID===5){
		return (
			<Card {...rest} className={clsx(classes.root, className)}>
				<CardHeader subheader="Upload Files to Matic Chain" title="Upload(State-Sync Feature)" />
				<Divider />
	
				<CardContent>
					<Button color="primary" variant="outlined" onClick={handleOpen}>
						Upload File
					</Button>
	
					<DropzoneDialog
						open={open}
						onSave={handleSubmit}
						onChange={handleChange}
						showPreviews={true}
						maxFileSize={50000000}
						onClose={handleClose}
					/>
					<Divider />
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
				</CardContent>
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

StateSync.propTypes = {
	className: PropTypes.string
};

export default StateSync;
