import React, { Component } from 'react'
import styled from "styled-components"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
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

export default class AudioTranscript extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyword: '', // keyword searched
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
                    this.player.audio.currentTime = 45;
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
        console.log("RENDER")
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
                    <AudioPlayer
                    fullPlayer
                    style={{width: "50vw", margin: "auto", backgroundColor: 'green'}}
                    src="https://www.bensound.com/bensound-music/bensound-summer.mp3"
                    onPlay={e => console.log("onPlay")}
                    ref={this.ref}
                    playing={this.state.playing}/>
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