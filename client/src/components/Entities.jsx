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
    return entities.map((entity, index) => <EntityCard key={index} entity={entity} />);
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