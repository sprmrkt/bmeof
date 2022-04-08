import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Spacer from "../atoms/Spacer";
import Accordion from "../atoms/Accordion";
import PrismicRichText from "../atoms/PrismicRichText";
import PostGallery from "../molecules/PostGallery";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

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


const TextHolder = styled.div`
  padding: 24px;
`;

const ExternalLink = styled.p`
  text-decoration: 0;
  transition: color 0.5s linear;

  &:hover {
    @media ( ${props => props.theme.breakpoints.md} ) {
      color: rgb(70, 70, 70);
    }
  }
`;

function Post({post}) {
  const {title, external_link, text, gallery} = post.data;
  if (external_link.url) return (
    <ExternalLink className="h1"><a href={external_link.url} target="_blank"
                                    rel="noopener noreferrer"><span>{title.text}</span></a></ExternalLink>
  )
  return (
    <Accordion
      id={post.uid}
      button={title.text}>
      <Holder>
        {text.richText.length > 0 && <TextHolder><PrismicRichText render={text.richText} /></TextHolder>}
        {!text.richText.length > 0 && gallery.length > 0 && <PostGallery slides={gallery} title={title} />}
      </Holder>
    </Accordion>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;