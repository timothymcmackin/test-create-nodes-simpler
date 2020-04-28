import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"

const MainPage = ({ data }) => {
  const { markdownRemark: post } = data;
  console.log(data)

  return (
    <Layout>
    <div>Value of data.testTestTest: {JSON.stringify(data.testTestTest) || 'null'}</div>
    <div>Value of markdownRemark.frontmatter.path: {data.markdownRemark.frontmatter.path}</div>
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
  testTestTest(path: {eq: $path}) {
    message
  }
}
`;