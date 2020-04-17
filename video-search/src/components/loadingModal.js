import React, { Component } from "react"
import styled from "styled-components"
import Loader from "react-spinners/ClipLoader";

const Overlay = styled.div`
  position: fixed;
  top: 12.5%;
  bottom: 0;
  left: 12.5%;
  right: 0;
  height: 75%;
  width: 75%;
  background: white;
  padding: 50;
  z-index: 100;
  border-radius: 25px;
  border: 1px solid #808080;
  box-shadow: -2rem 2rem 2rem rgba(black, 0.2);
  overflow: hidden;
`;

const LoadingBase = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    height: 100%;
    weight: 100%;
`

export default class LoadingModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Overlay>
                <LoadingBase>
                    <b style={{marginBottom: "25px"}}>
                        Please wait...
                    </b>
                    <Loader
                        size={"200px"}
                        color={"#006600"}
                        loading={true}/>
                </LoadingBase>
            </Overlay>
        )
    }
}