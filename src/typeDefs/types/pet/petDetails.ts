import { gql } from 'graphql-tag';

export const petDetails = gql`
    type PetDetails {
        id: Int!
        pet: Pet!
        petId: Int!

        spayedNeutered: YesNo!
        vaccinated: YesNo!
        energyLevel: EnergyLevel!
        preferredWalkingSchedule: [WalkingSchedule!]!
        feedingSchedule: JSON!
        pottyBreakSchedule: JSON!
        specialRequirements: String
        dietaryRestrictions: String
        behavioralTraits: String

        createdAt: DateTime!
        updatedAt: DateTime!
    }
`;
