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
  scroll-snap-type: y proximity;
  @supports (-moz-appearance: none) {
    /*
      Disable in FF due to https://bugzilla.mozilla.org/show_bug.cgi?id=1744289
      using @supports https://stackoverflow.com/a/32455002
    */
    scroll-snap-type: none !important;
  }
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
  p {
    margin: 0;
  }
`;

const Address = styled.div`
  @media ( ${props => props.theme.breakpoints.md} ) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .contact {
    display: none;
    @media( ${props => props.theme.breakpoints.md} ) {
      display: block;
      margin-top: auto;
    }
  }
`;

const ImageHolder = styled.div`
  margin-top: auto;
  .gatsby-image-wrapper {
    mix-blend-mode: multiply;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }
  .contact {
    margin-top: 15px;
    @media( ${props => props.theme.breakpoints.md} ) {
      display: none;
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
        <Address>
          <div className="p-large"><PrismicRichText render={address.richText} /></div>
          <div className="contact"><PrismicRichText render={contact.richText} /></div>
        </Address>

        <ImageHolder>
          <GatsbyImage alt={image.alt || 'Studio shot'} image={image.gatsbyImageData} />
          <div className="contact"><PrismicRichText render={contact.richText} /></div>
        </ImageHolder>

      </Grid>
      <CloseButton closeHandler={props.closeHandler} />
    </Holder>
  )
}

export default Studio;