import React, { useState, useEffect }  from 'react';
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

import Alert from '@material-ui/lab/Alert';

const bs58 = require('bs58');

const Receiver = require('../../../../artifacts/Receiver.json')

const useStyles = makeStyles({
    root: {}
});

const UploadedFilesData = (props) => {
	const { className, ...rest } = props;

	const [ chainID, setChainID ] = useState(0)

	const [ hash, setHash] = useState([])

	const [ stateID, setStateID] = useState([])

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		window.web3.eth.net.getId().then((result)=>{
			setChainID(result)
			getDetails();
		})
		setLoading(false)
	},[]);

	const getDetails = async () => {
		try{
			let receiver = await new window.web3.eth.Contract(Receiver,"0x487e0C596F0B1D8A2ed921d590245dc36d2A4fb2")
			let states = await receiver.methods.getStatesOfAddress().call({from:window.from})
			let h = []
			let FileHash;
			for(let i = 0;i<states.length;i++){
				FileHash = await receiver.methods.getFileHash(states[i]).call({from:window.from})
				const hashHex = "1220" + FileHash.slice(2)
				const hashBytes = Buffer.from(hashHex, 'hex');
				const hash_base58 = bs58.encode(hashBytes)
				h.push(hash_base58)
			}
			setStateID(states)
			setHash(h)
			setLoading(false)
			console.log(h)
			console.log(states)
	
		}
		catch(err){
			console.log(err)
		}
	}


	const classes = useStyles();

	if(chainID===80001){
		return (
			<Card {...rest} className={clsx(classes.root, className)}>
				<Toolbar>
					<Typography variant="h2" id="tableTitle" component="div">
						Uploaded Files
					</Typography>
				</Toolbar>
				<CardContent className={classes.content}>
					<PerfectScrollbar>
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>State ID</TableCell>
										<TableCell>File Hash</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{hash.map((h,index) => (
										<TableRow key={h}>
											<TableCell align="centre">{stateID[index]}</TableCell>
											<TableCell component="th" scope="row">
												<a
													href={`https://ipfs.infura.io/ipfs/${h}`}
													target="_blank"
													rel="noopener noreferrer"
												>
													{h}
												</a>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</PerfectScrollbar>
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

UploadedFilesData.propTypes = {
	className: PropTypes.string,
	
};

export default UploadedFilesData;