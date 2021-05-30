import React from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import * as Actions from '../redux/actions';
import * as entityUtils from '../utils/entities';

import './EntityButton.scss';
import { connectToMetaMask } from '../utils/metaMask';

const MAX_BAND_MEMBERS = 4;

export class EntityButton extends React.Component {
  static propTypes = {
    currentAccountId: PropTypes.string,
    currentEntityId: PropTypes.string,
    tokenType: PropTypes.string,
    tokenId: PropTypes.number,
    currentAccountArtistId: PropTypes.number,
    isOwned: PropTypes.bool,
    isMember: PropTypes.bool,
    hasAlreadyPublishedTrack: PropTypes.bool,
    numBandMembersNeeded: PropTypes.number,
    showModal: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.descriptionRef = React.createRef();
  }

  onClickJoinBand = () => {
    this.joinBand();
  }

  onClickPublishTrack = () => {
    this.publishTrack();
  }

  async joinBand() {
    const {
      currentAccountArtistId, tokenId
    } = this.props;

    // @todo need artistId - however, the current account can have multiple artists to join from
    try {
      await entityUtils.joinBand(currentAccountArtistId, tokenId);    
    } catch (error) {
      this.props.showModal({
        title: 'Error',
        bodyText: JSON.stringify(error)
      });
    }
    
  }

  async publishTrack() {
    const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

    const provider = metaMask.getProvider();
    // const contract = new ethers.Contract(contractAddress, usmAbi, provider);
    const writeContract = new ethers.Contract(contractAddress, usmAbi, provider.getSigner());
    try {
      const { data } = await api.createMetaDataUri({
        name: this.nameRef.current.value,
        description: this.descriptionRef.current.value
      });
      await writeContract.createTrack(data.metadataUri);
    } catch (error) {
      this.props.showModal({
        title: 'Error',
        bodyText: JSON.stringify(error)
      });
    }    
  }

  render() {
    const {
      hasAlreadyPublishedTrack,
      numBandMembersNeeded,
      tokenType,
      isMember
    } = this.props;

    let ctaText = '';
    let isDisabled = false;
    let onClick = null;
    let buttons = null;
    if (this.props.tokenType === 'track') {
      ctaText = 'Play';
    } else if (tokenType === 'band') {
      if (false && hasAlreadyPublishedTrack) {
        ctaText = 'Already published track';
        isDisabled = true;
      } else if (isMember && numBandMembersNeeded >= MAX_BAND_MEMBERS) {
        buttons = (
          <InputGroup className="mb-3">
            <FormControl
              ref={this.nameRef}
              placeholder="Name"
              aria-label="Artist, Band, Track"
              aria-describedby="basic-addon2"            
            />
            <FormControl
              ref={this.descriptionRef}
              placeholder="Description"
              aria-label="Artist, Band, Track"
              aria-describedby="basic-addon2"            
            />          
          </InputGroup>           
        )
        onClick = this.onClickPublishTrack;
        ctaText = 'Publish track';
      } else if (isMember && numBandMembersNeeded < MAX_BAND_MEMBERS) {
        ctaText = `Waiting for ${numBandMembersNeeded} to join`;
        isDisabled = true;
      } else {
        ctaText = 'Join band';
        onClick = this.onClickJoinBand;
      }
    }

    const props = {
      variant: 'primary',
      disabled: isDisabled,
      onClick
    };

    if (!ctaText) {
      return null;
    }

    return (
      <div>
        {buttons}
        <Button {...props}>{ctaText} </Button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  showModal: Actions.showModal
};

export default connect(null, mapDispatchToProps)(EntityButton);