import gql from 'graphql-tag';

export const typeDefs = gql`
  type Device {
    entityId: String!
    state: String!
    friendlyName: String!
    deviceType: String!
  }

  type Query {
    devices: [Device!]!
  }
`;
