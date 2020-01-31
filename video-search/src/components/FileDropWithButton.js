import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class FileDropWithButton extends Component
{
    constructor()
    {
        super()
        this.state = {
            buttonDisabled: true,
            uploadedFile: null,
            state: ""
        }
    }

    buttonClicked() {
        // once continue button is clicked update to new page
        this.props.updateNextPage();
    }

    fileUploadSuceed(file) {
        // update states when a file has been successfully uploaded
        this.setState({
            buttonDisabled: false,
            uploadedFile: file,
            message: "Success",
        }, 
        () => {console.log(this.state.uploadedFile)});

        // call the method in App to update file
        this.props.updateFile(file);
    }

    fileUploadFailed() {
        // update states when a file has failed to upload
        this.setState({
            buttonDisabled: true,
            message: "Failed",
        })
    }

    render()
    {
        return (
            <div>
                <section>
                    <Dropzone 
                        onDropAccepted={acceptedFiles => this.fileUploadSuceed(acceptedFiles)}
                        onDropRejected={() => this.fileUploadFailed()}
                        accept={'audio/x-m4a' || 'audio/mp3' || 'audio/wav'}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        </section>
                    )}
                    </Dropzone>
                </section>

                <section>
                    {this.state.message === "Success" ? <p style={{color: 'green'}}>You have successfully uploaded an audio file!</p>
                        : this.state.message === "Failed" ? <p style={{color: 'red'}}>File has failed to upload (Must be an audio file)</p> 
                        : <p style={{color: 'white'}}>.</p>}
                </section>

                <section>
                    <button 
                        style={{color: 'white', backgroundColor: this.state.buttonDisabled ? 'grey' : 'green'}}
                        disabled={this.state.buttonDisabled}
                        onClick={() => this.buttonClicked()}>Continue</button>
                </section>
            </div>
        )
    }
}

export default FileDropWithButton

