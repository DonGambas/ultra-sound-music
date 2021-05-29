import React  from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Search from './Search';
import Entities from './Entities';

export class Searchable extends React.Component {
  static propTypes = {
    entities: PropTypes.array
  };

  state = {
    isFiltered: false,
    filteredEntities: []
  }

  setFilteredEntities(entities) {
    this.setState({
      isFiltered: !!entities,
      filteredEntities: entities
    })
  }

  onChange = (search) => {
    this.filterEntities(search);
  }

  onClear = () => {
    this.setFilteredEntities();
  }

  filterEntities(filter) {
    const entities = this.props.entities.filter((entity) => {
      return Object.values(entity).join(' ').includes(filter);
    })

    this.setFilteredEntities(entities);
  }

  render() {
    const entities = this.state.isFiltered ? this.state.filteredEntities : this.props.entities;

    return (
      <div className="Searchable">
        <Search onChange={this.onChange} onClear={this.onClear} />
        <Navbar bg="light" expand="lg">
          <Nav.Link>Artists</Nav.Link>
          <Nav.Link>Bands</Nav.Link>
          <Nav.Link>Tracks</Nav.Link>
        </Navbar>
        <Entities entities={entities} />
      </div>      
    );
  }
}

export default Searchable;