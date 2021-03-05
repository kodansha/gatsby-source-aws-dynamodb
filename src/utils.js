const processData = (item, createNodeId, createContentDigest) => {
    const nodeContentDigest = createContentDigest(item)
    const nodeId = item.id
      ? createNodeId(`dynamodb-${item.id}`)
      : nodeContentDigest
    
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
    })
    return nodeData
}
  export {
      processData
  }