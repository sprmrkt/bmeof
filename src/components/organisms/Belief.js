import React from 'react';
import styled from 'styled-components';
import {graphql, useStaticQuery} from "gatsby";
import PrismicRichText from "../atoms/PrismicRichText";
import CloseButton from "../atoms/CloseButton";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Inner = styled.div`
  padding: 24px;
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