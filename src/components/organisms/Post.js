import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import Accordion from "../atoms/Accordion";
import PostHolder from "./PostHolder";
import {useStore} from "../../utils/store";
import classNames from "classnames";

const ExternalLink = styled.p`
  text-decoration: 0;
  transition: color 0.5s linear;
  font-family: "Adineue PRO Black", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  .large-text-outer {
    @media ( ${props => props.theme.breakpoints.md} ) {
      display: inline-block;
      transition: transform 1s linear;
    }
  }
  &.is-moved {
    @media ( ${props => props.theme.breakpoints.md} ) {
      .large-text-outer {
        transform: translateX(calc(-${props => props.moveDistance}px - 24px));
      }
    }
  }

  &:hover {
    @media ( ${props => props.theme.breakpoints.md} ) {
      color: rgb(70, 70, 70);
    }
  }
`;

function Post({post}) {
  const setCustomCursorIsVisible = useStore(state => state.setCustomCursorIsVisible);
  const {title, external_link} = post.data;
  const horizontalHoverDistance = useStore(state => state.horizontalHoverDistance);
  const horizontalHover = useStore(state => state.horizontalHover);

  const externalLinkClasses = classNames('h1', {
    'is-moved': horizontalHover
  });
  if (external_link.url) return (
    <ExternalLink
      className={externalLinkClasses}
      moveDistance={horizontalHoverDistance}
    >
      <a
        onMouseEnter={() => setCustomCursorIsVisible(true)}
        onMouseLeave={() => setCustomCursorIsVisible(false)}
        href={external_link.url}
        target="_blank"
        rel="noopener noreferrer">
        <span className="large-text-outer">
          <span className="large-text-wrapper">{title.text}</span>
        </span>
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