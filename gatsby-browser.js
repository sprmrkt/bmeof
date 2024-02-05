/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import * as React from "react";
import { PrismicPreviewProvider } from "gatsby-plugin-prismic-previews";
import { lazy } from "react";
import linkResolver from "./src/utils/linkResolver";

const repositoryConfigs = [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
    linkResolver,
    componentResolver: {
      homepage: lazy(() => import('./src/pages/index')),
      work: lazy(() => import('./src/templates/WorkTemplate')), // Assuming you have a WorkPage component
      studio: lazy(() => import('./src/pages/studio')), // Assuming you have a StudioPage component
      hello: lazy(() => import('./src/pages/hello')), // Assuming you have a HelloPage component
      gravy: lazy(() => import('./src/pages/gravy')), // Assuming you have a GravyPage component
    },
  },
];

export const wrapRootElement = ({element}) => (
  <PrismicPreviewProvider repositoryConfigs={repositoryConfigs}>
    {element}
  </PrismicPreviewProvider>
);

export const shouldUpdateScroll = () => {
  window.scrollTo(0, 0);
  return false;
};