# gatsby-source-aws-dynamodb

A Gatsby source plugin for sourcing data into your Gatsby application from AWS DynamoDB.

## Install

`npm install --save gatsby-source-aws-dynamodb`

## Usage

In your `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-aws-dynamodb',
      options: {
        typeName: '<INPUT_GRAPHQL_TYPE_NAME_HERE>',
        accessKeyId: '<AWS_ACCESS_KEY_ID>', 
        secretAccessKey: '<AWS_SECRET_ACCESS_KEY>',
        region: '<AWS_REGION>',
        params: {
          TableName : "<TABLE_NAME>",
          // OTHER PARAMS HERE
        }
      }
    },
  ],
};
```
