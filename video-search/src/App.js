import React, { Component } from 'react'
import './App.css';
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
          <h1>Video-Search</h1>
        </section>
  
        <section>
          <h1 style={{color: 'blue'}}>This is the next page!</h1>
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
            <h1>Video-Search</h1>
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