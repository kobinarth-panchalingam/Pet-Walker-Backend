import { GraphQLScalarType, Kind } from 'graphql';

export const dateResolver = new GraphQLScalarType( {
  name: 'Date',
  description: 'Date custom scalar type',
  serialize( value ) {
    if ( value instanceof Date ) {
      return value.toISOString(); // Convert Date to ISO 8601 string format
    }
    throw new Error( 'GraphQL Date Scalar serializer expected a `Date` object' );
  },
  parseValue( value ) {
    switch ( typeof value ) {
      case 'number' :
        return new Date( value ); // Convert incoming integer to Date
      case 'string' : {
        // Attempt to convert incoming string to Date
        const date = new Date( value );
        if ( !isNaN( date.getTime() ) ) {
          return date;
        }
        throw new Error( 'GraphQL Date Scalar parser received an invalid datetime string' );
      }
      default :
        throw new Error( 'GraphQL Date Scalar parser expected a `number` or a datetime `string`' );
    }
  },
  parseLiteral( ast ) {
    switch ( ast.kind ) {
      case Kind.INT :
      // Convert hard-coded AST string to integer and then to Date
        return new Date( parseInt( ast.value, 10 ) );
      case Kind.STRING : {
      // Attempt to convert hard-coded AST string to Date
        const date = new Date( ast.value );
        if ( !isNaN( date.getTime() ) ) {
          return date;
        }
        break;
      }
    }
    // Invalid hard-coded value (not an integer or valid datetime string)
    return null;
  }
} );
