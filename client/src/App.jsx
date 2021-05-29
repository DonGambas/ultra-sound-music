import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CollectionNav from './components/CollectionNav';
import About from './components/About';
import Home from './components/Home';
import NotConnectedModal from './components/NotConnectedModal';
import MyCollection from './components/MyCollection';
import Wild from './components/Wild';
import ArtistAbi from './web3/ArtistAbi';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

export class App extends React.Component {
  static propTypes = {
    shoulShowModal: PropTypes.bool    
  }

  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Container>
              <Navbar bg="light" expand="lg">
                <Navbar.Brand><Link to="/">🤘 Ultra Sound Music Project</Link></Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link href="/about">About</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link eventKey={2} href="">
                    Profile
                  </Nav.Link>
                </Nav>
              </Navbar>

              <Row>
                <Col>
                  <Switch>
                    <Route path="/about">
                      <About />
                    </Route>                    
                    <Route path="/">
                      <Home />
                      <CollectionNav />
                      <Switch>
                        <Route path="/myCollection">
                          <MyCollection />
                        </Route>
                        <Route path="/wild">
                          <Wild />
                        </Route>
                      </Switch>
                    </Route>
                  </Switch>            
                </Col>
              </Row>   
            </Container>
          </div>
        </Router>
        {this.props.shoulShowModal && <NotConnectedModal />} 
      </div>
    );    
  }
}

export function mapStateToProps(state) {
  return {
    shoulShowModal: state.modal.shoulShowModal
  }
}

export default connect(mapStateToProps)(App);

