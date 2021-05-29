import React  from 'react';
import Button from 'react-bootstrap/Button';
import { togglePlayback, downloadAudio } from '../audio'

export class Controls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nextPlayState: true
    }
  }
  
  render() {
    return (
      <div className="Controls">
        <Button if style={{ width: "250px", height: "40px", margin: "8px" }} onClick={() => {
          togglePlayback(this.state.nextPlayState)
          this.setState({ nextPlayState: !this.state.nextPlayState })
        }}>{this.state.nextPlayState ? 'Play Audio' : 'Stop Audio'}</Button>
        <Button if style={{ width: "250px", height: "40px", margin: "8px" }} onClick={() => {
          downloadAudio()
        }}>Download Audio</Button>
      </div>
    );    
  }
}

export default Controls;