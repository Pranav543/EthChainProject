import Web3 from 'web3';

const getWeb3 = () => new Promise((resolve) => {
  window.addEventListener('load', () => {
    let currentWeb3;

    if (window.ethereum) {
      currentWeb3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable();
        resolve(currentWeb3);
      } catch (error) {
        alert('Please allow access for the app to work');
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      resolve(currentWeb3);
    } else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  });
});


export default getWeb3;