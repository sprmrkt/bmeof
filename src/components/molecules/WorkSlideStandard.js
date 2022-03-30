import React from 'react';
import PropTypes from "prop-types";
import useWindowSize from "../../hooks/useWindowSize";
import {GatsbyImage} from "gatsby-plugin-image";

function WorkSlideStandard({slide}) {
  const size = useWindowSize();
  const image = slide.primary.media.localFile;

  return (<>
      {size.width < 768 && <GatsbyImage
        alt="gatsby"
        layout="constrained"
        image={image.childImageSharp.gatsbyImageData} />}
      {size.width >= 768 && <GatsbyImage
        alt="gatsby"
        layout="constrained"
        style={{
          width: `calc(${image.childImageSharp.original.width / image.childImageSharp.original.height} * (100vh - 60px - 2rem))`,
          height: `calc(100vh - 60px - 2rem)`,
        }}
        image={image.childImageSharp.gatsbyImageData} />}
    </>
  )
}

WorkSlideStandard.propTypes = {
  slide: PropTypes.object.isRequired,
};

export default WorkSlideStandard;