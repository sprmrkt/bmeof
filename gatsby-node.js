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
      pages: allPrismicPage {
        nodes {
          id
          uid
          data {
          title {
            richText
            }
            text {
              richText
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


    // Create default pages
 
    const defaultPages = result.data.pages.nodes;
    defaultPages.forEach(page => {
      if (page.data.text.richText !== null) {
        createPage({
          path: `/page/${page.uid}`,
          component: path.resolve("./src/templates/PageTemplate.js"),
          context: {
            id: page.id,
            layout: "page",
          },
        });
      }
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

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  if (page.path.match(/work/)) {
    deletePage(page);
    createPage({
      ...page,
      context: {
        ...page.context,
        layout: "work",
      },
    });
  } else if (page.path.match(/page/)) {
    deletePage(page);
    createPage({
      ...page,
      context: {
        ...page.context,
        layout: "page",
      },
    });
  }
};

