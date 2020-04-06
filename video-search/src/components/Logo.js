import React from "react"
import styled from "styled-components"

const StyledImg = styled.img`
    max-width: 75vw;
`

const Logo = (props) => {
    return (
        <StyledImg src="logo.png" alt="Transcrybit logo"></StyledImg>
    )
}

export default Logo