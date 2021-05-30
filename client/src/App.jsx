import React from 'react';
import PropTypes from 'prop-types';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CollectionNav from './components/CollectionNav';
import About from './components/About';
import User from './components/User';
import Alert from './components/Alert';
import Searchable from './components/Searchable';
import * as api from './api';
import * as metaMask from './utils/metaMask';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends React.Component {
  state = {
    entities: [],
    isConnectedToNetwork: false,
    isConnectedToAccount: false,
    chainId: '',
    accountId: ''
  }

  async componentDidMount() {
    const chainId = await metaMask.getChainId();
    const accountId = await metaMask.getAccountId();
    const isConnectedToAccount = await metaMask.isConnectedToAccount();
    const isConnectedToNetwork = metaMask.isConnectedToNetwork();

    this.setState({
      isConnectedToNetwork,
      isConnectedToAccount,
      chainId,
      accountId
    });    

    api.getAllEntities().then(({data}) => {
      this.setState({
        entities: data
      });
    });

    ethereum.on('chainChanged', (chainId) => {
      this.setState({
        isConnectedToNetwork: !!chainId,
        chainId
      });
    });

    ethereum.on('accountsChanged', (accounts) => {
      const accountId = accounts[0];
      this.setState({
        isConnectedToAccount: !!accountId,
        accountId
      });
    });    
  }

  render() {
    const {
      entities,
      isConnectedToNetwork,
      isConnectedToAccount,
      chainId,
      accountId
    } = this.state;

    const userProps = {
      entities,
      isConnectedToNetwork,
      isConnectedToAccount,
      chainId,
      accountId
    }

    return (
      <div>
        <Router>
          <div className="App">
            <Container>
              <Navbar bg="light" expand="lg">
                <Navbar.Brand><Link to="/">🦇 🔉 🎼 Ultra Sound Music Project</Link></Navbar.Brand>
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
                      <User {...userProps} />
                      <CollectionNav />
                      <Switch>
                        <Route path="/myCollection">
                          <Searchable entities={this.state.entities} owner={this.state.accountId} />
                        </Route>
                        <Route path="/">
                          <Searchable entities={this.state.entities} />
                        </Route>
                      </Switch>
                    </Route>
                  </Switch>
                </Col>
              </Row>
            </Container>
          </div>
        </Router>
        <Alert />
      </div>
    );
  }
}

export default App;
