
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ethers } from "ethers";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import About from './components/About';
import Home from './components/Home';
import User from './components/User';
import Artists from './components/Artists';
import Bands from './components/Bands';
import Tracks from './components/Tracks';
import NotConnectedModal from './components/NotConnectedModal';
import ArtistAbi from './web3/ArtistAbi';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

const connectMetaMask = async (setUser) => {

  //check if ethereum object present on window

  if (typeof window.ethereum !== 'undefined') {
    const {ethereum} = window;

    // const provider = new ethers.providers.Web3Provider(ethereum);  //Request access to user's accounts
    // const signer = provider.getSigner();

    // const ArtistTokenContract = new ethers.Contract(address, ArtistAbi, signer);
    // window.signer = signer;
    // window.ArtistTokenContract = ArtistTokenContract; 
    
    
    // const daiWithSigner = ArtistTokenContract.connect(signer);
    // console.log(daiWithSigner);


    //set the first account in accounts array to the active user account
    const accounts = await ethereum.request({method: 'eth_requestAccounts'})
    const activeAccount = accounts[0] || 'Not able to get accounts';
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

  const userProps = {
    connectMetaMask,
    network,
    user,
    setUser    
  };

  return (
    <div>
      <Router>
        <div className="App">
          <Container>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand><Link to="/">🤘 Ultra Sount Music Project</Link></Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link to="/about">About</Nav.Link>
              <Nav.Link to="/users">Users</Nav.Link>
              <Nav.Link to="/artists">Artists</Nav.Link>
              <Nav.Link to="/bands">Bands</Nav.Link>
              <Nav.Link to="/tracks">Tracks</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link eventKey={2} href="#memes">
              Profile
            </Nav.Link>
            </Nav>
          </Navbar>

          <User {...userProps} />

          <Row>
            <Col>
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/artists">
                  <Artists />
                </Route>
                <Route path="/bands">
                  <Bands />
                </Route>
                <Route path="/tracks">
                  <Tracks />
                </Route>                                    
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Col>
          </Row>
          </Container>
        </div>     
      </Router>
      <NotConnectedModal />
      </div>
  );
}

export default App;
