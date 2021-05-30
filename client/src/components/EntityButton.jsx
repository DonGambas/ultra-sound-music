import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import './EntityButton.scss';

const MAX_BAND_MEMBERS = 4;

export class EntityButton extends React.Component {
  static propTypes = {
    entityType: PropTypes.object,
    isOwned: PropTypes.bool,
    hasAlreadyPublishedTrack: PropTypes.bool,
    numBandMembersNeeded: PropTypes.number
  };

  render() {
    let ctaText = '';
    let isDisabled = false;
    if (this.props.entityType === 'track') {
      ctaText = 'Play';
    } else if (this.props.entityType === 'band') {
      if (hasAlreadyPublishedTrack) {
        ctaText = 'Already published track';
        isDisabled = true;
      } else if (isMember && numBandMembersNeeded >= MAX_BAND_MEMBERS) {
        ctaText = 'Publish track';
      } else if (isMember && numBandMembersNeeded < MAX_BAND_MEMBERS) {
        ctaText = 'Waiting for ${numBandMembersNeeded} to join';
        isDisabled = true;
      } else {
        ctaText = 'Join band';
      }
    }

    const props = {
      variant: 'primary',
      disabled: isDisabled
    };

    return (
      <Button {...props}>{ctaText} </Button>
    );
  }
}

export default EntityButton;