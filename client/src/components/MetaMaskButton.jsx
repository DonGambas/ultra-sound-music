import React  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import * as metaMask from '../utils/metaMask';
import * as Actions from '../redux/actions';

export class MetaMaskButton extends React.Component {
  static propTypes = {
    installMetaMask: PropTypes.func,
    connectToWallet: PropTypes.func
  }

  onClickInstall = () => {
    this.props.installMetaMask();
  }

  onClickConnect = () => {
    this.props.connectToWallet();
  }

  renderInstallButton() {
    return (
      <Button onClick={this.onClickInstall}>Click here to install MetaMask</Button>
    );
  }

  renderConnectButton() {
    return (
      <Button onClick={this.onClickConnect}>Connect to MetaMask</Button>
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

function mapDispatchToProps() {
  return {
    installMetaMask: Actions.installMetaMask,
    connectToWallet: Actions.connectToWallet
  }
}

export default connect(null, mapDispatchToProps)(MetaMaskButton);