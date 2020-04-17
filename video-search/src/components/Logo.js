import React from "react"
import styled from "styled-components"

import logo from "../assets/logo.png";

const StyledImg = styled.img`
    max-width: 75vw;
    width: 550px;
`

const Logo = (props) => {
    return (
        <StyledImg src={logo} alt="Transcrybit logo"></StyledImg>
    )
}

export default Logo