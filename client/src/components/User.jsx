import React from 'react';
import Button from 'react-bootstrap/Button';
import { togglePlayback, downloadAudio } from '../audio'

export class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nextPlayState: true
    }
  }

  render() {
    const { connectMetaMask, network, user, setUser } = this.props;

    return (
      <div style={{}}>
        <p>{`Chain Id: ${network.chainId}`}</p>
        <p>{`Is metamask: ${network.isMetaMask}`}</p>
        <p>{`IS connected: ${network.isConnected}`}</p>
        <p>{`Active wallet: ${user.wallet}`}</p>
        {!user.wallet &&
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
        }
      </div>
    );
  }
}

export default User;