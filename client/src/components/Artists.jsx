import React  from 'react';

export class Artists extends React.Component {
  renderArtists = () => {
    const artists = Array.from(Array(20));
    return artists.map((item, index) => {
      return <div key={index}>Testing</div>
    });
  }

  render() {
    return (
      <div>
        {this.renderArtists()}
      </div>
    );    
  }
}

export default Artists;