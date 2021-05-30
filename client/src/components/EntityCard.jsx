import React  from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import EntityButton from './EntityButton';

import './EntityCard.scss';

export class EntityCard extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
  };

  render() {
    const {
      name,
      description
    } = this.props;

    const buttonProps  = {

    };

    return (
      <Card className='EntityCard'>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>name</Card.Title>
          <Card.Text>{description}</Card.Text>
          <EntityButton {...buttonProps} />
        </Card.Body>
      </Card>  
    );    
  }
}

export default EntityCard;