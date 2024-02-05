/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions;

  return graphql(`
    {
      work: prismicHomepage {
          _previewable
          data {
              work {
                  work_item {
                      document {
                          ... on PrismicWork {
                              uid
                              id
                          }
                      }
                  }
              }
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
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    // Create Work pages
    const workPosts = result.data.work.data.work;
    workPosts.forEach((post, i) => {
      const page = post.work_item.document;
      createPage({
        path: `/work/${page.uid}`,
        component: path.resolve("./src/templates/WorkTemplate.js"),
        context: {
          id: page.id,
          layout: "work",
          index: i,
        },
      });
    });

    const extraPosts = result.data.posts.nodes;
    extraPosts.forEach(post => {
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

exports.onCreatePage = ({page, actions}) => {
  const {createPage} = actions;

  if (page.path.match(/work/)) {
    page.context.layout = "work";
    createPage(page);
  }
};

