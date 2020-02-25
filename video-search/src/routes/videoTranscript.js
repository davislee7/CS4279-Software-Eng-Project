import React, { Component } from 'react'
import styled from "styled-components"
import ReactPlayer from 'react-player'
import TranscriptTextBox from '../components/TranscriptTextBox'
import Logo from "../components/Logo"

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
            keyword: '', // keyword searche
            playing: false
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
                    <ReactPlayer ref={this.ref}
                    playing={this.state.playing}
                    style={{margin: "auto"}}
                    url="https://youtu.be/dQw4w9WgXcQ">
                    </ReactPlayer>
                </section>
                <Space></Space>
                <section>
                    <h1>Transcript</h1>
                    <TranscriptTextBox/>
                </section>
            </TranscriptBase>
        )
    }
}