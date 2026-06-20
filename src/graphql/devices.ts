// src/graphql/devices.ts
import { gql } from '@apollo/client';

export const GET_DEVICES = gql`
  query GetDevices {
    devices {
      entityId
      state
      friendlyName
    }
  }
`;
