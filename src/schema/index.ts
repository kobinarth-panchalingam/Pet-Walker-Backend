import { resolvers } from '../resolvers';
import { upperDirectiveTransformer } from '../resolvers/directives/upperCaseDirectiveResolver';

import { loadFiles } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { constraintDirectiveTypeDefs } from 'graphql-constraint-directive/apollo4';

const typeDefs = await loadFiles( './src/typeDefs/**/*.graphql' );

let schema = makeExecutableSchema( {
  typeDefs: [ constraintDirectiveTypeDefs, typeDefs ],
  resolvers
} );

const directiveTransformers = [
  { transformer: upperDirectiveTransformer, name: 'uppercase' }
];

directiveTransformers.forEach( ( { transformer, name } ) => {
  schema = transformer( schema, name );
} );

export { schema };