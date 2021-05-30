import React  from 'react';
import PropTypes from 'prop-types';
// import CardDeck from 'react-bootstrap/CardDeck';
import EntityCard from './EntityCard';

import './Entities.scss';

export class Entities extends React.Component {
  static propTypes = {
    entities: PropTypes.array
  }

  static defaultProps = {
    entities: []
  }

  renderEntities = () => {
    const { entities } = this.props;
    if (!entities.length) {
      return;
    }

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
        addresses = [1,3,4,6];
      }

      const {
        name,
        description
      } = entity.metadata;

      const props  = {
        name,
        description,
        addresses
      };
debugger;
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