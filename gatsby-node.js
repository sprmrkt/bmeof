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
      posts: allPrismicPost {
        nodes {
          id
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
        path: `/work/${post.id}`,
        component: path.resolve("./src/templates/WorkHolderTemplate.js"),
        context: {
          id: post.id,
        },
      });
    });

    const extraPosts = result.data.posts.nodes;
    extraPosts.forEach((post) => {
      if (!post.data.external_link.url || post.data.external_link.url === "") {
        createPage({
          path: `/extras/${post.id}`,
          component: path.resolve("./src/templates/ExtrasTemplate.js"),
          context: {
            id: post.id,
          },
        });
      }
    });
  });
};

