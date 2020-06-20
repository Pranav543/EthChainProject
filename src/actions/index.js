export const txComplete = (txHash, method, currency) => {
    return {
        type    : 'TX_COMPLETE',
        payload : {
            txHash,
            method,
            currency
        }
    };
};

export const txInProcess = (txHash) => {
    return {
        type    : 'TX_IN_PROCESS',
        payload : {
            txHash
        }
    };
};

export const txOutProcess = () => {
    return {
        type    : 'TX_OUT_PROCESS'
    };
};
