This is a minimal reproduction of an issue that I'm seeing with Gatsby's graphql API.

To reproduce the problem:

1. Clone this repository.
2. Run `yarn install` to install dependencies.
3. Run `yarn start` to start the server.
4. When the server comes up, open `http://localhost:8000/___graphql` in a web browser.
5. In GraphIQL, run this query:
    ```graphql
    query MyQuery {
      markdownRemark(frontmatter: {path: {eq: "/mypage.html"}}) {
        frontmatter {
          path
          title
        }
      }
      topicInternalHeadings(path: {eq: "/mypage.html"}) {
        headings {
          level
          path
          text
        }
      }
    }
    ```
6. Note that the query returns data for the `topicInternalHeadings` node.
7. Go to `http://localhost:8000/myPage.html`.
8. In the console, note that the data returned from the page query includes no data for the `topicInternalHeadings` node:
    ```
    {markdownRemark: {…}, topicInternalHeadings: null}
    ```

Expected result: Node data appears in the log and on the page because the data is visible in graphiql.

The code in `plugins/gatsby-remark-internal-toc/index.js` creates the `topicInternalHeadings` nodes.
