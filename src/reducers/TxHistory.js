export function txHistory(state = [], action) {
	switch (action.type) {
		case 'TX_COMPLETE':
			return [ action.payload, ...state ];
		default:
			return state;
	}
}
