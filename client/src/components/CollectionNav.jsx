import React  from 'react';
import Nav from 'react-bootstrap/Nav';

export class CollectionNav extends React.Component {
  render() {
    return (
      <div className="CollectionNav">
        <Nav variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/wild" eventKey="link-1">Out In The Wild</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/myCollection">My Collection</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );    
  }
}

export default CollectionNav;