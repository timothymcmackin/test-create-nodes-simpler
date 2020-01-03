const visit = require(`unist-util-visit`);

/*
This Remark plugin retrieves the headings that gatsby-remark-autolink-headers creates 
and creates a child node with the heading text, link, and depth.
*/

module.exports = async ({ markdownAST, markdownNode, actions, createNodeId, createContentDigest }) => {
  console.log("gatsby-remark-internal-toc start")
  var headings = [];
  visit(markdownAST, `heading`, node => {
    if (getHeadingText(node) && getHeadingLink(node)) {
      headings.push({
        text: getHeadingText(node),
        path: getHeadingLink(node),
        level: node.depth,
      });
    }
  });
  
  if (headings.length > 0) {
    const { createNode } = actions;
    
    const headingNode = {
      headings: headings,
      path: markdownNode.frontmatter.path,
      id: createNodeId(markdownNode.frontmatter.path),
      children: [],
      internal: {
        description: `Headings and links for ${markdownNode.fileAbsolutePath}`,
        type: "topicInternalHeadings",
        contentDigest: createContentDigest(headings)
      }
    };
    
    await createNode(headingNode);
  }
  console.log("gatsby-remark-internal-toc end")
  return markdownAST;
}

function getHeadingText(node) {
  return node.children.find((child) => child.type === 'text').value || null;
}

function getHeadingLink(node) {
  return node.children.find((child) => child.type === 'link').url || null;
}