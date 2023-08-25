/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      work: allPrismicWork {
        nodes {
          id
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    // Create Work pages
    const workPosts = result.data.work.nodes;
    console.log("work", workPosts);
    workPosts.forEach((post) => {
      createPage({
        path: `/work/${post.id}`,
        component: path.resolve("./src/templates/WorkHolderTemplate.js"),
        context: {
          id: post.id,
        },
      });
    });
  });
};

