import { roles } from './enums/roles';
import { status } from './enums/status';
import { petAdd } from './inputs/add/petAdd';
import { userUpdate } from './inputs/update/userUpdate';
import { dateScalar } from './scalars/dateScalar';
import { dateTimeScalar } from './scalars/dateTimeScalar';
import { jsonScalar } from './scalars/jsonScalar';
import { mutationResponse } from './types/mutationResponse';
import { pet } from './types/pet';
import { user } from './types/user';
import { mutations } from './mutations';
import { queries } from './queries';

const enums = [ status, roles ];
const types = [ mutationResponse, user, pet ];
const inputs = [ petAdd, userUpdate ];
const scalars = [ dateScalar, dateTimeScalar, jsonScalar ];

export const typeDefs = [ types, queries, mutations, inputs, enums, scalars ];
