import { ValidationError } from './errors';

const validateNonNullableFields = ( args:object ) => {
  for ( const [ key, value ] of Object.entries( args ) ) {
    if ( value === null ) {
      throw new ValidationError( `${key} cannot take null value` );
    }
  }
};

const getDateOfBirth = ( ageYears:number, ageMonths:number ) => {
  return new Date( new Date().setFullYear( new Date().getFullYear() - ageYears, new Date().getMonth() - ageMonths ) );
};

export { validateNonNullableFields, getDateOfBirth };