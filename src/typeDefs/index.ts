import { upperDirectiveTransformer } from '../resolvers/directives/upperCaseDirectiveResolver';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';

export const initialSchema = await loadSchemaSync( './src/typeDefs/**/*.graphql', {
  // load files and merge them into a single schema object
  loaders: [ new GraphQLFileLoader() ]
} );

export const schema = upperDirectiveTransformer( initialSchema, 'uppercase' );