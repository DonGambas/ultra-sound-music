// @TODO - Check chainID, if mismatch, then show message

import React from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { ethers } from 'ethers';
import { togglePlayback, downloadAudio, toggleTrackAudioPlayback } from '../audio'
import * as Actions from '../redux/actions';
import * as metaMask from '../utils/metaMask';
import usmAbi from '../web3/usmAbi';
import * as api from '../api';

const BUTTON_WIDTH = "110px"

export class Controls extends React.Component {
  static propTypes = {
    accountId: PropTypes.string
  }
 
  constructor(props) {
    super(props);
    this.state = {
      currentPlayState: false,
      currentTrackPlayState: false,
      currentHexAddress: '',
    };
  }

  onClickCreateArtist = () => {
    this.createArtist();
  }

  async createArtist() {
    const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

    const provider = metaMask.getProvider();
    // const contract = new ethers.Contract(contractAddress, usmAbi, provider);
    const writeContract = new ethers.Contract(contractAddress, usmAbi, provider.getSigner());
    try {
      // const fakeTokenId = `${Date.now()}`;
      const { data } = await api.createMetaDataUri({
        name: 'bubsy',
        description: 'bubsy\'s cooll token!',
        artistDNA: this.props.accountId
      });
      await writeContract.createArtist(data.metadataUri);
    } catch (error) {
      this.props.showModal({
        title: 'Error',
        bodyText: JSON.stringify(error)
      });
    }
  }

  render() {
    return (
      <div className="Controls">
        <Button onClick={this.onClickCreateArtist}>Create Artist</Button>
        {
          <>
            <Button style={{ width: BUTTON_WIDTH, height: "40px", margin: "8px" }} onClick={async () => {
              this.setState({ currentPlayState: await togglePlayback(this.props.accountId) })
            }}>{this.state.currentPlayState ? 'Stop Artist' : 'Play Artist'}</Button>
            <Button style={{ width: BUTTON_WIDTH, height: "40px", margin: "8px" }} onClick={async () => {
              downloadAudio(this.props.accountId)
            }}>Save Audio</Button>
            <Button style={{ width: BUTTON_WIDTH, height: "40px", margin: "8px" }} onClick={async () => {
              this.setState({ currentTrackPlayState: await toggleTrackAudioPlayback() })
            }}>{this.state.currentTrackPlayState ? 'Stop Track' : 'Play Track'}</Button>
          </>
        }
      </div>
    );
  }
}

const mapDispatchToProps = {
  showModal: Actions.showModal
};

export default connect(null, mapDispatchToProps)(Controls);