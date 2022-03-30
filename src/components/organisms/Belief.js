import React from 'react';
import styled from 'styled-components';
import Spacer from "../atoms/Spacer";
import {graphql, useStaticQuery} from "gatsby";
import PrismicRichText from "../atoms/PrismicRichText";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 24px;

  p {
    font-size: 40px;
    line-height: 36px;
    margin-bottom: 0.75em;
    @media ( ${props => props.theme.breakpoints.md} ) {
      font-size: 84px;
      line-height: 72px;
    }

    &:nth-last-child(2) { margin-bottom: 0; }
  }
`;

function Belief() {
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
      <PrismicRichText render={data.prismicBelief.data.text.richText}/>
      <Spacer />
    </Holder>
  )
}

export default Belief;