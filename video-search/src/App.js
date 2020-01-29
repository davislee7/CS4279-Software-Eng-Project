import React from 'react';
import './App.css';
// import FunctComp from './components/FunctComp'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';
import FileDropWithButton from './components/FileDropWithButton'

// this is the audio file uploaded
var file;

// sets the file to the file successfully uploaded
// (this method is called in the FileDropWithButton component)
function setFile(newFile) {
  file = newFile;
}

function App() {
  return (
    <div className="App">
      <section>
        <h1>Video-Search</h1>
      </section>

      <section>
        <FileDropWithButton updateFile={setFile}/>
      </section>
    </div>
  );
}

export default App;
