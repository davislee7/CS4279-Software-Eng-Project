import React, { Component } from 'react'
import styled from "styled-components"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import TranscriptTextBox from '../components/TranscriptTextBox'
import Loader from "react-spinners/ClipLoader";
import Logo from "../components/Logo"
import TranscriptEditor from "@bbc/react-transcript-editor";

import DEMO_TRANSCRIPT from "../sample-data/demo.json";

const TranscriptBase = styled.div`
    text-align: center;
    background-color: #e6ffe6;
    min-height: 100vh;
    height: 100%;
    min-width: 100vw;
    width: 100%;
`

export default class AudioTranscript extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyword: '', // keyword searched
            playing: false,
            isLoading: true,
            transcript: null
        }
        this.changeKeyword = this.changeKeyword.bind(this);
    }

    async componentDidMount() {
        try {
            let response = await fetch(`/api/v1/transcript?id=${this.props.match.params.id}`)
            let data = await response.json()
            this.setState({
                isLoading: false,
                transcript: data
            })
            console.log(data)
        } catch(e) {
            console.log("FAILED")
        }
    }

    changeKeyword(event) {
        if(event.key === 'Enter'){
            this.setState({
                keyword: event.target.value
            }, () => {
                console.log(this.state.keyword)
            })

            // if(this.state.keyword.match("demo test")){
            //     if (this.player) {
            //         this.player.audio.currentTime = 45;
            //         this.setState({
            //             playing: true
            //         })
            //     }
            // }
        }
    }

    render() {
        return (
            <TranscriptBase>
                <Logo></Logo>
                {this.state.isLoading ? 
                <section style={{marginTop: "25px"}}>
                    <Loader
                        size={327}
                        color={"#006600"}
                        loading={true}
                    />
                </section> : 
                <div>
                    <section style={{marginTop: "25px"}}>
                        <input type="text"
                        style={{height: "5vh", fontSize: '24px', borderRadius: '25px', paddingLeft: '25px', paddingRight: '25px'}}
                        placeholder="Search..."
                        onKeyPress={this.changeKeyword}></input>
                    </section>
                    
                    <section style={{marginTop: "25px"}}>
                        <TranscriptEditor
                            transcriptData={this.state.transcript}
                            mediaUrl={`/api/v1/audio?id=${this.props.match.params.id}`}
                            isEditable={false}
                            spellCheck={false}
                            sttJsonType={"bbckaldi"}
                            title={this.props.match.params.id}
                            mediaType={"audio"}
                            />
                    </section>
                </div>
                }
            </TranscriptBase>
        )
    }
}