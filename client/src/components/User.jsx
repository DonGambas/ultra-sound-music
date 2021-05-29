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

  componentDidMount() {
    // Set the accountId && chainId
  }

  onMetaMaskConnect = () => {
    
  }  

  render() {
    return (
      <div className='User'>
        <Row>
          <Col>
            <p>{`Chain Id: ${this.props.chainId}`}</p>
            <p>{`Active wallet: ${this.props.accountId}`}</p>
            <MetaMaskButton />
          </Col>
        </Row>
        <Row>
          <Controls />
        </Row>
        <Row>
          <Col>
            <div className="">
              You've already minted a token!!!
            </div>
          </Col>
        </Row>        
        <Row>
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
        </Row>
      </div>
    );
  }
}

export default User;