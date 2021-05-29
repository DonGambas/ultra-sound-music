import React from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { ethers } from 'ethers';
import { togglePlayback, downloadAudio } from '../audio'
import * as Actions from '../redux/actions';
import * as metaMask from '../utils/metaMask';
import ArtistAbi from '../web3/ArtistAbi';

export class Controls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPlayState: false,
      currentHexAddress: '',
    }
  }

  static propTypes = {
    accountId: PropTypes.string
  }

  async createArtist() {
    const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

    const provider = metaMask.getProvider()
    let contract = new ethers.Contract(contractAddress, ArtistAbi, provider);
    let writeContract = new ethers.Contract(contractAddress, ArtistAbi, provider.getSigner());
    try {
      const fakeTokenId = `${Date.now()}`
      await writeContract.createArtist(fakeTokenId);
    } catch (error) {
      this.props.showModal({
        title: 'Error',
        bodyText: JSON.stringify(error)
      });
    }
  }

  onClickCreateArtist = () => {
    this.createArtist();
  }

  render() {
    return (
      <div className="Controls">
        <Button onClick={this.onClickCreateArtist}>Create Artist</Button>
        {
          <>
            <Button style={{ width: "250px", height: "40px", margin: "8px" }} onClick={async () => {
              this.setState({ currentPlayState: await togglePlayback(this.props.accountId) })
            }}>{this.state.currentPlayState ? 'Stop Audio' : 'Play Audio'}</Button>
            <Button style={{ width: "250px", height: "40px", margin: "8px" }} onClick={async () => {
              downloadAudio(this.props.accountId)
            }}>Download Audio</Button>
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