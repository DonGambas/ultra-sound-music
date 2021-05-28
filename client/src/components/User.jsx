import React  from 'react';
import Button from 'react-bootstrap/Button';

export class User extends React.Component {
  render() {
    const { connectMetaMask, network, user, setUser } = this.props;

    return (
      <div>
        <p>{`Chain Id: ${network.chainId}`}</p>
        <p>{`Is metamask: ${network.isMetaMask}`}</p>
        <p>{`IS connected: ${network.isConnected}`}</p>
        <p>{`Active wallet: ${user.wallet}`}</p>
        <Button style={{width:"250px", height:"50px"}} onClick={() => connectMetaMask(setUser)}>Connect Metamask</Button>
      </div>
    );    
  }
}

export default User;