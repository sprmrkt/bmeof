import React, {useEffect} from "react";
import { useStaticQuery, graphql } from "gatsby"

import Seo from "../components/molecules/Seo";
import {useStore} from "../utils/store";

function IndexPage() {
  const { setGlobalNavSplitHappenedOnce } = useStore();

  const data = useStaticQuery(graphql`
  query {
    prismicHomepage {
      data {
          meta_title
          meta_description
          meta_image {
            url
          }
      }
    }
  }
`);


const metaTitle = data.prismicHomepage.data.meta_title || "Home";
const metaDescription = data.prismicHomepage.data.meta_description || null; 
const metaImage = data.prismicHomepage.data?.meta_image?.url || null;

  useEffect(() => {
    setGlobalNavSplitHappenedOnce(true);
  }, [setGlobalNavSplitHappenedOnce])

  return (
    <>
      <Seo title={metaTitle} description={metaDescription} image={metaImage}  />
    </>
  );
}

export default IndexPage;

