import { GraphQLError } from 'graphql';

class CustomGraphQLError extends GraphQLError {
  constructor( message: string, code: string, status: number ) {
    super( message, {
      extensions: {
        code,
        http: {
          status
        }
      }
    } );
  }
}

class AuthenticationError extends CustomGraphQLError {
  constructor( message: string = 'Authentication failed' ) {
    super( message, 'AUTHENTICATION_ERROR', 401 );
  }
}

class ValidationError extends CustomGraphQLError {
  constructor( message: string ) {
    super( message, 'VALIDATION_ERROR', 400 );
  }
}

class NotFoundError extends CustomGraphQLError {
  constructor( message: string = 'Resource not found' ) {
    super( message, 'NOT_FOUND', 404 );
  }
}

class UserInputError extends CustomGraphQLError {
  constructor( message: string = 'Invalid input' ) {
    super( message, 'USER_INPUT_ERROR', 400 );
  }
}
class PermissionError extends CustomGraphQLError {
  constructor( message: string = 'Permission denied' ) {
    super( message, 'PERMISSION_DENIED', 403 );
  }
}

export { AuthenticationError, ValidationError, NotFoundError, PermissionError, UserInputError };