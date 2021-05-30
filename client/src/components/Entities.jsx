import React  from 'react';
import PropTypes from 'prop-types';
// import CardDeck from 'react-bootstrap/CardDeck';
import EntityCard from './EntityCard';
import * as entitiesUtils from '../utils/entities';

import './Entities.scss';

export class Entities extends React.Component {
  static propTypes = {
    entities: PropTypes.array,
    currentAccountId: PropTypes.string
  }

  static defaultProps = {
    entities: []
  }

  renderEntities = () => {
    const {
      entities,
      currentAccountId
    } = this.props;

    if (!entities.length) {
      return;
    }
    
    const artists = entitiesUtils.getOwnedArtists(entities, currentAccountId);
    const currentAccountArtistId = artists[0].tokenId;

    return entities.map((entity, index) => {
      let addresses;
      if (entity.tokenType === 'band') {
        const artistId = +entity.creator;
        const artistEntity = entities.find((entity) => {
          return entity.tokenType === 'artist' && entity.tokenId === artistId          
        });
        addresses = [artistEntity.metadata.artistDNA];
      } else if (entity.tokenType === 'artist') {
        addresses = [entity.metadata.artistDNA]
      } else if (entity.tokenType === 'track') {
        addresses = [2,5,6];
      }

      const {
        name,
        description
      } = entity.metadata;

      const props  = {
        name,
        description,
        tokenId: entity.tokenId,
        tokenType: entity.tokenType,
        isOwned: entitiesUtils.entityIsOwned(entity, currentAccountId),
        isMember: entitiesUtils.isMember(entity, currentAccountId),
        hasAlreadyPublishedTrack: entitiesUtils.hasAlreadyPublishedTrack(entity, currentAccountId),
        numBandMembersNeeded: entity.tokenType === 'band' && (4 - entity.members.length),
        currentAccountArtistId,
        addresses
      };

      return <EntityCard key={index} {...props} />
    });
  }

  render() {
    return (
      <div className='Entities'>
          {this.renderEntities()}
      </div>
    );    
  }
}

export default Entities;