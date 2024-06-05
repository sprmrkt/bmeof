import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";
import {manualKerning} from "../../utils/helpers";

function PostPreviewLink({post}) {
  const {title, external_link} = post.data;

  if (external_link && external_link.url !== null) {
    return (
      <p className="h1">
        <a href={external_link.url} target="_blank" rel="noopener noreferrer">
          {manualKerning(title.text)}
        </a>
      </p>
    );
  } else {
    return (
      <p className="h1">
        <Link to={`extras/${post.uid}`}>{title.text}</Link>
      </p>
    );
  }
}

PostPreviewLink.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostPreviewLink;

