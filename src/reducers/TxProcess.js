export function txProcess(state = [], action) {
	switch (action.type) {
		case 'TX_IN_PROCESS':
			console.log(state);
			return [ ...state, action.payload ];
		case 'TX_OUT_PROCESS':
			console.log(state);
			state.splice(0, state.length);
			return state;
		default:
			return state;
	}
}
