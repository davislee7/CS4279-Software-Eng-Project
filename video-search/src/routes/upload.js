import React, { Component } from 'react'
import styled from "styled-components"
import FileDropWithButton from "../components/FileDropWithButton"
import Logo from "../components/Logo"

const UploadBase = styled.div`
    text-align: center;
    background-color: #e6ffe6;
    height: 100vh;
`

export default class Upload extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
  
        this.setFile = this.setFile.bind(this);
        this.pushToNextPage = this.pushToNextPage.bind(this);
    }

    // set file
    setFile(newFile) {
        this.setState({
            file: newFile
        })
    }

    // set nextPage to true (display new page)
    pushToNextPage() {
        if (this.state.file[0].type === "audio/mp3") {
            this.props.history.push("/audio")
        } else {
            this.props.history.push("/video")
        }
    }

    render() {
        return (
            <UploadBase>
                <Logo></Logo>
            
                <section>
                    <FileDropWithButton updateFile={this.setFile} updateNextPage={this.pushToNextPage}/>
                </section>
            </UploadBase>
        )
    }
}