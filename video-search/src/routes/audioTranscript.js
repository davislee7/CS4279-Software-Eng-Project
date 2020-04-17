import React, { Component } from 'react'
import styled from "styled-components"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import TranscriptTextBox from '../components/TranscriptTextBox'
import Loader from "react-spinners/ClipLoader";
import Logo from "../components/Logo"
import TranscriptEditor from "@bbc/react-transcript-editor";

const TranscriptBase = styled.div`
    text-align: center;
    background-color: #e6ffe6;
    height: auto;
`

export default class AudioTranscript extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyword: '', // keyword searched
            playing: false,
            loading: true,
        }
        this.changeKeyword = this.changeKeyword.bind(this);
        this.stopLoadSpinning = this.stopLoadSpinning.bind(this);
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

    stopLoadSpinning() {
        this.setState({
            loading: false
        });
     }

    ref = player => {
        this.player = player
      }

    render() {
        return (
            <TranscriptBase>
                <Logo></Logo>

                <section style={{marginTop: "25px"}}>
                    <input type="text"
                    style={{height: "5vh", fontSize: '24px', borderRadius: '25px', paddingLeft: '25px', paddingRight: '25px'}}
                    placeholder="Search..."
                    onKeyPress={this.changeKeyword}></input>
                </section>

                <section style={{marginTop: "25px"}}>
                    <Loader
                        size={327}
                        color={"#006600"}
                        loading={this.state.loading}
                    />
                </section>

                <section style={{marginTop: "25px"}}>
                    <AudioPlayer
                    fullPlayer
                    style={{width: "50vw", margin: "auto", backgroundColor: 'green'}}
                    src="https://www.bensound.com/bensound-music/bensound-summer.mp3"
                    onPlay={e => console.log("onPlay")}
                    ref={this.ref}
                    playing={this.state.playing}
                    onCanPlay={this.stopLoadSpinning}/>
                </section>

                { this.state.loading ? 
                <section style={{marginTop: "25px"}}>
                    <Loader
                        size={327}
                        color={"#006600"}
                        loading={this.state.loading}
                    />
                </section>
                :
                <section style={{marginTop: "25px"}}>
                    <h1>Transcript</h1>
                    <TranscriptTextBox/>
                </section>
                }


            </TranscriptBase>
        )
    }
}