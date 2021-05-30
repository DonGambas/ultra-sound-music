import React  from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import EntityButton from './EntityButton';
import Canvas from './Canvas';

import './EntityCard.scss';

export class EntityCard extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    addresses: PropTypes.array,
    tokenType: PropTypes.string,
    tokenId: PropTypes.number,
    isOwned: PropTypes.bool,
    isMember: PropTypes.bool,
    hasAlreadyPublishedTrack: PropTypes.bool,
    numBandMembersNeeded: PropTypes.number,
    currentAccountArtistId: PropTypes.number,
    updateTransactionHash: PropTypes.func
  };

  render() {
    const {
      name,
      description,
      tokenType,
      tokenId,
      isOwned,
      isMember,
      hasAlreadyPublishedTrack,
      numBandMembersNeeded,
      currentAccountArtistId,
      updateTransactionHash,
      addresses
    } = this.props;

    const buttonProps  = {
      tokenType,
      tokenId,
      isOwned,
      isMember,
      hasAlreadyPublishedTrack,
      numBandMembersNeeded,
      currentAccountArtistId, 
      tokenId,
      updateTransactionHash
    };

    return (
      <Card className='EntityCard'>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <EntityButton {...buttonProps} />
        </Card.Body>
      </Card>  
    );    
  }
}

export default EntityCard;