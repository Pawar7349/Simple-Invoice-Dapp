import { useState, useEffect } from 'react';
import Web3 from 'web3';
import SimpleInvoice from '../contract/SimpleInvoice.json';

const useSimpleInvoice = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = SimpleInvoice.networks[networkId];

          if (deployedNetwork) {
            const contractInstance = new web3Instance.eth.Contract(
              SimpleInvoice.abi,
              deployedNetwork.address
            );
            setContract(contractInstance);
          } else {
            console.error("Smart contract not deployed to detected network.");
          }
        } catch (error) {
          console.error("Error connecting to web3:", error);
        }
      } else {
        console.error("MetaMask is not installed. Please install it to use this app.");
      }
    };

    initWeb3();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
      });

      window.ethereum.on('chainChanged', async () => {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = SimpleInvoice.networks[networkId];
        if (deployedNetwork) {
          const contractInstance = new web3Instance.eth.Contract(
            SimpleInvoice.abi,
            deployedNetwork.address
          );
          setContract(contractInstance);
        }
      });
    }
  }, []);

  return { web3, contract, account };
};

export default useSimpleInvoice;
