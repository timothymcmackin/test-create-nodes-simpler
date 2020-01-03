import React from "react"

import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
    <h1>{post.frontmatter.title}</h1>
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: post.html }}
    />
    </Layout>
  )
}

export default IndexPage;

export const pageQuery = graphql`
query topicsByPath($path: String!) {
  markdownRemark(frontmatter: {path: {eq: $path}}) {
    html
    frontmatter {
      path
      title
    }
  }
}
`;