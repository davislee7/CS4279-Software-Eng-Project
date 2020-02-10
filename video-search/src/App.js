import React, { Component } from 'react'
import './App.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import FunctComp from './components/FunctComp'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';
import FileDropWithButton from './components/FileDropWithButton'

class App extends Component {

  constructor()
  {
      super()
      this.state = {
          file: null, // this is the audio file uploaded
          nextPage: false, // if the 2nd page should be displayed
      }

      this.setFile = this.setFile.bind(this);
      this.updateNextPageTrue = this.updateNextPageTrue.bind(this);
  }

  // set file
  setFile(newFile) {
    this.setState({
      file: newFile
    })
  }

  // set nextPage to true (display new page)
  updateNextPageTrue() {
    this.setState({
      nextPage: true
    })
  }

  render()
  {
    // displaying 2nd page
    if(this.state.nextPage)
    {
      return (
        <div className="App">
        <section>
          <img
          src="logo.png"></img>
        </section>

        <section>
          <input type="text"
          style={{height: "5vh", fontSize: '24px'}}
          placeholder="Search.."></input>
        </section>
        <section style={{marginTop: "25px"}}>
          <AudioPlayer
          autoPlay
          style={{width: "50vw", margin: "auto"}}
          src="https://www.bensound.com/bensound-music/bensound-summer.mp3"
          onPlay={e => console.log("onPlay")}/>
        </section>
      </div>
      );
    }
    // displaying 1st page
    else
    {
      return (
        <div className="App">
          <section>
          <img
          src="logo.png"></img>
          </section>
    
          <section>
            <FileDropWithButton updateFile={this.setFile} updateNextPage={this.updateNextPageTrue}/>
          </section>
        </div>
      );
    }
  }
}

export default App;
