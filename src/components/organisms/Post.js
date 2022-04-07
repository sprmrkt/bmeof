import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Spacer from "../atoms/Spacer";
import Accordion from "../atoms/Accordion";

const Holder = styled.div`
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 24px;
`;

function Post({ post}) {
  const {title, external_link} = post.data;
  if(external_link.url) return (
    <a className="h1" href={external_link.url} target="_blank" rel="noopener noreferrer">{title.text}</a>
  )
  return (
    <Accordion
      id={post.uid}
      button={title.text}>
      <Holder>
        {title.text}
        <Spacer/>
      </Holder>
    </Accordion>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;