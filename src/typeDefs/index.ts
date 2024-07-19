import { upperCase } from './directives/upperCase';
import { energyLevel } from './enums/energyLevel';
import { gender } from './enums/gender';
import { petType } from './enums/petType';
import { roles } from './enums/roles';
import { status } from './enums/status';
import { walkingSchedule } from './enums/walkingSchedule';
import { yesNo } from './enums/yesNo';
import { petAdd } from './inputs/add/petAdd';
import { userUpdate } from './inputs/update/userUpdate';
import { dateScalar } from './scalars/dateScalar';
import { dateTimeScalar } from './scalars/dateTimeScalar';
import { jsonScalar } from './scalars/jsonScalar';
import { mutationResponse } from './types/mutationResponse';
import { breed } from './types/pet/breed';
import { pet } from './types/pet/pet';
import { petDetails } from './types/pet/petDetails';
import { emergencyContact } from './types/user/emergencyContact';
import { user } from './types/user/user';
import { mutations } from './mutations';
import { queries } from './queries';

const directives = [ upperCase ];
const enums = [ status, roles, gender, petType, energyLevel, yesNo, walkingSchedule ];
const types = [ mutationResponse, user, emergencyContact, pet, petDetails, breed ];
const inputs = [ petAdd, userUpdate ];
const scalars = [ dateScalar, dateTimeScalar, jsonScalar ];

export const typeDefs = [ types, queries, mutations, inputs, enums, scalars, directives ];
