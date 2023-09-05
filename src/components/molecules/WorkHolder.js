import React from "react";
import PropTypes from "prop-types";
import WorkTileHome from "./WorkTileHome";
import { Link } from "gatsby";

function WorkHolder(props) {
  const { title, tile_image, tile_video, excerpt } = props.node.data;

  return (
    <>
      <Link to={props.uid}>
        <WorkTileHome
          title={title.text}
          excerpt={excerpt}
          image={tile_image}
          video={tile_video}
          even={props.even}
        />
      </Link>
    </>
  );
}

WorkHolder.propTypes = {
  even: PropTypes.bool,
  node: PropTypes.object.isRequired,
};

WorkHolder.defaultProps = {
  even: false,
};

export default WorkHolder;

