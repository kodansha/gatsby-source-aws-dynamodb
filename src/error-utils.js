const CODES = {
  Generic: `10000`,
  MissingResource: `10001`,
};

const pluginPrefix = `gatsby-source-filesystem`;

function prefixId(id) {
  return `${pluginPrefix}_${id}`;
}

// TODO: Refactor to use contextual data instead of only context.sourceMessage
// once reporter.setErrorMap is guaranteed to be available
const ERROR_MAP = {
  [CODES.Generic]: {
    text: (context) => context.sourceMessage,
    level: `ERROR`,
    type: `PLUGIN`,
  },
  [CODES.MissingResource]: {
    text: (context) => context.sourceMessage,
    level: `ERROR`,
    type: `PLUGIN`,
    category: `USER`,
  },
};

module.exports = {
  CODES,
  pluginPrefix,
  prefixId,
  ERROR_MAP,
};