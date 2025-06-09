import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/molecules/Seo";
import { PrismicRichText } from "@prismicio/react";

const Container = styled.div`
  border: 10px solid red;
`;
const PageTemplate = ({ data }) => {
  const metaTitle = data.prismicPage.data.meta_title;
  const metaDescription = data.prismicPage.data.meta_description;
  const metaImage = data.prismicPage.data.meta_image?.url;

  console.log("data", data);
  return (
    <Container>
        <Seo title={metaTitle} description={metaDescription} image={metaImage}  />
         <div className="text">
                    <PrismicRichText field={data.text.richText} />
                  </div>
    </Container>
  );
};

export default PageTemplate;

export const query = graphql`
  query ($id: String) {
    prismicPage(id: { eq: $id }) {
      id
      uid
      data {
      meta_title
      meta_description
        meta_image {
          url
        }
        text {
          richText
        }
      }
    }
  }
`;

