import React from 'react';
import styled from 'styled-components';
import {graphql, useStaticQuery} from "gatsby";
import PrismicRichText from "../atoms/PrismicRichText";
import {GatsbyImage} from "gatsby-plugin-image";
import CloseButton from "../atoms/CloseButton";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Grid = styled.div`
  height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  padding: 15px;
  @media ( ${props => props.theme.breakpoints.md} ) {
    display: grid;
    grid-template-columns: 5fr 3fr;
    grid-gap: 24px;
    padding: 24px;
  }

  .contact {
    @media ( ${props => props.theme.breakpoints.md} ) {
      align-self: end;
      grid-row: 2/3;
      grid-column: 1/2;
    }
    p {
      text-transform: uppercase;
      margin-top: 24px;
      margin-bottom: 0;
    }
  }
  
  .address {
    margin-bottom: auto;
    p { margin-top: 0; }
  }
  
  .gatsby-image-wrapper {
    @media ( ${props => props.theme.breakpoints.md} ) {
      grid-row: 2/3;
      grid-column: 2/3;
    }
  }
`;

function Studio(props) {
  const data = useStaticQuery(graphql`
      query StudioQuery {
          prismicStudio {
              data {
                  address {
                      richText
                  }
                  contact {
                      richText
                  }
                  image {
                      alt
                      gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
                  }
              }
          }
      }
  `)
  const {address, image, contact} = data.prismicStudio.data;
  return (
    <Holder>
      <Grid>
        <div className="address p-large"><PrismicRichText render={address.richText}/></div>
        <GatsbyImage alt={image.alt || 'Studio shot'} image={image.gatsbyImageData}/>
        <div className="contact"><PrismicRichText render={contact.richText}/></div>
      </Grid>
      <CloseButton closeHandler={props.closeHandler}/>
    </Holder>
  )
}

export default Studio;