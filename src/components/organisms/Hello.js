import React from 'react';
import styled from 'styled-components';
import {graphql, useStaticQuery} from "gatsby";
import PrismicRichText from "../atoms/PrismicRichText";
import CloseButton from "../atoms/CloseButton";

const Holder = styled.div`
  height: calc(100% - 48px);
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  
  .close-copyright {
    padding-bottom: 15px;
    @media ( ${props => props.theme.breakpoints.md} ) {
      padding-bottom: 24px !important;
    }

    p {
      margin-bottom: 0;
    }
  }
  
`;

const TextHolder = styled.div`
  padding: 15px;
  height: 100%;
  @media ( ${props => props.theme.breakpoints.md} ) {
    padding: 24px;
  }

  > :first-child { margin-top: 0; }

  > :last-child { margin-bottom: 0; }
`;
function Hello(props) {
  const data = useStaticQuery(graphql`
      query StudioQuery {
          prismicHello {
              data {
                  text {
                      richText
                  }
              }
          }
      }
  `)
  const {text} = data.prismicHello.data;
  return (
    <Holder>
        <TextHolder>
          <div className="p-large"><PrismicRichText render={text.richText} /></div>
        </TextHolder>
      <CloseButton closeHandler={props.closeHandler} />
    </Holder>
  )
}

export default Hello;