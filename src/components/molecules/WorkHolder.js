import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Element } from "react-scroll";
import useWindowSize from "../../hooks/useWindowSize";
import { convertToSlug } from "../../utils/helpers";
import WorkTileHome from "./WorkTileHome";
import { Link } from "gatsby";

function WorkHolder(props) {
  const { title, tile_image, tile_video, excerpt } = props.node.data;
  const itemUid = convertToSlug(title.text) + "-" + uuidv4();
  const size = useWindowSize();
  const tileHolder = useRef(null);
  const [tileHeight, setTileHeight] = useState(0);
  const [tileWidth, setTileWidth] = useState(0);

  useEffect(() => {
    if (tileHolder.current) {
      setTileHeight(tileHolder.current.clientHeight);
      setTileWidth(tileHolder.current.clientWidth);
    }
  }, [size, setTileHeight, setTileWidth, tileHolder]);

  return (
    <>
      <Link to={props.uid}>
        <Element name={itemUid}>
          <div ref={tileHolder}>
            <WorkTileHome
              title={title.text}
              tileHeight={tileHeight}
              tileWidth={tileWidth}
              excerpt={excerpt}
              image={tile_image}
              video={tile_video}
              even={props.even}
            />
          </div>
        </Element>{" "}
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

