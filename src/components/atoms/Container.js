import React, { Component } from "react"
import styled from "styled-components"

const Holder = styled.div`
  padding: 0 1rem;
`

class Container extends Component {
  render() {
    return <Holder>{this.props.children}</Holder>
  }
}

export default Container
