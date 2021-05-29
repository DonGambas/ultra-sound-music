import React  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// import * as metaMask from './utils/metaMask';

import User from './User';

export class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <User />
      </div>
    );    
  }
}

export default Home;