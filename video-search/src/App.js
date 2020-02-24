import React, { Component } from 'react'
import styled from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";
import Upload from "./routes/upload"
import Transcript from "./routes/transcript"

const Base = styled.div`
  height: 100%;
`

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Base>
          <Route path="/upload"
            render={props => <Upload {...props}/>}/>
          <Route path="/transcript"
            render={props => <Transcript {...props}/>}/>
        </Base>
      </BrowserRouter>
    )
  }
}

export default App;
