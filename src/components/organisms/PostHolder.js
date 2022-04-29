import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import PrismicRichText from "../atoms/PrismicRichText";
import PostGallery from "../molecules/PostGallery";
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

const TextHolder = styled.div`
  padding: 15px;
  @media( ${props => props.theme.breakpoints.md} ) {
    padding: 24px;
  }
  > :first-child { margin-top: 0; }
  > :last-child { margin-bottom: 0; }
`;

function PostHolder(props) {
  const {title, text, gallery} = props.post.data;
  return (
    <Holder>
      {text.richText.length > 0 && <TextHolder className="p-large"><PrismicRichText render={text.richText} /></TextHolder>}
      {!text.richText.length > 0 && gallery.length > 0 && <PostGallery slides={gallery} title={title} />}
      <CloseButton closeHandler={props.closeHandler}/>
    </Holder>
  )
}

PostHolder.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostHolder;