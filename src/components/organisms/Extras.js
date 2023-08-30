import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Post from "./Post";

function Extras() {
  const data = useStaticQuery(graphql`
    query ExtrasQuery {
      prismicHomepage {
        data {
          extras {
            post {
              document {
                ... on PrismicPost {
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
                        gatsbyImageData(
                          layout: FULL_WIDTH
                          placeholder: BLURRED
                        )
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
            }
          }
        }
      }
    }
  `);

  if (data.prismicHomepage.data.extras.length < 1) return null;

  return data.prismicHomepage.data.extras.map((node, i) => (
    <Post key={i} post={node.post.document} />
  ));
}

export default Extras;

