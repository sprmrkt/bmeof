import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const Holder = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  @media( ${props => props.theme.breakpoints.md} ) {
    grid-template-columns: 1fr 1fr;
    
  }
`;

function Work() {
  useLockBodyScroll();
  return (
    <Holder>

    </Holder>
  )
}

export default Work;