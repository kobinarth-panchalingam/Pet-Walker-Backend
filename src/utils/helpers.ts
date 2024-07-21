import { ValidationError } from './errors';

const validateNonNullableFields = ( args:object ) => {
  for ( const [ key, value ] of Object.entries( args ) ) {
    if ( value === null ) {
      throw new ValidationError( `${key} cannot take null value` );
    }
  }
};

export { validateNonNullableFields };