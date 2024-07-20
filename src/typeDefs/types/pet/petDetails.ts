import { gql } from 'graphql-tag';

export const petDetails = gql`
    type PetDetails {
        id: Int!
        pet: Pet!
        petId: Int!

        spayedNeutered: PetDetailsFormat!
        vaccinated: PetDetailsFormat!
        energyLevel: PetDetailsFormat!
        preferredWalkingSchedule: [PetDetailsFormat!]!
        feedingSchedule: PetDetailsFormat!
        pottyBreakSchedule: PetDetailsFormat!
        specialRequirements: PetDetailsFormat
        dietaryRestrictions: PetDetailsFormat
        behavioralTraits: PetDetailsFormat

        createdAt: DateTime!
        updatedAt: DateTime!
    }
`;
