import React  from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import * as metaMask from '../utils/metaMask';

export class MetaMaskButton extends React.Component {
  static propTypes = {
    connectMetaMask: PropTypes.func
  }

  onClickInstall = async () => {
    try {
      // Will open the MetaMask UI
      // await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error(error);
    }
  }

  onClickConnect = () => {
    metaMask.requestAccessToWallet();
    metaMask.getAccountId().then((accountId) => {
      this.setAccountId(accountId)
    });
  }

  renderInstallButton() {
    return (
      <Button onClick={this.onClickInstall}>Click here to install MetaMask</Button>
    );
  }

  renderConnectButton() {
    return (
      <Button onClick={this.onClickConnect}>Connect</Button>
    );
  }

  render() {
    return (
      <div className="MetaMaskButton">
        {metaMask.isInstalled() ? this.renderConnectButton() : this.renderInstallButton()}
      </div>
    );    
  }
}

export default MetaMaskButton;