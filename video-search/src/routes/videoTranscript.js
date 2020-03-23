import React, { Component } from 'react'
import styled from "styled-components"
import ReactPlayer from 'react-player'
import TranscriptTextBox from '../components/TranscriptTextBox'
import Loader from "react-spinners/ClipLoader";

const TranscriptBase = styled.div`
    text-align: center;
    background-color: #e6ffe6;
    height: auto;
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
                    this.player.seekTo(45, "seconds")
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
                <section>
                    <img src="logo.png"></img>
                </section>

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
                    <ReactPlayer ref={this.ref}
                    controls
                    playing={this.state.playing}
                    style={{margin: "auto"}}
                    url="https://youtu.be/dQw4w9WgXcQ"
                    onReady={this.stopLoadSpinning}
                    height={this.state.loading ? 0 : undefined}>
                    </ReactPlayer>
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