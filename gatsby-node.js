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
          uid
        }
      }
      posts: allPrismicPost {
        nodes {
          id
          uid
          data {
            external_link {
              url
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    // Create Work pages
    const workPosts = result.data.work.nodes;
    workPosts.forEach((post) => {
      createPage({
        path: `/work/${post.uid}`,
        component: path.resolve("./src/templates/WorkTemplate.js"),
        context: {
          id: post.id,
        },
      });
    });

    const extraPosts = result.data.posts.nodes;
    extraPosts.forEach((post) => {
      if (post.data.external_link && post.data.external_link.url === null) {
        createPage({
          path: `/extras/${post.uid}`,
          component: path.resolve("./src/templates/ExtrasTemplate.js"),
          context: {
            id: post.id,
          },
        });
      }
    });
  });
};

