// @TODO - Check chainID, if mismatch, then show message

import React from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { ethers } from 'ethers';
import { togglePlayback } from '../audio'
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
    this.nameRef = React.createRef();
    this.descriptionRef = React.createRef();
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
      const { data } = await api.createMetaDataUri({
        name: this.nameRef.current.value,
        description: this.descriptionRef.current.value,
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
        <Button onClick={this.onClickCreateArtist}>Create Artist</Button>
        {
          <>
            <Button style={{ width: BUTTON_WIDTH, height: "40px", margin: "8px" }} onClick={async () => {
              this.setState({ currentPlayState: await togglePlayback(this.props.accountId) })
            }}>{this.state.currentPlayState ? 'Stop Artist' : 'Play Artist'}</Button>
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