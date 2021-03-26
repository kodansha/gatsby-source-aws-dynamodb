# gatsby-source-aws-dynamodb

A Gatsby source plugin for sourcing data into your Gatsby application from AWS DynamoDB.

## Install

`npm install gatsby-source-aws-dynamodb`

## How to Use

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-aws-dynamodb',
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: '<INPUT_GRAPHQL_TYPE_NAME_HERE>',
        // It is strongly recommended that credentials are stored in environment variables
        accessKeyId: '<AWS_ACCESS_KEY_ID>', 
        secretAccessKey: '<AWS_SECRET_ACCESS_KEY>',
        region: '<AWS_REGION>',
        params: {
          TableName : "<TABLE_NAME>",
          // Other params to scan here
        }
      }
    },
  ],
};
```
