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
    isOwned: PropTypes.bool,
    isMember: PropTypes.bool,
    hasAlreadyPublishedTrack: PropTypes.bool,
    numBandMembersNeeded: PropTypes.number
  };

  render() {
    const {
      name,
      description,
      tokenType,
      isOwned,
      isMember,
      hasAlreadyPublishedTrack,
      numBandMembersNeeded,
      addresses
    } = this.props;

    const buttonProps  = {
      tokenType: tokenType,
      isOwned,
      isMember,
      hasAlreadyPublishedTrack,
      numBandMembersNeeded
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