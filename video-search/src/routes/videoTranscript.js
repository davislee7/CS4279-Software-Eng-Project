import React, { Component } from 'react'
import styled from "styled-components"
import ReactPlayer from 'react-player'
import 'react-h5-audio-player/lib/styles.css';

const TranscriptBase = styled.div`
    text-align: center;
    background-color: #e6ffe6;
    height: 100vh;
`

const Space = styled.div`
    height: 25px;
    display: block;
`

export default class VideoTranscript extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyword: '', // keyword searched
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
        }
     }

    render() {
        return (
            <TranscriptBase>
                <section>
                    <img src="logo.png"></img>
                </section>
                <Space></Space>
                <section>
                    <input type="text"
                    style={{height: "5vh", fontSize: '24px', borderRadius: '25px', paddingLeft: '25px', paddingRight: '25px'}}
                    placeholder="Search..."
                    onKeyPress={this.changeKeyword}></input>
                </section>
                <Space></Space>
                <section>
                    <ReactPlayer
                    style={{margin: "auto"}}
                    url="https://youtu.be/dQw4w9WgXcQ">
                    </ReactPlayer>
                </section>
            </TranscriptBase>
        )
    }
}