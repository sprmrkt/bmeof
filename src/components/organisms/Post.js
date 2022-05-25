import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Accordion from "../atoms/Accordion";
import PostHolder from "./PostHolder";
import {useStore} from "../../utils/store";

const ExternalLink = styled.p`
  text-decoration: 0;
  transition: color 0.5s linear;
  font-family: "Adineue PRO Black", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  &:hover {
    @media ( ${props => props.theme.breakpoints.md} ) {
      color: rgb(70, 70, 70);
    }
  }
`;

function Post({post}) {
  const setCustomCursorIsVisible = useStore(state => state.setCustomCursorIsVisible);
  const {title, external_link} = post.data;
  if (external_link.url) return (
    <ExternalLink className="h1">
      <a
        onMouseEnter={() => setCustomCursorIsVisible(true)}
        onMouseLeave={() => setCustomCursorIsVisible(false)}
        href={external_link.url}
        target="_blank"
        rel="noopener noreferrer">
        <span className="large-text-wrapper">{title.text}</span>
      </a>
    </ExternalLink>
  )
  return (
    <Accordion
      id={post.uid}
      button={title.text}>
      <PostHolder post={post} />
    </Accordion>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;