import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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
`;

function Post({ post }) {
  const { title, external_link } = post.data;

  if (external_link.url !== null) {
    return (
      <ExternalLink className="h1">
        <a href={external_link.url} target="_blank" rel="noopener noreferrer">
          {title.text}
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

