import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Accordion from "../atoms/Accordion";
import PostHolder from "./PostHolder";

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
  const {title, external_link} = post.data;
  if (external_link.url) return (
    <ExternalLink className="h1"><a href={external_link.url} target="_blank"
                                    rel="noopener noreferrer"><span>{title.text}</span></a></ExternalLink>
  )
  return (
    <Accordion
      id={post.uid}
      button={title.text}>
      <PostHolder post={post}/>
    </Accordion>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;