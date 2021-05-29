import React  from 'react';
import EntityCard from './EntityCard';

import './Entities.scss';

export class Entities extends React.Component {
  renderArtists = () => {
    const artists = Array.from(Array(20));
    return artists.map((item, index) => <EntityCard key={index} />);
  }

  render() {
    return (
      <div className='Entities'>
        {this.renderArtists()}
      </div>
    );    
  }
}

export default Entities;