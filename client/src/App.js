
import React, { useEffect, useState } from 'react';

import logo from './logo.svg';
import './App.css';

const connectMetaMask = async (setUser) => {

  //check if ethereum object present on window

  if (typeof window.ethereum !== 'undefined') {
    const {ethereum} = window;

      //Request access to user's accounts

    const accounts = await ethereum.request({ method: 'eth_requestAccounts'})

    //set the first account in accounts array to the active user account

    const activeAccount = accounts[0]
    setUser({wallet: activeAccount})
  } else {
    alert("MetaMask Not Connected")
  }
};


const App = () => {

  const [network, setNetwork] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {

    (async () => {

        //check if ethereum object present on window

        if (typeof window.ethereum !== 'undefined') {

        const {ethereum } = window

        //get chainID from metamask, can be used to determine if user on mainnet, testnet etc

        const chainId =  await ethereum.request({ method: 'eth_chainId' })

        // determine if ethereum object is metamask
        const isMetaMask = ethereum.isMetaMask

        // determine if user is connected to metamsk
        const isConnected = ethereum.isConnected()
  
        setNetwork({chainId, isMetaMask, isConnected})
      
    }
  })()
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p style={{fontSize:72}}>🤘</p>
        <p>{`Chain Id: ${network.chainId}`}</p>
        <p>{`Is metamask: ${network.isMetaMask}`}</p>
        <p>{`IS connected: ${network.isConnected}`}</p>
        <p>{`Active wallet: ${user.wallet}`}</p>
        <button style={{width:"250px", height:"50px"}} onClick={() => connectMetaMask(setUser)}>Connect Metamask</button>
      </header>
    </div>
  );
}

export default App;
