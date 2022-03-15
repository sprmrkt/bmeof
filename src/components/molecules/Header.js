import { Link } from "gatsby";
import React, { Component } from "react";
import Container from "../atoms/Container";
import styled from "styled-components";

const Holder = styled.header`
`;

class Header extends Component {
  render() {
    return (
      <Container>
        <Holder>
          <p>
            <Link to="/">Logo</Link>
          </p>
        </Holder>
      </Container>
    );
  }
}

export default Header;
