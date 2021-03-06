export const processData = (item: any, createNodeId: any, createContentDigest: any, options: any) => {
  const nodeContentDigest = createContentDigest(item);
  const nodeId = item.id
    ? createNodeId(`dynamodb-${item.id}`)
    : nodeContentDigest;

  const nodeData = Object.assign({}, item, {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      mediaType: `text/html`,
      contentDigest: nodeContentDigest,
      type: options.typeName,
      content: JSON.stringify(item),
    },
  });
  return nodeData;
};
