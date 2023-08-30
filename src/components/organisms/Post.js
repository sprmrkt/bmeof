import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useStore } from "../../utils/store";
import useHorizontalHoverClassname from "../../hooks/useHorizontalHoverClassname";
import { manualKerning } from "../../utils/helpers";
import HomeLink from "../atoms/HomeLink";

const ExternalLink = styled.div`
  overflow: hidden;
  text-decoration: 0;
  transition: color 0.5s linear;
  font-family: "Adineue PRO Black", "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  a {
    line-height: 0.78;

    @media (${(props) => props.theme.breakpoints.md}) {
      cursor: none;
    }
  }
  .large-text-outer {
    @media (${(props) => props.theme.breakpoints.md}) {
      display: inline-block;
    }
  }

  .manual-kerning:hover {
    @media (${(props) => props.theme.breakpoints.md}) {
      color: rgb(70, 70, 70);
    }
  }
`;

function Post({ post }) {
  const setCustomCursorIsVisible = useStore(
    (state) => state.setCustomCursorIsVisible
  );
  const { title, external_link } = post.data;
  const hoverClass = useHorizontalHoverClassname();

  if (external_link.url)
    return (
      <ExternalLink className="h1">
        <a
          onMouseEnter={() => setCustomCursorIsVisible(true)}
          onMouseLeave={() => setCustomCursorIsVisible(false)}
          href={external_link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={`large-text-outer ${hoverClass}`}>
            <span className="large-text-wrapper">
              {manualKerning(title.text)}
            </span>
          </span>
        </a>
      </ExternalLink>
    );
  return (
    <HomeLink link={`extras/${post.id}`} text={title.text}>
      {title.text}
    </HomeLink>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;

