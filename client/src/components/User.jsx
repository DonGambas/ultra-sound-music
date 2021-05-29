import React  from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MetaMaskButton from './MetaMaskButton';
import { ethers } from 'ethers';  
import Controls from './Controls';
import * as metaMask from '../utils/metaMask';


import './User.scss';

export class User extends React.Component {
  state = {
    isConnectedToNetwork: false,
    isConnectedToAccount: false,
    chainId: '',
    accountId: ''
  }

  async componentDidMount() {
    const chainId = await metaMask.getChainId();
    const accountId = await metaMask.getAccountId();
    const isConnectedToAccount = await metaMask.isConnectedToAccount();
    const isConnectedToNetwork = metaMask.isConnectedToNetwork()

    this.setState({
      isConnectedToNetwork,
      isConnectedToAccount,
      chainId,
      accountId
    })

    ethereum.on('chainChanged', (chainId) => {
      this.setState({
        isConnectedToNetwork: !!chainId,
        chainId
      })
    })

    ethereum.on('accountsChanged', (accounts) => {
      const accountId = accounts[0];
      this.setState({
        isConnectedToAccount: !!accountId,
        accountId
      })
    });
  }

  async componentWillUnmount() {
    // @Todo need to remove ethereum event handlers
  }

  render() {
    const hasAlreadyMinted = false;
    let content;
    if (hasAlreadyMinted) {
      content = 'You\'ve already minted a token!!!'
    } else if (this.state.isConnectedToAccount) {
      content = <Controls />;
    } else {
      content = <MetaMaskButton />
    }

    let userInfo;
    if (this.state.isConnectedToNetwork) {
      userInfo = (
        <div>
            <p>{`Chain Id: ${this.state.chainId}`}</p>
            <p>{`Active wallet: ${this.state.accountId}`}</p> 
        </div>
      );
    } 

    return (
      <div className='User'>
        <Row>
          <Col>
            {userInfo}
            {content}
          </Col>
        </Row>
      </div>
    );
  }
}

export default User;