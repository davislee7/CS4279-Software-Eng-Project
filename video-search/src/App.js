import React, { Component } from 'react'
import styled from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";
import Upload from "./routes/upload"
import AudioTranscript from "./routes/audioTranscript"
import VideoTranscript from "./routes/videoTranscript"

const Base = styled.div`
  height: 100%;
  min-height: 100vh;
`

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Base>
          <Route exact path="/"
            render={props => <Upload {...props}/>}/>
          <Route path="/audio/:id"
            render={props => <AudioTranscript {...props}/>}/>
          <Route path="/video/:id"
            render={props => <VideoTranscript {...props}/>}/>
        </Base>
      </BrowserRouter>
    )
  }
}

export default App;
