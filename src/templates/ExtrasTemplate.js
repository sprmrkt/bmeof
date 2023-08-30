import React from "react";
import { graphql } from "gatsby";
import GalleryHolder from "../components/molecules/GalleryHolder";

const ExtrasTemplate = ({ data }) => {
  console.log("extras", data);
  return (
    <div>
      <GalleryHolder slides={data.prismicPost.data.gallery} extra={true} />
    </div>
  );
};

export default ExtrasTemplate;

export const query = graphql`
  query ($id: String) {
    prismicPost(id: { eq: $id }) {
      id
      uid
      data {
        title {
          text
        }
        external_link {
          url
        }
        text {
          richText
        }
        gallery {
          image {
            dimensions {
              width
              height
            }
            alt
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            url(imgixParams: { width: 1000 })
          }
          video {
            url
          }
          embed_poster {
            url
          }
          embed {
            html
            height
            width
            thumbnail_url
            title
          }
          caption {
            text
          }
        }
      }
    }
  }
`;

