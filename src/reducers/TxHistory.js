export function txHistory(state = [], action) {
    switch (action.type) {
        case 'TX_COMPLETE':
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
}