import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Spacer from "../atoms/Spacer";
import Image from "../atoms/Image";

const Holder = styled.div`
  height: 100%;
  overflow: hidden;
  padding: 24px;

`;

const Grid = styled.div`
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  @media ( ${props => props.theme.breakpoints.md} ) {
    display: grid;
    grid-template-columns: 5fr 3fr;
    grid-gap: 24px;
  }

  p {
    font-size: 40px;
    line-height: 36px;
    margin: 0;
    @media ( ${props => props.theme.breakpoints.md} ) {
      font-size: 84px;
      line-height: 72px;
    }
  }

  .email {
    font-size: 15px;
    line-height: 1.2;
    text-transform: uppercase;
    margin-top: 24px;
    @media ( ${props => props.theme.breakpoints.md} ) {
      align-self: end;
      grid-row: 2/3;
      grid-column: 1/2;
    }
  }
  
  .address {
    margin-bottom: auto;
  }
  
  .gatsby-image-wrapper {
    @media ( ${props => props.theme.breakpoints.md} ) {
      grid-row: 2/3;
      grid-column: 2/3;
    }
  }
`;

function Belief() {
  return (
    <Holder>
      <Grid>
        <p className="address">Suite 203<br />
          19A Boundary St<br />
          Darlinghurst<br />
          2010 NSW</p>
        <Image imgName="dummy-1.jpg" />
        <p className="email">Get in touch<br />
          <a href="mailto:info@beareaglefire.com" target="_blank" rel="noopener noreferrer">info@beareaglefire.com</a>
        </p>
      </Grid>
      <Spacer />
    </Holder>
  )
}

Belief.propTypes = {
  propName: PropTypes.string.isRequired,
};

export default Belief;