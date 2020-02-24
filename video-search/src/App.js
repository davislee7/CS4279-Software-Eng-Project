import React, { Component } from 'react'
import styled from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";
import Upload from "./routes/upload"
import AudioTranscript from "./routes/audioTranscript"
import VideoTranscript from "./routes/videoTranscript"

const Base = styled.div`
  height: 100%;
`

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Base>
          <Route exact path="/"
            render={props => <Upload {...props}/>}/>
          <Route path="/audio"
            render={props => <AudioTranscript {...props}/>}/>
          <Route path="/video"
            render={props => <VideoTranscript {...props}/>}/>
        </Base>
      </BrowserRouter>
    )
  }
}

export default App;
