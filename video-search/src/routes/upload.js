import React, { Component } from 'react'
import styled from "styled-components"
import FileDropWithButton from "../components/FileDropWithButton"
import Logo from "../components/Logo"

import LoadingModal from "../components/loadingModal"

const UploadBase = styled.div`
    text-align: center;
    background-color: #e6ffe6;
    min-height: 100vh;
    height: 100%;
    min-width: 100vw;
    width: 100%;
`

export default class Upload extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null,
            isLoading: false
        }
  
        this.setFile = this.setFile.bind(this);
        this.pushToNextPage = this.pushToNextPage.bind(this);
    }

    // set file
    setFile(newFile) {
        console.log(newFile)
        this.setState({
            file: newFile
        })
    }

    // set nextPage to true (display new page)
    async pushToNextPage() {
        if (this.state.file != null && this.state.file.length > 0) {
            this.setState({
                isLoading: true
            })
            const file = this.state.file[0]
            let formData = new FormData();
            formData.append("uploadedFile", file)
            fetch("/api/v1/upload", {
                method: "POST",
                body: formData
            }).then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }).then((data) => {
                console.log("Success");
                this.setState({
                    isLoading: false
                })
                this.props.history.push("/audio/" + data)
            }).catch(e => {
                console.log("ERROR: ", e)
                // TODO: Handle error case
            })
        }

        // if (this.state.file[0].type === "audio/mp3") {
        //     this.props.history.push("/audio")
        // } else {
        //     this.props.history.push("/video")
        // }
    }

    render() {
        return (
            <UploadBase>
                { this.state.isLoading ? <LoadingModal></LoadingModal> : null }
                <Logo></Logo>
            
                <section>
                    <FileDropWithButton updateFile={this.setFile} updateNextPage={this.pushToNextPage}/>
                </section>
            </UploadBase>
        )
    }
}