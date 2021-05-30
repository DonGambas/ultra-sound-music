import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { ethers } from 'ethers';
import * as Actions from '../redux/actions'
import usmAbi from '../web3/usmAbi';
import * as entitiesUtils from '../utils/entities';
import * as metaMask from '../utils/metaMask';

export class ArtistControls extends React.Component {
  static propTypes = {
    accountId: PropTypes.string,
    entities: PropTypes.array,
    showModal: PropTypes.func
  }

  onClickCreateBand = () => {
    this.createBand();
  }

  async createBand() {
    const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

    const provider = metaMask.getProvider();
    const contract = new ethers.Contract(contractAddress, usmAbi, provider);
    const writeContract = new ethers.Contract(contractAddress, usmAbi, provider.getSigner());
    try {
      const ownedArtists = entitiesUtils.getOwnedArtists(this.props.entities, this.props.accountId);
      await writeContract.startBand(ownedArtists[0].tokenId);
    } catch (error) {
      this.props.showModal({
        title: 'Error',
        bodyText: JSON.stringify(error)
      });
    }
  }

  render() {
    return (
      <div className='ArtistControls'>
        <Button onClick={this.onClickCreateBand}>Create Band</Button>
      </div>
    );    
  }
}

const mapDispatchToProps = {
  showModal: Actions.showModal
};

export default connect(null, mapDispatchToProps)(ArtistControls);