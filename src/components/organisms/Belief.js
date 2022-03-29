import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Spacer from "../atoms/Spacer";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 24px;
  p {
    font-size: 40px;
    line-height: 36px;
    margin-bottom: 0.75em;
    @media( ${props => props.theme.breakpoints.md} ) {
      font-size: 84px;
      line-height: 72px;
    }
    &:nth-last-child(2) { margin-bottom: 0; }
  }
`;

function Belief() {
  return (
    <Holder>
      <p>Bear Meets Eagle On Fire, Lorem ipsum dolor sit amet,consectetuer adipiscing elit, sed diam nonummy nibh
        euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
      <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
        commodo consequat.</p>
      <p>Duis amet,consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
        erat volutpat.</p>
      <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation.</p>
      <Spacer/>
    </Holder>
  )
}

Belief.propTypes = {
  propName: PropTypes.string.isRequired,
};

export default Belief;