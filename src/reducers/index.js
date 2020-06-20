import { combineReducers } from 'redux';
import { txHistory } from './TxHistory';
import {txProcess} from './TxProcess'

export default combineReducers({
	txHistory,
	txProcess
});
