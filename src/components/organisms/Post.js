import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { manualKerning } from "../../utils/helpers";
import HomeLink from "../atoms/HomeLink";

const ExternalLink = styled.div`
  text-decoration: 0;
  font-family: "Adineue PRO Black", "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  padding-bottom: 1.2rem;
  a {
    line-height: 0.75;
    cursor: pointer;
  }
  .large-text-outer {
    @media (${(props) => props.theme.breakpoints.md}) {
      display: inline-block;
    }
  }
`;

function Post({ post }) {
  const { title, external_link } = post.data;

  console.log("ext", post);

  if (external_link.url !== null) {
    return (
      <ExternalLink className="h1">
        <a href={external_link.url} target="_blank" rel="noopener noreferrer">
          <span className={`large-text-outer`}>
            <span className="large-text-wrapper">
              {manualKerning(title.text)}
            </span>
          </span>
        </a>
      </ExternalLink>
    );
  } else {
    return <HomeLink link={`extras/${post.uid}`} text={title.text} />;
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;

