import React  from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MetaMaskButton from './MetaMaskButton';
import ArtistControls from './ArtistControls';
import Controls from './Controls';
import Canvas from './Canvas';
import * as entitiesUtils from '../utils/entities';
import * as metaMask from '../utils/metaMask';


import './User.scss';
import { debug } from 'tone';

export class User extends React.Component {
  static propTypes = {
    entities: PropTypes.array 
  }

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
    const isConnectedToNetwork = metaMask.isConnectedToNetwork();

    this.setState({
      isConnectedToNetwork,
      isConnectedToAccount,
      chainId,
      accountId
    });

    ethereum.on('chainChanged', (chainId) => {
      this.setState({
        isConnectedToNetwork: !!chainId,
        chainId
      });
    });

    ethereum.on('accountsChanged', (accounts) => {
      const accountId = accounts[0];
      this.setState({
        isConnectedToAccount: !!accountId,
        accountId
      });
    });
  }

  async componentWillUnmount() {
    // @Todo need to remove ethereum event handlers
  }

  render() {
    const hasAlreadyMintedAnArtist = entitiesUtils.hasAlreadyMintedAnArtist(this.props.entities, this.state.accountId);
    const hasAlreadyMintedABand = entitiesUtils.hasAlreadyMintedABand(this.props.entities, this.state.accountId);
  
    let content;
    if (hasAlreadyMintedABand) {
      content = 'Now Just Publish Some Tracks';
    } else if (hasAlreadyMintedAnArtist) {
      content = <ArtistControls accountId={this.state.accountId} entities={this.props.entities} />;
    } else if (this.state.isConnectedToAccount) {
      content = <Controls accountId={this.state.accountId} />;
    } else {
      content = <MetaMaskButton />;
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

    let canvas = <Canvas address={this.state.accountId} />;

    return (
      <div className='User'>
        <Row>
          <Col>
            {userInfo}
            {canvas}
            {content}
          </Col>
        </Row>
      </div>
    );
  }
}

export default User;