const path = require('path');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type testTestTest implements Node {
      path: String!
      message: String!
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async function({ actions, graphql }) {

  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const mainPage = path.resolve(`src/pages/page.js`);

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: mainPage,
      })
    });

  });

}