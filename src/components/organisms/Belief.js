import React from 'react';
import styled from 'styled-components';
import {graphql, useStaticQuery} from "gatsby";
import PrismicRichText from "../atoms/PrismicRichText";
import CloseButton from "../atoms/CloseButton";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: y proximity;
  @supports (-moz-appearance: none) {
    /*
      Disable in FF due to https://bugzilla.mozilla.org/show_bug.cgi?id=1744289
      using @supports https://stackoverflow.com/a/32455002
    */
    scroll-snap-type: none !important;
  }
`;

const Inner = styled.div`
  padding: 15px;
  @media( ${props => props.theme.breakpoints.md} ) {
    padding: 24px;
  }
  > :first-child { margin-top: 0; }
  > :last-child { margin-bottom: 0; }
`;

function Belief(props) {
  const data = useStaticQuery(graphql`
      query BeliefQuery {
          prismicBelief {
              data {
                  text {
                      richText
                  }
              }
          }
      }
  `)
  return (
    <Holder>
      <Inner className="p-large">
        <PrismicRichText render={data.prismicBelief.data.text.richText} />
      </Inner>
      <CloseButton closeHandler={props.closeHandler} />
    </Holder>
  )
}

export default Belief;