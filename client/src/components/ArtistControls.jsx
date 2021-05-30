import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { ethers } from 'ethers';
import * as Actions from '../redux/actions'
import usmAbi from '../web3/usmAbi';
import * as api from '../api';
import * as entitiesUtils from '../utils/entities';
import * as metaMask from '../utils/metaMask';

export class ArtistControls extends React.Component {
  static propTypes = {
    accountId: PropTypes.string,
    entities: PropTypes.array,
    showModal: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.nameRef = React.createRef()
    this.descriptionRef = React.createRef()
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
      const { data } = await api.createMetaDataUri({
        name: this.nameRef.current.value,
        description: this.descriptionRef.current.value,
      });      
      const ownedArtists = entitiesUtils.getOwnedArtists(this.props.entities, this.props.accountId);
      await writeContract.startBand(ownedArtists[0].tokenId, data.metadataUri);
    } catch (error) {
      this.nameRef.current.value = '';
      this.descriptionRef.current.value = '';
      this.props.showModal({
        title: 'Error',
        bodyText: error
      });
    }
  }

  render() {
    return (
      <div className='ArtistControls'>
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
        <Button onClick={this.onClickCreateBand}>Create Band</Button>
      </div>
    );    
  }
}

const mapDispatchToProps = {
  showModal: Actions.showModal
};

export default connect(null, mapDispatchToProps)(ArtistControls);