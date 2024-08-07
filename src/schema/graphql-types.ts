import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date; output: Date; }
  DateTime: { input: Date; output: Date; }
  JSON: { input: Record<string, any>; output: Record<string, any>; }
};

export type Breed = {
  __typename?: 'Breed';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  petType: PetType;
  pets: Array<Pet>;
};

export type EmergencyContact = {
  __typename?: 'EmergencyContact';
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
};

export type EmergencyContactUpdate = {
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export enum EnergyLevel {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type Mutation = {
  __typename?: 'Mutation';
  addPet?: Maybe<MutationResponse>;
  updatePet?: Maybe<MutationResponse>;
  updateUser?: Maybe<MutationResponse>;
};


export type MutationAddPetArgs = {
  input: PetAdd;
};


export type MutationUpdatePetArgs = {
  input: PetUpdate;
};


export type MutationUpdateUserArgs = {
  input: UserUpdate;
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  code: Scalars['String']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Pet = {
  __typename?: 'Pet';
  breed: Breed;
  breedId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  dob?: Maybe<Scalars['Date']['output']>;
  gender: Gender;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  petDetails?: Maybe<PetDetails>;
  petType: PetType;
  photo?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
  weight: Scalars['Float']['output'];
};

export type PetAdd = {
  ageMonths: Scalars['Int']['input'];
  ageYears: Scalars['Int']['input'];
  breedId: Scalars['Int']['input'];
  gender: Gender;
  name: Scalars['String']['input'];
  petDetails: PetDetailsAdd;
  petType: PetType;
  photo?: InputMaybe<Scalars['String']['input']>;
  weight: Scalars['Float']['input'];
};

export type PetDetails = {
  __typename?: 'PetDetails';
  behavioralTraits?: Maybe<PetDetailsFormat>;
  createdAt: Scalars['DateTime']['output'];
  dietaryRestrictions?: Maybe<PetDetailsFormat>;
  energyLevel: PetDetailsFormat;
  feedingSchedule: PetDetailsFormat;
  id: Scalars['Int']['output'];
  pet: Pet;
  petId: Scalars['Int']['output'];
  pottyBreakSchedule: PetDetailsFormat;
  preferredWalkingSchedule: Array<PetDetailsFormat>;
  spayedNeutered: PetDetailsFormat;
  specialRequirements?: Maybe<PetDetailsFormat>;
  updatedAt: Scalars['DateTime']['output'];
  vaccinated: PetDetailsFormat;
};

export type PetDetailsAdd = {
  behavioralTraits?: InputMaybe<PetDetailsInputFormat>;
  dietaryRestrictions?: InputMaybe<PetDetailsInputFormat>;
  energyLevel: PetDetailsInputFormat;
  feedingSchedule: PetDetailsInputFormat;
  pottyBreakSchedule: PetDetailsInputFormat;
  preferredWalkingSchedule: Array<PetDetailsInputFormat>;
  spayedNeutered: PetDetailsInputFormat;
  specialRequirements?: InputMaybe<PetDetailsInputFormat>;
  vaccinated: PetDetailsInputFormat;
};

export type PetDetailsFormat = {
  __typename?: 'PetDetailsFormat';
  additionalDetails?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type PetDetailsInputFormat = {
  additionalDetails?: InputMaybe<Scalars['String']['input']>;
  value: Scalars['String']['input'];
};

export enum PetType {
  Cat = 'CAT',
  Dog = 'DOG'
}

export type PetUpdate = {
  ageMonths?: InputMaybe<Scalars['Int']['input']>;
  ageYears?: InputMaybe<Scalars['Int']['input']>;
  breedId?: InputMaybe<Scalars['Int']['input']>;
  gender?: InputMaybe<Gender>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  petDetails?: InputMaybe<PetDetailsAdd>;
  petType?: InputMaybe<PetType>;
  photo?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getBreeds?: Maybe<Array<Maybe<Breed>>>;
  getPets?: Maybe<Array<Maybe<Pet>>>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetBreedsArgs = {
  petType?: InputMaybe<PetType>;
};

export enum Role {
  Admin = 'ADMIN',
  Owner = 'OWNER',
  Walker = 'WALKER'
}

export enum Status {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type User = {
  __typename?: 'User';
  city?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  district?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['Date']['output']>;
  email: Scalars['String']['output'];
  emergencyContacts?: Maybe<Array<EmergencyContact>>;
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  pets: Array<Pet>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profilePhoto?: Maybe<Scalars['String']['output']>;
  role: Role;
  status: Status;
  street?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type UserUpdate = {
  city?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['Date']['input']>;
  emergencyContacts?: InputMaybe<Array<EmergencyContactUpdate>>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePhoto?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export enum WalkingSchedule {
  Afternoon = 'AFTERNOON',
  Evening = 'EVENING',
  Morning = 'MORNING',
  Night = 'NIGHT'
}

export enum YesNo {
  No = 'NO',
  Yes = 'YES'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Breed: ResolverTypeWrapper<Breed>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmergencyContact: ResolverTypeWrapper<EmergencyContact>;
  EmergencyContactUpdate: EmergencyContactUpdate;
  EnergyLevel: EnergyLevel;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Gender: Gender;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<MutationResponse>;
  Pet: ResolverTypeWrapper<Pet>;
  PetAdd: PetAdd;
  PetDetails: ResolverTypeWrapper<PetDetails>;
  PetDetailsAdd: PetDetailsAdd;
  PetDetailsFormat: ResolverTypeWrapper<PetDetailsFormat>;
  PetDetailsInputFormat: PetDetailsInputFormat;
  PetType: PetType;
  PetUpdate: PetUpdate;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserUpdate: UserUpdate;
  WalkingSchedule: WalkingSchedule;
  YesNo: YesNo;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Breed: Breed;
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  EmergencyContact: EmergencyContact;
  EmergencyContactUpdate: EmergencyContactUpdate;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  MutationResponse: MutationResponse;
  Pet: Pet;
  PetAdd: PetAdd;
  PetDetails: PetDetails;
  PetDetailsAdd: PetDetailsAdd;
  PetDetailsFormat: PetDetailsFormat;
  PetDetailsInputFormat: PetDetailsInputFormat;
  PetUpdate: PetUpdate;
  Query: {};
  String: Scalars['String']['output'];
  User: User;
  UserUpdate: UserUpdate;
};

export type UppercaseDirectiveArgs = { };

export type UppercaseDirectiveResolver<Result, Parent, ContextType = any, Args = UppercaseDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BreedResolvers<ContextType = any, ParentType extends ResolversParentTypes['Breed'] = ResolversParentTypes['Breed']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  petType?: Resolver<ResolversTypes['PetType'], ParentType, ContextType>;
  pets?: Resolver<Array<ResolversTypes['Pet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EmergencyContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmergencyContact'] = ResolversParentTypes['EmergencyContact']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addPet?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationAddPetArgs, 'input'>>;
  updatePet?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdatePetArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['MutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pet'] = ResolversParentTypes['Pet']> = {
  breed?: Resolver<ResolversTypes['Breed'], ParentType, ContextType>;
  breedId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dob?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['Gender'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  petDetails?: Resolver<Maybe<ResolversTypes['PetDetails']>, ParentType, ContextType>;
  petType?: Resolver<ResolversTypes['PetType'], ParentType, ContextType>;
  photo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PetDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PetDetails'] = ResolversParentTypes['PetDetails']> = {
  behavioralTraits?: Resolver<Maybe<ResolversTypes['PetDetailsFormat']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dietaryRestrictions?: Resolver<Maybe<ResolversTypes['PetDetailsFormat']>, ParentType, ContextType>;
  energyLevel?: Resolver<ResolversTypes['PetDetailsFormat'], ParentType, ContextType>;
  feedingSchedule?: Resolver<ResolversTypes['PetDetailsFormat'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pet?: Resolver<ResolversTypes['Pet'], ParentType, ContextType>;
  petId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pottyBreakSchedule?: Resolver<ResolversTypes['PetDetailsFormat'], ParentType, ContextType>;
  preferredWalkingSchedule?: Resolver<Array<ResolversTypes['PetDetailsFormat']>, ParentType, ContextType>;
  spayedNeutered?: Resolver<ResolversTypes['PetDetailsFormat'], ParentType, ContextType>;
  specialRequirements?: Resolver<Maybe<ResolversTypes['PetDetailsFormat']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  vaccinated?: Resolver<ResolversTypes['PetDetailsFormat'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PetDetailsFormatResolvers<ContextType = any, ParentType extends ResolversParentTypes['PetDetailsFormat'] = ResolversParentTypes['PetDetailsFormat']> = {
  additionalDetails?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getBreeds?: Resolver<Maybe<Array<Maybe<ResolversTypes['Breed']>>>, ParentType, ContextType, Partial<QueryGetBreedsArgs>>;
  getPets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Pet']>>>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  district?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dob?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emergencyContacts?: Resolver<Maybe<Array<ResolversTypes['EmergencyContact']>>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pets?: Resolver<Array<ResolversTypes['Pet']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profilePhoto?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  zipCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Breed?: BreedResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  EmergencyContact?: EmergencyContactResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Pet?: PetResolvers<ContextType>;
  PetDetails?: PetDetailsResolvers<ContextType>;
  PetDetailsFormat?: PetDetailsFormatResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  uppercase?: UppercaseDirectiveResolver<any, any, ContextType>;
};
