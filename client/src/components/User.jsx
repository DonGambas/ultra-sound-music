import React  from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MetaMaskButton from './MetaMaskButton';
import Controls from './Controls';
import { togglePlayback, downloadAudio } from '../audio'
import * as metaMask from '../utils/metaMask';

import './User.scss';

export class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nextPlayState: true
    }
  }

  state = {
    chainId: null,
    accountId: null
  }

  componentDidMount() {
    // Set the accountId && chainId
  }

  setAccountId = (accountId) => {
    this.setState({
      accountId
    });
  };

  onMetaMaskConnect = () => {
    
  }  

  render() {
    return (
      <div className='User'>
        <Row>
          <Col>
            <p>{`Chain Id: ${this.state.chainId}`}</p>
            <p>{`Active wallet: ${this.state.accountId}`}</p>
            <MetaMaskButton onConnect={this.setAccountId} />
          </Col>
          <Col>
            {/* {!user.wallet &&
              <Button style={{ width: "250px", height: "50px" }} onClick={() => connectMetaMask(setUser)}>Connect Metamask</Button>
            }
            {user.wallet?.length > 0 &&
              <>
                <Button if style={{ width: "250px", height: "40px", margin: "8px" }} onClick={() => {
                  togglePlayback(this.state.nextPlayState)
                  this.setState({ nextPlayState: !this.state.nextPlayState })
                }}>{this.state.nextPlayState ? 'Play Audio' : 'Stop Audio'}</Button>
                <Button if style={{ width: "250px", height: "40px", margin: "8px" }} onClick={() => {
                  downloadAudio()
                }}>Download Audio</Button>
              </>
            } */}
            <Controls />
          </Col>
        </Row>
      </div>
    );
  }
}

export default User;