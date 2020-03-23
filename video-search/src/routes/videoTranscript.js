import React, { Component } from 'react'
import styled from "styled-components"
import ReactPlayer from 'react-player'
import TranscriptTextBox from '../components/TranscriptTextBox'
import Logo from "../components/Logo"

import TranscriptEditor from "@bbc/react-transcript-editor";
import transcriptJson from "../transcript.json"

const TranscriptBase = styled.div`
    text-align: center;
    background-color: #e6ffe6;
    height: auto;
`

const Space = styled.div`
    height: 25px;
    display: block;
`

export default class VideoTranscript extends Component {

    constructor(props) {
        super(props)
        this.vidPlayer = null;
        this.state = {
            keyword: '', // keyword search
            playing: false,
            loading: true,
        }
        this.changeKeyword = this.changeKeyword.bind(this);
    }

    changeKeyword(event) {
        if(event.key === 'Enter'){
            this.setState({
                keyword: event.target.value
            }, () => {
                console.log(this.state.keyword)
            })
            if(this.state.keyword.match("demo test")){
                if (this.player) {
                    this.player.seekTo(45, "seconds")
                    this.setState({
                        playing: true
                    })
                }
            }
        }
     }

    ref = player => {
        this.player = player
    }

    render() {
        return (
            <TranscriptBase>
                <Logo></Logo>
                <Space></Space>
                <section>
                    <input type="text"
                    style={{height: "5vh", fontSize: '24px', borderRadius: '25px', paddingLeft: '25px', paddingRight: '25px'}}
                    placeholder="Search..."
                    onKeyPress={this.changeKeyword}></input>
                </section>
                <Space></Space>
                <section>
                </section>
                <Space></Space>
                <section>
                <TranscriptEditor
                    transcriptData={transcriptJson}
                    mediaUrl={"https://download.ted.com/talks/KateDarling_2018S-950k.mp4"}
                    sttJsonType={"bbckaldi"}
                    title={"My title"}
                    mediaType={"video"}
                    />
                </section>
                }
            </TranscriptBase>
        )
    }
}