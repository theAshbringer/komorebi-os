import gql from 'graphql-tag';

export const typeDefs = gql`
  type Device {
    entity_id: String!
    state: String!
    friendly_name: String!
  }

  type Query {
    devices: [Device!]!
  }
`;
