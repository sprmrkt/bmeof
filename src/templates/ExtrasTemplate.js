import React from "react";
import { graphql } from "gatsby";
import GalleryHolder from "../components/molecules/GalleryHolder";
import Seo from "../components/molecules/Seo";

const ExtrasTemplate = ({ data }) => {
  const metaTitle = data.prismicPost.data.meta_title;
  const metaDescription = data.prismicPost.data.meta_description;
  const metaImage = data.prismicPost.data.meta_image.url;
  return (
    <div>
        <Seo title={metaTitle} description={metaDescription} image={metaImage}  />
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
        meta_title
        meta_description
        meta_image {
          url
        }
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

