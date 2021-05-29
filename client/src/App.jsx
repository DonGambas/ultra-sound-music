import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ethers } from "ethers";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import * as metaMask from './utils/metaMask';
import Search from './components/Search';
import Entities from './components/Entities';
import About from './components/About';
import Home from './components/Home';
import User from './components/User';
import Artists from './components/Artists';
import Bands from './components/Bands';
import Tracks from './components/Tracks';
import NotConnectedModal from './components/NotConnectedModal';
import ArtistAbi from './web3/ArtistAbi';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

export class App extends React.Component {
  propTypes = {
    user: PropTypes.object,
    entities: PropTypes.array
  }

  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Container>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand><Link to="/">🤘 Ultra Sount Music Project</Link></Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/about">About</Nav.Link>
              </Nav>
              <Nav>
              <Nav.Link eventKey={2} href="#memes">
                Profile
              </Nav.Link>
              </Nav>
            </Navbar>
  
            <User />
            <Search />
            <Navbar bg="light" expand="lg">
              <Nav.Link>Artists</Nav.Link>
              <Nav.Link>Bands</Nav.Link>
              <Nav.Link>Tracks</Nav.Link>
            </Navbar>
            <Entities />
  
            <Row>
              <Col>
                <Switch>
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route path="/artists">
                    <Artists />
                  </Route>
                  <Route path="/bands">
                    <Bands />
                  </Route>
                  <Route path="/tracks">
                    <Tracks />
                  </Route>                                    
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </Col>
            </Row>
            </Container>
          </div>     
        </Router>
        <NotConnectedModal />
        </div>
    );    
  }
}

export default App;
