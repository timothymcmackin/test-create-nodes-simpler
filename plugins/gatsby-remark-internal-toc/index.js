module.exports = async ({ markdownAST, markdownNode, actions, createNodeId, createContentDigest }) => {

  const { createNode } = actions;

  const testValue = markdownNode.frontmatter.path;

  const testNode = {
    path: testValue,
    message: 'Hello!!!',
    id: createNodeId(testValue),
    children: [],
    internal: {
      description: `Test`,
      type: "testTestTest",
      contentDigest: createContentDigest(testValue),
      content: testValue,
    }
  };
  
  await createNode(testNode);

  return markdownAST;
}
