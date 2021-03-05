const AWS = require('aws-sdk')
const { ERROR_MAP } = require(`./error-utils`)
const { processData } = require(`./utils`)

exports.onPreInit = ({ reporter }) => {
    if (reporter.setErrorMap) {
      reporter.setErrorMap(ERROR_MAP)
    }
  }

exports.sourceNodes = ( { actions, createNodeId, createContentDigest }, 
  options, 
) => {
  return new Promise((resolve, reject) => {
    const { createNode } = actions
    delete options.plugins

    const onScan = (err, data) => {
        if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
          reject(err)
        } else {
          console.log("Query succeeded.");
          data.Items.forEach((item) => {
            const nodeData = processData(item, createNodeId, createContentDigest)
            createNode(nodeData)
          });
      
          if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            options.params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(options.params, onScan);
          } else {
            resolve()
          }
        }
      }

    const docClient = new AWS.DynamoDB.DocumentClient({
      region: options.region,
      accessKeyId: options.accessKeyId, 
      secretAccessKey: options.secretAccessKey
    });
    docClient.scan(options.params, onScan)
  })
}