import { roles } from './enums/roles.js';
import { status } from './enums/status.js';
import { petAdd } from './inputs/add/petAdd.js';
import { dateScalar } from './scalars/dateScalar.js';
import { pet } from './types/pet.js';
import { user } from './types/user.js';
import { mutations } from './mutations.js';
import { queries } from './queries.js';

const enums = [ status, roles ];
const types = [ user, pet ];
const inputs = [ petAdd ];
const scalars = [ dateScalar ];

export const typeDefs = [ types, queries, mutations, inputs, enums, scalars ];
