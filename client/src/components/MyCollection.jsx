import React  from 'react';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import Search from './Search';
import Entities from './Entities';

export class MyCollection extends React.Component {
  propTypes = {
    getEntities: PropTypes.func
  }

  state = {
    entities: []
  }

  setEntities(entities) {
    this.setState({
      entities
    });
  }
  
  render() {
    return (
      <div className="MyCollection">
        <Entities entities={this.state.entities} />
      </div>
    );    
  }
}

export default MyCollection;