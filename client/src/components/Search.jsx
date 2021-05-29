import React  from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import './Search.scss';

export class Search extends React.Component {
  render() {
    return (
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Artist, Band, Track"
          aria-label="Artist, Band, Track"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>  
    )
  }
}

export default Search;