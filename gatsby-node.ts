import DynamoDB from 'aws-sdk/clients/dynamodb';
import { ERROR_MAP } from './src/error-utils';
import { processData } from './src/utils';
import { GatsbyNode, PluginOptions, ParentSpanPluginArgs, SourceNodesArgs } from 'gatsby'

export const onPreInit: GatsbyNode['onPreInit'] = async ({ reporter } : ParentSpanPluginArgs ) => {
  if (reporter.setErrorMap) {
    reporter.setErrorMap(ERROR_MAP);
  }
};

export interface Options extends PluginOptions {
  plugins: any;
  params: any;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  typeName: string;
}

export const sourceNodes: GatsbyNode['sourceNodes'] = (
  { actions, createNodeId, createContentDigest }: SourceNodesArgs,
  options: Options
): Promise<any> => {
  return new Promise((resolve:(value?: any)=> any|void, reject:(reason?: any)=> any|void) => {
    const { createNode } = actions;
    delete options.plugins;

    const onScan = (err: any, data: any) => {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Query succeeded.");
        data.Items.forEach((item: any) => {
          const nodeData = processData(item, createNodeId, createContentDigest, options);
          createNode(nodeData);
        });

        if (typeof data.LastEvaluatedKey != "undefined") {
          console.log("Scanning for more...");
          options.params.ExclusiveStartKey = data.LastEvaluatedKey;
          docClient.scan(options.params, onScan);
        } else {
          resolve();
        }
      }
    };

    const docClient = new DynamoDB.DocumentClient({
      region: options.region,
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey,
    });
    docClient.scan(options.params, onScan);
  });
};
