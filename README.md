This is a minimal reproduction of an issue that I'm seeing with Gatsby's graphql API.

To reproduce the problem:

1. Clone this repository.
2. Run `yarn install` to install dependencies.
3. Run `yarn start` to start the server.
4. When the server comes up, open `http://localhost:8000/___graphql` in a web browser.
5. In GraphIQL, run this query:
    ```graphql
    query MyQuery {
      testTestTest(path: {eq: "/mypage.html"}) {
        message
      }
    }
    ```
6. Note that the query returns data for the `testTestTest` node.
7. Go to `http://localhost:8000/mypage.html`.
8. Note that on the page, the value for `data.testTestTest.message` is null.
9. In the console, note that the data returned from the page query includes no data for the `topicInternalHeadings` node:
    ```
    {markdownRemark: {…}, testTestTest: null}
    ```

Expected result: Node data appears in the log and on the page because the data is visible in graphiql.

The code in `plugins/gatsby-remark-internal-toc/index.js` creates the `testTestTest` node.
