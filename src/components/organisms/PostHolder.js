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
`;

const TextHolder = styled.div`
  padding: 24px;
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