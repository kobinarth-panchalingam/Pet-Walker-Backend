import { roles } from './enums/roles';
import { status } from './enums/status';
import { petAdd } from './inputs/add/petAdd';
import { dateScalar } from './scalars/dateScalar';
import { pet } from './types/pet';
import { user } from './types/user';
import { mutations } from './mutations';
import { queries } from './queries';

const enums = [ status, roles ];
const types = [ user, pet ];
const inputs = [ petAdd ];
const scalars = [ dateScalar ];

export const typeDefs = [ types, queries, mutations, inputs, enums, scalars ];
