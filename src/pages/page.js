import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"

const MainPage = ({ data }) => {
  const { markdownRemark: post } = data;
  console.log(data)

  return (
    <Layout>
    <h1>{post.frontmatter.title}</h1>
    <h2>Headings:</h2>
    <div>{JSON.stringify(data.topicInternalHeadings)}</div>
    <h2>Content</h2>
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: post.html }}
    />
    </Layout>
  )
}

export default MainPage;

export const pageQuery = graphql`
query topicsByPath($path: String!) {
  markdownRemark(frontmatter: {path: {eq: $path}}) {
    html
    frontmatter {
      path
      title
    }
  }
  topicInternalHeadings(path: {eq: $path}) {
    path
    headings {
      level
      path
      text
    }
  }
}
`;