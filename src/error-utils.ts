export const CODES = {
  Generic: `10000`,
  MissingResource: `10001`,
};

export const pluginPrefix = `gatsby-source-filesystem`;

export function prefixId(id: any) {
  return `${pluginPrefix}_${id}`;
}

enum ReporterLevel {
  Error = 'ERROR',
}

enum ReporterCategory {
  // Error caused by user (typically, site misconfiguration)
  User = 'USER',
  // Error caused by Sanity plugin ("third party" relative to Gatsby Cloud)
  ThirdParty = 'THIRD_PARTY',
  // Error caused by Gatsby process
  System = 'SYSTEM',
  Plugin = 'PLUGIN',
}

enum ReporterType {
  // Error caused by user (typically, site misconfiguration)
  User = 'USER',
  // Error caused by Sanity plugin ("third party" relative to Gatsby Cloud)
  ThirdParty = 'THIRD_PARTY',
  // Error caused by Gatsby process
  System = 'SYSTEM',
  Plugin = 'PLUGIN',
}

// TODO: Refactor to use contextual data instead of only context.sourceMessage
// once reporter.setErrorMap is guaranteed to be available
export const ERROR_MAP = {
  [CODES.Generic]: {
    text: (context: any) => context.sourceMessage,
    level: ReporterLevel.Error,
    type: ReporterType.Plugin,
  },
  [CODES.MissingResource]: {
    text: (context: any) => context.sourceMessage,
    level: ReporterLevel.Error,
    type: ReporterType.Plugin,
    category: ReporterCategory.User,
  },
};